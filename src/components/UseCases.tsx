import { useMemo, useRef, type ReactNode } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { Terminal, Calendar, Heart, Moon, Check } from 'lucide-react';
import { Kicker, TitleBar } from './ui';
import { Reveal } from './primitives';
import { useTypewriter } from '../hooks/useTypewriter';
import { useCountUp } from '../hooks/useCountUp';

/* ---------- タイプアウトするターミナル ---------- */
type Tok = { t: string; c?: string };

const TERMINAL_TOKENS: Tok[] = [
  { t: '➜', c: 'text-green-400' },
  { t: ' ' },
  { t: '~', c: 'text-blue-300' },
  { t: ' npm test\n' },
  { t: '✘ 3 tests failed\n\n', c: 'text-red-400' },
  { t: 'Ghost: 「あ、これ昨日も落ちてたやつ。\n　スタックトレース読もうか？」', c: 'text-slate-500' },
];

function sliceTokens(tokens: Tok[], count: number): Tok[] {
  const out: Tok[] = [];
  let off = 0;
  for (const tok of tokens) {
    if (count <= off) break;
    const end = Math.min(tok.t.length, count - off);
    out.push({ t: tok.t.slice(0, end), c: tok.c });
    off += tok.t.length;
  }
  return out;
}

function Cursor() {
  const reduce = useReducedMotion();
  if (reduce) return <span className="text-slate-300">▋</span>;
  return (
    <motion.span
      className="text-slate-300 inline-block"
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    >
      ▋
    </motion.span>
  );
}

function TerminalMock() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const total = useMemo(() => TERMINAL_TOKENS.reduce((n, t) => n + t.t.length, 0), []);
  const typed = useTypewriter(total, inView && !reduce, 34);
  const count = reduce ? total : typed;
  const shown = sliceTokens(TERMINAL_TOKENS, count);

  return (
    <div
      ref={ref}
      className="bg-[#0b0912] text-slate-300 p-6 font-mono text-xs md:text-sm leading-relaxed whitespace-pre-wrap min-h-[132px]"
    >
      {shown.map((tok, i) =>
        tok.c ? (
          <span key={i} className={tok.c}>
            {tok.t}
          </span>
        ) : (
          <span key={i}>{tok.t}</span>
        ),
      )}
      <Cursor />
    </div>
  );
}

/* ---------- 記念日カウントアップ ---------- */
function AnnivDays() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const val = useCountUp(397, inView && !reduce);
  return <span ref={ref}>{reduce ? 397 : val}</span>;
}

/* ---------- 共通: チェックリスト ---------- */
function CheckList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2.5 text-sm">
      {items.map((it, i) => (
        <li key={i} className="flex items-center gap-3">
          <Check className="w-4 h-4 text-sakura" /> {it}
        </li>
      ))}
    </ul>
  );
}

export function UseCases() {
  return (
    <section id="usecases" className="border-t border-cream/10 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6 py-24 space-y-20">
        <Reveal>
          <Kicker index="03" label="Use Cases" />
          <h2 className="font-mincho font-bold text-3xl md:text-4xl">仕事も、日常も、そばに。</h2>
        </Reveal>

        {/* Coding Companion */}
        <Reveal className="grid md:grid-cols-2 gap-12 items-center">
          <div className="os-window">
            <TitleBar>
              <span>terminal — npm test</span>
              <span className="text-sub tracking-widest">— □ ×</span>
            </TitleBar>
            <TerminalMock />
          </div>
          <div>
            <p className="font-mono text-xs text-sakura tracking-widest uppercase mb-4 flex items-center gap-2">
              <Terminal className="w-4 h-4" /> Coding Companion
            </p>
            <h3 className="font-mincho font-bold text-2xl md:text-3xl mb-5 leading-relaxed">
              孤独な夜のデバッグも、<br />もう一人じゃない。
            </h3>
            <p className="text-mist leading-loose mb-6">
              画面のエラーに自分で気づいて(ローカルVLM)解決策を提案してくれたり、
              長時間作業していると「そろそろ休憩したら？」と声をかけてくれます。
              画面もコードも、あなたのマシンから出ていきません。
            </p>
            <CheckList
              items={[
                'スクリーン理解でエラーに自分で気づく(オプトイン)',
                'ポモドーロ・休憩のうながし',
                '難問だけクラウドAIへ昇格(オプトイン)',
              ]}
            />
          </div>
        </Reveal>

        {/* Personal Secretary */}
        <Reveal className="grid md:grid-cols-2 gap-12 items-center">
          <div className="md:order-2">
            <div className="os-window">
              <TitleBar>
                <span>schedule — today (jul 16)</span>
                <span className="text-sub tracking-widest">— □ ×</span>
              </TitleBar>
              <div className="p-6 space-y-2.5 text-sm">
                <div className="flex items-center gap-3 border-l-4 border-ink/30 bg-ink/5 px-3 py-2">
                  <span className="font-mono text-xs text-sub">10:00</span> Team Meeting
                </div>
                <div className="flex items-center gap-3 border-l-4 border-ink/30 bg-ink/5 px-3 py-2">
                  <span className="font-mono text-xs text-sub">13:00</span> Code Review
                </div>
                <div className="flex items-center gap-3 border-l-4 border-sakura bg-sakura/10 px-3 py-2 text-[#ff8fab]">
                  <span className="font-mono text-xs">Ghost</span> 「15時の空き、作業に使う？」
                </div>
              </div>
            </div>
          </div>
          <div className="md:order-1">
            <p className="font-mono text-xs text-sakura tracking-widest uppercase mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Personal Secretary
            </p>
            <h3 className="font-mincho font-bold text-2xl md:text-3xl mb-5 leading-relaxed">
              秘書として、<br />あなたの時間を管理する。
            </h3>
            <p className="text-mist leading-loose mb-6">
              MCPでGoogleカレンダーやGmailと連携し、予定を把握。
              朝の挨拶で今日の予定を教えてくれて、会議の10分前には声をかけてくれます。
              全画面作業中や会議中は黙って待つ——空気を読むのも人格のうち。
            </p>
            <CheckList
              items={[
                'Gmail・カレンダー・Drive連携(MCP)',
                'タスク・案件管理と締切前の催促',
                '定期チェックはローカルLLMでコストゼロ',
              ]}
            />
          </div>
        </Reveal>

        {/* Everyday Partner */}
        <Reveal className="grid md:grid-cols-2 gap-12 items-center">
          <div className="os-window">
            <TitleBar>
              <span>memory.db — 就寝時整理</span>
              <span className="flex items-center gap-1 text-sub">
                <Moon className="w-3.5 h-3.5" /> consolidating…
              </span>
            </TitleBar>
            <div className="p-6 font-mono text-xs leading-loose">
              <p>
                <span className="text-[#ff8fab] font-semibold">fact</span> ユーザーは猫を飼っている{' '}
                <span className="text-sub/60">(2026-05-12)</span>
              </p>
              <p>
                <span className="text-[#ff8fab] font-semibold">fact</span> 好きな曲: シューゲイザー系{' '}
                <span className="text-sub/60">(2026-06-02)</span>
              </p>
              <p>
                <span className="text-[#ff8fab] font-semibold">anniv</span> 初起動から <AnnivDays />日{' '}
                <span className="text-sub/60">← もうすぐ400日!</span>
              </p>
              <p>
                <span className="text-[#ff8fab] font-semibold">episode</span> 昨日: 締切の相談、少し疲れてた様子
              </p>
              <p>
                <span className="text-[#ff8fab] font-semibold">dream</span> 締切が猫になって逃げていく夢(?)
              </p>
              <p className="text-sub/60 border-t border-ink/10 mt-3 pt-3">consolidating today's memories…</p>
            </div>
          </div>
          <div>
            <p className="font-mono text-xs text-sakura tracking-widest uppercase mb-4 flex items-center gap-2">
              <Heart className="w-4 h-4" /> Everyday Partner
            </p>
            <h3 className="font-mincho font-bold text-2xl md:text-3xl mb-5 leading-relaxed">
              昨日の話を、<br />覚えていてくれる。
            </h3>
            <p className="text-mist leading-loose mb-6">
              ランダムトークは、もう擬似じゃない本物のAIトーク。
              夜のあいだに会話を整理して夢を見て、翌朝「変な夢見た……」と教えてくれる。
              雨の日は静かで、褒めた日は上機嫌——気分は移ろい、関係は数年単位で育つ。
            </p>
            <CheckList
              items={[
                '数年単位の長期記憶と関係性パラメータ',
                '気分(ムード)モデルと夢——朝の顔が毎日違う',
                '記念日・時報・起動挨拶(ルールで即応)',
              ]}
            />
          </div>
        </Reveal>

      </div>
    </section>
  );
}
