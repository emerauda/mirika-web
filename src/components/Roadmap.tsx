import { Section } from './ui';
import { StaggerGroup, StaggerItem } from './primitives';
import { t5, useT } from '../i18n';

type Status = 'done' | 'next' | 'none';
type Phase = { label: string; status: Status; title: string; desc: string };

function buildPhases(t: ReturnType<typeof useT>): Phase[] {
  const T = t5(t);
  return [
    {
      label: 'Phase 0',
      status: 'done',
      title: T('技術検証', 'Proof of tech', '技术验证', '技術驗證', '기술 검증'),
      desc: T('透過ウィンドウ+VRM表示+クリックスルー+ドラッグ移動——Windows ネイティブで確認済み。', 'Transparent window + VRM rendering + click-through + drag — verified natively on Windows.', '透明窗口+VRM 显示+点击穿透+拖拽移动——已在 Windows 原生环境验证。', '透明視窗+VRM 顯示+點擊穿透+拖曳移動——已在 Windows 原生環境驗證。', '투명 창+VRM 표시+클릭 스루+드래그 이동 — Windows 네이티브로 확인 완료.'),
    },
    {
      label: 'Phase 1',
      status: 'done',
      title: T('MVP: 会話', 'MVP: conversation', 'MVP:对话', 'MVP:對話', 'MVP: 대화'),
      desc: T('バルーン、テキスト入力、ローカルLLM会話、まばたき・視線追従。接続は3段構え(内蔵エンジン/自動検出/手動URL)——話しかけたら人格が返事する。', 'Balloons, text input, local-LLM chat, blinking and gaze tracking. Three tiers of connection (built-in engine / auto-detect / manual URL) — speak, and a persona answers.', '气泡、文本输入、本地 LLM 对话、眨眼与视线追随。三层连接(内置引擎/自动检测/手动 URL)——一开口,人格就回话。', '氣泡、文字輸入、本地 LLM 對話、眨眼與視線追隨。三層連接(內建引擎/自動偵測/手動 URL)——一開口,人格就回話。', '말풍선, 텍스트 입력, 로컬 LLM 대화, 깜빡임·시선 추적. 접속은 3단 구성(내장 엔진/자동 감지/수동 URL) — 말을 걸면 인격이 대답합니다.'),
    },
    {
      label: 'Phase 2',
      status: 'done',
      title: T('キャラが生きる', 'She comes alive', '角色活起来', '角色活起來', '캐릭터가 살아난다'),
      desc: T('感情と気分(ムード)、記憶、ランダムトーク、時報、撫で判定、ウィンドウに座る、季節の演出、出会いの演出。さらにコンビの掛け合い、配信者モード、スラッシュコマンド設定、ペルソナ編集も。放っておいても勝手に生きてる。', 'Emotions and moods, memory, random talk, hourly chimes, petting, sitting on windows, seasonal effects, a first-meeting scene. Plus duo banter, streamer mode, slash-command settings and persona editing. Left alone, she simply lives.', '情绪与心情、记忆、随机闲聊、报时、抚摸判定、坐在窗沿、季节演出、初遇演出。还有搭档对谈、主播模式、斜杠命令设置、人格编辑。放着不管,她也自顾自地活着。', '情緒與心情、記憶、隨機閒聊、報時、撫摸判定、坐在窗沿、季節演出、初遇演出。還有搭檔對談、直播主模式、斜線指令設定、人格編輯。放著不管,她也自顧自地活著。', '감정과 기분, 기억, 랜덤 토크, 시보, 쓰다듬기, 창에 앉기, 계절 연출, 첫 만남 연출. 거기에 콤비 주고받기, 스트리머 모드, 슬래시 커맨드 설정, 페르소나 편집까지. 내버려 둬도 알아서 살아 있습니다.'),
    },
    {
      label: 'Phase 3',
      status: 'done',
      title: T('声が出る', 'She speaks', '发出声音', '發出聲音', '목소리가 나온다'),
      desc: T('VOICEVOX TTS+モーラリップシンク(声と表示の実尺同期)、Whisperマイク入力(呼びかけ起動)、クレジット自動表示。声で会話できる。', 'VOICEVOX TTS with mora lip sync (voice and text in real-time sync), Whisper mic input with wake word, automatic credits. You can talk out loud.', 'VOICEVOX TTS+音拍口型同步(声音与显示实时同步)、Whisper 麦克风输入(唤醒词启动)、自动显示鸣谢。可以用声音对话。', 'VOICEVOX TTS+音拍口型同步(聲音與顯示即時同步)、Whisper 麥克風輸入(喚醒詞啟動)、自動顯示鳴謝。可以用聲音對話。', 'VOICEVOX TTS+모라 립싱크(목소리와 표시의 실척 동기), Whisper 마이크 입력(호출어 기동), 크레딧 자동 표시. 목소리로 대화할 수 있습니다.'),
    },
    {
      label: 'Phase 4',
      status: 'done',
      title: T('AI 秘書', 'AI secretary', 'AI 秘书', 'AI 秘書', 'AI 비서'),
      desc: T('秘書は実運用に到達: Gmail・カレンダー・Drive(Google純正MCPに直結)、タスク預かり、定期チェックと「きょうのブリーフィング」、Claude Desktop・VS Code からの伝言(SSTP伝統の9801番)。スクリーン理解と画面の見守り、クリップボード反応、ローカルRAG(端末内全文検索)、ブラウザ拡張、BGM・Spotify まで動作済み。仕事を任せられる。', 'The secretary reached daily use: Gmail, Calendar and Drive (Google\'s own MCPs), task keeping, periodic checks and the morning briefing, messages from Claude Desktop / VS Code (port 9801, the SSTP tradition). Screen understanding and watch, clipboard reactions, local RAG (on-device full-text search), the browser extension, BGM and Spotify all work. You can hand her real work.', '秘书达到实用水平:Gmail・日历・Drive(直连 Google 官方 MCP)、任务托管、定期检查与「今日简报」、来自 Claude Desktop・VS Code 的传话(SSTP 传统的 9801 端口)。屏幕理解与看护、剪贴板反应、本地 RAG(本机全文检索)、浏览器扩展、BGM・Spotify 都已可用。可以把工作交给她。', '秘書達到實用水準:Gmail・日曆・Drive(直連 Google 官方 MCP)、任務託管、定期檢查與「今日簡報」、來自 Claude Desktop・VS Code 的傳話(SSTP 傳統的 9801 埠)。螢幕理解與看護、剪貼簿反應、本地 RAG(本機全文檢索)、瀏覽器擴充、BGM・Spotify 都已可用。可以把工作交給她。', '비서는 실운용에 도달: Gmail·캘린더·Drive(Google 순정 MCP 직결), 태스크 보관, 정기 확인과 "오늘의 브리핑", Claude Desktop·VS Code에서의 전언(SSTP 전통의 9801번). 스크린 이해와 지켜보기, 클립보드 반응, 로컬 RAG(기기 내 전문 검색), 브라우저 확장, BGM·Spotify까지 동작. 일을 맡길 수 있습니다.'),
    },
    {
      label: 'Phase 5',
      status: 'done',
      title: T('プロダクト化', 'Productization', '产品化', '產品化', '프로덕트화'),
      desc: T('配布パッケージ(3 OS)、Free/Pro/Enterprise の3層ライセンスと管理ポリシー、秘密情報の暗号化、デフォルトキャラ同梱、Live2Dシェル、文脈アニメーション(動作タグ+AI が書き起こす動き+VRMA)、多言語ローカル音声(日=VOICEVOX・英中=内蔵Piper)と OpenAI 互換 TTS API、音声ファイルの文字起こし要約、5言語対応、システムチェック、OSSライセンス表記。DLした瞬間から完成品——0.5.6 で達成。', 'Distribution packages (3 OSes), the Free/Pro/Enterprise license tiers with managed policy, secret encryption, bundled default characters, the Live2D shell, contextual animation (gesture tags + AI-written motion + VRMA), multilingual local voice (ja=VOICEVOX, en/zh=built-in Piper) plus OpenAI-compatible TTS, audio-file transcription summaries, five UI languages, a system check, OSS license credits. A finished product from the moment of download — landed in 0.5.6.', '发行包(3 OS)、Free/Pro/Enterprise 三层许可与管理策略、机密加密、默认角色同捆、Live2D 外壳、情境动画(动作标签+AI 撰写的动作+VRMA)、多语言本地语音(日=VOICEVOX・英中=内置 Piper)与 OpenAI 兼容 TTS、音频文件转写摘要、5 语言支持、系统检查、OSS 许可标注。下载即成品——0.5.6 达成。', '發行包(3 OS)、Free/Pro/Enterprise 三層授權與管理策略、機密加密、預設角色同捆、Live2D 外殼、情境動畫(動作標籤+AI 撰寫的動作+VRMA)、多語言本地語音(日=VOICEVOX・英中=內建 Piper)與 OpenAI 相容 TTS、音訊檔轉寫摘要、5 語言支援、系統檢查、OSS 授權標註。下載即成品——0.5.6 達成。', '배포 패키지(3 OS), Free/Pro/Enterprise 3층 라이선스와 관리 정책, 비밀 정보 암호화, 기본 캐릭터 동봉, Live2D 셸, 문맥 애니메이션(동작 태그+AI가 써내는 움직임+VRMA), 다국어 로컬 음성(일=VOICEVOX·영중=내장 Piper)과 OpenAI 호환 TTS, 음성 파일 전사 요약, 5개 언어 대응, 시스템 체크, OSS 라이선스 표기. 내려받는 순간부터 완성품 — 0.5.6에서 달성.'),
    },
    {
      label: 'Phase 6',
      status: 'done',
      title: T('エコシステム', 'Ecosystem', '生态系统', '生態系統', '에코시스템'),
      desc: T('第三者がゴーストを作って配れる——正式版 0.6.0 で達成。キャラクターカード(V2/V3)のドラッグ&ドロップ取り込み、伺かのクラシックシェル(surface をそのまま身体に。本体と相方がコンビで立ち、surfaces.txt どおりに瞬き、声に合わせて口が動く)、.mirikaパッケージとゴーストマネージャ(名前・性格・相方・設定メモ・身体を1ファイルで受け渡し、手持ちの棚から着替え)、マルチデバイス同期(無料。E2E暗号化、自分のクラウドの同期フォルダを置き場にでき、削除と編集の衝突も解決。置き場そのものをこちらで預かる選択肢は Pro)、完全なSSTP互換(送り主の文字コードに追従・EXECUTE応答)、配布物を作るSDKと人格回帰テスト(ゴールデン対話集で「この子らしさ」をCI検証)。', 'Third parties can make and share ghosts — landed in 0.6.0. Drag-and-drop character cards (V2/V3), classic Ukagaka shells (surfaces become the body as-is; the pair stands together, blinks per surfaces.txt, lip-syncs to the voice), .mirika packages with a ghost manager (name, persona, partner, lore and body in one file, with a shelf to change from), multi-device sync (free, E2E-encrypted, your own cloud folder as the home, deletion/edit conflicts resolved; hosted storage is the Pro option), full SSTP compatibility (encoding follow-through, EXECUTE responses), and an SDK with a persona regression test (golden dialogues verify "her-ness" in CI).', '第三方可以制作并分发幽灵——正式版 0.6.0 达成。角色卡(V2/V3)拖拽导入、伺か经典外壳(surface 原样成为身体;本体与搭档成对站立、按 surfaces.txt 眨眼、随声音对口型)、.mirika 包与幽灵管理器(名字・性格・搭档・设定备忘・身体一个文件转交,可从架上换装)、多设备同步(免费、E2E 加密、可用自己的云同步文件夹作存放处、解决删除与编辑冲突;托管存放处为 Pro 选项)、完整 SSTP 兼容(跟随发送方编码・EXECUTE 应答)、制作发行物的 SDK 与人格回归测试(用黄金对话集在 CI 校验「她的样子」)。', '第三方可以製作並分發幽靈——正式版 0.6.0 達成。角色卡(V2/V3)拖曳匯入、伺か經典外殼(surface 原樣成為身體;本體與搭檔成對站立、按 surfaces.txt 眨眼、隨聲音對口型)、.mirika 包與幽靈管理器(名字・性格・搭檔・設定備忘・身體一個檔案轉交,可從架上換裝)、多裝置同步(免費、E2E 加密、可用自己的雲同步資料夾作存放處、解決刪除與編輯衝突;託管存放處為 Pro 選項)、完整 SSTP 相容(跟隨傳送方編碼・EXECUTE 應答)、製作發行物的 SDK 與人格回歸測試(用黃金對話集在 CI 校驗「她的樣子」)。', '제3자가 고스트를 만들어 배포할 수 있다 — 정식판 0.6.0에서 달성. 캐릭터 카드(V2/V3) 드래그&드롭 가져오기, 우카가카 클래식 셸(서피스가 그대로 몸으로. 본체와 파트너가 콤비로 서고, surfaces.txt대로 깜빡이며, 목소리에 맞춰 입이 움직임), .mirika 패키지와 고스트 매니저(이름·성격·파트너·설정 메모·몸을 1파일로 전달, 선반에서 갈아입기), 멀티 디바이스 동기화(무료. E2E 암호화, 자기 클라우드 폴더를 보관처로, 삭제·편집 충돌도 해결. 보관처를 맡기는 선택지는 Pro), 완전한 SSTP 호환(문자 코드 추종·EXECUTE 응답), 배포물을 만드는 SDK와 인격 회귀 테스트(골든 대화집으로 "이 아이다움"을 CI 검증).'),
    },
    {
      label: 'Phase 7',
      status: 'next',
      title: T('社会と身体', 'Society & bodies', '社会与身体', '社會與身體', '사회와 몸'),
      desc: T('デスクトップに社会ができ、身体の選択肢が増えるフェーズ。0.6.8 現在、社会の側は大きく前進した——伺かのゴーストを本人の辞書のまま迎える完全互換(同梱 SHIORI の実行・選択肢・名前入力・記憶の持ち越し・不可逆の AI 乗り換え)、マルチゴースト(Pro)、ゴースト間コミュニケート(SSTP)、歌(VOICEVOX 歌唱)とお絵かき、スマートホーム(Pro。Nature Remo・SwitchBot)、MMD シェル(0.6.5 で正式化。.pmx で着替えて .vmd で踊る。本体も相方も)。そして Discord への常駐——会話・TODO のデスクトップ双方向同期・ボイスチャンネル読み上げ(VOICEVOX+Nemo 全136声)・「ミリカ」と呼びかける音声会話まで(Pro)。関係の力学も一新: なかよし度は絆と気分の2層になり、数年単位で育ち、会わなければ距離ができる生き物になった(0.6.6)。残りは 0.7 の Display Shell(余ったタブレットに住む。約束は実装済み)→ 0.8 のデスクトップ操作(提案型。MCP の一サーバーとして外に出す)→ 0.9 のロボットシェル実験の順で、1.0 へ。', 'The phase where a society forms on the desktop and the body choices multiply. As of 0.6.8 the society side has come far — full Ukagaka compatibility (a ghost brings its own SHIORI and it runs, with choices, name entry, persistent memories and a one-way switch to the AI brain), multi-ghost (Pro), ghost-to-ghost communicate (SSTP), singing (VOICEVOX) and drawing, smart home (Pro; Nature Remo, SwitchBot), the MMD shell (official in 0.6.5: change into a .pmx, dance a .vmd — main and partner). And residency on Discord — conversation, TODO two-way sync with the desktop, voice-channel reading (136 VOICEVOX + Nemo voices) and spoken answers when you call "Mirika" (Pro). The bond mechanics were rebuilt too: affection now runs on two layers, bond and mood, grows over years and drifts apart when you are away (0.6.6). What remains runs 0.7 Display Shell (living on a spare tablet; the contract is implemented) → 0.8 desktop control (propose-only, an MCP server) → 0.9 the robot-shell experiment, then 1.0.', '桌面上形成小社会、身体选择增多的阶段。截至 0.6.7,社会一侧已大步前进——多幽灵(Pro)、幽灵间 communicate(SSTP)、唱歌(VOICEVOX)与画画、智能家居(Pro;Nature Remo・SwitchBot)、MMD 外壳(0.6.5 正式化:.pmx 换装、.vmd 跳舞——本体与搭档均可)。还有进驻 Discord——对话、TODO 与桌面双向同步、语音频道朗读(VOICEVOX+Nemo 全 136 声)、喊「Mirika」即有声音回答(Pro)。关系的力学也重造了:好感度变成羁绊与心情两层,以年为单位成长,不见面就会疏远(0.6.6)。剩余按 0.7 Display Shell(住进闲置平板;约定已实现)→ 0.8 桌面操作(提议型,以 MCP 服务器形式外置)→ 0.9 机器人外壳实验推进,迈向 1.0。', '桌面上形成小社會、身體選擇增多的階段。截至 0.6.7,社會一側已大步前進——多幽靈(Pro)、幽靈間 communicate(SSTP)、唱歌(VOICEVOX)與畫畫、智慧家庭(Pro;Nature Remo・SwitchBot)、MMD 外殼(0.6.5 正式化:.pmx 換裝、.vmd 跳舞——本體與搭檔均可)。還有進駐 Discord——對話、TODO 與桌面雙向同步、語音頻道朗讀(VOICEVOX+Nemo 全 136 聲)、喊「Mirika」即有聲音回答(Pro)。關係的力學也重造了:好感度變成羈絆與心情兩層,以年為單位成長,不見面就會疏遠(0.6.6)。剩餘按 0.7 Display Shell(住進閒置平板;約定已實現)→ 0.8 桌面操作(提議型,以 MCP 伺服器形式外置)→ 0.9 機器人外殼實驗推進,邁向 1.0。', '데스크톱에 사회가 생기고 몸의 선택지가 늘어나는 페이즈. 0.6.7 현재 사회 쪽은 크게 전진했습니다 — 멀티 고스트(Pro), 고스트 간 커뮤니케이트(SSTP), 노래(VOICEVOX)와 그림, 스마트홈(Pro. Nature Remo·SwitchBot), MMD 셸(0.6.5에서 정식화. .pmx로 갈아입고 .vmd로 춤. 본체도 파트너도). 그리고 Discord 상주 — 대화·TODO의 데스크톱 양방향 동기화·음성 채널 낭독(VOICEVOX+Nemo 전 136 보이스)·"미리카"라고 부르면 목소리로 답하기까지(Pro). 관계의 역학도 일신: 친밀도는 유대와 기분의 2층이 되어, 몇 년 단위로 자라고 만나지 않으면 멀어지는 생물이 되었습니다(0.6.6). 남은 것은 0.7 Display Shell(남는 태블릿에 살기. 약속은 구현 완료)→0.8 데스크톱 조작(제안형. MCP 서버로 외부화)→0.9 로봇 셸 실험 순으로, 1.0으로.'),
    },
    {
      label: 'Phase 8',
      status: 'next',
      title: T('どの机にも', 'Onto every desk', '走上每张桌子', '走上每張桌子', '어느 책상에나'),
      desc: T('いま、迎え入れるまでに小さな障害が残っている。Windows は初回に警告が出るし、macOS にいたっては配れてすらいない——署名と公証を通して、この二つを消す。ダウンロードの経路も増やして、探さなくても見つかるところに置く。機能ではなく、迎え方の話。', 'Small obstacles still stand between her and a new desk: Windows warns on first run, and macOS cannot even be shipped yet — signing and notarization erase both. More download routes too, so she is found without being searched for. Not a feature phase; a welcoming phase.', '现在,把她接回家之前还有些小障碍:Windows 首次运行会警告,macOS 甚至还没法分发——通过签名与公证消除这两点。也会增加下载渠道,让人不用找就能遇到。这不是功能,而是迎接方式。', '現在,把她接回家之前還有些小障礙:Windows 首次執行會警告,macOS 甚至還沒法發佈——透過簽名與公證消除這兩點。也會增加下載管道,讓人不用找就能遇到。這不是功能,而是迎接方式。', '지금, 맞이하기까지 작은 장애물이 남아 있습니다. Windows는 첫 실행에 경고가 뜨고, macOS는 아예 배포조차 못 하고 있습니다 — 서명과 공증으로 이 둘을 지웁니다. 다운로드 경로도 늘려 찾지 않아도 만나는 곳에 둡니다. 기능이 아니라, 맞이하는 방식의 이야기.'),
    },
    {
      label: 'Phase 9',
      status: 'none',
      title: T('作る人の場所', 'A place for makers', '创作者的去处', '創作者的去處', '만드는 사람의 자리'),
      desc: T('作って、配れるようにはなった。けれど、探せる場所がまだない。誰かが育てた子を、アプリの中から見つけて迎えられるように。作った人の名前がちゃんと残り、受け取る側は誰の作かを確かめられるように。伺かが二十五年続いたのは、勝手に作って勝手に配れたからなので、そこは重くしない。', 'Making and sharing work now — but there is nowhere to browse. A registry, so a ghost someone raised can be found and adopted from inside the app, with the maker\'s name preserved and verifiable. Ukagaka lasted twenty-five years because anyone could make and share freely; that lightness will be kept.', '能做、能分发了,却还没有可以「逛」的地方。要让别人养大的孩子能在应用内被找到并迎回家,让作者的名字留得住、领取方能确认出自谁手。伺か能延续二十五年,正因为谁都能随手做、随手发——这份轻盈会保留。', '能做、能發佈了,卻還沒有可以「逛」的地方。要讓別人養大的孩子能在應用內被找到並迎回家,讓作者的名字留得住、領取方能確認出自誰手。伺か能延續二十五年,正因為誰都能隨手做、隨手發——這份輕盈會保留。', '만들고 배포할 수 있게는 됐지만, 아직 찾아볼 곳이 없습니다. 누군가 키운 아이를 앱 안에서 발견해 맞이할 수 있도록. 만든 사람의 이름이 제대로 남고, 받는 쪽이 누구 작품인지 확인할 수 있도록. 우카가카가 25년 이어진 것은 마음대로 만들고 마음대로 배포할 수 있었기 때문이라, 그 가벼움은 무겁게 하지 않습니다.'),
    },
    {
      label: 'Phase 10',
      status: 'none',
      title: T('画面の外へ', 'Beyond the screen', '走出屏幕', '走出螢幕', '화면 밖으로'),
      desc: T('別の機械がこの子の身体になれることは 0.7 で確かめる。その先——台所のディスプレイに立っていたり、机の上の小さな何かに宿っていたり。ロボットは 0.9 で実験してみて、「動いた」ではなく「一緒にいられた」と思えたときに、はじめて先へ進める。急がない。', 'That another machine can be her body is proven in 0.7. Beyond that — standing on a kitchen display, dwelling in something small on the desk. Robots get an experiment in 0.9, and only when it feels like "we could be together", not merely "it moved", does this go further. No hurry.', '0.7 会验证「别的机器也能成为她的身体」。再往后——立在厨房的屏幕上,或寄宿在桌上小小的什么里。机器人在 0.9 做实验,只有当感觉是「能在一起」而不只是「动了」,才继续往前。不急。', '0.7 會驗證「別的機器也能成為她的身體」。再往後——立在廚房的螢幕上,或寄宿在桌上小小的什麼裡。機器人在 0.9 做實驗,只有當感覺是「能在一起」而不只是「動了」,才繼續往前。不急。', '다른 기계가 이 아이의 몸이 될 수 있다는 것은 0.7에서 확인합니다. 그 너머 — 부엌 디스플레이에 서 있거나, 책상 위 작은 무언가에 깃들거나. 로봇은 0.9에서 실험해 보고, "움직였다"가 아니라 "함께 있을 수 있었다"고 느껴졌을 때 비로소 앞으로 나아갑니다. 서두르지 않습니다.'),
    },
  ];
}

function PhaseLabel({ label, status }: { label: string; status: Status }) {
  if (status === 'next') {
    return (
      <span className="font-mono text-sm text-sakura font-semibold">
        {label}
        <br className="hidden md:block" />
        <span className="text-[10px] tracking-widest uppercase">● Next</span>
      </span>
    );
  }
  if (status === 'done') {
    return (
      <span className="font-mono text-sm text-mist">
        {label}
        <br className="hidden md:block" />
        <span className="text-[10px] tracking-widest uppercase text-sakura">✓ done</span>
      </span>
    );
  }
  return <span className="font-mono text-sm text-mist">{label}</span>;
}

export function Roadmap() {
  const t = useT();
  const PHASES = buildPhases(t);
  return (
    <Section
      id="roadmap"
      index="06"
      label="Roadmap"
      tone="dark"
      title={t('順に価値を積む。1.0 のその先まで。', 'Value, stacked in order — past 1.0 and beyond.', { 'zh-CN': '按序积累价值。直到 1.0 之后。', 'zh-TW': '按序積累價值。直到 1.0 之後。', ko: '차례로 가치를 쌓는다. 1.0 그 너머까지.' })}
    >
      <StaggerGroup className="border-t-2 border-cream/30 divide-y divide-cream/10">
        {PHASES.map((p) => (
          <StaggerItem
            key={p.label}
            className={`grid md:grid-cols-[110px_230px_1fr] gap-2 md:gap-8 py-6 px-3 ${
              p.status === 'next'
                ? 'bg-sakura/10 border-l-4 border-sakura'
                : p.status === 'none'
                  ? 'border-b border-cream/10'
                  : ''
            }`}
          >
            <PhaseLabel label={p.label} status={p.status} />
            <h3 className="font-mincho font-bold text-lg">{p.title}</h3>
            <p className="text-mist text-sm leading-relaxed">{p.desc}</p>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </Section>
  );
}
