import type { ReactNode } from 'react';
import { A, B, C, H2, H3, Note, P, Pro, Shot, Steps } from './docs-ui';

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
                  <A href="/#download">
                    Download
                  </A>{' '}
                  and install it (Windows / Linux; macOS is still in preparation, pending code signing).
                  Windows comes in two editions — <B>pick the CUDA-bundled one (-cuda.exe) if you have an NVIDIA
                  GPU</B> (the standard edition also fetches CUDA automatically on first boot when NVIDIA is
                  detected)
                </>,
                <>
                  Launch it, and the default girl (Komane) stands at the bottom right of your desktop. The bundled VRMs are
                  the main ghost "Komane" and the partner "Chise (TKSP)", both works by{' '}
                  <A href="https://goho-cheat-vrc.booth.pm/" blank>
                    VRC合法チート研究会
                  </A>{' '}
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
              <B>The basics</B> — grab and drag to move her, right-click for the menu.
              Drop a <C>.vrm</C> or <C>.pmx</C> (MMD) onto her window and she changes into it (double-click has nothing assigned to it).
              Petting counts <B>only when you move your hand back and forth around her head or chest</B> —
              merely passing over her gets no reaction (and it is not counted while she is tucked away or under a fullscreen app).
              When you want her out of the way for a while, use "Tuck her away" in the menu; bring her back from the tray icon.
              Type <C>/</C> in the input box and command suggestions appear (↑↓ to select, Tab / Enter to complete).
              When no suggestions are showing, ↑↓ walks through your input history.
            </Note>
            <P>
              If you get stuck, head to{' '}<A href="#trouble">"When something goes wrong"</A>.{' '}
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
              <B>A model sized to fit your PC is chosen automatically</B> — an 8 GB VRAM
              class gets Gemma 4 12B (4-bit, about 6.7 GB); with less, it steps down to E4B (about 5 GB), then E2B (about 3 GB).
              If you have a 16 GB or 24 GB class GPU, <B>she asks whether to download something bigger</B> (26B-A4B / 31B).
              The reason for the choice is recorded in the activity log. If you already have a GGUF, "Open GGUF…" lets you use it.
              The current backend (CUDA / Vulkan / CPU) and the GPU usage are visible and adjustable
              in the right-click built-in engine menu.
            </P>
            <H3>Local runtimes (recommended)</H3>
            <P>
              Ollama (11434) and LM Studio (1234) are <B>detected automatically while running</B>.
              Pick a model with <C>/model &lt;name&gt;</C>, set the endpoint by hand with <C>/endpoint &lt;URL&gt;</C>,
              and search again with <C>/rescan</C>.
            </P>
            <H3>Cloud (optional, opt-in)</H3>
            <P>
              A single command, like <C>/brain chatgpt &lt;API key&gt;</C>. Claude, Gemini, and Grok take the same form.
              <B>Three subscription CLIs</B> work with no API key at all — <C>/brain claude</C> (Claude Code),
              <C>/brain antigravity</C> (agy) and <C>/brain codex</C>: install the CLI, log in, and it becomes the
              brain as-is (<B>CLIs living inside WSL are found automatically</B>).
              To stay local as usual but have just this one question thought through in the cloud, use <C>/cloud &lt;question&gt;</C>.
            </P>
            <Note>API keys are encrypted with the OS safe storage before being saved (the <C>enc:</C> format).</Note>
          </section>

          {/* --- 声 --- */}
          <section className="mb-16">
            <H2 id="voice">Voice and microphone</H2>
            <H3>Making her speak</H3>
            <P>
              For <B>Japanese</B>, installing{' '}
              <A href="https://voicevox.hiroshiba.jp/">
                VOICEVOX
              </A>{' '}
              or{' '}
              <A href="https://aivis-project.com/">
                AivisSpeech
              </A>{' '}
              is all it takes. Mirika starts and stops the engine behind the scenes.
              List voices with <C>/voice list</C>, switch with <C>/voice &lt;ID&gt;</C> (for the partner, <C>/partner voice</C>).
              Misreadings can be corrected like <C>/read 早急 さっきゅう</C>.
            </P>
            <P>
              <B>English and Chinese</B> use the built-in Piper. <C>/piper</C> downloads just what you need.{' '}
              <B>Korean</B> has no local voice, so it is subtitles only (silent).
            </P>
            <H3>Overriding with a TTS API</H3>
            <P>
              Point <C>/tts &lt;base URL&gt; [model]</C> at an OpenAI-compatible speech synthesis service and she speaks{' '}
              <B>every language, Korean included,</B> with that voice (kokoro, GPT-SoVITS, and so on).
              Once a URL is set, the voice list is fetched, and you can pick from the main and partner dropdowns in Settings. <C>/tts off</C> switches back.
            </P>
            <H3>Listening</H3>
            <P>
              Press the 🎤 in the input box and speak (push-to-talk), or use <C>/mic always</C> for always-on standby.
              While on standby she only picks up utterances that call her by name. The model is chosen automatically from your PC's specs and can be changed with <C>/mic model</C>.
            </P>
            <P>
              Drag and drop an <B>audio file</B> (mp3 / wav / m4a / ogg / opus / flac)
              and she transcribes the whole thing and returns <B>a summary and her impressions</B>{' '}
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
              and she is still wearing it on the next launch. <B>Drop a <C>.vmd</C> while she wears one, and she dances that motion</B>{' '}
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
              Import a character card PNG and <B>that artwork becomes her body</B>.
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
              Anything you put into <B>lore notes</B> (<C>/lore add &lt;key&gt; &lt;content&gt;</C>)
              is reliably recalled whenever the topic comes up. A key can also be a regular expression, written as <C>/…/</C>.
            </P>
            <P>
              Conversations remain in SQLite as long-term memory and are organized overnight.
              See how deep the bond runs with <C>/bond</C>. Even things from more than two days ago come back when you ask.
            </P>
            <H3>Affection takes years to grow</H3>
            <P>
              Affection is not a running total of messages. It runs on <B>two layers — bond (years) and mood (days)</B>.
              Only so much can grow in a single day, and each step gets heavier the closer you are, so "family" is years away.
            </P>
            <Note>
              <B>It can go down, too.</B> Stay away and distance forms (from about three days, faster past two weeks);
              a run of rainy days wears her down, too much petting tires her, and the same story twice moves nothing. Some days she is simply
              off for no reason (a biorhythm running from the day you met). But <B>she never returns to a stranger</B> —
              half of the highest stage you reached is the floor, and part of what was lost comes back faster once you meet again.
              How much petting is welcome depends on how close you already are.
            </Note>
            <P>
              <C>/bond</C> shows no numbers. Beside the days since you met, the message count and what she remembers, it returns the stage (★)
              and a <B>feeling</B>: "we have been growing closer lately", "lately: the rain kept on, and I could not quite find my energy".
              That day's mood also colours how she answers.
            </P>
            <H3>Memories and all, to another machine (sync)</H3>
            <P>
              <C>/sync export</C> turns memories, name, and personality into a single file encrypted with a passphrase,
              and <C>/sync import</C> on another PC takes it in. Importing is a merge, so
              conversations that exist on only one side are never lost. Switch to <C>/sync cloud &lt;passphrase&gt;</C> and
              they reconcile automatically every 15 minutes (free if the place is your own cloud drive's sync folder;
              our hosted shelf is Pro). <B>The passphrase is never stored anywhere</B> —
              lose it and the file can no longer be opened.
            </P>
            <Shot src="/shots/settings-sync.webp" alt="Memory sync in the advanced settings: the passphrase, export and import, and where memories are kept" caption={<>"Memory sync" in the advanced settings. Export, import, and choosing where memories are kept can also be done from here</>} />
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
            <Shot src="/shots/settings-secretary.webp" alt="The AI secretary in the advanced settings: periodic checks, the briefing, screen watch, mail watch" caption={<>"AI secretary" in the advanced settings. The interval of periodic checks and the screen-watch toggle can be set right here as well</>} />
            <P>
              Messages are possible too — Claude Desktop or VS Code using tools by way of Mirika
              (the bridge is <C>127.0.0.1:9801</C>; if that is in use, it automatically yields to 9821, then 8801).
            </P>
            <H3>POP mail watch (Free)</H3>
            <P>
              Even without the Google integration, <C>/mail pop &lt;host[:port]&gt; &lt;user&gt; &lt;password&gt;</C>{' '}
              gets you "tell me when mail arrives." It works with any provider that offers POP over SSL (default 995),
              and she reads <B>only the headers (sender and subject)</B> —
              the body is never fetched, and the state of your inbox is never changed. New mail is announced on the periodic-check rounds.
            </P>
            <P>
              <B>Example: Yahoo! Mail (Japan)</B>:
            </P>
            <Steps
              items={[
                <>In Yahoo! Mail settings, enable <C>IMAP/POP/SMTP access</C> (it is off by default)</>,
                <>If you use two-step verification, issue an <B>app password</B> instead of your login password</>,
                <><C>/mail pop pop.mail.yahoo.co.jp your_YahooJAPAN_ID password</C> — the default port 995 (SSL) is fine as it is</>,
              ]}
            />
            <Note>
              Other providers: Gmail is <C>pop.gmail.com</C>, Outlook.com is{' '}
              <C>outlook.office365.com</C> (both 995).{' '}
              <B>Use an app password, not your everyday login password</B> —
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

          {/* --- シナリオライター --- */}
          <section className="mb-16">
            <H2 id="writer">Scenario writer (Pro)</H2>
            <P>
              A work mode for scripts and screenplays. Enter with <C>/write on</C> or the right-click menu.
              While it is on, the balloon widens into a page, and the conversational persona and emotion tags
              never leak into the manuscript.
            </P>
            <Steps
              items={[
                <>
                  Hand over a spec or plan file (drop or 📎). <B>It becomes the brief.</B> If your own plan
                  already has a skeleton or an outline, she writes from it directly — no pitching stage needed
                </>,
                <>
                  <C>/write plot &lt;subject&gt;</C> offers three deliberately different options → adopt with a
                  button → outline. <B>The plan (plot + outline) is also written to <C>scenarios/企画メモ.md</C></B>
                  and opens any time with its button
                </>,
                <>
                  Choose <B>“write it straight through”</B> or <B>“just chapter one”</B> as buttons.
                  Continuing (<C>/write next</C>) <B>reads the tail of the previous manuscript first</B>;
                  fixing (<C>/write fix</C>) reads the text before rewriting it whole
                </>,
                <>
                  Manuscripts stay as Markdown under <C>scenarios/</C> and open with a button.
                  Start fresh with <C>/write new</C> (the old plan is archived)
                </>,
              ]}
            />
            <Note>
              <C>/write status</C> tells you the current stage and offers the next step as buttons.
              The menu is stage-aware: items you cannot use yet are greyed out.
            </Note>
          </section>

          {/* --- 伺か互換 --- */}
          <section className="mb-16">
            <H2 id="ukagaka">Ukagaka compatibility</H2>
            <P>
              Scripts from classic Ukagaka (Sakura Script) run as they are.
              To try one locally: <C>{'/sakura \\0\\s[0]こんにちは。\\w4\\1おい。\\e'}</C>.
              The same port <B>receives SSTP (SEND / NOTIFY)</B>, so
              existing tools such as SSP can send scripts in (the encoding follows the
              sender — Shift_JIS-era tools work as they are).
            </P>
            <H3>Full ghost compatibility (the real SHIORI speaks)</H3>
            <P>
              <B>Drop a .nar on her</B> and the whole ghost (body and dictionary) moves in.
              In full-compat mode <B>the bundled SHIORI runs as-is</B> — Satori, YAYA, aosora
              or a homebrew DLL, whatever <C>descript.txt</C> names gets loaded without
              looking at its kind. The greeting (OnBoot), idle talk (OnAiTalk), poke
              reactions and chat-box messages (OnCommunicate) are all answered
              <B> from the ghost's own dictionary</B>. While a ghost is awake, Mirika's AI
              says nothing — she doesn't impersonate someone else's character.
              Old 32-bit DLLs run too, in a dedicated host process. Running the real DLL
              is <B>Windows-only for now</B> (macOS/Linux can wear the body).
            </P>
            <P>
              Commands: <C>/classic</C> (list), <C>/classic &lt;name&gt;</C> (wake),
              <C>/classic sleep</C> (say goodbye and rest).
            </P>
            <H3>Switching a ghost to AI (one-way)</H3>
            <P>
              <C>/classic ai &lt;name&gt;</C> is a <B>one-way ceremony that moves the ghost to
              the AI brain</B>. It asks for confirmation, and once done, re-importing the
              .nar does not revert it (dictionary files are kept, just unused — the
              author's work is never destroyed). Same face and gestures; only the words
              become AI.
            </P>
            <H3>Ghost-to-ghost communicate</H3>
            <P>
              She can <B>talk with other ghosts</B> on the same desktop.
              Speak to the neighbor with <C>/communicate &lt;words&gt;</C>, and she performs the script that comes back.
              When she receives an SSTP COMMUNICATE in turn, she replies as herself
              (your personal schedule and memories are never told to someone else's ghost).
            </P>
          </section>

          {/* --- キャラクターカード --- */}
          <section className="mb-16">
            <H2 id="card">Character cards</H2>
            <P>
              <B>Character cards (V2 / V3)</B> passed around for SillyTavern and the like
              can be imported as a persona just by dragging and dropping the PNG as-is (<C>/card &lt;file&gt;</C> does the same).
              JSON cards are supported too.
            </P>
            <Steps
              items={[
                <>Drop the card's PNG onto the character</>,
                <>Name, description, personality, scenario, and example dialogue go into her personality settings; the lorebook goes to lore notes (<C>/lore</C>)</>,
                <>With a PNG card, <B>the artwork becomes her body</B>, and she greets you with the card's first message</>,
              ]}
            />
            <Note>
              <B>Worried about overwriting?</B> If a personality you wrote yourself is in place,
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
              A VOICEVOX <B>singing-capable character</B> is required
              (with an engine that has none, she says so and does nothing).
            </P>
            <H3>Drawing</H3>
            <P>
              <C>/draw [topic]</C> has her draw and show it in the sketchbook window.
              If a local image-generation API (AUTOMATIC1111-compatible; 7860 / 7861) is running, she draws with that;
              if not, she <B>draws by hand with circles and lines</B>. Finished pictures remain in{' '}
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
              <B>improvised songs, lyric-writing battles, drawing, and illustration prompts</B>,
              where after the warm-up banter she really sings and really draws.
            </P>
            <P>
              <C>/stream start &lt;live URL&gt;</C> picks up YouTube Live comments and reads them out
              (Super Chats come first). The show's flavoring can be switched to the otaku-focused pack with <C>/radio otaku</C>.
            </P>
            <Shot src="/shots/settings-stream.webp" alt="Streaming options in the advanced settings: the stream shape, the comment inlet, chattiness" caption={<>"Streaming" in the advanced settings. The shape, the comment inlet, and chattiness can be decided from here as well</>} />
            <H3>Two shapes of streaming</H3>
            <P>
              <C>/stream host</C> is the shape where <B>she runs her own show</B>{' '}
              (segment hosting, songs, drawing, and the closing "En-ii"; begin with <C>/stream start</C>).{' '}
              <C>/stream assist</C> is the shape where <B>you are the star and she takes the sidekick seat</B> —
              no show script; she reads comments and picks things up only when called or when asked a question.
              Not talking too much is the whole quality of this mode, so pauses are built in to keep her off the streamer's voice
              (tune it with <C>/stream chatty 0〜100</C>; at 0 she sticks strictly to reading).
            </P>
            <P>
              The whole going-live sequence is one line, <C>/stream go &lt;what the stream is about&gt;</C> —
              she enters stream mode, starts the OBS stream (if <C>/obs connect</C> is done),
              and even drafts the announcement. <B>Posting is the one thing you press yourself</B>{' '}
              (so nothing irreversible is fired off on its own; <C>/announce post</C> opens the posting screen).
            </P>
            <H3>Connecting a comment viewer (Bouyomi-chan compatible)</H3>
            <P>
              <C>/stream comments on</C> opens the same inlet as Bouyomi-chan (TCP, default 50001).
              Point the "Bouyomi-chan integration" of the tool you already use — OneComme, MultiCommentViewer, and the like —
              straight at it, and comments flow out in her voice
              (it is the same port as the original, so the two cannot run at once).{' '}
              <B>Per-site support is left to the comment viewer</B> —
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
              <B>Pictures she draws are shown on the easel at the bottom right</B>.
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
              Pro is a one-time purchase that unlocks <B>streamer mode, the scenario writer, internet radio, Spotify integration, and multi-ghost</B> (what each includes is at <A href="https://pro.mirika.dev/">pro.mirika.dev</A>).
            </P>
            <Steps
              items={[
                <>
                  <A href="https://emerauda.booth.pm/items/8649631">
                    Booth
                  </A>{' '}
                  is where you purchase Pro
                </>,
                <>
                  <A href="https://pro.mirika.dev/">
                    pro.mirika.dev
                  </A>{' '}
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
              <A href="https://discord.gg/fnmUau5qzB">official server</A>,
              and if you install the app to your own account (user install), she follows you into DMs and
              servers that do not even have the bot. Server-side features like reading aloud are part of Pro.
            </P>
            <Steps
              items={[
                <>
                  <A href="https://discord.gg/fnmUau5qzB">Join the official Discord</A>,{' '}
                  <A href="https://discord.com/oauth2/authorize?client_id=1533170549940027493&scope=bot+applications.commands&permissions=281836025662465">invite the bot to your server</A>, or{' '}
                  <A href="https://discord.com/oauth2/authorize?client_id=1533170549940027493&integration_type=1&scope=applications.commands">add it to your account</A> (works in DMs and any server)
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
              with source links. The button under her replies turns on <B>memory</B>{' '}
              (yours only, wipeable anytime). <C>/todo</C> stays in{' '}
              <B>two-way sync with the desktop app</B>, and deadlines ping your
              DMs in three stages (24 h → 1 h → overdue).
            </P>
            <P>
              Reading aloud covers the voice channels you <C>/voice bind</C>, spoken through VOICEVOX
              (+ Nemo, 136 voices in total). Pick yours with <C>/voice speaker</C> — search or browse the full list.
              On servers with <C>/voice listen</C> on, say "<B>Mirika</B>" and she
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
              If things still look off, <C>/log</C> — <B>it opens the folder holding the activity logs</B>{' '}
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
              The protocol is shaped so that <B>merely connecting grants nothing</B>.
              Directives arrive only after the version match, the passphrase, and the introduction (declaring what it can do) are done;
              a peer that is not ready yet, or a directive that body cannot perform, is{' '}
              <B>returned as a send failure rather than silently dropped</B>{' '}
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
              <A href="https://discord.gg/fnmUau5qzB" blank>
                official Discord
              </A>
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
              Singing needs a VOICEVOX <B>singing-capable character</B>.
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
