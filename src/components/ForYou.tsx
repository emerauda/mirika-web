import type { ComponentType } from 'react';
import { Smile, Sparkles, MessageCircle, Ghost, Mail, Music } from 'lucide-react';
import { Kicker, TitleBar } from './ui';
import { Reveal, StaggerGroup, StaggerItem, TiltCard } from './primitives';

type Entry = { from: string; Icon: ComponentType<{ className?: string }>; title: string; desc: string };

const ENTRIES: Entry[] = [
  {
    from: 'from: vroid / 3d',
    Icon: Smile,
    title: 'VRMに、魂を。',
    desc: 'BoothやVRoid Studioのモデルに、ローカルLLMの人格を。揺れて、目で追って、撫でれば照れる。',
  },
  {
    from: 'from: mmd',
    Icon: Music,
    title: 'PMXで立って、VMDで踊る。',
    desc: 'MMDのモデルがそのまま身体に。.pmx を落とすだけで着替えて、着たまま .vmd を落とせば踊る。',
  },
  {
    from: 'from: 受信箱',
    Icon: Mail,
    title: '机の上に、秘書を。',
    desc: 'メール・予定・タスクを人格ごしに。「1件急ぎっぽいよ」から朝が始まる。書類を落とせばそのまま読む。',
  },
  {
    from: 'from: vtuber',
    Icon: Sparkles,
    title: '推しを、机の上に。',
    desc: 'Live2D(Cubism)モデルがそのまま常駐シェルに。配信は「番組を持つ」も「あなたの隣でコメントを読む」も。',
  },
  {
    from: 'from: ai チャット',
    Icon: MessageCircle,
    title: 'キャラカードに、身体を。',
    desc: 'SillyTavern等のキャラクターカードは PNG のままドロップでゴーストに。声と身体と、数年単位の記憶がつく。',
  },
  {
    from: 'from: 伺か',
    Icon: Ghost,
    title: 'あの子を、もう一度。',
    desc: 'さくらスクリプトも SSTP も動き、クラシックシェルは見た目ごとそのまま立つ——頭脳だけ本物のAIになって帰ってくる。',
  },
];

export function ForYou() {
  return (
    <section id="foryou" className="border-t border-cream/10 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <Reveal className="mb-14 text-center">
          <Kicker index="07" label="For You" />
          <h2 className="font-mincho font-bold text-3xl md:text-4xl leading-relaxed">
            あなたの入口は、<br className="md:hidden" />どこからでも。
          </h2>
        </Reveal>

        <StaggerGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ENTRIES.map((e) => (
            <StaggerItem key={e.from}>
              <TiltCard className="os-window h-full">
                <TitleBar>
                  <span>{e.from}</span>
                </TitleBar>
                <div className="p-6">
                  <e.Icon className="w-6 h-6 text-sakura mb-4" />
                  <h3 className="font-mincho font-bold text-lg mb-2.5">{e.title}</h3>
                  <p className="text-sub text-sm leading-relaxed">{e.desc}</p>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
