import type { ComponentType, ReactNode } from 'react';
import { Ghost, Package, Brain } from 'lucide-react';
import { Kicker, TitleBar } from './ui';
import { Reveal, StaggerGroup, StaggerItem, TiltCard } from './primitives';

type Card = {
  bar: string;
  barRight: string;
  Icon: ComponentType<{ className?: string }>;
  name: string;
  desc: ReactNode;
  mono: ReactNode;
};

const CARDS: Card[] = [
  {
    bar: 'ghost/ — 魂',
    barRight: '人格',
    Icon: Ghost,
    name: 'Ghost',
    desc: (
      <>
        人格プロンプト+記憶DB。自然言語とデータだから、
        どのモデルにも、どの身体にも載せ替えられる。
      </>
    ),
    mono: (
      <>
        persona/system.md<br />memory.db(=魂)
      </>
    ),
  },
  {
    bar: 'shell/ — 身体',
    barRight: '交換可能',
    Icon: Package,
    name: 'Shell',
    desc: (
      <>
        今日はVRM・Live2D・MMD、いつかはロボット。ShellProtocol を実装すれば
        何でも身体になれる。\s[10]の感覚は mapping.json が翻訳。
      </>
    ),
    mono: (
      <>
        vrm / live2d / classic / robot<br />mapping.json
      </>
    ),
  },
  {
    bar: 'brain/ — 頭脳',
    barRight: '世代交代',
    Icon: Brain,
    name: 'Brain',
    desc: (
      <>
        頭脳のLLMは差し替え自由。Qwen、Gemma、Claude——
        モデルが世代交代しても、記憶と人格は連続する。
      </>
    ),
    mono: (
      <>
        built-in / ollama / lm studio<br />claude api (opt-in)
      </>
    ),
  },
];

export function Architecture() {
  return (
    <section id="architecture" className="border-t border-cream/10 bg-black/20 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <Reveal className="mb-14">
          <Kicker index="04" label="Architecture" />
          <h2 className="font-mincho font-bold text-3xl md:text-4xl leading-relaxed">
            ゴースト・シェル・ブレイン、<br className="md:hidden" />三層の分離。
          </h2>
          <p className="text-mist leading-loose mt-5 max-w-2xl">
            人格(ゴースト)・身体(シェル)・頭脳(AIモデル)を、最初から分けて設計します。
            どれを乗り換えても、あの子はあの子のまま——長く共に居るための構造です。
          </p>
        </Reveal>

        <StaggerGroup className="grid md:grid-cols-3 gap-6">
          {CARDS.map((c) => (
            <StaggerItem key={c.name}>
              <TiltCard className="os-window h-full">
                <TitleBar>
                  <span>{c.bar}</span>
                  <span className="text-sub">{c.barRight}</span>
                </TitleBar>
                <div className="p-7">
                  <c.Icon className="w-6 h-6 text-sakura mb-5" />
                  <h3 className="font-mincho font-bold text-xl mb-3">{c.name}</h3>
                  <p className="text-sub text-sm leading-relaxed mb-4">{c.desc}</p>
                  <p className="font-mono text-[11px] text-sub/80">{c.mono}</p>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal>
          <p className="font-mincho text-lg md:text-xl text-center mt-14 leading-loose">
            魂は <span className="font-mono text-sakura text-base">memory.db</span> と人格定義に宿り、
            <br className="md:hidden" />モデルの重みには宿らない。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
