import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';

/** 背景演出: スクロール連動のパララックス光球 + 舞い落ちる花びら */
const petals = [
  { left: '6%', duration: '17s', delay: '0s' },
  { left: '22%', duration: '23s', delay: '6s' },
  { left: '41%', duration: '19s', delay: '12s' },
  { left: '63%', duration: '25s', delay: '3s' },
  { left: '78%', duration: '18s', delay: '9s' },
  { left: '92%', duration: '22s', delay: '15s' },
];

export function BackgroundFX() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 280]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -220]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {!reduce && (
        <>
          <motion.div
            className="absolute -top-40 left-[8%] w-[30rem] h-[30rem] rounded-full blur-3xl opacity-60"
            style={{ y: y1, background: 'radial-gradient(circle, rgba(255,107,143,0.10), transparent 62%)' }}
          />
          <motion.div
            className="absolute top-[60%] right-[6%] w-[26rem] h-[26rem] rounded-full blur-3xl opacity-60"
            style={{ y: y2, background: 'radial-gradient(circle, rgba(124,108,240,0.10), transparent 62%)' }}
          />
        </>
      )}
      {petals.map((p, i) => (
        <span
          key={i}
          className="petal"
          style={{ left: p.left, animationDuration: p.duration, animationDelay: p.delay }}
        />
      ))}
    </div>
  );
}
