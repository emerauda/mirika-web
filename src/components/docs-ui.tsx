import type { ReactNode } from 'react';

/** 使い方ドキュメント(全言語共通)の組版部品。本文は docs-body-*.tsx が言語ごとに持つ。
 *  法務ページと共通の部品(P/B/C/A/Note/Shot)は prose.tsx にあり、ここから再輸出する。 */

export { A, B, C, Note, P, Shot } from './prose';

export function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-28 font-mincho text-2xl sm:text-3xl font-bold mb-4">
      {children}
    </h2>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="font-bold text-cream mt-8 mb-2 text-lg">{children}</h3>;
}

export function Pro() {
  return (
    <span className="ml-2 align-middle font-mono text-[10px] tracking-wide text-sakura border border-sakura/40 rounded px-1.5 py-0.5">
      PRO
    </span>
  );
}

export function Steps({ items }: { items: ReactNode[] }) {
  return (
    <ol className="mb-4 space-y-2">
      {items.map((item, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: 手順は固定で並び替えも起きない
        <li key={i} className="flex gap-3 text-mist leading-relaxed">
          <span className="font-mono text-xs text-sakura pt-1 shrink-0">{String(i + 1).padStart(2, '0')}</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}
