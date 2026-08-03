import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useReducedMotion,
  type Variants,
} from 'motion/react';

/** サイト共通のイージング(各所で同値を再定義しない) */
export const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * スクロールで現れる要素の見え始めを決める。
 *
 * **内容がアニメーションに依存して消えたままにならないこと**が第一。
 * 背の高い要素に「何割見えたら」という条件を課すと、画面より高い塊は条件を
 * 満たせずに沈黙する(実際、拡張機能の一覧が opacity:0 のまま出てこなかった)。
 * ここでは threshold 0 ——**1px でも入ったら出す**。さらに保険として、
 * 観測がどこかで途切れても、画面の近くにある塊は少し待って必ず出す。
 */
function useAppear() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    const safety = setTimeout(() => {
      if (el.getBoundingClientRect().top < window.innerHeight * 1.4) setShown(true);
    }, 1200);
    return () => {
      io.disconnect();
      clearTimeout(safety);
    };
  }, []);
  return { ref, shown };
}

/* ---------- Reveal: 単一要素のスクロール出現 ---------- */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  const { ref, shown } = useAppear();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Stagger: 子要素を順に出現 ---------- */
const groupVariants: Variants = {
  hidden: {},
  // 一覧が30行を超えることがある。0.08 刻みだと最後の行が出るまで2秒以上かかり、
  // 読もうとした人には「出てこない」に見える
  show: { transition: { staggerChildren: 0.03, delayChildren: 0.02 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export function StaggerGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const { ref, shown } = useAppear();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      ref={ref}
      className={className}
      variants={groupVariants}
      initial="hidden"
      animate={shown ? 'show' : 'hidden'}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

/* ---------- TiltCard: ポインタ追従 3D チルト + 桜グロー ---------- */
const spring = { stiffness: 220, damping: 18, mass: 0.4 };

export function TiltCard({
  children,
  className,
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(px, spring);
  const rotateY = useSpring(py, spring);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glow = useMotionTemplate`radial-gradient(260px circle at ${gx}% ${gy}%, rgba(255,107,143,0.16), transparent 72%)`;

  if (reduce) return <div className={className}>{children}</div>;

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width;
    const ny = (e.clientY - r.top) / r.height;
    py.set((nx - 0.5) * max * 2);
    px.set(-(ny - 0.5) * max * 2);
    gx.set(nx * 100);
    gy.set(ny * 100);
  };
  const handleLeave = () => {
    px.set(0);
    py.set(0);
    gx.set(50);
    gy.set(50);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className ?? ''}`}
      style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: 'preserve-3d' }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      {children}
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit]"
        style={{ background: glow }}
      />
    </motion.div>
  );
}

/* ---------- MagneticLink: 磁石ホバー + ポップ ---------- */
export function MagneticLink({
  href,
  className,
  children,
  target,
  rel,
  ariaLabel,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  target?: string;
  rel?: string;
  ariaLabel?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 300, damping: 18 });
  const y = useSpring(my, { stiffness: 300, damping: 18 });

  if (reduce) {
    return (
      <a href={href} className={className} target={target} rel={rel} aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  const handleMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    mx.set(Math.max(-8, Math.min(8, (e.clientX - cx) * 0.3)));
    my.set(Math.max(-8, Math.min(8, (e.clientY - cy) * 0.3)));
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      className={className}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
      style={{ x, y }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 320, damping: 18 }}
    >
      {children}
    </motion.a>
  );
}
