/* さくらスクリプトが流れる帯(純 CSS マーキー・reduced-motion で停止) */
import { useEffect, useRef } from 'react';

const MARQUEE_TEXT =
  '\\0\\s[0]こんにちは。\\e ・ OnBoot ・ OnAiTalk ・ \\s[10] ・ OnMouseDoubleClick ・ SEND SSTP/1.4 ・ %username ・ OnMinuteChange ・ \\w8 ・ OnConsolidation ・ \\q[企画書を読む,onOpen] ・ SSTP/1.4 200 OK ・ OnFirstBoot ・ \\_w[500] ・ OnCommunicate ・ memory.db ・ \\e';

export function Marquee() {
  const track = useRef<HTMLDivElement>(null);

  // ブラウザはタブを離れているあいだや省電力の判断でアニメーションを止めることがあり、
  // 戻ってきても再開しないことがある(帯が途中で固まって見える)。
  // 復帰の合図で、走っていないものを黙って動かし直す。
  // reduced-motion のときは animation 自体が無いので、ここは何もしない。
  useEffect(() => {
    const el = track.current;
    if (!el?.getAnimations) return;
    const kick = () => {
      for (const anim of el.getAnimations()) {
        if (anim.playState !== 'running') anim.play();
      }
    };
    document.addEventListener('visibilitychange', kick);
    window.addEventListener('pageshow', kick);
    window.addEventListener('focus', kick);
    return () => {
      document.removeEventListener('visibilitychange', kick);
      window.removeEventListener('pageshow', kick);
      window.removeEventListener('focus', kick);
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
