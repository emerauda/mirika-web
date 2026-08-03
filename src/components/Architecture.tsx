import type { ComponentType, ReactNode } from 'react';
import { Ghost, Package, Brain } from 'lucide-react';
import { Kicker, TitleBar } from './ui';
import { Reveal, StaggerGroup, StaggerItem, TiltCard } from './primitives';
import { useT } from '../i18n';

type Card = {
  bar: string;
  barRight: string;
  Icon: ComponentType<{ className?: string }>;
  name: string;
  desc: ReactNode;
  mono: ReactNode;
};

function buildCards(t: ReturnType<typeof useT>): Card[] {
  return [
    {
      bar: t('ghost/ — 魂', 'ghost/ — the soul', { 'zh-CN': 'ghost/ — 灵魂', 'zh-TW': 'ghost/ — 靈魂', ko: 'ghost/ — 영혼' }),
      barRight: t('人格', 'persona', { 'zh-CN': '人格', 'zh-TW': '人格', ko: '인격' }),
      Icon: Ghost,
      name: 'Ghost',
      desc: t('人格プロンプト+記憶DB。自然言語とデータだから、どのモデルにも、どの身体にも載せ替えられる。', 'A persona prompt plus a memory DB. Being language and data, it moves onto any model and any body.', {
        'zh-CN': '人格提示词+记忆数据库。因为是自然语言和数据,可以搬到任何模型、任何身体上。',
        'zh-TW': '人格提示詞+記憶資料庫。因為是自然語言和資料,可以搬到任何模型、任何身體上。',
        ko: '인격 프롬프트+기억 DB. 자연어와 데이터라서 어떤 모델에도, 어떤 몸에도 옮겨 실을 수 있습니다.',
      }),
      mono: (
        <>
          persona/system.md<br />memory.db{t('(=魂)', ' (= the soul)', { 'zh-CN': '(=灵魂)', 'zh-TW': '(=靈魂)', ko: '(=영혼)' })}
        </>
      ),
    },
    {
      bar: t('shell/ — 身体', 'shell/ — the body', { 'zh-CN': 'shell/ — 身体', 'zh-TW': 'shell/ — 身體', ko: 'shell/ — 몸' }),
      barRight: t('交換可能', 'swappable', { 'zh-CN': '可更换', 'zh-TW': '可更換', ko: '교체 가능' }),
      Icon: Package,
      name: 'Shell',
      desc: t('今日はVRM・Live2D・MMD、いつかはロボット。ShellProtocol を実装すれば何でも身体になれる。\\s[10]の感覚は mapping.json が翻訳。', 'Today VRM, Live2D and MMD; someday a robot. Implement ShellProtocol and anything can be her body — mapping.json translates the old \\s[10] feel.', {
        'zh-CN': '今天是 VRM・Live2D・MMD,某天会是机器人。实现 ShellProtocol,什么都能成为身体——\\s[10] 的感觉由 mapping.json 翻译。',
        'zh-TW': '今天是 VRM・Live2D・MMD,某天會是機器人。實作 ShellProtocol,什麼都能成為身體——\\s[10] 的感覺由 mapping.json 翻譯。',
        ko: '오늘은 VRM·Live2D·MMD, 언젠가는 로봇. ShellProtocol을 구현하면 무엇이든 몸이 됩니다 — \\s[10]의 감각은 mapping.json이 번역.',
      }),
      mono: (
        <>
          vrm / live2d / classic / robot<br />mapping.json
        </>
      ),
    },
    {
      bar: t('brain/ — 頭脳', 'brain/ — the mind', { 'zh-CN': 'brain/ — 头脑', 'zh-TW': 'brain/ — 頭腦', ko: 'brain/ — 두뇌' }),
      barRight: t('世代交代', 'generations', { 'zh-CN': '世代交替', 'zh-TW': '世代交替', ko: '세대교체' }),
      Icon: Brain,
      name: 'Brain',
      desc: t('頭脳のLLMは差し替え自由。Qwen、Gemma、Claude——モデルが世代交代しても、記憶と人格は連続する。', 'The LLM is freely replaceable — Qwen, Gemma, Claude. Models change generations; memory and persona stay continuous.', {
        'zh-CN': '头脑的 LLM 可自由替换——Qwen、Gemma、Claude。模型换代,记忆与人格依然连续。',
        'zh-TW': '頭腦的 LLM 可自由替換——Qwen、Gemma、Claude。模型換代,記憶與人格依然連續。',
        ko: '두뇌의 LLM은 자유롭게 교체 — Qwen, Gemma, Claude. 모델이 세대교체돼도 기억과 인격은 이어집니다.',
      }),
      mono: (
        <>
          built-in / ollama / lm studio<br />claude api (opt-in)
        </>
      ),
    },
  ];
}

export function Architecture() {
  const t = useT();
  const CARDS = buildCards(t);
  return (
    <section id="architecture" className="relative border-t border-cream/10 bg-black/20 scroll-mt-20 overflow-hidden">
      {/* 夜の開発机(KV)。文字が主役なので、絵は暗幕の向こうに薄く敷く(Cta と同じ流儀)。
          Section は背景レイヤーを持てないので、この節だけ手書きの骨格のまま */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <img
          src="/kv/dev-night.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={1600}
          height={900}
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-void/60 to-void" />
      </div>
      <div className="relative max-w-6xl mx-auto px-6 py-24">
        <Reveal className="mb-14">
          <Kicker index="04" label="Architecture" />
          <h2 className="font-mincho font-bold text-3xl md:text-4xl leading-relaxed">
            {t('ゴースト・シェル・ブレイン、三層の分離。', 'Ghost, shell, brain — three layers, kept apart.', { 'zh-CN': '幽灵・外壳・头脑,三层分离。', 'zh-TW': '幽靈・外殼・頭腦,三層分離。', ko: '고스트·셸·브레인, 3층 분리.' })}
          </h2>
          <p className="text-mist leading-loose mt-5 max-w-2xl">
            {t('人格(ゴースト)・身体(シェル)・頭脳(AIモデル)を、最初から分けて設計します。どれを乗り換えても、あの子はあの子のまま——長く共に居るための構造です。', 'Persona (ghost), body (shell) and mind (AI model) are designed apart from the start. Swap any one of them and she is still her — a structure for staying together a long time.', {
              'zh-CN': '人格(幽灵)、身体(外壳)、头脑(AI 模型),从一开始就分开设计。换掉任何一个,她还是她——这是为了长久相伴的结构。',
              'zh-TW': '人格(幽靈)、身體(外殼)、頭腦(AI 模型),從一開始就分開設計。換掉任何一個,她還是她——這是為了長久相伴的結構。',
              ko: '인격(고스트)·몸(셸)·두뇌(AI 모델)를 처음부터 나눠 설계합니다. 무엇을 갈아타도 그 아이는 그 아이 그대로 — 오래 함께 있기 위한 구조입니다.',
            })}
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
            {t('魂は', 'The soul lives in', { 'zh-CN': '灵魂寄宿于', 'zh-TW': '靈魂寄宿於', ko: '영혼은' })}{' '}
            <span className="font-mono text-sakura text-base">memory.db</span>{' '}
            {t('と人格定義に宿り、モデルの重みには宿らない。', 'and the persona definition — never in the model weights.', { 'zh-CN': '与人格定义,而不寄宿于模型权重。', 'zh-TW': '與人格定義,而不寄宿於模型權重。', ko: '와 인격 정의에 깃들고, 모델 가중치에는 깃들지 않습니다.' })}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
