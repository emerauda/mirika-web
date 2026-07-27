/**
 * スラッシュコマンド全件。アプリ本体の SLASH_COMMANDS(apps/desktop/src/main/index.ts)
 * から書き起こしたもので、/help に出るものと同じ並び・同じ説明。
 */
export type Cmd = { name: string; arg: string; help: string };

export const COMMAND_GROUPS: Array<{ group: string; items: Cmd[] }> = [
  {
    group: "頭脳",
    items: [
      { name: "brain", arg: "embedded|external|local|chatgpt|claude|gemini|grok [APIキー]", help: "頭脳の切替(ローカル/クラウド。/brain claude はサブスクでも可)" },
      { name: "model", arg: "<名前>", help: "外部ランタイムのモデルを選ぶ" },
      { name: "endpoint", arg: "[URL]", help: "外部ランタイムの接続先(空で自動)" },
      { name: "rescan", arg: "", help: "ローカル LLM を再検索" },
      { name: "cloud", arg: "<質問>", help: "この1問だけクラウド頭脳で考える(ふだんの頭脳はそのまま)" },
    ],
  },
  {
    group: "キャラ",
    items: [
      { name: "bond", arg: "", help: "この子との関係を見る(出会って何日・なかよし度)" },
      { name: "lore", arg: "add|remove …", help: "ことばに反応する設定メモ(確実に思い出す)" },
      { name: "name", arg: "<名前>", help: "この子の名前を変える" },
      { name: "first", arg: "<一人称>", help: "一人称を変える(わたし/ぼく等)" },
      { name: "persona", arg: "[説明|reset]", help: "この子の性格を見る・書き換える" },
      { name: "package", arg: "export|import|list|use <名前>", help: "この子ひとりぶんを1ファイルに(.mirika)。手持ちの一覧と着替えも" },
      { name: "card", arg: "[ファイル|undo|reset]", help: "キャラクターカード(V2/V3)を取り込む(undo で1段戻す・reset で読む前に戻す)" },
      { name: "vrm", arg: "", help: "この子の VRM を開いて着替える" },
      { name: "partner", arg: "[名前]", help: "相方の名前を変える(空で既定に戻す)" },
      { name: "first2", arg: "<一人称>", help: "相方の一人称を変える" },
      { name: "persona2", arg: "[説明|reset|sample <名前>]", help: "相方の性格を見る・書き換える" },
      { name: "summon", arg: "", help: "相方の VRM を開いて呼ぶ" },
      { name: "dismiss", arg: "", help: "相方を帰す" },
      { name: "draw", arg: "[お題|api <URL>|cloud on|off]", help: "絵を描く(ローカルの画像生成APIか、つないでいるクラウド。無ければ手描き)" },
      { name: "sing", arg: "[お題]", help: "歌う(VOICEVOX の歌唱ボイスが要る)" },
    ],
  },
  {
    group: "声とマイク",
    items: [
      { name: "voice", arg: "ID|on|off", help: "本体の声(VOICEVOX/AivisSpeech)" },
      { name: "voice2", arg: "ID|off", help: "相方の声" },
      { name: "voices", arg: "", help: "使える声の一覧" },
      { name: "tts", arg: "URL|off [モデル] [声]", help: "OpenAI互換TTS(kokoro・GPT-SoVITS等の音声クローン)に切替" },
      { name: "tts2", arg: "声|off", help: "相方のTTSの声" },
      { name: "piper", arg: "", help: "内蔵音声(Piper)をDLして有効化(英語・中国語等・完全ローカル)" },
      { name: "read", arg: "<語> <よみ>", help: "読み上げの誤読を登録(一覧は /read)" },
      { name: "audio", arg: "番号|名前|default", help: "声の出力先(仮想ケーブル等)" },
      { name: "mic", arg: "ptt|always|model <名前>", help: "マイク入力(方式と聞き取りモデル)" },
      { name: "bgm", arg: "folder <フォルダ>|play [曲名・局名]|stations|next|stop|volume", help: "BGM(ローカル曲+ネットラジオ。配信中はフォルダの曲のみ・OBSにクレジット)" },
      { name: "spotify", arg: "<クライアントID>|off", help: "Spotify連携(手元のSpotifyアプリを選曲・操作。要Premium)" },
    ],
  },
  {
    group: "見た目と動作",
    items: [
      { name: "quickreply", arg: "on|off", help: "返事の候補ボタン" },
      { name: "shell", arg: "vrm|live2d|card [ファイル|default|hiyori|mao]", help: "本体の身体を切替(VRM/Live2D/カードの立ち絵)" },
      { name: "shell2", arg: "vrm [ファイル] | off", help: "相方の身体(VRM 着替え・帰す)" },
      { name: "effects", arg: "on|off", help: "季節の演出(桜・紅葉・雪、実際の雨・雪を優先)" },
      { name: "season", arg: "spring|summer|autumn|winter|auto", help: "季節を固定 / 自動" },
      { name: "sit", arg: "", help: "手前の窓のふちに座る/降りる(Windows)" },
      { name: "chime", arg: "on|off", help: "時報" },
      { name: "balloon", arg: "[倍率]", help: "吹き出しの大きさの好み(既定0.8。窓に合わせた自動調整に掛ける)" },
      { name: "size", arg: "<小|中|大|特大|巨大|極大 or 幅x高>", help: "ウィンドウサイズ" },
      { name: "speed", arg: "slow|normal|fast|<ms>", help: "吹き出しのタイプ速度" },
      { name: "perf", arg: "eco|normal|60|high", help: "パフォーマンスモード" },
    ],
  },
  {
    group: "AI秘書",
    items: [
      { name: "auto", arg: "add|remove …", help: "毎日決まった時刻の定期アクション" },
      { name: "home", arg: "remo <トークン>|switchbot <トークン> <シークレット>|list|off", help: "家電の操作(Nature Remo / SwitchBot に直接つなぐ。Pro)" },
      { name: "mcp", arg: "add <名前> <コマンド…|URL [トークン]>|remove <名前>|tools", help: "MCPサーバー接続(gmail / calendar / drive はGoogle純正プリセット。URL でリモートにも繋がる=Pro)" },
      { name: "pomo", arg: "start [作業分] [休憩分]|stop", help: "ポモドーロ(作業と休憩の切替をキャラが声かけ。既定25分+5分)" },
      { name: "rag", arg: "<フォルダ>|find <ことば>|reindex|off", help: "資料フォルダを索引(ローカル全文検索。「メモどこだっけ」に答える)" },
      { name: "secretary", arg: "on|off|interval <分>|now|brief", help: "定期チェックときょうのブリーフィング(メール・予定・タスク・天気)" },
      { name: "todo", arg: "add <内容> [@期限]|done <番号>|remove <番号>", help: "タスクを預ける(期限が近いと知らせる。会話でも追加できる)" },
      { name: "screen", arg: "watch on|off", help: "いまの画面を見てもらう(「画面を見て」でも可)。watch で見守り(オプトイン)" },
      { name: "snip", arg: "", help: "範囲を切り取って見せる(📷ボタン/Alt+Shift+M。クリップボード+保存)" },
      { name: "attach", arg: "", help: "ファイルを添えて指示する(📎ボタン。画像・テキスト)" },
      { name: "clipboard", arg: "on|off", help: "コピーしたエラーへのひとこと反応(既定オフ)" },
    ],
  },
  {
    group: "配信",
    items: [
      { name: "streamer", arg: "on|off", help: "配信者モード(番組は /live start 〜 /live end のキュー式)" },
      { name: "live", arg: "start [URL]|end|reset|chat <URL|off>", help: "ライブ配信の制御(開始・締め・仕切り直し・コメント連携。いまはYouTube対応)" },
      { name: "radio", arg: "otaku|general|title <局名>|sub <英字>|freq <76-90>", help: "番組の味付けと、OBS 背景の局名・周波数(HTML を編集せず本体から送る)" },
      { name: "stage", arg: "on|off", help: "ステージ窓(Discord画面共有向け・OBS不要)" },
    ],
  },
  {
    group: "システム",
    items: [
      { name: "help", arg: "", help: "コマンド一覧を表示" },
      { name: "status", arg: "", help: "いまの設定を表示" },
      { name: "check", arg: "", help: "システムチェック(アプリとPCの健康状態)" },
      { name: "sync", arg: "export|import|cloud <合言葉>|identity on|off", help: "記憶と人格を暗号化して持ち出す・別のPCで取り込む(置き場は自分のクラウドなら無料、預けるなら Pro)" },
      { name: "pro", arg: "[キー|off]", help: "Pro をアンロック(ライセンスキー)" },
      { name: "credits", arg: "[open]", help: "クレジットとライセンス表記" },
      { name: "log", arg: "", help: "会話ログを別窓で読み返す(バックログ)" },
      { name: "folder", arg: "", help: "設定フォルダを開く(settings.json / memory.db)" },
      { name: "hud", arg: "on|off", help: "デバッグ表示(HUD)" },
      { name: "settings", arg: "", help: "詳細設定を開く(音量・秘書・音楽フォルダなど。右クリックメニューからも)" },
      { name: "lang", arg: "ja|en|zh-cn|zh-tw|ko", help: "表示と会話の言語" },
      { name: "sakura", arg: "<スクリプト>", help: "さくらスクリプト再生(\\\\0\\\\1話者・\\\\s[n]表情・\\\\e。SSTPでも受信)" },
      { name: "communicate", arg: "<ことば>", help: "同じPCの他のゴーストに話しかける(SSTP コミュニケート)" },
      { name: "ghost", arg: "new <名前>|list", help: "別の子をもう一体立てる(マルチゴースト。Pro)" },
    ],
  },
];
