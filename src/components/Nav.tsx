import { useEffect, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from 'motion/react';
import { Ghost, Menu, X, Crown, Globe } from 'lucide-react';
import { GitHubMark, NAV_ITEMS } from './ui';
import { EASE, MagneticLink } from './primitives';
import { useActiveSection } from '../hooks/useActiveSection';
import { LANGS, useLang, useT, type Lang } from '../i18n';

/** 閉じているときの言語表示。フル名だとヘッダー幅が溢れる(実際に折り返しが出た)ので短く */
const LANG_SHORT: Record<Lang, string> = {
  ja: 'JA',
  en: 'EN',
  'zh-CN': '简',
  'zh-TW': '繁',
  ko: 'KO',
};

/** 言語の切替。見た目は短い表示、実体は上に重ねた透明の select(開けばフル名の5言語)。
 *  Docs・法務ページのヘッダーからも使う */
export function LangSwitch({ className }: { className?: string }) {
  const { lang, setLang } = useLang();
  return (
    <label
      className={`relative inline-flex items-center gap-1.5 text-mist hover:text-sakura focus-within:text-sakura transition-colors cursor-pointer ${className ?? ''}`}
    >
      <Globe className="w-3.5 h-3.5" aria-hidden="true" />
      <span className="font-mono text-xs whitespace-nowrap">{LANG_SHORT[lang]}</span>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value as Lang)}
        aria-label="Language"
        className="absolute inset-0 w-full opacity-0 cursor-pointer [&>option]:bg-night [&>option]:text-cream"
      >
        {LANGS.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </label>
  );
}

const SECTION_IDS = NAV_ITEMS.map((i) => i.id);
/** デスクトップのヘッダーに出す項目(全言語1行の幅制約があるため絞る) */
const DESKTOP_ITEMS = NAV_ITEMS.filter((i) => !i.mobileOnly);

export function Nav() {
  const t = useT();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 12));
  const active = useActiveSection(SECTION_IDS);

  // 開いている間: Esc で閉じる・背景のスクロールを止める(メニュー下で紙面が滑らない)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? 'bg-night/95 backdrop-blur-md border-cream/10 shadow-[0_8px_30px_rgba(0,0,0,0.35)]'
          : 'bg-night/70 backdrop-blur border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5 group">
          <Ghost className="w-5 h-5 text-sakura transition-transform group-hover:-rotate-12" />
          <span className="font-mincho font-bold text-lg tracking-wide brand-gradient-text">
            Mirika.
          </span>
        </a>

        <nav
          className="hidden xl:flex items-center gap-5 font-mono text-xs text-mist"
          aria-label={t('メインナビゲーション', 'Main navigation', {
            'zh-CN': '主导航',
            'zh-TW': '主導覽',
            ko: '메인 내비게이션',
          })}
        >
          {DESKTOP_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? 'true' : undefined}
              className={`relative py-1 whitespace-nowrap transition-colors hover:text-sakura ${active === item.id ? 'text-sakura' : ''}`}
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

        <div className="flex items-center gap-2.5">
          <LangSwitch className="hidden md:inline-flex" />
          <a
            href="/docs"
            className="hidden sm:inline-flex items-center font-mono text-xs text-mist hover:text-sakura transition-colors whitespace-nowrap"
          >
            {t('使い方', 'Docs', { 'zh-CN': '使用指南', 'zh-TW': '使用指南', ko: '사용법' })}
          </a>
          <MagneticLink
            href="https://pro.mirika.dev/"
            target="_blank"
            rel="noopener"
            className="hidden sm:inline-flex btn-hard items-center gap-1.5 bg-gradient-to-r from-sakura-lite to-iris text-plum px-4 py-2 font-mono text-xs font-bold"
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
            className="xl:hidden p-2 text-mist hover:text-sakura transition-colors"
            aria-label={
              open
                ? t('メニューを閉じる', 'Close menu', { 'zh-CN': '关闭菜单', 'zh-TW': '關閉選單', ko: '메뉴 닫기' })
                : t('メニューを開く', 'Open menu', { 'zh-CN': '打开菜单', 'zh-TW': '開啟選單', ko: '메뉴 열기' })
            }
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
            className="xl:hidden overflow-hidden border-t border-cream/10 bg-night/98"
            aria-label={t('モバイルナビゲーション', 'Mobile navigation', {
              'zh-CN': '移动端导航',
              'zh-TW': '行動版導覽',
              ko: '모바일 내비게이션',
            })}
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={reduce ? { height: 'auto', opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            <div className="max-w-6xl mx-auto px-6 py-4 grid grid-cols-2 gap-x-8 gap-y-3 font-mono text-sm text-mist">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={`hover:text-sakura transition-colors py-1 ${active === item.id ? 'text-sakura' : ''}`}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/docs"
                onClick={() => setOpen(false)}
                className="hover:text-sakura transition-colors py-1"
              >
                {t('使い方', 'Docs', { 'zh-CN': '使用指南', 'zh-TW': '使用指南', ko: '사용법' })}
              </a>
              <LangSwitch className="py-1" />
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
