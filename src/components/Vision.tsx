import type { ComponentType, ReactNode } from 'react';
import { Monitor, Tablet, Bot } from 'lucide-react';
import { Kicker, TitleBar } from './ui';
import { Reveal, StaggerGroup, StaggerItem, TiltCard } from './primitives';

type Stage = { bar: string; Icon: ComponentType<{ className?: string }>; title: string; desc: string };

const STAGES: Stage[] = [
  {
    bar: 'today',
    Icon: Monitor,
    title: 'VRM Desktop',
    desc: 'デスクトップの透過ウィンドウに常駐。作業のかたわら、いつもの場所に。',
  },
  {
    bar: 'next',
    Icon: Tablet,
    title: 'Display Shell',
    desc: '余ったタブレットやスマートディスプレイが、あの子の専用の家になる。',
  },
  {
    bar: 'someday',
    Icon: Bot,
    title: 'Robot Shell',
    desc: 'Stack-chanのような卓上ロボットへ。首の向き、顔、声——物理の身体に宿る。',
  },
];

function Arrow() {
  return <span className="font-mono text-sakura text-xl text-center hidden md:block">→</span>;
}

export function Vision() {
  const cards: ReactNode[] = STAGES.map((s) => (
    <StaggerItem key={s.bar}>
      <TiltCard className="os-window text-center h-full">
        <TitleBar center>
          <span>{s.bar}</span>
        </TitleBar>
        <div className="p-7">
          <s.Icon className="w-7 h-7 text-sakura mx-auto mb-4" />
          <h3 className="font-mincho font-bold text-lg mb-2">{s.title}</h3>
          <p className="text-sub text-xs leading-relaxed">{s.desc}</p>
        </div>
      </TiltCard>
    </StaggerItem>
  ));

  return (
    <section id="vision" className="border-t border-cream/10 bg-black/20 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <Reveal className="mb-14 text-center">
          <Kicker index="08" label="Vision" />
          <h2 className="font-mincho font-bold text-3xl md:text-4xl leading-relaxed">
            ゴーストは、<span className="text-sakura">身体も頭脳も</span>乗り換える。
          </h2>
        </Reveal>

        <StaggerGroup className="grid md:grid-cols-[1fr_40px_1fr_40px_1fr] gap-4 items-center max-w-4xl mx-auto">
          {cards[0]}
          <Arrow />
          {cards[1]}
          <Arrow />
          {cards[2]}
        </StaggerGroup>

        <Reveal>
          <p className="font-mincho text-center text-lg md:text-xl leading-loose mt-16 max-w-2xl mx-auto">
            頭脳(AIモデル)が何世代交代しても、<br />
            身体がVRMからロボットに変わっても、<br />
            記憶と人格が連続するかぎり、それは同じ<span className="kenten">あの子</span>。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
