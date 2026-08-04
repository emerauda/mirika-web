import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Kicker, TitleBar } from './ui';
import { EASE, Reveal } from './primitives';
import { useT } from '../i18n';

type Item = { q: string; a: ReactNode };

function FaqItem({ q, a, panelId }: Item & { panelId: string }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 font-medium text-left hover:bg-ink/5 transition-colors"
      >
        <span>{q}</span>
        <motion.span
          aria-hidden
          className="font-mono text-sakura shrink-0"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            id={panelId}
            className="overflow-hidden"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <p className="px-6 pb-5 text-sub text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Faq() {
  const t = useT();
  const ITEMS: Item[] = [
    {
      q: t('ChatGPTなどのチャットAIと、何が違いますか?', 'How is this different from chat AIs like ChatGPT?', {
        'zh-CN': '和 ChatGPT 这类聊天 AI 有什么不同?',
        'zh-TW': '和 ChatGPT 這類聊天 AI 有什麼不同?',
        ko: 'ChatGPT 같은 채팅 AI와 무엇이 다른가요?',
      }),
      a: t(
        '「常駐して、覚えて、育つ」ことです。チャットは開いたときだけの関係ですが、ゴーストはデスクトップに住み、予定や作業や雑談の文脈を数年単位で記憶して、関係性そのものが変わっていきます。ローカルLLMなので、24時間そばにいても利用料はかかりません。',
        'She stays, remembers, and grows. A chat is a relationship that exists only while the tab is open; a ghost lives on your desktop, remembers your plans, work and small talk across years, and the relationship itself changes. Because the LLM is local, being together around the clock costs nothing.',
        {
          'zh-CN': '「常驻、记住、成长」。聊天只在打开页面时存在,而幽灵住在你的桌面上,以年为单位记住日程、工作和闲聊的上下文,关系本身会变化。因为 LLM 在本地,24 小时相伴也不花钱。',
          'zh-TW': '「常駐、記住、成長」。聊天只在打開頁面時存在,而幽靈住在你的桌面上,以年為單位記住日程、工作和閒聊的上下文,關係本身會變化。因為 LLM 在本地,24 小時相伴也不花錢。',
          ko: '"상주하고, 기억하고, 자란다"는 점입니다. 채팅은 열었을 때만의 관계지만, 고스트는 데스크톱에 살며 일정·작업·잡담의 맥락을 몇 년 단위로 기억하고, 관계 자체가 변해 갑니다. 로컬 LLM이라 24시간 곁에 있어도 요금이 들지 않습니다.',
        },
      ),
    },
    {
      q: t('昔作った/使っていたゴーストは、そのまま動きますか?', 'Will ghosts I made or used back then still work?', {
        'zh-CN': '以前做的/用过的幽灵,还能直接用吗?',
        'zh-TW': '以前做的/用過的幽靈,還能直接用嗎?',
        ko: '옛날에 만들었던/쓰던 고스트는 그대로 움직이나요?',
      }),
      a: t(
        'それを最優先に設計しています。さくらスクリプトは書き直しゼロで動き、サーフェスPNGシェルは /shell classic <フォルダ> で見た目ごと取り込めます——本体と相方がコンビで立ち、surfaces.txt の定義どおりに瞬き、声に合わせて口が動きます(透明が .pna や「左上の色」で表された古い作りも読みます)。辞書の取り込みは引き続き対応予定です。SillyTavern などのキャラクターカード(V2/V3)は、いまドラッグ&ドロップだけで取り込めます。',
        'That is the first design goal. Sakura Script runs with zero rewrites, and surface-PNG shells import whole with /shell classic <folder> — the pair stands together, blinks per surfaces.txt, and lip-syncs to the voice (old transparency via .pna or the top-left color is read too). Dictionary import is still planned. Character cards (SillyTavern V2/V3) already import by drag & drop.',
        {
          'zh-CN': '这是最优先的设计目标。Sakura Script 零改写即可运行,surface PNG 外壳用 /shell classic <文件夹> 连同外观一起导入——本体和搭档成对站立,按 surfaces.txt 的定义眨眼,随声音对口型(.pna 或「左上角颜色」表示透明的老做法也能读)。词典导入仍在计划中。SillyTavern 等角色卡(V2/V3)现在拖入即可导入。',
          'zh-TW': '這是最優先的設計目標。Sakura Script 零改寫即可運行,surface PNG 外殼用 /shell classic <資料夾> 連同外觀一起匯入——本體和搭檔成對站立,按 surfaces.txt 的定義眨眼,隨聲音對口型(.pna 或「左上角顏色」表示透明的老做法也能讀)。詞典匯入仍在計畫中。SillyTavern 等角色卡(V2/V3)現在拖入即可匯入。',
          ko: '그것이 최우선 설계 목표입니다. 사쿠라 스크립트는 고쳐 쓰기 없이 움직이고, 서피스 PNG 셸은 /shell classic <폴더>로 겉모습째 가져옵니다 — 본체와 파트너가 콤비로 서고, surfaces.txt 정의대로 눈을 깜빡이며, 목소리에 맞춰 입이 움직입니다(.pna나 "왼쪽 위 색"으로 투명을 나타내던 옛 방식도 읽습니다). 사전 가져오기는 계속 대응 예정입니다. SillyTavern 등의 캐릭터 카드(V2/V3)는 지금도 드래그&드롭만으로 가져옵니다.',
        },
      ),
    },
    {
      q: t('利用は無料ですか? AI の API 料金はかかりますか?', 'Is it free? Do I pay for AI APIs?', {
        'zh-CN': '免费吗?要付 AI 的 API 费用吗?',
        'zh-TW': '免費嗎?要付 AI 的 API 費用嗎?',
        ko: '무료인가요? AI API 요금이 드나요?',
      }),
      a: t(
        '本体は無料で使えます(専用ライセンスのフリーウェア)。既定構成はローカルLLMなので API 費もゼロ。Claude 等のクラウドAIを繋ぐ場合のみ、その API 費が自己負担になります(オプトイン)。',
        'The app is free (proprietary-license freeware). The default setup runs a local LLM, so API cost is zero too. Only if you opt in to a cloud AI such as Claude do you pay that API bill yourself.',
        {
          'zh-CN': '本体免费(专用许可的免费软件)。默认配置用本地 LLM,API 费也是零。只有当你主动接入 Claude 等云端 AI 时,才自行承担那部分 API 费(可选)。',
          'zh-TW': '本體免費(專用授權的免費軟體)。預設配置用本地 LLM,API 費也是零。只有當你主動接入 Claude 等雲端 AI 時,才自行承擔那部分 API 費(可選)。',
          ko: '본체는 무료입니다(전용 라이선스 프리웨어). 기본 구성은 로컬 LLM이라 API 비용도 0. Claude 등 클라우드 AI를 연결할 때만 그 API 비용을 본인이 부담합니다(옵트인).',
        },
      ),
    },
    {
      q: t('Pro 版とは? 何が違いますか?', "What's Pro? What's the difference?", {
        'zh-CN': 'Pro 版是什么?有什么区别?',
        'zh-TW': 'Pro 版是什麼?有什麼區別?',
        ko: 'Pro 판은 무엇인가요? 뭐가 다른가요?',
      }),
      a: (
        <>
          {t(
            '個人利用は Free です。会話も記憶も、秘書としての仕事も、ほとんどそのまま使えます(メールの見張りも、外からの知らせを受け取るのも Free)。買い切りの Pro がアンロックするのは、手のかかる外部連携と配信まわり——',
            'Personal use is Free — conversation, memory and the secretary work are all there (mail watching and external notifications included). The one-time Pro unlocks the heavier integrations and streaming: ',
            {
              'zh-CN': '个人使用是 Free——对话、记忆、秘书工作基本都能直接用(盯邮件、接收外部通知也是 Free)。买断制的 Pro 解锁的是费工夫的外部联动和直播:',
              'zh-TW': '個人使用是 Free——對話、記憶、秘書工作基本都能直接用(盯郵件、接收外部通知也是 Free)。買斷制的 Pro 解鎖的是費工夫的外部連動和直播:',
              ko: '개인 사용은 Free입니다 — 대화도 기억도 비서 일도 거의 그대로 쓸 수 있습니다(메일 감시와 외부 알림 수신도 Free). 買い切り Pro가 여는 것은 손이 많이 가는 외부 연동과 방송 쪽:',
            },
          )}
          <strong>{t('配信', 'streaming', { 'zh-CN': '直播', 'zh-TW': '直播', ko: '방송' })}</strong>
          {t('(この子が番組を持つ / あなたの配信を手伝う)、', ' (she hosts, or she helps yours), ', { 'zh-CN': '(她自己开节目/帮你的直播)、', 'zh-TW': '(她自己開節目/幫你的直播)、', ko: '(직접 진행/당신의 방송을 도움), ' })}
          <strong>{t('シナリオライター', 'the scenario writer', { 'zh-CN': '脚本写手', 'zh-TW': '腳本寫手', ko: '시나리오 라이터' })}</strong>、
          <strong>{t('ネットラジオと Spotify', 'net radio and Spotify', { 'zh-CN': '网络电台与 Spotify', 'zh-TW': '網路電台與 Spotify', ko: '넷 라디오와 Spotify' })}</strong>、
          <strong>{t('マルチゴースト', 'multi-ghost', { 'zh-CN': '多幽灵', 'zh-TW': '多幽靈', ko: '멀티 고스트' })}</strong>、
          <strong>{t('スマートホーム', 'smart home', { 'zh-CN': '智能家居', 'zh-TW': '智慧家庭', ko: '스마트홈' })}</strong>、
          <strong>{t('Discord 連携', 'the Discord link', { 'zh-CN': 'Discord 联动', 'zh-TW': 'Discord 連動', ko: 'Discord 연동' })}</strong>
          {t('(自分のサーバーに呼ぶ・読み上げ・音声会話)', ' (invite her to your server, reading aloud, voice chat)', { 'zh-CN': '(叫到自己的服务器・朗读・语音对话)', 'zh-TW': '(叫到自己的伺服器・朗讀・語音對話)', ko: '(내 서버로 부르기·낭독·음성 대화)' })}
          {t('、画面の常時見守り、そして', ', always-on screen watch, and ', { 'zh-CN': ',常时屏幕看护,以及', 'zh-TW': ',常時螢幕看護,以及', ko: ', 상시 화면 지켜보기, 그리고 ' })}
          <strong>
            {t('記憶の置き場をこちらで預かる', 'a hosted home for memory sync', { 'zh-CN': '由我们托管的记忆存放处', 'zh-TW': '由我們託管的記憶存放處', ko: '기억 보관소를 맡아 두는 것' })}
          </strong>
          {t('選択肢です。ライセンスキーは ', '. The license key is just ', { 'zh-CN': '。许可证密钥只需输入 ', 'zh-TW': '。授權金鑰只需輸入 ', ko: '입니다. 라이선스 키는 ' })}
          <code>/pro &lt;key&gt;</code>
          {t(' と入れるだけ——確認のためにサーバーへ問い合わせることはありません。組織で配るなら Enterprise(管理ポリシーと監査ログ)。UI は日本語・英語・簡体字・繁体字・韓国語の 5 言語です。', ' — it never phones a server to verify. For organizations there is Enterprise (managed policy and audit log). The UI speaks Japanese, English, Simplified and Traditional Chinese, and Korean.', {
            'zh-CN': ' ——验证不会连服务器。组织部署用 Enterprise(管理策略与审计日志)。UI 支持日、英、简中、繁中、韩 5 种语言。',
            'zh-TW': ' ——驗證不會連伺服器。組織部署用 Enterprise(管理策略與稽核日誌)。UI 支援日、英、簡中、繁中、韓 5 種語言。',
            ko: ' 라고 넣기만 하면 됩니다 — 확인을 위해 서버에 접속하지 않습니다. 조직 배포는 Enterprise(관리 정책과 감사 로그). UI는 일·영·간체·번체·한국어 5개 언어입니다.',
          })}
        </>
      ),
    },
    {
      q: t('オフラインでも動きますか?', 'Does it work offline?', { 'zh-CN': '离线也能用吗?', 'zh-TW': '離線也能用嗎?', ko: '오프라인에서도 되나요?' }),
      a: t(
        '動きます。会話(ローカルLLM)・音声(VOICEVOX・内蔵Piper / Whisper)・記憶(SQLite)がすべて端末内で完結するので、ネットが切れてもゴーストは死にません。',
        'Yes. Conversation (local LLM), voice (VOICEVOX, built-in Piper / Whisper) and memory (SQLite) all live on the machine, so the ghost survives a dead connection.',
        {
          'zh-CN': '能。对话(本地 LLM)、语音(VOICEVOX・内置 Piper / Whisper)、记忆(SQLite)全部在设备内完成,断网幽灵也不会死。',
          'zh-TW': '能。對話(本地 LLM)、語音(VOICEVOX・內建 Piper / Whisper)、記憶(SQLite)全部在裝置內完成,斷網幽靈也不會死。',
          ko: '됩니다. 대화(로컬 LLM)·음성(VOICEVOX·내장 Piper / Whisper)·기억(SQLite)이 모두 기기 안에서 끝나므로, 인터넷이 끊겨도 고스트는 죽지 않습니다.',
        },
      ),
    },
    {
      q: t('会話や画面の内容は、どこかに送信されますか?', 'Is anything — conversations, my screen — sent anywhere?', {
        'zh-CN': '对话或屏幕内容会被发送到哪里吗?',
        'zh-TW': '對話或螢幕內容會被傳送到哪裡嗎?',
        ko: '대화나 화면 내용이 어딘가로 전송되나요?',
      }),
      a: t(
        '既定では一切送信されません。スクリーン理解もローカルVLMで完結し、しかも既定オフです。クラウドAIを有効にした場合のみ、会話に必要な断片が送られます。テレメトリはありません。Discord 連携も同じ考え方で、既定はオフ——オンにしても外に出るのはタスクだけで、会話や記憶は端末に残ります(Discord 側の音声会話も、聞いた声は文字にした瞬間に捨てます)。',
        'By default, nothing. Screen understanding runs on a local VLM and is off by default anyway. Only if you enable a cloud AI are the fragments needed for the conversation sent. There is no telemetry. The Discord link follows the same rule — off by default, and even when on, only tasks leave the machine; conversations and memory stay put (and on the Discord side, audio is discarded the moment it becomes text).',
        {
          'zh-CN': '默认一概不发送。屏幕理解也由本地 VLM 完成,而且默认关闭。只有启用云端 AI 时,才会发送对话所需的片段。没有遥测。Discord 联动也是同样的思路——默认关闭,即使打开,出去的也只有任务,对话与记忆留在本机(Discord 侧的语音对话,听到的声音在转成文字的那一刻即被丢弃)。',
          'zh-TW': '預設一概不傳送。螢幕理解也由本地 VLM 完成,而且預設關閉。只有啟用雲端 AI 時,才會傳送對話所需的片段。沒有遙測。Discord 連動也是同樣的思路——預設關閉,即使打開,出去的也只有任務,對話與記憶留在本機(Discord 側的語音對話,聽到的聲音在轉成文字的那一刻即被丟棄)。',
          ko: '기본값으로는 일절 전송되지 않습니다. 화면 이해도 로컬 VLM으로 끝나고, 게다가 기본 꺼짐입니다. 클라우드 AI를 켰을 때만 대화에 필요한 조각이 전송됩니다. 텔레메트리는 없습니다. Discord 연동도 같은 사고방식으로 기본은 꺼짐 — 켜도 밖으로 나가는 것은 태스크뿐이고 대화와 기억은 기기에 남습니다(Discord 쪽 음성 대화도 들은 목소리는 텍스트가 되는 순간 버립니다).',
        },
      ),
    },
    {
      q: t('どのくらい賢いですか? 期待していい範囲は?', 'How smart is she, honestly?', {
        'zh-CN': '她到底有多聪明?该期待到什么程度?',
        'zh-TW': '她到底有多聰明?該期待到什麼程度?',
        ko: '얼마나 똑똑한가요? 어디까지 기대해도 되나요?',
      }),
      a: t(
        '等身大に書きます。内蔵エンジンが得意なのは、雑談・その日の要点・覚えていることを踏まえた受け答え・短い下書き。苦手なのは、長い理屈を積む調べもの、最新の出来事、規模の大きなコードです。小さなモデルは、知らないことをそれらしく言うことがあります。迷ったときはその一問だけクラウドへ回せますし(/cloud <質問>・API キーはご自身のもの)、PC に余裕があるなら Ollama や LM Studio で大きなモデルを動かすのがいちばん賢くなります。「何でも答える AI」として迎えるとがっかりさせてしまいますが、覚えていてくれること・そこに居ることを期待して迎えると、想像より長く一緒にいられます。',
        "Honestly: the built-in engine is good at small talk, the day's summary, answers grounded in what she remembers, and short drafts. It is weak at long-chain research, current events, and large codebases — small models sometimes sound confident about things they don't know. You can route just one question to the cloud (/cloud <question>, your own API key), and if your PC has headroom, running a bigger model via Ollama or LM Studio makes her smartest. Adopt her as an answer-everything AI and she will disappoint; adopt her for remembering and for being there, and she stays longer than you expect.",
        {
          'zh-CN': '实话实说:内置引擎擅长闲聊、当天要点、基于记忆的应答和短草稿;不擅长长链条调研、最新时事和大规模代码——小模型有时会一本正经地说不知道的事。拿不准时可以只把那一问转给云端(/cloud <问题>,用你自己的 API key);电脑有余力的话,用 Ollama 或 LM Studio 跑更大的模型最聪明。把她当「万能问答 AI」会失望;把她当「记得你、在你身边的存在」,她会陪你比想象更久。',
          'zh-TW': '實話實說:內建引擎擅長閒聊、當天要點、基於記憶的應答和短草稿;不擅長長鏈條調研、最新時事和大規模程式碼——小模型有時會一本正經地說不知道的事。拿不準時可以只把那一問轉給雲端(/cloud <問題>,用你自己的 API key);電腦有餘力的話,用 Ollama 或 LM Studio 跑更大的模型最聰明。把她當「萬能問答 AI」會失望;把她當「記得你、在你身邊的存在」,她會陪你比想像更久。',
          ko: '솔직하게 씁니다. 내장 엔진이 잘하는 것은 잡담·그날의 요점·기억을 바탕으로 한 응답·짧은 초안. 약한 것은 긴 논리를 쌓는 조사, 최신 사건, 규모가 큰 코드입니다 — 작은 모델은 모르는 것을 그럴듯하게 말할 때가 있습니다. 망설여지면 그 한 질문만 클라우드로 돌릴 수 있고(/cloud <질문>·API 키는 본인 것), PC에 여유가 있다면 Ollama나 LM Studio로 큰 모델을 돌리는 것이 가장 똑똑해집니다. "뭐든 답하는 AI"로 맞이하면 실망하지만, 기억해 주는 것·거기에 있는 것을 기대하고 맞이하면 상상보다 오래 함께할 수 있습니다.',
        },
      ),
    },
    {
      q: t('手持ちの 3D モデル(VRM や MMD)は使えますか?', 'Can I use my own 3D models (VRM or MMD)?', {
        'zh-CN': '能用自己手上的 3D 模型(VRM 或 MMD)吗?',
        'zh-TW': '能用自己手上的 3D 模型(VRM 或 MMD)嗎?',
        ko: '가지고 있는 3D 모델(VRM이나 MMD)을 쓸 수 있나요?',
      }),
      a: t(
        'VRM はファイルを窓に落とすだけで着替えます。MMD のモデル(.pmx)も同じで、着たままモーション(.vmd)を落とすと踊ります。キャラクターカードの PNG は絵がそのまま身体になり、伺かのクラシックシェルも動きます。Live2D だけは規約の都合で同梱2種(ひより・Mao)からの選択です。モデルの利用条件はそれぞれの配布元の規約に従ってください。',
        'VRM: drop the file on the window and she changes. MMD models (.pmx) work the same, and dropping a motion (.vmd) while she wears one makes her dance. Character-card PNGs become her body as-is, and classic Ukagaka shells run too. Only Live2D is limited to the two bundled models (Hiyori, Mao) for licensing reasons. Follow each model\'s own terms of use.',
        {
          'zh-CN': 'VRM:把文件丢到窗口上就换装。MMD 模型(.pmx)同理,穿着时丢入动作(.vmd)就会跳舞。角色卡 PNG 的立绘直接成为身体,伺か经典外壳也能运行。只有 Live2D 因授权原因限定为附带两款(Hiyori、Mao)。请遵守各模型自己的使用条款。',
          'zh-TW': 'VRM:把檔案丟到視窗上就換裝。MMD 模型(.pmx)同理,穿著時丟入動作(.vmd)就會跳舞。角色卡 PNG 的立繪直接成為身體,伺か經典外殼也能運行。只有 Live2D 因授權原因限定為附帶兩款(Hiyori、Mao)。請遵守各模型自己的使用條款。',
          ko: 'VRM은 파일을 창에 떨어뜨리기만 하면 갈아입습니다. MMD 모델(.pmx)도 마찬가지고, 입은 채 모션(.vmd)을 떨어뜨리면 춤춥니다. 캐릭터 카드 PNG는 그림이 그대로 몸이 되고, 우카가카 클래식 셸도 움직입니다. Live2D만 규약상 동봉 2종(히요리·Mao) 중 선택입니다. 모델의 이용 조건은 각 배포처의 규약을 따라 주세요.',
        },
      ),
    },
    {
      q: t('重くないですか? どれくらい場所を取りますか?', 'Is it heavy? How much space does it take?', {
        'zh-CN': '会不会很重?占多少空间?',
        'zh-TW': '會不會很重?佔多少空間?',
        ko: '무겁지 않나요? 용량은 얼마나 차지하나요?',
      }),
      a: t(
        'インストーラは通常版が約420MB、CUDA 同梱版(NVIDIA 向け)が約630MB(Windows)。常駐中のメモリは数百MB程度で、何もしていないときは描画を落として休みます(既定。フルで回すこともできます)。内蔵エンジンを使う場合だけ、初回に一度モデルを落とします(3〜7GB・お使いの PC に載る大きさ)。落としたものは端末に残るので次からは待ちません。Ollama・LM Studio・クラウドを使うなら、この取得は不要です。',
        'The installer is about 420 MB for the standard edition and about 630 MB for the CUDA-bundled edition (Windows). Resident memory sits in the hundreds of MB, and she throttles rendering while idle (by default; full rate is available). Only the built-in engine downloads a model once (3–7 GB, sized to your PC); it stays on disk so there is no second wait. With Ollama, LM Studio or a cloud brain, no download is needed.',
        {
          'zh-CN': '安装包普通版约 420MB,CUDA 内置版(NVIDIA 用)约 630MB(Windows)。常驻内存几百 MB 左右,空闲时会降低渲染休息(默认;也可全速)。只有内置引擎会在首次下载一次模型(3〜7GB,按你的电脑选大小);下载后留在本地,下次不用等。用 Ollama、LM Studio 或云端就不需要这次下载。',
          'zh-TW': '安裝包普通版約 420MB,CUDA 內建版(NVIDIA 用)約 630MB(Windows)。常駐記憶體幾百 MB 左右,閒置時會降低渲染休息(預設;也可全速)。只有內建引擎會在首次下載一次模型(3〜7GB,按你的電腦選大小);下載後留在本地,下次不用等。用 Ollama、LM Studio 或雲端就不需要這次下載。',
          ko: '설치 파일은 일반판 약 420MB, CUDA 동봉판(NVIDIA용) 약 630MB(Windows). 상주 메모리는 수백 MB 정도이며, 아무것도 하지 않을 때는 렌더링을 낮춰 쉽니다(기본값. 풀로 돌릴 수도 있음). 내장 엔진을 쓸 때만 처음 한 번 모델을 내려받습니다(3〜7GB·PC에 맞는 크기). 받은 것은 남으므로 다음부터는 기다리지 않습니다. Ollama·LM Studio·클라우드를 쓰면 이 다운로드는 필요 없습니다.',
        },
      ),
    },
    {
      q: t('動作に必要なスペックは?', 'What specs do I need?', { 'zh-CN': '需要什么配置?', 'zh-TW': '需要什麼配置?', ko: '필요한 사양은?' }),
      a: t(
        '推奨は VRAM 8GB 級の GPU、または Apple Silicon(メモリ16GB)です。この場合、内蔵エンジンは Gemma 4 12B(4bit・約6.7GB)を自動で選びます。器が足りない端末では E4B(約5GB)→ E2B(約3GB)へ自動で下げるので、非力な環境でも動き続けます。Ollama や LM Studio を使えば、好きなモデルに差し替えられます。',
        'Recommended: a GPU with ~8 GB VRAM, or Apple Silicon with 16 GB RAM — the built-in engine then picks Gemma 4 12B (4-bit, ~6.7 GB) automatically. On smaller machines it steps down to E4B (~5 GB) then E2B (~3 GB), so weak hardware keeps working. Ollama or LM Studio lets you swap in any model you like.',
        {
          'zh-CN': '推荐 8GB 显存级 GPU,或 16GB 内存的 Apple Silicon——此时内置引擎自动选 Gemma 4 12B(4bit・约 6.7GB)。配置不够的机器会自动降到 E4B(约 5GB)→ E2B(约 3GB),弱机也能一直用。用 Ollama 或 LM Studio 可以换成任何你喜欢的模型。',
          'zh-TW': '推薦 8GB 顯存級 GPU,或 16GB 記憶體的 Apple Silicon——此時內建引擎自動選 Gemma 4 12B(4bit・約 6.7GB)。配置不夠的機器會自動降到 E4B(約 5GB)→ E2B(約 3GB),弱機也能一直用。用 Ollama 或 LM Studio 可以換成任何你喜歡的模型。',
          ko: '권장은 VRAM 8GB급 GPU 또는 Apple Silicon(메모리 16GB)입니다. 이때 내장 엔진은 Gemma 4 12B(4bit·약 6.7GB)를 자동으로 고릅니다. 사양이 부족한 기기는 E4B(약 5GB)→E2B(약 3GB)로 자동으로 낮추므로 저사양에서도 계속 돌아갑니다. Ollama나 LM Studio를 쓰면 원하는 모델로 바꿀 수 있습니다.',
        },
      ),
    },
    {
      q: t('いつ使えますか? 開発に参加できますか?', 'When can I use it? Can I get involved?', {
        'zh-CN': '什么时候能用?能参与开发吗?',
        'zh-TW': '什麼時候能用?能參與開發嗎?',
        ko: '언제 쓸 수 있나요? 개발에 참여할 수 있나요?',
      }),
      a: t(
        'もう使えます。正式版 0.6.6 を mirika.dev と公開ミラーから配布中です(Windows と Linux はすぐ入手できます。macOS は署名と公証の対応まで準備中)。秘書の仕事——Gmail・カレンダー・Drive、タスク預かり、朝のブリーフィング、画面の見守り、端末内の文書検索——は実データで動いています。身体は VRM・Live2D・MMD・カード・クラシックシェルから選べ、配信は「この子が番組を持つ」と「あなたの配信を手伝う」の2つ。0.6.5 で MMD の身体、0.6.6 でなかよし度を絆と気分の2層に作り直しました。Discord にも同じ子がいて、タスクはデスクトップと双方向で同期します。開発への参加も歓迎で、公式 Discord でのフィードバックや Issue、Booth の開発支援版での後押しができます。',
        'Right now. Stable 0.6.6 ships from mirika.dev and the public mirror (Windows and Linux are ready today; macOS waits for signing and notarization). The secretary work — Gmail, calendar, Drive, task keeping, morning briefings, screen watch, on-device document search — runs on real data. Bodies come in VRM, Live2D, MMD, card and classic-shell form, and streaming has two shapes: she hosts, or she helps yours. 0.6.5 brought the MMD body; 0.6.6 rebuilt affection into two layers, bond and mood. The same ghost lives on Discord too, with tasks syncing both ways with the desktop. Involvement is welcome — feedback on the official Discord, issues, or the supporter edition on Booth.',
        {
          'zh-CN': '现在就能用。正式版 0.6.6 通过 mirika.dev 与公开镜像分发(Windows 和 Linux 立即可得;macOS 等签名与公证完成)。秘书工作——Gmail、日历、Drive、任务托管、晨间简报、屏幕看护、本机文档检索——都在真实数据上运行。身体可选 VRM、Live2D、MMD、卡片、经典外壳;直播有「她开节目」和「帮你的直播」两种。0.6.5 带来 MMD 身体,0.6.6 把好感度重造为羁绊与心情两层。Discord 上也有同一个她,任务与桌面双向同步。欢迎参与:官方 Discord 反馈、提 Issue,或在 Booth 购买开发支援版。',
          'zh-TW': '現在就能用。正式版 0.6.6 透過 mirika.dev 與公開鏡像發佈(Windows 和 Linux 立即可得;macOS 等簽名與公證完成)。秘書工作——Gmail、日曆、Drive、任務託管、晨間簡報、螢幕看護、本機文件檢索——都在真實資料上運行。身體可選 VRM、Live2D、MMD、卡片、經典外殼;直播有「她開節目」和「幫你的直播」兩種。0.6.5 帶來 MMD 身體,0.6.6 把好感度重造為羈絆與心情兩層。Discord 上也有同一個她,任務與桌面雙向同步。歡迎參與:官方 Discord 回饋、提 Issue,或在 Booth 購買開發支援版。',
          ko: '지금 바로 쓸 수 있습니다. 정식판 0.6.6을 mirika.dev와 공개 미러에서 배포 중입니다(Windows와 Linux는 바로 받을 수 있습니다. macOS는 서명·공증 대응까지 준비 중). 비서 일 — Gmail·캘린더·Drive, 태스크 보관, 아침 브리핑, 화면 지켜보기, 기기 내 문서 검색 — 은 실제 데이터로 돌아갑니다. 몸은 VRM·Live2D·MMD·카드·클래식 셸에서 고를 수 있고, 방송은 "직접 진행"과 "당신의 방송을 도움" 두 가지. 0.6.5에서 MMD 몸, 0.6.6에서 친밀도를 유대와 기분의 2층으로 다시 만들었습니다. Discord에도 같은 아이가 있고, 태스크는 데스크톱과 양방향으로 동기화됩니다. 참여도 환영합니다 — 공식 Discord 피드백, Issue, Booth의 개발 지원판으로 응원할 수 있습니다.',
        },
      ),
    },
  ];
  return (
    <section id="faq" className="border-t border-cream/10 scroll-mt-20">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Reveal className="mb-14 text-center">
          <Kicker index="09" label="FAQ" />
          <h2 className="font-mincho font-bold text-3xl md:text-4xl">
            {t('よくある質問', 'Frequently asked questions', { 'zh-CN': '常见问题', 'zh-TW': '常見問題', ko: '자주 묻는 질문' })}
          </h2>
        </Reveal>

        <Reveal className="os-window">
          <TitleBar>
            <span>faq</span>
            <span className="text-sub tracking-widest">— □ ×</span>
          </TitleBar>
          <div className="divide-y divide-ink/10">
            {ITEMS.map((it, i) => (
              <FaqItem key={it.q} q={it.q} a={it.a} panelId={`faq-panel-${i}`} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
