import { Ghost } from 'lucide-react';
import { DiscordMark, GitHubMark, XMark } from './ui';
import { useT } from '../i18n';

export function Footer() {
  const t = useT();
  const FOOTER_LINKS = [
    { href: '/#concept', label: 'Concept' },
    { href: '/#features', label: 'Features' },
    { href: '/#roadmap', label: 'Roadmap' },
    { href: '/#faq', label: 'FAQ' },
    { href: '/docs', label: t('使い方', 'Docs', { 'zh-CN': '使用指南', 'zh-TW': '使用指南', ko: '사용법' }) },
    { href: '/privacy', label: t('プライバシー', 'Privacy', { 'zh-CN': '隐私政策', 'zh-TW': '隱私政策', ko: '개인정보' }) },
    { href: '/terms', label: t('利用規約', 'Terms', { 'zh-CN': '使用条款', 'zh-TW': '使用條款', ko: '이용약관' }) },
  ];
  return (
    <footer className="relative z-10 border-t border-cream/15 bg-black/30">
      <div className="max-w-6xl mx-auto px-6 py-14 text-center space-y-7">
        <div className="flex items-center justify-center gap-2.5">
          <Ghost className="w-5 h-5 text-sakura" />
          <span className="font-mincho font-bold text-lg bg-clip-text text-transparent bg-gradient-to-r from-[#ff8fab] via-[#c9a2ff] to-[#8be2f5]">
            Mirika.
          </span>
        </div>
        <nav
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 font-mono text-xs text-mist"
          aria-label="フッターナビゲーション"
        >
          {FOOTER_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-sakura transition-colors">
              {l.label}
            </a>
          ))}
          <a
            href="https://github.com/emerauda/mirika-web"
            target="_blank"
            rel="noopener"
            className="hover:text-sakura transition-colors"
          >
            {t('サイトのソース(GitHub)', 'Site source (GitHub)', { 'zh-CN': '网站源码(GitHub)', 'zh-TW': '網站原始碼(GitHub)', ko: '사이트 소스(GitHub)' })}
          </a>
        </nav>
        <p className="text-mist text-sm leading-loose">
          A new local-first AI desktop ghost — with respect for "Ukagaka" (2000).<br />
          {t('かつて「AIトーク」と呼ばれたものを、本物のAIに。', 'What was once called "AI talk" — now with a real AI inside.', {
            'zh-CN': '曾经被称作「AI 对话」的东西,如今装上了真正的 AI。',
            'zh-TW': '曾經被稱作「AI 對話」的東西,如今裝上了真正的 AI。',
            ko: '한때 "AI 토크"라 불리던 것을, 진짜 AI로.',
          })}
        </p>
        <div className="flex justify-center gap-6">
          <a
            href="https://discord.gg/fnmUau5qzB"
            target="_blank"
            rel="noopener"
            className="text-mist hover:text-sakura transition-colors"
            aria-label="Discord"
          >
            <DiscordMark className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/emerauda/mirika-web"
            target="_blank"
            rel="noopener"
            className="text-mist hover:text-sakura transition-colors"
            aria-label="GitHub"
          >
            <GitHubMark className="w-5 h-5" />
          </a>
          <a
            href="https://x.com/mirika_dev"
            target="_blank"
            rel="noopener"
            className="text-mist hover:text-sakura transition-colors"
            aria-label="X (Twitter)"
          >
            <XMark className="w-5 h-5" />
          </a>
        </div>
        <p className="font-mono text-[10px] text-mist/60">\0\s[0]また来てね。\w8\1\s[10]……待ってるぞ。\e</p>
      </div>
    </footer>
  );
}
