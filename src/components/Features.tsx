import type { ComponentType, ReactNode } from 'react';
import { motion, useReducedMotion, type Variants } from 'motion/react';
import { Smile, Brain, Database, Mail, Mic, Feather, Package, RefreshCw, Users, FileText, MessageCircle } from 'lucide-react';
import { Kicker, TitleBar } from './ui';
import { Reveal, StaggerGroup, StaggerItem } from './primitives';
import { useT } from '../i18n';

const EASE = [0.22, 1, 0.36, 1] as const;

type Feature = { Icon: ComponentType<{ className?: string }>; num: string; title: string; desc: ReactNode };

function buildFeatures(t: ReturnType<typeof useT>): Feature[] {
  return [
    {
      Icon: Smile,
      num: '01',
      title: 'VRM / Live2D / MMD',
      desc: t('VRM も Live2D も MMD(PMX)も身体にでき、本体と相方で混在も可能。許諾をいただいたキャラ2人を同梱し、DLした瞬間から動く。マウスを目で追い、まばたきし、髪が揺れ、撫でれば照れて、ウィンドウの縁に座る。MMD は .pmx を落とすだけで着替え、着たまま .vmd を落とすと踊る。台詞に合う仕草が無ければ、AI がその場で動きを書き起こす。手が空いているあいだも数十秒おきに小さく動くので、立ち尽くさない。', 'VRM, Live2D and MMD (PMX) all work as her body, and main and partner can mix. Two licensed characters ship in the box, so she moves the moment you install. She follows the cursor with her eyes, blinks, her hair sways, she blushes when petted, and she sits on window edges. For MMD, drop a .pmx to change and drop a .vmd while wearing it to dance. If no canned gesture fits the line, the AI writes the motion on the spot — and she keeps making small idle moves so she never stands frozen.', {
        'zh-CN': 'VRM、Live2D、MMD(PMX)都能成为身体,本体与搭档可混搭。随附两位获得授权的角色,装完即动。她会用目光追随鼠标、眨眼、发丝摇曳、被摸会害羞、还会坐在窗沿。MMD 丢入 .pmx 即换装,穿着时丢入 .vmd 就跳舞。没有合适的既定动作时,AI 会当场写出动作——空闲时也每隔几十秒小动一下,不会呆立。',
        'zh-TW': 'VRM、Live2D、MMD(PMX)都能成為身體,本體與搭檔可混搭。隨附兩位獲得授權的角色,裝完即動。她會用目光追隨滑鼠、眨眼、髮絲搖曳、被摸會害羞、還會坐在窗沿。MMD 丟入 .pmx 即換裝,穿著時丟入 .vmd 就跳舞。沒有合適的既定動作時,AI 會當場寫出動作——空閒時也每隔幾十秒小動一下,不會呆立。',
        ko: 'VRM도 Live2D도 MMD(PMX)도 몸이 되고, 본체와 파트너를 섞을 수도 있습니다. 허락받은 캐릭터 2명을 동봉해 설치 즉시 움직입니다. 마우스를 눈으로 좇고, 깜빡이고, 머리칼이 흔들리고, 쓰다듬으면 수줍어하고, 창 가장자리에 앉습니다. MMD는 .pmx를 떨어뜨리면 갈아입고, 입은 채 .vmd를 떨어뜨리면 춤춥니다. 대사에 맞는 몸짓이 없으면 AI가 그 자리에서 동작을 써냅니다 — 한가할 때도 수십 초마다 조금씩 움직여 우두커니 서 있지 않습니다.',
      }),
    },
    {
      Icon: Brain,
      num: '02',
      title: 'Local-First LLM',
      desc: t('頭脳はあなたのPCで動くローカルLLM。同梱エンジンならゼロ設定で、モデルはその PC に載る大きさが自動で選ばれる。Ollama・LM Studio があれば自動検出して繋がる。API費ゼロで24時間常駐、オフラインでも死なない。ここぞの相談だけクラウドAIへ——ハイブリッド構成。', 'The brain is a local LLM on your own PC. The bundled engine needs zero setup and picks a model sized for the machine; Ollama and LM Studio are auto-detected. Zero API cost, resident around the clock, alive even offline. Route only the big questions to a cloud AI — a hybrid setup.', {
        'zh-CN': '头脑是运行在你电脑上的本地 LLM。内置引擎零配置,自动选择适合这台机器的模型;Ollama、LM Studio 会被自动检测。API 费用为零、24 小时常驻、离线也不死。只把关键问题交给云端 AI——混合架构。',
        'zh-TW': '頭腦是運行在你電腦上的本地 LLM。內建引擎零設定,自動選擇適合這台機器的模型;Ollama、LM Studio 會被自動偵測。API 費用為零、24 小時常駐、離線也不死。只把關鍵問題交給雲端 AI——混合架構。',
        ko: '두뇌는 당신의 PC에서 도는 로컬 LLM. 내장 엔진은 제로 설정으로, 그 PC에 실리는 크기의 모델이 자동 선택됩니다. Ollama·LM Studio가 있으면 자동 감지해 연결. API 비용 0으로 24시간 상주하고 오프라인에서도 죽지 않습니다. 결정적인 상담만 클라우드 AI로 — 하이브리드 구성.',
      }),
    },
    {
      Icon: Database,
      num: '03',
      title: t('長期記憶と成長', 'Long-term memory & growth', { 'zh-CN': '长期记忆与成长', 'zh-TW': '長期記憶與成長', ko: '장기 기억과 성장' }),
      desc: t('会話をSQLiteに記憶し、関連する昔の話を検索でふっと思い出す。夜のあいだに整理して、夢を見る。その日にあったことと、そのとき言っていた気持ちは分けて残るので、翌日「昨日は疲れてたけど、今日は大丈夫?」と続きます。呼び方、好み、記念日——関係は数年かけて育ちます。なかよし度は会話数の合計ではなく、絆(数年)と気分(日々)の2層で動く生き物: 一日に育つ量には上限があり、深くなるほど一歩は重く、会わなければ距離ができ、雨や気まぐれで沈む日もある。数字は見せず、段と気配のことばだけを返します。ゴーストの魂は1つの memory.db。バックアップも引っ越しも自由。', 'Conversations live in SQLite, and related old moments resurface by search. She tidies memories overnight and dreams. What happened and how you felt are kept apart, so the next day continues with "you were tired yesterday — better now?". Names, tastes, anniversaries — the relationship takes years to grow. Affection is not a message count but a living thing on two layers, bond (years) and mood (days): only so much grows in a day, each step is heavier as you get closer, distance forms when you stay away, and rain or a passing mood can pull it down. No numbers are shown — only the stage and a feeling. A ghost\'s soul is one memory.db: back it up or move it freely.', {
        'zh-CN': '对话记进 SQLite,相关的往事会被检索唤起。夜里整理记忆,还会做梦。发生了什么和当时的心情分开保存,第二天会接着说「昨天挺累的,今天还好吗?」。称呼、喜好、纪念日——关系要花上数年才长成。好感度不是对话次数的累计,而是羁绊(数年)与心情(每日)双层的活物:一天能长的量有上限,越亲近每一步越重,不见面就会生疏,雨天或没来由的心情也会让它下沉。不显示数字——只回以阶段与气息。幽灵的灵魂就是一个 memory.db,备份和搬家都自由。',
        'zh-TW': '對話記進 SQLite,相關的往事會被檢索喚起。夜裡整理記憶,還會做夢。發生了什麼和當時的心情分開保存,第二天會接著說「昨天挺累的,今天還好嗎?」。稱呼、喜好、紀念日——關係要花上數年才長成。好感度不是對話次數的累計,而是羈絆(數年)與心情(每日)雙層的活物:一天能長的量有上限,越親近每一步越重,不見面就會生疏,雨天或沒來由的心情也會讓它下沉。不顯示數字——只回以階段與氣息。幽靈的靈魂就是一個 memory.db,備份和搬家都自由。',
        ko: '대화를 SQLite에 기억하고, 관련된 옛이야기를 검색으로 문득 떠올립니다. 밤사이 정리하고 꿈을 꿉니다. 그날 있었던 일과 그때의 기분은 나눠 남으므로, 다음 날 "어제는 피곤해했는데 오늘은 괜찮아?"로 이어집니다. 호칭, 취향, 기념일 — 관계는 몇 년에 걸쳐 자랍니다. 친밀도는 대화 수의 합계가 아니라 유대(몇 년)와 기분(나날)의 2층으로 움직이는 생물입니다: 하루에 자랄 양에는 상한이 있고, 깊어질수록 한 걸음이 무겁고, 만나지 않으면 거리가 생기고, 비나 변덕으로 가라앉는 날도 있습니다. 숫자는 보여 주지 않고 단계와 기색만 돌려줍니다. 고스트의 영혼은 memory.db 하나. 백업도 이사도 자유.',
      }),
    },
    {
      Icon: Mail,
      num: '04',
      title: t('AI秘書(MCP)', 'AI secretary (MCP)', { 'zh-CN': 'AI 秘书(MCP)', 'zh-TW': 'AI 秘書(MCP)', ko: 'AI 비서(MCP)' }),
      desc: t('Model Context Protocol で外部ツールと接続——もう動いています。Gmail・カレンダー・Drive(Google純正MCP)が載り、「メール来てるよ、1件は急ぎっぽい」と人格を通して届く。Google を使わない道もあって、POP 対応のメールなら見張れるし、自作スクリプトからの知らせも受け取れます(どちらも無料)。タスク預かり・定期チェック・きょうのブリーフィングまで、秘書として実運用中。', 'Connected to outside tools via the Model Context Protocol — already working. Gmail, Calendar and Drive (Google\'s own MCPs) arrive through her persona: "mail\'s in — one looks urgent." There is a non-Google road too: any POP mailbox can be watched, and your own scripts can send her notices (both free). Task keeping, periodic checks and the morning briefing run in real daily use.', {
        'zh-CN': '通过 Model Context Protocol 连接外部工具——已经在跑。Gmail、日历、Drive(Google 官方 MCP)经由人格送达:「来邮件了,有一封看着挺急」。也有不用 Google 的路:POP 邮箱都能盯,自写脚本的通知她也能收(都免费)。任务托管、定期检查、晨间简报,都在实际日常中运转。',
        'zh-TW': '透過 Model Context Protocol 連接外部工具——已經在跑。Gmail、日曆、Drive(Google 官方 MCP)經由人格送達:「來郵件了,有一封看著挺急」。也有不用 Google 的路:POP 郵箱都能盯,自寫腳本的通知她也能收(都免費)。任務託管、定期檢查、晨間簡報,都在實際日常中運轉。',
        ko: 'Model Context Protocol로 외부 도구와 연결 — 이미 돌아갑니다. Gmail·캘린더·Drive(Google 순정 MCP)가 실려 "메일 왔어요, 한 건은 급해 보여요"라고 인격을 통해 도착합니다. Google을 안 쓰는 길도 있어 POP 메일이면 감시할 수 있고, 자작 스크립트의 알림도 받습니다(둘 다 무료). 태스크 보관·정기 확인·아침 브리핑까지 비서로 실운용 중.',
      }),
    },
    {
      Icon: Mic,
      num: '05',
      title: t('全ローカル音声対話', 'Fully local voice', { 'zh-CN': '全本地语音对话', 'zh-TW': '全本地語音對話', ko: '완전 로컬 음성 대화' }),
      desc: t('日本語は VOICEVOX / AivisSpeech、英語・中国語は内蔵 Piper で完全ローカルに発話、モーラのリップシンク付き。マイクは呼びかけ起動の常時待機で、話の途中でも名前で呼べば声を止めて聞く。文単位の合成で3秒以内に声が返り、音声も会話も端末の外に出ません。', 'Japanese speaks via VOICEVOX / AivisSpeech, English and Chinese via the built-in Piper — fully local, with mora-level lip sync. The mic waits on a wake word, and calling her name mid-speech makes her stop and listen. Sentence-by-sentence synthesis answers within ~3 seconds, and neither audio nor conversation leaves the machine.', {
        'zh-CN': '日语用 VOICEVOX / AivisSpeech,英语、中文用内置 Piper——完全本地发声,带音拍级口型同步。麦克风以唤醒词待命,说话途中喊她名字她会停下来听。按句合成,约 3 秒内回话,语音和对话都不出设备。',
        'zh-TW': '日語用 VOICEVOX / AivisSpeech,英語、中文用內建 Piper——完全本地發聲,帶音拍級口型同步。麥克風以喚醒詞待命,說話途中喊她名字她會停下來聽。按句合成,約 3 秒內回話,語音和對話都不出裝置。',
        ko: '일본어는 VOICEVOX / AivisSpeech, 영어·중국어는 내장 Piper로 완전 로컬 발화, 모라 단위 립싱크 포함. 마이크는 호출어 대기이며, 말하는 도중이라도 이름을 부르면 소리를 멈추고 듣습니다. 문장 단위 합성으로 3초 이내에 목소리가 돌아오고, 음성도 대화도 기기 밖으로 나가지 않습니다.',
      }),
    },
    {
      Icon: Feather,
      num: '06',
      title: t('さくらスクリプト互換', 'Sakura Script compatible', { 'zh-CN': '相容 Sakura Script', 'zh-TW': '相容 Sakura Script', ko: '사쿠라 스크립트 호환' }),
      desc: (
        <>
          {t('旧作者の台本は書き直しゼロ——', 'Old authors\' scripts run with zero rewrites — pass ', { 'zh-CN': '老作者的台本零改写——把 ', 'zh-TW': '老作者的台本零改寫——把 ', ko: '옛 작자의 대본은 고쳐 쓰기 제로 — ' })}
          <span className="font-mono text-xs">\0\s[0]こんにちは。\e</span>
          {t(' を SSTP(port 9801)や /sakura に渡すと、話者切替と表情つきでそのまま演じる。文字コードは送り主に合わせるので当時の Shift_JIS も化けず、EXECUTE の GetName / GetVersion にも応答する。', ' to SSTP (port 9801) or /sakura and she performs it, speaker switches and expressions included. Encoding follows the sender, so period Shift_JIS survives, and EXECUTE GetName / GetVersion get answers.', {
            'zh-CN': ' 交给 SSTP(端口 9801)或 /sakura,她就带着说话人切换和表情照演。编码跟随发送方,当年的 Shift_JIS 也不乱码,EXECUTE 的 GetName / GetVersion 也有应答。',
            'zh-TW': ' 交給 SSTP(埠 9801)或 /sakura,她就帶著說話人切換和表情照演。編碼跟隨傳送方,當年的 Shift_JIS 也不亂碼,EXECUTE 的 GetName / GetVersion 也有應答。',
            ko: '를 SSTP(포트 9801)나 /sakura에 넘기면 화자 전환과 표정까지 그대로 연기합니다. 문자 코드는 보낸 쪽을 따르므로 당시의 Shift_JIS도 깨지지 않고, EXECUTE의 GetName / GetVersion에도 응답합니다.',
          })}
        </>
      ),
    },
    {
      Icon: Package,
      num: '07',
      title: t('キャラ資産の持ち込みと受け渡し', 'Bring & pass on character assets', { 'zh-CN': '角色资产的带入与传递', 'zh-TW': '角色資產的帶入與傳遞', ko: '캐릭터 자산의 반입과 전달' }),
      desc: t('SillyTavern のキャラクターカード(V2/V3)は PNG のままドロップで人格になり、絵はそのまま身体になる。2000年から続く伺かのシェルも surfaces.txt どおりに瞬いて口が動く。作った子は .mirika ひとつで受け渡せて、配る側には雛形から検証までの道具が付く。', 'SillyTavern character cards (V2/V3) become a persona by dropping the PNG as-is, the artwork becoming her body. Ukagaka shells from 2000 onward blink and lip-sync per surfaces.txt. A ghost you made passes on as one .mirika file, and makers get tools from scaffolding to validation.', {
        'zh-CN': 'SillyTavern 角色卡(V2/V3)PNG 直接拖入即成人格,立绘直接成为身体。2000 年以来的伺か外壳也按 surfaces.txt 眨眼、对口型。做好的孩子用一个 .mirika 就能转交,分发方还有从模板到校验的全套工具。',
        'zh-TW': 'SillyTavern 角色卡(V2/V3)PNG 直接拖入即成人格,立繪直接成為身體。2000 年以來的伺か外殼也按 surfaces.txt 眨眼、對口型。做好的孩子用一個 .mirika 就能轉交,分發方還有從模板到校驗的全套工具。',
        ko: 'SillyTavern 캐릭터 카드(V2/V3)는 PNG 그대로 드롭하면 인격이 되고, 그림은 그대로 몸이 됩니다. 2000년부터 이어진 우카가카 셸도 surfaces.txt대로 깜빡이고 입이 움직입니다. 만든 아이는 .mirika 하나로 건네줄 수 있고, 배포하는 쪽에는 템플릿부터 검증까지의 도구가 딸립니다.',
      }),
    },
    {
      Icon: RefreshCw,
      num: '08',
      title: t('どのマシンにも、同じ子', 'The same ghost on every machine', { 'zh-CN': '每台机器上,都是同一个她', 'zh-TW': '每台機器上,都是同一個她', ko: '어느 머신에도, 같은 아이' }),
      desc: t('記憶も名前・性格も、暗号化した1ファイルで端末間を同期。置き場は自分のクラウドの同期フォルダ(無料)でも、こちらが預かる棚(Pro)でも。鍵は端末から出ず、取り込みは突き合わせ——どちらかにしかない会話も消えない。同期そのものは無料で、有料なのは置き場を用意するぶんだけ。', 'Memory, name and persona sync between machines as one encrypted file. The home can be your own cloud-synced folder (free) or a shelf we host (Pro). Keys never leave the device, and import is a merge — conversations that exist on only one side survive. Sync itself is free; you pay only if we provide the storage.', {
        'zh-CN': '记忆、名字、性格,以一个加密文件在设备间同步。存放处可以是你自己的云同步文件夹(免费),也可以是我们代管的架子(Pro)。密钥不出设备,导入是合并——只存在于一边的对话也不会消失。同步本身免费,收费的只是我们提供存放处的部分。',
        'zh-TW': '記憶、名字、性格,以一個加密檔案在裝置間同步。存放處可以是你自己的雲同步資料夾(免費),也可以是我們代管的架子(Pro)。金鑰不出裝置,匯入是合併——只存在於一邊的對話也不會消失。同步本身免費,收費的只是我們提供存放處的部分。',
        ko: '기억도 이름·성격도 암호화된 1파일로 기기 간 동기화. 보관처는 자신의 클라우드 동기화 폴더(무료)든, 저희가 맡아 두는 선반(Pro)이든. 키는 기기에서 나가지 않고, 가져오기는 맞대기 — 한쪽에만 있는 대화도 사라지지 않습니다. 동기화 자체는 무료, 유료는 보관처를 저희가 마련하는 몫뿐.',
      }),
    },
    {
      Icon: Users,
      num: '09',
      title: t('デスクトップに社会を', 'A society on the desktop', { 'zh-CN': '在桌面上造一个小社会', 'zh-TW': '在桌面上造一個小社會', ko: '데스크톱에 사회를' }),
      desc: t('SSTP コミュニケートで、同じデスクトップの他のゴースト(SSP など)と直接会話。Pro では別プロファイルの子をもう一体立てて、隣に並んで話し合う。歌(VOICEVOX 歌唱)とお絵かきも。配信では二つの立ち方があって、この子が番組を持つことも、あなたの配信の隣でコメントを読む相棒になることもできます(Pro)。', 'Via SSTP communicate she talks directly with other ghosts on the same desktop (SSP and friends). Pro stands up a second ghost with its own profile to chat side by side. She sings (VOICEVOX song synthesis) and draws. Streaming has two stances: she hosts her own show, or she sits beside yours reading comments (Pro).', {
        'zh-CN': '通过 SSTP communicate,与同一桌面上的其他幽灵(SSP 等)直接对话。Pro 可以再立一位不同档案的孩子,并排聊天。还会唱歌(VOICEVOX 歌唱)和画画。直播有两种站位:她自己开节目,或坐在你的直播旁读评论(Pro)。',
        'zh-TW': '透過 SSTP communicate,與同一桌面上的其他幽靈(SSP 等)直接對話。Pro 可以再立一位不同檔案的孩子,並排聊天。還會唱歌(VOICEVOX 歌唱)和畫畫。直播有兩種站位:她自己開節目,或坐在你的直播旁讀評論(Pro)。',
        ko: 'SSTP 커뮤니케이트로 같은 데스크톱의 다른 고스트(SSP 등)와 직접 대화. Pro에서는 다른 프로필의 아이를 한 명 더 세워 나란히 이야기합니다. 노래(VOICEVOX 가창)와 그림도. 방송은 두 가지 — 직접 진행하거나, 당신의 방송 옆에서 댓글을 읽는 파트너가 되거나(Pro).',
      }),
    },
    {
      Icon: FileText,
      num: '10',
      title: t('渡した書類を、そのまま読む', 'Hand her a document — she reads it', { 'zh-CN': '递过去的文件,直接读', 'zh-TW': '遞過去的檔案,直接讀', ko: '건넨 서류를, 그대로 읽는다' }),
      desc: t('テキスト・Markdown・PDF・Word・Excel・PowerPoint・画像を窓に落とすだけ。変換も貼り付けもいりません。契約書の条文も、見積の品目も、スライドの流れも、そのまま話の前提になる。画面をそのまま見せることもできて(既定オフ)、エラーの画面を撮って「これ何?」と聞ける。文字コードは中身から見分けるので、Shift_JIS のままの古いテキストも化けません。読んだものは端末から出ません。', 'Drop text, Markdown, PDF, Word, Excel, PowerPoint or images onto the window — no converting, no pasting. Contract clauses, quote line-items, slide flow become part of the conversation as-is. You can also show her the screen (off by default) and ask "what is this?" about an error. Encoding is sniffed from the bytes, so old Shift_JIS text survives. Nothing she reads leaves the machine.', {
        'zh-CN': '文本、Markdown、PDF、Word、Excel、PowerPoint、图片,丢到窗口上就行。不用转换,不用粘贴。合同条款、报价品目、幻灯片脉络,原样成为谈话前提。也能直接给她看屏幕(默认关),抓个报错问「这是啥?」。编码从内容判断,老的 Shift_JIS 文本也不乱码。读过的东西不出设备。',
        'zh-TW': '文字、Markdown、PDF、Word、Excel、PowerPoint、圖片,丟到視窗上就行。不用轉換,不用貼上。合約條款、報價品目、簡報脈絡,原樣成為談話前提。也能直接給她看螢幕(預設關),抓個報錯問「這是啥?」。編碼從內容判斷,老的 Shift_JIS 文字也不亂碼。讀過的東西不出裝置。',
        ko: '텍스트·Markdown·PDF·Word·Excel·PowerPoint·이미지를 창에 떨어뜨리기만. 변환도 붙여넣기도 필요 없습니다. 계약서 조문도, 견적 품목도, 슬라이드 흐름도 그대로 이야기의 전제가 됩니다. 화면을 그대로 보여 줄 수도 있고(기본 꺼짐), 에러 화면을 찍어 "이거 뭐야?"라고 물을 수 있습니다. 문자 코드는 내용으로 가려내므로 Shift_JIS 그대로인 옛 텍스트도 깨지지 않습니다. 읽은 것은 기기 밖으로 나가지 않습니다.',
      }),
    },
    {
      Icon: MessageCircle,
      num: '11',
      title: t('Discord でも使える', 'Mirika on Discord', { 'zh-CN': '在 Discord 上也能用', 'zh-TW': '在 Discord 上也能用', ko: 'Discord에서도 사용' }),
      desc: t('Discord にもいます。公式サーバーでも、自分のサーバーでも(Pro)、個人インストールなら DM でも。/talk は使い方の質問に公式ドキュメントを根拠に出典付きで答え、/todo はデスクトップと双方向同期して期限を DM に3段階で知らせる。ボイスチャンネルの読み上げは VOICEVOX 全136声、「ミリカ」と呼びかければ声で返す(音声は文字にした瞬間に捨てる)。キーを /verify で見せれば、ロールもサーバー解放も1回で済む。', 'She lives on Discord too — the official server, your own server (Pro), even DMs with a user install. /talk answers how-to questions from the official docs with sources, /todo stays in two-way sync with the desktop and pings deadlines to your DMs in three stages. Voice channels are read aloud in 136 VOICEVOX voices, and calling "Mirika" gets a spoken answer (audio is discarded the moment it becomes text). Show your key once with /verify — role and server unlock in one go.', {
        'zh-CN': '她也在 Discord 上——官方服务器、你自己的服务器(Pro)、个人安装的话连私信里也行。/talk 会以官方文档为依据、附来源回答用法问题;/todo 与桌面版双向同步,期限分三档提醒到私信。语音频道用 VOICEVOX 全 136 种声音朗读,喊一声「Mirika」就会用声音回答(音频在转成文字的那一刻即被丢弃)。用 /verify 出示一次密钥,身份组和服务器开通一次完成。',
        'zh-TW': '她也在 Discord 上——官方伺服器、你自己的伺服器(Pro)、個人安裝的話連私訊裡也行。/talk 會以官方文件為依據、附來源回答用法問題;/todo 與桌面版雙向同步,期限分三階段提醒到私訊。語音頻道用 VOICEVOX 全 136 種聲音朗讀,喊一聲「Mirika」就會用聲音回答(音訊在轉成文字的那一刻即被丟棄)。用 /verify 出示一次金鑰,身分組和伺服器開通一次完成。',
        ko: 'Discord에도 있습니다 — 공식 서버에서도, 내 서버에서도(Pro), 개인 설치라면 DM에서도. /talk은 사용법 질문에 공식 문서를 근거로 출처와 함께 답하고, /todo는 데스크톱과 양방향 동기화되어 마감을 DM으로 3단계 알림. 음성 채널은 VOICEVOX 전 136 보이스로 낭독하고, "미리카"라고 부르면 목소리로 답합니다(음성은 텍스트가 되는 순간 폐기). /verify로 키를 한 번 보여 주면 롤도 서버 개방도 한 번에 끝.',
      }),
    },
  ];
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/* 3列に割り切れないとき、最後の1枚を残りの幅いっぱいに伸ばす。
   枚数が増減しても空きマスが L 字に残らない */
const SPAN_CLASS = ['', 'md:col-span-2', 'md:col-span-3'] as const;

function lastSpan(count: number): string {
  return SPAN_CLASS[(3 - (count % 3)) % 3] ?? '';
}

function FeatureCard({ Icon, num, title, desc, span }: Feature & { span?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      variants={cardVariants}
      whileHover={reduce ? undefined : { scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={`relative border-r-2 border-b-2 border-white/10 p-8 bg-paper text-ink transition-colors hover:z-10 hover:bg-white/[0.05] hover:shadow-[0_0_40px_rgba(255,107,143,0.12)] ${span ?? ''}`}
    >
      <div className="flex items-center justify-between mb-6">
        <Icon className="w-6 h-6 text-sakura" />
        <span className="font-mono text-xs text-sub">{num}</span>
      </div>
      <h3 className="font-mincho font-bold text-xl mb-3">{title}</h3>
      <p className="text-sub text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
}

/* 「さらに、その先へ。」拡張機能グリッド */
type ExtRow = { label: string; desc: string; phase: string; done: boolean };

function buildExtRows(t: ReturnType<typeof useT>): ExtRow[] {
  const R = (ja: string, en: string, zhCN: string, zhTW: string, ko: string) =>
    t(ja, en, { 'zh-CN': zhCN, 'zh-TW': zhTW, ko });
  return [
    { label: R('思い出話と忘却', 'Reminiscence & forgetting', '回忆与遗忘', '回憶與遺忘', '추억담과 망각'), desc: R('記憶は沈み、たまに発掘される。「そういえば1年前……」', 'Memories sink, and sometimes resurface: "a year ago today…"', '记忆会沉底,偶尔被挖出:「说来一年前……」', '記憶會沉底,偶爾被挖出:「說來一年前……」', '기억은 가라앉고, 가끔 발굴됩니다. "그러고 보니 1년 전…"'), phase: 'P2', done: true },
    { label: R('事実と気持ちを分けて残す', 'Facts apart from feelings', '事实与心情分开保存', '事實與心情分開保存', '사실과 감정을 나눠 남김'), desc: R('何をしたかと、そのとき何を感じていたかは別もの。翌日「昨日は疲れてたけど、今日は大丈夫?」と続く', 'What happened and how it felt are different things — next day: "tired yesterday, better now?"', '做了什么与当时的感受是两回事。第二天接着问「昨天挺累的,今天还好吗?」', '做了什麼與當時的感受是兩回事。第二天接著問「昨天挺累的,今天還好嗎?」', '무엇을 했는지와 그때 무엇을 느꼈는지는 별개. 다음 날 "어제 피곤해했는데 오늘은 괜찮아?"로 이어짐'), phase: 'P6', done: true },
    { label: R('思い出を、仕事と同じ重さで', 'Memories weigh like work', '回忆与工作同等重量', '回憶與工作同等重量', '추억을 일과 같은 무게로'), desc: R('「友達のプロポーズがうまくいった」「絵を見て笑った」——用事ではない出来事こそ、覚えておく', 'The proposal that went well, the picture that made you laugh — the un-businesslike moments are kept too', '「朋友求婚成功了」「看画笑了」——不是正事的事,更要记住', '「朋友求婚成功了」「看畫笑了」——不是正事的事,更要記住', '"친구의 프러포즈가 잘됐다" "그림을 보고 웃었다" — 용건이 아닌 일일수록 기억해 둔다'), phase: 'P6', done: true },
    { label: R('季節と行事の演出', 'Seasons & occasions', '季节与节日演出', '季節與節日演出', '계절과 행사 연출'), desc: R('桜が舞い、雪が降り、誕生日には紙吹雪', 'Cherry petals, snowfall, and confetti on your birthday', '樱花飞舞、落雪,生日有彩纸', '櫻花飛舞、落雪,生日有彩紙', '벚꽃이 흩날리고, 눈이 내리고, 생일엔 색종이'), phase: 'P2', done: true },
    { label: R('スクリーン理解', 'Screen understanding', '屏幕理解', '螢幕理解', '스크린 이해'), desc: R('ローカルVLMが画面を見て「エラー出てるよ」。既定オフ・端末外送信なし', 'A local VLM looks at the screen: "there\'s an error." Off by default, nothing leaves the device', '本地 VLM 看屏幕:「报错了哦」。默认关、不外发', '本地 VLM 看螢幕:「報錯了哦」。預設關、不外傳', '로컬 VLM이 화면을 보고 "에러 났어요". 기본 꺼짐·기기 밖 전송 없음'), phase: 'P4', done: true },
    { label: R('クリップボード反応', 'Clipboard reactions', '剪贴板反应', '剪貼簿反應', '클립보드 반응'), desc: R('エラーをコピーした瞬間「それ、調べようか?」(オプトイン)', 'Copy an error and she offers: "want me to look into that?" (opt-in)', '复制报错的瞬间:「要我查查吗?」(可选)', '複製報錯的瞬間:「要我查查嗎?」(可選)', '에러를 복사한 순간 "그거 알아볼까요?"(옵트인)'), phase: 'P4', done: true },
    { label: R('ローカルRAG', 'Local RAG', '本地 RAG', '本地 RAG', '로컬 RAG'), desc: R('自分のメモ・文書に詳しくなる。「先週のメモどこだっけ」に端末内で回答', 'She learns your notes and docs, answering "where was last week\'s memo" on-device', '熟悉你的笔记与文档。「上周的备忘在哪」在本机作答', '熟悉你的筆記與文件。「上週的備忘在哪」在本機作答', '내 메모·문서에 밝아집니다. "지난주 메모 어디였지"에 기기 안에서 답함'), phase: 'P4', done: true },
    { label: R('ブラウザ連携', 'Browser link', '浏览器联动', '瀏覽器連動', '브라우저 연동'), desc: R('拡張機能で見ているページを把握・要約(オプトイン)', 'A browser extension shares and summarises the page you are on (opt-in)', '用扩展了解并总结你在看的页面(可选)', '用擴充功能了解並總結你在看的頁面(可選)', '확장 프로그램으로 보고 있는 페이지를 파악·요약(옵트인)'), phase: 'P4', done: true },
    { label: R('自発的な興味', 'Curiosity of her own', '自发的兴趣', '自發的興趣', '자발적인 관심'), desc: R('話題を覚えて後日調べ、自分から話を振ってくる', 'She remembers a topic, looks it up later, and brings it back up herself', '记住话题、日后查证,主动来聊', '記住話題、日後查證,主動來聊', '화제를 기억해 나중에 알아보고, 먼저 말을 걸어옴'), phase: 'P4', done: true },
    { label: R('Live2Dシェル', 'Live2D shell', 'Live2D 外壳', 'Live2D 外殼', 'Live2D 셸'), desc: R('Cubism対応。本体・相方でVRMと混在でき、桃瀬ひより/Mao同梱', 'Cubism support; mixes with VRM across main and partner. Hiyori / Mao bundled', '支持 Cubism。本体与搭档可和 VRM 混搭,附带桃瀬ひより/Mao', '支援 Cubism。本體與搭檔可和 VRM 混搭,附帶桃瀨日和/Mao', 'Cubism 대응. 본체·파트너에서 VRM과 혼재 가능, 히요리/Mao 동봉'), phase: 'P5', done: true },
    { label: R('OBS配信モード', 'OBS streaming mode', 'OBS 直播模式', 'OBS 直播模式', 'OBS 방송 모드'), desc: R('グリーンバック表示でゴーストをそのまま配信画面へ(Pro)', 'Green-screen mode puts the ghost straight into your stream (Pro)', '绿幕显示,把幽灵直接放进直播画面(Pro)', '綠幕顯示,把幽靈直接放進直播畫面(Pro)', '그린 스크린 표시로 고스트를 그대로 방송 화면에(Pro)'), phase: 'P5', done: true },
    { label: R('配信を手伝う', 'Assist your stream', '帮你的直播', '幫你的直播', '방송을 도움'), desc: R('あなたが主役の配信で、コメントを読み、呼ばれたときだけ返す相棒に(Pro)', 'On your stream she reads comments and speaks only when called (Pro)', '你当主角的直播里,她读评论、被点名才接话(Pro)', '你當主角的直播裡,她讀評論、被點名才接話(Pro)', '당신이 주역인 방송에서 댓글을 읽고, 불릴 때만 답하는 파트너(Pro)'), phase: 'P7', done: true },
    { label: R('コメントビューア連携', 'Comment viewer link', '评论查看器联动', '評論檢視器連動', '댓글 뷰어 연동'), desc: R('わんコメ等の「棒読みちゃん連携」を向けるだけ。配信サイトは問わない(Pro)', 'Point OneComme\'s Bouyomi output at her — any streaming site (Pro)', '把 OneComme 等的「棒読みちゃん」输出指向她即可,平台不限(Pro)', '把 OneComme 等的「棒読みちゃん」輸出指向她即可,平台不限(Pro)', 'OneComme 등의 "보우요미" 연동을 향하게만 하면 됨. 플랫폼 불문(Pro)'), phase: 'P7', done: true },
    { label: R('OBS の遠隔操作', 'OBS remote control', 'OBS 远程操作', 'OBS 遠端操作', 'OBS 원격 조작'), desc: R('「配信の準備して」で配信を開始し、告知文の下書きまで(投稿はご自分で・Pro)', '"Get the stream ready" starts OBS and drafts the announcement (you post it yourself; Pro)', '一句「准备直播」就开播,还起草预告(发布由你;Pro)', '一句「準備直播」就開播,還起草預告(發布由你;Pro)', '"방송 준비해 줘"로 방송을 시작하고 공지 초안까지(게시는 직접·Pro)'), phase: 'P7', done: true },
    { label: R('メールの見張り(POP)', 'Mail watch (POP)', '盯邮件(POP)', '盯郵件(POP)', '메일 감시(POP)'), desc: R('Google 連携なしでも新着に気づく。読むのは差出人と件名だけ', 'New-mail alerts without Google — she reads only sender and subject', '不接 Google 也能发现新邮件。只读发件人和主题', '不接 Google 也能發現新郵件。只讀寄件人和主旨', 'Google 연동 없이도 새 메일을 알아챔. 읽는 건 보낸이와 제목뿐'), phase: 'P4', done: true },
    { label: R('外からの知らせ', 'Outside notices', '来自外部的通知', '來自外部的通知', '외부에서 온 알림'), desc: R('自作スクリプトや他のアプリの通知を、この子の口から', 'Your scripts\' and other apps\' notifications, spoken by her', '自写脚本或其他应用的通知,由她说出口', '自寫腳本或其他應用的通知,由她說出口', '자작 스크립트나 다른 앱의 알림을, 이 아이의 입으로'), phase: 'P4', done: true },
    { label: R('別の画面に住む', 'Living on another screen', '住进别的屏幕', '住進別的螢幕', '다른 화면에 살기'), desc: R('余ったタブレットをこの子の身体に(合言葉つきで受け入れ)', 'A spare tablet becomes her body (passphrase-gated)', '闲置平板成为她的身体(需口令接入)', '閒置平板成為她的身體(需口令接入)', '남는 태블릿을 이 아이의 몸으로(암호 필요)'), phase: 'P7', done: false },
    { label: R('動作ログ', 'Runtime logs', '运行日志', '運行日誌', '동작 로그'), desc: R('不具合の報告に添えられる記録。秘密は伏せ字・7日分', 'Attachable records for bug reports; secrets masked, 7 days kept', '可随缺陷报告附上的记录。秘密打码、留 7 天', '可隨缺陷報告附上的記錄。秘密打碼、留 7 天', '버그 신고에 첨부할 수 있는 기록. 비밀은 마스킹·7일분'), phase: 'P5', done: true },
    { label: R('デバイス間同期', 'Cross-device sync', '设备间同步', '裝置間同步', '기기 간 동기화'), desc: R('記憶も名前・性格もE2E暗号化で同期——どのマシンにも同じ子がいる(無料。置き場を預かるぶんが Pro)', 'Memory, name and persona sync E2E-encrypted — the same ghost on every machine (free; hosted storage is Pro)', '记忆、名字、性格 E2E 加密同步——每台机器都是同一个她(免费;托管存放处为 Pro)', '記憶、名字、性格 E2E 加密同步——每台機器都是同一個她(免費;託管存放處為 Pro)', '기억도 이름·성격도 E2E 암호화로 동기화 — 어느 머신에도 같은 아이(무료. 보관을 맡기는 몫이 Pro)'), phase: 'P6', done: true },
    { label: R('人格回帰テスト', 'Persona regression test', '人格回归测试', '人格回歸測試', '인격 회귀 테스트'), desc: R('ゴールデン対話集で「この子らしさ」をCI検証(mirika-test。SDK zip に同梱)', 'Golden dialogues verify "her-ness" in CI (mirika-test, in the SDK zip)', '用黄金对话集在 CI 里校验「她的样子」(mirika-test,SDK zip 内)', '用黃金對話集在 CI 裡校驗「她的樣子」(mirika-test,SDK zip 內)', '골든 대화집으로 "이 아이다움"을 CI 검증(mirika-test. SDK zip 동봉)'), phase: 'P6', done: true },
    { label: R('クラシックシェル', 'Classic shells', '经典外壳', '經典外殼', '클래식 셸'), desc: R('旧伺かのサーフェスPNGシェルも、見た目ごとそのまま動く', 'Old Ukagaka surface-PNG shells run exactly as they looked', '旧伺か的 surface PNG 外壳,原样运作', '舊伺か的 surface PNG 外殼,原樣運作', '옛 우카가카의 서피스 PNG 셸도 그 모습 그대로 움직임'), phase: 'P6', done: true },
    { label: R('MMDシェル', 'MMD shell', 'MMD 外壳', 'MMD 外殼', 'MMD 셸'), desc: R('PMX がそのまま身体に(本体・相方とも)。VMD を落とすと踊り、トゥーンと照りも出る', 'PMX becomes her body (main and partner). Drop a VMD and she dances, toon shading and sheen included', 'PMX 直接成为身体(本体、搭档均可)。丢入 VMD 就跳舞,还有卡通着色与光泽', 'PMX 直接成為身體(本體、搭檔均可)。丟入 VMD 就跳舞,還有卡通著色與光澤', 'PMX가 그대로 몸으로(본체·파트너 모두). VMD를 떨어뜨리면 춤추고, 툰과 광택도 나옴'), phase: 'P7', done: true },
    { label: R('歌とお絵かき', 'Singing & drawing', '唱歌与画画', '唱歌與畫畫', '노래와 그림'), desc: R('歌唱合成で誕生日に歌い、ローカル画像生成で絵を見せてくれる', 'Song synthesis for your birthday, local image generation for little drawings', '用歌唱合成在生日唱歌,用本地图像生成给你看画', '用歌唱合成在生日唱歌,用本地圖像生成給你看畫', '가창 합성으로 생일에 노래하고, 로컬 이미지 생성으로 그림을 보여 줌'), phase: 'P7', done: true },
    { label: R('デスクトップ操作', 'Desktop control', '桌面操作', '桌面操作', '데스크톱 조작'), desc: R('提案→確認→実行の提案型に限定して、0.8 で慎重に導入', 'Propose → confirm → act only; arriving carefully in 0.8', '仅限「提议→确认→执行」,0.8 谨慎引入', '僅限「提議→確認→執行」,0.8 謹慎引入', '제안→확인→실행의 제안형에 한정, 0.8에서 신중히 도입'), phase: 'P7', done: false },
    { label: R('組織で使う', 'For organizations', '组织使用', '組織使用', '조직에서 사용'), desc: R('管理者が席と方針をまとめて決められる。結ぶのはライセンスと方針だけで、会話は端末から出ない', 'Admins set seats and policy centrally; only license and policy connect — conversations never leave the device', '管理员统一决定席位与方针。只连接许可与方针,对话不出设备', '管理員統一決定席位與方針。只連接授權與方針,對話不出裝置', '관리자가 좌석과 방침을 한꺼번에 정함. 연결은 라이선스와 방침뿐, 대화는 기기에서 안 나감'), phase: 'P8', done: true },
  ];
}

export function Features() {
  const t = useT();
  const FEATURES = buildFeatures(t);
  const EXT_ROWS = buildExtRows(t);
  return (
    <section id="features" className="border-t border-cream/10 bg-black/20 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <Reveal className="mb-14">
          <Kicker index="02" label="Features" />
          <h2 className="font-mincho font-bold text-3xl md:text-4xl">
            {t('「生きている」を、つくる。', 'Building "alive."', { 'zh-CN': '把「活着」做出来。', 'zh-TW': '把「活著」做出來。', ko: '"살아 있음"을, 만든다.' })}
          </h2>
        </Reveal>

        {/* 実際の画面。説明より先に、何が机の上に来るのかを見せる */}
        <Reveal className="mb-16 grid lg:grid-cols-[1.35fr_1fr] gap-6 items-start">
          <figure className="os-window overflow-hidden">
            <TitleBar>
              <span>
                {t('desktop — 本体と相方の掛け合い', 'desktop — the two of them mid-banter', { 'zh-CN': 'desktop — 本体与搭档的对谈', 'zh-TW': 'desktop — 本體與搭檔的對談', ko: 'desktop — 본체와 파트너의 주고받기' })}
              </span>
              <span className="text-sub tracking-widest">— □ ×</span>
            </TitleBar>
            <img
              src="/shots/duo-talk.webp"
              alt={t('デスクトップで掛け合う二人。吹き出しに返事の選択肢が並ぶ', 'Two ghosts bantering on the desktop, reply choices in the balloon', { 'zh-CN': '桌面上对谈的两人,气泡里排着回复选项', 'zh-TW': '桌面上對談的兩人,氣泡裡排著回覆選項', ko: '데스크톱에서 주고받는 두 사람, 말풍선에 답변 선택지' })}
              className="block w-full h-auto bg-[#0b0912]"
              loading="lazy"
            />
            <figcaption className="px-5 py-3 text-xs text-sub border-t border-cream/10">
              {t('二人が実際に掛け合っている画面。返事は選択肢からも選べます(伺かの流儀)。背景は透過で、窓の縁に座り、掴んで動かせます', 'A real screen of the two mid-banter. Replies can be picked from choices (the Ukagaka way). The background is transparent; she sits on window edges and can be dragged around.', { 'zh-CN': '两人实际对谈的画面。回复也能从选项里选(伺か的做派)。背景透明,能坐在窗沿、能拖着走', 'zh-TW': '兩人實際對談的畫面。回覆也能從選項裡選(伺か的做派)。背景透明,能坐在窗沿、能拖著走', ko: '두 사람이 실제로 주고받는 화면. 답변은 선택지에서도 고를 수 있습니다(우카가카 방식). 배경은 투명하고, 창 가장자리에 앉으며, 잡아서 옮길 수 있습니다' })}
            </figcaption>
          </figure>
          <figure className="os-window overflow-hidden">
            <TitleBar>
              <span>{t('settings — 詳細設定', 'settings — advanced settings', { 'zh-CN': 'settings — 详细设置', 'zh-TW': 'settings — 詳細設定', ko: 'settings — 상세 설정' })}</span>
              <span className="text-sub tracking-widest">— □ ×</span>
            </TitleBar>
            <img
              src="/shots/settings.png"
              alt={t('詳細設定の画面。頭脳・表示とふるまい・声の設定', 'Advanced settings: brain, appearance & behavior, voice', { 'zh-CN': '详细设置画面:头脑、显示与行为、声音', 'zh-TW': '詳細設定畫面:頭腦、顯示與行為、聲音', ko: '상세 설정 화면: 두뇌·표시와 행동·목소리' })}
              className="block w-full h-auto bg-[#0b0912]"
              loading="lazy"
            />
            <figcaption className="px-5 py-3 text-xs text-sub border-t border-cream/10">
              {t('コマンドを覚えなくても、ひととおりここで決められます', 'No commands to memorise — everything can be set here', { 'zh-CN': '不用背命令,基本都能在这里设置', 'zh-TW': '不用背指令,基本都能在這裡設定', ko: '커맨드를 외우지 않아도, 웬만한 건 여기서 정할 수 있습니다' })}
            </figcaption>
          </figure>
        </Reveal>

        <StaggerGroup className="grid md:grid-cols-3 border-t-2 border-l-2 border-white/10 shadow-[0_0_48px_rgba(255,107,143,0.08)]">
          {FEATURES.map((f, i) => (
            <FeatureCard
              key={f.num}
              {...f}
              span={i === FEATURES.length - 1 ? lastSpan(FEATURES.length) : ''}
            />
          ))}
        </StaggerGroup>

        {/* 拡張機能一覧 */}
        <div className="mt-16">
          <Reveal>
            <h3 className="font-mincho font-bold text-xl md:text-2xl mb-2">
              {t('さらに、', 'And then, ', { 'zh-CN': '然后,', 'zh-TW': '然後,', ko: '그리고, ' })}
              <span className="text-sakura">{t('その先へ。', 'beyond.', { 'zh-CN': '走向更远。', 'zh-TW': '走向更遠。', ko: '그 너머로.' })}</span>
            </h3>
            <p className="text-mist text-sm leading-relaxed mb-8">
              <span className="text-sakura font-semibold">✓</span>{' '}
              {t('は実装済み、', 'means shipped, ', { 'zh-CN': '为已实现,', 'zh-TW': '為已實現,', ko: '는 구현 완료, ' })}
              <span className="text-mist/50">{t('予定', 'planned', { 'zh-CN': '计划中', 'zh-TW': '計畫中', ko: '예정' })}</span>{' '}
              {t('はこれから。上段が実装済みの拡張機能です(P = Phase)。', 'is upcoming. (P = phase.)', { 'zh-CN': '为待做。(P = Phase)', 'zh-TW': '為待做。(P = Phase)', ko: '은 앞으로. (P = Phase)' })}
            </p>
          </Reveal>
          <StaggerGroup className="grid md:grid-cols-2 gap-x-12 border-t border-cream/10" amount={0.05}>
            {EXT_ROWS.map((row) => (
              <StaggerItem
                key={row.label}
                className="flex items-baseline gap-4 py-3.5 border-b border-cream/10"
              >
                <span className={`font-mono text-xs w-32 shrink-0 ${row.done ? 'text-sakura' : 'text-mist/70'}`}>
                  {row.label}
                </span>
                <span className={`text-sm flex-1 ${row.done ? 'text-mist' : 'text-mist/60'}`}>{row.desc}</span>
                <span className="font-mono text-[10px] shrink-0 whitespace-nowrap">
                  {row.done ? <span className="text-sakura">✓</span> : <span className="text-mist/40">{t('予定', 'planned', { 'zh-CN': '计划', 'zh-TW': '計畫', ko: '예정' })}</span>}{' '}
                  <span className="text-mist/50">{row.phase}</span>
                </span>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
