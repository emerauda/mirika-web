import type { ReactNode } from 'react';

/* OS ウィンドウのタイトルバー */
export function TitleBar({
  children,
  center = false,
}: {
  children: ReactNode;
  center?: boolean;
}) {
  return <div className={`os-titlebar ${center ? 'justify-center' : ''}`}>{children}</div>;
}

/* セクション見出しの上に付く「01 Concept」表記 */
export function Kicker({
  index,
  label,
  className,
}: {
  index: string;
  label: string;
  className?: string;
}) {
  return (
    <p className={`font-mono text-xs text-mist tracking-widest uppercase mb-3 ${className ?? ''}`}>
      <span className="text-sakura">{index}</span> {label}
    </p>
  );
}

/* GitHub マーク */
export function GitHubMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

/* X (Twitter) マーク */
export function XMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
    </svg>
  );
}

/* ナビゲーション項目(id はスクロール監視にも使う) */
export const NAV_ITEMS = [
  { id: 'concept', label: 'Concept' },
  { id: 'features', label: 'Features' },
  { id: 'usecases', label: 'Use Cases' },
  { id: 'architecture', label: 'Ghost/Shell/Brain' },
  { id: 'tech', label: 'Stack' },
  { id: 'roadmap', label: 'Roadmap' },
  { id: 'vision', label: 'Vision' },
  { id: 'faq', label: 'FAQ' },
] as const;
