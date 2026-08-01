import { useEffect, useState } from 'react';
import { Download as DownloadIcon, Monitor, Command, HardDrive, Puzzle, Crown, FlaskConical, Clapperboard, Wrench } from 'lucide-react';
import { Kicker } from './ui';
import { Reveal, MagneticLink } from './primitives';
import { useT } from '../i18n';

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
  { key: 'win', label: 'Windows', Icon: Monitor, note: 'installer', match: (n: string) => n.endsWith('.exe'), comingSoon: false },
  // macOS は署名/公証が済むまで配布を保留(未署名 dmg は Gatekeeper が「壊れています」と表示するため)
  { key: 'mac', label: 'macOS', Icon: Command, note: 'signing', match: (n: string) => n.endsWith('.dmg'), comingSoon: true },
  { key: 'linux', label: 'Linux', Icon: HardDrive, note: 'appimage', match: (n: string) => n.endsWith('.AppImage'), comingSoon: false },
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
  const t = useT();
  const platformNote = (note: string): string => {
    if (note === 'installer')
      return t('.exe インストーラ', '.exe installer', { 'zh-CN': '.exe 安装包', 'zh-TW': '.exe 安裝包', ko: '.exe 설치 프로그램' });
    if (note === 'signing')
      return t('.dmg(署名対応中)', '.dmg (signing in progress)', { 'zh-CN': '.dmg(签名筹备中)', 'zh-TW': '.dmg(簽名籌備中)', ko: '.dmg(서명 준비 중)' });
    return '.AppImage';
  };
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
            {t('いますぐ、迎え入れる。', 'Take her in, right now.', { 'zh-CN': '现在就把她接回家。', 'zh-TW': '現在就把她接回家。', ko: '지금 바로, 맞이하세요.' })}
          </h2>
        </Reveal>
        <Reveal>
          <p className="text-mist leading-loose mb-10 max-w-xl">
            {t('ローカルファーストのフリーウェア。', 'Local-first freeware.', { 'zh-CN': '本地优先的免费软件。', 'zh-TW': '本地優先的免費軟體。', ko: '로컬 우선 프리웨어.' })}
            {version ? (
              <>
                {' '}
                {t('最新版は', 'Latest:', { 'zh-CN': '最新版本:', 'zh-TW': '最新版本:', ko: '최신 버전:' })}{' '}
                <span className="font-mono text-sakura">{version}</span>。
              </>
            ) : null}{' '}
            {t('お使いの OS を選んでください(既定は', 'Pick your OS (detected:', { 'zh-CN': '请选择你的操作系统(检测到:', 'zh-TW': '請選擇你的作業系統(偵測到:', ko: '사용 중인 OS를 선택하세요(감지됨:' })}{' '}
            <span className="text-cream">{detected?.label}</span>
            {detected?.comingSoon ? t('・準備中', ', coming soon', { 'zh-CN': ',准备中', 'zh-TW': ',準備中', ko: ', 준비 중' }) : ''})。
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
                  <div className="font-mono text-xs text-mist">{platformNote(pf.note)}</div>
                  <div className="mt-auto pt-2">
                    {showAsset ? (
                      <MagneticLink
                        href={asset.browser_download_url}
                        className={`btn-hard inline-flex items-center gap-2 px-5 py-2.5 font-bold text-sm ${
                          primary ? 'bg-sakura text-white' : 'bg-paper text-ink'
                        }`}
                      >
                        <DownloadIcon className="w-4 h-4" />{' '}
                        {t('ダウンロード', 'Download', { 'zh-CN': '下载', 'zh-TW': '下載', ko: '다운로드' })}
                      </MagneticLink>
                    ) : (
                      <span className="font-mono text-xs text-mist/70">
                        {pf.comingSoon ? 'Coming soon' : t('準備中', 'Preparing', { 'zh-CN': '准备中', 'zh-TW': '準備中', ko: '준비 중' })}
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
                  title: t('インストールして起動', 'Install and launch', { 'zh-CN': '安装并启动', 'zh-TW': '安裝並啟動', ko: '설치하고 실행' }),
                  desc: t('それだけで同梱の子が机に立ちます。ライセンス入力はありません(本体は無料です)', 'That alone puts the bundled character on your desk. No licence entry — the app is free.', {
                    'zh-CN': '仅此一步,附带的角色就站上了桌面。无需输入许可证(本体免费)。',
                    'zh-TW': '僅此一步,附帶的角色就站上了桌面。無需輸入授權(本體免費)。',
                    ko: '이것만으로 동봉된 아이가 책상에 섭니다. 라이선스 입력은 없습니다(본체 무료).',
                  }),
                },
                {
                  step: '02',
                  title: t('頭脳をつなぐ', 'Connect a brain', { 'zh-CN': '接上头脑', 'zh-TW': '接上頭腦', ko: '두뇌 연결' }),
                  desc: t('右クリック→「頭脳をダウンロード」。この PC に載る大きさを自動で選びます。Ollama / LM Studio があれば検出して繋がります', 'Right-click → "Download brain". It picks a model sized for this PC. Ollama / LM Studio are detected automatically if running.', {
                    'zh-CN': '右键 →「下载大脑」。会自动选择适合这台电脑的模型。若在运行 Ollama / LM Studio 也会自动检测并连接。',
                    'zh-TW': '右鍵 →「下載大腦」。會自動選擇適合這台電腦的模型。若在執行 Ollama / LM Studio 也會自動偵測並連線。',
                    ko: '우클릭 → "두뇌 다운로드". 이 PC에 맞는 크기를 자동으로 고릅니다. Ollama / LM Studio가 있으면 자동 감지해 연결됩니다.',
                  }),
                },
                {
                  step: '03',
                  title: t('話しかける', 'Say hello', { 'zh-CN': '跟她说话', 'zh-TW': '跟她說話', ko: '말을 걸기' }),
                  desc: t('下の一行に打つだけ。声がほしければ VOICEVOX を入れておくと、起動も終了もこの子が面倒を見ます', 'Just type into the one-line box. Want a voice? Install VOICEVOX and she starts and stops the engine herself.', {
                    'zh-CN': '在下方的一行输入框里打字即可。想要声音?装上 VOICEVOX,引擎的启动和关闭都由她自己照料。',
                    'zh-TW': '在下方的一行輸入框裡打字即可。想要聲音?裝上 VOICEVOX,引擎的啟動和關閉都由她自己照料。',
                    ko: '아래 한 줄 입력창에 치기만 하면 됩니다. 목소리를 원하면 VOICEVOX를 설치해 두세요 — 엔진의 시작과 종료는 그녀가 알아서 합니다.',
                  }),
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
              &gt;{' '}
              {t('設定ゼロで、立つ。細かいことは全部あとから ——', 'Standing with zero setup. Everything else can wait —', {
                'zh-CN': '零设置即可站立。其余的都可以以后再说 ——',
                'zh-TW': '零設定即可站立。其餘的都可以以後再說 ——',
                ko: '설정 제로로, 선다. 나머지는 전부 나중에 —',
              })}{' '}
              <a href="/docs" className="text-sakura hover:underline">
                {t('使い方', 'Docs', { 'zh-CN': '使用指南', 'zh-TW': '使用指南', ko: '사용법' })}
              </a>
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
            <Crown className="w-4 h-4" />{' '}
            {t('Pro を見る', 'See Pro', { 'zh-CN': '查看 Pro', 'zh-TW': '查看 Pro', ko: 'Pro 보기' })}
          </MagneticLink>
          <span className="font-mono text-xs text-mist">
            {t('個人利用は無償 / 高度な連携は Pro', 'Personal use is free / advanced integrations are Pro', {
              'zh-CN': '个人使用免费 / 高级联动为 Pro',
              'zh-TW': '個人使用免費 / 進階連動為 Pro',
              ko: '개인 사용 무료 / 고급 연동은 Pro',
            })}
          </span>
        </Reveal>

        <Reveal>
          <p className="mt-4 font-mono text-[11px] text-mist leading-relaxed">
            {t('zip はどれも本体と同じリリースページの添付です —', 'All three zips are attachments on the same release page —', {
              'zh-CN': '三个 zip 都是同一发布页的附件 —',
              'zh-TW': '三個 zip 都是同一發佈頁的附件 —',
              ko: '세 zip 모두 같은 릴리스 페이지의 첨부 파일입니다 —',
            })}{' '}
            <span className="text-cream">{t('OBS オーバーレイ', 'OBS overlays', { 'zh-CN': 'OBS 叠加层', 'zh-TW': 'OBS 疊加層', ko: 'OBS 오버레이' })}</span>
            {t('は配信画面用のブラウザソース(スタジオ背景・机)、', ' are browser sources for the stream picture (studio backdrop, desk); ', {
              'zh-CN': ' 是直播画面用的浏览器源(演播室背景、桌子);',
              'zh-TW': ' 是直播畫面用的瀏覽器來源(攝影棚背景、桌子);',
              ko: '는 방송 화면용 브라우저 소스(스튜디오 배경·책상), ',
            })}
            <span className="text-cream">{t('ゴースト SDK', 'the ghost SDK', { 'zh-CN': '幽灵 SDK', 'zh-TW': '幽靈 SDK', ko: '고스트 SDK' })}</span>{' '}
            {t('はゴーストを作って配る人向けのスクリプト(雛形作成・検証・人格回帰テスト)。', 'is for people who make and share ghosts (scaffolding, validation, persona regression tests).', {
              'zh-CN': '面向制作并分发幽灵的人(脚手架、校验、人格回归测试)。',
              'zh-TW': '面向製作並分發幽靈的人(腳手架、校驗、人格回歸測試)。',
              ko: '는 고스트를 만들어 배포하는 사람을 위한 도구입니다(템플릿·검증·인격 회귀 테스트).',
            })}
          </p>
        </Reveal>

        <Reveal>
          <p className="mt-6 font-mono text-[11px] text-mist leading-relaxed">
            <span className="text-cream">{t('署名について', 'About signing', { 'zh-CN': '关于签名', 'zh-TW': '關於簽名', ko: '서명에 대해' })}</span>
            {t(' — 現在のビルドはコード署名なしのため、Windows は初回に SmartScreen が出ます(「詳細情報 → 実行」で起動)。macOS 版は署名・公証対応まで準備中です。', ' — current builds are unsigned, so Windows shows SmartScreen on first run ("More info → Run anyway"). The macOS build waits for signing and notarisation.', {
              'zh-CN': ' — 当前构建未签名,Windows 首次运行会出现 SmartScreen(点「更多信息 → 仍要运行」)。macOS 版本待签名与公证完成后提供。',
              'zh-TW': ' — 目前組建未簽名,Windows 首次執行會出現 SmartScreen(點「其他資訊 → 仍要執行」)。macOS 版本待簽名與公證完成後提供。',
              ko: ' — 현재 빌드는 서명이 없어 Windows 첫 실행 시 SmartScreen이 뜹니다("추가 정보 → 실행"). macOS 판은 서명·공증 대응까지 준비 중입니다.',
            })}
          </p>
        </Reveal>

        {beta ? (
          <Reveal>
            <div className="mt-10 rounded-xl border border-cream/10 bg-night/40 p-5">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <FlaskConical className="w-4 h-4 text-[#8be2f5]" />
                <span className="font-mono text-xs font-bold text-[#8be2f5] tracking-wide">
                  {t('先行版 / BETA', 'PREVIEW / BETA', { 'zh-CN': '先行版 / BETA', 'zh-TW': '先行版 / BETA', ko: '프리뷰 / BETA' })}
                </span>
                <span className="font-mono text-xs text-sakura">{beta.tag_name}</span>
                <span className="font-mono text-xs text-mist">
                  {t('— 新機能を試したい人向け(不安定なことがあります)', '— for trying new features early (may be unstable)', {
                    'zh-CN': '— 给想抢先试新功能的人(可能不稳定)',
                    'zh-TW': '— 給想搶先試新功能的人(可能不穩定)',
                    ko: '— 새 기능을 먼저 써 보고 싶은 분께(불안정할 수 있음)',
                  })}
                </span>
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
