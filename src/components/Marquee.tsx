/* さくらスクリプトが流れる帯(純 CSS マーキー・reduced-motion で停止) */
const MARQUEE_TEXT =
  '\\0\\s[0]こんにちは。\\e ・ OnBoot ・ OnAiTalk ・ \\s[10] ・ OnMouseDoubleClick ・ SEND SSTP/1.4 ・ %username ・ OnMinuteChange ・ \\w8 ・ OnConsolidation ・ \\q[企画書を読む,onOpen] ・ SSTP/1.4 200 OK ・ OnFirstBoot ・ \\_w[500] ・ OnCommunicate ・ memory.db ・ \\e';

export function Marquee() {
  return (
    <div className="border-b border-cream/10 bg-black/25 overflow-hidden" aria-hidden="true">
      <div className="marquee-track py-2.5 font-mono text-xs text-mist/70">
        <span>{MARQUEE_TEXT}</span>
        <span>{MARQUEE_TEXT}</span>
      </div>
    </div>
  );
}
