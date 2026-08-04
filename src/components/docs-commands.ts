import { t5, type useT } from '../i18n';

/**
 * スラッシュコマンド全件。アプリ本体の SLASH_COMMANDS(apps/desktop/src/main/index.ts)
 * から書き起こしたもので、/help に出るものと同じ並び・同じ説明。
 *
 * 5言語対応。ja はアプリの原文を一字一句そのまま置く(本体と突き合わせて同期を
 * 確認するため、勝手に整えない)。arg は <>/[] のプレースホルダだけ訳し、
 * ユーザーがそのまま打ち込むトークン(on|off・list 等)と | の構造は原文のまま残す。
 */
export type Cmd = { name: string; arg: string; help: string };

export function buildCommandGroups(
  t: ReturnType<typeof useT>,
): Array<{ group: string; items: Cmd[] }> {
  const T = t5(t);
  return [
    {
      group: T("頭脳", "Brain", "头脑", "頭腦", "두뇌"),
      items: [
        {
          name: "brain",
          arg: T(
            "embedded|external|local|model|chatgpt|claude|gemini|grok [APIキー]",
            "embedded|external|local|model|chatgpt|claude|gemini|grok [API key]",
            "embedded|external|local|model|chatgpt|claude|gemini|grok [API 密钥]",
            "embedded|external|local|model|chatgpt|claude|gemini|grok [API 金鑰]",
            "embedded|external|local|model|chatgpt|claude|gemini|grok [API 키]",
          ),
          help: T(
            "頭脳の切替(ローカル/クラウド。/brain claude はサブスクでも可)",
            "Switch brains (local/cloud; /brain claude also works with a subscription)",
            "切换头脑(本地/云端。/brain claude 用订阅也可)",
            "切換頭腦(本地/雲端。/brain claude 用訂閱也可)",
            "두뇌 전환(로컬/클라우드. /brain claude 는 구독으로도 가능)",
          ),
        },
        {
          name: "brain gpu",
          arg: T(
            "[auto|max|off|<層数>]",
            "[auto|max|off|<layers>]",
            "[auto|max|off|<层数>]",
            "[auto|max|off|<層數>]",
            "[auto|max|off|<층수>]",
          ),
          help: T(
            "内蔵エンジンの GPU への載せ方(自動で GPU が使われないときは max)",
            "How the built-in engine loads onto the GPU (try max when the GPU sits unused)",
            "内置引擎装载到 GPU 的方式(自动不用 GPU 时试试 max)",
            "內建引擎載入 GPU 的方式(自動不用 GPU 時試試 max)",
            "내장 엔진을 GPU에 싣는 방식(자동인데 GPU를 안 쓰면 max)",
          ),
        },
        {
          name: "brain model",
          arg: "[auto|e2b|e4b|12b|26b|31b]",
          help: T(
            "内蔵エンジンのモデルを選ぶ(既定は PC に合わせて自動)",
            "Choose the built-in engine’s model (default: auto-picked for your PC)",
            "选择内置引擎的模型(默认按电脑自动挑选)",
            "選擇內建引擎的模型(預設按電腦自動挑選)",
            "내장 엔진의 모델 선택(기본은 PC에 맞춰 자동)",
          ),
        },
        {
          name: "model",
          arg: T("<名前>", "<name>", "<名字>", "<名字>", "<이름>"),
          help: T(
            "外部ランタイムのモデルを選ぶ",
            "Choose the external runtime’s model",
            "选择外部运行时的模型",
            "選擇外部執行環境的模型",
            "외부 런타임의 모델 선택",
          ),
        },
        {
          name: "endpoint",
          arg: "[URL]",
          help: T(
            "外部ランタイムの接続先(空で自動)",
            "Where the external runtime connects (empty = auto)",
            "外部运行时的连接目标(留空则自动)",
            "外部執行環境的連線目標(留空則自動)",
            "외부 런타임의 접속 대상(비우면 자동)",
          ),
        },
        {
          name: "rescan",
          arg: "",
          help: T(
            "ローカル LLM を再検索",
            "Rescan for local LLMs",
            "重新搜索本地 LLM",
            "重新搜尋本地 LLM",
            "로컬 LLM 다시 검색",
          ),
        },
        {
          name: "cloud",
          arg: T("<質問>", "<question>", "<问题>", "<問題>", "<질문>"),
          help: T(
            "この1問だけクラウド頭脳で考える(ふだんの頭脳はそのまま)",
            "Think about just this one question with a cloud brain (your usual brain stays)",
            "只这一问用云端头脑思考(平时的头脑保持不变)",
            "只這一問用雲端頭腦思考(平時的頭腦保持不變)",
            "이 한 질문만 클라우드 두뇌로 생각(평소 두뇌는 그대로)",
          ),
        },
      ],
    },
    {
      group: T("キャラ", "Character", "角色", "角色", "캐릭터"),
      items: [
        {
          name: "bond",
          arg: "",
          help: T(
            "この子との関係を見る(出会って何日・なかよし度)",
            "See your relationship with them (days since you met, closeness)",
            "查看和这孩子的关系(相识天数、亲密度)",
            "查看和這孩子的關係(相識天數、親密度)",
            "이 아이와의 관계 보기(만난 지 며칠, 친밀도)",
          ),
        },
        {
          name: "lore",
          arg: "add|remove …",
          help: T(
            "ことばに反応する設定メモ(確実に思い出す)",
            "Lore notes triggered by words (recalled reliably)",
            "按词语触发的设定备忘(确保想起来)",
            "按詞語觸發的設定備忘(確保想起來)",
            "말에 반응하는 설정 메모(확실하게 떠올림)",
          ),
        },
        {
          name: "name",
          arg: T("<名前>", "<name>", "<名字>", "<名字>", "<이름>"),
          help: T(
            "この子の名前を変える",
            "Change their name",
            "给这孩子改名",
            "給這孩子改名",
            "이 아이의 이름 바꾸기",
          ),
        },
        {
          name: "first",
          arg: T("<一人称>", "<pronoun>", "<第一人称>", "<第一人稱>", "<일인칭>"),
          help: T(
            "一人称を変える(わたし/ぼく等)",
            "Change their first-person pronoun (watashi/boku, etc.)",
            "更改第一人称(自称的说法)",
            "更改第一人稱(自稱的說法)",
            "일인칭 바꾸기(나/저 등)",
          ),
        },
        {
          name: "persona",
          arg: T("[説明|reset]", "[description|reset]", "[说明|reset]", "[說明|reset]", "[설명|reset]"),
          help: T(
            "この子の性格を見る・書き換える",
            "View or rewrite their personality",
            "查看、改写这孩子的性格",
            "查看、改寫這孩子的性格",
            "이 아이의 성격을 보거나 고쳐 쓰기",
          ),
        },
        {
          name: "package",
          arg: T(
            "export|import|list|use <名前>",
            "export|import|list|use <name>",
            "export|import|list|use <名字>",
            "export|import|list|use <名字>",
            "export|import|list|use <이름>",
          ),
          help: T(
            "この子ひとりぶんを1ファイルに(.mirika)。手持ちの一覧と着替えも",
            "Pack them into a single file (.mirika); also list what you have and switch",
            "把这孩子整个装进一个文件(.mirika)。也能看手头列表、换着用",
            "把這孩子整個裝進一個檔案(.mirika)。也能看手頭列表、換著用",
            "이 아이 한 명분을 파일 하나로(.mirika). 갖고 있는 목록 보기와 갈아입기도",
          ),
        },
        {
          name: "card",
          arg: T("[ファイル|undo|reset]", "[file|undo|reset]", "[文件|undo|reset]", "[檔案|undo|reset]", "[파일|undo|reset]"),
          help: T(
            "キャラクターカード(V2/V3)を取り込む(undo で1段戻す・reset で読む前に戻す)",
            "Import a character card (V2/V3) (undo steps back once, reset returns to before the import)",
            "导入角色卡(V2/V3)(undo 退一步,reset 回到导入前)",
            "匯入角色卡(V2/V3)(undo 退一步,reset 回到匯入前)",
            "캐릭터 카드(V2/V3) 가져오기(undo 로 한 단계 되돌림, reset 으로 읽기 전으로)",
          ),
        },
        {
          name: "vrm",
          arg: "",
          help: T(
            "この子のモデル(VRM / PMX)を開いて着替える",
            "Open a model (VRM / PMX) and have them change into it",
            "打开这孩子的模型(VRM / PMX)换装",
            "打開這孩子的模型(VRM / PMX)換裝",
            "이 아이의 모델(VRM / PMX)을 열어 갈아입히기",
          ),
        },
        {
          name: "partner",
          arg: "name|shell|persona|first|voice|tts",
          help: T(
            "相方まわりを全部ここで(名前・身体・性格・一人称・声)",
            "Everything about the partner in one place (name, body, personality, pronoun, voice)",
            "搭档相关全在这里(名字、身体、性格、第一人称、声音)",
            "搭檔相關全在這裡(名字、身體、性格、第一人稱、聲音)",
            "파트너 관련은 전부 여기서(이름, 몸, 성격, 일인칭, 목소리)",
          ),
        },
        {
          name: "summon",
          arg: "",
          help: T(
            "相方のモデル(VRM / PMX)を開いて呼ぶ",
            "Open a partner model (VRM / PMX) and call them in",
            "打开搭档的模型(VRM / PMX)召唤",
            "打開搭檔的模型(VRM / PMX)召喚",
            "파트너의 모델(VRM / PMX)을 열어 부르기",
          ),
        },
        {
          name: "dismiss",
          arg: "",
          help: T(
            "相方を帰す",
            "Send the partner home",
            "让搭档回去",
            "讓搭檔回去",
            "파트너 돌려보내기",
          ),
        },
        {
          name: "draw",
          arg: T(
            "[お題|api <URL>|cloud on|off]",
            "[topic|api <URL>|cloud on|off]",
            "[题目|api <URL>|cloud on|off]",
            "[題目|api <URL>|cloud on|off]",
            "[주제|api <URL>|cloud on|off]",
          ),
          help: T(
            "絵を描く(ローカルの画像生成APIか、つないでいるクラウド。無ければ手描き)",
            "Draw a picture (a local image-gen API or the connected cloud; hand-drawn if neither)",
            "画画(本地图像生成 API 或已连接的云端。都没有就手绘)",
            "畫畫(本地圖像生成 API 或已連接的雲端。都沒有就手繪)",
            "그림 그리기(로컬 이미지 생성 API나 연결된 클라우드. 없으면 손그림)",
          ),
        },
        {
          name: "sing",
          arg: T("[お題]", "[topic]", "[题目]", "[題目]", "[주제]"),
          help: T(
            "歌う(VOICEVOX の歌唱ボイスが要る)",
            "Sing (needs a VOICEVOX singing voice)",
            "唱歌(需要 VOICEVOX 的歌唱声库)",
            "唱歌(需要 VOICEVOX 的歌唱聲庫)",
            "노래하기(VOICEVOX 노래 보이스가 필요)",
          ),
        },
      ],
    },
    {
      group: T("声とマイク", "Voice & mic", "声音与麦克风", "聲音與麥克風", "목소리와 마이크"),
      items: [
        {
          name: "voice",
          arg: "list|ID|on|off",
          help: T(
            "本体の声(VOICEVOX/AivisSpeech)",
            "The main character’s voice (VOICEVOX/AivisSpeech)",
            "本体的声音(VOICEVOX/AivisSpeech)",
            "本體的聲音(VOICEVOX/AivisSpeech)",
            "본체 목소리(VOICEVOX/AivisSpeech)",
          ),
        },
        {
          name: "tts",
          arg: T(
            "URL|off [モデル] [声]",
            "URL|off [model] [voice]",
            "URL|off [模型] [声音]",
            "URL|off [模型] [聲音]",
            "URL|off [모델] [목소리]",
          ),
          help: T(
            "OpenAI互換TTS(kokoro・GPT-SoVITS等の音声クローン)に切替",
            "Switch to an OpenAI-compatible TTS (voice clones like kokoro or GPT-SoVITS)",
            "切换到 OpenAI 兼容 TTS(kokoro、GPT-SoVITS 等语音克隆)",
            "切換到 OpenAI 相容 TTS(kokoro、GPT-SoVITS 等語音複製)",
            "OpenAI 호환 TTS(kokoro, GPT-SoVITS 등 음성 클론)로 전환",
          ),
        },
        {
          name: "piper",
          arg: "",
          help: T(
            "内蔵音声(Piper)をDLして有効化(英語・中国語等・完全ローカル)",
            "Download and enable the built-in voice (Piper) (English, Chinese, etc.; fully local)",
            "下载并启用内置语音(Piper)(英语、中文等,完全本地)",
            "下載並啟用內建語音(Piper)(英語、中文等,完全本地)",
            "내장 음성(Piper)을 내려받아 활성화(영어, 중국어 등, 완전 로컬)",
          ),
        },
        {
          name: "read",
          arg: T("<語> <よみ>", "<word> <reading>", "<词> <读音>", "<詞> <讀音>", "<단어> <읽기>"),
          help: T(
            "読み上げの誤読を登録(一覧は /read)",
            "Register fixes for misread words (see the list with /read)",
            "登记朗读的误读(列表用 /read 看)",
            "登記朗讀的誤讀(列表用 /read 看)",
            "잘못 읽는 단어 등록(목록은 /read)",
          ),
        },
        {
          name: "audio",
          arg: "番号|名前|default",
          help: T(
            "声の出力先(仮想ケーブル等)",
            "Where the voice comes out (virtual cables, etc.)",
            "声音的输出目标(虚拟音频线等)",
            "聲音的輸出目標(虛擬音訊線等)",
            "목소리 출력 대상(가상 케이블 등)",
          ),
        },
        {
          name: "mic",
          arg: T(
            "ptt|always|model <名前>",
            "ptt|always|model <name>",
            "ptt|always|model <名字>",
            "ptt|always|model <名字>",
            "ptt|always|model <이름>",
          ),
          help: T(
            "マイク入力(方式と聞き取りモデル)",
            "Mic input (mode and speech-recognition model)",
            "麦克风输入(方式与识别模型)",
            "麥克風輸入(方式與辨識模型)",
            "마이크 입력(방식과 음성 인식 모델)",
          ),
        },
        {
          name: "bgm",
          arg: T(
            "folder <フォルダ>|play [曲名・局名]|stations|next|stop|volume",
            "folder <folder>|play [song/station]|stations|next|stop|volume",
            "folder <文件夹>|play [曲名/电台名]|stations|next|stop|volume",
            "folder <資料夾>|play [曲名/電台名]|stations|next|stop|volume",
            "folder <폴더>|play [곡명/방송국명]|stations|next|stop|volume",
          ),
          help: T(
            "BGM(ローカル曲+ネットラジオ。配信中はフォルダの曲のみ・OBSにクレジット)",
            "BGM (local tracks + net radio; while streaming, folder tracks only, credits sent to OBS)",
            "BGM(本地曲目+网络电台。直播中只播文件夹里的曲子,曲目信息发给 OBS)",
            "BGM(本地曲目+網路電台。直播中只播資料夾裡的曲子,曲目資訊發給 OBS)",
            "BGM(로컬 곡+인터넷 라디오. 방송 중엔 폴더 곡만, OBS에 크레딧 전송)",
          ),
        },
        {
          name: "spotify",
          arg: T(
            "<クライアントID>|off",
            "<client ID>|off",
            "<客户端 ID>|off",
            "<用戶端 ID>|off",
            "<클라이언트 ID>|off",
          ),
          help: T(
            "Spotify連携(手元のSpotifyアプリを選曲・操作。要Premium)",
            "Spotify link (picks and controls the Spotify app on your machine; Premium required)",
            "Spotify 联动(为手边的 Spotify 应用选曲、操作。需要 Premium)",
            "Spotify 連動(為手邊的 Spotify 應用程式選曲、操作。需要 Premium)",
            "Spotify 연동(내 Spotify 앱을 선곡, 조작. Premium 필요)",
          ),
        },
      ],
    },
    {
      group: T("見た目と動作", "Appearance & behavior", "外观与动作", "外觀與動作", "모습과 동작"),
      items: [
        {
          name: "quickreply",
          arg: "on|off",
          help: T(
            "返事の候補ボタン",
            "Suggested-reply buttons",
            "回复候选按钮",
            "回覆候選按鈕",
            "답장 후보 버튼",
          ),
        },
        {
          name: "display",
          arg: T(
            "on|off|new|port <番号>",
            "on|off|new|port <number>",
            "on|off|new|port <编号>",
            "on|off|new|port <編號>",
            "on|off|new|port <번호>",
          ),
          help: T(
            "余ったタブレットをこの子の身体にする(合言葉つきで受け入れ)",
            "Turn a spare tablet into their body (accepted with a passphrase)",
            "把闲置的平板变成这孩子的身体(凭口令接入)",
            "把閒置的平板變成這孩子的身體(憑口令接入)",
            "남는 태블릿을 이 아이의 몸으로(암호를 확인하고 받아들임)",
          ),
        },
        {
          name: "shell",
          arg: T(
            "vrm|live2d|mmd|card [ファイル|default|hiyori|mao]",
            "vrm|live2d|mmd|card [file|default|hiyori|mao]",
            "vrm|live2d|mmd|card [文件|default|hiyori|mao]",
            "vrm|live2d|mmd|card [檔案|default|hiyori|mao]",
            "vrm|live2d|mmd|card [파일|default|hiyori|mao]",
          ),
          help: T(
            "本体の身体を切替(VRM/Live2D/MMD/カードの立ち絵)",
            "Switch the main body (VRM/Live2D/MMD/card portrait)",
            "切换本体的身体(VRM/Live2D/MMD/卡片立绘)",
            "切換本體的身體(VRM/Live2D/MMD/卡片立繪)",
            "본체 몸 전환(VRM/Live2D/MMD/카드 일러스트)",
          ),
        },
        {
          name: "effects",
          arg: "on|off",
          help: T(
            "季節の演出(桜・紅葉・雪、実際の雨・雪を優先)",
            "Seasonal effects (cherry blossoms, autumn leaves, snow; real rain or snow takes priority)",
            "季节演出(樱花、红叶、雪,优先实际的雨雪)",
            "季節演出(櫻花、紅葉、雪,優先實際的雨雪)",
            "계절 연출(벚꽃, 단풍, 눈. 실제 비나 눈을 우선)",
          ),
        },
        {
          name: "season",
          arg: "spring|summer|autumn|winter|auto",
          help: T(
            "季節を固定 / 自動",
            "Pin the season / auto",
            "固定季节 / 自动",
            "固定季節 / 自動",
            "계절 고정 / 자동",
          ),
        },
        {
          name: "sit",
          arg: "",
          help: T(
            "手前の窓のふちに座る/降りる(Windows)",
            "Sit on / get down from the edge of the front window (Windows)",
            "坐上/离开最前面窗口的边缘(Windows)",
            "坐上/離開最前面視窗的邊緣(Windows)",
            "앞쪽 창 가장자리에 앉기/내려오기(Windows)",
          ),
        },
        {
          name: "chime",
          arg: "on|off",
          help: T("時報", "Hourly chime", "报时", "報時", "시보"),
        },
        {
          name: "balloon",
          arg: T("[倍率]", "[scale]", "[倍率]", "[倍率]", "[배율]"),
          help: T(
            "吹き出しの大きさの好み(既定0.8。窓に合わせた自動調整に掛ける)",
            "Preferred balloon size (default 0.8; multiplies the window-fit auto sizing)",
            "气泡大小的偏好(默认 0.8。乘在随窗口自动调整之上)",
            "氣泡大小的偏好(預設 0.8。乘在隨視窗自動調整之上)",
            "말풍선 크기 취향(기본 0.8. 창에 맞춘 자동 조정에 곱해짐)",
          ),
        },
        {
          name: "size",
          arg: "<小|中|大|特大|巨大|極大 or 幅x高>",
          help: T("ウィンドウサイズ", "Window size", "窗口大小", "視窗大小", "창 크기"),
        },
        {
          name: "speed",
          arg: "slow|normal|fast|<ms>",
          help: T(
            "吹き出しのタイプ速度",
            "Balloon typing speed",
            "气泡的打字速度",
            "氣泡的打字速度",
            "말풍선 타이핑 속도",
          ),
        },
        {
          name: "perf",
          arg: "eco|normal|60|high",
          help: T("パフォーマンスモード", "Performance mode", "性能模式", "效能模式", "성능 모드"),
        },
      ],
    },
    {
      group: T("AI秘書", "AI secretary", "AI 秘书", "AI 秘書", "AI 비서"),
      items: [
        {
          name: "auto",
          arg: "add|remove …",
          help: T(
            "毎日決まった時刻の定期アクション",
            "Recurring actions at fixed times each day",
            "每天固定时刻的定期动作",
            "每天固定時刻的定期動作",
            "매일 정해진 시각의 정기 액션",
          ),
        },
        {
          name: "home",
          arg: T(
            "remo <トークン>|switchbot <トークン> <シークレット>|list|off",
            "remo <token>|switchbot <token> <secret>|list|off",
            "remo <令牌>|switchbot <令牌> <密钥>|list|off",
            "remo <權杖>|switchbot <權杖> <密鑰>|list|off",
            "remo <토큰>|switchbot <토큰> <시크릿>|list|off",
          ),
          help: T(
            "家電の操作(Nature Remo / SwitchBot に直接つなぐ。Pro)",
            "Control appliances (connects directly to Nature Remo / SwitchBot; Pro)",
            "操控家电(直接连 Nature Remo / SwitchBot。Pro)",
            "操控家電(直接連 Nature Remo / SwitchBot。Pro)",
            "가전 조작(Nature Remo / SwitchBot에 직접 연결. Pro)",
          ),
        },
        {
          name: "mcp",
          arg: T(
            "add <名前> <コマンド…|URL [トークン]>|remove <名前>|tools",
            "add <name> <command…|URL [token]>|remove <name>|tools",
            "add <名字> <命令…|URL [令牌]>|remove <名字>|tools",
            "add <名字> <命令…|URL [權杖]>|remove <名字>|tools",
            "add <이름> <명령…|URL [토큰]>|remove <이름>|tools",
          ),
          help: T(
            "MCPサーバー接続(gmail / calendar / drive はGoogle純正プリセット。URL でリモートにも繋がる=Pro)",
            "Connect MCP servers (gmail / calendar / drive are official Google presets; a URL reaches remote servers = Pro)",
            "连接 MCP 服务器(gmail / calendar / drive 是 Google 官方预设。填 URL 还能连远程=Pro)",
            "連接 MCP 伺服器(gmail / calendar / drive 是 Google 官方預設。填 URL 還能連遠端=Pro)",
            "MCP 서버 연결(gmail / calendar / drive 는 Google 정품 프리셋. URL로 원격에도 연결=Pro)",
          ),
        },
        {
          name: "pomo",
          arg: T(
            "start [作業分] [休憩分]|stop",
            "start [work min] [break min]|stop",
            "start [工作分钟] [休息分钟]|stop",
            "start [工作分鐘] [休息分鐘]|stop",
            "start [작업 분] [휴식 분]|stop",
          ),
          help: T(
            "ポモドーロ(作業と休憩の切替をキャラが声かけ。既定25分+5分)",
            "Pomodoro (the character calls out work/break switches; default 25 + 5 min)",
            "番茄钟(工作和休息的切换由角色出声提醒。默认 25 分+5 分)",
            "番茄鐘(工作和休息的切換由角色出聲提醒。預設 25 分+5 分)",
            "뽀모도로(작업과 휴식 전환을 캐릭터가 말로 알림. 기본 25분+5분)",
          ),
        },
        {
          name: "rag",
          arg: T(
            "<フォルダ>|find <ことば>|reindex|off",
            "<folder>|find <words>|reindex|off",
            "<文件夹>|find <词语>|reindex|off",
            "<資料夾>|find <詞語>|reindex|off",
            "<폴더>|find <말>|reindex|off",
          ),
          help: T(
            "資料フォルダを索引(ローカル全文検索。「メモどこだっけ」に答える)",
            "Index a documents folder (local full-text search; answers “where was that note?”)",
            "索引资料文件夹(本地全文搜索。答得上“那份备忘在哪”)",
            "索引文件資料夾(本地全文搜尋。答得上「那份備忘在哪」)",
            "자료 폴더 색인(로컬 전문 검색. “그 메모 어디 있더라”에 답함)",
          ),
        },
        {
          name: "secretary",
          arg: T(
            "on|off|interval <分>|now|brief",
            "on|off|interval <min>|now|brief",
            "on|off|interval <分钟>|now|brief",
            "on|off|interval <分鐘>|now|brief",
            "on|off|interval <분>|now|brief",
          ),
          help: T(
            "定期チェックときょうのブリーフィング(メール・予定・タスク・天気)",
            "Periodic checks and today’s briefing (mail, events, tasks, weather)",
            "定期检查与今日简报(邮件、日程、任务、天气)",
            "定期檢查與今日簡報(郵件、日程、任務、天氣)",
            "정기 체크와 오늘의 브리핑(메일, 일정, 할 일, 날씨)",
          ),
        },
        {
          name: "mail",
          arg: T(
            "pop <ホスト[:ポート]> <ユーザー> <パスワード>|off",
            "pop <host[:port]> <user> <password>|off",
            "pop <主机[:端口]> <用户> <密码>|off",
            "pop <主機[:連接埠]> <使用者> <密碼>|off",
            "pop <호스트[:포트]> <사용자> <비밀번호>|off",
          ),
          help: T(
            "POP3 の新着見張り(どのプロバイダでも。読むのはヘッダだけ)",
            "Watch POP3 for new mail (any provider; reads only the headers)",
            "盯着 POP3 的新邮件(任何服务商都行。只读邮件头)",
            "盯著 POP3 的新郵件(任何服務商都行。只讀郵件標頭)",
            "POP3 새 메일 감시(어느 프로바이더든. 읽는 건 헤더뿐)",
          ),
        },
        {
          name: "webhook",
          arg: "on|new|off",
          help: T(
            "外部スクリプト・他アプリからの知らせの受け口(POST /webhook)",
            "An inbox for notices from external scripts and other apps (POST /webhook)",
            "接收外部脚本、其他应用通知的入口(POST /webhook)",
            "接收外部腳本、其他應用程式通知的入口(POST /webhook)",
            "외부 스크립트, 다른 앱이 보내는 알림의 접수구(POST /webhook)",
          ),
        },
        {
          name: "todo",
          arg: T(
            "add <内容> [@期限]|done <番号>|remove <番号>",
            "add <task> [@due]|done <number>|remove <number>",
            "add <内容> [@期限]|done <编号>|remove <编号>",
            "add <內容> [@期限]|done <編號>|remove <編號>",
            "add <내용> [@기한]|done <번호>|remove <번호>",
          ),
          help: T(
            "タスクを預ける(期限が近いと知らせる。会話でも追加できる)",
            "Leave tasks with them (they let you know as deadlines near; can also be added in chat)",
            "把任务托付出去(临近期限会提醒。聊天中也能添加)",
            "把任務託付出去(臨近期限會提醒。聊天中也能新增)",
            "할 일 맡기기(기한이 가까우면 알려 줌. 대화로도 추가 가능)",
          ),
        },
        {
          name: "screen",
          arg: "watch on|off",
          help: T(
            "いまの画面を見てもらう(「画面を見て」でも可)。watch で見守り(オプトイン)",
            "Have them look at the current screen (“look at my screen” works too). watch turns on screen watch (opt-in)",
            "让这孩子看看当前屏幕(说“看看屏幕”也行)。watch 开启守望(自愿开启)",
            "讓這孩子看看目前螢幕(說「看看螢幕」也行)。watch 開啟守望(自願開啟)",
            "지금 화면을 봐 달라고 하기(“화면 봐 줘”도 가능). watch 로 지켜보기(옵트인)",
          ),
        },
        {
          name: "snip",
          arg: "",
          help: T(
            "範囲を切り取って見せる(📷ボタン/Alt+Shift+M。クリップボード+保存)",
            "Snip a region and show them (📷 button / Alt+Shift+M; clipboard + saved)",
            "截取一块区域给这孩子看(📷按钮/Alt+Shift+M。进剪贴板+保存)",
            "截取一塊區域給這孩子看(📷按鈕/Alt+Shift+M。進剪貼簿+儲存)",
            "영역을 잘라 보여 주기(📷버튼/Alt+Shift+M. 클립보드+저장)",
          ),
        },
        {
          name: "attach",
          arg: "",
          help: T(
            "ファイルを添えて指示する(📎ボタン。画像・テキスト)",
            "Attach a file to your request (📎 button; images and text)",
            "附上文件下指示(📎按钮。图像、文本)",
            "附上檔案下指示(📎按鈕。圖像、文字)",
            "파일을 곁들여 지시하기(📎버튼. 이미지, 텍스트)",
          ),
        },
        {
          name: "clipboard",
          arg: "on|off",
          help: T(
            "コピーしたエラーへのひとこと反応(既定オフ)",
            "A quick word about errors you copy (default off)",
            "对复制的报错说上一句(默认关)",
            "對複製的錯誤說上一句(預設關)",
            "복사한 에러에 한마디 반응(기본 꺼짐)",
          ),
        },
      ],
    },
    {
      group: T("配信", "Streaming", "直播", "直播", "방송"),
      items: [
        {
          name: "announce",
          arg: T(
            "<配信の内容>|post|tags <タグ…>",
            "<stream details>|post|tags <tags…>",
            "<直播内容>|post|tags <标签…>",
            "<直播內容>|post|tags <標籤…>",
            "<방송 내용>|post|tags <태그…>",
          ),
          help: T(
            "告知文をこの子に書かせて投稿画面を開く",
            "Have them draft the announcement and open the posting screen",
            "让这孩子写好宣传文案并打开发布画面",
            "讓這孩子寫好宣傳文案並打開發布畫面",
            "공지 글을 이 아이에게 쓰게 하고 게시 화면 열기",
          ),
        },
        {
          name: "write",
          arg: T(
            "on|off|plot <題材>|plot 1-3|plot more|outline|<依頼>|next|fix <直し>|open|folder|status|note|brief|list",
            "on|off|plot <subject>|plot 1-3|plot more|outline|<request>|next|fix <changes>|open|folder|status|note|brief|list",
            "on|off|plot <题材>|plot 1-3|plot more|outline|<请求>|next|fix <修改>|open|folder|status|note|brief|list",
            "on|off|plot <題材>|plot 1-3|plot more|outline|<請求>|next|fix <修改>|open|folder|status|note|brief|list",
            "on|off|plot <소재>|plot 1-3|plot more|outline|<의뢰>|next|fix <수정>|open|folder|status|note|brief|list",
          ),
          help: T(
            "シナリオライター(Pro)。台本や脚本を Markdown に書き出す(使い方は pro.mirika.dev)",
            "Scenario writer (Pro): writes scripts and screenplays to Markdown (how-to at pro.mirika.dev)",
            "剧本写手(Pro)。把台本、剧本写成 Markdown(用法见 pro.mirika.dev)",
            "劇本寫手(Pro)。把台本、劇本寫成 Markdown(用法見 pro.mirika.dev)",
            "시나리오 라이터(Pro). 대본, 각본을 Markdown으로 써냄(사용법은 pro.mirika.dev)",
          ),
        },
        {
          name: "stream",
          arg: "host|assist|off|go|begin|start|end|chat|comments|chatty|caller",
          help: T(
            "配信まわりを全部ここで(かたち・支度 go・本番 begin・番組・コメント・手加減)",
            "Everything streaming in one place (format, prep go, showtime begin, program, comments, holding back)",
            "直播相关全在这里(形式、准备 go、正式开播 begin、节目、评论、分寸)",
            "直播相關全在這裡(形式、準備 go、正式開播 begin、節目、留言、分寸)",
            "방송 관련은 전부 여기서(형태, 준비 go, 본방 begin, 프로그램, 댓글, 수위 조절)",
          ),
        },
        {
          name: "obs",
          arg: T(
            "connect <URL> <パスワード>|start|stop|off",
            "connect <URL> <password>|start|stop|off",
            "connect <URL> <密码>|start|stop|off",
            "connect <URL> <密碼>|start|stop|off",
            "connect <URL> <비밀번호>|start|stop|off",
          ),
          help: T(
            "OBS の遠隔操作(配信の開始・停止)",
            "Remote-control OBS (start and stop the stream)",
            "远程操控 OBS(开始、停止直播)",
            "遠端操控 OBS(開始、停止直播)",
            "OBS 원격 조작(방송 시작, 정지)",
          ),
        },
        {
          name: "radio",
          arg: T(
            "otaku|general|title <局名>|sub <英字>|freq <76-90>",
            "otaku|general|title <station>|sub <letters>|freq <76-90>",
            "otaku|general|title <电台名>|sub <英文>|freq <76-90>",
            "otaku|general|title <電台名>|sub <英文>|freq <76-90>",
            "otaku|general|title <방송국명>|sub <영문>|freq <76-90>",
          ),
          help: T(
            "番組の味付けと、OBS 背景の局名・周波数(HTML を編集せず本体から送る)",
            "The program’s flavor, plus the station name and frequency on the OBS backdrop (sent from the app, no HTML editing)",
            "节目的风味,以及 OBS 背景的电台名、频率(不用编辑 HTML,由本体发送)",
            "節目的風味,以及 OBS 背景的電台名、頻率(不用編輯 HTML,由本體發送)",
            "프로그램 맛내기와 OBS 배경의 방송국명, 주파수(HTML 편집 없이 본체에서 전송)",
          ),
        },
      ],
    },
    {
      group: T("システム", "System", "系统", "系統", "시스템"),
      items: [
        {
          name: "help",
          arg: "",
          help: T(
            "コマンド一覧を表示",
            "Show the command list",
            "显示命令一览",
            "顯示指令一覽",
            "명령 목록 표시",
          ),
        },
        {
          name: "status",
          arg: "",
          help: T(
            "いまの設定を表示",
            "Show current settings",
            "显示当前设置",
            "顯示目前設定",
            "지금 설정 표시",
          ),
        },
        {
          name: "check",
          arg: "",
          help: T(
            "システムチェック(アプリとPCの健康状態)",
            "System check (health of the app and your PC)",
            "系统检查(应用与电脑的健康状态)",
            "系統檢查(應用程式與電腦的健康狀態)",
            "시스템 체크(앱과 PC의 건강 상태)",
          ),
        },
        {
          name: "sync",
          arg: T(
            "export|import|cloud <合言葉>|identity on|off",
            "export|import|cloud <passphrase>|identity on|off",
            "export|import|cloud <口令>|identity on|off",
            "export|import|cloud <口令>|identity on|off",
            "export|import|cloud <암호>|identity on|off",
          ),
          help: T(
            "記憶と人格を暗号化して持ち出す・別のPCで取り込む(置き場は自分のクラウドなら無料、預けるなら Pro。cloud は off と言うまで15分ごとに自動で合わせる)",
            "Encrypt memories and persona to carry out, and import on another PC (a storage home on your own cloud is free; entrusting it is Pro. cloud keeps syncing every 15 min until you say off)",
            "把记忆与人格加密带走、在别的电脑导入(存放处用自己的云端则免费,托管则是 Pro。cloud 会每 15 分钟自动同步,直到说 off)",
            "把記憶與人格加密帶走、在別的電腦匯入(存放處用自己的雲端則免費,託管則是 Pro。cloud 會每 15 分鐘自動同步,直到說 off)",
            "기억과 인격을 암호화해 갖고 나가기, 다른 PC에서 불러오기(보관처가 내 클라우드면 무료, 맡기면 Pro. cloud 는 off 라고 할 때까지 15분마다 자동으로 맞춤)",
          ),
        },
        {
          name: "pro",
          arg: T("[キー|off]", "[key|off]", "[密钥|off]", "[金鑰|off]", "[키|off]"),
          help: T(
            "Pro をアンロック(ライセンスキー)",
            "Unlock Pro (license key)",
            "解锁 Pro(许可密钥)",
            "解鎖 Pro(授權金鑰)",
            "Pro 잠금 해제(라이선스 키)",
          ),
        },
        {
          name: "org",
          arg: T(
            "join <組織キー> [利用者ID]|leave",
            "join <org key> [user ID]|leave",
            "join <组织密钥> [用户 ID]|leave",
            "join <組織金鑰> [使用者 ID]|leave",
            "join <조직 키> [사용자 ID]|leave",
          ),
          help: T(
            "組織に登録する(エンタープライズ。方針は毎日こちらで受け取る)",
            "Register with an organization (Enterprise; policy is received here daily)",
            "登记到组织(企业版。方针每天在这边接收)",
            "登記到組織(企業版。方針每天在這邊接收)",
            "조직에 등록(엔터프라이즈. 방침은 매일 이쪽에서 수신)",
          ),
        },
        {
          name: "credits",
          arg: "[open]",
          help: T(
            "クレジットとライセンス表記",
            "Credits and license notices",
            "制作名单与许可声明",
            "製作名單與授權聲明",
            "크레딧과 라이선스 표기",
          ),
        },
        {
          name: "log",
          arg: "file",
          help: T(
            "会話ログを別窓で読み返す。file で動作ログの場所(不具合報告用・秘密は伏せ字・7日分)",
            "Reread chat logs in another window; file shows where app logs live (for bug reports, secrets masked, 7 days)",
            "在另一窗口回看会话日志。file 显示运行日志的位置(供报告问题,秘密已打码,留 7 天)",
            "在另一視窗回看對話日誌。file 顯示運作日誌的位置(供回報問題,秘密已遮蔽,留 7 天)",
            "대화 로그를 다른 창에서 다시 읽기. file 은 동작 로그 위치(문제 신고용, 비밀은 가림, 7일치)",
          ),
        },
        {
          name: "folder",
          arg: "",
          help: T(
            "設定フォルダを開く(settings.json / memory.db)",
            "Open the settings folder (settings.json / memory.db)",
            "打开设置文件夹(settings.json / memory.db)",
            "打開設定資料夾(settings.json / memory.db)",
            "설정 폴더 열기(settings.json / memory.db)",
          ),
        },
        {
          name: "hud",
          arg: "on|off",
          help: T(
            "デバッグ表示(HUD)",
            "Debug overlay (HUD)",
            "调试显示(HUD)",
            "除錯顯示(HUD)",
            "디버그 표시(HUD)",
          ),
        },
        {
          name: "settings",
          arg: "",
          help: T(
            "詳細設定を開く(音量・秘書・音楽フォルダなど。右クリックメニューからも)",
            "Open detailed settings (volume, secretary, music folders, etc.; also from the right-click menu)",
            "打开详细设置(音量、秘书、音乐文件夹等。右键菜单也能进)",
            "打開詳細設定(音量、秘書、音樂資料夾等。右鍵選單也能進)",
            "상세 설정 열기(음량, 비서, 음악 폴더 등. 우클릭 메뉴에서도)",
          ),
        },
        {
          name: "lang",
          arg: "ja|en|zh-cn|zh-tw|ko",
          help: T(
            "表示と会話の言語",
            "Language for the UI and conversation",
            "界面与对话的语言",
            "介面與對話的語言",
            "표시와 대화의 언어",
          ),
        },
        {
          name: "sakura",
          arg: T("<スクリプト>", "<script>", "<脚本>", "<腳本>", "<스크립트>"),
          help: T(
            "さくらスクリプト再生(\\\\0\\\\1話者・\\\\s[n]表情・\\\\e。SSTPでも受信)",
            "Play Sakura Script (\\\\0\\\\1 speakers, \\\\s[n] expressions, \\\\e; also received over SSTP)",
            "播放 Sakura Script(\\\\0\\\\1 说话者、\\\\s[n] 表情、\\\\e。也能经 SSTP 接收)",
            "播放 Sakura Script(\\\\0\\\\1 說話者、\\\\s[n] 表情、\\\\e。也能經 SSTP 接收)",
            "사쿠라 스크립트 재생(\\\\0\\\\1 화자, \\\\s[n] 표정, \\\\e. SSTP로도 수신)",
          ),
        },
        {
          name: "communicate",
          arg: T("<ことば>", "<words>", "<话语>", "<話語>", "<말>"),
          help: T(
            "同じPCの他のゴーストに話しかける(SSTP コミュニケート)",
            "Talk to other ghosts on the same PC (SSTP communicate)",
            "向同一台电脑上的其他幽灵搭话(SSTP communicate)",
            "向同一台電腦上的其他幽靈搭話(SSTP communicate)",
            "같은 PC의 다른 고스트에게 말 걸기(SSTP 커뮤니케이트)",
          ),
        },
        {
          name: "ghost",
          arg: T("new <名前>|list", "new <name>|list", "new <名字>|list", "new <名字>|list", "new <이름>|list"),
          help: T(
            "別の子をもう一体立てる(マルチゴースト。Pro)",
            "Set up one more companion (multi-ghost; Pro)",
            "再立一个别的孩子(多幽灵。Pro)",
            "再立一個別的孩子(多幽靈。Pro)",
            "다른 아이를 한 명 더 세우기(멀티 고스트. Pro)",
          ),
        },
      ],
    },
  ];
}
