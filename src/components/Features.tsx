import type { ComponentType, ReactNode } from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { Smile, Brain, Database, Mail, Mic, Feather } from 'lucide-react';
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
    desc: '会話をSQLiteに記憶し、関連する昔の話を検索でふっと思い出す。夜のあいだに整理して、夢を見る。呼び方、好み、記念日、その日の気分——数年単位で関係性が育ちます。ゴーストの魂は1つの memory.db。バックアップも引っ越しも自由。',
  },
  {
    Icon: Mail,
    num: '04',
    title: 'AI Secretary(MCP)',
    desc: 'Model Context Protocol で外部ツールと接続——もう動いています。Gmail・カレンダー・Drive(Google純正MCP)が載り、「メール来てるよ、1件は急ぎっぽい」と人格を通して届く。タスク預かり・定期チェック・きょうのブリーフィングまで、秘書として実運用中です。',
  },
  {
    Icon: Mic,
    num: '05',
    title: '全ローカル音声対話',
    desc: '日本語は VOICEVOX / AivisSpeech、英語・中国語は内蔵 Piper で完全ローカルに発話——モーラ(母音)リップシンク付き。Whisper(transformers.js)のマイク入力は呼びかけ起動の常時待機つき。音声ファイルをドロップすれば同じ Whisper で文字起こしして要約・感想も返す(精度はモデル次第)。どの言語も OpenAI 互換 TTS API で好きな声に差し替えられます。文単位のパイプライン合成で、話しかけてから3秒以内に声が返る。音声も会話もあなたのマシンから出ていきません。',
  },
  {
    Icon: Feather,
    num: '06',
    title: 'さくらスクリプト互換',
    desc: (
      <>
        旧作者の台本は書き直しゼロ——<span className="font-mono text-xs">\0\s[0]こんにちは。\e</span> を
        SSTP(port 9801)や /sakura に渡すと、話者切替と\s[n]相当の表情つきで3Dキャラがそのまま演じる(実装済み)。
        辞書の「話し方の見本」取り込みとサーフェスPNGシェル(クラシック)は Phase 6。
      </>
    ),
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
  { label: '季節と行事の演出', desc: '桜が舞い、雪が降り、誕生日には紙吹雪', phase: 'P2', done: true },
  { label: 'スクリーン理解', desc: 'ローカルVLMが画面を見て「エラー出てるよ」。既定オフ・端末外送信なし', phase: 'P4', done: true },
  { label: 'クリップボード反応', desc: 'エラーをコピーした瞬間「それ、調べようか？」(オプトイン)', phase: 'P4', done: true },
  { label: 'ローカルRAG', desc: '自分のメモ・文書に詳しくなる。「先週のメモどこだっけ」に端末内で回答', phase: 'P4', done: true },
  { label: 'ブラウザ連携', desc: '拡張機能で見ているページを把握・要約(オプトイン)', phase: 'P4', done: true },
  { label: '自発的な興味', desc: '話題を覚えて後日調べ、自分から話を振ってくる', phase: 'P4', done: true },
  { label: 'Live2Dシェル', desc: 'Cubism対応。本体・相方でVRMと混在でき、桃瀬ひより/Mao同梱', phase: 'P5', done: true },
  { label: 'OBS配信モード', desc: 'グリーンバック表示でゴーストをそのまま配信画面へ(Pro)', phase: 'P5', done: true },
  { label: 'デバイス間同期', desc: 'memory.db をE2E暗号化で同期——どのマシンにも同じ子がいる(Pro)', phase: 'P6', done: false },
  { label: '人格回帰テスト', desc: 'mirika test で「この子らしさ」をCI検証', phase: 'P6', done: false },
  { label: 'クラシックシェル', desc: '旧伺かのサーフェスPNGシェルも、見た目ごとそのまま動く', phase: 'P6', done: false },
  { label: '歌とお絵かき', desc: '歌唱合成で誕生日に歌い、ローカル画像生成で絵を見せてくれる', phase: 'P7', done: false },
  { label: 'デスクトップ操作', desc: '提案→確認→実行の提案型に限定して、慎重に導入', phase: 'P7', done: false },
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
