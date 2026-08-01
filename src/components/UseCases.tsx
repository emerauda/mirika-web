import { useMemo, useRef, type ReactNode } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { Terminal, Calendar, Heart, Moon, Check } from 'lucide-react';
import { Kicker, TitleBar } from './ui';
import { Reveal } from './primitives';
import { useTypewriter } from '../hooks/useTypewriter';
import { useCountUp } from '../hooks/useCountUp';
import { useT } from '../i18n';

/* ---------- タイプアウトするターミナル ---------- */
type Tok = { t: string; c?: string };

function terminalTokens(ghostLine: string): Tok[] {
  return [
    { t: '➜', c: 'text-green-400' },
    { t: ' ' },
    { t: '~', c: 'text-blue-300' },
    { t: ' npm test\n' },
    { t: '✘ 3 tests failed\n\n', c: 'text-red-400' },
    { t: ghostLine, c: 'text-slate-500' },
  ];
}

function sliceTokens(tokens: Tok[], count: number): Tok[] {
  const out: Tok[] = [];
  let off = 0;
  for (const tok of tokens) {
    if (count <= off) break;
    const end = Math.min(tok.t.length, count - off);
    out.push({ t: tok.t.slice(0, end), c: tok.c });
    off += tok.t.length;
  }
  return out;
}

function Cursor() {
  const reduce = useReducedMotion();
  if (reduce) return <span className="text-slate-300">▋</span>;
  return (
    <motion.span
      className="text-slate-300 inline-block"
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    >
      ▋
    </motion.span>
  );
}

function TerminalMock() {
  const t = useT();
  const tokens = useMemo(
    () =>
      terminalTokens(
        t('Ghost: 「あ、これ昨日も落ちてたやつ。\n　スタックトレース読もうか？」', 'Ghost: "Oh, this one failed yesterday too.\n Want me to read the stack trace?"', {
          'zh-CN': 'Ghost: 「啊,这个昨天也挂了。\n 要我读读堆栈跟踪吗?」',
          'zh-TW': 'Ghost: 「啊,這個昨天也掛了。\n 要我讀讀堆疊追蹤嗎?」',
          ko: 'Ghost: "아, 이거 어제도 떨어졌던 거네.\n 스택 트레이스 읽어 줄까?"',
        }),
      ),
    [t],
  );
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const total = useMemo(() => tokens.reduce((n, tok) => n + tok.t.length, 0), [tokens]);
  const typed = useTypewriter(total, inView && !reduce, 34);
  const count = reduce ? total : typed;
  const shown = sliceTokens(tokens, count);

  return (
    <div
      ref={ref}
      className="bg-[#0b0912] text-slate-300 p-6 font-mono text-xs md:text-sm leading-relaxed whitespace-pre-wrap min-h-[132px]"
    >
      {shown.map((tok, i) =>
        tok.c ? (
          <span key={i} className={tok.c}>
            {tok.t}
          </span>
        ) : (
          <span key={i}>{tok.t}</span>
        ),
      )}
      <Cursor />
    </div>
  );
}

/* ---------- 記念日カウントアップ ---------- */
function AnnivDays() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const val = useCountUp(397, inView && !reduce);
  return <span ref={ref}>{reduce ? 397 : val}</span>;
}

/* ---------- 共通: チェックリスト ---------- */
function CheckList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="space-y-2.5 text-sm">
      {items.map((it, i) => (
        <li key={i} className="flex items-center gap-3">
          <Check className="w-4 h-4 text-sakura" /> {it}
        </li>
      ))}
    </ul>
  );
}

export function UseCases() {
  const t = useT();
  return (
    <section id="usecases" className="border-t border-cream/10 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6 py-24 space-y-20">
        <Reveal>
          <Kicker index="03" label="Use Cases" />
          <h2 className="font-mincho font-bold text-3xl md:text-4xl">
            {t('仕事も、日常も、そばに。', 'Beside you — at work and in life.', { 'zh-CN': '工作与日常,都在身旁。', 'zh-TW': '工作與日常,都在身旁。', ko: '일도, 일상도, 곁에서.' })}
          </h2>
        </Reveal>

        {/* Coding Companion */}
        <Reveal className="grid md:grid-cols-2 gap-12 items-center">
          <div className="os-window">
            <TitleBar>
              <span>terminal — npm test</span>
              <span className="text-sub tracking-widest">— □ ×</span>
            </TitleBar>
            <TerminalMock />
          </div>
          <div>
            <p className="font-mono text-xs text-sakura tracking-widest uppercase mb-4 flex items-center gap-2">
              <Terminal className="w-4 h-4" /> Coding Companion
            </p>
            <h3 className="font-mincho font-bold text-2xl md:text-3xl mb-5 leading-relaxed">
              {t('孤独な夜のデバッグも、もう一人じゃない。', 'Late-night debugging, no longer alone.', { 'zh-CN': '深夜孤独的调试,不再是一个人。', 'zh-TW': '深夜孤獨的除錯,不再是一個人。', ko: '외로운 밤의 디버깅도, 이제 혼자가 아니야.' })}
            </h3>
            <p className="text-mist leading-loose mb-6">
              {t('画面のエラーに自分で気づいて(ローカルVLM)解決策を提案してくれたり、長時間作業していると「そろそろ休憩したら?」と声をかけてくれます。画面もコードも、あなたのマシンから出ていきません。', 'She notices errors on screen herself (local VLM) and suggests fixes, and after long stretches she offers "time for a break?". Neither your screen nor your code leaves the machine.', {
                'zh-CN': '她会自己注意到屏幕上的报错(本地 VLM)并提出解决方案;工作久了还会说「差不多休息一下?」。屏幕和代码都不出你的机器。',
                'zh-TW': '她會自己注意到螢幕上的報錯(本地 VLM)並提出解決方案;工作久了還會說「差不多休息一下?」。螢幕和程式碼都不出你的機器。',
                ko: '화면의 에러를 스스로 알아채고(로컬 VLM) 해결책을 제안하고, 오래 작업하면 "슬슬 쉬는 게 어때?"라고 말을 겁니다. 화면도 코드도 당신의 머신에서 나가지 않습니다.',
              })}
            </p>
            <CheckList
              items={[
                t('スクリーン理解でエラーに自分で気づく(オプトイン)', 'Notices errors via screen understanding (opt-in)', { 'zh-CN': '通过屏幕理解自己发现报错(可选)', 'zh-TW': '透過螢幕理解自己發現報錯(可選)', ko: '스크린 이해로 에러를 스스로 알아챔(옵트인)' }),
                t('ポモドーロ・休憩のうながし', 'Pomodoro and break nudges', { 'zh-CN': '番茄钟与休息提醒', 'zh-TW': '番茄鐘與休息提醒', ko: '포모도로·휴식 권유' }),
                t('難問だけクラウドAIへ昇格(オプトイン)', 'Escalate only the hard ones to a cloud AI (opt-in)', { 'zh-CN': '只把难题升级给云端 AI(可选)', 'zh-TW': '只把難題升級給雲端 AI(可選)', ko: '어려운 문제만 클라우드 AI로 승격(옵트인)' }),
              ]}
            />
          </div>
        </Reveal>

        {/* Personal Secretary */}
        <Reveal className="grid md:grid-cols-2 gap-12 items-center">
          <div className="md:order-2">
            <div className="os-window">
              <TitleBar>
                <span>schedule — today (jul 16)</span>
                <span className="text-sub tracking-widest">— □ ×</span>
              </TitleBar>
              <div className="p-6 space-y-2.5 text-sm">
                <div className="flex items-center gap-3 border-l-4 border-ink/30 bg-ink/5 px-3 py-2">
                  <span className="font-mono text-xs text-sub">10:00</span> Team Meeting
                </div>
                <div className="flex items-center gap-3 border-l-4 border-ink/30 bg-ink/5 px-3 py-2">
                  <span className="font-mono text-xs text-sub">13:00</span> Code Review
                </div>
                <div className="flex items-center gap-3 border-l-4 border-sakura bg-sakura/10 px-3 py-2 text-[#ff8fab]">
                  <span className="font-mono text-xs">Ghost</span>{' '}
                  {t('「15時の空き、作業に使う?」', '"That free slot at 3 — use it for focus work?"', { 'zh-CN': '「15 点的空档,用来干活吗?」', 'zh-TW': '「15 點的空檔,用來幹活嗎?」', ko: '"15시 빈 시간, 작업에 쓸까?"' })}
                </div>
              </div>
            </div>
          </div>
          <div className="md:order-1">
            <p className="font-mono text-xs text-sakura tracking-widest uppercase mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Personal Secretary
            </p>
            <h3 className="font-mincho font-bold text-2xl md:text-3xl mb-5 leading-relaxed">
              {t('秘書として、あなたの時間を管理する。', 'As a secretary, she keeps your hours.', { 'zh-CN': '作为秘书,替你打理时间。', 'zh-TW': '作為秘書,替你打理時間。', ko: '비서로서, 당신의 시간을 관리한다.' })}
            </h3>
            <p className="text-mist leading-loose mb-6">
              {t('MCPでGoogleカレンダーやGmailと連携し、予定を把握。朝の挨拶で今日の予定を教えてくれて、会議の10分前には声をかけてくれます。全画面作業中や会議中は黙って待つ——空気を読むのも人格のうち。', "Linked to Google Calendar and Gmail over MCP, she knows the schedule: today's plan comes with the morning greeting, and she pings you ten minutes before a meeting. During full-screen work or meetings she waits in silence — reading the room is part of the persona.", {
                'zh-CN': '通过 MCP 连接 Google 日历和 Gmail,掌握日程。早晨问候时告诉你今天的安排,会议前 10 分钟出声提醒。全屏工作或开会时安静等待——会看气氛也是人格的一部分。',
                'zh-TW': '透過 MCP 連接 Google 日曆和 Gmail,掌握日程。早晨問候時告訴你今天的安排,會議前 10 分鐘出聲提醒。全螢幕工作或開會時安靜等待——會看氣氛也是人格的一部分。',
                ko: 'MCP로 Google 캘린더·Gmail과 연동해 일정을 파악. 아침 인사로 오늘 일정을 알려 주고, 회의 10분 전에 말을 겁니다. 전체 화면 작업이나 회의 중엔 조용히 기다리기 — 분위기를 읽는 것도 인격의 일부.',
              })}
            </p>
            <CheckList
              items={[
                t('Gmail・カレンダー・Drive連携(MCP)', 'Gmail, Calendar & Drive over MCP', { 'zh-CN': 'Gmail・日历・Drive 联动(MCP)', 'zh-TW': 'Gmail・日曆・Drive 連動(MCP)', ko: 'Gmail·캘린더·Drive 연동(MCP)' }),
                t('タスク・案件管理と締切前の催促', 'Task keeping and pre-deadline nudges', { 'zh-CN': '任务管理与截止前催促', 'zh-TW': '任務管理與截止前催促', ko: '태스크 관리와 마감 전 재촉' }),
                t('定期チェックはローカルLLMでコストゼロ', 'Periodic checks run on the local LLM at zero cost', { 'zh-CN': '定期检查由本地 LLM 完成,零成本', 'zh-TW': '定期檢查由本地 LLM 完成,零成本', ko: '정기 확인은 로컬 LLM이라 비용 제로' }),
              ]}
            />
          </div>
        </Reveal>

        {/* Everyday Partner */}
        <Reveal className="grid md:grid-cols-2 gap-12 items-center">
          <div className="os-window">
            <TitleBar>
              <span>{t('memory.db — 就寝時整理', 'memory.db — bedtime consolidation', { 'zh-CN': 'memory.db — 睡前整理', 'zh-TW': 'memory.db — 睡前整理', ko: 'memory.db — 취침 시 정리' })}</span>
              <span className="flex items-center gap-1 text-sub">
                <Moon className="w-3.5 h-3.5" /> consolidating…
              </span>
            </TitleBar>
            <div className="p-6 font-mono text-xs leading-loose">
              <p>
                <span className="text-[#ff8fab] font-semibold">fact</span>{' '}
                {t('ユーザーは猫を飼っている', 'user has a cat', { 'zh-CN': '用户养了一只猫', 'zh-TW': '用戶養了一隻貓', ko: '사용자는 고양이를 키운다' })}{' '}
                <span className="text-sub/60">(2026-05-12)</span>
              </p>
              <p>
                <span className="text-[#ff8fab] font-semibold">fact</span>{' '}
                {t('好きな曲: シューゲイザー系', 'likes shoegaze', { 'zh-CN': '喜欢的音乐:盯鞋系', 'zh-TW': '喜歡的音樂:盯鞋系', ko: '좋아하는 곡: 슈게이저 계열' })}{' '}
                <span className="text-sub/60">(2026-06-02)</span>
              </p>
              <p>
                <span className="text-[#ff8fab] font-semibold">anniv</span>{' '}
                {t('初起動から', 'day', { 'zh-CN': '首次启动至今', 'zh-TW': '首次啟動至今', ko: '첫 기동부터' })} <AnnivDays />
                {t('日', '', { 'zh-CN': '天', 'zh-TW': '天', ko: '일' })}{' '}
                <span className="text-sub/60">{t('← もうすぐ400日!', '← almost 400!', { 'zh-CN': '← 快 400 天了!', 'zh-TW': '← 快 400 天了!', ko: '← 곧 400일!' })}</span>
              </p>
              <p>
                <span className="text-[#ff8fab] font-semibold">episode</span>{' '}
                {t('昨日: 締切の相談、少し疲れてた様子', 'yesterday: deadline talk, seemed a bit tired', { 'zh-CN': '昨天:聊了截止日期,看起来有点累', 'zh-TW': '昨天:聊了截止日期,看起來有點累', ko: '어제: 마감 상담, 조금 지쳐 보였음' })}
              </p>
              <p>
                <span className="text-[#ff8fab] font-semibold">dream</span>{' '}
                {t('締切が猫になって逃げていく夢(?)', 'a dream where the deadline turned into a cat and ran (?)', { 'zh-CN': '梦见截止日期变成猫跑掉了(?)', 'zh-TW': '夢見截止日期變成貓跑掉了(?)', ko: '마감이 고양이가 되어 도망가는 꿈(?)' })}
              </p>
              <p className="text-sub/60 border-t border-ink/10 mt-3 pt-3">consolidating today's memories…</p>
            </div>
          </div>
          <div>
            <p className="font-mono text-xs text-sakura tracking-widest uppercase mb-4 flex items-center gap-2">
              <Heart className="w-4 h-4" /> Everyday Partner
            </p>
            <h3 className="font-mincho font-bold text-2xl md:text-3xl mb-5 leading-relaxed">
              {t('昨日の話を、覚えていてくれる。', 'She remembers what you said yesterday.', { 'zh-CN': '昨天说过的话,她都记得。', 'zh-TW': '昨天說過的話,她都記得。', ko: '어제 한 이야기를, 기억해 준다.' })}
            </h3>
            <p className="text-mist leading-loose mb-6">
              {t('ランダムトークは、もう擬似じゃない本物のAIトーク。夜のあいだに会話を整理して夢を見て、翌朝「変な夢見た……」と教えてくれる。雨の日は静かで、褒めた日は上機嫌——気分は移ろい、関係は数年単位で育つ。', 'Random talk is no longer scripted — it is real AI talk. Overnight she tidies the day and dreams, and next morning tells you "I had a weird dream…". Quiet on rainy days, cheerful the day you praised her — moods drift, and the relationship grows over years.', {
                'zh-CN': '随机闲聊不再是脚本,而是真正的 AI 对话。夜里整理当天的对话、做梦,第二天早上告诉你「做了个怪梦……」。雨天安静,被夸的那天心情好——情绪流转,关系以年为单位成长。',
                'zh-TW': '隨機閒聊不再是腳本,而是真正的 AI 對話。夜裡整理當天的對話、做夢,第二天早上告訴你「做了個怪夢……」。雨天安靜,被誇的那天心情好——情緒流轉,關係以年為單位成長。',
                ko: '랜덤 토크는 이제 유사품이 아닌 진짜 AI 토크. 밤사이 대화를 정리하고 꿈을 꾸고, 다음 날 아침 "이상한 꿈 꿨어…"라고 알려 줍니다. 비 오는 날은 조용하고, 칭찬한 날은 기분이 좋고 — 기분은 흐르고, 관계는 몇 년 단위로 자랍니다.',
              })}
            </p>
            <CheckList
              items={[
                t('数年単位の長期記憶と関係性パラメータ', 'Years-long memory and relationship parameters', { 'zh-CN': '以年计的长期记忆与关系参数', 'zh-TW': '以年計的長期記憶與關係參數', ko: '몇 년 단위의 장기 기억과 관계 파라미터' }),
                t('気分(ムード)モデルと夢——朝の顔が毎日違う', 'A mood model and dreams — a different face each morning', { 'zh-CN': '情绪模型与梦——每天早上的表情都不一样', 'zh-TW': '情緒模型與夢——每天早上的表情都不一樣', ko: '기분(무드) 모델과 꿈 — 아침 얼굴이 매일 다름' }),
                t('記念日・時報・起動挨拶(ルールで即応)', 'Anniversaries, hourly chimes, boot greetings (instant, rule-based)', { 'zh-CN': '纪念日・报时・启动问候(规则即时响应)', 'zh-TW': '紀念日・報時・啟動問候(規則即時響應)', ko: '기념일·시보·기동 인사(룰로 즉응)' }),
              ]}
            />
          </div>
        </Reveal>

      </div>
    </section>
  );
}
