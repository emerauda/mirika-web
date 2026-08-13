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
const LIST = `https://api.github.com/repos/${REPO}/releases?per_page=30`;
/** 転んだときに出す控えの置き場(通常キャッシュより長生き) */
const STALE_URL = "https://mirika.dev/api/releases?stale=1";
const STALE_MAX_AGE = 24 * 60 * 60;

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

/**
 * 一覧から「正式版の最新」を選ぶ。
 *
 * GitHub の /releases/latest と同じ約束(ドラフトでもプレリリースでもない先頭)。
 * **往復を1本に減らすため**に自前で選ぶ —— 未認証の GitHub API は IP あたり
 * 60回/時 で、エッジの出口 IP は共有。2本叩くと同じ人数で倍の速さで尽きる
 */
export function pickLatest(list: GhRelease[]): GhRelease | null {
  if (!Array.isArray(list)) return null;
  return list.find((r) => r?.draft !== true && r?.prerelease !== true) ?? null;
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
  const staleKey = new Request(STALE_URL);
  const cache = (caches as unknown as { default: Cache }).default;
  const hit = await cache.match(cacheKey);
  if (hit) return hit;

  const headers = {
    Accept: "application/vnd.github+json",
    // GitHub API は User-Agent 必須
    "User-Agent": "mirika.dev-site",
  };
  // **往復は1本だけ。** latest は一覧から選ぶ(pickLatest)
  const listRes = await fetch(LIST, { headers }).catch(() => null);
  if (!listRes?.ok) {
    // **転んでも白紙にしない。** 一日ぶんの控えがあれば、古くてもそれを出す ——
    // ここで 502 を返すと、全員がブラウザから GitHub を直接叩きに行き、
    // 未認証の枠(60回/時)を分け合って「正式版が消えた」ように見える(実際に起きた)
    const stale = await cache.match(staleKey);
    if (stale) {
      const body = await stale.text();
      return new Response(body, {
        headers: {
          "content-type": "application/json; charset=utf-8",
          "cache-control": "public, max-age=60, s-maxage=120",
          "x-mirika-stale": "1",
        },
      });
    }
    // 失敗はキャッシュしない(次の訪問者がすぐ引き直せる)。ブラウザ側が直叩きへ落ちる
    return new Response(JSON.stringify({ error: "upstream" }), {
      status: 502,
      headers: { "content-type": "application/json" },
    });
  }
  const list = (await listRes.json()) as GhRelease[];
  const body = JSON.stringify({
    latest: slim(pickLatest(list)),
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
  // 控えは長めに置く(上流が転んだときだけ使う)
  context.waitUntil(
    cache.put(
      staleKey,
      new Response(body, {
        headers: {
          "content-type": "application/json; charset=utf-8",
          "cache-control": `public, s-maxage=${STALE_MAX_AGE}`,
        },
      }),
    ),
  );
  return response;
};
