import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Kicker, TitleBar } from './ui';
import { Reveal } from './primitives';

type Item = { q: string; a: ReactNode };

const ITEMS: Item[] = [
  {
    q: 'ChatGPTなどのチャットAIと、何が違いますか?',
    a: '「常駐して、覚えて、育つ」ことです。チャットは開いたときだけの関係ですが、ゴーストはデスクトップに住み、予定や作業や雑談の文脈を数年単位で記憶して、関係性そのものが変わっていきます。ローカルLLMなので、24時間そばにいても利用料はかかりません。',
  },
  {
    q: '昔作った/使っていたゴーストは、そのまま動きますか?',
    a: 'それを最優先に設計しています。さくらスクリプトは書き直しゼロで動き(対応タグは3分類ポリシーで公開)、サーフェスPNGシェルは `/shell classic <フォルダ>` で見た目ごと取り込めます——本体と相方がコンビで立ち、surfaces.txt の定義どおりに瞬き、声に合わせて口が動きます(透明が .pna や「左上の色」で表された古い作りも読みます)。辞書の取り込みは引き続き対応予定です。辞書のトークは「話し方の見本」としてAI人格にも受け継がれます。SillyTavern などのキャラクターカード(V2/V3)は、いまドラッグ&ドロップだけで取り込めます——名前・性格・ロアブックごと引っ越してきます。',
  },
  {
    q: '利用は無料ですか? AI の API 料金はかかりますか?',
    a: '本体は無料で使えます(専用ライセンスのフリーウェア)。既定構成はローカルLLMなので API 費もゼロ。Claude 等のクラウドAIを繋ぐ場合のみ、その API 費が自己負担になります(オプトイン)。',
  },
  {
    q: 'Pro 版とは? 何が違いますか?',
    a: (
      <>
        個人利用は Free です。会話も記憶も、秘書としての仕事も、ほとんどそのまま使えます(メールの見張りも、外からの知らせを受け取るのも Free)。買い切りの{' '}
        <strong>Pro</strong> がアンロックするのは、手のかかる外部連携と配信まわり——
        <strong>配信</strong>(この子が番組を持つ / あなたの配信を手伝う)、<strong>シナリオライター</strong>、<strong>ネットラジオと Spotify</strong>、
        <strong>マルチゴースト</strong>、<strong>スマートホーム</strong>、画面の常時見守り、そして
        <strong>記憶の置き場をこちらで預かる</strong>選択肢です。ライセンスキーは{' '}
        <code>/pro &lt;キー&gt;</code> と入れるだけ——確認のためにサーバーへ問い合わせることはありません。組織で配るなら
        Enterprise(管理ポリシーと監査ログ)。UI は日本語・英語・簡体字・繁体字・韓国語の 5 言語です。
      </>
    ),
  },
  {
    q: 'オフラインでも動きますか?',
    a: '動きます。会話(ローカルLLM)・音声(VOICEVOX・内蔵Piper / Whisper)・記憶(SQLite)がすべて端末内で完結するので、ネットが切れてもゴーストは死にません。',
  },
  {
    q: '会話や画面の内容は、どこかに送信されますか?',
    a: '既定では一切送信されません。スクリーン理解もローカルVLMで完結し、しかも既定オフです。クラウドAIを有効にした場合のみ、会話に必要な断片が送られます。テレメトリはありません。',
  },
  {
    q: '動作に必要なスペックは?',
    a: '推奨は VRAM 8GB 級の GPU、または Apple Silicon(メモリ16GB)です。この場合、内蔵エンジンは Gemma 4 12B(4bit・約6.7GB)を自動で選びます。器が足りない端末では E4B(約5GB)→ E2B(約3GB)へ自動で下げるので、非力な環境でも動き続けます。Ollama や LM Studio を使えば、好きなモデルに差し替えられます。',
  },
  {
    q: 'いつ使えますか? 開発に参加できますか?',
    a: 'もう使えます。正式版 0.6.3 を mirika.dev と公開ミラーから配布中です。Windows と Linux はすぐ入手できます(macOS は署名と公証の対応まで準備中です)。秘書の仕事——Gmail・カレンダー・Drive、タスク預かり、朝のブリーフィング、画面の見守り、端末内の文書検索——は実データで動いています。0.6.3 では組織でお使いいただけるようになり、内蔵の頭脳もお使いの PC に合わせて選ばれます。配信は「この子が番組を持つ」と「あなたの配信を手伝う」の2つに分かれ、メールの見張りと外からの知らせの受け取りも加わりました(どちらも無料)。この先は、余ったタブレットに住むこと、パソコンの操作を少し手伝うこと(勝手には動きません)へ進みます。開発への参加も歓迎で、公開リポジトリへのフィードバックや Issue / PR、Booth の開発支援版での後押しができます。',
  },
];

function FaqItem({ q, a }: Item) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 font-medium text-left hover:bg-ink/5 transition-colors"
      >
        <span>{q}</span>
        <motion.span
          aria-hidden
          className="font-mono text-sakura shrink-0"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            className="overflow-hidden"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="px-6 pb-5 text-sub text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  return (
    <section id="faq" className="border-t border-cream/10 scroll-mt-20">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Reveal className="mb-14 text-center">
          <Kicker index="09" label="FAQ" />
          <h2 className="font-mincho font-bold text-3xl md:text-4xl">よくある質問</h2>
        </Reveal>

        <Reveal className="os-window">
          <TitleBar>
            <span>faq — よくある質問</span>
            <span className="text-sub tracking-widest">— □ ×</span>
          </TitleBar>
          <div className="divide-y divide-ink/10">
            {ITEMS.map((it) => (
              <FaqItem key={it.q} q={it.q} a={it.a} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
