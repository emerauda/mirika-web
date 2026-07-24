import { useEffect, useState } from 'react';
import { Download as DownloadIcon, Monitor, Command, HardDrive, Puzzle, Crown } from 'lucide-react';
import { Kicker } from './ui';
import { Reveal, MagneticLink } from './primitives';

// 公開ダウンロードミラー(本体ソースは非公開、成果物だけをここへ)。最新リリースを読む
const LATEST = 'https://api.github.com/repos/emerauda/mirika-releases/releases/latest';
const RELEASES = 'https://github.com/emerauda/mirika-releases/releases/latest';

type Asset = { name: string; browser_download_url: string };

const PLATFORMS = [
  { key: 'win', label: 'Windows', Icon: Monitor, note: '.exe インストーラ', match: (n: string) => n.endsWith('.exe') },
  { key: 'mac', label: 'macOS', Icon: Command, note: '.dmg', match: (n: string) => n.endsWith('.dmg') },
  { key: 'linux', label: 'Linux', Icon: HardDrive, note: '.AppImage', match: (n: string) => n.endsWith('.AppImage') },
] as const;

function detectOS(): 'win' | 'mac' | 'linux' {
  if (typeof navigator === 'undefined') return 'win';
  const s = `${navigator.userAgent} ${navigator.platform}`.toLowerCase();
  if (s.includes('mac')) return 'mac';
  if (s.includes('linux') && !s.includes('android')) return 'linux';
  return 'win';
}

export function Download() {
  const [assets, setAssets] = useState<Asset[] | null>(null);
  const [version, setVersion] = useState('');
  const [failed, setFailed] = useState(false);
  const os = detectOS();

  useEffect(() => {
    fetch(LATEST, { headers: { Accept: 'application/vnd.github+json' } })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: { tag_name?: string; assets?: Asset[] }) => {
        setAssets(data.assets ?? []);
        setVersion(data.tag_name ?? '');
      })
      .catch(() => setFailed(true));
  }, []);

  const assetFor = (match: (n: string) => boolean) => assets?.find((a) => match(a.name));
  const extension = assets?.find((a) => a.name.toLowerCase().endsWith('.zip'));

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
            お使いの OS を選んでください(既定は <span className="text-cream">{PLATFORMS.find((p) => p.key === os)?.label}</span>)。
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {PLATFORMS.map((pf) => {
            const asset = assetFor(pf.match);
            const primary = pf.key === os;
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
                    {asset ? (
                      <MagneticLink
                        href={asset.browser_download_url}
                        className={`btn-hard inline-flex items-center gap-2 px-5 py-2.5 font-bold text-sm ${
                          primary ? 'bg-sakura text-white' : 'bg-paper text-ink'
                        }`}
                      >
                        <DownloadIcon className="w-4 h-4" /> ダウンロード
                      </MagneticLink>
                    ) : (
                      <span className="font-mono text-xs text-mist/70">準備中</span>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="flex flex-wrap items-center gap-4">
          <MagneticLink
            href={extension?.browser_download_url ?? RELEASES}
            target={extension ? undefined : '_blank'}
            rel="noopener"
            className="btn-hard inline-flex items-center gap-2 bg-paper text-ink px-5 py-3 font-bold text-sm"
          >
            <Puzzle className="w-4 h-4" /> Chrome 拡張
          </MagneticLink>
          <MagneticLink
            href="https://pro.mirika.dev/"
            target="_blank"
            rel="noopener"
            className="btn-hard inline-flex items-center gap-2 bg-gradient-to-r from-[#ff8fab] to-[#c9a2ff] text-white px-5 py-3 font-bold text-sm"
          >
            <Crown className="w-4 h-4" /> Pro を見る
          </MagneticLink>
          <span className="font-mono text-xs text-mist">
            個人利用は無償 / 高度な連携は Pro
          </span>
        </Reveal>

        {failed ? (
          <p className="font-mono text-xs text-mist mt-8">
            ダウンロード情報を取得できませんでした。{' '}
            <a href={RELEASES} target="_blank" rel="noopener" className="text-sakura underline">
              リリース一覧
            </a>{' '}
            から取得してください。
          </p>
        ) : null}
      </div>
    </section>
  );
}
