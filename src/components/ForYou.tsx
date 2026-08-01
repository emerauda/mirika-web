import type { ComponentType } from 'react';
import { Smile, Sparkles, MessageCircle, Ghost, Mail, Music } from 'lucide-react';
import { Kicker, TitleBar } from './ui';
import { Reveal, StaggerGroup, StaggerItem, TiltCard } from './primitives';
import { useT } from '../i18n';

type Entry = { from: string; Icon: ComponentType<{ className?: string }>; title: string; desc: string };

export function ForYou() {
  const t = useT();
  const ENTRIES: Entry[] = [
    {
      from: 'from: vroid / 3d',
      Icon: Smile,
      title: t('VRMに、魂を。', 'A soul for your VRM.', { 'zh-CN': '给 VRM 一个灵魂。', 'zh-TW': '給 VRM 一個靈魂。', ko: 'VRM에, 영혼을.' }),
      desc: t('BoothやVRoid Studioのモデルに、ローカルLLMの人格を。揺れて、目で追って、撫でれば照れる。', 'Give a Booth or VRoid Studio model a local-LLM persona. Hair sways, eyes follow, and she blushes when petted.', {
        'zh-CN': '给 Booth 或 VRoid Studio 的模型装上本地 LLM 的人格。发丝会晃,目光会追,摸摸头还会害羞。',
        'zh-TW': '給 Booth 或 VRoid Studio 的模型裝上本地 LLM 的人格。髮絲會晃,目光會追,摸摸頭還會害羞。',
        ko: 'Booth나 VRoid Studio 모델에 로컬 LLM 인격을. 머리칼이 흔들리고, 눈으로 따라오고, 쓰다듬으면 수줍어합니다.',
      }),
    },
    {
      from: 'from: mmd',
      Icon: Music,
      title: t('PMXで立って、VMDで踊る。', 'Stand in PMX, dance in VMD.', { 'zh-CN': '以 PMX 站立,随 VMD 起舞。', 'zh-TW': '以 PMX 站立,隨 VMD 起舞。', ko: 'PMX로 서고, VMD로 춤춘다.' }),
      desc: t('MMDのモデルがそのまま身体に。.pmx を落とすだけで着替えて、着たまま .vmd を落とせば踊る。', 'MMD models become her body as-is: drop a .pmx to change, drop a .vmd while wearing it and she dances.', {
        'zh-CN': 'MMD 模型直接成为身体:丢入 .pmx 即换装,穿着时丢入 .vmd 就起舞。',
        'zh-TW': 'MMD 模型直接成為身體:丟入 .pmx 即換裝,穿著時丟入 .vmd 就起舞。',
        ko: 'MMD 모델이 그대로 몸이 됩니다. .pmx를 떨어뜨리면 갈아입고, 입은 채 .vmd를 떨어뜨리면 춤춥니다.',
      }),
    },
    {
      from: t('from: 受信箱', 'from: inbox', { 'zh-CN': 'from: 收件箱', 'zh-TW': 'from: 收件匣', ko: 'from: 받은편지함' }),
      Icon: Mail,
      title: t('机の上に、秘書を。', 'A secretary on your desk.', { 'zh-CN': '桌上有位秘书。', 'zh-TW': '桌上有位秘書。', ko: '책상 위에, 비서를.' }),
      desc: t('メール・予定・タスクを人格ごしに。「1件急ぎっぽいよ」から朝が始まる。書類を落とせばそのまま読む。', 'Mail, calendar and tasks, delivered through a persona. Mornings start with "one of these looks urgent." Drop a document and she just reads it.', {
        'zh-CN': '邮件、日程、任务,都经由人格传达。早晨从「有一封看起来挺急」开始。丢个文件给她,直接读。',
        'zh-TW': '郵件、日程、任務,都經由人格傳達。早晨從「有一封看起來挺急」開始。丟個文件給她,直接讀。',
        ko: '메일·일정·태스크를 인격을 통해. 아침은 "한 건은 급해 보여요"로 시작합니다. 서류를 떨어뜨리면 그대로 읽습니다.',
      }),
    },
    {
      from: 'from: vtuber',
      Icon: Sparkles,
      title: t('推しを、机の上に。', 'Your fave, on the desk.', { 'zh-CN': '把本命请上桌面。', 'zh-TW': '把本命請上桌面。', ko: '최애를, 책상 위에.' }),
      desc: t('Live2D(Cubism)モデルがそのまま常駐シェルに。配信は「番組を持つ」も「あなたの隣でコメントを読む」も。', 'Live2D (Cubism) models become a resident shell. For streaming she can host her own show — or sit beside you reading comments.', {
        'zh-CN': 'Live2D(Cubism)模型直接成为常驻外壳。直播既能「自己开节目」,也能「坐在你旁边读评论」。',
        'zh-TW': 'Live2D(Cubism)模型直接成為常駐外殼。直播既能「自己開節目」,也能「坐在你旁邊讀評論」。',
        ko: 'Live2D(Cubism) 모델이 그대로 상주 셸로. 방송은 "직접 진행"도, "당신 옆에서 댓글 읽기"도 됩니다.',
      }),
    },
    {
      from: t('from: ai チャット', 'from: ai chat', { 'zh-CN': 'from: ai 聊天', 'zh-TW': 'from: ai 聊天', ko: 'from: ai 챗' }),
      Icon: MessageCircle,
      title: t('キャラカードに、身体を。', 'A body for your character card.', { 'zh-CN': '给角色卡一个身体。', 'zh-TW': '給角色卡一個身體。', ko: '캐릭터 카드에, 몸을.' }),
      desc: t('SillyTavern等のキャラクターカードは PNG のままドロップでゴーストに。声と身体と、数年単位の記憶がつく。', 'Character cards (SillyTavern etc.) become ghosts by dropping the PNG as-is — gaining a voice, a body, and memory that spans years.', {
        'zh-CN': 'SillyTavern 等的角色卡,PNG 直接拖入即成幽灵——获得声音、身体,和以年计的记忆。',
        'zh-TW': 'SillyTavern 等的角色卡,PNG 直接拖入即成幽靈——獲得聲音、身體,和以年計的記憶。',
        ko: 'SillyTavern 등의 캐릭터 카드는 PNG 그대로 드롭하면 고스트로 — 목소리와 몸, 몇 년 단위의 기억이 생깁니다.',
      }),
    },
    {
      from: t('from: 伺か', 'from: ukagaka', { 'zh-CN': 'from: 伺か', 'zh-TW': 'from: 伺か', ko: 'from: 우카가카' }),
      Icon: Ghost,
      title: t('あの子を、もう一度。', 'That ghost, once more.', { 'zh-CN': '让那孩子,再次醒来。', 'zh-TW': '讓那孩子,再次醒來。', ko: '그 아이를, 다시 한번.' }),
      desc: t('さくらスクリプトも SSTP も動き、クラシックシェルは見た目ごとそのまま立つ——頭脳だけ本物のAIになって帰ってくる。', 'Sakura Script and SSTP just work, and classic shells stand exactly as they looked — only the brain comes back as a real AI.', {
        'zh-CN': 'Sakura Script 和 SSTP 都能直接运行,经典外壳原样站立——只有头脑换成了真正的 AI 回来。',
        'zh-TW': 'Sakura Script 和 SSTP 都能直接運行,經典外殼原樣站立——只有頭腦換成了真正的 AI 回來。',
        ko: '사쿠라 스크립트도 SSTP도 그대로 움직이고, 클래식 셸은 그 모습 그대로 섭니다 — 두뇌만 진짜 AI가 되어 돌아옵니다.',
      }),
    },
  ];
  return (
    <section id="foryou" className="border-t border-cream/10 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <Reveal className="mb-14 text-center">
          <Kicker index="07" label="For You" />
          <h2 className="font-mincho font-bold text-3xl md:text-4xl leading-relaxed">
            {t('あなたの入口は、どこからでも。', 'Come in from any door.', { 'zh-CN': '你的入口,四面八方。', 'zh-TW': '你的入口,四面八方。', ko: '당신의 입구는, 어디서든.' })}
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
