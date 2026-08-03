import { A, B, H2, H3, Note, P, Ul } from './legal-ui';

/** 法務文書の本文(英語)。正文は legal-body-ja.tsx —— 構成はそのファイルに揃える。 */

export function PrivacyBodyEn() {
  return (
    <>
      <P>
        Mirika is software that runs inside your own computer. This document explains when
        information leaves your machine, following the way the software is actually built.
      </P>

      <H2 id="not-collected">First, what we do not collect</H2>
      <P>
        In the default configuration, the following{' '}
        <B>never leave your machine at all</B>. They are never
        sent to our servers, and never stored there.
      </P>
      <Ul>
        <li>Your conversations with Mirika</li>
        <li>The memory Mirika keeps (memory.db), and her name and personality settings</li>
        <li>What is on your screen, the apps you have open, the pages you are looking at</li>
        <li>
          What you type, the pronunciation dictionary, your tasks, your schedule, and the
          contents of your mail
        </li>
        <li>Audio from your microphone (transcription, too, happens on your machine)</li>
      </Ul>
      <Note>
        We do not measure usage (analytics), we show no ads, and{' '}
        <B>we do not send crash reports automatically either</B>.
        Activity logs remain only on your machine — they are something you attach yourself when
        you report a problem.
      </Note>

      <H2 id="leaves">When information does leave</H2>
      <P>
        Information leaves only when you use the features below, and only as much as is needed.
        Whether to use each of them is your decision.
      </P>

      <H3>A cloud brain (optional)</H3>
      <P>
        If you pick ChatGPT, Claude, Gemini, or another such service as the brain,{' '}
        <B>
          what you say, along with its context, is sent to that provider
        </B>
        . How it is handled follows that provider's terms. The default is a local brain, and this
        feature runs only when you explicitly choose it.
      </P>

      <H3>Memory sync (optional)</H3>
      <P>
        When you raise the same girl on more than one machine, memory is{' '}
        <B>encrypted on your machine first</B> and then sent to
        the storage home. The passphrase exists only on your machine, so even we, who prepare the
        storage home, cannot read what is inside.
      </P>
      <P>
        If you choose a folder on your own cloud drive as the storage home, our servers are not
        involved at all. When we hold it for you (Pro), all we keep is the encrypted file, its
        size, and the time it was placed.
      </P>

      <H3>License checks</H3>
      <P>
        When you use a Pro or organization license, the app talks to our servers to verify the
        key and receive policies. What is handled here is the license identifier, the machine
        name, the app version, the time of the last check, and{' '}
        <B>the country the connection came from</B>.{' '}
        <B>
          The contents of your conversations are not included.
        </B>
      </P>
      <P>
        The country is recorded{' '}
        <B>to see whether a key is being passed around</B>. Pro
        keys are built to be verified entirely inside your machine, so the only time we see
        anything is when you use the sync storage home. What remains is only{' '}
        <B>
          up to 5 recently seen countries and the time of the last check
        </B>
        , and it does not become a history of your movements.
      </P>
      <Note>
        <B>We do not store IP addresses.</B> The country is only
        read from information Cloudflare attaches to the connection, and nothing that amounts to
        an address remains on our servers. Unauthorized access is blocked at{' '}
        <B>the Cloudflare layer in front of our servers</B>.
      </Note>

      <H3>Connecting external services (optional)</H3>
      <P>
        When you connect Gmail, Calendar, Drive, and the like, your machine accesses that
        provider directly. The credentials are stored encrypted on your machine and do not pass
        through our servers.
      </P>

      <H2 id="org">If you use Mirika in an organization</H2>
      <P>
        When you use Mirika under an organization license, the administrator can see{' '}
        <B>
          who is using how many machines, when they last used it, and from which country
        </B>
        .{' '}
        <B>
          Even the administrator cannot see the contents of your conversations.
        </B>{' '}
        What is on your screen, the apps you have open, and what you type are not passed on
        either.
      </P>
      <P>
        Depending on your organization's policy, input history may be set to be shared between
        machines. In that case, a note to that effect appears in the app's advanced settings, and
        it is not something you can change.
      </P>

      <H2 id="rights">Your rights</H2>
      <Ul>
        <li>
          Memory is a single file on your machine (memory.db). You can look at its contents,
          delete it, or move it to another machine, whenever you like
        </li>
        <li>
          Sync files in our care can be taken back with{' '}
          <code className="text-sakura">/sync cloud off</code>
        </li>
        <li>
          Even if you cancel your license,{' '}
          <B>the memory on your machine is not erased</B>. Sync
          can also continue through the free methods
        </li>
      </Ul>

      <H2 id="children">Use by children</H2>
      <P>
        This software does not knowingly collect personal information from children. If you are a
        minor, please use it with the consent of a parent or guardian.
      </P>

      <H2 id="changes">Changes to this document</H2>
      <P>
        When the content changes, we update the last-updated date on this page. If a change
        widens the range of information that leaves your machine, we will also let you know
        inside the app.
      </P>

      <H2 id="contact">Contact</H2>
      <P>
        Please reach us through{' '}
        <A href="https://github.com/emerauda/mirika-web/issues">
          GitHub Issues
        </A>
        .
      </P>
    </>
  );
}

export function TermsBodyEn() {
  return (
    <>
      <P>
        These terms set out the conditions for using Mirika (the "Software"). By downloading or
        using it, you are deemed to have agreed to these terms.
      </P>

      <H2 id="license">1. Scope of use</H2>
      <P>
        The Software is available to individuals and companies alike. Some of it can be used for
        free, and some of it requires a license key (Pro and organization plans).
      </P>
      <Ul>
        <li>
          A license key is for the person who purchased it or the organization that signed the
          contract
        </li>
        <li>
          <B>
            Do not distribute or resell your key to third parties.
          </B>{' '}
          If several people use the same key, they end up sharing the memory storage home, and
          each other's memories get mixed together
        </li>
        <li>Please keep an organization license within the number of seats contracted</li>
      </Ul>

      <H2 id="content">2. About generated content</H2>
      <P>
        The Software generates its responses with large language models.{' '}
        <B>
          We cannot guarantee that those responses are accurate or appropriate.
        </B>{' '}
        For decisions that matter, always check the facts yourself.
      </P>
      <Note>
        For matters that call for professional judgment — medical, legal, financial, and the like
        — do not use the Software's responses as advice.
      </Note>

      <H2 id="prohibited">3. Prohibited conduct</H2>
      <Ul>
        <li>Use for purposes that violate laws or regulations</li>
        <li>Generating or distributing content that infringes the rights of others</li>
        <li>Circumventing the license checks, or analyzing or tampering with the keys</li>
        <li>Using the storage home we provide for any purpose other than memory sync</li>
      </Ul>

      <H2 id="assets">4. About materials you bring in</H2>
      <P>
        For VRM and Live2D models, character cards, voices, music, and any other materials you
        bring in, follow the conditions set by each one's provider.{' '}
        <B>
          That a material works in the Software does not mean you are free to use it.
        </B>{' '}
        Please take particular care when you make things public, such as in a stream.
      </P>

      <H2 id="warranty">5. Disclaimer</H2>
      <P>
        The Software is provided as is. We cannot accept liability for damages arising from your
        use of it. However,{' '}
        <B>
          for the scope covered by a paid contract, we will take responsibility up to the amount
          you have paid us.
        </B>
      </P>
      <P>
        Memory is saved to a file on your machine.{' '}
        <B>Please keep backups yourself.</B> We cannot promise to
        restore what is lost to hardware failure or accidental operation.
      </P>

      <H2 id="availability">6. Service continuity</H2>
      <P>
        Server features we provide, such as license checks and the sync storage home, may be
        suspended or changed without notice. If we shut one down, we will announce it{' '}
        <B>
          with a period set aside for you to take your memory out
        </B>
        .
      </P>
      <P>
        As for the Software itself, even if the servers stop,{' '}
        <B>the local features keep working as they are</B>. If
        the license goes unverified for an extended period, it returns to the free tier, but your
        memory and settings are left untouched.
      </P>

      <H2 id="refund">7. Refunds</H2>
      <P>
        Because of the nature of download sales, we are unable to offer refunds as a rule.
        However,{' '}
        <B>
          if a defect in the Software keeps it from working as described at the time of purchase
        </B>
        , please talk to us.
      </P>

      <H2 id="changes">8. Changes to these terms</H2>
      <P>
        We may revise these terms when necessary. For important changes, we will let you know in
        the app or on this site.
      </P>

      <H2 id="law">9. Governing law</H2>
      <P>These terms are governed by the laws of Japan.</P>

      <H2 id="contact">Contact</H2>
      <P>
        Please reach us through{' '}
        <A href="https://github.com/emerauda/mirika-web/issues">
          GitHub Issues
        </A>
        .
      </P>
    </>
  );
}
