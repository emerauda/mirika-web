import type { ComponentType, ReactNode } from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { Smile, Brain, Database, Mail, Mic, Feather, Package, RefreshCw, Users } from 'lucide-react';
import { Kicker } from './ui';
import { Reveal, StaggerGroup, StaggerItem } from './primitives';

const EASE = [0.22, 1, 0.36, 1] as const;

type Feature = { Icon: ComponentType<{ className?: string }>; num: string; title: string; desc: ReactNode };

const FEATURES: Feature[] = [
  {
    Icon: Smile,
    num: '01',
    title: 'VRM & Live2D',
    desc: 'VRM も Live2D も身体にでき、本体と相方で混在も可能。CC0 のキャラを同梱し、DLした瞬間から動く。マウスを目で追い、まばたきし、髪が揺れ、撫でれば照れて、ウィンドウの縁に座る。モーション素材ゼロでも「生きて」見えるプロシージャル層つき。',
  },
  {
    Icon: Brain,
    num: '02',
    title: 'Local-First LLM',
    desc: '頭脳はあなたのPCで動くローカルLLM。同梱エンジンならゼロ設定、Ollama・LM Studio があれば自動検出して繋がる。API費ゼロで24時間常駐、オフラインでも死なない。ここぞの相談だけクラウドAIへ——ハイブリッド構成。',
  },
  {
    Icon: Database,
    num: '03',
    title: '長期記憶と成長',
    desc: '会話をSQLiteに記憶し、関連する昔の話を検索でふっと思い出す。夜のあいだに整理して、夢を見る。その日にあったことと、そのとき言っていた気持ちは分けて残るので、翌日「昨日は疲れてたけど、今日は大丈夫?」と続きます。呼び方、好み、記念日——数年単位で関係性が育ちます。ゴーストの魂は1つの memory.db。バックアップも引っ越しも自由。',
  },
  {
    Icon: Mail,
    num: '04',
    title: 'AI Secretary(MCP)',
    desc: 'Model Context Protocol で外部ツールと接続——もう動いています。Gmail・カレンダー・Drive(Google純正MCP)が載り、「メール来てるよ、1件は急ぎっぽい」と人格を通して届く。Google を使わない道もあって、POP 対応のメールなら見張れるし、自作スクリプトからの知らせも受け取れます(どちらも無料)。タスク預かり・定期チェック・きょうのブリーフィングまで、秘書として実運用中。',
  },
  {
    Icon: Mic,
    num: '05',
    title: '全ローカル音声対話',
    desc: '日本語は VOICEVOX / AivisSpeech、英語・中国語は内蔵 Piper で完全ローカルに発話、モーラのリップシンク付き。マイクは呼びかけ起動の常時待機で、話の途中でも名前で呼べば声を止めて聞く。文単位の合成で3秒以内に声が返り、音声も会話も端末の外に出ません。',
  },
  {
    Icon: Feather,
    num: '06',
    title: 'さくらスクリプト互換',
    desc: (
      <>
        旧作者の台本は書き直しゼロ——<span className="font-mono text-xs">\0\s[0]こんにちは。\e</span> を
        SSTP(port 9801)や /sakura に渡すと、話者切替と表情つきでそのまま演じる。文字コードは
        送り主に合わせるので当時の Shift_JIS も化けず、EXECUTE の GetName / GetVersion にも応答する。
      </>
    ),
  },
  {
    Icon: Package,
    num: '07',
    title: 'キャラ資産の持ち込みと受け渡し',
    desc: 'SillyTavern のキャラクターカード(V2/V3)は PNG のままドロップで人格になり、絵はそのまま身体になる。2000年から続く伺かのシェルも surfaces.txt どおりに瞬いて口が動く。作った子は .mirika ひとつで受け渡せて、配る側には雛形から検証までの道具が付く。',
  },
  {
    Icon: RefreshCw,
    num: '08',
    title: 'どのマシンにも、同じ子',
    desc: '記憶も名前・性格も、暗号化した1ファイルで端末間を同期。置き場は自分のクラウドの同期フォルダ(無料)でも、こちらが預かる棚(Pro)でも。鍵は端末から出ず、取り込みは突き合わせ——どちらかにしかない会話も消えない。同期そのものは無料で、有料なのは置き場を用意するぶんだけ。',
  },
  {
    Icon: Users,
    num: '09',
    title: 'デスクトップに社会を',
    desc: 'SSTP コミュニケートで、同じデスクトップの他のゴースト(SSP など)と直接会話。Pro では別プロファイルの子をもう一体立てて、隣に並んで話し合う。歌(VOICEVOX 歌唱)とお絵かきも。配信では二つの立ち方があって、この子が番組を持つことも、あなたの配信の隣でコメントを読む相棒になることもできます(Pro)。',
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

function FeatureCard({ Icon, num, title, desc }: Feature) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      variants={cardVariants}
      whileHover={reduce ? undefined : { scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="relative border-r-2 border-b-2 border-white/10 p-8 bg-paper text-ink transition-colors hover:z-10 hover:bg-white/[0.05] hover:shadow-[0_0_40px_rgba(255,107,143,0.12)]"
    >
      <div className="flex items-center justify-between mb-6">
        <Icon className="w-6 h-6 text-sakura" />
        <span className="font-mono text-xs text-sub">{num}</span>
      </div>
      <h3 className="font-mincho font-bold text-xl mb-3">{title}</h3>
      <p className="text-sub text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

/* 「さらに、その先へ。」拡張機能グリッド */
type ExtRow = { label: string; desc: string; phase: string; done: boolean };

const EXT_ROWS: ExtRow[] = [
  { label: '思い出話と忘却', desc: '記憶は沈み、たまに発掘される。「そういえば1年前……」', phase: 'P2', done: true },
  { label: '事実と気持ちを分けて残す', desc: '何をしたかと、そのとき何を感じていたかは別もの。翌日「昨日は疲れてたけど、今日は大丈夫?」と続く', phase: 'P6', done: true },
  { label: '思い出を、仕事と同じ重さで', desc: '「友達のプロポーズがうまくいった」「絵を見て笑った」——用事ではない出来事こそ、覚えておく', phase: 'P6', done: true },
  { label: '季節と行事の演出', desc: '桜が舞い、雪が降り、誕生日には紙吹雪', phase: 'P2', done: true },
  { label: 'スクリーン理解', desc: 'ローカルVLMが画面を見て「エラー出てるよ」。既定オフ・端末外送信なし', phase: 'P4', done: true },
  { label: 'クリップボード反応', desc: 'エラーをコピーした瞬間「それ、調べようか？」(オプトイン)', phase: 'P4', done: true },
  { label: 'ローカルRAG', desc: '自分のメモ・文書に詳しくなる。「先週のメモどこだっけ」に端末内で回答', phase: 'P4', done: true },
  { label: 'ブラウザ連携', desc: '拡張機能で見ているページを把握・要約(オプトイン)', phase: 'P4', done: true },
  { label: '自発的な興味', desc: '話題を覚えて後日調べ、自分から話を振ってくる', phase: 'P4', done: true },
  { label: 'Live2Dシェル', desc: 'Cubism対応。本体・相方でVRMと混在でき、桃瀬ひより/Mao同梱', phase: 'P5', done: true },
  { label: 'OBS配信モード', desc: 'グリーンバック表示でゴーストをそのまま配信画面へ(Pro)', phase: 'P5', done: true },
  { label: '配信を手伝う', desc: 'あなたが主役の配信で、コメントを読み、呼ばれたときだけ返す相棒に(Pro)', phase: 'P7', done: true },
  { label: 'コメントビューア連携', desc: 'わんコメ等の「棒読みちゃん連携」を向けるだけ。配信サイトは問わない(Pro)', phase: 'P7', done: true },
  { label: 'OBS の遠隔操作', desc: '「配信の準備して」で配信を開始し、告知文の下書きまで(投稿はご自分で・Pro)', phase: 'P7', done: true },
  { label: 'メールの見張り(POP)', desc: 'Google 連携なしでも新着に気づく。読むのは差出人と件名だけ', phase: 'P4', done: true },
  { label: '外からの知らせ', desc: '自作スクリプトや他のアプリの通知を、この子の口から', phase: 'P4', done: true },
  { label: '別の画面に住む', desc: '余ったタブレットをこの子の身体に(合言葉つきで受け入れ)', phase: 'P7', done: false },
  { label: '動作ログ', desc: '不具合の報告に添えられる記録。秘密は伏せ字・7日分', phase: 'P5', done: true },
  { label: 'デバイス間同期', desc: '記憶も名前・性格もE2E暗号化で同期——どのマシンにも同じ子がいる(無料。置き場を預かるぶんが Pro)', phase: 'P6', done: true },
  { label: '人格回帰テスト', desc: 'ゴールデン対話集で「この子らしさ」をCI検証(mirika-test。SDK zip に同梱)', phase: 'P6', done: true },
  { label: 'クラシックシェル', desc: '旧伺かのサーフェスPNGシェルも、見た目ごとそのまま動く', phase: 'P6', done: true },
  { label: '歌とお絵かき', desc: '歌唱合成で誕生日に歌い、ローカル画像生成で絵を見せてくれる', phase: 'P7', done: true },
  { label: 'デスクトップ操作', desc: '提案→確認→実行の提案型に限定して、0.8 で慎重に導入', phase: 'P7', done: false },
];

export function Features() {
  return (
    <section id="features" className="border-t border-cream/10 bg-black/20 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <Reveal className="mb-14">
          <Kicker index="02" label="Features" />
          <h2 className="font-mincho font-bold text-3xl md:text-4xl">「生きている」を、つくる。</h2>
        </Reveal>

        <StaggerGroup className="grid md:grid-cols-3 border-t-2 border-l-2 border-white/10 shadow-[0_0_48px_rgba(255,107,143,0.08)]">
          {FEATURES.map((f) => (
            <FeatureCard key={f.num} {...f} />
          ))}
        </StaggerGroup>

        {/* 拡張機能一覧 */}
        <div className="mt-16">
          <Reveal>
            <h3 className="font-mincho font-bold text-xl md:text-2xl mb-2">
              さらに、<span className="text-sakura">その先へ。</span>
            </h3>
            <p className="text-mist text-sm leading-relaxed mb-8">
              <span className="text-sakura font-semibold">✓</span> は実装済み、
              <span className="text-mist/50">予定</span> はこれから。上段が実装済みの拡張機能です(P = Phase)。
            </p>
          </Reveal>
          <StaggerGroup className="grid md:grid-cols-2 gap-x-12 border-t border-cream/10" amount={0.05}>
            {EXT_ROWS.map((row) => (
              <StaggerItem
                key={row.label}
                className="flex items-baseline gap-4 py-3.5 border-b border-cream/10"
              >
                <span className={`font-mono text-xs w-32 shrink-0 ${row.done ? 'text-sakura' : 'text-mist/70'}`}>
                  {row.label}
                </span>
                <span className={`text-sm flex-1 ${row.done ? 'text-mist' : 'text-mist/60'}`}>{row.desc}</span>
                <span className="font-mono text-[10px] shrink-0 whitespace-nowrap">
                  {row.done ? <span className="text-sakura">✓</span> : <span className="text-mist/40">予定</span>}{' '}
                  <span className="text-mist/50">{row.phase}</span>
                </span>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
