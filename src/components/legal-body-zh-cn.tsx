import { H2, H3, Note, P, Ul } from './legal-ui';

/** 法務文書の本文(簡体字中国語)。日本語正文は legal-body-ja.tsx —— 構成はそちらに揃える。 */

export function PrivacyBodyZhCn() {
  return (
    <>
      <P>
        Mirika 是在你的电脑中运行的软件。这份文档将按照软件实际的构造,说明信息在什么时候会离开你的设备。
      </P>

      <H2 id="not-collected">首先,我们不收集的内容</H2>
      <P>
        在默认配置下,下列内容<strong className="text-cream">一律不会离开你的设备</strong>
        。它们不会被发送到我们的服务器,也不会被保存在那里。
      </P>
      <Ul>
        <li>你与 Mirika 的对话</li>
        <li>Mirika 记住的记忆(memory.db),以及名字、性格的设置</li>
        <li>屏幕上的内容、打开的应用、正在浏览的页面</li>
        <li>输入的文字、读音词典、任务、日程、邮件的内容</li>
        <li>麦克风的声音(语音转文字也在设备内完成)</li>
      </Ul>
      <Note>
        我们不做使用情况的统计(分析),不投放广告,
        <strong className="text-cream">也不会自动发送崩溃报告</strong>
        。运行日志只保留在设备内,是你在报告问题时自己附上的内容。
      </Note>

      <H2 id="leaves">信息会离开设备的情形</H2>
      <P>只有在使用下列功能时,必要的部分才会离开设备。每一项是否使用,都由你来决定。</P>

      <H3>云端的头脑(可选)</H3>
      <P>
        如果选择 ChatGPT・Claude・Gemini 等作为头脑,
        <strong className="text-cream">你的发言和上下文会被发送给该提供方</strong>
        。相关处理遵循该提供方的条款。默认是本地的头脑,这项功能只在你明确选择时才会运行。
      </P>

      <H3>记忆的同步(可选)</H3>
      <P>
        在多台设备上培养同一个孩子时,记忆会
        <strong className="text-cream">先在你的设备上加密</strong>
        ,然后才送往存放处。口令只存在于你的设备上,所以即使是提供存放处的我们,也读不到其中的内容。
      </P>
      <P>
        如果存放处选择你自己云盘中的文件夹,我们的服务器完全不参与。由我们代为保管时(Pro),保存的只有加密后的文件,以及它的大小・存放的时刻。
      </P>

      <H3>许可证的验证</H3>
      <P>
        使用 Pro 或面向组织的许可证时,为了验证密钥和接收策略,应用会与我们的服务器通信。此时涉及的是许可证的标识符、设备名称、应用版本、最后一次验证的日期与时间,以及
        <strong className="text-cream">连接来源的国家</strong>。
        <strong className="text-cream">其中不包含对话的内容。</strong>
      </P>
      <P>
        记录国家,是<strong className="text-cream">为了查看密钥有没有被分发出去</strong>
        。Pro 密钥采用只需在设备内就能完成验证的机制,所以我们能看到的,只有你使用同步存放处的时候。留下的只有
        <strong className="text-cream">最近出现过的国家(最多 5 个)和最后一次验证的日期与时间</strong>
        ,不会形成移动的历史记录。
      </P>
      <Note>
        <strong className="text-cream">我们不保存 IP 地址。</strong>
        国家只是从 Cloudflare 附加在通信上的信息中读取,相当于住址的内容不会留在我们的服务器上。对非法访问的拦截,在
        <strong className="text-cream">位于我们前面的 Cloudflare 这一层</strong>
        进行。
      </Note>

      <H3>外部服务的联动(可选)</H3>
      <P>
        连接 Gmail・日历・Drive 等服务后,会从你的设备直接访问该提供方。认证信息在设备内加密保存,不经过我们的服务器。
      </P>

      <H2 id="org">在组织中使用时</H2>
      <P>
        使用组织的许可证时,管理员可以看到
        <strong className="text-cream">
          谁在使用多少台设备、最后一次是什么时候使用、从哪个国家使用
        </strong>
        。<strong className="text-cream">对话的内容连管理员也看不到。</strong>
        屏幕上的内容、打开的应用、输入的文字,也都不会传过去。
      </P>
      <P>
        根据组织的策略,输入历史有时会被设置为在设备之间共享。这种情况下,应用的详细设置中会显示这一点,并处于你无法更改的状态。
      </P>

      <H2 id="rights">你的权利</H2>
      <Ul>
        <li>
          记忆是设备内的一个文件(memory.db)。查看其中的内容、将它删除、或是移到别的设备,随时都可以
        </li>
        <li>
          由我们保管的同步文件,可以用 <code className="text-sakura">/sync cloud off</code>{' '}
          取回
        </li>
        <li>
          即使解约许可证,
          <strong className="text-cream">设备上的记忆也不会消失</strong>。同步也可以用免费的方式继续
        </li>
      </Ul>

      <H2 id="children">儿童的使用</H2>
      <P>
        本软件不会有意收集儿童的个人信息。未成年人请在监护人同意后使用。
      </P>

      <H2 id="changes">本文档的变更</H2>
      <P>
        更改内容时,我们会更新此页面的最后更新日期。如果变更会扩大离开设备的信息范围,我们也会在应用内告知。
      </P>

      <H2 id="contact">联系我们</H2>
      <P>
        请通过{' '}
        <a href="https://github.com/emerauda/mirika-web/issues" className="text-sakura hover:underline">
          GitHub 的 Issue
        </a>{' '}
        与我们联系。
      </P>
    </>
  );
}

export function TermsBodyZhCn() {
  return (
    <>
      <P>
        本条款规定 Mirika(以下简称「本软件」)的使用条件。一经下载或使用,即视为你已同意本条款。
      </P>

      <H2 id="license">1. 使用范围</H2>
      <P>
        无论个人还是法人,都可以使用本软件。其中有可以免费使用的范围,也有需要许可证密钥的范围(Pro・面向组织)。
      </P>
      <Ul>
        <li>许可证密钥是供购买者本人或签约的组织使用的</li>
        <li>
          <strong className="text-cream">请不要向第三方分发・转售密钥。</strong>
          如果多个人使用同一个密钥,就会共享记忆的存放处,彼此的记忆会混在一起
        </li>
        <li>面向组织的许可证,请在签约的席位数范围内使用</li>
      </Ul>

      <H2 id="content">2. 关于生成的内容</H2>
      <P>
        本软件使用大语言模型生成回应。
        <strong className="text-cream">
          我们无法保证其内容准确、恰当。
        </strong>
        重要的判断,请务必自行核实。
      </P>
      <Note>
        医疗・法律・金融等需要专业判断的事项,请不要把本软件的回应当作建议来使用。
      </Note>

      <H2 id="prohibited">3. 禁止事项</H2>
      <Ul>
        <li>以违反法律法规为目的的使用</li>
        <li>生成・分发侵害他人权利的内容</li>
        <li>绕过许可证验证的行为,以及对密钥的解析・篡改</li>
        <li>将我们提供的存放处用于记忆同步以外的目的</li>
      </Ul>

      <H2 id="assets">4. 关于你带入的素材</H2>
      <P>
        VRM・Live2D 模型、角色卡、语音、乐曲等你带入的素材,其使用条件请遵循各自提供方的规定。
        <strong className="text-cream">
          能在本软件中使用,并不意味着可以自由使用该素材。
        </strong>
        在直播等场合公开时,请格外注意。
      </P>

      <H2 id="warranty">5. 免责</H2>
      <P>
        本软件按现状原样提供。对于因使用而产生的损害,我们恕不承担责任。但是,
        <strong className="text-cream">
          对于付费签约的范围,我们会以你所支付的对价为上限进行处理。
        </strong>
      </P>
      <P>
        记忆保存在设备内的文件中。
        <strong className="text-cream">请自行做好备份。</strong>
        对于因设备故障或误操作造成的丢失,我们无法承诺恢复。
      </P>

      <H2 id="availability">6. 服务的持续</H2>
      <P>
        许可证的验证、同步的存放处等由我们提供的服务器功能,可能不经预告而停止或变更。要停止时,我们会
        <strong className="text-cream">
          先留出一段可以取走你的记忆的期间
        </strong>
        ,再发出通知。
      </P>
      <P>
        本软件本身,即使服务器停止,
        <strong className="text-cream">本地功能也会照常运作</strong>
        。如果持续一段时间无法完成许可证验证,软件会回到免费的范围,但不会触碰你的记忆和设置。
      </P>

      <H2 id="refund">7. 退款</H2>
      <P>
        由于下载销售的性质,原则上恕不退款。但是,
        <strong className="text-cream">如果因本软件的缺陷而无法按照购买时的说明运行</strong>
        ,请与我们商量。
      </P>

      <H2 id="changes">8. 条款的变更</H2>
      <P>
        我们可能根据需要变更本条款。重要的变更,会在应用内或本网站上告知。
      </P>

      <H2 id="law">9. 准据法</H2>
      <P>本条款以日本法律为准据法。</P>

      <H2 id="contact">联系我们</H2>
      <P>
        请通过{' '}
        <a href="https://github.com/emerauda/mirika-web/issues" className="text-sakura hover:underline">
          GitHub 的 Issue
        </a>{' '}
        与我们联系。
      </P>
    </>
  );
}
