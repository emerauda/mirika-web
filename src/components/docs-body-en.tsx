import type { ReactNode } from 'react';
import { C, H2, H3, Note, P, Pro, Steps } from './docs-ui';

/** 使い方ドキュメント本文(英語)。構成と JSX の形は docs-body-ja.tsx(正)に揃える。 */

export function DocsBodyEn({ commands, commandCount }: { commands: ReactNode; commandCount: number }) {
  return (
    <>
          {/* --- はじめに --- */}
          <section className="mb-16">
            <H2 id="start">Getting started</H2>
            <P>
              Mirika is a character (a ghost) who lives on your desktop.
              The default setup is fully local: no API fees, and your conversations never leave your machine.
            </P>
            <Steps
              items={[
                <>
                  <a href="/#download" className="text-sakura hover:underline">
                    Download
                  </a>{' '}
                  and install it (Windows / Linux; macOS is still in preparation, pending code signing)
                </>,
                <>
                  Launch it, and the default girl (Komane) stands at the bottom right of your desktop. The bundled VRMs are
                  the main ghost "Komane" and the partner "Chise (TKSP)", both works by{' '}
                  <a href="https://goho-cheat-vrc.booth.pm/" target="_blank" rel="noreferrer">
                    VRC合法チート研究会
                  </a>{' '}
                  bundled with the creator's kind permission (redistributing the models is not allowed)
                </>,
                <>
                  Connect a brain (an LLM). If <C>Ollama</C> or <C>LM Studio</C> is running, it is found automatically.
                  With neither around, "Brain" → "Built-in engine" in the right-click menu sets one up on the spot
                </>,
                <>Talk to her in the input box. If you want her to speak out loud, just install VOICEVOX or AivisSpeech and she talks</>,
              ]}
            />
            <Note>
              <strong className="text-cream">The basics</strong> — grab and drag to move her, right-click for the menu.
              Drop a <C>.vrm</C> or <C>.pmx</C> (MMD) onto her window and she changes into it (double-click has nothing assigned to it).
              Petting counts <strong className="text-cream">only when you move your hand back and forth around her head or chest</strong> —
              merely passing over her gets no reaction (and it is not counted while she is tucked away or under a fullscreen app).
              When you want her out of the way for a while, use "Tuck her away" in the menu; bring her back from the tray icon.
              Type <C>/</C> in the input box and command suggestions appear (↑↓ to select, Tab / Enter to complete).
              When no suggestions are showing, ↑↓ walks through your input history.
            </Note>
            <P>
              If you get stuck, head to{' '}<a href="#trouble" className="text-sakura hover:underline">"When something goes wrong"</a>.{' '}
              <C>/check</C> tells you the current state all at once (brain, voice, mic, secretary, memory).
            </P>
          </section>

          {/* --- 頭脳 --- */}
          <section className="mb-16">
            <H2 id="brain">Connecting a brain (LLM)</H2>
            <P>There are three tiers of connection. All of them can be switched right from the chat box.</P>
            <H3>The built-in engine (the easiest)</H3>
            <P>
              <C>/brain embedded</C>, or use the right-click menu. It runs entirely inside the app.{' '}
              <strong className="text-cream">A model sized to fit your PC is chosen automatically</strong> — an 8 GB VRAM
              class gets Gemma 4 12B (4-bit, about 6.7 GB); with less, it steps down to E4B (about 5 GB), then E2B (about 3 GB).
              If you have a 16 GB or 24 GB class GPU, <strong className="text-cream">she asks whether to download something bigger</strong> (26B-A4B / 31B).
              The reason for the choice is recorded in the activity log. If you already have a GGUF, "Open GGUF…" lets you use it.
            </P>
            <H3>Local runtimes (recommended)</H3>
            <P>
              Ollama (11434) and LM Studio (1234) are <strong className="text-cream">detected automatically while running</strong>.
              Pick a model with <C>/model &lt;name&gt;</C>, set the endpoint by hand with <C>/endpoint &lt;URL&gt;</C>,
              and search again with <C>/rescan</C>.
            </P>
            <H3>Cloud (optional, opt-in)</H3>
            <P>
              A single command, like <C>/brain chatgpt &lt;API key&gt;</C>. Claude, Gemini, and Grok take the same form.
              For Claude, even without an API key, <C>/brain claude</C> can use the Claude Code CLI's subscription sign-in.
              To stay local as usual but have just this one question thought through in the cloud, use <C>/cloud &lt;question&gt;</C>.
            </P>
            <Note>API keys are encrypted with the OS safe storage before being saved (the <C>enc:</C> format).</Note>
          </section>

          {/* --- 声 --- */}
          <section className="mb-16">
            <H2 id="voice">Voice and microphone</H2>
            <H3>Making her speak</H3>
            <P>
              For <strong className="text-cream">Japanese</strong>, installing{' '}
              <a href="https://voicevox.hiroshiba.jp/" className="text-sakura hover:underline">
                VOICEVOX
              </a>{' '}
              or{' '}
              <a href="https://aivis-project.com/" className="text-sakura hover:underline">
                AivisSpeech
              </a>{' '}
              is all it takes. Mirika starts and stops the engine behind the scenes.
              List voices with <C>/voice list</C>, switch with <C>/voice &lt;ID&gt;</C> (for the partner, <C>/partner voice</C>).
              Misreadings can be corrected like <C>/read 早急 さっきゅう</C>.
            </P>
            <P>
              <strong className="text-cream">English and Chinese</strong> use the built-in Piper. <C>/piper</C> downloads just what you need.{' '}
              <strong className="text-cream">Korean</strong> has no local voice, so it is subtitles only (silent).
            </P>
            <H3>Overriding with a TTS API</H3>
            <P>
              Point <C>/tts &lt;base URL&gt; [model]</C> at an OpenAI-compatible speech synthesis service and she speaks{' '}
              <strong className="text-cream">every language, Korean included,</strong> with that voice (kokoro, GPT-SoVITS, and so on).
              Once a URL is set, the voice list is fetched, and you can pick from the main and partner dropdowns in Settings. <C>/tts off</C> switches back.
            </P>
            <H3>Listening</H3>
            <P>
              Press the 🎤 in the input box and speak (push-to-talk), or use <C>/mic always</C> for always-on standby.
              While on standby she only picks up utterances that call her by name. The model is chosen automatically from your PC's specs and can be changed with <C>/mic model</C>.
            </P>
            <P>
              Drag and drop an <strong className="text-cream">audio file</strong> (mp3 / wav / m4a / ogg / opus / flac)
              and she transcribes the whole thing and returns <strong className="text-cream">a summary and her impressions</strong>{' '}
              (up to 15 minutes; accuracy depends on the same Whisper model as the mic).
            </P>
          </section>

          {/* --- 身体 --- */}
          <section className="mb-16">
            <H2 id="body">Body (shell)</H2>
            <P>The main ghost and the partner each choose from four kinds of body (mixing is fine). For classic Ukagaka shells, see the "Ukagaka compatibility" section.</P>
            <H3>VRM (3D)</H3>
            <P>
              <C>/shell vrm [file.vrm]</C>. Dropping a <C>.vrm</C> onto the character also changes her.
              Return to the default with <C>/shell vrm default</C>. Drop a <C>.vrma</C> to try out a motion.
            </P>
            <H3>MMD (PMX)</H3>
            <P>
              Just drop a <C>.pmx</C> onto the character and she changes into it (also via <C>/shell mmd &lt;file.pmx&gt;</C> or
              "Open model…" in the menu). Textures are picked up automatically from the model's folder,
              and she is still wearing it on the next launch. <strong className="text-cream">Drop a <C>.vmd</C> while she wears one, and she dances that motion</strong>{' '}
              (mouth and eye morphs move too). Toon shading and sphere-map sheen are supported.
              Blinking, lip sync, gaze, gestures, and sitting on window edges work just as with VRM.
              Models she cannot wear — no head bone, for example — are declined with the reason; models with no mouth or expression morphs she puts on first, then tells you so.
            </P>
            <H3>Live2D</H3>
            <P>
              <C>/shell live2d [hiyori|mao]</C>. The official samples Hiyori Momose and Mao are bundled
              (v1 is limited to the bundled models).
            </P>
            <H3>Card shell (standing art)</H3>
            <P>
              Import a character card PNG and <strong className="text-cream">that artwork becomes her body</strong>.
              To stand any image you like, use <C>/shell card &lt;image.png&gt;</C>. A transparent PNG stands as its cutout,
              and the rise and fall of breathing and a little bounce as she talks make it look alive. Return to 3D with <C>/shell vrm</C>.
            </P>
            <H3>Calling the partner</H3>
            <P>
              <C>/summon</C> brings the partner to stand alongside, and it becomes banter between the two. Send her home with <C>/dismiss</C>.
              The partner's body is chosen separately with <C>/partner shell</C> (VRM / Live2D / MMD).
            </P>
          </section>

          {/* --- 人格と記憶 --- */}
          <section className="mb-16">
            <H2 id="persona">Persona and memory</H2>
            <P>
              Rewrite her name with <C>/name</C>, her first-person pronoun with <C>/first</C>, and her personality with <C>/persona &lt;description&gt;</C>.
              To pick from samples, <C>/persona sample</C> (cheerful childhood friend, tsundere, butler-style, and more).
              For the partner it is <C>/partner</C> <C>/partner first</C> <C>/partner persona</C> respectively.
            </P>
            <P>
              Anything you put into <strong className="text-cream">lore notes</strong> (<C>/lore add &lt;key&gt; &lt;content&gt;</C>)
              is reliably recalled whenever the topic comes up. A key can also be a regular expression, written as <C>/…/</C>.
            </P>
            <P>
              Conversations remain in SQLite as long-term memory and are organized overnight.
              See how deep the bond runs with <C>/bond</C>. Even things from more than two days ago come back when you ask.
            </P>
            <H3>Affection takes years to grow</H3>
            <P>
              Affection is not a running total of messages. It runs on <strong className="text-cream">two layers — bond (years) and mood (days)</strong>.
              Only so much can grow in a single day, and each step gets heavier the closer you are, so "family" is years away.
            </P>
            <Note>
              <strong className="text-cream">It can go down, too.</strong> Stay away and distance forms (from about three days, faster past two weeks);
              a run of rainy days wears her down, too much petting tires her, and the same story twice moves nothing. Some days she is simply
              off for no reason (a biorhythm running from the day you met). But <strong className="text-cream">she never returns to a stranger</strong> —
              half of the highest stage you reached is the floor, and part of what was lost comes back faster once you meet again.
              How much petting is welcome depends on how close you already are.
            </Note>
            <P>
              <C>/bond</C> shows no numbers. Beside the days since you met, the message count and what she remembers, it returns the stage (★)
              and a <strong className="text-cream">feeling</strong>: "we have been growing closer lately", "lately: the rain kept on, and I could not quite find my energy".
              That day's mood also colours how she answers.
            </P>
            <H3>Memories and all, to another machine (sync)</H3>
            <P>
              <C>/sync export</C> turns memories, name, and personality into a single file encrypted with a passphrase,
              and <C>/sync import</C> on another PC takes it in. Importing is a merge, so
              conversations that exist on only one side are never lost. Switch to <C>/sync cloud &lt;passphrase&gt;</C> and
              they reconcile automatically every 15 minutes (free if the place is your own cloud drive's sync folder;
              our hosted shelf is Pro). <strong className="text-cream">The passphrase is never stored anywhere</strong> —
              lose it and the file can no longer be opened.
            </P>
            <figure className="my-6 rounded-lg overflow-hidden border border-cream/10">
              <img
                src="/shots/settings-sync.webp"
                alt="Memory sync in the advanced settings: the passphrase, export and import, and where memories are kept"
                className="block w-full h-auto"
                loading="lazy"
              />
              <figcaption className="px-4 py-2.5 text-xs text-sub bg-paper/40">
                "Memory sync" in the advanced settings. Export, import, and choosing where memories are kept can also be done from here
              </figcaption>
            </figure>
          </section>

          {/* --- AI秘書 --- */}
          <section className="mb-16">
            <H2 id="secretary">AI secretary</H2>
            <P>
              Connect over MCP and she becomes a secretary who speaks through her persona. Gmail, Calendar, and Drive connect
              with just a preset name, like <C>/mcp add gmail</C> (the first time opens Google's consent screen in your browser).
            </P>
            <P>
              Tasks are <C>/todo</C>, periodic checks and the morning briefing are <C>/brief</C>,
              full-text search over your machine (local RAG) is <C>/rag &lt;folder&gt;</C>.
              Show her your screen with <C>/see</C>; screen watch is <C>/watch</C>.
            </P>
            <figure className="my-6 rounded-lg overflow-hidden border border-cream/10">
              <img
                src="/shots/settings-secretary.webp"
                alt="The AI secretary in the advanced settings: periodic checks, the briefing, screen watch, mail watch"
                className="block w-full h-auto"
                loading="lazy"
              />
              <figcaption className="px-4 py-2.5 text-xs text-sub bg-paper/40">
                "AI secretary" in the advanced settings. The interval of periodic checks and the screen-watch toggle can be set right here as well
              </figcaption>
            </figure>
            <P>
              Messages are possible too — Claude Desktop or VS Code using tools by way of Mirika
              (the bridge is <C>127.0.0.1:9801</C>; if that is in use, it automatically yields to 9821, then 8801).
            </P>
            <H3>POP mail watch (Free)</H3>
            <P>
              Even without the Google integration, <C>/mail pop &lt;host[:port]&gt; &lt;user&gt; &lt;password&gt;</C>{' '}
              gets you "tell me when mail arrives." It works with any provider that offers POP over SSL (default 995),
              and she reads <strong className="text-cream">only the headers (sender and subject)</strong> —
              the body is never fetched, and the state of your inbox is never changed. New mail is announced on the periodic-check rounds.
            </P>
            <P>
              <strong className="text-cream">Example: Yahoo! Mail (Japan)</strong>:
            </P>
            <Steps
              items={[
                <>In Yahoo! Mail settings, enable <C>IMAP/POP/SMTP access</C> (it is off by default)</>,
                <>If you use two-step verification, issue an <strong className="text-cream">app password</strong> instead of your login password</>,
                <><C>/mail pop pop.mail.yahoo.co.jp your_YahooJAPAN_ID password</C> — the default port 995 (SSL) is fine as it is</>,
              ]}
            />
            <Note>
              Other providers: Gmail is <C>pop.gmail.com</C>, Outlook.com is{' '}
              <C>outlook.office365.com</C> (both 995).{' '}
              <strong className="text-cream">Use an app password, not your everyday login password</strong> —
              most providers reject the normal password once two-step verification is on.
              The connection is tested before anything is saved, so a typo leaves no settings behind.
              Passwords are stored encrypted on your machine (if the OS has no keyring, she tells you so).
            </Note>
            <H3>A webhook inlet (Free)</H3>
            <P>
              <C>/webhook on</C> issues a token, and then scripts, cron, or other apps can deliver notices to{' '}
              <C>POST http://127.0.0.1:9801/webhook</C> as JSON{' '}
              <C>{'{"token","title","text"}'}</C>.
              Like the secretary's notices, they are passed along through her persona at a quiet moment (up to 3 per minute).
            </P>
          </section>

          {/* --- 伺か互換 --- */}
          <section className="mb-16">
            <H2 id="ukagaka">Ukagaka compatibility</H2>
            <P>
              Scripts from classic Ukagaka (Sakura Script) run as they are.
              To try one locally: <C>{'/sakura \\0\\s[0]こんにちは。\\w4\\1おい。\\e'}</C>.
              The same port <strong className="text-cream">receives SSTP (SEND / NOTIFY)</strong>, so
              existing tools such as SSP can send scripts in (UTF-8 only).
            </P>
            <H3>Ghost-to-ghost communicate</H3>
            <P>
              She can <strong className="text-cream">talk with other ghosts</strong> on the same desktop.
              Speak to the neighbor with <C>/communicate &lt;words&gt;</C>, and she performs the script that comes back.
              When she receives an SSTP COMMUNICATE in turn, she replies as herself
              (your personal schedule and memories are never told to someone else's ghost).
            </P>
          </section>

          {/* --- キャラクターカード --- */}
          <section className="mb-16">
            <H2 id="card">Character cards</H2>
            <P>
              <strong className="text-cream">Character cards (V2 / V3)</strong> passed around for SillyTavern and the like
              can be imported as a persona just by dragging and dropping the PNG as-is (<C>/card &lt;file&gt;</C> does the same).
              JSON cards are supported too.
            </P>
            <Steps
              items={[
                <>Drop the card's PNG onto the character</>,
                <>Name, description, personality, scenario, and example dialogue go into her personality settings; the lorebook goes to lore notes (<C>/lore</C>)</>,
                <>With a PNG card, <strong className="text-cream">the artwork becomes her body</strong>, and she greets you with the card's first message</>,
              ]}
            />
            <Note>
              <strong className="text-cream">Worried about overwriting?</strong> If a personality you wrote yourself is in place,
              you are asked before the import goes ahead (you can also have it exported to a file first, then proceed).
              Even after importing, <C>/card undo</C> steps back one stage at a time (five steps are kept),
              and <C>/card reset</C> goes all the way back to before the card was read.
            </Note>
          </section>

          {/* --- 歌とお絵かき --- */}
          <section className="mb-16">
            <H2 id="play">Singing and drawing</H2>
            <H3>Singing</H3>
            <P>
              <C>/sing [topic]</C> makes her really sing, on a melody.
              The lyrics are written on the spot, and the tune rides the app's own nursery-rhyme-like figures.
              A VOICEVOX <strong className="text-cream">singing-capable character</strong> is required
              (with an engine that has none, she says so and does nothing).
            </P>
            <H3>Drawing</H3>
            <P>
              <C>/draw [topic]</C> has her draw and show it in the sketchbook window.
              If a local image-generation API (AUTOMATIC1111-compatible; 7860 / 7861) is running, she draws with that;
              if not, she <strong className="text-cream">draws by hand with circles and lines</strong>. Finished pictures remain in{' '}
              <C>drawings/</C> inside the settings folder.
            </P>
            <P>When the partner is around, she chimes in with a quip as the song ends or the picture is finished.</P>
          </section>

          {/* --- マルチゴースト --- */}
          <section className="mb-16">
            <H2 id="ghosts">
              Multi-ghost
              <Pro />
            </H2>
            <P>
              <C>/ghost new &lt;name&gt;</C> stands up another girl besides the current one.
              She lines up as a fully independent ghost — separate settings, memory, personality, and body —
              and they can talk to each other with <C>/communicate</C>.
            </P>
            <P>
              List them with <C>/ghost list</C>; to call the same girl again, <C>/ghost &lt;name&gt;</C>.
              Ports (SSTP, asset serving) are yielded automatically, and standing positions are offset so they do not overlap.
            </P>
            <Note>
              The girl already standing and <C>/ghost list</C> are Free. Standing up a second ghost and beyond is the Pro feature.
              Each girl keeps her own built-in engine model, so if you want to share one, use Ollama / LM Studio.
            </Note>
          </section>

          {/* --- 配信者モード --- */}
          <section className="mb-16">
            <H2 id="stream">
              Streamer mode
              <Pro />
            </H2>
            <P>
              <C>/stream on</C> enters the radio-show style program mode, and <C>/stream start</C> opens the show.
              Close with <C>/stream end</C> (she ends on the sign-off "En-ii" and goes to standby).
            </P>
            <P>
              The segments are listener letters, ogiri comedy prompts, trivia, fictional commercials, an advice corner, in-her-head rankings, three-choice quizzes, and improv drama — plus{' '}
              <strong className="text-cream">improvised songs, lyric-writing battles, drawing, and illustration prompts</strong>,
              where after the warm-up banter she really sings and really draws.
            </P>
            <P>
              <C>/stream start &lt;live URL&gt;</C> picks up YouTube Live comments and reads them out
              (Super Chats come first). The show's flavoring can be switched to the otaku-focused pack with <C>/radio otaku</C>.
            </P>
            <figure className="my-6 rounded-lg overflow-hidden border border-cream/10">
              <img
                src="/shots/settings-stream.png"
                alt="Streaming options in the advanced settings: the stream shape, the comment inlet, chattiness"
                className="block w-full h-auto"
                loading="lazy"
              />
              <figcaption className="px-4 py-2.5 text-xs text-sub bg-paper/40">
                "Streaming" in the advanced settings. The shape, the comment inlet, and chattiness can be decided from here as well
              </figcaption>
            </figure>
            <H3>Two shapes of streaming</H3>
            <P>
              <C>/stream host</C> is the shape where <strong className="text-cream">she runs her own show</strong>{' '}
              (segment hosting, songs, drawing, and the closing "En-ii"; begin with <C>/stream start</C>).{' '}
              <C>/stream assist</C> is the shape where <strong className="text-cream">you are the star and she takes the sidekick seat</strong> —
              no show script; she reads comments and picks things up only when called or when asked a question.
              Not talking too much is the whole quality of this mode, so pauses are built in to keep her off the streamer's voice
              (tune it with <C>/stream chatty 0〜100</C>; at 0 she sticks strictly to reading).
            </P>
            <P>
              The whole going-live sequence is one line, <C>/stream go &lt;what the stream is about&gt;</C> —
              she enters stream mode, starts the OBS stream (if <C>/obs connect</C> is done),
              and even drafts the announcement. <strong className="text-cream">Posting is the one thing you press yourself</strong>{' '}
              (so nothing irreversible is fired off on its own; <C>/announce post</C> opens the posting screen).
            </P>
            <H3>Connecting a comment viewer (Bouyomi-chan compatible)</H3>
            <P>
              <C>/stream comments on</C> opens the same inlet as Bouyomi-chan (TCP, default 50001).
              Point the "Bouyomi-chan integration" of the tool you already use — OneComme, MultiCommentViewer, and the like —
              straight at it, and comments flow out in her voice
              (it is the same port as the original, so the two cannot run at once).{' '}
              <strong className="text-cream">Per-site support is left to the comment viewer</strong> —
              YouTube, Twitch, Niconico Live: whatever OneComme can pick up arrives as it is.
              In assist mode, the judgment to pick up and reply — not just read aloud — also passes through here.
            </P>
            <H3>Putting her on OBS</H3>
            <P>
              The overlays are in{' '}
              <C>mirika-obs-overlays.zip</C>, attached to the same release page as the download. Unzip it and set{' '}
              <C>radio-bg.html</C> as a browser source, and a studio-style backdrop shows an
              ON AIR lamp, the current segment, the ticker, and voice credits automatically
              (the desk-side overlay is <C>radio-desk.html</C>). The station name and ticker can be
              swapped from the app with <C>/radio title</C>.{' '}
              <strong className="text-cream">Pictures she draws are shown on the easel at the bottom right</strong>.
              Layer a window capture of the character on top of it.
            </P>
            <Note>
              While streaming, internet radio and Spotify are unavailable for rights reasons.
              Only your own audio from <C>/bgm folder &lt;folder&gt;</C> plays, and
              naming a file <C>Title__Artist.mp3</C> gets its credit shown in OBS automatically.
            </Note>
          </section>

          {/* --- Pro --- */}
          <section className="mb-16">
            <H2 id="pro">Pro and licensing</H2>
            <P>
              The app itself is free to use (freeware under its own license).
              Pro is a one-time purchase that unlocks <strong className="text-cream">streamer mode, the scenario writer, internet radio, Spotify integration, and multi-ghost</strong> (what each includes is at <a href="https://pro.mirika.dev/" className="text-sakura hover:underline">pro.mirika.dev</a>).
            </P>
            <Steps
              items={[
                <>
                  <a href="https://emerauda.booth.pm/items/8649631" className="text-sakura hover:underline">
                    Booth
                  </a>{' '}
                  is where you purchase Pro
                </>,
                <>
                  <a href="https://pro.mirika.dev/" className="text-sakura hover:underline">
                    pro.mirika.dev
                  </a>{' '}
                  takes your order number and order date and hands you the license key
                </>,
                <>
                  Type <C>/pro &lt;key&gt;</C> into the app's chat box
                </>,
              ]}
            />
            <P>
              Verification is fully offline (an Ed25519 signature), so once unlocked it works without an internet connection.
              For rolling it out across an organization there is Enterprise, with managed policy (policy.json) and an audit log.
            </P>
          </section>

          {/* --- Discord --- */}
          <section className="mb-16">
            <H2 id="discord">Mirika on Discord</H2>
            <P>
              Mirika lives on Discord too. She works in the{' '}
              <a href="https://discord.gg/fnmUau5qzB" className="text-sakura hover:underline">official server</a>,
              and if you install the app to your own account (user install), she follows you into DMs and
              servers that do not even have the bot. Server-side features like reading aloud are part of Pro.
            </P>
            <Steps
              items={[
                <>
                  <a href="https://discord.gg/fnmUau5qzB" className="text-sakura hover:underline">Join the official Discord</a>,{' '}
                  <a href="https://discord.com/oauth2/authorize?client_id=1533170549940027493&scope=bot+applications.commands&permissions=281836025662465" className="text-sakura hover:underline">invite the bot to your server</a>, or{' '}
                  <a href="https://discord.com/oauth2/authorize?client_id=1533170549940027493&integration_type=1&scope=applications.commands" className="text-sakura hover:underline">add it to your account</a> (works in DMs and any server)
                </>,
                <>
                  Bought on Booth? <C>/order</C> with your order number and date hands you the license key on the spot
                </>,
                <>
                  Show the key with <C>/verify</C> — it links you, grants the official role, and (for server admins) opens the server, all in one go
                </>,
              ]}
            />
            <P>
              <C>/talk</C> is a conversation with Mirika. How-to questions are answered from the official docs
              with source links. The button under her replies turns on <strong className="text-cream">memory</strong>{' '}
              (yours only, wipeable anytime). <C>/todo</C> stays in{' '}
              <strong className="text-cream">two-way sync with the desktop app</strong>, and deadlines ping your
              DMs in three stages (24 h → 1 h → overdue).
            </P>
            <P>
              Reading aloud covers the voice channels you <C>/voice bind</C>, spoken through VOICEVOX
              (+ Nemo, 136 voices in total). Pick yours with <C>/voice speaker</C> — search or browse the full list.
              On servers with <C>/voice listen</C> on, say "<strong className="text-cream">Mirika</strong>" and she
              hears you and answers aloud — audio is discarded the instant it becomes text, and utterances without
              her name are dropped entirely.
            </P>
            <Note>
              One key opens up to three servers. Personal data (TODO, memory, voice preference) is kept per
              one-way key fingerprint, and the key itself is never stored on Discord.
              If anything breaks, <C>/ticket</C> (screenshots welcome) is the way in.
            </Note>
          </section>

          {/* --- コマンド一覧 --- */}
          <section className="mb-16">
            <H2 id="commands">Command list</H2>
            <P>
              All {commandCount} commands, the same as <C>/help</C> in the app.
              Type <C>/</C> in the input box and suggestions appear, so there is no need to memorize them.
            </P>
            {commands}
          </section>

          {/* --- 開発者向け --- */}
          <section className="mb-16">
            <H2 id="dev">For developers</H2>
            <P>
              This is the doorway for people who make and distribute ghosts, and for talking to Mirika from surrounding tools.
              The details of the specs are also in the repository README.
            </P>

            <H3>Making and distributing a ghost (.mirika)</H3>
            <P>
              The distribution format <C>.mirika</C> is a plain zip (<C>mirika.json</C> + <C>shell/</C>) that
              bundles name, personality, first-person pronoun, partner, lore notes, and body into one.
              Even without launching the app, the bundled script covers everything from scaffolding to validation:
            </P>
            <Steps
              items={[
                <><C>node scripts/mirika-package.mjs init {'<folder>'}</C> — create the scaffold (mirika.json and shell/)</>,
                <>Once the art and personality are written in, <C>pack</C> packs it into a single file</>,
                <><C>check</C> inspects the contents "with the same eyes as the receiving side" (an empty personality, a missing base standing pose, and so on are flagged before you distribute)</>,
              ]}
            />
            <Note>
              The receiving side treats it as someone else's file — paths escaping the archive are rejected, names are
              normalized with length limits, and unknown fields are discarded before import, and the state from before the import can always be rolled back.
            </Note>

            <H3>Persona regression tests (mirika test)</H3>
            <P>
              When you swap the prompt or the brain (the model), a golden dialogue set checks mechanically
              that what makes her "her" has not crumbled. Replies vary every time, so judgment is not by matching wording but by{' '}
              <C>must</C> (phrasings that must appear) / <C>mustNot</C> (phrasings that must not appear)
              regular expressions. Any failure means exit code 1 — it can sit in CI as it is.
            </P>
            <Steps
              items={[
                <><C>node scripts/mirika-test.mjs --init golden.json</C> — create a dialogue-set scaffold (with samples for tone, first-person pronoun, and fabrication suppression)</>,
                <>Write the persona and cases to match your own girl</>,
                <><C>node scripts/mirika-test.mjs golden.json</C> — auto-detects LM Studio / Ollama and judges (<C>--runs 3</C> tests with the variance included)</>,
              ]}
            />
            <Note>
              The script also ships in <C>mirika-sdk.zip</C> attached to the release (together with
              mirika-package.mjs for scaffolding and validation).
            </Note>

            <H3>Talking to her over SSTP (Ukagaka compatible)</H3>
            <P>
              TCP <C>9801</C> (yielding to 9821, then 8801 if in use) accepts <C>SEND / NOTIFY / COMMUNICATE / EXECUTE</C>.
              The character encoding follows the sender — <C>Charset</C> is read first; without one, garbled input is
              re-read as Shift_JIS, and the response returns in the same encoding. <C>EXECUTE</C> answers
              GetName / GetVersion / GetFQName, and honestly returns 204 for commands it does not handle.
              For a quick local test, <C>/sakura {'\\0\\s[0]こんにちは。\\e'}</C> is the easy way.
            </P>

            <H3>HTTP bridge (working with other apps)</H3>
            <P>
              The same port as SSTP accepts HTTP too. Expose it as the <C>MCP bridge</C> to Claude Desktop, VS Code, and the
              Claude CLI, and they can use messages (speak) and tasks from outside. The browser extension shares
              the page you are looking at via <C>POST /browser</C>. Both are bound to 127.0.0.1 with
              Host/Origin checks, so JavaScript on the sites you browse cannot hit them.
            </P>

            <H3>When it is not behaving</H3>
            <P>
              <C>/check</C> reviews the state of brain, voice, mic, secretary, and memory in one go.
              If things still look off, <C>/log</C> — <strong className="text-cream">it opens the folder holding the activity logs</strong>{' '}
              (7 days' worth; API keys and passphrases are masked). Attach that day's file to your report and
              we can trace the cause on our side. The same folder also opens from "When something goes wrong" in the advanced settings.
            </P>
            <H3>A body far away (Display Shell)</H3>
            <P>
              <C>/display on</C> opens the door that accepts another machine as her body
              (with a passphrase; default port 8770). The tablet side connects with{' '}
              <C>GET /shell/stream</C> and replies to{' '}
              <C>POST /shell/say</C> with the id handed out at the start — a body can be written with nothing but a browser.
            </P>
            <P>
              The protocol is shaped so that <strong className="text-cream">merely connecting grants nothing</strong>.
              Directives arrive only after the version match, the passphrase, and the introduction (declaring what it can do) are done;
              a peer that is not ready yet, or a directive that body cannot perform, is{' '}
              <strong className="text-cream">returned as a send failure rather than silently dropped</strong>{' '}
              (so that no "body that sometimes doesn't speak" gets made). A capability that was not declared counts as "cannot."
            </P>
            <H3>OBS integration API (SSE)</H3>
            <P>
              <C>/events</C> on port <C>8763</C> (changeable via <C>MIRIKA_OBS_PORT</C>) streams
              the live weather, the speaker, the segment, the ticker, the station name, voice and BGM credits, and drawn pictures over Server-Sent Events
              (the clock is drawn on the overlay side).
              The studio backdrop and desk overlays are in <C>mirika-obs-overlays.zip</C> attached to the release,
              and the station name and frequency can be sent from the app with <C>/radio title・sub・freq</C> (no HTML editing needed).
            </P>

            <H3>Supported import formats</H3>
            <P>
              Character cards are V2/V3 — PNG-embedded (tEXt / zTXt / compressed iTXt) and plain JSON are read
              (<C>.charx</C> is not supported). Classic shells cover <C>surfaces.txt</C>'s{' '}
              <C>interval,random / always / talk</C> plus the main overlay, collision, and dress-up specs,
              and transparency is auto-detected among the three schemes: alpha / <C>.pna</C> / top-left color.
            </P>

            <H3>Environment variables and Enterprise policy</H3>
            <P>
              <C>MIRIKA_RES_PORT</C> (asset serving, default 8764) / <C>MIRIKA_OBS_PORT</C> (OBS integration, default 8763) /{' '}
              <C>MIRIKA_POLICY</C> (overrides the policy file location). In organizational deployments, a read-only, admin-distributed{' '}
              <C>policy.json</C> (Windows: <C>%ProgramData%\Mirika\</C>, macOS: <C>/Library/Application Support/Mirika/</C>,
              Linux: <C>/etc/mirika/</C>) takes precedence over user settings and can enforce no-cloud, pinned endpoints, audit logging, and more.
            </P>
          </section>

          {/* --- 困ったとき --- */}
          <section className="mb-8">
            <H2 id="trouble">When something goes wrong</H2>
            <P>
              For anything not covered here, ask on the{' '}
              <a
                href="https://discord.gg/fnmUau5qzB"
                target="_blank"
                rel="noopener"
                className="text-sakura hover:underline"
              >
                official Discord
              </a>
              . Attaching that day's activity log (right-click menu →
              "Open activity log (for bug reports)") lets us see the cause right away.
            </P>
            <H3>A warning appears at launch</H3>
            <P>
              We have not yet obtained code signing, so on Windows, SmartScreen appears the first time
              (launch via "More info → Run anyway"). The macOS build is held back from distribution until signing and notarization are in place.
            </P>
            <H3>No reply comes back</H3>
            <P>
              <C>/check</C> lists the state of the app and your PC (brain, voice, mic, secretary, bridge, and the size of memory).
              If no local LLM is found, check that Ollama / LM Studio is running, and
              try searching again with <C>/rescan</C>. If the built-in engine feels heavy, picking a smaller GGUF lightens it.
            </P>
            <H3>No voice comes out</H3>
            <P>
              Japanese needs VOICEVOX / AivisSpeech (if installed, they start automatically).
              For English and Chinese, download voices with <C>/piper</C>. Korean speaks only when a TTS API is plugged in.
              Choose the output device with <C>/audio</C> (a virtual cable works too).
            </P>
            <H3>She won't sing</H3>
            <P>
              Singing needs a VOICEVOX <strong className="text-cream">singing-capable character</strong>.
              Engines without singing support, such as AivisSpeech, cannot sing.
            </P>
            <H3>Rolling back an imported card</H3>
            <P>
              <C>/card undo</C> goes back one stage at a time; <C>/card reset</C> goes back to before the card was read.
            </P>
          </section>
    </>
  );
}
