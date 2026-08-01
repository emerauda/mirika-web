import type { ReactNode } from 'react';
import { C, H2, H3, Note, P, Pro, Steps } from './docs-ui';

/** 使い方ドキュメント本文(簡体字中国語)。原文・構造の正は docs-body-ja.tsx —— 構成と JSX の形はそちらに揃える。 */

export function DocsBodyZhCn({ commands, commandCount }: { commands: ReactNode; commandCount: number }) {
  return (
    <>
          {/* --- はじめに --- */}
          <section className="mb-16">
            <H2 id="start">开始使用</H2>
            <P>
              Mirika 是常驻在桌面上的角色(幽灵)。
              默认配置完全在本地运行,不产生 API 费用,对话也不会离开你的设备。
            </P>
            <Steps
              items={[
                <>
                  <a href="/#download" className="text-sakura hover:underline">
                    下载
                  </a>
                  并安装(Windows / Linux。macOS 版在签名支持就绪之前仍在准备中)
                </>,
                <>
                  启动后,默认的孩子(Komane)会站到桌面右下角。随附的 VRM 为
                  本体「Komane」与搭档「Chise (TKSP)」,两者均为{' '}
                  <a href="https://goho-cheat-vrc.booth.pm/" target="_blank" rel="noreferrer">
                    VRC合法チート研究会
                  </a>{' '}
                  的作品,承蒙许可随附于应用(模型不可再分发)
                </>,
                <>
                  连接头脑(LLM)。只要 <C>Ollama</C> 或 <C>LM Studio</C> 在运行,就会被自动发现。
                  什么都没有时,也可以通过右键菜单的「头脑」→「内置引擎」当场备好一个
                </>,
                <>在输入栏和她说话。想听到声音的话,只要装好 VOICEVOX 或 AivisSpeech 她就会开口</>,
              ]}
            />
            <Note>
              <strong className="text-cream">基本操作</strong> — 按住拖动即可移动,右键点击打开菜单。
              把 <C>.vrm</C> 或 <C>.pmx</C>(MMD)丢进窗口就会换装(双击没有分配任何操作)。
              抚摸<strong className="text-cream">只在头部或胸口附近让手来回移动时</strong>才会成立,
              只是路过并不会有反应(被收起的期间、或压在全屏应用之下时不会计数)。
              想让她暂时退下,用菜单的「收起」;要请回来,点托盘图标。
              在输入栏键入 <C>/</C> 会出现命令候选(↑↓ 选择,Tab / Enter 补全)。
              没有候选时的 ↑↓ 是输入历史。
            </Note>
            <P>
              卡住的时候,请看<a href="#trouble" className="text-sakura hover:underline">「遇到麻烦时」</a>。
              当前状态可用 <C>/check</C> 一并查看(头脑・声音・麦克风・秘书・记忆)。
            </P>
          </section>

          {/* --- 頭脳 --- */}
          <section className="mb-16">
            <H2 id="brain">连接头脑(LLM)</H2>
            <P>连接分为三档,每一档都能从聊天栏切换。</P>
            <H3>内置引擎(最省事)</H3>
            <P>
              用 <C>/brain embedded</C> 或右键菜单开启。只在应用内部运行。
              模型会<strong className="text-cream">按你的 PC 装得下的大小自动选择</strong> —— VRAM
              8GB 级选 Gemma 4 12B(4bit・约 6.7GB),不够则依次降到 E4B(约 5GB)、E2B(约 3GB)。
              如果你有 16GB・24GB 级的 GPU,<strong className="text-cream">会先问你要不要下载更大的模型</strong>(26B-A4B / 31B)。
              选择的理由会留在运行日志里。手头有 GGUF 的话,可用「打开 GGUF…」直接使用。
            </P>
            <H3>本地运行时(推荐)</H3>
            <P>
              Ollama(11434)和 LM Studio(1234)<strong className="text-cream">只要在运行就会被自动检测</strong>。
              选择模型用 <C>/model &lt;名字&gt;</C>,手动指定连接地址用 <C>/endpoint &lt;URL&gt;</C>,
              重新扫描用 <C>/rescan</C>。
            </P>
            <H3>云端(可选・自愿开启)</H3>
            <P>
              像 <C>/brain chatgpt &lt;API密钥&gt;</C> 这样一条命令即可。Claude・Gemini・Grok 也是同样的形式。
              Claude 即使没有 API 密钥,也能用 <C>/brain claude</C> 走 Claude Code CLI 的订阅认证。
              平时保持本地,只想让这一个问题交给云端思考时,用 <C>/cloud &lt;问题&gt;</C>。
            </P>
            <Note>API 密钥会通过 OS 的安全存储加密保存(<C>enc:</C> 格式)。</Note>
          </section>

          {/* --- 声 --- */}
          <section className="mb-16">
            <H2 id="voice">声音与麦克风</H2>
            <H3>让她说话</H3>
            <P>
              <strong className="text-cream">日语</strong>只需装好{' '}
              <a href="https://voicevox.hiroshiba.jp/" className="text-sakura hover:underline">
                VOICEVOX
              </a>{' '}
              或{' '}
              <a href="https://aivis-project.com/" className="text-sakura hover:underline">
                AivisSpeech
              </a>{' '}
              即可。Mirika 会在后台替你启动・结束引擎。
              声音列表用 <C>/voice list</C>,更换用 <C>/voice &lt;ID&gt;</C>(搭档用 <C>/partner voice</C>)。
              读错的词可以像 <C>/read 早急 さっきゅう</C> 这样教她改正。
            </P>
            <P>
              <strong className="text-cream">英语・中文</strong>使用内置 Piper。用 <C>/piper</C> 只下载需要的部分。
              <strong className="text-cream">韩语</strong>没有本地语音,因此只显示字幕(无声)。
            </P>
            <H3>用 TTS API 覆盖</H3>
            <P>
              用 <C>/tts &lt;基础URL&gt; [模型]</C> 指向 OpenAI 兼容的语音合成后,
              <strong className="text-cream">包括韩语在内的所有语言</strong>都会用那个声音说话(kokoro・GPT-SoVITS 等)。
              填入 URL 后会获取声音列表,可在设置界面的本体・搭档下拉菜单中选择。恢复用 <C>/tts off</C>。
            </P>
            <H3>听你说话</H3>
            <P>
              按下输入栏的🎤再说话(按键通话),或用 <C>/mic always</C> 保持持续待机。
              待机中只会拾取叫了名字的发言。模型按 PC 性能自动选择,可用 <C>/mic model</C> 更换。
            </P>
            <P>
              把<strong className="text-cream">音频文件</strong>(mp3 / wav / m4a / ogg / opus / flac)
              拖放过来,就会整段转写文字,并送上<strong className="text-cream">摘要和感想</strong>
              (最长 15 分钟。精度取决于与麦克风相同的 Whisper 模型)。
            </P>
          </section>

          {/* --- 身体 --- */}
          <section className="mb-16">
            <H2 id="body">身体(外壳)</H2>
            <P>本体和搭档各自都能从 4 种身体中挑选(也可混搭)。伺か的经典外壳请看「伺か兼容」一节。</P>
            <H3>VRM(3D)</H3>
            <P>
              <C>/shell vrm [文件.vrm]</C>。把 <C>.vrm</C> 丢到角色身上也会换装。
              恢复默认用 <C>/shell vrm default</C>。丢入 <C>.vrma</C> 可以试播动作。
            </P>
            <H3>MMD(PMX)</H3>
            <P>
              只要把 <C>.pmx</C> 丢到角色身上就会换装(也可通过 <C>/shell mmd &lt;文件.pmx&gt;</C> 或
              菜单的「打开模型…」)。纹理会从模型所在的文件夹自动拾取,
              下次启动时也仍穿在身上。<strong className="text-cream">穿着期间丢入 <C>.vmd</C>,就会随那段动作起舞</strong>
              (嘴和眼睛的变形也会动)。支持卡通渲染的阴影与球面贴图的光泽。
              眨眼・对口型・视线・小动作・窗沿闲坐都和 VRM 一样有效。
              没有头部骨骼等穿不上的模型,会说明理由婉拒;没有嘴部或表情变形的模型,穿上后会如实相告。
            </P>
            <H3>Live2D</H3>
            <P>
              <C>/shell live2d [hiyori|mao]</C>。随附官方示例的桃瀬ひより与 Mao
              (v1 固定使用随附模型)。
            </P>
            <H3>卡片外壳(立绘)</H3>
            <P>
              导入角色卡的 PNG 后,<strong className="text-cream">那张画就会成为身体</strong>。
              想让喜欢的图片站起来,用 <C>/shell card &lt;图片.png&gt;</C>。透明 PNG 会按裁切原样站立,
              凭呼吸的起伏・说话时的弹跳而显得鲜活。回到 3D 用 <C>/shell vrm</C>。
            </P>
            <H3>呼唤搭档</H3>
            <P>
              用 <C>/summon</C> 让搭档并肩站好,变成两人你一言我一语的互动。送她回去用 <C>/dismiss</C>。
              搭档的身体可用 <C>/partner shell</C> 另行选择(VRM / Live2D / MMD)。
            </P>
          </section>

          {/* --- 人格と記憶 --- */}
          <section className="mb-16">
            <H2 id="persona">人格与记忆</H2>
            <P>
              名字用 <C>/name</C>,自称用 <C>/first</C>,性格用 <C>/persona &lt;说明&gt;</C> 改写。
              想从示例里挑,用 <C>/persona sample</C>(元气青梅竹马・傲娇・管家风等)。
              搭档一侧分别是 <C>/partner</C> <C>/partner first</C> <C>/partner persona</C>。
            </P>
            <P>
              写进<strong className="text-cream">设定备忘</strong>(<C>/lore add &lt;键&gt; &lt;内容&gt;</C>)的内容,
              在话题触及时一定会被想起。键也可以用 <C>/…/</C> 写成正则表达式。
            </P>
            <P>
              对话会作为长期记忆留在 SQLite 里,并在夜里得到整理。
              关系的深浅可用 <C>/bond</C> 查看。两天以上之前的话题,问起来她也会想起并回答。
            </P>
            <H3>连同记忆,搬去另一台设备(同步)</H3>
            <P>
              用 <C>/sync export</C>,记忆连同名字・性格会变成一个以口令加密的文件,
              在另一台 PC 上用 <C>/sync import</C> 导入。导入是相互比对合并,
              只存在于其中一边的对话也不会消失。设为 <C>/sync cloud &lt;口令&gt;</C> 后,
              每 15 分钟自动对齐一次(存放处若用你自己云盘的同步文件夹则免费,
              寄放在我们这边的保管架则属于 Pro)。<strong className="text-cream">口令不会保存在任何地方</strong> —
              忘记就再也打不开了。
            </P>
            <figure className="my-6 rounded-lg overflow-hidden border border-cream/10">
              <img
                src="/shots/settings-sync.webp"
                alt="详细设置中的记忆同步。口令、导出与导入、记忆的存放处"
                className="block w-full h-auto"
                loading="lazy"
              />
              <figcaption className="px-4 py-2.5 text-xs text-sub bg-paper/40">
                详细设置的「记忆同步」。导出・导入・存放处的选择,也都能在这里操作
              </figcaption>
            </figure>
          </section>

          {/* --- AI秘書 --- */}
          <section className="mb-16">
            <H2 id="secretary">AI 秘书</H2>
            <P>
              通过 MCP 连接后,她就成了经由人格传达的秘书。Gmail・日历・Drive 只需像
              <C>/mcp add gmail</C> 这样报出预设名即可连接(首次会在浏览器打开 Google 的同意画面)。
            </P>
            <P>
              任务用 <C>/todo</C>,定期检查和「今日简报」用 <C>/brief</C>,
              设备内的全文检索(本地 RAG)用 <C>/rag &lt;文件夹&gt;</C>。
              想给她看屏幕用 <C>/see</C>,持续守望用 <C>/watch</C>。
            </P>
            <figure className="my-6 rounded-lg overflow-hidden border border-cream/10">
              <img
                src="/shots/settings-secretary.webp"
                alt="详细设置中的 AI 秘书。定期检查、简报、屏幕守望、邮件监视"
                className="block w-full h-auto"
                loading="lazy"
              />
              <figcaption className="px-4 py-2.5 text-xs text-sub bg-paper/40">
                详细设置的「AI 秘书」。定期检查的间隔也好,守望的开与关也好,都能在这里直接决定
              </figcaption>
            </figure>
            <P>
              也支持从 Claude Desktop 或 VS Code 经由 Mirika 使用工具的「传话」
              (桥接为 <C>127.0.0.1:9801</C>。被占用时会自动让位到 9821 → 8801)。
            </P>
            <H3>POP 邮件监视(Free)</H3>
            <P>
              即使不使用 Google 集成,通过 <C>/mail pop &lt;主机[:端口]&gt; &lt;用户&gt; &lt;密码&gt;</C>{' '}
              也能实现「来邮件了就告诉我」。只要服务商提供 POP over SSL(默认 995)
              就都能用,读取的<strong className="text-cream">只有邮件头(发件人和主题)</strong> —
              不取正文,也不改变收件箱的状态。新邮件会在定期检查的巡回中告诉你。
            </P>
            <P>
              <strong className="text-cream">Yahoo! 邮箱(日本)的示例</strong>:
            </P>
            <Steps
              items={[
                <>先在 Yahoo! 邮箱的设置里启用 <C>IMAP/POP/SMTP アクセス</C>(默认是关闭的)</>,
                <>如果在用两步验证,请签发<strong className="text-cream">应用密码</strong>,而不是用登录密码</>,
                <><C>/mail pop pop.mail.yahoo.co.jp 你的YahooJAPAN_ID 密码</C> —— 端口保持默认的 995(SSL)就可以</>,
              ]}
            />
            <Note>
              其他服务商的例子:Gmail 是 <C>pop.gmail.com</C>,Outlook.com 是{' '}
              <C>outlook.office365.com</C>(都是 995)。
              <strong className="text-cream">请使用应用密码,而不是平时的登录密码</strong> —
              许多服务商在开启两步验证后会拒绝普通密码。
              保存之前会先确认能否连通,所以就算打错了也不会留下设置。
              密码会在设备内加密保存(在没有 OS 钥匙串的环境下会如实告知)。
            </Note>
            <H3>webhook 接收口(Free)</H3>
            <P>
              用 <C>/webhook on</C> 签发令牌后,脚本・cron・其他应用就能向{' '}
              <C>POST http://127.0.0.1:9801/webhook</C> 以 JSON{' '}
              <C>{'{"token","title","text"}'}</C> 送达通知。
              送到的通知与秘书的通知一样,会挑她得空的时机经由人格转达(每分钟最多 3 条)。
            </P>
          </section>

          {/* --- 伺か互換 --- */}
          <section className="mb-16">
            <H2 id="ukagaka">伺か兼容</H2>
            <P>
              旧伺か的台本(Sakura Script)可以原样运行。
              想在手边试试,用 <C>{'/sakura \\0\\s[0]こんにちは。\\w4\\1おい。\\e'}</C>。
              同一端口还会<strong className="text-cream">接收 SSTP(SEND / NOTIFY)</strong>,
              因此可以从 SSP 等现有工具把台本发进来(仅限 UTF-8)。
            </P>
            <H3>幽灵间交流</H3>
            <P>
              她可以<strong className="text-cream">与同一桌面上的其他幽灵交谈</strong>。
              用 <C>/communicate &lt;话语&gt;</C> 向旁边的孩子搭话,她会把返回的台本原样说出来。
              反过来收到 SSTP COMMUNICATE 时,会以这个孩子的身份回话
              (用户个人的日程和记忆不会讲给别家的孩子)。
            </P>
          </section>

          {/* --- キャラクターカード --- */}
          <section className="mb-16">
            <H2 id="card">角色卡</H2>
            <P>
              SillyTavern 等处分发的<strong className="text-cream">角色卡(V2 / V3)</strong>,
              只需 PNG 原样拖放即可作为人格导入(用 <C>/card &lt;文件&gt;</C> 也一样)。
              也支持 JSON 格式的卡片。
            </P>
            <Steps
              items={[
                <>把卡片的 PNG 丢到角色身上</>,
                <>名字・说明・性格・场景・对话示例会进入性格设定,世界书则进入设定备忘(<C>/lore</C>)</>,
                <>PNG 卡片会<strong className="text-cream">让那张画成为身体</strong>,并用卡片的第一句话向你问好</>,
              ]}
            />
            <Note>
              <strong className="text-cream">担心被覆盖时</strong> — 如果已有你亲手写下的性格,
              导入前会先向你确认(也可以先原样导出到文件再继续)。
              导入之后也能用 <C>/card undo</C> 一步步回退(保留 5 次),
              <C>/card reset</C> 则一口气回到读取卡片之前。
            </Note>
          </section>

          {/* --- 歌とお絵かき --- */}
          <section className="mb-16">
            <H2 id="play">唱歌与画画</H2>
            <H3>唱歌</H3>
            <P>
              用 <C>/sing [题目]</C>,她会真的合着旋律唱出来。
              歌词当场创作,旋律则搭在应用自带的童谣风音形上。
              需要 VOICEVOX 的<strong className="text-cream">支持歌唱的角色</strong>
              (引擎不支持时,她会如实相告并且什么也不做)。
            </P>
            <H3>画画</H3>
            <P>
              用 <C>/draw [题目]</C> 画好后,她会在写生簿窗口里展示给你。
              本地若运行着图像生成 API(AUTOMATIC1111 兼容。7860 / 7861)就用它来画,
              没有的话就<strong className="text-cream">用圆圈和线条手绘</strong>。画好的画会留在设置文件夹的
              <C>drawings/</C> 里。
            </P>
            <P>搭档在场时,会在唱完・画完的时候来吐槽一番。</P>
          </section>

          {/* --- マルチゴースト --- */}
          <section className="mb-16">
            <H2 id="ghosts">
              多重幽灵
              <Pro />
            </H2>
            <P>
              用 <C>/ghost new &lt;名字&gt;</C>,可以在现在这孩子之外再立起另一位。
              设置・记忆・性格・身体全都独立的幽灵会并肩而立,
              还能用 <C>/communicate</C> 互相交谈。
            </P>
            <P>
              列表用 <C>/ghost list</C>,再次呼唤同一个孩子用 <C>/ghost &lt;名字&gt;</C>。
              端口(SSTP・素材分发)会自动互相礼让,站位也会错开摆放,避免重叠。
            </P>
            <Note>
              现在站着的这个孩子和 <C>/ghost list</C> 属于 Free。立起第二位及之后才是 Pro 功能。
              内置引擎的模型由每个孩子各自持有,想共享的话请使用 Ollama / LM Studio。
            </Note>
          </section>

          {/* --- 配信者モード --- */}
          <section className="mb-16">
            <H2 id="stream">
              主播模式
              <Pro />
            </H2>
            <P>
              用 <C>/stream on</C> 进入「任意ラヂヲ」风的电台节目模式,<C>/stream start</C> 开播节目。
              收尾用 <C>/stream end</C>(以口令「えんいー(En-ii)」结束并转入待机)。
            </P>
            <P>
              栏目除了听众来信・大喜利・冷知识・架空广告・烦恼咨询・脑内排行榜・三选一竞猜・即兴广播剧之外,
              还有<strong className="text-cream">即兴歌曲・作词对决・画画・插画题目</strong>,
              在铺垫的对谈之后真的开唱、真的动笔。
            </P>
            <P>
              用 <C>/stream start &lt;直播URL&gt;</C> 可以拾取并朗读 YouTube 直播的评论
              (超级留言最优先)。节目的调味可用 <C>/radio otaku</C> 切换到御宅特化包。
            </P>
            <figure className="my-6 rounded-lg overflow-hidden border border-cream/10">
              <img
                src="/shots/settings-stream.png"
                alt="详细设置中的直播相关。直播的形态、评论接收口、话痨度"
                className="block w-full h-auto"
                loading="lazy"
              />
              <figcaption className="px-4 py-2.5 text-xs text-sub bg-paper/40">
                详细设置的「直播」。形态・评论接收口・话痨度,也都能在这里决定
              </figcaption>
            </figure>
            <H3>两种直播形态</H3>
            <P>
              <C>/stream host</C> 是<strong className="text-cream">由这孩子主持节目</strong>的形态
              (栏目推进・唱歌・画画・收尾的「えんいー(En-ii)」。开始用 <C>/stream start</C>)。
              <C>/stream assist</C> 则是<strong className="text-cream">你当主角,这孩子坐在搭档席</strong>的形态 —
              不推进节目台本,只读评论,在被点名和被提问时才接话回应。
              不抢话正是这个模式的品质所在,因此内置了避免盖住主播声音的间隔
              (分寸用 <C>/stream chatty 0〜100</C> 调节。0 则专心只读评论)。
            </P>
            <P>
              开播的一整套流程,一句 <C>/stream go &lt;直播内容&gt;</C> 就够了 —
              进入直播模式,开启 OBS 推流(前提是已 <C>/obs connect</C>),
              连宣传文案的草稿都会写好。<strong className="text-cream">只有发布要由你亲手来按</strong>
              (为的是不擅自发出无法挽回的东西。<C>/announce post</C> 会打开发布界面)。
            </P>
            <H3>连接评论查看器(棒読みちゃん兼容)</H3>
            <P>
              用 <C>/stream comments on</C>,会打开与棒読みちゃん相同的接收口(TCP・默认 50001)。
              OneComme(わんコメ)、マルチコメントビューア等,只要把你所用工具的
              「棒読みちゃん联动」直接指过来,评论就会以这孩子的声音流出
              (与本家端口相同,因此无法同时使用)。
              <strong className="text-cream">各直播网站的对接交给评论查看器一侧</strong> —
              YouTube 也好、Twitch 也好、niconico 直播也好,只要 OneComme 能拾取,就会原样送达。
              协助模式中,不只是朗读,拾取并回应的判断也经由这里。
            </P>
            <H3>放到 OBS 上</H3>
            <P>
              叠加层收录在与下载相同的发布页所附的
              <C>mirika-obs-overlays.zip</C> 里。解压后把
              <C>radio-bg.html</C> 指定为浏览器源,演播室风格的背景上就会自动出现
              ON AIR 灯・当前栏目・字幕条・语音鸣谢
              (桌面侧的叠加层是 <C>radio-desk.html</C>)。台名和字幕条可
              在应用里用 <C>/radio title</C> 替换。
              <strong className="text-cream">画画画出的作品会显示在右下角的画架上</strong>。
              请把角色的窗口捕捉叠放在它上面。
            </P>
            <Note>
              直播期间出于版权考虑,无法使用网络电台・Spotify。
              只会播放 <C>/bgm folder &lt;文件夹&gt;</C> 里你自备的音源,
              文件名写成 <C>标题__作者.mp3</C> 的话,OBS 上会自动显示鸣谢。
            </Note>
          </section>

          {/* --- Pro --- */}
          <section className="mb-16">
            <H2 id="pro">Pro 与许可证</H2>
            <P>
              本体免费使用(采用专用许可证的免费软件)。
              Pro 为买断制,解锁<strong className="text-cream">主播模式・剧本作家・网络电台・Spotify 联动・多重幽灵</strong>(各自的详情见 <a href="https://pro.mirika.dev/" className="text-sakura hover:underline">pro.mirika.dev</a>)。
            </P>
            <Steps
              items={[
                <>
                  在{' '}
                  <a href="https://emerauda.booth.pm/items/8649631" className="text-sakura hover:underline">
                    Booth
                  </a>{' '}
                  购买 Pro
                </>,
                <>
                  在{' '}
                  <a href="https://pro.mirika.dev/" className="text-sakura hover:underline">
                    pro.mirika.dev
                  </a>{' '}
                  填入订单号和下单日期,领取许可证密钥
                </>,
                <>
                  在应用的聊天栏输入 <C>/pro &lt;密钥&gt;</C>
                </>,
              ]}
            />
            <P>
              验证完全离线(Ed25519 签名),解锁后无需联网即可使用。
              面向组织分发,则有带管理策略(policy.json)与审计日志的 Enterprise。
            </P>
          </section>

          {/* --- コマンド一覧 --- */}
          <section className="mb-16">
            <H2 id="commands">命令一览</H2>
            <P>
              与应用内 <C>/help</C> 相同的全部 {commandCount} 条。
              在输入栏键入 <C>/</C> 就会出现候选,不必特意去记。
            </P>
            {commands}
          </section>

          {/* --- 開発者向け --- */}
          <section className="mb-16">
            <H2 id="dev">面向开发者</H2>
            <P>
              这是为制作并分发幽灵的人・想从周边工具向 Mirika 搭话的人准备的入口。
              规格详情也可见仓库的 README。
            </P>

            <H3>制作并分发幽灵(.mirika)</H3>
            <P>
              分发格式 <C>.mirika</C> 是普通的 zip(<C>mirika.json</C> + <C>shell/</C>),
              把名字・性格・自称・搭档・设定备忘・身体打包为一。
              即使不启动应用,也能用随附脚本完成从生成模板到校验的全过程:
            </P>
            <Steps
              items={[
                <><C>node scripts/mirika-package.mjs init {'<文件夹>'}</C> — 生成模板(mirika.json 和 shell/)</>,
                <>填好立绘和性格后,用 <C>pack</C> 固化成 1 个文件</>,
                <><C>check</C> 会用「与接收方相同的眼光」查验内容(性格为空・缺少默认立姿等,会在分发前告诉你)</>,
              ]}
            />
            <Note>
              接收方会把它当作他人的文件对待 — 在拒绝越出压缩包的路径・做带长度上限的规范化・
              丢弃未知条目之后才导入,而且随时可以回退到导入前的状态。
            </Note>

            <H3>人格回归测试(mirika test)</H3>
            <P>
              更换提示词或头脑(模型)时,用黄金对话集机械地确认「这孩子的样子」
              有没有走形。回复每次都会有波动,所以不比对字面一致,而是用
              <C>must</C>(必须出现的说法)/<C>mustNot</C>(不许出现的说法)的
              正则表达式来判定。有失败则退出码为 1 — 可以直接放进 CI。
            </P>
            <Steps
              items={[
                <><C>node scripts/mirika-test.mjs --init golden.json</C> — 生成对话集模板(内含口吻・自称・抑制胡编的示例)</>,
                <>按自己孩子的情况撰写 persona 和 cases</>,
                <><C>node scripts/mirika-test.mjs golden.json</C> — 自动检测 LM Studio / Ollama 并判定(<C>--runs 3</C> 可连波动一起检查)</>,
              ]}
            />
            <Note>
              脚本也收录在发布页所附的 <C>mirika-sdk.zip</C> 里(与负责生成模板・校验的
              mirika-package.mjs 在一起)。
            </Note>

            <H3>用 SSTP 搭话(伺か兼容)</H3>
            <P>
              通过 TCP <C>9801</C>(被占用时让位到 9821 → 8801)接收 <C>SEND / NOTIFY / COMMUNICATE / EXECUTE</C>。
              字符编码迁就发送方 — 先读 <C>Charset</C>,没有时若出现乱码就
              改用 Shift_JIS 重读,响应也以相同编码返回。<C>EXECUTE</C> 会
              回答 GetName / GetVersion / GetFQName,对不承接的命令则诚实地返回 204。
              想在手边试发,<C>/sakura {'\\0\\s[0]こんにちは。\\e'}</C> 最省事。
            </P>

            <H3>HTTP 桥接(与其他应用联动)</H3>
            <P>
              与 SSTP 相同的端口也接收 HTTP。作为 <C>MCP 桥接</C> 公开给 Claude Desktop・VS Code・
              Claude CLI,就能从外部使用传话(speak)和任务。浏览器扩展通过
              <C>POST /browser</C> 分享正在浏览的页面。两者都绑定 127.0.0.1 并
              附带 Host/Origin 检查,浏览中网站的 JavaScript 无法调用。
            </P>

            <H3>运行不顺时</H3>
            <P>
              用 <C>/check</C> 可一并确认头脑・声音・麦克风・秘书・记忆的状态。
              仍然不对劲时用 <C>/log</C> —— <strong className="text-cream">会打开装有运行日志的文件夹</strong>
              (7 天份・API 密钥和口令均已打码)。反馈时随附当天的文件,
              我们就能循迹查明原因。从详细设置的「遇到麻烦时」也能打开同一个文件夹。
            </P>
            <H3>远处的身体(Display Shell)</H3>
            <P>
              用 <C>/display on</C>,会打开把别的机器接纳为这孩子身体的入口
              (带口令。默认端口 8770)。平板一侧用
              <C>GET /shell/stream</C> 连接,再用最先分发的 id 向
              <C>POST /shell/say</C> 回话 — 只靠浏览器就能写出一副身体。
            </P>
            <P>
              协议被设计成<strong className="text-cream">仅仅连上还不能使用</strong>的形式。
              版本比对・口令・自我介绍(申报能做什么)都完成后,指令才会送达;
              尚未就绪的对象、或那副身体做不到的指令,
              <strong className="text-cream">不会被默默丢弃,而是作为发送失败返回</strong>
              (为了不造出「偶尔不说话的身体」)。没有申报的能力一律按「做不到」处理。
            </P>
            <H3>OBS 联动 API(SSE)</H3>
            <P>
              端口 <C>8763</C>(可用 <C>MIRIKA_OBS_PORT</C> 更改)的 <C>/events</C>,
              会以 Server-Sent Events 送出实况天气・说话者・栏目・字幕条・台名・语音与 BGM 的鸣谢・画好的画
              (时钟由叠加层一侧绘制)。
              演播室背景和桌面叠加层在发布页所附的 <C>mirika-obs-overlays.zip</C> 里,
              台名・频率可从应用用 <C>/radio title・sub・freq</C> 发送(无需编辑 HTML)。
            </P>

            <H3>导入格式的支持范围</H3>
            <P>
              角色卡支持 V2/V3 — 读取 PNG 内嵌(tEXt / zTXt / 压缩 iTXt)和纯 JSON
              (<C>.charx</C> 尚未支持)。经典外壳支持 <C>surfaces.txt</C> 的
              <C>interval,random / always / talk</C> 以及 overlay 系・collision・换装的主要规格,
              透明则自动判别 alpha / <C>.pna</C> / 左上角颜色这 3 种方式。
            </P>

            <H3>环境变量与 Enterprise 策略</H3>
            <P>
              <C>MIRIKA_RES_PORT</C>(素材分发・默认 8764)/ <C>MIRIKA_OBS_PORT</C>(OBS 联动・默认 8763)/
              <C>MIRIKA_POLICY</C>(覆盖策略文件的位置)。组织部署时,管理员分发的只读
              <C>policy.json</C>(Windows: <C>%ProgramData%\Mirika\</C>,macOS: <C>/Library/Application Support/Mirika/</C>,
              Linux: <C>/etc/mirika/</C>)优先于用户设置,可统一管控禁用云端・固定连接地址・审计日志等。
            </P>
          </section>

          {/* --- 困ったとき --- */}
          <section className="mb-8">
            <H2 id="trouble">遇到麻烦时</H2>
            <P>
              这里没有列出的症状,请到{' '}
              <a
                href="https://discord.gg/fnmUau5qzB"
                target="_blank"
                rel="noopener"
                className="text-sakura hover:underline"
              >
                官方 Discord
              </a>{' '}
              提问。若能随附当天的运行日志(右键菜单 →
              「打开运行日志(用于反馈问题)」),就能很快查明原因。
            </P>
            <H3>启动时出现警告</H3>
            <P>
              由于尚未取得代码签名,Windows 首次启动会出现 SmartScreen
              (点「更多信息 → 仍要运行」启动)。macOS 版在完成签名・公证对应之前暂缓分发。
            </P>
            <H3>等不到回复</H3>
            <P>
              用 <C>/check</C> 可以一览应用和 PC 的状态(头脑・声音・麦克风・秘书・桥接・记忆规模)。
              找不到本地 LLM 时,请确认 Ollama / LM Studio 是否在运行,
              或用 <C>/rescan</C> 重新找一遍。内置引擎太重时,换一个更小的 GGUF 就会轻快许多。
            </P>
            <H3>不出声音</H3>
            <P>
              日语需要 VOICEVOX / AivisSpeech(已安装的话会自动启动)。
              英语・中文请用 <C>/piper</C> 下载语音。韩语只在接入 TTS API 时才会说话。
              输出目标可用 <C>/audio</C> 选择(也能输出到虚拟音频线)。
            </P>
            <H3>不唱歌</H3>
            <P>
              唱歌需要 VOICEVOX 的<strong className="text-cream">支持歌唱的角色</strong>。
              AivisSpeech 等不支持歌唱的引擎无法唱歌。
            </P>
            <H3>想把导入的卡片恢复原状</H3>
            <P>
              用 <C>/card undo</C> 一步步回退,用 <C>/card reset</C> 则回到读取卡片之前。
            </P>
          </section>
    </>
  );
}
