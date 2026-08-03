import type { ReactNode } from 'react';

/**
 * 長文ページ(使い方・法務)共通の組版部品。
 * docs-ui.tsx / legal-ui.tsx が再輸出するので、本文ファイルの import は従来のまま。
 * 見出し(H2/H3)は両ページで余白・級数が違うため、それぞれの ui に残している。
 */

export function P({ children }: { children: ReactNode }) {
  return <p className="text-mist leading-relaxed mb-4">{children}</p>;
}

export function B({ children }: { children: ReactNode }) {
  return <strong className="text-cream">{children}</strong>;
}

export function C({ children }: { children: ReactNode }) {
  return (
    <code className="font-mono text-[0.9em] text-sakura bg-paper/60 px-1.5 py-0.5 rounded">
      {children}
    </code>
  );
}

/** 本文リンク。blank で新しいタブ(既定は同タブ — 文中の続き読みを邪魔しない) */
export function A({ href, blank, children }: { href: string; blank?: boolean; children: ReactNode }) {
  return (
    <a
      href={href}
      className="text-sakura hover:underline"
      {...(blank ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      {children}
    </a>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <div className="my-5 rounded-lg border-l-2 border-sakura/50 bg-paper/40 px-4 py-3 text-sm text-mist leading-relaxed">
      {children}
    </div>
  );
}

/** 図版の寸法(CLS 対策)。追加したら here に1行足す */
const SHOT_DIMS: Record<string, { w: number; h: number }> = {
  '/shots/settings-secretary.webp': { w: 1026, h: 1233 },
  '/shots/settings-sync.webp': { w: 1058, h: 1273 },
  '/shots/settings-stream.webp': { w: 1041, h: 1263 },
};

/** スクリーンショット図版(枠+キャプション)。5言語の本文から同じ形で使う */
export function Shot({ src, alt, caption }: { src: string; alt: string; caption: ReactNode }) {
  const dims = SHOT_DIMS[src];
  return (
    <figure className="my-6 rounded-lg overflow-hidden border border-cream/10">
      <img
        src={src}
        alt={alt}
        className="block w-full h-auto"
        loading="lazy"
        width={dims?.w}
        height={dims?.h}
      />
      <figcaption className="px-4 py-2.5 text-xs text-sub bg-paper/40">{caption}</figcaption>
    </figure>
  );
}
