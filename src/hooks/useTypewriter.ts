import { useEffect, useState } from 'react';

/**
 * start が true になったら 0 → total まで 1 文字ずつ進むカウンタを返す。
 * 色つきトークン列を段階描画するために「文字数」だけを管理する。
 */
export function useTypewriter(total: number, start: boolean, speed = 26): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    setCount(0);
    let current = 0;
    const id = window.setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= total) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [total, start, speed]);

  return count;
}
