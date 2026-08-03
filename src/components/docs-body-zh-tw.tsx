import type { ReactNode } from 'react';
import { C, H2, H3, Note, P, Pro, Steps } from './docs-ui';

/** 使い方ドキュメント本文(繁体字中国語)。構成と JSX の形は docs-body-ja.tsx に揃える。 */

export function DocsBodyZhTw({ commands, commandCount }: { commands: ReactNode; commandCount: number }) {
  return (
    <>
          {/* --- はじめに --- */}
          <section className="mb-16">
            <H2 id="start">開始使用</H2>
            <P>
              Mirika 是常駐在桌面上的角色(幽靈)。
              預設組態完全在本地運作,不需 API 費用,對話也不會離開你的裝置。
            </P>
            <Steps
              items={[
                <>
                  <a href="/#download" className="text-sakura hover:underline">
                    下載
                  </a>
                  並安裝(Windows / Linux。macOS 版在完成簽章對應前仍在準備中)
                </>,
                <>
                  啟動後,預設的孩子(Komane)會站在桌面右下角。隨附的 VRM 為
                  本體「Komane」・搭檔「Chise (TKSP)」,兩者皆是{' '}
                  <a href="https://goho-cheat-vrc.booth.pm/" target="_blank" rel="noreferrer">
                    VRC合法チート研究会
                  </a>{' '}
                  的作品,獲得授權後隨附於本程式(模型不可再散布)
                </>,
                <>
                  連接頭腦(LLM)。只要 <C>Ollama</C> 或 <C>LM Studio</C> 正在執行,就會自動找到。
                  若什麼都沒有,也能從滑鼠右鍵選單的「頭腦」→「內建引擎」當場準備一個
                </>,
                <>在輸入欄跟她說話。想聽到聲音,只要先裝好 VOICEVOX 或 AivisSpeech,她就會開口</>,
              ]}
            />
            <Note>
              <strong className="text-cream">基本操作</strong> — 抓住拖曳即可移動,滑鼠右鍵開啟選單。
              把 <C>.vrm</C> 或 <C>.pmx</C>(MMD)丟進視窗就會換裝(雙擊沒有指派任何動作)。
              撫摸<strong className="text-cream">只在頭部或胸口附近讓游標來回滑動時才算數</strong>,
              只是經過並不會有反應(收起來的期間,或在全螢幕應用程式底下時不列入計算)。
              想讓她暫時退下,就用選單的「收起」;要叫回來,則從系統匣的圖示。
              在輸入欄打 <C>/</C> 會出現指令候選(↑↓ 選擇,Tab / Enter 補完)。
              沒有候選時的 ↑↓ 則是輸入歷史。
            </Note>
            <P>
              卡住的時候請看<a href="#trouble" className="text-sakura hover:underline">「遇到問題時」</a>。
              目前的狀態可以用 <C>/check</C> 一次確認(頭腦・聲音・麥克風・秘書・記憶)。
            </P>
          </section>

          {/* --- 頭脳 --- */}
          <section className="mb-16">
            <H2 id="brain">連接頭腦(LLM)</H2>
            <P>連接方式分成三個層次,每一種都能從聊天欄切換。</P>
            <H3>內建引擎(最輕鬆)</H3>
            <P>
              用 <C>/brain embedded</C> 或從滑鼠右鍵選單啟用,只在應用程式內部運作。
              模型會<strong className="text-cream">自動挑選裝得進你電腦的大小</strong> —— VRAM
              8GB 等級是 Gemma 4 12B(4bit・約6.7GB),不夠的話依序降為 E4B(約5GB)、E2B(約3GB)。
              若你擁有 16GB・24GB 等級的 GPU,<strong className="text-cream">會先詢問要不要下載更大的模型</strong>(26B-A4B / 31B)。
              挑選的理由會留在運作記錄裡。手邊有 GGUF 的話,可用「開啟 GGUF…」直接使用。
            </P>
            <H3>本地執行環境(推薦)</H3>
            <P>
              Ollama(11434)與 LM Studio(1234)<strong className="text-cream">只要正在執行就會被自動偵測</strong>。
              挑選模型用 <C>/model &lt;名字&gt;</C>,手動指定連接目標用 <C>/endpoint &lt;URL&gt;</C>,
              重新搜尋則是 <C>/rescan</C>。
            </P>
            <H3>雲端(可選・自行啟用)</H3>
            <P>
              像 <C>/brain chatgpt &lt;API金鑰&gt;</C> 這樣一條指令即可。Claude・Gemini・Grok 也是同樣的形式。
              Claude 就算沒有 API 金鑰,也能用 <C>/brain claude</C> 使用 Claude Code CLI 的訂閱認證。
              平常維持本地,只想讓這一個問題交給雲端思考時,用 <C>/cloud &lt;問題&gt;</C>。
            </P>
            <Note>API 金鑰會以 OS 的安全儲存區加密保存(<C>enc:</C> 形式)。</Note>
          </section>

          {/* --- 声 --- */}
          <section className="mb-16">
            <H2 id="voice">聲音與麥克風</H2>
            <H3>讓她說話</H3>
            <P>
              <strong className="text-cream">日文</strong>只要裝好{' '}
              <a href="https://voicevox.hiroshiba.jp/" className="text-sakura hover:underline">
                VOICEVOX
              </a>{' '}
              或{' '}
              <a href="https://aivis-project.com/" className="text-sakura hover:underline">
                AivisSpeech
              </a>{' '}
              即可,Mirika 會在幕後啟動・結束引擎。
              聲音一覽用 <C>/voice list</C>,變更用 <C>/voice &lt;ID&gt;</C>(搭檔則是 <C>/partner voice</C>)。
              誤讀可以像 <C>/read 早急 さっきゅう</C> 這樣修正。
            </P>
            <P>
              <strong className="text-cream">英文・中文</strong>使用內建的 Piper,<C>/piper</C> 只下載需要的份量。
              <strong className="text-cream">韓文</strong>沒有本地語音,因此只顯示字幕(無聲)。
            </P>
            <H3>用 TTS API 覆寫</H3>
            <P>
              用 <C>/tts &lt;基礎URL&gt; [模型]</C> 指向 OpenAI 相容的語音合成後,
              <strong className="text-cream">包含韓文在內的所有語言</strong>都會用那個聲音說話(kokoro・GPT-SoVITS 等)。
              輸入 URL 後會取得聲音一覽,可從設定畫面的本體・搭檔下拉選單挑選。要恢復用 <C>/tts off</C>。
            </P>
            <H3>聽你說話</H3>
            <P>
              按下輸入欄的🎤說話(按鍵發話),或用 <C>/mic always</C> 常時待機。
              待機中只會拾取喚了名字的發話。模型會依 PC 效能自動挑選,可用 <C>/mic model</C> 變更。
            </P>
            <P>
              把<strong className="text-cream">音訊檔案</strong>(mp3 / wav / m4a / ogg / opus / flac)
              拖放進來,就會整段轉成文字,回覆<strong className="text-cream">摘要與感想</strong>
              (最長15分鐘。精確度取決於與麥克風相同的 Whisper 模型)。
            </P>
          </section>

          {/* --- 身体 --- */}
          <section className="mb-16">
            <H2 id="body">身體(外殼)</H2>
            <P>本體與搭檔各自可從 4 種身體中挑選(也能混搭)。伺か的經典外殼請見「伺か相容」一節。</P>
            <H3>VRM(3D)</H3>
            <P>
              <C>/shell vrm [檔案.vrm]</C>。把 <C>.vrm</C> 拖放到角色身上也會換裝。
              恢復預設是 <C>/shell vrm default</C>。拖放 <C>.vrma</C> 可以試玩動作。
            </P>
            <H3>MMD(PMX)</H3>
            <P>
              只要把 <C>.pmx</C> 拖放到角色身上就會換裝(也可用 <C>/shell mmd &lt;檔案.pmx&gt;</C> 或
              選單的「開啟模型…」)。材質貼圖會自動從模型的資料夾撿取,
              下次啟動時也仍然穿著。<strong className="text-cream">穿著期間丟入 <C>.vmd</C>,就會用那段動作跳舞</strong>
              (嘴巴與眼睛的變形鍵也會動)。支援 Toon 的陰影與 Sphere 貼圖的光澤。
              眨眼・對嘴・視線・小動作・坐上視窗邊緣,都和 VRM 一樣運作。
              缺少頭部骨骼等穿不上的模型,會說明理由婉拒;沒有嘴巴或表情變形鍵的模型,會在穿上後告訴你這一點。
            </P>
            <H3>Live2D</H3>
            <P>
              <C>/shell live2d [hiyori|mao]</C>。隨附官方範例的桃瀬ひより・Mao
              (v1 僅限隨附模型)。
            </P>
            <H3>卡片外殼(立繪)</H3>
            <P>
              匯入角色卡的 PNG 後,<strong className="text-cream">那張圖就會成為身體</strong>。
              想讓喜歡的圖片站上桌面,就用 <C>/shell card &lt;圖片.png&gt;</C>。透明 PNG 會以去背形狀站立,
              加上呼吸的起伏・說話時的彈跳,看起來活靈活現。要回到 3D 用 <C>/shell vrm</C>。
            </P>
            <H3>呼喚搭檔</H3>
            <P>
              用 <C>/summon</C> 讓搭檔並肩站好,變成兩人一搭一唱的對談。送她回去用 <C>/dismiss</C>。
              搭檔的身體可用 <C>/partner shell</C> 另外挑選(VRM / Live2D / MMD)。
            </P>
          </section>

          {/* --- 人格と記憶 --- */}
          <section className="mb-16">
            <H2 id="persona">人格與記憶</H2>
            <P>
              名字用 <C>/name</C>,自稱用 <C>/first</C>,性格用 <C>/persona &lt;說明&gt;</C> 改寫。
              想從範本挑選就用 <C>/persona sample</C>(活潑的青梅竹馬・傲嬌・執事風等)。
              搭檔那側分別是 <C>/partner</C> <C>/partner first</C> <C>/partner persona</C>。
            </P>
            <P>
              放進<strong className="text-cream">設定備忘</strong>(<C>/lore add &lt;鍵&gt; &lt;內容&gt;</C>)的字句,
              在話題提到時一定會想起來。鍵也能以 <C>/…/</C> 寫成正規表示式。
            </P>
            <P>
              對話會作為長期記憶留在 SQLite 裡,並在夜裡整理。
              關係的深度可用 <C>/bond</C> 查看。兩天以前的話題,只要問她,也會想起來回答。
            </P>
            <H3>好感度要花上數年才長成</H3>
            <P>
              好感度不是說話次數的累計,而是<strong className="text-cream">羈絆(數年)與心情(每日)雙層</strong>運作的。
              一天能長的量有上限,越親近每一步越重,所以要到「家人一般的存在」是數年之後的事。
            </P>
            <Note>
              <strong className="text-cream">也會下降。</strong>久不見面就會生疏(約三天起,超過兩週更快);雨天連著會低落,
              撫摸過頭會疲憊,老說同樣的話則毫無波瀾。有時也會沒來由地提不起勁(從相遇那天延續的生理節律)。
              但<strong className="text-cream">不會退回陌生人</strong>——曾抵達階段的一半是地板,離開期間失去的一部分會在重逢後的對話中更快回來。
              能接受多少撫摸,取決於關係已有多深。
            </Note>
            <P>
              <C>/bond</C> 不顯示數字。除了相識天數、對話次數、記住的事情之外,只返回階段(★)與
              「最近好像越來越近了」「最近:雨一直下,總提不起勁」這樣的<strong className="text-cream">氣息</strong>。當天的心情也會直接體現在回話的語氣裡。
            </P>
            <H3>連同記憶,搬到另一台裝置(同步)</H3>
            <P>
              用 <C>/sync export</C>,記憶連同名字・性格會變成一個以口令加密的檔案,
              在另一台 PC 用 <C>/sync import</C> 匯入。匯入採比對合併,
              只存在其中一邊的對話也不會消失。設定 <C>/sync cloud &lt;口令&gt;</C> 後,
              每 15 分鐘自動對齊(存放處選你自己雲端的同步資料夾則免費,
              寄放在我們這邊的架上則屬 Pro)。<strong className="text-cream">口令不會保存在任何地方</strong> —
              忘記就再也打不開了。
            </P>
            <figure className="my-6 rounded-lg overflow-hidden border border-cream/10">
              <img
                src="/shots/settings-sync.webp"
                alt="詳細設定的記憶同步。口令、匯出與匯入、記憶的存放處"
                className="block w-full h-auto"
                loading="lazy"
              />
              <figcaption className="px-4 py-2.5 text-xs text-sub bg-paper/40">
                詳細設定的「記憶同步」。匯出・匯入・存放處的選擇,也能從這裡操作
              </figcaption>
            </figure>
          </section>

          {/* --- AI秘書 --- */}
          <section className="mb-16">
            <H2 id="secretary">AI 秘書</H2>
            <P>
              透過 MCP 連接後,就成了帶著人格的秘書。Gmail・日曆・Drive 只要像
              <C>/mcp add gmail</C> 這樣輸入預設集名稱即可連上(第一次會在瀏覽器開啟 Google 的同意畫面)。
            </P>
            <P>
              任務用 <C>/todo</C>,定期檢查與「今日簡報」用 <C>/brief</C>,
              裝置內的全文檢索(本地 RAG)用 <C>/rag &lt;資料夾&gt;</C>。
              想給她看畫面用 <C>/see</C>,持續看顧用 <C>/watch</C>。
            </P>
            <figure className="my-6 rounded-lg overflow-hidden border border-cream/10">
              <img
                src="/shots/settings-secretary.webp"
                alt="詳細設定的 AI 秘書。定期檢查、簡報、畫面看顧、郵件監看"
                className="block w-full h-auto"
                loading="lazy"
              />
              <figcaption className="px-4 py-2.5 text-xs text-sub bg-paper/40">
                詳細設定的「AI 秘書」。定期檢查的間隔、看顧的開關,都能直接在這裡決定
              </figcaption>
            </figure>
            <P>
              也可以從 Claude Desktop 或 VS Code 經由 Mirika 使用工具,也就是「傳話」
              (橋接位於 <C>127.0.0.1:9801</C>。若被占用會自動讓位到 9821 → 8801)。
            </P>
            <H3>POP 郵件監看(Free)</H3>
            <P>
              即使不使用 Google 連動,靠 <C>/mail pop &lt;主機[:連接埠]&gt; &lt;使用者&gt; &lt;密碼&gt;</C>{' '}
              就能實現「有郵件來就告訴我」。只要是提供 POP over SSL(預設 995)的服務商
              都能使用,而且讀取的<strong className="text-cream">只有標頭(寄件人與主旨)</strong> —
              不抓取內文,也不改變收件匣的狀態。新郵件會隨定期檢查的巡迴通知你。
            </P>
            <P>
              <strong className="text-cream">Yahoo! 信箱(日本)的範例</strong>:
            </P>
            <Steps
              items={[
                <>先在 Yahoo! 信箱的設定中啟用 <C>IMAP/POP/SMTP アクセス</C>(預設是關閉的)</>,
                <>如果使用兩步驟驗證,請發行<strong className="text-cream">應用程式密碼</strong>,而不是登入用密碼</>,
                <><C>/mail pop pop.mail.yahoo.co.jp 你的YahooJAPAN_ID 密碼</C> —— 連接埠維持預設的 995(SSL)就可以了</>,
              ]}
            />
            <Note>
              其他服務商的範例:Gmail 是 <C>pop.gmail.com</C>,Outlook.com 是{' '}
              <C>outlook.office365.com</C>(皆為 995)。
              <strong className="text-cream">請使用應用程式密碼,而不是平常的登入密碼</strong> —
              多數服務商在啟用兩步驟驗證後,會拒絕一般密碼。
              是否連得上會在保存前先確認,所以就算打錯了,設定也不會留下。
              密碼會在裝置內加密保存(在沒有 OS 金鑰圈的環境會告知這一點)。
            </Note>
            <H3>webhook 的接收口(Free)</H3>
            <P>
              用 <C>/webhook on</C> 發行權杖後,腳本・cron・其他應用程式就能向{' '}
              <C>POST http://127.0.0.1:9801/webhook</C> 以 JSON{' '}
              <C>{'{"token","title","text"}'}</C> 送來通知。
              收到的通知與秘書的通知一樣,會挑她有空的時機、帶著人格轉達(每分鐘最多 3 件)。
            </P>
          </section>

          {/* --- 伺か互換 --- */}
          <section className="mb-16">
            <H2 id="ukagaka">伺か相容</H2>
            <P>
              舊伺か的腳本(Sakura Script)可以原樣運作。
              想在手邊試試,就用 <C>{'/sakura \\0\\s[0]こんにちは。\\w4\\1おい。\\e'}</C>。
              同一個連接埠也會<strong className="text-cream">接收 SSTP(SEND / NOTIFY)</strong>,
              因此能從 SSP 等既有工具把腳本送進來(僅限 UTF-8)。
            </P>
            <H3>幽靈間交流</H3>
            <P>
              可以和同一個桌面上的<strong className="text-cream">其他幽靈交談</strong>。
              用 <C>/communicate &lt;話語&gt;</C> 向隔壁的孩子搭話,她會把對方回傳的腳本原樣說出來。
              反過來收到 SSTP COMMUNICATE 時,會以這個孩子的身分回話
              (使用者個人的行程與記憶,不會說給別家的孩子聽)。
            </P>
          </section>

          {/* --- キャラクターカード --- */}
          <section className="mb-16">
            <H2 id="card">角色卡</H2>
            <P>
              SillyTavern 等處流通的<strong className="text-cream">角色卡(V2 / V3)</strong>,
              只要把 PNG 原樣拖放進來,就能作為人格匯入(用 <C>/card &lt;檔案&gt;</C> 也一樣)。
              也支援 JSON 格式的卡片。
            </P>
            <Steps
              items={[
                <>把卡片的 PNG 丟到角色身上</>,
                <>名字・說明・性格・場景・對話範例會進入性格設定,Lorebook 則收進設定備忘(<C>/lore</C>)</>,
                <>PNG 卡片會<strong className="text-cream">讓那張圖成為身體</strong>,並用卡片的第一句話向你打招呼</>,
              ]}
            />
            <Note>
              <strong className="text-cream">擔心被覆寫時</strong> — 若已存有你親手寫的性格,
              匯入前會先出現確認(也可以先原樣匯出成檔案再繼續)。
              匯入後也能用 <C>/card undo</C> 一步步退回(保留 5 次份),
              <C>/card reset</C> 則一口氣回到讀卡之前。
            </Note>
          </section>

          {/* --- 歌とお絵かき --- */}
          <section className="mb-16">
            <H2 id="play">唱歌與畫畫</H2>
            <H3>唱歌</H3>
            <P>
              用 <C>/sing [題目]</C>,她會真的配上旋律唱出來。
              歌詞當場創作,旋律則乘著應用程式內建的童謠風音形。
              需要 VOICEVOX 的<strong className="text-cream">支援歌唱的角色</strong>
              (引擎未安裝時會告知這一點,什麼也不做)。
            </P>
            <H3>畫畫</H3>
            <P>
              用 <C>/draw [題目]</C> 畫圖,並在素描本視窗展示給你看。
              本地若有影像生成 API(AUTOMATIC1111 相容。7860 / 7861)在運作就用它來畫,
              沒有的話就<strong className="text-cream">用圓圈與線條手繪</strong>。畫好的圖會留在設定資料夾的
              <C>drawings/</C> 裡。
            </P>
            <P>搭檔在場時,會在唱完・畫完的時候吐槽幾句。</P>
          </section>

          {/* --- マルチゴースト --- */}
          <section className="mb-16">
            <H2 id="ghosts">
              多重幽靈
              <Pro />
            </H2>
            <P>
              用 <C>/ghost new &lt;名字&gt;</C>,可以在現在這個孩子之外,再立起另一個孩子。
              設定・記憶・性格・身體全部獨立的幽靈就此並肩站立,
              還能用 <C>/communicate</C> 彼此交談。
            </P>
            <P>
              一覽用 <C>/ghost list</C>,要再叫出同一個孩子用 <C>/ghost &lt;名字&gt;</C>。
              連接埠(SSTP・資源配送)會自動互相禮讓,站位也會錯開,避免重疊。
            </P>
            <Note>
              現在站著的這個孩子與 <C>/ghost list</C> 屬於 Free。立起第二個以後的孩子才是 Pro 功能。
              內建引擎的模型由每個孩子各自持有,想共用的話請使用 Ollama / LM Studio。
            </Note>
          </section>

          {/* --- 配信者モード --- */}
          <section className="mb-16">
            <H2 id="stream">
              直播主模式
              <Pro />
            </H2>
            <P>
              用 <C>/stream on</C> 進入「任意ラヂヲ」風格的廣播節目模式,<C>/stream start</C> 開始節目。
              收尾用 <C>/stream end</C>(以口令「えんいー(En-ii)」結束並回到待機)。
            </P>
            <P>
              單元除了聽眾來信・大喜利・小知識・虛構廣告・煩惱諮詢・腦內排行榜・三選一問答・即興短劇,還有
              <strong className="text-cream">即興歌曲・作詞對決・畫畫・插畫題目</strong>,
              在開場的一搭一唱之後,真的會唱、真的會畫。
            </P>
            <P>
              用 <C>/stream start &lt;直播URL&gt;</C> 會拾取 YouTube 直播的留言並唸出來
              (超級留言最優先)。節目的調味可用 <C>/radio otaku</C> 切換成御宅特化包。
            </P>
            <figure className="my-6 rounded-lg overflow-hidden border border-cream/10">
              <img
                src="/shots/settings-stream.png"
                alt="詳細設定的直播相關。直播的形式、留言的接收口、多話程度"
                className="block w-full h-auto"
                loading="lazy"
              />
              <figcaption className="px-4 py-2.5 text-xs text-sub bg-paper/40">
                詳細設定的「直播」。形式・留言接收口・多話程度,也能在這裡決定
              </figcaption>
            </figure>
            <H3>兩種直播形式</H3>
            <P>
              <C>/stream host</C> 是<strong className="text-cream">由這個孩子主持節目</strong>的形式
              (單元進行・唱歌・畫畫・收尾的「えんいー(En-ii)」。開始用 <C>/stream start</C>)。
              <C>/stream assist</C> 則是<strong className="text-cream">你當主角,這個孩子坐在搭檔席</strong>的形式 —
              不推進節目腳本,只讀留言,被點名或有提問時才接話回覆。
              不搶話正是這個模式的品質所在,因此加入了避免蓋過直播主聲音的間隔
              (收放程度用 <C>/stream chatty 0〜100</C>。0 就徹底專心讀留言)。
            </P>
            <P>
              開播的一連串動作,一句 <C>/stream go &lt;直播內容&gt;</C> 就能搞定 —
              進入直播模式、開始 OBS 的直播(若已 <C>/obs connect</C>),
              連宣傳文的草稿都會擬好。<strong className="text-cream">只有送出貼文要由你親手按下</strong>
              (為了不擅自發出無法收回的東西。<C>/announce post</C> 會開啟發文畫面)。
            </P>
            <H3>與留言檢視器連接(棒読みちゃん相容)</H3>
            <P>
              用 <C>/stream comments on</C>,會開啟與棒読みちゃん相同的接收口(TCP・預設 50001)。
              OneComme(わんコメ)或マルチコメントビューア等,只要把你慣用工具的
              「棒読みちゃん連携」直接指過來,留言就會用這個孩子的聲音流出
              (與本家使用同一連接埠,所以無法同時使用)。
              <strong className="text-cream">各直播網站的對應交給留言檢視器那側</strong> —
              無論 YouTube、Twitch 還是 niconico 直播,只要 OneComme 拾得到的都會原樣送達。
              輔助模式中,不只是唸出來,要不要接話回覆的判斷也會經過這裡。
            </P>
            <H3>放上 OBS</H3>
            <P>
              疊加層收錄在與下載相同的發行頁面所附的
              <C>mirika-obs-overlays.zip</C> 裡。解壓縮後把
              <C>radio-bg.html</C> 指定為瀏覽器來源,攝影棚風的背景上就會自動出現
              ON AIR 燈・目前單元・字幕條・語音來源標示
              (桌面側的疊加層是 <C>radio-desk.html</C>)。電台名與字幕條
              可從應用程式用 <C>/radio title</C> 更換。
              <strong className="text-cream">畫畫單元畫出的圖會顯示在右下的畫架上</strong>。
              請把角色的視窗擷取疊在其上。
            </P>
            <Note>
              直播中基於版權考量,無法使用網路電台・Spotify。
              只會播放 <C>/bgm folder &lt;資料夾&gt;</C> 裡你自備的音源,
              檔名取為 <C>標題__作者.mp3</C> 的話,OBS 會自動顯示來源標示。
            </Note>
          </section>

          {/* --- Pro --- */}
          <section className="mb-16">
            <H2 id="pro">Pro 與授權</H2>
            <P>
              本體可免費使用(採專用授權的免費軟體)。
              Pro 為買斷制,解鎖<strong className="text-cream">直播主模式・劇本作家・網路電台・Spotify 連動・多重幽靈</strong>(各項內容詳見 <a href="https://pro.mirika.dev/" className="text-sakura hover:underline">pro.mirika.dev</a>)。
            </P>
            <Steps
              items={[
                <>
                  在{' '}
                  <a href="https://emerauda.booth.pm/items/8649631" className="text-sakura hover:underline">
                    Booth
                  </a>{' '}
                  購買 Pro
                </>,
                <>
                  在{' '}
                  <a href="https://pro.mirika.dev/" className="text-sakura hover:underline">
                    pro.mirika.dev
                  </a>{' '}
                  輸入訂單編號與訂購日期,領取授權金鑰
                </>,
                <>
                  在應用程式的聊天欄輸入 <C>/pro &lt;金鑰&gt;</C>
                </>,
              ]}
            />
            <P>
              驗證完全離線進行(Ed25519 簽章),解鎖後不需網路連線也能使用。
              要在組織內配發的話,另有具備管理原則(policy.json)與稽核記錄的 Enterprise。
            </P>
          </section>

          {/* --- Discord --- */}
          <section className="mb-16">
            <H2 id="discord">在 Discord 上也能使用</H2>
            <P>
              Mirika 也在 Discord 上。她不僅在
              <a href="https://discord.gg/fnmUau5qzB" className="text-sakura hover:underline">官方伺服器</a>
              工作,若把應用程式「加入我的帳號」(個人安裝),在私訊裡、甚至沒有機器人的伺服器裡,
              也能帶著秘書隨行。朗讀等伺服器功能屬於 Pro。
            </P>
            <Steps
              items={[
                <>
                  <a href="https://discord.gg/fnmUau5qzB" className="text-sakura hover:underline">加入官方 Discord</a>,或
                  <a href="https://discord.com/oauth2/authorize?client_id=1533170549940027493&scope=bot+applications.commands&permissions=281836025662465" className="text-sakura hover:underline">把 Bot 邀請到自己的伺服器</a>,或
                  <a href="https://discord.com/oauth2/authorize?client_id=1533170549940027493&integration_type=1&scope=applications.commands" className="text-sakura hover:underline">加入自己的帳號</a>(私訊和任何伺服器都能用)
                </>,
                <>
                  在 Booth 購買過?在 <C>/order</C> 輸入訂單編號與下單日期 — 當場領取授權金鑰
                </>,
                <>
                  用 <C>/verify</C> 出示金鑰。本人綁定、官方身分組、(伺服器管理員的話)伺服器開通,一次完成
                </>,
              ]}
            />
            <P>
              <C>/talk</C> 是與 Mirika 的對話。關於用法的提問,她會以官方文件為依據、附來源連結作答。
              用回覆下方的按鈕開啟<strong className="text-cream">記憶</strong>後,她會記住對話
              (只屬於你,隨時可全部刪除)。<C>/todo</C> 與
              <strong className="text-cream">桌面版 TODO 雙向同步</strong>,期限將近時也會在私訊裡
              分三階段提醒(24 小時前 → 1 小時前 → 已逾期)。
            </P>
            <P>
              朗讀會用 VOICEVOX(+ Nemo,共 136 種聲音)讀出 <C>/voice bind</C> 綁定的語音頻道。
              自己的聲音用 <C>/voice speaker</C> 挑選(可搜尋,也可從完整清單瀏覽)。
              在開啟 <C>/voice listen</C> 的伺服器裡,喊一聲「<strong className="text-cream">Mirika</strong>」,
              她會聽到並用聲音回答 — 音訊在轉成文字的那一刻即被丟棄,沒有呼喚她的發言連文字也不保留。
            </P>
            <Note>
              一把金鑰最多開通三個伺服器。個人資料(TODO・記憶・聲音偏好)按金鑰衍生的單向指紋分開保存,
              金鑰本身不會存放在 Discord。遇到問題請走 <C>/ticket</C>(可附截圖)。
            </Note>
          </section>

          {/* --- コマンド一覧 --- */}
          <section className="mb-16">
            <H2 id="commands">指令一覽</H2>
            <P>
              與應用程式的 <C>/help</C> 相同,共 {commandCount} 條。
              在輸入欄打 <C>/</C> 就會出現候選,所以不必背下來。
            </P>
            {commands}
          </section>

          {/* --- 開発者向け --- */}
          <section className="mb-16">
            <H2 id="dev">給開發者</H2>
            <P>
              這裡是給想製作並分發幽靈的人・想從周邊工具向 Mirika 搭話的人的入口。
              規格細節也可在儲存庫的 README 找到。
            </P>

            <H3>製作並分發幽靈(.mirika)</H3>
            <P>
              發布格式 <C>.mirika</C> 是純粹的 zip(<C>mirika.json</C> + <C>shell/</C>),
              把名字・性格・自稱・搭檔・設定備忘・身體整合成一份。
              即使不啟動應用程式,也能用隨附腳本完成從建立雛形到驗證的整套流程:
            </P>
            <Steps
              items={[
                <><C>node scripts/mirika-package.mjs init {'<資料夾>'}</C> — 建立雛形(mirika.json 與 shell/)</>,
                <>寫好圖與性格後,用 <C>pack</C> 固定成 1 個檔案</>,
                <><C>check</C> 會用「與接收方相同的眼光」檢查內容(性格空白・缺少基本立姿等,在分發前就告訴你)</>,
              ]}
            />
            <Note>
              接收方會把它當作他人的檔案對待 — 拒絕逃出壓縮檔之外的路徑・執行帶長度限制的正規化・
              捨棄未知項目,之後才匯入;而匯入前的狀態隨時可以回復。
            </Note>

            <H3>人格回歸測試(mirika test)</H3>
            <P>
              更換提示詞或頭腦(模型)時,以黃金對話集機械式地確認「這個孩子的樣子」
              有沒有走樣。回覆每次都會有波動,所以不比對字面一致,而是以
              <C>must</C>(必定出現的說法)/<C>mustNot</C>(不可出現的說法)的
              正規表示式判定。有失敗就以結束代碼 1 收場 — 可以直接放進 CI。
            </P>
            <Steps
              items={[
                <><C>node scripts/mirika-test.mjs --init golden.json</C> — 建立對話集雛形(附口吻・自稱・抑制捏造的範例)</>,
                <>把 persona 與 cases 改寫成符合自己孩子的內容</>,
                <><C>node scripts/mirika-test.mjs golden.json</C> — 自動偵測 LM Studio / Ollama 並判定(<C>--runs 3</C> 連波動一起檢驗)</>,
              ]}
            />
            <Note>
              腳本也收錄在發行版附帶的 <C>mirika-sdk.zip</C> 裡(與負責建立雛形・驗證的
              mirika-package.mjs 放在一起)。
            </Note>

            <H3>用 SSTP 搭話(伺か相容)</H3>
            <P>
              在 TCP <C>9801</C>(被占用時讓位到 9821 → 8801)接收 <C>SEND / NOTIFY / COMMUNICATE / EXECUTE</C>。
              字元編碼配合寄送方 — 先讀 <C>Charset</C>,沒有的話,在出現亂碼時
              改用 Shift_JIS 重讀,回應也以相同編碼返回。<C>EXECUTE</C> 會回答
              GetName / GetVersion / GetFQName,不受理的命令則老實回覆 204。
              想在手邊試打,用 <C>/sakura {'\\0\\s[0]こんにちは。\\e'}</C> 最方便。
            </P>

            <H3>HTTP 橋接(與其他應用程式連動)</H3>
            <P>
              與 SSTP 相同的連接埠也接收 HTTP。作為 <C>MCP 橋接</C> 公開給 Claude Desktop・VS Code・
              Claude CLI 之後,就能從外部使用傳話(speak)與任務。瀏覽器擴充功能則以
              <C>POST /browser</C> 分享正在瀏覽的頁面。兩者都綁定 127.0.0.1 並附帶
              Host/Origin 檢查,無法從瀏覽中網站的 JavaScript 呼叫。
            </P>

            <H3>運作不順時</H3>
            <P>
              用 <C>/check</C> 可以一次確認頭腦・聲音・麥克風・秘書・記憶的狀態。
              狀況還是不對勁時就 <C>/log</C> ——<strong className="text-cream">會開啟存放運作記錄的資料夾</strong>
              (保留 7 天份・API 金鑰與口令都以遮蔽處理)。回報時若附上當天的檔案,
              我們就能循線追查原因。從詳細設定的「遇到問題時」也能開啟同一個資料夾。
            </P>
            <H3>遠端的身體(Display Shell)</H3>
            <P>
              用 <C>/display on</C>,就會開啟把另一台機器當作這個孩子身體來接納的入口
              (附口令。預設連接埠 8770)。平板那側以
              <C>GET /shell/stream</C> 連上,拿最初分發到的 id 向
              <C>POST /shell/say</C> 回話 — 光靠瀏覽器就能寫出一具身體。
            </P>
            <P>
              約定被設計成<strong className="text-cream">光是連上還不能使用</strong>的形式。
              完成版本比對・口令・自我介紹(申報做得到的事)之後,指令才會送達;
              還沒準備好的對象、或那具身體做不到的指令,
              <strong className="text-cream">不會默默丟棄,而是以傳送失敗返回</strong>
              (為了不造出「偶爾不說話的身體」)。沒有申報的能力一律視為「做不到」。
            </P>
            <H3>OBS 連動 API(SSE)</H3>
            <P>
              連接埠 <C>8763</C>(可用 <C>MIRIKA_OBS_PORT</C> 變更)的 <C>/events</C>,
              會把實況天氣・說話者・單元・字幕條・電台名・語音與 BGM 的來源標示・畫好的圖,以 Server-Sent Events
              流出(時鐘由疊加層那側繪製)。
              攝影棚背景與桌面疊加層在發行版附帶的 <C>mirika-obs-overlays.zip</C> 裡,
              電台名・頻率可從應用程式以 <C>/radio title・sub・freq</C> 送出(不需編輯 HTML)。
            </P>

            <H3>匯入格式的支援範圍</H3>
            <P>
              角色卡為 V2/V3 — 可讀取 PNG 內嵌(tEXt / zTXt / 壓縮 iTXt)與純 JSON
              (<C>.charx</C> 尚未支援)。經典外殼支援 <C>surfaces.txt</C> 的
              <C>interval,random / always / talk</C> 與 overlay 系・collision・換裝的主要規格,
              透明則自動判別 Alpha / <C>.pna</C> / 左上角顏色 3 種方式。
            </P>

            <H3>環境變數與 Enterprise 原則</H3>
            <P>
              <C>MIRIKA_RES_PORT</C>(資源配送・預設 8764)/ <C>MIRIKA_OBS_PORT</C>(OBS 連動・預設 8763)/
              <C>MIRIKA_POLICY</C>(覆寫原則檔案的位置)。組織導入時,管理者配發的唯讀
              <C>policy.json</C>(Windows: <C>%ProgramData%\Mirika\</C>、macOS: <C>/Library/Application Support/Mirika/</C>、
              Linux: <C>/etc/mirika/</C>)優先於使用者設定,可統一管制禁用雲端・固定連接目標・稽核記錄等。
            </P>
          </section>

          {/* --- 困ったとき --- */}
          <section className="mb-8">
            <H2 id="trouble">遇到問題時</H2>
            <P>
              這裡沒有列出的症狀,請到{' '}
              <a
                href="https://discord.gg/fnmUau5qzB"
                target="_blank"
                rel="noopener"
                className="text-sakura hover:underline"
              >
                官方 Discord
              </a>{' '}
              詢問。若能附上當天的運作記錄(滑鼠右鍵選單 →
              「開啟運作記錄(回報問題用)」),就能很快找出原因。
            </P>
            <H3>啟動時出現警告</H3>
            <P>
              由於尚未取得程式碼簽章,Windows 首次啟動會出現 SmartScreen
              (點「其他資訊 → 仍要執行」啟動)。macOS 版在完成簽章・公證的對應之前,暫緩發布。
            </P>
            <H3>等不到回覆</H3>
            <P>
              用 <C>/check</C> 可以一覽應用程式與 PC 的狀態(頭腦・聲音・麥克風・秘書・橋接・記憶的規模)。
              找不到本地 LLM 時,請確認 Ollama / LM Studio 是否正在執行,
              或用 <C>/rescan</C> 重新搜尋。內建引擎太吃力時,改選較小的 GGUF 會輕快許多。
            </P>
            <H3>沒有聲音</H3>
            <P>
              日文需要 VOICEVOX / AivisSpeech(已安裝的話會自動啟動)。
              英文・中文請用 <C>/piper</C> 下載語音。韓文只在接上 TTS API 時才會說話。
              輸出目的地可用 <C>/audio</C> 選擇(也能輸出到虛擬音訊線)。
            </P>
            <H3>不唱歌</H3>
            <P>
              唱歌需要 VOICEVOX 的<strong className="text-cream">支援歌唱的角色</strong>。
              AivisSpeech 等不支援歌唱的引擎無法唱歌。
            </P>
            <H3>想把匯入的卡片復原</H3>
            <P>
              用 <C>/card undo</C> 一步步退回,<C>/card reset</C> 則回到讀取卡片之前。
            </P>
          </section>
    </>
  );
}
