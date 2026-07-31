import { useEffect, useState } from 'react';
import { COMMAND_GROUPS } from './docs-commands';
import { Reveal } from './primitives';

/**
 * 使い方ドキュメント。トップページとは別の読み物として、導入から
 * 各機能・全スラッシュコマンド・困ったときまでを一枚で通す。
 */

type Section = { id: string; title: string };

const SECTIONS: Section[] = [
  { id: 'start', title: 'はじめに' },
  { id: 'brain', title: '頭脳(LLM)をつなぐ' },
  { id: 'voice', title: '声とマイク' },
  { id: 'body', title: '身体(シェル)' },
  { id: 'persona', title: '人格と記憶' },
  { id: 'secretary', title: 'AI秘書' },
  { id: 'ukagaka', title: '伺か互換' },
  { id: 'card', title: 'キャラクターカード' },
  { id: 'play', title: '歌とお絵かき' },
  { id: 'ghosts', title: 'マルチゴースト' },
  { id: 'stream', title: '配信者モード' },
  { id: 'pro', title: 'Pro とライセンス' },
  { id: 'commands', title: 'コマンド一覧' },
  { id: 'dev', title: '開発者向け' },
  { id: 'trouble', title: '困ったとき' },
];

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-28 font-mincho text-2xl sm:text-3xl font-bold mb-4">
      {children}
    </h2>
  );
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="font-bold text-cream mt-8 mb-2 text-lg">{children}</h3>;
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-mist leading-relaxed mb-4">{children}</p>;
}

function C({ children }: { children: React.ReactNode }) {
  return (
    <code className="font-mono text-[0.9em] text-sakura bg-paper/60 px-1.5 py-0.5 rounded">
      {children}
    </code>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-5 rounded-lg border-l-2 border-sakura/50 bg-paper/40 px-4 py-3 text-sm text-mist leading-relaxed">
      {children}
    </div>
  );
}

function Pro() {
  return (
    <span className="ml-2 align-middle font-mono text-[10px] tracking-wide text-sakura border border-sakura/40 rounded px-1.5 py-0.5">
      PRO
    </span>
  );
}

function Steps({ items }: { items: React.ReactNode[] }) {
  return (
    <ol className="mb-4 space-y-2">
      {items.map((item, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: 手順は固定で並び替えも起きない
        <li key={i} className="flex gap-3 text-mist leading-relaxed">
          <span className="font-mono text-xs text-sakura pt-1 shrink-0">{String(i + 1).padStart(2, '0')}</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

export function Docs() {
  const [active, setActive] = useState(SECTIONS[0].id);

  // 読んでいる位置に合わせて目次をハイライトする
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-20% 0px -70% 0px' },
    );
    for (const s of SECTIONS) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 pt-28 pb-24">
      <Reveal>
        <a href="/" className="font-mono text-xs text-mist hover:text-sakura transition-colors">
          ← mirika.dev
        </a>
        <h1 className="mt-4 font-mincho text-4xl sm:text-5xl font-bold">使い方</h1>
        <p className="mt-3 text-mist leading-relaxed max-w-2xl">
          インストールしてからできることを、ひととおり。
          迷ったらアプリのチャット欄で <C>/help</C> と打てば、同じ一覧がその場に出ます。
        </p>
      </Reveal>

      <div className="mt-14 grid lg:grid-cols-[200px_1fr] gap-10">
        {/* 目次 */}
        <nav className="hidden lg:block">
          <div className="sticky top-28 space-y-1">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className={`block font-mono text-xs py-1.5 border-l pl-3 transition-colors ${
                  active === s.id
                    ? 'text-sakura border-sakura'
                    : 'text-mist border-cream/10 hover:text-cream'
                }`}
              >
                {s.title}
              </a>
            ))}
          </div>
        </nav>

        <article className="min-w-0">
          {/* --- はじめに --- */}
          <section className="mb-16">
            <H2 id="start">はじめに</H2>
            <P>
              Mirika はデスクトップに常駐するキャラクター(ゴースト)です。
              既定の構成は完全ローカルで、API 費はかからず、会話は端末の外に出ません。
            </P>
            <Steps
              items={[
                <>
                  <a href="/#download" className="text-sakura hover:underline">
                    ダウンロード
                  </a>
                  してインストールする(Windows / Linux。macOS は署名対応まで準備中)
                </>,
                <>
                  起動すると、既定の子(コマネ)がデスクトップの右下に立ちます。同梱の VRM は
                  本体「コマネ」・相方「チセ(TKSP)」で、どちらも{' '}
                  <a href="https://goho-cheat-vrc.booth.pm/" target="_blank" rel="noreferrer">
                    VRC合法チート研究会
                  </a>{' '}
                  さまの作品を許諾をいただいて同梱しています(モデルの再頒布は不可)
                </>,
                <>
                  頭脳(LLM)をつなぐ。<C>Ollama</C> か <C>LM Studio</C> を起動していれば自動で見つかります。
                  何も無ければ右クリックメニューの「頭脳」→「内蔵エンジン」でその場に用意できます
                </>,
                <>入力欄に話しかける。声を出したいなら VOICEVOX か AivisSpeech を入れておくだけで喋ります</>,
              ]}
            />
            <Note>
              <strong className="text-cream">操作のきほん</strong> — 掴んでドラッグで移動、右クリックでメニュー。
              <C>.vrm</C> は窓に落とすと着替えます(ダブルクリックには何も割り当てていません)。
              撫でるのは<strong className="text-cream">頭や胸のあたりで手を往復させたときだけ</strong>で、
              通り過ぎただけでは反応しません(しまってある間や全画面アプリの下では数えません)。
              しばらく引っ込んでほしいときはメニューの「しまう」、戻すときはトレイのアイコンから。
              入力欄で <C>/</C> を打つとコマンド候補が出ます(↑↓ で選択、Tab / Enter で補完)。
              候補が出ていないときの ↑↓ は入力履歴です。
            </Note>
          </section>

          {/* --- 頭脳 --- */}
          <section className="mb-16">
            <H2 id="brain">頭脳(LLM)をつなぐ</H2>
            <P>接続は3段構えです。どれもチャット欄から切り替えられます。</P>
            <H3>内蔵エンジン(いちばん手軽)</H3>
            <P>
              <C>/brain embedded</C> か右クリックメニューから。アプリの中だけで動きます。
              モデルは<strong className="text-cream">お使いの PC に載る大きさが自動で選ばれます</strong> —— VRAM
              8GB 級なら Gemma 4 12B(4bit・約6.7GB)、そこまで無ければ E4B(約5GB)、E2B(約3GB)と下がります。
              16GB・24GB 級の GPU をお持ちなら、<strong className="text-cream">もっと大きいものを落とすかどうかお尋ねします</strong>(26B-A4B / 31B)。
              選んだ理由は動作ログに残ります。GGUF をお持ちなら「GGUF を開く…」でそれを使えます。
            </P>
            <H3>ローカルランタイム(推奨)</H3>
            <P>
              Ollama(11434)と LM Studio(1234)は<strong className="text-cream">起動していれば自動検出</strong>されます。
              モデルを選ぶのは <C>/model &lt;名前&gt;</C>、接続先を手で決めるなら <C>/endpoint &lt;URL&gt;</C>、
              探し直しは <C>/rescan</C>。
            </P>
            <H3>クラウド(任意・オプトイン)</H3>
            <P>
              <C>/brain chatgpt &lt;APIキー&gt;</C> のように1コマンドで。Claude・Gemini・Grok も同じ形です。
              Claude は API キー無しでも <C>/brain claude</C> で Claude Code CLI のサブスク認証が使えます。
              ふだんはローカルのまま、この1問だけクラウドで考えてほしいときは <C>/cloud &lt;質問&gt;</C>。
            </P>
            <Note>API キーは OS のセーフストレージで暗号化して保存されます(<C>enc:</C> 形式)。</Note>
          </section>

          {/* --- 声 --- */}
          <section className="mb-16">
            <H2 id="voice">声とマイク</H2>
            <H3>喋らせる</H3>
            <P>
              <strong className="text-cream">日本語</strong>は{' '}
              <a href="https://voicevox.hiroshiba.jp/" className="text-sakura hover:underline">
                VOICEVOX
              </a>{' '}
              か{' '}
              <a href="https://aivis-project.com/" className="text-sakura hover:underline">
                AivisSpeech
              </a>{' '}
              を入れておくだけ。Mirika がエンジンを裏で起動・終了します。
              声の一覧は <C>/voice list</C>、変更は <C>/voice &lt;ID&gt;</C>(相方は <C>/partner voice</C>)。
              誤読は <C>/read 早急 さっきゅう</C> のように直せます。
            </P>
            <P>
              <strong className="text-cream">英語・中国語</strong>は内蔵 Piper。<C>/piper</C> で必要なぶんだけ落とします。
              <strong className="text-cream">韓国語</strong>はローカル音声が無いので字幕のみ(無音)です。
            </P>
            <H3>TTS API で上書きする</H3>
            <P>
              <C>/tts &lt;ベースURL&gt; [モデル]</C> で OpenAI 互換の音声合成を指すと、
              <strong className="text-cream">韓国語を含む全言語</strong>をその声で喋ります(kokoro・GPT-SoVITS など)。
              URL を入れると声の一覧が取得され、設定画面の本体・相方のドロップダウンから選べます。戻すのは <C>/tts off</C>。
            </P>
            <H3>聞き取り</H3>
            <P>
              入力欄の🎤を押して話す(プッシュトゥトーク)か、<C>/mic always</C> で常時待機。
              待機中は名前で呼びかけた発話だけを拾います。モデルは PC 性能から自動選択され、<C>/mic model</C> で変更できます。
            </P>
            <P>
              <strong className="text-cream">音声ファイル</strong>(mp3 / wav / m4a / ogg / opus / flac)を
              ドラッグ&ドロップすると、丸ごと文字起こしして<strong className="text-cream">要約と感想</strong>を返します
              (最長15分。精度はマイクと同じ Whisper モデル次第)。
            </P>
          </section>

          {/* --- 身体 --- */}
          <section className="mb-16">
            <H2 id="body">身体(シェル)</H2>
            <P>本体と相方それぞれ、3種類の身体から選べます(混在も可)。</P>
            <H3>VRM(3D)</H3>
            <P>
              <C>/shell vrm [ファイル.vrm]</C>。<C>.vrm</C> をキャラにドロップしても着替えます。
              既定に戻すのは <C>/shell vrm default</C>。<C>.vrma</C> をドロップするとモーションを試せます。
            </P>
            <H3>Live2D</H3>
            <P>
              <C>/shell live2d [hiyori|mao]</C>。公式サンプルの桃瀬ひより・Mao を同梱しています
              (v1 は同梱モデル固定)。
            </P>
            <H3>カードシェル(立ち絵)</H3>
            <P>
              キャラクターカードの PNG を取り込むと<strong className="text-cream">その絵が身体になります</strong>。
              好きな画像を立たせるなら <C>/shell card &lt;画像.png&gt;</C>。透過 PNG は切り抜きのまま立ち、
              呼吸の上下・喋るときの弾みで生きて見えます。3D に戻すのは <C>/shell vrm</C>。
            </P>
            <H3>相方を呼ぶ</H3>
            <P>
              <C>/summon</C> で相方が並び、二人の掛け合いになります。帰すのは <C>/dismiss</C>。
              相方の身体は <C>/partner shell</C> で別に選べます。
            </P>
          </section>

          {/* --- 人格と記憶 --- */}
          <section className="mb-16">
            <H2 id="persona">人格と記憶</H2>
            <P>
              名前は <C>/name</C>、一人称は <C>/first</C>、性格は <C>/persona &lt;説明&gt;</C> で書き換えます。
              サンプルから選ぶなら <C>/persona sample</C>(元気な幼なじみ・ツンデレ・執事風など)。
              相方側はそれぞれ <C>/partner</C> <C>/partner first</C> <C>/partner persona</C>。
            </P>
            <P>
              <strong className="text-cream">設定メモ</strong>(<C>/lore add &lt;キー&gt; &lt;内容&gt;</C>)に入れた言葉は、
              話題に出たとき確実に思い出します。キーは <C>/…/</C> で正規表現にもできます。
            </P>
            <P>
              会話は SQLite に長期記憶として残り、夜のあいだに整理されます。
              関係の深さは <C>/bond</C> で見られます。2日以上前の話も、聞けば思い出して答えます。
            </P>
            <H3>記憶ごと、別の端末へ(同期)</H3>
            <P>
              <C>/sync export</C> で記憶も名前・性格も、合言葉で暗号化した1ファイルになり、
              別の PC の <C>/sync import</C> で取り込めます。取り込みは突き合わせなので、
              どちらかにしかない会話も消えません。<C>/sync cloud &lt;合言葉&gt;</C> にすると
              15分ごとに自動で合います(置き場は自分のクラウドの同期フォルダなら無料、
              こちらの預かり棚は Pro)。<strong className="text-cream">合言葉はどこにも保存されません</strong> —
              忘れると開けなくなります。
            </P>
            <figure className="my-6 rounded-lg overflow-hidden border border-cream/10">
              <img
                src="/shots/settings-sync.webp"
                alt="詳細設定の記憶の同期。合言葉、書き出しと取り込み、記憶の置き場"
                className="block w-full h-auto"
                loading="lazy"
              />
              <figcaption className="px-4 py-2.5 text-xs text-sub bg-paper/40">
                詳細設定の「記憶の同期」。書き出し・取り込み・置き場の選択は、ここからも操作できます
              </figcaption>
            </figure>
          </section>

          {/* --- AI秘書 --- */}
          <section className="mb-16">
            <H2 id="secretary">AI秘書</H2>
            <P>
              MCP でつなぐと、人格を通した秘書になります。Gmail・カレンダー・Drive は
              <C>/mcp add gmail</C> のようにプリセット名だけで繋がります(初回はブラウザで Google の同意画面)。
            </P>
            <P>
              タスクは <C>/todo</C>、定期チェックと「きょうのブリーフィング」は <C>/brief</C>、
              端末内の全文検索(ローカル RAG)は <C>/rag &lt;フォルダ&gt;</C>。
              画面を見せるなら <C>/see</C>、見守りは <C>/watch</C>。
            </P>
            <figure className="my-6 rounded-lg overflow-hidden border border-cream/10">
              <img
                src="/shots/settings-secretary.webp"
                alt="詳細設定の AI 秘書。定期チェック、ブリーフィング、画面の見守り、メールの見張り"
                className="block w-full h-auto"
                loading="lazy"
              />
              <figcaption className="px-4 py-2.5 text-xs text-sub bg-paper/40">
                詳細設定の「AI 秘書」。定期チェックの間隔も、見守りの入り切りも、ここからそのまま決められます
              </figcaption>
            </figure>
            <P>
              Claude Desktop や VS Code から Mirika 経由でツールを使う「伝言」も可能です
              (ブリッジは <C>127.0.0.1:9801</C>。使用中なら 9821 → 8801 に自動で譲ります)。
            </P>
            <H3>POP メールの見張り(Free)</H3>
            <P>
              Google 連携を使わなくても、<C>/mail pop &lt;ホスト[:ポート]&gt; &lt;ユーザー&gt; &lt;パスワード&gt;</C>{' '}
              で「メールが来たら教えて」が成立します。POP over SSL(既定 995)のあるプロバイダなら
              どこでも使えて、読むのは<strong className="text-cream">ヘッダ(差出人と件名)だけ</strong> —
              本文は取らず、受信箱の状態も変えません。新着は定期チェックの巡回で知らせます。
            </P>
            <P>
              <strong className="text-cream">Yahoo! メール(日本)の例</strong>:
            </P>
            <Steps
              items={[
                <>Yahoo! メールの設定で <C>IMAP/POP/SMTP アクセス</C> を有効にしておく(既定では切れています)</>,
                <>2段階認証を使っているなら、ログイン用のパスワードではなく<strong className="text-cream">アプリパスワード</strong>を発行する</>,
                <><C>/mail pop pop.mail.yahoo.co.jp あなたのYahoo!JAPAN_ID パスワード</C> —— ポートは既定の 995(SSL)のままで大丈夫です</>,
              ]}
            />
            <Note>
              他社の例: Gmail は <C>pop.gmail.com</C>、Outlook.com は{' '}
              <C>outlook.office365.com</C>(いずれも 995)。
              <strong className="text-cream">ふだんのログインパスワードではなくアプリパスワードを使ってください</strong> —
              多くのプロバイダは2段階認証を有効にしていると通常のパスワードでは弾きます。
              つながるかどうかは保存する前に確かめるので、打ち間違えても設定は残りません。
              パスワードは端末内で暗号化して保存します(OS の鍵輪が無い環境ではその旨をお伝えします)。
            </Note>
            <H3>webhook の受け口(Free)</H3>
            <P>
              <C>/webhook on</C> でトークンを発行すると、スクリプト・cron・他のアプリから{' '}
              <C>POST http://127.0.0.1:9801/webhook</C> に JSON{' '}
              <C>{'{"token","title","text"}'}</C> で知らせを届けられます。
              届いた知らせは秘書の知らせと同じく、手すきのタイミングで人格ごしに伝えます(1分に3件まで)。
            </P>
          </section>

          {/* --- 伺か互換 --- */}
          <section className="mb-16">
            <H2 id="ukagaka">伺か互換</H2>
            <P>
              旧伺かの台本(さくらスクリプト)がそのまま動きます。
              手元で試すなら <C>{'/sakura \\0\\s[0]こんにちは。\\w4\\1おい。\\e'}</C>。
              同じポートで <strong className="text-cream">SSTP(SEND / NOTIFY)を受信</strong>するので、
              SSP など既存のツールから台本を送り込めます(UTF-8 のみ)。
            </P>
            <H3>ゴースト間コミュニケート</H3>
            <P>
              同じデスクトップにいる<strong className="text-cream">他のゴーストと会話</strong>できます。
              <C>/communicate &lt;ことば&gt;</C> で隣の子に話しかけると、返ってきた台本をそのまま喋ります。
              逆に SSTP COMMUNICATE を受けたときは、この子として返事を返します
              (ユーザー個人の予定や記憶は他所の子には話しません)。
            </P>
          </section>

          {/* --- キャラクターカード --- */}
          <section className="mb-16">
            <H2 id="card">キャラクターカード</H2>
            <P>
              SillyTavern などで配られている<strong className="text-cream">キャラクターカード(V2 / V3)</strong>を、
              PNG のままドラッグ&ドロップするだけで人格として取り込めます(<C>/card &lt;ファイル&gt;</C> でも同じ)。
              JSON のカードにも対応しています。
            </P>
            <Steps
              items={[
                <>カードの PNG をキャラに落とす</>,
                <>名前・説明・性格・場面・会話例が性格設定に入り、ロアブックは設定メモ(<C>/lore</C>)へ</>,
                <>PNG のカードは<strong className="text-cream">その絵が身体になり</strong>、カードの第一声で挨拶します</>,
              ]}
            />
            <Note>
              <strong className="text-cream">上書きが心配なとき</strong> — 自分で書いた性格が入っている場合は、
              取り込む前に確認が出ます(そのままファイルに書き出してから進むこともできます)。
              取り込み後も <C>/card undo</C> で1段ずつ戻せ(5回ぶん保持)、
              <C>/card reset</C> ならカードを読む前まで一気に戻ります。
            </Note>
          </section>

          {/* --- 歌とお絵かき --- */}
          <section className="mb-16">
            <H2 id="play">歌とお絵かき</H2>
            <H3>歌う</H3>
            <P>
              <C>/sing [お題]</C> で、実際にメロディに乗せて歌います。
              歌詞はその場で作り、旋律はアプリが持つわらべうた風の音形に乗せます。
              VOICEVOX の<strong className="text-cream">歌唱対応キャラ</strong>が要ります
              (入っていないエンジンではその旨を伝えて何もしません)。
            </P>
            <H3>絵を描く</H3>
            <P>
              <C>/draw [お題]</C> で描いて、スケッチブック窓に見せてくれます。
              ローカルに画像生成 API(AUTOMATIC1111 互換。7860 / 7861)が動いていればそれで描き、
              無ければ<strong className="text-cream">丸と線で手描き</strong>します。描いた絵は設定フォルダの
              <C>drawings/</C> に残ります。
            </P>
            <P>相方がいるときは、歌い終わり・描き上がりにツッコミを入れてきます。</P>
          </section>

          {/* --- マルチゴースト --- */}
          <section className="mb-16">
            <H2 id="ghosts">
              マルチゴースト
              <Pro />
            </H2>
            <P>
              <C>/ghost new &lt;名前&gt;</C> で、いまの子とは別の子をもう一体立てられます。
              設定・記憶・性格・身体がすべて別の独立したゴーストとして並び、
              <C>/communicate</C> で互いに会話できます。
            </P>
            <P>
              一覧は <C>/ghost list</C>、同じ子をまた呼ぶなら <C>/ghost &lt;名前&gt;</C>。
              ポート(SSTP・アセット配信)は自動で譲り合い、立ち位置も重ならないようずらして置かれます。
            </P>
            <Note>
              いま立っているこの子と <C>/ghost list</C> は Free です。2体目以降を立てるのが Pro 機能になります。
              内蔵エンジンのモデルは子ごとに持つので、共有したい場合は Ollama / LM Studio を使ってください。
            </Note>
          </section>

          {/* --- 配信者モード --- */}
          <section className="mb-16">
            <H2 id="stream">
              配信者モード
              <Pro />
            </H2>
            <P>
              <C>/stream on</C> で任意ラヂヲ風のラジオ番組モードに入り、<C>/stream start</C> で番組が開きます。
              締めは <C>/stream end</C>(合言葉「えんいー」で終わってスタンバイへ)。
            </P>
            <P>
              コーナーはお便り・大喜利・豆知識・架空CM・お悩み相談・脳内ランキング・三択クイズ・即興ドラマに加えて、
              <strong className="text-cream">即興ソング・作詞対決・お絵かき・イラストお題</strong>があり、
              前振りの掛け合いのあとに実際に歌い、描きます。
            </P>
            <P>
              <C>/stream start &lt;ライブURL&gt;</C> で YouTube ライブのコメントを拾って読み上げます
              (スーパーチャットは最優先)。番組の味付けは <C>/radio otaku</C> でオタク特化パックに切り替えられます。
            </P>
            <figure className="my-6 rounded-lg overflow-hidden border border-cream/10">
              <img
                src="/shots/settings-stream.png"
                alt="詳細設定の配信まわり。配信のかたち、コメントの受け口、おしゃべり度"
                className="block w-full h-auto"
                loading="lazy"
              />
              <figcaption className="px-4 py-2.5 text-xs text-sub bg-paper/40">
                詳細設定の「配信」。かたち・コメントの受け口・おしゃべり度は、ここからも決められます
              </figcaption>
            </figure>
            <H3>ふたつの配信のかたち</H3>
            <P>
              <C>/stream host</C> は<strong className="text-cream">この子が番組を持つ</strong>形です
              (コーナー進行・歌・お絵かき・締めの「えんいー」。開始は <C>/stream start</C>)。
              <C>/stream assist</C> は<strong className="text-cream">あなたが主役で、この子が相棒席に座る</strong>形 —
              番組の台本は回さず、コメントを読み、呼ばれたときと質問のときだけ拾って返します。
              喋りすぎないことがこのモードの品質なので、配信者の声に被せないための間合いが入っています
              (手加減は <C>/stream chatty 0〜100</C>。0 は読むことに徹します)。
            </P>
            <P>
              配信開始の一連は <C>/stream go &lt;配信の内容&gt;</C> のひと言で —
              配信モードに入り、OBS の配信を開始し(<C>/obs connect</C> 済みなら)、
              告知文の下書きまで作ります。<strong className="text-cream">投稿だけは自分で押します</strong>
              (取り返しがつかないものを勝手に撃たないため。<C>/announce post</C> で投稿画面が開きます)。
            </P>
            <H3>コメントビューアと繋ぐ(棒読みちゃん互換)</H3>
            <P>
              <C>/stream comments on</C> で、棒読みちゃんと同じ受け口(TCP・既定 50001)が開きます。
              わんコメ(OneComme)やマルチコメントビューアなど、お使いのツールの
              「棒読みちゃん連携」をそのまま向けるだけで、コメントがこの子の声で流れます
              (本家と同じポートなので、同時には使えません)。
              <strong className="text-cream">配信サイトごとの対応はコメビュ側に任せます</strong> —
              YouTube も Twitch もニコ生も、わんコメが拾えるものはそのまま届きます。
              支援モード中は、読み上げるだけでなく拾って返す判断もここを通ります。
            </P>
            <H3>OBS に載せる</H3>
            <P>
              オーバーレイはダウンロードと同じリリースページに添付の
              <C>mirika-obs-overlays.zip</C> に入っています。展開して
              <C>radio-bg.html</C> をブラウザソースに指定すると、スタジオ風の背景に
              ON AIR ランプ・いまのコーナー・テロップ・音声クレジットが自動で出ます
              (机側のオーバーレイは <C>radio-desk.html</C>)。局名やテロップは
              アプリから <C>/radio title</C> で差し替えられます。
              <strong className="text-cream">お絵かきで描いた絵は右下のイーゼルに表示されます</strong>。
              キャラのウィンドウキャプチャをその上に重ねてください。
            </P>
            <Note>
              配信中は権利の都合でネットラジオ・Spotify は使えません。
              <C>/bgm folder &lt;フォルダ&gt;</C> の手持ち音源だけが流れ、
              ファイル名を <C>タイトル__作者.mp3</C> にすると OBS にクレジットが自動表示されます。
            </Note>
          </section>

          {/* --- Pro --- */}
          <section className="mb-16">
            <H2 id="pro">Pro とライセンス</H2>
            <P>
              本体は無料で使えます(専用ライセンスのフリーウェア)。
              Pro は買い切りで、<strong className="text-cream">配信者モード・シナリオライター・ネットラジオ・Spotify 連携・マルチゴースト</strong>がアンロックされます(それぞれの中身は <a href="https://pro.mirika.dev/" className="text-sakura hover:underline">pro.mirika.dev</a> に)。
            </P>
            <Steps
              items={[
                <>
                  <a href="https://emerauda.booth.pm/items/8649631" className="text-sakura hover:underline">
                    Booth
                  </a>{' '}
                  で Pro を購入する
                </>,
                <>
                  <a href="https://pro.mirika.dev/" className="text-sakura hover:underline">
                    pro.mirika.dev
                  </a>{' '}
                  に注文番号と注文日を入れてライセンスキーを受け取る
                </>,
                <>
                  アプリのチャット欄で <C>/pro &lt;キー&gt;</C> と入力する
                </>,
              ]}
            />
            <P>
              検証は完全オフライン(Ed25519 署名)なので、アンロック後はネット接続なしで使えます。
              組織で配る場合は管理ポリシー(policy.json)と監査ログのある Enterprise があります。
            </P>
          </section>

          {/* --- コマンド一覧 --- */}
          <section className="mb-16">
            <H2 id="commands">コマンド一覧</H2>
            <P>
              アプリの <C>/help</C> と同じ全 {COMMAND_GROUPS.reduce((n, g) => n + g.items.length, 0)} 件です。
              入力欄で <C>/</C> を打つと候補が出るので、覚える必要はありません。
            </P>
            {COMMAND_GROUPS.map((group) => (
              <div key={group.group} className="mb-8">
                <h3 className="font-mono text-xs text-sakura tracking-wider mb-3">{group.group}</h3>
                <div className="overflow-x-auto">
                  {/* 幅を固定する。auto のままだと、長い引数を持つ行が表を横に押し広げ、
                      説明の列が1文字ぶんまで潰れる(実際に配信の行で起きた) */}
                  <table className="w-full table-fixed text-sm border-collapse">
                    <tbody>
                      {group.items.map((cmd) => (
                        <tr key={cmd.name} className="border-b border-cream/5 align-top">
                          {/* コマンド名は折らない。引数は折る —— 折り返しを止めると、
                              引数の長いコマンドが表を横に押し広げて説明の列を潰す */}
                          <td className="py-2 pr-4 font-mono text-cream w-[46%] break-words">
                            <span className="whitespace-nowrap">/{cmd.name}</span>
                            {cmd.arg ? <span className="text-mist/70"> {cmd.arg}</span> : null}
                          </td>
                          <td className="py-2 text-mist">{cmd.help}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </section>

          {/* --- 開発者向け --- */}
          <section className="mb-16">
            <H2 id="dev">開発者向け</H2>
            <P>
              ゴーストを作って配る人・周辺ツールから Mirika に話しかけたい人のための入口です。
              仕様の詳細はリポジトリの README にもあります。
            </P>

            <H3>ゴーストを作って配る(.mirika)</H3>
            <P>
              配布形式 <C>.mirika</C> は素の zip(<C>mirika.json</C> + <C>shell/</C>)で、
              名前・性格・一人称・相方・設定メモ・身体をひとつにまとめます。
              アプリを起動しなくても、同梱スクリプトで雛形作成から検証までできます:
            </P>
            <Steps
              items={[
                <><C>node scripts/mirika-package.mjs init {'<フォルダ>'}</C> — 雛形(mirika.json と shell/)を作る</>,
                <>絵や性格を書き込んだら <C>pack</C> で 1 ファイルに固める</>,
                <><C>check</C> が「受け取る側と同じ目」で中身を検める(性格が空・素立ちが無い等を配る前に知らせる)</>,
              ]}
            />
            <Note>
              受け取る側は他人のファイルとして扱います — 書庫の外へ出るパスの拒否・長さ制限つきの正規化・
              未知項目の破棄をしたうえで取り込み、取り込み前の状態はいつでも巻き戻せます。
            </Note>

            <H3>人格回帰テスト(mirika test)</H3>
            <P>
              プロンプトや頭脳(モデル)を替えたとき、「この子らしさ」が崩れていないかを
              ゴールデン対話集で機械的に確かめます。返事は毎回ゆらぐので、文面の一致ではなく
              <C>must</C>(必ず出る言い回し)/<C>mustNot</C>(出てはいけない言い回し)の
              正規表現で判定します。失敗があれば終了コード 1 — そのまま CI に置けます。
            </P>
            <Steps
              items={[
                <><C>node scripts/mirika-test.mjs --init golden.json</C> — 対話集の雛形を作る(口調・一人称・でっち上げ抑止のサンプル入り)</>,
                <>persona と cases を自分の子に合わせて書く</>,
                <><C>node scripts/mirika-test.mjs golden.json</C> — LM Studio / Ollama を自動検出して判定(<C>--runs 3</C> でゆらぎ込みの検査)</>,
              ]}
            />
            <Note>
              スクリプトはリリース添付の <C>mirika-sdk.zip</C> にも入っています(雛形作成・検証の
              mirika-package.mjs と一緒に)。
            </Note>

            <H3>SSTP で話しかける(伺か互換)</H3>
            <P>
              TCP <C>9801</C>(使用中なら 9821 → 8801 に譲る)で <C>SEND / NOTIFY / COMMUNICATE / EXECUTE</C> を受けます。
              文字コードは送り主に合わせます — <C>Charset</C> を先に読み、無ければ化けたときに
              Shift_JIS で読み直し、応答も同じ文字コードで返します。<C>EXECUTE</C> は
              GetName / GetVersion / GetFQName に答え、受け持たない命令には正直に 204 を返します。
              手元での試し打ちは <C>/sakura {'\\0\\s[0]こんにちは。\\e'}</C> が手軽です。
            </P>

            <H3>HTTP ブリッジ(他のアプリとの連携)</H3>
            <P>
              SSTP と同じポートで HTTP も受けます。<C>MCP ブリッジ</C>として Claude Desktop・VS Code・
              Claude CLI に公開すれば、外から伝言(speak)とタスクを使えます。ブラウザ拡張は
              <C>POST /browser</C> で見ているページを共有します。どちらも 127.0.0.1 バインド+
              Host/Origin 検査つきで、閲覧中のサイトの JavaScript からは叩けません。
            </P>

            <H3>うまく動かないとき</H3>
            <P>
              <C>/check</C> で頭脳・声・マイク・秘書・記憶の状態をまとめて確認できます。
              それでも様子がおかしいときは <C>/log</C> —— <strong className="text-cream">動作ログの入ったフォルダが開きます</strong>
              (7日分・APIキーや合言葉は伏せ字)。ご報告にその日のファイルを添えていただけると、
              こちらで原因を辿れます。詳細設定の「困ったとき」からも同じフォルダを開けます。
            </P>
            <H3>遠くの身体(Display Shell)</H3>
            <P>
              <C>/display on</C> で、別の機械をこの子の身体として受け入れる口が開きます
              (合言葉つき。既定ポート 8770)。タブレット側は
              <C>GET /shell/stream</C> で繋いで、最初に配られる id で
              <C>POST /shell/say</C> に返事する — ブラウザだけで身体が書けます。
            </P>
            <P>
              約束は <strong className="text-cream">繋がっただけでは使えない</strong>形になっています。
              版の突き合わせ・合言葉・自己紹介(できることの申告)が済んで初めて指令が届き、
              まだ準備できていない相手や、その身体にできない指令は
              <strong className="text-cream">黙って捨てずに送信失敗として返します</strong>
              (「たまに喋らない身体」を作らないため)。申告しなかった能力は「できない」扱いです。
            </P>
            <H3>OBS 連携 API(SSE)</H3>
            <P>
              ポート <C>8763</C>(<C>MIRIKA_OBS_PORT</C> で変更可)の <C>/events</C> が、
              実況天気・話者・コーナー・テロップ・局名・音声と BGM のクレジット・描いた絵を Server-Sent Events
              で流します(時計はオーバーレイ側で描いています)。
              スタジオ背景と机のオーバーレイはリリース添付の <C>mirika-obs-overlays.zip</C> にあり、
              局名・周波数はアプリから <C>/radio title・sub・freq</C> で送れます(HTML の編集不要)。
            </P>

            <H3>取り込み形式の対応範囲</H3>
            <P>
              キャラクターカードは V2/V3 — PNG 埋め込み(tEXt / zTXt / 圧縮 iTXt)と素の JSON を読みます
              (<C>.charx</C> は未対応)。クラシックシェルは <C>surfaces.txt</C> の
              <C>interval,random / always / talk</C> と overlay 系・collision・着せ替えの主要仕様に対応し、
              透明はアルファ / <C>.pna</C> / 左上色の 3 方式を自動判別します。
            </P>

            <H3>環境変数と Enterprise ポリシー</H3>
            <P>
              <C>MIRIKA_RES_PORT</C>(アセット配信・既定 8764)/ <C>MIRIKA_OBS_PORT</C>(OBS 連携・既定 8763)/
              <C>MIRIKA_POLICY</C>(ポリシーファイルの場所の上書き)。組織導入では管理者配布の読み取り専用
              <C>policy.json</C>(Windows: <C>%ProgramData%\Mirika\</C>、macOS: <C>/Library/Application Support/Mirika/</C>、
              Linux: <C>/etc/mirika/</C>)がユーザー設定より優先され、クラウド禁止・接続先固定・監査ログなどを統制できます。
            </P>
          </section>

          {/* --- 困ったとき --- */}
          <section className="mb-8">
            <H2 id="trouble">困ったとき</H2>
            <H3>起動時に警告が出る</H3>
            <P>
              コード署名をまだ取得していないため、Windows では初回に SmartScreen が出ます
              (「詳細情報 → 実行」で起動)。macOS 版は署名・公証の対応まで配布を保留しています。
            </P>
            <H3>返事が返ってこない</H3>
            <P>
              <C>/check</C> でアプリと PC の状態を一覧できます(頭脳・声・マイク・秘書・ブリッジ・記憶の規模)。
              ローカル LLM が見つからないときは Ollama / LM Studio が起動しているか、
              <C>/rescan</C> で探し直してみてください。内蔵エンジンが重いときは、より小さい GGUF を選ぶと軽くなります。
            </P>
            <H3>声が出ない</H3>
            <P>
              日本語は VOICEVOX / AivisSpeech が要ります(インストールしてあれば自動で起動します)。
              英語・中国語は <C>/piper</C> で音声を落としてください。韓国語は TTS API を挿したときだけ喋ります。
              出力先は <C>/audio</C> で選べます(仮想ケーブルにも出せます)。
            </P>
            <H3>歌わない</H3>
            <P>
              歌には VOICEVOX の<strong className="text-cream">歌唱対応キャラ</strong>が必要です。
              AivisSpeech など歌唱に対応していないエンジンでは歌えません。
            </P>
            <H3>取り込んだカードを元に戻したい</H3>
            <P>
              <C>/card undo</C> で1段ずつ、<C>/card reset</C> でカードを読む前まで戻せます。
            </P>
          </section>

          <Reveal>
            <div className="mt-16 pt-8 border-t border-cream/10 flex flex-wrap gap-4 items-center">
              <a href="/" className="font-mono text-xs text-mist hover:text-sakura transition-colors">
                ← mirika.dev
              </a>
              <a
                href="https://github.com/emerauda/mirika-releases"
                className="font-mono text-xs text-mist hover:text-sakura transition-colors"
              >
                ダウンロード / リリースノート
              </a>
              <a
                href="https://pro.mirika.dev/"
                className="font-mono text-xs text-mist hover:text-sakura transition-colors"
              >
                Pro について
              </a>
            </div>
          </Reveal>
        </article>
      </div>
    </div>
  );
}
