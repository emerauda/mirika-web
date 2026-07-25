import { useState } from 'react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from 'motion/react';
import { Ghost, Menu, X, Crown } from 'lucide-react';
import { GitHubMark, NAV_ITEMS } from './ui';
import { MagneticLink } from './primitives';
import { useActiveSection } from '../hooks/useActiveSection';

const SECTION_IDS = NAV_ITEMS.map((i) => i.id);

export function Nav() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 12));
  const active = useActiveSection(SECTION_IDS);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? 'bg-night/95 backdrop-blur-md border-cream/10 shadow-[0_8px_30px_rgba(0,0,0,0.35)]'
          : 'bg-night/70 backdrop-blur border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <Ghost className="w-5 h-5 text-sakura transition-transform group-hover:-rotate-12" />
          <span className="font-mincho font-bold text-lg tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-[#ff8fab] via-[#c9a2ff] to-[#8be2f5]">
            Mirika.
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-6 font-mono text-xs text-mist" aria-label="メインナビゲーション">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`relative py-1 transition-colors hover:text-sakura ${active === item.id ? 'text-sakura' : ''}`}
            >
              {item.label}
              {active === item.id &&
                (reduce ? (
                  <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-sakura" />
                ) : (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-0.5 left-0 right-0 h-px bg-sakura"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                ))}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="/docs"
            className="hidden sm:inline-flex items-center font-mono text-xs text-mist hover:text-sakura transition-colors"
          >
            使い方
          </a>
          <MagneticLink
            href="https://pro.mirika.dev/"
            target="_blank"
            rel="noopener"
            className="hidden sm:inline-flex btn-hard items-center gap-1.5 bg-gradient-to-r from-[#ff8fab] to-[#c9a2ff] text-white px-4 py-2 font-mono text-xs font-semibold"
          >
            <Crown className="w-3.5 h-3.5" /> Pro
          </MagneticLink>
          <MagneticLink
            href="https://github.com/emerauda/mirika-releases"
            target="_blank"
            rel="noopener"
            className="btn-hard inline-flex items-center gap-2 bg-paper text-ink px-4 py-2 font-mono text-xs font-medium"
          >
            <GitHubMark className="w-4 h-4" /> GitHub
          </MagneticLink>
          <button
            onClick={() => setOpen((o) => !o)}
            className="lg:hidden p-2 text-mist hover:text-sakura transition-colors"
            aria-label="メニューを開く"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="lg:hidden overflow-hidden border-t border-cream/10 bg-night/98"
            aria-label="モバイルナビゲーション"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={reduce ? { height: 'auto', opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="max-w-6xl mx-auto px-6 py-4 grid grid-cols-2 gap-x-8 gap-y-3 font-mono text-sm text-mist">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="hover:text-sakura transition-colors py-1"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/docs"
                onClick={() => setOpen(false)}
                className="hover:text-sakura transition-colors py-1"
              >
                使い方
              </a>
              <a
                href="https://pro.mirika.dev/"
                target="_blank"
                rel="noopener"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-1.5 text-sakura hover:text-cream transition-colors py-1"
              >
                <Crown className="w-3.5 h-3.5" /> Pro
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
