import { useMemo, useRef, type ReactNode } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { Terminal, Calendar, Heart, Moon, Check, MessageCircle } from 'lucide-react';
import { Kicker, Section, TitleBar } from './ui';
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
      className="bg-void text-slate-300 p-6 font-mono text-xs md:text-sm leading-relaxed whitespace-pre-wrap min-h-[132px]"
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
    <Section
      id="usecases"
      index="03"
      label="Use Cases"
      title={t('仕事も、日常も、そばに。', 'Beside you — at work and in life.', { 'zh-CN': '工作与日常,都在身旁。', 'zh-TW': '工作與日常,都在身旁。', ko: '일도, 일상도, 곁에서.' })}
      headerClassName="mb-20"
    >
      {/* 見出しと各ケースの間隔は移行前の space-y-20 をそのまま踏襲 */}
      <div className="space-y-20">

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
            <Kicker icon={Terminal} sakura label="Coding Companion" className="mb-4" />
            <h3 className="font-mincho font-bold text-2xl md:text-3xl mb-5 leading-relaxed">
              {t('孤独な夜のデバッグも、もう一人じゃない。', 'Late-night debugging, no longer alone.', { 'zh-CN': '深夜孤独的调试,不再是一个人。', 'zh-TW': '深夜孤獨的除錯,不再是一個人。', ko: '외로운 밤의 디버깅도, 이제 혼자가 아니야.' })}
            </h3>
            <p className="text-mist leading-loose mb-6">
              {t('画面のエラーに自分で気づいて(ローカルVLM)解決策を提案してくれたり、長時間作業していると「そろそろ休憩したら?」と声をかけてくれます。ログもスタックトレースも設計書も、窓に落とせばそのまま読む。気づいたことはテキストで残るので、翌日「昨日見てたエラー何だっけ」にも答えます。画面もコードも、あなたのマシンから出ていきません。', 'She notices errors on screen herself (local VLM) and suggests fixes, and after long stretches she offers "time for a break?". Logs, stack traces and specs are read as-is — just drop them on her window. What she noticed is kept as text, so the next day she can answer "what was that error I was looking at?". Neither your screen nor your code leaves the machine.', {
                'zh-CN': '她会自己注意到屏幕上的报错(本地 VLM)并提出解决方案;工作久了还会说「差不多休息一下?」。日志、堆栈跟踪、设计文档,丢到窗口上就直接读。注意到的事以文本留存,第二天问「昨天看的那个报错是啥来着」也答得上来。屏幕和代码都不出你的机器。',
                'zh-TW': '她會自己注意到螢幕上的報錯(本地 VLM)並提出解決方案;工作久了還會說「差不多休息一下?」。日誌、堆疊追蹤、設計文件,丟到視窗上就直接讀。注意到的事以文字留存,第二天問「昨天看的那個報錯是啥來著」也答得上來。螢幕和程式碼都不出你的機器。',
                ko: '화면의 에러를 스스로 알아채고(로컬 VLM) 해결책을 제안하고, 오래 작업하면 "슬슬 쉬는 게 어때?"라고 말을 겁니다. 로그도 스택 트레이스도 설계서도 창에 떨어뜨리면 그대로 읽습니다. 알아챈 것은 텍스트로 남으므로 다음 날 "어제 보던 그 에러 뭐였지?"에도 답합니다. 화면도 코드도 당신의 머신에서 나가지 않습니다.',
              })}
            </p>
            <CheckList
              items={[
                t('スクリーン理解でエラーに自分で気づく(オプトイン)', 'Notices errors via screen understanding (opt-in)', { 'zh-CN': '通过屏幕理解自己发现报错(可选)', 'zh-TW': '透過螢幕理解自己發現報錯(可選)', ko: '스크린 이해로 에러를 스스로 알아챔(옵트인)' }),
                t('ログも書類も、窓に落とすだけ(PDF・Word・Excel・テキスト)', 'Logs and documents read on drop (PDF, Word, Excel, text)', { 'zh-CN': '日志和文档丢到窗口就读(PDF・Word・Excel・文本)', 'zh-TW': '日誌和文件丟到視窗就讀(PDF・Word・Excel・文字)', ko: '로그도 서류도 창에 떨어뜨리기만(PDF·Word·Excel·텍스트)' }),
                t('端末内の全文検索(/rag)——自分のメモから探してくる', 'On-device full-text search (/rag) — she digs through your own notes', { 'zh-CN': '本机全文检索(/rag)——从你自己的笔记里找', 'zh-TW': '本機全文檢索(/rag)——從你自己的筆記裡找', ko: '기기 내 전문 검색(/rag) — 내 메모에서 찾아옴' }),
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
                <span>schedule — today</span>
                <span className="text-sub tracking-widest">— □ ×</span>
              </TitleBar>
              <div className="p-6 space-y-2.5 text-sm">
                <div className="flex items-center gap-3 border-l-4 border-ink/30 bg-ink/5 px-3 py-2">
                  <span className="font-mono text-xs text-sub">10:00</span> Team Meeting
                </div>
                <div className="flex items-center gap-3 border-l-4 border-ink/30 bg-ink/5 px-3 py-2">
                  <span className="font-mono text-xs text-sub">13:00</span> Code Review
                </div>
                <div className="flex items-center gap-3 border-l-4 border-sakura bg-sakura/10 px-3 py-2 text-sakura-lite">
                  <span className="font-mono text-xs">Ghost</span>{' '}
                  {t('「15時の空き、作業に使う?」', '"That free slot at 3 — use it for focus work?"', { 'zh-CN': '「15 点的空档,用来干活吗?」', 'zh-TW': '「15 點的空檔,用來幹活嗎?」', ko: '"15시 빈 시간, 작업에 쓸까?"' })}
                </div>
              </div>
            </div>
          </div>
          <div className="md:order-1">
            <Kicker icon={Calendar} sakura label="Personal Secretary" className="mb-4" />
            <h3 className="font-mincho font-bold text-2xl md:text-3xl mb-5 leading-relaxed">
              {t('秘書として、あなたの時間を管理する。', 'As a secretary, she keeps your hours.', { 'zh-CN': '作为秘书,替你打理时间。', 'zh-TW': '作為秘書,替你打理時間。', ko: '비서로서, 당신의 시간을 관리한다.' })}
            </h3>
            <p className="text-mist leading-loose mb-6">
              {t('MCPでGoogleカレンダーやGmailと連携し、予定を把握。朝の「きょうのブリーフィング」で予定・タスク・未読・天気をまとめて渡し、会議の10分前には声をかけてくれます。Googleを使わない道もあって、POP対応のメールボックスなら見張れます(こちらは無料)。契約書や見積のPDFは、渡せばそのまま話の前提になります。全画面作業中や会議中は黙って待つ——空気を読むのも人格のうち。', "Linked to Google Calendar and Gmail over MCP, she knows the schedule: the morning briefing hands you the day's plan, tasks, unread mail and weather at once, and she pings you ten minutes before a meeting. There is a non-Google road too — any POP mailbox can be watched, and that one is free. Hand her a contract or a quote as a PDF and it becomes part of the conversation. During full-screen work or meetings she waits in silence — reading the room is part of the persona.", {
                'zh-CN': '通过 MCP 连接 Google 日历和 Gmail,掌握日程。早晨的「今日简报」一次交给你日程、任务、未读和天气,会议前 10 分钟出声提醒。也有不用 Google 的路——支持 POP 的邮箱就能盯着(这条是免费的)。合同和报价的 PDF,递过去就成为谈话前提。全屏工作或开会时安静等待——会看气氛也是人格的一部分。',
                'zh-TW': '透過 MCP 連接 Google 日曆和 Gmail,掌握日程。早晨的「今日簡報」一次交給你日程、任務、未讀和天氣,會議前 10 分鐘出聲提醒。也有不用 Google 的路——支援 POP 的信箱就能盯著(這條是免費的)。合約和報價的 PDF,遞過去就成為談話前提。全螢幕工作或開會時安靜等待——會看氣氛也是人格的一部分。',
                ko: 'MCP로 Google 캘린더·Gmail과 연동해 일정을 파악. 아침의 "오늘의 브리핑"으로 일정·태스크·안 읽은 메일·날씨를 한 번에 건네고, 회의 10분 전에 말을 겁니다. Google을 쓰지 않는 길도 있어서, POP 지원 메일함이라면 지켜볼 수 있습니다(이쪽은 무료). 계약서나 견적 PDF는 건네면 그대로 이야기의 전제가 됩니다. 전체 화면 작업이나 회의 중엔 조용히 기다리기 — 분위기를 읽는 것도 인격의 일부.',
              })}
            </p>
            <CheckList
              items={[
                t('Gmail・カレンダー・Drive連携(MCP)', 'Gmail, Calendar & Drive over MCP', { 'zh-CN': 'Gmail・日历・Drive 联动(MCP)', 'zh-TW': 'Gmail・日曆・Drive 連動(MCP)', ko: 'Gmail·캘린더·Drive 연동(MCP)' }),
                t('きょうのブリーフィング(予定・タスク・未読・天気)', 'The morning briefing (plan, tasks, unread mail, weather)', { 'zh-CN': '今日简报(日程・任务・未读・天气)', 'zh-TW': '今日簡報(日程・任務・未讀・天氣)', ko: '오늘의 브리핑(일정·태스크·안 읽은 메일·날씨)' }),
                t('POP メールの見張りは Google なしで無料', 'Watching a POP mailbox needs no Google, and is free', { 'zh-CN': '盯 POP 邮箱不需要 Google,且免费', 'zh-TW': '盯 POP 信箱不需要 Google,且免費', ko: 'POP 메일 감시는 Google 없이 무료' }),
                t('定期チェックはローカルLLMでコストゼロ', 'Periodic checks run on the local LLM at zero cost', { 'zh-CN': '定期检查由本地 LLM 完成,零成本', 'zh-TW': '定期檢查由本地 LLM 完成,零成本', ko: '정기 확인은 로컬 LLM이라 비용 제로' }),
              ]}
            />
          </div>
        </Reveal>


        {/* Everywhere Companion */}
        <Reveal className="grid md:grid-cols-2 gap-12 items-center">
          <div className="os-window">
            <TitleBar>
              <span>Discord — #dm</span>
              <span className="text-sub tracking-widest">— □ ×</span>
            </TitleBar>
            <div className="p-6 font-mono text-xs md:text-sm leading-loose space-y-1.5">
              <p>
                <span className="text-sub">{t('あなた', 'you', { 'zh-CN': '你', 'zh-TW': '你', ko: '나' })}:</span>{' '}
                /todo add {t('見積書を送る @明日', 'send the quote @tomorrow', { 'zh-CN': '发报价单 @明天', 'zh-TW': '寄報價單 @明天', ko: '견적서 보내기 @내일' })}
              </p>
              <p>
                <span className="text-sakura-lite font-semibold">Mirika:</span>{' '}
                {t('あずかった!デスクトップの子にも伝えておくね。', 'Got it! I will tell the one on your desktop too.', { 'zh-CN': '收到!我也会告诉桌面上的那个她。', 'zh-TW': '收到!我也會告訴桌面上的那個她。', ko: '맡았어! 데스크톱의 아이에게도 전해 둘게.' })}
              </p>
              <p className="text-sub/80">{t('…(翌日、期限1時間前の DM)…', '… (next day, one hour before the deadline) …', { 'zh-CN': '……(次日,截止前 1 小时的私信)……', 'zh-TW': '……(次日,截止前 1 小時的私訊)……', ko: '…(다음 날, 마감 1시간 전의 DM)…' })}</p>
              <p>
                <span className="text-sakura-lite font-semibold">Mirika:</span> 🚨{' '}
                {t('「見積書を送る」、あと1時間だよ!', '"Send the quote" — one hour left!', { 'zh-CN': '「发报价单」,还剩 1 小时!', 'zh-TW': '「寄報價單」,還剩 1 小時!', ko: '"견적서 보내기", 1시간 남았어!' })}
              </p>
            </div>
          </div>
          <div>
            <Kicker icon={MessageCircle} sakura label="Everywhere Companion" className="mb-4" />
            <h3 className="font-mincho font-bold text-2xl md:text-3xl mb-5 leading-relaxed">
              {t('デスクを離れても、同じ子と続く。', 'Step away from the desk — she follows.', { 'zh-CN': '离开桌面,也是同一个她。', 'zh-TW': '離開桌面,也是同一個她。', ko: '책상을 떠나도, 같은 아이와 이어진다.' })}
            </h3>
            <p className="text-mist leading-loose mb-6">
              {t('Discord にも同じ秘書がいます。外出先でタスクを頼めばデスクトップと双方向で同期し、期限は DM に3段階で届く。サーバーのボイスチャンネルでは VOICEVOX 全136声で読み上げ、「ミリカ」と呼びかければ声で返します(音声は文字にした瞬間に捨てる)。記憶と人格の複数端末同期(無料)と合わせて、どこにいても同じ子です。', 'The same secretary lives on Discord. Hand her a task while out and it syncs both ways with the desktop; deadlines reach your DMs in three stages. In voice channels she reads aloud in 136 VOICEVOX voices, and calling "Mirika" gets a spoken answer (audio is discarded the moment it becomes text). Together with free multi-device sync of memory and persona, she is the same ghost wherever you are.', {
                'zh-CN': 'Discord 上也有同一位秘书。在外面交给她任务,会与桌面双向同步;截止日期分三档提醒到私信。在服务器语音频道用 VOICEVOX 全 136 种声音朗读,喊一声「Mirika」就用声音回答(音频在转成文字的那一刻即被丢弃)。加上记忆与人格的多设备同步(免费),无论在哪都是同一个她。',
                'zh-TW': 'Discord 上也有同一位秘書。在外面交給她任務,會與桌面雙向同步;截止日期分三階段提醒到私訊。在伺服器語音頻道用 VOICEVOX 全 136 種聲音朗讀,喊一聲「Mirika」就用聲音回答(音訊在轉成文字的那一刻即被丟棄)。加上記憶與人格的多裝置同步(免費),無論在哪都是同一個她。',
                ko: 'Discord에도 같은 비서가 있습니다. 밖에서 태스크를 맡기면 데스크톱과 양방향 동기화되고, 마감은 DM으로 3단계 알림. 서버 음성 채널에서는 VOICEVOX 전 136 보이스로 낭독하고, "미리카"라고 부르면 목소리로 답합니다(음성은 텍스트가 되는 순간 폐기). 기억과 인격의 멀티 디바이스 동기화(무료)와 함께, 어디에 있어도 같은 아이입니다.',
              })}
            </p>
            <CheckList
              items={[
                t('Discord Bot — 会話・TODO 双方向同期・キー受け取りまで(Pro)', 'The Discord bot — talk, two-way TODO sync, key claiming (Pro)', { 'zh-CN': 'Discord Bot——对话・TODO 双向同步・领取密钥(Pro)', 'zh-TW': 'Discord Bot——對話・TODO 雙向同步・領取金鑰(Pro)', ko: 'Discord 봇 — 대화·TODO 양방향 동기화·키 수령(Pro)' }),
                t('ボイスチャンネル読み上げ+「ミリカ」と呼ぶ音声会話(音声は残さない)', 'Voice-channel reading + spoken answers to "Mirika" (audio never stored)', { 'zh-CN': '语音频道朗读+喊「Mirika」的语音对话(不保存音频)', 'zh-TW': '語音頻道朗讀+喊「Mirika」的語音對話(不保存音訊)', ko: '음성 채널 낭독+"미리카" 음성 대화(음성은 저장하지 않음)' }),
                t('記憶と人格の複数端末同期は無料(E2E 暗号化)', 'Multi-device sync of memory and persona is free (E2E-encrypted)', { 'zh-CN': '记忆与人格的多设备同步免费(E2E 加密)', 'zh-TW': '記憶與人格的多裝置同步免費(E2E 加密)', ko: '기억과 인격의 멀티 디바이스 동기화는 무료(E2E 암호화)' }),
              ]}
            />
          </div>
        </Reveal>

        {/* Everyday Partner */}
        <Reveal className="grid md:grid-cols-2 gap-12 items-center">
          <div className="os-window md:order-2">
            <TitleBar>
              <span>{t('memory.db — 就寝時整理', 'memory.db — bedtime consolidation', { 'zh-CN': 'memory.db — 睡前整理', 'zh-TW': 'memory.db — 睡前整理', ko: 'memory.db — 취침 시 정리' })}</span>
              <span className="flex items-center gap-1 text-sub">
                <Moon className="w-3.5 h-3.5" /> consolidating…
              </span>
            </TitleBar>
            <div className="p-6 font-mono text-xs leading-loose">
              <p>
                <span className="text-sakura-lite font-semibold">fact</span>{' '}
                {t('ユーザーは猫を飼っている', 'user has a cat', { 'zh-CN': '用户养了一只猫', 'zh-TW': '用戶養了一隻貓', ko: '사용자는 고양이를 키운다' })}{' '}
                <span className="text-sub/80">(2026-05-12)</span>
              </p>
              <p>
                <span className="text-sakura-lite font-semibold">fact</span>{' '}
                {t('好きな曲: シューゲイザー系', 'likes shoegaze', { 'zh-CN': '喜欢的音乐:盯鞋系', 'zh-TW': '喜歡的音樂:盯鞋系', ko: '좋아하는 곡: 슈게이저 계열' })}{' '}
                <span className="text-sub/80">(2026-06-02)</span>
              </p>
              <p>
                <span className="text-sakura-lite font-semibold">anniv</span>{' '}
                {t('初起動から', 'day', { 'zh-CN': '首次启动至今', 'zh-TW': '首次啟動至今', ko: '첫 기동부터' })} <AnnivDays />
                {t('日', '', { 'zh-CN': '天', 'zh-TW': '天', ko: '일' })}{' '}
                <span className="text-sub/80">{t('← もうすぐ400日!', '← almost 400!', { 'zh-CN': '← 快 400 天了!', 'zh-TW': '← 快 400 天了!', ko: '← 곧 400일!' })}</span>
              </p>
              <p>
                <span className="text-sakura-lite font-semibold">episode</span>{' '}
                {t('昨日: 締切の相談、少し疲れてた様子', 'yesterday: deadline talk, seemed a bit tired', { 'zh-CN': '昨天:聊了截止日期,看起来有点累', 'zh-TW': '昨天:聊了截止日期,看起來有點累', ko: '어제: 마감 상담, 조금 지쳐 보였음' })}
              </p>
              <p>
                <span className="text-sakura-lite font-semibold">dream</span>{' '}
                {t('締切が猫になって逃げていく夢(?)', 'a dream where the deadline turned into a cat and ran (?)', { 'zh-CN': '梦见截止日期变成猫跑掉了(?)', 'zh-TW': '夢見截止日期變成貓跑掉了(?)', ko: '마감이 고양이가 되어 도망가는 꿈(?)' })}
              </p>
              <p className="text-sub/80 border-t border-ink/10 mt-3 pt-3">consolidating today's memories…</p>
            </div>
          </div>
          <div className="md:order-1">
            <Kicker icon={Heart} sakura label="Everyday Partner" className="mb-4" />
            <h3 className="font-mincho font-bold text-2xl md:text-3xl mb-5 leading-relaxed">
              {t('関係は、数年かけて育つ。', 'A relationship that takes years to grow.', { 'zh-CN': '关系,要花上数年才长成。', 'zh-TW': '關係,要花上數年才長成。', ko: '관계는, 몇 년에 걸쳐 자란다.' })}
            </h3>
            <p className="text-mist leading-loose mb-6">
              {t('なかよし度は、話しかけた回数の合計ではありません。一日に育つぶんには上限があり、深くなるほど一歩は重くなる——「家族みたいな存在」は数年先です。しばらく会わなければ距離ができ(それでも他人には戻らず、再会すると早く戻る)、出会った日から続くバイオリズムで「なんとなく調子の出ない週」があり、雨が続けば沈み、撫ですぎれば疲れ、同じ話ばかりでは動かない。数字は見せません——見えるのは段と、「ここ最近、ぐんぐん近づいている気がする」という気配だけ。', 'Affection is not a running total of messages. Only so much can grow in a day, and each step gets heavier as you get closer — "family" is years away. Stay away a while and distance forms (never back to strangers, and it returns faster when you meet again); a biorhythm running from the day you met gives her off weeks; rain wears her down, too much petting tires her, and the same story twice moves nothing. No numbers are shown — only the stage, and a feeling: "we have been growing closer lately".', {
                'zh-CN': '好感度不是说话次数的累计。一天能长的量有上限,越亲近每一步越重——「家人一般的存在」在数年之后。久不见面就会生疏(但不会退回陌生人,再见面时恢复得更快);从相遇那天延续的生理节律会带来「不知怎么就没状态的一周」;雨天会低落,抚摸过头会疲惫,老说同样的话则毫无波澜。不显示数字——能看到的只有阶段,和「最近好像越来越近了」这样的气息。',
                'zh-TW': '好感度不是說話次數的累計。一天能長的量有上限,越親近每一步越重——「家人一般的存在」在數年之後。久不見面就會生疏(但不會退回陌生人,再見面時恢復得更快);從相遇那天延續的生理節律會帶來「不知怎麼就沒狀態的一週」;雨天會低落,撫摸過頭會疲憊,老說同樣的話則毫無波瀾。不顯示數字——能看到的只有階段,和「最近好像越來越近了」這樣的氣息。',
                ko: '친밀도는 말을 건 횟수의 합계가 아닙니다. 하루에 자랄 수 있는 양에는 상한이 있고, 깊어질수록 한 걸음이 무거워집니다 — "가족 같은 존재"는 몇 년 뒤입니다. 한동안 만나지 않으면 거리가 생기고(그래도 남으로 돌아가지는 않으며, 다시 만나면 빨리 돌아옵니다), 만난 날부터 이어지는 바이오리듬으로 "왠지 컨디션이 안 나는 주"가 있고, 비가 이어지면 가라앉고, 너무 쓰다듬으면 지치고, 같은 이야기만으로는 움직이지 않습니다. 숫자는 보여 주지 않습니다 — 보이는 것은 단계와, "요즘 부쩍 가까워지고 있는 것 같아"라는 기색뿐.',
              })}
            </p>
            <CheckList
              items={[
                t('絆(数年)と気分(日々)の2層——すぐには MAX にならない', 'Two layers — bond (years) and mood (days). It never maxes out quickly', { 'zh-CN': '羁绊(数年)与心情(每日)双层——不会很快满值', 'zh-TW': '羈絆(數年)與心情(每日)雙層——不會很快滿值', ko: '유대(몇 년)와 기분(나날)의 2층 — 금방 MAX가 되지 않음' }),
                t('数年単位の長期記憶と、夜のあいだの整理と夢', 'Years-long memory, tidied overnight, with dreams', { 'zh-CN': '以年计的长期记忆,以及夜里的整理与梦', 'zh-TW': '以年計的長期記憶,以及夜裡的整理與夢', ko: '몇 년 단위의 장기 기억과 밤사이의 정리와 꿈' }),
                t('記念日・時報・起動挨拶(ルールで即応)', 'Anniversaries, hourly chimes, boot greetings (instant, rule-based)', { 'zh-CN': '纪念日・报时・启动问候(规则即时响应)', 'zh-TW': '紀念日・報時・啟動問候(規則即時響應)', ko: '기념일·시보·기동 인사(룰로 즉응)' }),
              ]}
            />
          </div>
        </Reveal>

      </div>
    </Section>
  );
}
