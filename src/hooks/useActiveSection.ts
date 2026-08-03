import { useEffect, useState } from 'react';

/**
 * スクロール位置から現在表示中のセクション id を返す。
 * ids はモジュール定数など安定した参照を渡すこと。
 * rootMargin は既定で「画面中央にあるもの」。Docs の目次のように
 * 「読み始めた節」を指したい場合は呼び出し側で調整する。
 */
export function useActiveSection(
  ids: readonly string[],
  rootMargin = '-45% 0px -50% 0px',
  refreshKey: unknown = 0,
): string {
  const [active, setActive] = useState<string>(ids[0] ?? '');

  // biome-ignore lint/correctness/useExhaustiveDependencies: refreshKey は「対象が後から生えた」合図(lazy 本文の到着)
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin, threshold: [0, 0.2, 0.5, 1] },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, rootMargin, refreshKey]);

  return active;
}
