/* さくらスクリプトが流れる帯 */
import { useEffect, useRef } from 'react';

const MARQUEE_TEXT =
  '\\0\\s[0]こんにちは。\\e ・ OnBoot ・ OnAiTalk ・ \\s[10] ・ OnMouseDoubleClick ・ SEND SSTP/1.4 ・ %username ・ OnMinuteChange ・ \\w8 ・ OnConsolidation ・ \\q[企画書を読む,onOpen] ・ SSTP/1.4 200 OK ・ OnFirstBoot ・ \\_w[500] ・ OnCommunicate ・ memory.db ・ \\e';

/** 1秒あたりに流す距離(px) */
const SPEED = 42;

export function Marquee() {
  const track = useRef<HTMLDivElement>(null);

  /**
   * 帯は自分で動かす。
   *
   * CSS アニメーションに任せると、タブを離れたあとや描画が混んだあとに
   * 途中で固まったまま戻らないことがある(実際に止まった)。
   * requestAnimationFrame なら、止まるのは「画面を見ていないあいだ」だけで、
   * 戻ってくれば必ず動き出す。動きを減らす設定の人には動かさず、
   * 設定が途中で切り替わればその場で止める/動かす。
   */
  useEffect(() => {
    const el = track.current;
    if (!el) return;

    let raf = 0;
    let running = false;
    let last = performance.now();
    let x = 0;

    const step = (now: number) => {
      // タブから戻った直後に一気に飛ばないよう、間隔は上限を切る
      const dt = Math.min(80, now - last) / 1000;
      last = now;
      const half = el.scrollWidth / 2; // 同じ文字列を2つ並べてあるので半分で1周
      if (half > 0) {
        x = (x + SPEED * dt) % half;
        el.style.transform = `translate3d(${-x}px, 0, 0)`;
      }
      raf = requestAnimationFrame(step);
    };
    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(step);
    };
    const stop = () => {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
      // 止めたら初期位置へ(最初から動かしていないときと同じ見た目に)
      x = 0;
      el.style.transform = '';
    };

    // 動きを減らす設定は初回に見るだけでなく、OS 側での切り替えにも追従する
    const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const sync = () => {
      if (mq?.matches) stop();
      else start();
    };
    sync();
    mq?.addEventListener('change', sync);

    // 復帰時に時計を合わせ直す(離れているあいだの経過を持ち込まない)
    const resync = () => {
      last = performance.now();
    };
    document.addEventListener('visibilitychange', resync);
    window.addEventListener('pageshow', resync);
    return () => {
      cancelAnimationFrame(raf);
      mq?.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', resync);
      window.removeEventListener('pageshow', resync);
    };
  }, []);

  return (
    <div className="border-b border-cream/10 bg-black/25 overflow-hidden" aria-hidden="true">
      <div ref={track} className="marquee-track py-2.5 font-mono text-xs text-mist/70">
        <span>{MARQUEE_TEXT}</span>
        <span>{MARQUEE_TEXT}</span>
      </div>
    </div>
  );
}
