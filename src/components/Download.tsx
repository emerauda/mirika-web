import { useEffect, useState } from 'react';
import { Download as DownloadIcon, Monitor, Command, HardDrive, Puzzle, Crown, FlaskConical, Clapperboard, Wrench } from 'lucide-react';
import { Kicker } from './ui';
import { Reveal, MagneticLink } from './primitives';

// 公開ダウンロードミラー(本体ソースは非公開、成果物だけをここへ)。リリース一覧を1回読み、
// 正式版(最新の非プレリリース)と先行版(最新のプレリリース=ベータ)に振り分ける
// 先行版を探すための一覧。**正式版はここから探さない** —— 先行版を10本ほど続けて出すと
// 正式版が一覧の外へ押し出され、サイトが「準備中」に戻ってしまう(実際に起きた)
const LIST = 'https://api.github.com/repos/emerauda/mirika-releases/releases?per_page=30';
/** 正式版は専用の入口から取る。下書きと先行版を除いた最新を返してくれる */
const LATEST = 'https://api.github.com/repos/emerauda/mirika-releases/releases/latest';
const RELEASES = 'https://github.com/emerauda/mirika-releases/releases';

type Asset = { name: string; browser_download_url: string };
type Release = { tag_name: string; prerelease: boolean; draft: boolean; assets: Asset[] };

const PLATFORMS = [
  { key: 'win', label: 'Windows', Icon: Monitor, note: '.exe インストーラ', match: (n: string) => n.endsWith('.exe'), comingSoon: false },
  // macOS は署名/公証が済むまで配布を保留(未署名 dmg は Gatekeeper が「壊れています」と表示するため)
  { key: 'mac', label: 'macOS', Icon: Command, note: '.dmg(署名対応中)', match: (n: string) => n.endsWith('.dmg'), comingSoon: true },
  { key: 'linux', label: 'Linux', Icon: HardDrive, note: '.AppImage', match: (n: string) => n.endsWith('.AppImage'), comingSoon: false },
] as const;

function detectOS(): 'win' | 'mac' | 'linux' {
  if (typeof navigator === 'undefined') return 'win';
  const s = `${navigator.userAgent} ${navigator.platform}`.toLowerCase();
  if (s.includes('mac')) return 'mac';
  if (s.includes('linux') && !s.includes('android')) return 'linux';
  return 'win';
}

const assetIn = (rel: Release | null, match: (n: string) => boolean) =>
  rel?.assets.find((a) => match(a.name));

// "v0.6.2-beta.0" の基底(0.6.2)が "v0.6.1" より新しいか。同じ版の rc は正式化で用済み
function newerBase(preTag: string, stableTag: string): boolean {
  const nums = (tag: string) => tag.replace(/^v/, '').split('-')[0].split('.').map(Number);
  const a = nums(preTag);
  const b = nums(stableTag);
  for (let i = 0; i < 3; i++) {
    if ((a[i] ?? 0) !== (b[i] ?? 0)) return (a[i] ?? 0) > (b[i] ?? 0);
  }
  return false;
}

export function Download() {
  const [stable, setStable] = useState<Release | null>(null);
  const [beta, setBeta] = useState<Release | null>(null);
  const [failed, setFailed] = useState(false);
  const os = detectOS();
  const detected = PLATFORMS.find((p) => p.key === os);

  useEffect(() => {
    const headers = { Accept: 'application/vnd.github+json' };
    const ask = (url: string) =>
      fetch(url, { headers }).then((r) => (r.ok ? r.json() : Promise.reject(r.status)));
    Promise.all([ask(LATEST), ask(LIST).catch(() => [])])
      .then(([latest, list]: [Release, Release[]]) => {
        const st = latest && !latest.draft ? latest : null;
        const live = Array.isArray(list) ? list.filter((r) => !r.draft) : [];
        const pre = live.find((r) => r.prerelease) ?? null;
        setStable(st);
        setBeta(pre && (!st || newerBase(pre.tag_name, st.tag_name)) ? pre : null);
      })
      .catch(() => setFailed(true));
  }, []);

  const version = stable?.tag_name ?? '';
  // リリースには zip が3種ある(chrome-extension / obs-overlays / sdk)。名前で選ぶ
  const zipAsset = (part: string) =>
    stable?.assets.find((a) => a.name.toLowerCase().includes(part) && a.name.toLowerCase().endsWith('.zip'));
  const extension = zipAsset('extension');
  const overlays = zipAsset('overlays');
  const sdk = zipAsset('sdk');

  return (
    <section id="download" className="border-t border-cream/10 bg-black/20">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <Reveal>
          <Kicker index="—" label="Download" />
        </Reveal>
        <Reveal>
          <h2 className="font-mincho font-bold text-3xl md:text-4xl mb-4 text-balance">
            いますぐ、迎え入れる。
          </h2>
        </Reveal>
        <Reveal>
          <p className="text-mist leading-loose mb-10 max-w-xl">
            ローカルファーストのフリーウェア。
            {version ? (
              <>
                {' '}
                最新版は <span className="font-mono text-sakura">{version}</span>。
              </>
            ) : null}{' '}
            お使いの OS を選んでください(既定は <span className="text-cream">{detected?.label}</span>
            {detected?.comingSoon ? '・準備中' : ''})。
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {PLATFORMS.map((pf) => {
            const asset = assetIn(stable, pf.match);
            const showAsset = asset && !pf.comingSoon;
            const primary = pf.key === os && !pf.comingSoon;
            return (
              <Reveal key={pf.key}>
                <div
                  className={`h-full rounded-xl border p-6 flex flex-col items-start gap-3 transition-colors ${
                    primary ? 'border-sakura/40 bg-sakura/5' : 'border-cream/10 bg-night/40'
                  }`}
                >
                  <pf.Icon className={`w-6 h-6 ${primary ? 'text-sakura' : 'text-mist'}`} />
                  <div className="font-mincho font-bold text-lg">{pf.label}</div>
                  <div className="font-mono text-xs text-mist">{pf.note}</div>
                  <div className="mt-auto pt-2">
                    {showAsset ? (
                      <MagneticLink
                        href={asset.browser_download_url}
                        className={`btn-hard inline-flex items-center gap-2 px-5 py-2.5 font-bold text-sm ${
                          primary ? 'bg-sakura text-white' : 'bg-paper text-ink'
                        }`}
                      >
                        <DownloadIcon className="w-4 h-4" /> ダウンロード
                      </MagneticLink>
                    ) : (
                      <span className="font-mono text-xs text-mist/70">
                        {pf.comingSoon ? 'Coming soon' : '準備中'}
                      </span>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* 立つまでの実際の手数。ライセンス入力も必須の外部ツールも無い —— ここがいちばんの近道 */}
        <Reveal className="mb-10">
          <div className="os-window overflow-hidden">
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-cream/10">
              {[
                {
                  step: '01',
                  title: 'インストールして起動',
                  desc: 'それだけで同梱の子が机に立ちます。ライセンス入力はありません(本体は無料です)',
                },
                {
                  step: '02',
                  title: '頭脳をつなぐ',
                  desc: '右クリック→「頭脳をダウンロード」。この PC に載る大きさを自動で選びます。Ollama / LM Studio があれば検出して繋がります',
                },
                {
                  step: '03',
                  title: '話しかける',
                  desc: '下の一行に打つだけ。声がほしければ VOICEVOX を入れておくと、起動も終了もこの子が面倒を見ます',
                },
              ].map((s) => (
                <div key={s.step} className="p-6">
                  <div className="font-mono text-xs text-sakura mb-2">STEP {s.step}</div>
                  <h3 className="font-mincho font-bold text-lg mb-2">{s.title}</h3>
                  <p className="text-sub text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
            <div className="px-6 py-3 border-t border-cream/10 font-mono text-xs text-mist">
              &gt; 設定ゼロで、立つ。細かいことは全部あとから —— <a href="/docs" className="text-sakura hover:underline">使い方</a>
            </div>
          </div>
        </Reveal>

        <Reveal className="flex flex-wrap items-center gap-4">
          <MagneticLink
            href={extension?.browser_download_url ?? `${RELEASES}/latest`}
            target={extension ? undefined : '_blank'}
            rel="noopener"
            className="btn-hard inline-flex items-center gap-2 bg-paper text-ink px-5 py-3 font-bold text-sm"
          >
            <Puzzle className="w-4 h-4" /> Chrome 拡張
          </MagneticLink>
          <MagneticLink
            href={overlays?.browser_download_url ?? `${RELEASES}/latest`}
            target={overlays ? undefined : '_blank'}
            rel="noopener"
            className="btn-hard inline-flex items-center gap-2 bg-paper text-ink px-5 py-3 font-bold text-sm"
          >
            <Clapperboard className="w-4 h-4" /> OBS オーバーレイ
          </MagneticLink>
          <MagneticLink
            href={sdk?.browser_download_url ?? `${RELEASES}/latest`}
            target={sdk ? undefined : '_blank'}
            rel="noopener"
            className="btn-hard inline-flex items-center gap-2 bg-paper text-ink px-5 py-3 font-bold text-sm"
          >
            <Wrench className="w-4 h-4" /> ゴースト SDK
          </MagneticLink>
          <MagneticLink
            href="https://pro.mirika.dev/"
            target="_blank"
            rel="noopener"
            className="btn-hard inline-flex items-center gap-2 bg-gradient-to-r from-[#ff8fab] to-[#c9a2ff] text-[#1a1420] px-5 py-3 font-bold text-sm"
          >
            <Crown className="w-4 h-4" /> Pro を見る
          </MagneticLink>
          <span className="font-mono text-xs text-mist">
            個人利用は無償 / 高度な連携は Pro
          </span>
        </Reveal>

        <Reveal>
          <p className="mt-4 font-mono text-[11px] text-mist leading-relaxed">
            zip はどれも本体と同じリリースページの添付です — <span className="text-cream">OBS オーバーレイ</span>は配信画面用のブラウザソース(スタジオ背景・机)、<span className="text-cream">ゴースト SDK</span> はゴーストを作って配る人向けのスクリプト(雛形作成・検証・人格回帰テスト)。
          </p>
        </Reveal>

        <Reveal>
          <p className="mt-6 font-mono text-[11px] text-mist leading-relaxed">
            <span className="text-cream">署名について</span> — 現在のビルドはコード署名なしのため、<span className="text-cream">Windows</span> は初回に SmartScreen が出ます(「詳細情報 → 実行」で起動)。<span className="text-cream">macOS 版は署名・公証対応まで準備中</span>です。
          </p>
        </Reveal>

        {beta ? (
          <Reveal>
            <div className="mt-10 rounded-xl border border-cream/10 bg-night/40 p-5">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <FlaskConical className="w-4 h-4 text-[#8be2f5]" />
                <span className="font-mono text-xs font-bold text-[#8be2f5] tracking-wide">先行版 / BETA</span>
                <span className="font-mono text-xs text-sakura">{beta.tag_name}</span>
                <span className="font-mono text-xs text-mist">— 新機能を試したい人向け(不安定なことがあります)</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {PLATFORMS.map((pf) => {
                  const asset = assetIn(beta, pf.match);
                  return asset ? (
                    <a
                      key={pf.key}
                      href={asset.browser_download_url}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-cream/15 px-3.5 py-2 font-mono text-xs text-mist hover:text-cream hover:border-cream/30 transition-colors"
                    >
                      <pf.Icon className="w-3.5 h-3.5" /> {pf.label}
                    </a>
                  ) : null;
                })}
              </div>
            </div>
          </Reveal>
        ) : null}

        {failed ? (
          <p className="font-mono text-xs text-mist mt-8">
            ダウンロード情報を取得できませんでした。{' '}
            <a href={`${RELEASES}/latest`} target="_blank" rel="noopener" className="text-sakura underline">
              リリース一覧
            </a>{' '}
            から取得してください。
          </p>
        ) : null}
      </div>
    </section>
  );
}
