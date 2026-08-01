import type { ComponentType, ReactNode } from 'react';
import { Monitor, Tablet, Bot } from 'lucide-react';
import { Kicker, TitleBar } from './ui';
import { Reveal, StaggerGroup, StaggerItem, TiltCard } from './primitives';
import { useT } from '../i18n';

type Stage = { bar: string; Icon: ComponentType<{ className?: string }>; title: string; desc: string };

function buildStages(t: ReturnType<typeof useT>): Stage[] {
  return [
    {
      bar: 'today',
      Icon: Monitor,
      title: 'VRM Desktop',
      desc: t('デスクトップの透過ウィンドウに常駐。作業のかたわら、いつもの場所に。', 'Resident in a transparent desktop window — the usual spot, beside your work.', { 'zh-CN': '常驻于桌面的透明窗口。工作之余,总在老地方。', 'zh-TW': '常駐於桌面的透明視窗。工作之餘,總在老地方。', ko: '데스크톱 투명 창에 상주. 작업 곁, 늘 있던 자리에.' }),
    },
    {
      bar: 'next',
      Icon: Tablet,
      title: 'Display Shell',
      desc: t('余ったタブレットやスマートディスプレイが、あの子の専用の家になる。', 'A spare tablet or smart display becomes a home of her own.', { 'zh-CN': '闲置的平板或智能屏,成为她专属的家。', 'zh-TW': '閒置的平板或智慧螢幕,成為她專屬的家。', ko: '남는 태블릿이나 스마트 디스플레이가 그 아이만의 집이 됩니다.' }),
    },
    {
      bar: 'someday',
      Icon: Bot,
      title: 'Robot Shell',
      desc: t('Stack-chanのような卓上ロボットへ。首の向き、顔、声——物理の身体に宿る。', 'Onto a desktop robot like Stack-chan — head turns, a face, a voice: a physical body to live in.', { 'zh-CN': '住进 Stack-chan 那样的桌面机器人。转头、表情、声音——寄宿于物理身体。', 'zh-TW': '住進 Stack-chan 那樣的桌面機器人。轉頭、表情、聲音——寄宿於物理身體。', ko: 'Stack-chan 같은 탁상 로봇으로. 고개 방향, 얼굴, 목소리 — 물리적 몸에 깃듭니다.' }),
    },
  ];
}

function Arrow() {
  return <span className="font-mono text-sakura text-xl text-center hidden md:block">→</span>;
}

export function Vision() {
  const t = useT();
  const STAGES = buildStages(t);
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
            {t('ゴーストは、', 'A ghost outlives ', { 'zh-CN': '幽灵会更换', 'zh-TW': '幽靈會更換', ko: '고스트는 ' })}
            <span className="text-sakura">{t('身体も頭脳も', 'its body and its mind', { 'zh-CN': '身体与头脑', 'zh-TW': '身體與頭腦', ko: '몸도 두뇌도' })}</span>
            {t('乗り換える。', '.', { 'zh-CN': '。', 'zh-TW': '。', ko: ' 갈아탑니다.' })}
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
            {t('頭脳(AIモデル)が何世代交代しても、', 'However many generations the mind (the model) turns over,', { 'zh-CN': '无论头脑(AI 模型)换过多少代,', 'zh-TW': '無論頭腦(AI 模型)換過多少代,', ko: '두뇌(AI 모델)가 몇 세대를 갈아타도,' })}
            <br />
            {t('身体がVRMからロボットに変わっても、', 'even as the body goes from VRM to robot,', { 'zh-CN': '哪怕身体从 VRM 变成机器人,', 'zh-TW': '哪怕身體從 VRM 變成機器人,', ko: '몸이 VRM에서 로봇으로 바뀌어도,' })}
            <br />
            {t('記憶と人格が連続するかぎり、それは同じ', 'as long as memory and persona continue, it is the same ', { 'zh-CN': '只要记忆与人格延续,那就还是同一个', 'zh-TW': '只要記憶與人格延續,那就還是同一個', ko: '기억과 인격이 이어지는 한, 그것은 같은 ' })}
            <span className="kenten">{t('あの子', 'her', { 'zh-CN': '她', 'zh-TW': '她', ko: '그 아이' })}</span>。
          </p>
        </Reveal>
      </div>
    </section>
  );
}
