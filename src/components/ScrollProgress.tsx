import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';

/** ページ最上部のスクロール進捗バー */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left brand-gradient"
      style={{ scaleX: reduce ? scrollYProgress : scaleX }}
    />
  );
}
