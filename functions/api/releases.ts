/**
 * ダウンロード欄のためのリリース情報プロキシ。
 *
 * これまでブラウザが GitHub API を直接叩いていたが、未認証は IP あたり 60回/時 ——
 * 共有 IP(社内 NAT・モバイル回線)や再訪問ですぐ尽き、正式版が「準備中」に
 * 見える事故が起きた(実機: v0.6.6 が消えたように見えた)。ここで肩代わりして
 * エッジに5分キャッシュする。コロごとに最大 12回/時 なので制限には届かない。
 *
 * 返す形は { latest, list }。ブラウザ側の型(Release)に合わせて必要な項目だけに
 * 削ぎ落とす(GitHub の素の JSON は1リリースで数十KBある)
 */

const REPO = "emerauda/mirika-releases";
const LATEST = `https://api.github.com/repos/${REPO}/releases/latest`;
const LIST = `https://api.github.com/repos/${REPO}/releases?per_page=30`;

interface GhAsset {
  name?: string;
  browser_download_url?: string;
}
interface GhRelease {
  tag_name?: string;
  prerelease?: boolean;
  draft?: boolean;
  assets?: GhAsset[];
}

/** ブラウザに渡す形へ削ぐ(欠けた項目は安全側に倒す) */
function slim(release: GhRelease | null): unknown {
  if (!release || typeof release.tag_name !== "string") return null;
  return {
    tag_name: release.tag_name,
    prerelease: release.prerelease === true,
    draft: release.draft === true,
    assets: (release.assets ?? [])
      .filter((a) => typeof a.name === "string" && typeof a.browser_download_url === "string")
      .map((a) => ({ name: a.name, browser_download_url: a.browser_download_url })),
  };
}

export const onRequestGet = async (context: {
  request: Request;
  waitUntil: (p: Promise<unknown>) => void;
}): Promise<Response> => {
  // キャッシュキーは固定(クエリ差でキャッシュが割れないように)
  const cacheKey = new Request("https://mirika.dev/api/releases");
  const cache = (caches as unknown as { default: Cache }).default;
  const hit = await cache.match(cacheKey);
  if (hit) return hit;

  const headers = {
    Accept: "application/vnd.github+json",
    // GitHub API は User-Agent 必須
    "User-Agent": "mirika.dev-site",
  };
  const [latestRes, listRes] = await Promise.all([
    fetch(LATEST, { headers }),
    fetch(LIST, { headers }),
  ]);
  // latest は「正式版がまだ無い」新品リポで 404 になり得るので、404 だけは空扱いで通す
  const latestOk = latestRes.ok || latestRes.status === 404;
  if (!latestOk || !listRes.ok) {
    // 失敗はキャッシュしない(次の訪問者がすぐ引き直せる)。ブラウザ側が直叩きへ落ちる
    return new Response(JSON.stringify({ error: "upstream" }), {
      status: 502,
      headers: { "content-type": "application/json" },
    });
  }
  const latest = latestRes.ok ? ((await latestRes.json()) as GhRelease) : null;
  const list = (await listRes.json()) as GhRelease[];
  const body = JSON.stringify({
    latest: slim(latest),
    list: Array.isArray(list) ? list.map((r) => slim(r)).filter(Boolean) : [],
  });
  const response = new Response(body, {
    headers: {
      "content-type": "application/json; charset=utf-8",
      // ブラウザ1分・エッジ5分。リリース直後でも5分で反映される
      "cache-control": "public, max-age=60, s-maxage=300",
    },
  });
  context.waitUntil(cache.put(cacheKey, response.clone()));
  return response;
};
