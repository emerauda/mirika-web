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
                <>起動すると、既定の子(Victoria Rubin)がデスクトップの右下に立ちます</>,
                <>
                  頭脳(LLM)をつなぐ。<C>Ollama</C> か <C>LM Studio</C> を起動していれば自動で見つかります。
                  何も無ければ右クリックメニューの「頭脳」→「内蔵エンジン」でその場に用意できます
                </>,
                <>入力欄に話しかける。声を出したいなら VOICEVOX か AivisSpeech を入れておくだけで喋ります</>,
              ]}
            />
            <Note>
              <strong className="text-cream">操作のきほん</strong> — キャラを掴んでドラッグで移動、
              ダブルクリックで .vrm を開く、右クリックでメニュー。撫でると反応します。
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
              <C>/brain embedded</C> か右クリックメニューから。node-llama-cpp のモデルを落として、
              アプリの中だけで動きます。GGUF を持っているなら「GGUF を開く…」でそれを使えます。
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
              声の一覧は <C>/voices</C>、変更は <C>/voice &lt;ID&gt;</C>(相方は <C>/voice2</C>)。
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
              相方の身体は <C>/shell2</C> で別に選べます。
            </P>
          </section>

          {/* --- 人格と記憶 --- */}
          <section className="mb-16">
            <H2 id="persona">人格と記憶</H2>
            <P>
              名前は <C>/name</C>、一人称は <C>/first</C>、性格は <C>/persona &lt;説明&gt;</C> で書き換えます。
              サンプルから選ぶなら <C>/persona sample</C>(元気な幼なじみ・ツンデレ・執事風など)。
              相方側はそれぞれ <C>/partner</C> <C>/first2</C> <C>/persona2</C>。
            </P>
            <P>
              <strong className="text-cream">設定メモ</strong>(<C>/lore add &lt;キー&gt; &lt;内容&gt;</C>)に入れた言葉は、
              話題に出たとき確実に思い出します。キーは <C>/…/</C> で正規表現にもできます。
            </P>
            <P>
              会話は SQLite に長期記憶として残り、夜のあいだに整理されます。
              関係の深さは <C>/bond</C> で見られます。2日以上前の話も、聞けば思い出して答えます。
            </P>
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
            <P>
              Claude Desktop や VS Code から Mirika 経由でツールを使う「伝言」も可能です
              (ブリッジは <C>127.0.0.1:9801</C>。使用中なら 9821 → 8801 に自動で譲ります)。
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
              <C>/streamer on</C> で任意ラヂヲ風のラジオ番組モードに入り、<C>/live start</C> で番組が開きます。
              締めは <C>/live end</C>(合言葉「えんいー」で終わってスタンバイへ)。
            </P>
            <P>
              コーナーはお便り・大喜利・豆知識・架空CM・お悩み相談・脳内ランキング・三択クイズ・即興ドラマに加えて、
              <strong className="text-cream">即興ソング・作詞対決・お絵かき・イラストお題</strong>があり、
              前振りの掛け合いのあとに実際に歌い、描きます。
            </P>
            <P>
              <C>/live start &lt;ライブURL&gt;</C> で YouTube ライブのコメントを拾って読み上げます
              (スーパーチャットは最優先)。番組の味付けは <C>/radio otaku</C> でオタク特化パックに切り替えられます。
            </P>
            <H3>OBS に載せる</H3>
            <P>
              <C>obs/radio-bg.html</C> をブラウザソースに指定すると、スタジオ風の背景に
              ON AIR ランプ・いまのコーナー・テロップ・音声クレジットが自動で出ます。
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
              Pro は買い切りで、<strong className="text-cream">配信者モード・ネットラジオ・Spotify 連携・マルチゴースト</strong>がアンロックされます。
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
                  に注文番号を入れてライセンスキーを受け取る
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
                  <table className="w-full text-sm border-collapse">
                    <tbody>
                      {group.items.map((cmd) => (
                        <tr key={cmd.name} className="border-b border-cream/5 align-top">
                          <td className="py-2 pr-4 whitespace-nowrap font-mono text-cream">
                            /{cmd.name}
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
