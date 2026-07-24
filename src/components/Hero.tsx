import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type Variants,
} from 'motion/react';
import { Download, ArrowDown, ChevronDown } from 'lucide-react';
import { TitleBar } from './ui';
import { MagneticLink } from './primitives';

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

export function Hero() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const gx = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.6 });
  const gy = useSpring(my, { stiffness: 120, damping: 20, mass: 0.6 });

  const handleMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    mx.set(nx * 26);
    my.set(ny * 22);
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const motionProps = reduce ? {} : { variants: container, initial: 'hidden' as const, animate: 'show' as const };
  const itemProps = reduce ? {} : { variants: item };

  return (
    <section className="relative border-b border-cream/10 overflow-hidden" onPointerMove={handleMove} onPointerLeave={handleLeave}>
      {/* 漂うオーロラ背景 */}
      {!reduce && (
        <div className="absolute inset-0 -z-0 pointer-events-none" aria-hidden="true">
          <motion.div
            className="absolute -top-24 -left-24 w-[36rem] h-[36rem] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(255,107,143,0.16), transparent 60%)' }}
            animate={{ x: [0, 40, -10, 0], y: [0, 30, 10, 0], scale: [1, 1.12, 0.98, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-10 right-[-6rem] w-[32rem] h-[32rem] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(124,108,240,0.16), transparent 60%)' }}
            animate={{ x: [0, -30, 12, 0], y: [0, 20, -18, 0], scale: [1, 1.08, 1.04, 1] }}
            transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      )}

      <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-14 items-center">
        <motion.div className="space-y-8" {...motionProps}>
          <motion.p className="font-mono text-xs text-mist tracking-widest uppercase" {...itemProps}>
            <span className="text-sakura">●</span> Phase 5 プロダクト化 — Local-First AI Ghost
          </motion.p>
          <motion.h1 className="glow-text font-mincho font-bold text-4xl md:text-6xl leading-snug md:leading-snug" {...itemProps}>
            デスクトップに、<br />
            <span className="kenten">魂</span>と<span className="kenten">知能</span>を。
          </motion.h1>
          <motion.p className="text-mist leading-loose max-w-md" {...itemProps}>
            VRMやLive2Dの身体に、ローカルLLMの頭脳と、数年単位の記憶を。
            API費ゼロで24時間デスクトップに常駐して、あなたと共に成長する——
            新しいデスクトップゴーストをつくります。
          </motion.p>
          <motion.div className="flex flex-wrap gap-4" {...itemProps}>
            <MagneticLink
              href="#download"
              className="btn-hard inline-flex items-center gap-2 bg-sakura text-white px-6 py-3.5 font-bold text-sm"
            >
              <Download className="w-4 h-4" /> ダウンロード
            </MagneticLink>
            <MagneticLink
              href="#roadmap"
              className="btn-hard inline-flex items-center gap-2 bg-paper text-ink px-6 py-3.5 font-bold text-sm"
            >
              ロードマップ <ArrowDown className="w-4 h-4" />
            </MagneticLink>
          </motion.div>
          <motion.p className="font-mono text-[11px] text-mist/80 pt-2" {...itemProps}>
            &gt; brain: qwen3:8b (local) ・ shell: vrm / live2d / classic ・ memory: day 397 ・ api cost: ¥0
          </motion.p>
        </motion.div>

        {/* デスクトップ(ウィンドウ+バルーン) */}
        <motion.div
          className="relative"
          style={reduce ? undefined : { x: gx, y: gy }}
          initial={reduce ? undefined : { opacity: 0, scale: 0.94 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        >
          <div className="os-window">
            <TitleBar>
              <span>ghost/first — shell.vrm</span>
              <span className="text-sub tracking-widest">— □ ×</span>
            </TitleBar>
            <div className="grid-paper h-[440px] md:h-[500px] flex items-end justify-end pr-3 md:pr-6 overflow-hidden">
              <motion.img
                src="/mirika.png"
                className="h-[88%] w-auto object-contain object-bottom rounded-xl drop-shadow-[0_0_26px_rgba(255,107,143,0.28)]"
                alt="Mirika のキャラクター"
                animate={reduce ? undefined : { y: [0, -8, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </div>
          <motion.div
            className="balloon absolute -left-3 md:-left-8 top-6 w-56 md:w-64 p-5 z-10"
            initial={reduce ? undefined : { opacity: 0, y: 14, x: -8 }}
            animate={reduce ? undefined : { opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.7 }}
          >
            <p className="font-mono text-[10px] text-sub mb-2 tracking-wider uppercase">Ghost Message — via Local LLM</p>
            <p className="leading-relaxed font-medium">
              おかえりなさい！<br />
              昨日話してた締切、今日だよね。大丈夫？
            </p>
            <div className="mt-3 border-t border-ink/10 pt-2">
              <a href="#usecases" className="choice font-mono text-sm">▷ 大丈夫</a>
              <a href="#features" className="choice font-mono text-sm">▷ ヤバい、手伝って</a>
            </div>
            <p className="mt-3 border-t border-ink/10 pt-2 font-mono text-[10px] text-sub/80 break-all">
              \0\s[happy]おかえりなさい！\w8\1\s[10]締切、今日までだぞ。\e
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* スクロールキュー */}
      {!reduce && (
        <motion.a
          href="#concept"
          aria-label="下へスクロール"
          className="absolute left-1/2 -translate-x-1/2 bottom-4 hidden md:flex flex-col items-center gap-1 text-mist/70 hover:text-sakura transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span className="font-mono text-[10px] tracking-widest uppercase">scroll</span>
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown className="w-4 h-4" />
          </motion.span>
        </motion.a>
      )}
    </section>
  );
}
