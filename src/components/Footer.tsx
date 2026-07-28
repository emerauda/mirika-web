import { Ghost } from 'lucide-react';
import { GitHubMark, XMark } from './ui';

const FOOTER_LINKS = [
  { href: '/#concept', label: 'Concept' },
  { href: '/#features', label: 'Features' },
  { href: '/#roadmap', label: 'Roadmap' },
  { href: '/#faq', label: 'FAQ' },
  { href: '/docs', label: 'Docs' },
  { href: '/privacy', label: 'プライバシー' },
  { href: '/terms', label: '利用規約' },
];

export function Footer() {
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
            サイトのソース(GitHub)
          </a>
        </nav>
        <p className="text-mist text-sm leading-loose">
          A new local-first AI desktop ghost — with respect for "Ukagaka" (2000).<br />
          かつて「AIトーク」と呼ばれたものを、本物のAIに。
        </p>
        <div className="flex justify-center gap-6">
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
            href="https://x.com/Aoi_Emerauda"
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
