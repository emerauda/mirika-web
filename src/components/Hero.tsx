import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type Variants,
} from 'motion/react';
import { Download, ArrowDown, ChevronDown } from 'lucide-react';
import { TitleBar } from './ui';
import { MagneticLink } from './primitives';
import { useLang, useT } from '../i18n';

/** 見出し。圏点の載せ方が言語で変わるので、文字列でなく形ごと切り替える */
function Headline() {
  const { lang } = useLang();
  switch (lang) {
    case 'ja':
      return (
        <>
          デスクトップに、<br />
          <span className="kenten">魂</span>と<span className="kenten">知能</span>を。
        </>
      );
    case 'en':
      return (
        <>
          A <span className="kenten">soul</span> and a <span className="kenten">mind</span>,
          <br />
          on your desktop.
        </>
      );
    case 'zh-CN':
      return (
        <>
          把<span className="kenten">灵魂</span>与<span className="kenten">智能</span>,
          <br />
          放上桌面。
        </>
      );
    case 'zh-TW':
      return (
        <>
          把<span className="kenten">靈魂</span>與<span className="kenten">智能</span>,
          <br />
          放上桌面。
        </>
      );
    case 'ko':
      return (
        <>
          데스크톱에,
          <br />
          <span className="kenten">영혼</span>과 <span className="kenten">지능</span>을.
        </>
      );
  }
}

const EASE = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

export function Hero() {
  const t = useT();
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const gx = useSpring(mx, { stiffness: 120, damping: 20, mass: 0.6 });
  const gy = useSpring(my, { stiffness: 120, damping: 20, mass: 0.6 });

  const handleMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    mx.set(nx * 26);
    my.set(ny * 22);
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const motionProps = reduce ? {} : { variants: container, initial: 'hidden' as const, animate: 'show' as const };
  const itemProps = reduce ? {} : { variants: item };

  return (
    <section className="relative border-b border-cream/10 overflow-hidden" onPointerMove={handleMove} onPointerLeave={handleLeave}>
      {/* 漂うオーロラ背景 */}
      {!reduce && (
        <div className="absolute inset-0 -z-0 pointer-events-none" aria-hidden="true">
          <motion.div
            className="absolute -top-24 -left-24 w-[36rem] h-[36rem] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(255,107,143,0.16), transparent 60%)' }}
            animate={{ x: [0, 40, -10, 0], y: [0, 30, 10, 0], scale: [1, 1.12, 0.98, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-10 right-[-6rem] w-[32rem] h-[32rem] rounded-full blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(124,108,240,0.16), transparent 60%)' }}
            animate={{ x: [0, -30, 12, 0], y: [0, 20, -18, 0], scale: [1, 1.08, 1.04, 1] }}
            transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      )}

      <div className="relative max-w-6xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-14 items-center">
        <motion.div className="space-y-8" {...motionProps}>
          <motion.p className="font-mono text-xs text-mist tracking-widest uppercase" {...itemProps}>
            <span className="text-sakura">●</span>{' '}
            {t('本体無料 — 完全ローカル — Windows / Linux(macOS 準備中)', 'Free core — fully local — Windows / Linux (macOS soon)', {
              'zh-CN': '本体免费 — 完全本地 — Windows / Linux(macOS 准备中)',
              'zh-TW': '本體免費 — 完全本地 — Windows / Linux(macOS 準備中)',
              ko: '본체 무료 — 완전 로컬 — Windows / Linux(macOS 준비 중)',
            })}
          </motion.p>
          <motion.h1 className="glow-text font-mincho font-bold text-4xl md:text-6xl leading-snug md:leading-snug" {...itemProps}>
            <Headline />
          </motion.h1>
          <motion.p className="text-mist leading-loose max-w-md" {...itemProps}>
            {t('VRM・Live2D・MMDの身体に、ローカルLLMの頭脳と、数年単位の記憶を。', 'A VRM, Live2D or MMD body, a local-LLM mind, and memory that spans years. ', {
              'zh-CN': '给 VRM、Live2D、MMD 的身体,装上本地 LLM 的头脑和以年计的记忆。',
              'zh-TW': '給 VRM、Live2D、MMD 的身體,裝上本地 LLM 的頭腦和以年計的記憶。',
              ko: 'VRM·Live2D·MMD의 몸에, 로컬 LLM의 두뇌와 몇 년 단위의 기억을. ',
            })}
            <strong className="text-cream">
              {t('本体は無料。', 'The app is free.', { 'zh-CN': '本体免费。', 'zh-TW': '本體免費。', ko: '본체는 무료.' })}
            </strong>
            {t('頭脳はあなたのPCで動くから、24時間そばにいても利用料はゼロで、会話は端末の外に出ない——秘書として働いて、あなたと共に成長する、新しいデスクトップゴーストです。', ' The brain runs on your own PC, so she stays by your side around the clock at zero cost — and no conversation ever leaves the machine. A new desktop ghost that works as your secretary and grows with you.', {
              'zh-CN': '头脑在你自己的电脑上运行,24 小时相伴也零费用,对话不出设备一步——她是替你工作的秘书,也是与你一同成长的新一代桌面幽灵。',
              'zh-TW': '頭腦在你自己的電腦上運行,24 小時相伴也零費用,對話不出裝置一步——她是替你工作的秘書,也是與你一同成長的新一代桌面幽靈。',
              ko: ' 두뇌는 당신의 PC에서 돌아가니 24시간 곁에 있어도 요금은 0, 대화는 기기 밖으로 나가지 않습니다 — 비서로 일하며 당신과 함께 자라는 새로운 데스크톱 고스트입니다.',
            })}
          </motion.p>
          <motion.div className="flex flex-wrap gap-4" {...itemProps}>
            <MagneticLink
              href="#download"
              className="btn-hard inline-flex items-center gap-2 bg-sakura text-white px-6 py-3.5 font-bold text-sm"
            >
              <Download className="w-4 h-4" />{' '}
              {t('ダウンロード', 'Download', { 'zh-CN': '下载', 'zh-TW': '下載', ko: '다운로드' })}
            </MagneticLink>
            <MagneticLink
              href="#roadmap"
              className="btn-hard inline-flex items-center gap-2 bg-paper text-ink px-6 py-3.5 font-bold text-sm"
            >
              {t('ロードマップ', 'Roadmap', { 'zh-CN': '路线图', 'zh-TW': '路線圖', ko: '로드맵' })}{' '}
              <ArrowDown className="w-4 h-4" />
            </MagneticLink>
          </motion.div>
          <motion.p className="font-mono text-[11px] text-mist/80 pt-2" {...itemProps}>
            &gt; brain: qwen3:8b (local) ・ shell: vrm / live2d / mmd / classic ・ memory: day 397 ・ api cost: ¥0
          </motion.p>
        </motion.div>

        {/* デスクトップ(ウィンドウ+バルーン) */}
        <motion.div
          className="relative"
          style={reduce ? undefined : { x: gx, y: gy }}
          initial={reduce ? undefined : { opacity: 0, scale: 0.94 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
        >
          <div className="os-window">
            <TitleBar>
              <span>
                {t('mirika — 秘書と暮らす机', 'mirika — a desk shared with a secretary', {
                  'zh-CN': 'mirika — 与秘书同居的书桌',
                  'zh-TW': 'mirika — 與秘書同居的書桌',
                  ko: 'mirika — 비서와 함께 쓰는 책상',
                })}
              </span>
              <span className="text-sub tracking-widest">— □ ×</span>
            </TitleBar>
            <div className="h-[440px] md:h-[500px] overflow-hidden">
              <motion.img
                src="/kv/hero.webp"
                className="block w-full h-full object-cover"
                alt={t('Mirika のキービジュアル。カレンダーやメールのパネルに囲まれて手を差し伸べる', 'Mirika key visual: reaching out among calendar and mail panels', {
                  'zh-CN': 'Mirika 主视觉:在日历与邮件面板之间伸出手',
                  'zh-TW': 'Mirika 主視覺:在日曆與郵件面板之間伸出手',
                  ko: 'Mirika 키 비주얼: 캘린더와 메일 패널 사이에서 손을 내밀다',
                })}
                animate={reduce ? undefined : { scale: [1, 1.04, 1] }}
                transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </div>
          <motion.div
            className="balloon absolute left-3 md:left-5 bottom-4 md:bottom-6 w-56 md:w-64 p-5 z-10"
            initial={reduce ? undefined : { opacity: 0, y: 14, x: -8 }}
            animate={reduce ? undefined : { opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.7 }}
          >
            <p className="font-mono text-[10px] text-sub mb-2 tracking-wider uppercase">Ghost Message — via Local LLM</p>
            <p className="leading-relaxed font-medium">
              {t('おかえりなさい！', 'Welcome home!', { 'zh-CN': '欢迎回来!', 'zh-TW': '歡迎回來!', ko: '어서 와요!' })}
              <br />
              {t('昨日話してた締切、今日だよね。大丈夫？', "That deadline we talked about — it's today, right? You okay?", {
                'zh-CN': '昨天说的截止日期,就是今天吧?没问题吗?',
                'zh-TW': '昨天說的截止日期,就是今天吧?沒問題嗎?',
                ko: '어제 말한 마감, 오늘이죠? 괜찮아요?',
              })}
            </p>
            <div className="mt-3 border-t border-ink/10 pt-2">
              <a href="#usecases" className="choice font-mono text-sm">
                ▷ {t('大丈夫', 'All good', { 'zh-CN': '没问题', 'zh-TW': '沒問題', ko: '괜찮아' })}
              </a>
              <a href="#features" className="choice font-mono text-sm">
                ▷ {t('ヤバい、手伝って', 'Not good — help me', { 'zh-CN': '糟了,帮帮我', 'zh-TW': '糟了,幫幫我', ko: '큰일이야, 도와줘' })}
              </a>
            </div>
            <p className="mt-3 border-t border-ink/10 pt-2 font-mono text-[10px] text-sub/80 break-all">
              \0\s[happy]おかえりなさい！\w8\1\s[10]締切、今日までだぞ。\e
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* スクロールキュー */}
      {!reduce && (
        <motion.a
          href="#concept"
          aria-label="下へスクロール"
          className="absolute left-1/2 -translate-x-1/2 bottom-4 hidden md:flex flex-col items-center gap-1 text-mist/70 hover:text-sakura transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <span className="font-mono text-[10px] tracking-widest uppercase">scroll</span>
          <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown className="w-4 h-4" />
          </motion.span>
        </motion.a>
      )}
    </section>
  );
}
