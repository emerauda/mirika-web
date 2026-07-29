import { Kicker } from './ui';
import { Reveal, StaggerGroup, StaggerItem } from './primitives';

type Status = 'done' | 'next' | 'none';
type Phase = { label: string; status: Status; title: string; desc: string };

const PHASES: Phase[] = [
  {
    label: 'Phase 0',
    status: 'done',
    title: '技術検証',
    desc: '透過ウィンドウ+VRM表示+クリックスルー+ドラッグ移動——Windows ネイティブで確認済み。',
  },
  {
    label: 'Phase 1',
    status: 'done',
    title: 'MVP: 会話',
    desc: 'バルーン、テキスト入力、ローカルLLM会話、まばたき・視線追従。接続は3段構え(内蔵エンジン/自動検出/手動URL)——話しかけたら人格が返事する。',
  },
  {
    label: 'Phase 2',
    status: 'done',
    title: 'キャラが生きる',
    desc: '感情と気分(ムード)、記憶、ランダムトーク、時報、撫で判定、ウィンドウに座る、季節の演出、出会いの演出。さらにコンビの掛け合い、配信者モード、スラッシュコマンド設定、ペルソナ編集も。放っておいても勝手に生きてる。',
  },
  {
    label: 'Phase 3',
    status: 'done',
    title: '声が出る',
    desc: 'VOICEVOX TTS+モーラリップシンク(声と表示の実尺同期)、Whisperマイク入力(呼びかけ起動)、クレジット自動表示。声で会話できる。',
  },
  {
    label: 'Phase 4',
    status: 'done',
    title: 'AI 秘書',
    desc: '秘書は実運用に到達: Gmail・カレンダー・Drive(Google純正MCPに直結)、タスク預かり、定期チェックと「きょうのブリーフィング」、Claude Desktop・VS Code からの伝言(SSTP伝統の9801番)。スクリーン理解と画面の見守り、クリップボード反応、ローカルRAG(端末内全文検索)、ブラウザ拡張、BGM・Spotify まで動作済み。仕事を任せられる。',
  },
  {
    label: 'Phase 5',
    status: 'done',
    title: 'プロダクト化',
    desc: '配布パッケージ(3 OS)、Free/Pro/Enterprise の3層ライセンスと管理ポリシー、秘密情報の暗号化、デフォルトキャラ同梱、Live2Dシェル、文脈アニメーション(動作タグ+AI が書き起こす動き+VRMA)、多言語ローカル音声(日=VOICEVOX・英中=内蔵Piper)と OpenAI 互換 TTS API、音声ファイルの文字起こし要約、5言語対応、システムチェック、OSSライセンス表記。DLした瞬間から完成品——0.5.6 で達成。',
  },
  {
    label: 'Phase 6',
    status: 'done',
    title: 'エコシステム',
    desc: '第三者がゴーストを作って配れる——正式版 0.6.0 で達成。キャラクターカード(V2/V3)のドラッグ&ドロップ取り込み、伺かのクラシックシェル(surface をそのまま身体に。本体と相方がコンビで立ち、surfaces.txt どおりに瞬き、声に合わせて口が動く)、.mirikaパッケージとゴーストマネージャ(名前・性格・相方・設定メモ・身体を1ファイルで受け渡し、手持ちの棚から着替え)、マルチデバイス同期(無料。E2E暗号化、自分のクラウドの同期フォルダを置き場にでき、削除と編集の衝突も解決。置き場そのものをこちらで預かる選択肢は Pro)、完全なSSTP互換(送り主の文字コードに追従・EXECUTE応答)、配布物を作るSDKと人格回帰テスト(ゴールデン対話集で「この子らしさ」をCI検証)。',
  },
  {
    label: 'Phase 7',
    status: 'next',
    title: '社会と身体',
    desc: 'マルチゴースト、コミュニケート(AI同士の会話)、歌とお絵かき、スマートホーム/IoT連携、デスクトップ操作(提案型・確認必須)、ロボットシェル実験。デスクトップに社会ができ、身体の選択肢が増える。着手済み——マルチゴースト(Pro。別プロファイルの子をもう一体立てる)、ゴースト間コミュニケート(SSTP で隣のゴーストと会話)、歌(VOICEVOX 歌唱)とお絵かき(ローカル画像生成 or 手描き。配信にも載る)、スマートホーム(Pro。Nature Remo・SwitchBot 直結)が動作中。残りは 0.7 の Display Shell(余ったタブレットに住む。別の機械が身体になるための約束は実装済み)→ 0.8 のデスクトップ操作(提案型。MCP の一サーバーとして外に出す)→ 0.9 のロボットシェル実験の順で、1.0 へ。',
  },
  {
    label: 'Phase 8',
    status: 'next',
    title: 'どの机にも',
    desc: 'いま、迎え入れるまでに小さな障害が残っている。Windows は初回に警告が出るし、macOS にいたっては配れてすらいない——署名と公証を通して、この二つを消す。ダウンロードの経路も増やして、探さなくても見つかるところに置く。機能ではなく、迎え方の話。',
  },
  {
    label: 'Phase 9',
    status: 'none',
    title: '作る人の場所',
    desc: '作って、配れるようにはなった。けれど、探せる場所がまだない。誰かが育てた子を、アプリの中から見つけて迎えられるように。作った人の名前がちゃんと残り、受け取る側は誰の作かを確かめられるように。伺かが二十五年続いたのは、勝手に作って勝手に配れたからなので、そこは重くしない。',
  },
  {
    label: 'Phase 10',
    status: 'none',
    title: '画面の外へ',
    desc: '別の機械がこの子の身体になれることは 0.7 で確かめる。その先——台所のディスプレイに立っていたり、机の上の小さな何かに宿っていたり。ロボットは 0.9 で実験してみて、「動いた」ではなく「一緒にいられた」と思えたときに、はじめて先へ進める。急がない。',
  },
];

function PhaseLabel({ label, status }: { label: string; status: Status }) {
  if (status === 'next') {
    return (
      <span className="font-mono text-sm text-sakura font-semibold">
        {label}
        <br className="hidden md:block" />
        <span className="text-[10px] tracking-widest uppercase">● Next</span>
      </span>
    );
  }
  if (status === 'done') {
    return (
      <span className="font-mono text-sm text-mist">
        {label}
        <br className="hidden md:block" />
        <span className="text-[10px] tracking-widest uppercase text-sakura">✓ done</span>
      </span>
    );
  }
  return <span className="font-mono text-sm text-mist">{label}</span>;
}

export function Roadmap() {
  return (
    <section id="roadmap" className="border-t border-cream/10 bg-black/20 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <Reveal className="mb-14">
          <Kicker index="06" label="Roadmap" />
          <h2 className="font-mincho font-bold text-3xl md:text-4xl">順に価値を積む。1.0 のその先まで。</h2>
        </Reveal>

        <StaggerGroup className="border-t-2 border-cream/30 divide-y divide-cream/10">
          {PHASES.map((p) => (
            <StaggerItem
              key={p.label}
              className={`grid md:grid-cols-[110px_230px_1fr] gap-2 md:gap-8 py-6 px-3 ${
                p.status === 'next'
                  ? 'bg-sakura/10 border-l-4 border-sakura'
                  : p.status === 'none'
                    ? 'border-b border-cream/10'
                    : ''
              }`}
            >
              <PhaseLabel label={p.label} status={p.status} />
              <h3 className="font-mincho font-bold text-lg">{p.title}</h3>
              <p className="text-mist text-sm leading-relaxed">{p.desc}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
