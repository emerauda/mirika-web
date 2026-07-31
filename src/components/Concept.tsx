import type { ReactNode } from 'react';
import { Kicker, TitleBar } from './ui';
import { Reveal, StaggerGroup, StaggerItem } from './primitives';

type Row = {
  l: ReactNode;
  r: ReactNode;
  highlight?: boolean;
  lClass?: string;
  rClass?: string;
};

const ROWS: Row[] = [
  { l: 'ベースウェア(SSP / materia)', r: 'Mirika 本体(Electron・3OS常駐)' },
  { l: 'SHIORI(里々・YAYA・華和梨)', r: 'ローカルLLM(Qwen / Gemma)+クラウド任意' },
  { l: 'シェル(サーフェス画像・\\s[n])', r: 'VRM / Live2D / MMD(表情・視線・撫で判定)+クラシック互換' },
  {
    l: '「AIトーク」(スクリプト再生)',
    r: '「AIトーク」(本物のAI)',
    highlight: true,
    lClass: 'font-bold',
    rClass: 'font-bold text-sakura',
  },
  { l: 'メールチェック(POP3 biff)', r: 'Gmail・カレンダー・タスク(MCP秘書)' },
  { l: '辞書(エンジン依存・起動回数で成長)', r: '人格プロンプト+memory.db(モデル非依存・数年単位で成長)' },
  { l: 'ゴーストのネットワーク更新', r: '.mirika パッケージ配布(作って、配って、育てる)' },
];

export function Concept() {
  return (
    <section id="concept" className="max-w-6xl mx-auto px-6 py-24 scroll-mt-20">
      <Reveal className="mb-14">
        <Kicker index="01" label="Concept" />
        <h2 className="font-mincho font-bold text-3xl md:text-4xl leading-relaxed">
          ただのチャットAIは、<br className="md:hidden" />つくらない。
        </h2>
        <p className="text-mist leading-loose mt-5 max-w-2xl">
          つくるのは、デスクトップに住む「存在」です。頭脳はローカルLLMだから、24時間そばにいても
          利用料はゼロで、会話は端末の外に出ない。<strong className="text-cream">記憶と人格はモデルから独立しているから、
          数年単位で関係が育つ。</strong>ルーツは2000年のデスクトップマスコット「伺か」——
          受け継ぐものと、新しくするものは、この表のとおりです。
        </p>
      </Reveal>

      <Reveal className="os-window">
        <TitleBar>
          <span>mapping — ukagaka(2000) → mirika(2026)</span>
          <span className="text-sub tracking-widest">— □ ×</span>
        </TitleBar>
        <StaggerGroup className="divide-y divide-ink/10">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_56px_1fr] items-center px-6 py-3.5 font-mono text-[11px] text-sub uppercase tracking-widest bg-ink/5">
            <span>Ukagaka — 2000</span>
            <span className="hidden md:block"></span>
            <span>Mirika — 2026</span>
          </div>
          {ROWS.map((row, i) => (
            <StaggerItem
              key={i}
              className={`grid grid-cols-1 md:grid-cols-[1fr_56px_1fr] items-center px-6 py-4 gap-1 ${row.highlight ? 'bg-sakura/10' : ''}`}
            >
              <span className={row.lClass}>{row.l}</span>
              <span className="text-sakura font-mono md:text-center">→</span>
              <span className={row.rClass}>{row.r}</span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Reveal>
    </section>
  );
}
