import type { ReactNode } from 'react';
import { C, H2, H3, Note, P, Pro, Steps } from './docs-ui';

/** 使い方ドキュメント本文(韓国語)。構成と JSX の形は docs-body-ja.tsx に揃える。 */

export function DocsBodyKo({ commands, commandCount }: { commands: ReactNode; commandCount: number }) {
  return (
    <>
          {/* --- はじめに --- */}
          <section className="mb-16">
            <H2 id="start">시작하기</H2>
            <P>
              Mirika는 데스크톱에 상주하는 캐릭터(고스트)입니다.
              기본 구성은 완전 로컬이라 API 비용이 들지 않고, 대화는 기기 밖으로 나가지 않습니다.
            </P>
            <Steps
              items={[
                <>
                  <a href="/#download" className="text-sakura hover:underline">
                    다운로드
                  </a>
                  해서 설치합니다(Windows / Linux. macOS는 서명 대응까지 준비 중)
                </>,
                <>
                  실행하면 기본 아이(Komane)가 데스크톱 오른쪽 아래에 섭니다. 동봉된 VRM은
                  본체 "Komane"·파트너 "Chise (TKSP)"로, 모두{' '}
                  <a href="https://goho-cheat-vrc.booth.pm/" target="_blank" rel="noreferrer">
                    VRC合法チート研究会
                  </a>{' '}
                  님의 작품을 허락을 받아 동봉했습니다(모델의 재배포는 불가)
                </>,
                <>
                  두뇌(LLM)를 연결합니다. <C>Ollama</C>나 <C>LM Studio</C>가 실행 중이면 자동으로 찾아냅니다.
                  아무것도 없다면 우클릭 메뉴의 "두뇌" → "내장 엔진"으로 그 자리에서 마련할 수 있습니다
                </>,
                <>입력창에 말을 겁니다. 목소리를 내고 싶다면 VOICEVOX나 AivisSpeech를 설치해 두기만 하면 말합니다</>,
              ]}
            />
            <Note>
              <strong className="text-cream">조작의 기본</strong> — 잡아서 드래그하면 이동, 우클릭으로 메뉴가
              열립니다. <C>.vrm</C>이나 <C>.pmx</C>(MMD)는 창에 떨어뜨리면 갈아입습니다(더블클릭에는 아무것도 할당되어 있지 않습니다).
              쓰다듬기는 <strong className="text-cream">머리나 가슴 언저리에서 손을 왔다 갔다 했을 때만</strong> 세고,
              그냥 지나간 것만으로는 반응하지 않습니다(넣어둔 동안이나 전체 화면 앱 아래에서는 세지 않습니다).
              잠시 들어가 있길 바랄 때는 메뉴의 "넣어두기", 되돌릴 때는 트레이 아이콘에서.
              입력창에서 <C>/</C>를 치면 명령어 후보가 나옵니다(↑↓로 선택, Tab / Enter로 완성).
              후보가 나와 있지 않을 때의 ↑↓는 입력 이력입니다.
            </Note>
            <P>
              막히면 <a href="#trouble" className="text-sakura hover:underline">"문제가 생겼을 때"</a>로.
              지금 상태는 <C>/check</C>가 한꺼번에 알려 줍니다(두뇌·목소리·마이크·비서·기억).
            </P>
          </section>

          {/* --- 頭脳 --- */}
          <section className="mb-16">
            <H2 id="brain">두뇌(LLM) 연결하기</H2>
            <P>연결은 3단 구성입니다. 모두 채팅창에서 전환할 수 있습니다.</P>
            <H3>내장 엔진(가장 간편)</H3>
            <P>
              <C>/brain embedded</C> 또는 우클릭 메뉴에서. 앱 안에서만 동작합니다.
              모델은 <strong className="text-cream">쓰시는 PC에 올라가는 크기가 자동으로 선택됩니다</strong> —— VRAM
              8GB급이면 Gemma 4 12B(4bit·약 6.7GB), 거기까지는 안 되면 E4B(약 5GB), E2B(약 3GB)로 내려갑니다.
              16GB·24GB급 GPU를 갖고 계시다면 <strong className="text-cream">더 큰 것을 내려받을지 여쭤봅니다</strong>(26B-A4B / 31B).
              선택한 이유는 동작 로그에 남습니다. GGUF를 갖고 계시다면 "GGUF 열기…"로 그것을 쓸 수 있습니다.
            </P>
            <H3>로컬 런타임(권장)</H3>
            <P>
              Ollama(11434)와 LM Studio(1234)는 <strong className="text-cream">실행 중이면 자동 감지</strong>됩니다.
              모델을 고르는 것은 <C>/model &lt;이름&gt;</C>, 접속 대상을 직접 정하려면 <C>/endpoint &lt;URL&gt;</C>,
              다시 찾기는 <C>/rescan</C>.
            </P>
            <H3>클라우드(임의·옵트인)</H3>
            <P>
              <C>/brain chatgpt &lt;API 키&gt;</C>처럼 명령어 하나로. Claude·Gemini·Grok도 같은 형식입니다.
              Claude는 API 키 없이도 <C>/brain claude</C>로 Claude Code CLI의 구독 인증을 쓸 수 있습니다.
              평소에는 로컬 그대로 두고, 이 한 가지 질문만 클라우드에서 생각해 주길 바랄 때는 <C>/cloud &lt;질문&gt;</C>.
            </P>
            <Note>API 키는 OS의 세이프 스토리지로 암호화해 저장됩니다(<C>enc:</C> 형식).</Note>
          </section>

          {/* --- 声 --- */}
          <section className="mb-16">
            <H2 id="voice">목소리와 마이크</H2>
            <H3>말하게 하기</H3>
            <P>
              <strong className="text-cream">일본어</strong>는{' '}
              <a href="https://voicevox.hiroshiba.jp/" className="text-sakura hover:underline">
                VOICEVOX
              </a>{' '}
              또는{' '}
              <a href="https://aivis-project.com/" className="text-sakura hover:underline">
                AivisSpeech
              </a>{' '}
              중 하나를 설치해 두기만 하면 됩니다. Mirika가 엔진을 뒤에서 실행·종료합니다.
              목소리 목록은 <C>/voice list</C>, 변경은 <C>/voice &lt;ID&gt;</C>(파트너는 <C>/partner voice</C>).
              잘못 읽는 것은 <C>/read 早急 さっきゅう</C>처럼 고칠 수 있습니다.
            </P>
            <P>
              <strong className="text-cream">영어·중국어</strong>는 내장 Piper. <C>/piper</C>로 필요한 만큼만
              내려받습니다. <strong className="text-cream">한국어</strong>는 로컬 음성이 없어 자막만(무음) 나옵니다.
            </P>
            <H3>TTS API로 덮어쓰기</H3>
            <P>
              <C>/tts &lt;베이스 URL&gt; [모델]</C>로 OpenAI 호환 음성 합성을
              가리키면, <strong className="text-cream">한국어를 포함한 모든 언어</strong>를 그 목소리로 말합니다(kokoro·GPT-SoVITS 등).
              URL을 넣으면 목소리 목록을 가져와, 설정 화면의 본체·파트너 드롭다운에서 고를 수 있습니다. 되돌리기는 <C>/tts off</C>.
            </P>
            <H3>알아듣기</H3>
            <P>
              입력창의 🎤를 눌러 말하거나(푸시 투 토크), <C>/mic always</C>로 상시 대기.
              대기 중에는 이름을 부른 발화만 줍습니다. 모델은 PC 성능에 따라 자동 선택되며, <C>/mic model</C>로 바꿀 수 있습니다.
            </P>
            <P>
              <strong className="text-cream">음성 파일</strong>(mp3 / wav / m4a / ogg / opus / flac)을
              드래그 앤 드롭하면, 통째로 받아 적어 <strong className="text-cream">요약과 감상</strong>을 돌려줍니다
              (최장 15분. 정확도는 마이크와 같은 Whisper 모델에 달려 있습니다).
            </P>
          </section>

          {/* --- 身体 --- */}
          <section className="mb-16">
            <H2 id="body">몸(셸)</H2>
            <P>본체와 파트너 각각 4종류의 몸에서 고를 수 있습니다(혼용도 가능). 우카가카의 클래식 셸은 "우카가카 호환" 절로.</P>
            <H3>VRM(3D)</H3>
            <P>
              <C>/shell vrm [파일.vrm]</C>. <C>.vrm</C>을 캐릭터에 드롭해도 갈아입습니다.
              기본으로 되돌리는 것은 <C>/shell vrm default</C>. <C>.vrma</C>를 떨어뜨리면 모션을 시험할 수 있습니다.
            </P>
            <H3>MMD(PMX)</H3>
            <P>
              <C>.pmx</C>를 캐릭터에 떨어뜨리기만 하면 갈아입습니다(<C>/shell mmd &lt;파일.pmx&gt;</C>나
              메뉴의 "모델 열기…"에서도). 텍스처는 모델의 폴더에서 자동으로 집어 오고,
              다음 실행에서도 입은 채입니다. <strong className="text-cream">입고 있는 동안 <C>.vmd</C>를 떨어뜨리면 그 모션으로 춤춥니다</strong>
              (입과 눈의 모프도 움직입니다). 툰 음영과 스피어 맵의 광택에 대응합니다.
              눈 깜박임·립싱크·시선·몸짓·창 가장자리 걸터앉기는 VRM과 똑같이 움직입니다.
              머리 뼈가 없는 등 입을 수 없는 모델은 이유를 말하고 거절하고, 입이나 표정의 모프가 없는 모델은 입고 나서 그렇다고 알려 줍니다.
            </P>
            <H3>Live2D</H3>
            <P>
              <C>/shell live2d [hiyori|mao]</C>. 공식 샘플인 모모세 히요리·Mao를 동봉하고 있습니다
              (v1은 동봉 모델 고정).
            </P>
            <H3>카드 셸(스탠딩 일러스트)</H3>
            <P>
              캐릭터 카드의 PNG를 불러오면 <strong className="text-cream">그 그림이 몸이 됩니다</strong>.
              좋아하는 이미지를 세우려면 <C>/shell card &lt;이미지.png&gt;</C>. 투명 PNG는 잘라낸 모습 그대로 서고,
              호흡의 오르내림과 말할 때의 들썩임으로 살아 있는 것처럼 보입니다. 3D로 되돌리는 것은 <C>/shell vrm</C>.
            </P>
            <H3>파트너 부르기</H3>
            <P>
              <C>/summon</C>으로 파트너가 나란히 서고, 두 사람이 주고받는 대화가 됩니다. 돌려보내는 것은 <C>/dismiss</C>.
              파트너의 몸은 <C>/partner shell</C>로 따로 고를 수 있습니다(VRM / Live2D / MMD).
            </P>
          </section>

          {/* --- 人格と記憶 --- */}
          <section className="mb-16">
            <H2 id="persona">인격과 기억</H2>
            <P>
              이름은 <C>/name</C>, 1인칭은 <C>/first</C>, 성격은 <C>/persona &lt;설명&gt;</C>으로 다시 씁니다.
              샘플에서 고르려면 <C>/persona sample</C>(발랄한 소꿉친구·츤데레·집사풍 등).
              파트너 쪽은 각각 <C>/partner</C> <C>/partner first</C> <C>/partner persona</C>.
            </P>
            <P>
              <strong className="text-cream">설정 메모</strong>(<C>/lore add &lt;키&gt; &lt;내용&gt;</C>)에 넣은 말은,
              화제에 올랐을 때 확실하게 떠올립니다. 키는 <C>/…/</C>로 정규 표현식으로 만들 수도 있습니다.
            </P>
            <P>
              대화는 SQLite에 장기 기억으로 남아, 밤사이에 정리됩니다.
              관계의 깊이는 <C>/bond</C>로 볼 수 있습니다. 이틀 이상 전의 이야기도, 물어보면 떠올려서 대답합니다.
            </P>
            <H3>친밀도는 몇 년에 걸쳐 자랍니다</H3>
            <P>
              친밀도는 말을 건 횟수의 합계가 아닙니다. <strong className="text-cream">유대(몇 년 단위)와 기분(나날)의 2층</strong>으로 움직입니다.
              하루에 자랄 양에는 상한이 있고, 깊어질수록 한 걸음이 무거워지므로 "가족 같은 존재"에 닿는 것은 몇 년 뒤입니다.
            </P>
            <Note>
              <strong className="text-cream">내려가기도 합니다</strong> — 한동안 만나지 않으면 거리가 생기고(사흘쯤부터, 2주를 넘으면 더 빠르게),
              비가 이어지면 가라앉고, 너무 쓰다듬으면 지치고, 같은 이야기만으로는 마음이 움직이지 않습니다. 이따금 이유 없이 기운이 나지 않는 날도 있습니다
              (만난 날부터 이어지는 바이오리듬). 다만 <strong className="text-cream">남으로는 돌아가지 않습니다</strong> — 한 번 닿은 단계의 절반이 바닥이고,
              떨어져 있던 만큼의 일부는 다시 만난 뒤의 대화에서 빨리 돌아옵니다. 쓰다듬어도 되는 횟수는 관계의 깊이에 따라 달라집니다.
            </Note>
            <P>
              <C>/bond</C>는 숫자를 보여 주지 않습니다. 만난 날수·대화 횟수·기억하고 있는 것에 더해, 단계(★)와
              "요즘 부쩍 가까워지고 있는 것 같아", "요즘: 비가 계속돼서 왠지 기운이 나지 않았어" 같은 <strong className="text-cream">기색의 말</strong>만 돌려줍니다.
              그날의 기분은 대답의 어조에도 그대로 나타납니다.
            </P>
            <H3>기억째로 다른 기기에(동기화)</H3>
            <P>
              <C>/sync export</C>로 기억도 이름·성격도 암호 문구로 암호화한 1개의 파일이 되고,
              다른 PC의 <C>/sync import</C>로 불러올 수 있습니다. 불러오기는 맞춰 보며 합치는 방식이라,
              어느 한쪽에만 있는 대화도 사라지지 않습니다. <C>/sync cloud &lt;암호 문구&gt;</C>로 하면
              15분마다 자동으로 맞춰집니다(두는 곳이 내 클라우드의 동기화 폴더라면 무료,
              저희가 맡아 두는 보관함은 Pro). <strong className="text-cream">암호 문구는 어디에도 저장되지 않습니다</strong> —
              잊어버리면 열 수 없게 됩니다.
            </P>
            <figure className="my-6 rounded-lg overflow-hidden border border-cream/10">
              <img
                src="/shots/settings-sync.webp"
                alt="상세 설정의 기억 동기화. 암호 문구, 내보내기와 불러오기, 기억을 두는 곳"
                className="block w-full h-auto"
                loading="lazy"
              />
              <figcaption className="px-4 py-2.5 text-xs text-sub bg-paper/40">
                상세 설정의 "기억 동기화". 내보내기·불러오기·두는 곳의 선택은 여기에서도 조작할 수 있습니다
              </figcaption>
            </figure>
          </section>

          {/* --- AI秘書 --- */}
          <section className="mb-16">
            <H2 id="secretary">AI 비서</H2>
            <P>
              MCP로 연결하면 인격을 거친 비서가 됩니다. Gmail·캘린더·Drive는 <C>/mcp add gmail</C>처럼
              프리셋 이름만으로 연결됩니다(첫 회에는 브라우저에서 Google 동의 화면이 열립니다).
            </P>
            <P>
              태스크는 <C>/todo</C>, 정기 체크와 "오늘의 브리핑"은 <C>/brief</C>,
              기기 안의 전문 검색(로컬 RAG)은 <C>/rag &lt;폴더&gt;</C>.
              화면을 보여 주는 것은 <C>/see</C>, 지켜보기는 <C>/watch</C>.
            </P>
            <figure className="my-6 rounded-lg overflow-hidden border border-cream/10">
              <img
                src="/shots/settings-secretary.webp"
                alt="상세 설정의 AI 비서. 정기 체크, 브리핑, 화면 지켜보기, 메일 감시"
                className="block w-full h-auto"
                loading="lazy"
              />
              <figcaption className="px-4 py-2.5 text-xs text-sub bg-paper/40">
                상세 설정의 "AI 비서". 정기 체크의 간격도, 지켜보기의 켜고 끄기도 여기에서 그대로 정할 수 있습니다
              </figcaption>
            </figure>
            <P>
              Claude Desktop이나 VS Code에서 Mirika를 거쳐 도구를 쓰는 "전언"도 가능합니다
              (브리지는 <C>127.0.0.1:9801</C>. 사용 중이면 9821 → 8801로 자동으로 양보합니다).
            </P>
            <H3>POP 메일 감시(Free)</H3>
            <P>
              Google 연동을 쓰지 않아도, <C>/mail pop &lt;호스트[:포트]&gt; &lt;사용자&gt; &lt;비밀번호&gt;</C>{' '}
              명령으로 "메일이 오면 알려 줘"가 성립합니다. POP over SSL(기본 995)이 있는 프로바이더라면
              어디에서나 쓸 수 있고, 읽는 것은 <strong className="text-cream">헤더(보낸 사람과 제목)뿐</strong> —
              본문은 가져오지 않고, 받은편지함의 상태도 바꾸지 않습니다. 새 메일은 정기 체크의 순회에서 알려 줍니다.
            </P>
            <P>
              <strong className="text-cream">Yahoo! 메일(일본)의 예</strong>:
            </P>
            <Steps
              items={[
                <>Yahoo! 메일의 설정에서 <C>IMAP/POP/SMTP アクセス</C>(액세스)를 켜 둡니다(기본으로는 꺼져 있습니다)</>,
                <>2단계 인증을 쓰고 있다면, 로그인용 비밀번호가 아니라 <strong className="text-cream">앱 비밀번호</strong>를 발급합니다</>,
                <><C>/mail pop pop.mail.yahoo.co.jp 내_YahooJAPAN_ID 비밀번호</C> —— 포트는 기본 995(SSL) 그대로면 됩니다</>,
              ]}
            />
            <Note>
              다른 회사의 예: Gmail은 <C>pop.gmail.com</C>, Outlook.com은{' '}
              <C>outlook.office365.com</C>(모두 995). <strong className="text-cream">평소의 로그인 비밀번호가 아니라 앱 비밀번호를 써 주세요</strong> —
              많은 프로바이더는 2단계 인증을 켜 두면 일반 비밀번호로는 거부합니다.
              연결되는지는 저장하기 전에 확인하므로, 잘못 입력해도 설정은 남지 않습니다.
              비밀번호는 기기 안에서 암호화해 저장합니다(OS의 키링이 없는 환경에서는 그 사실을 알려 드립니다).
            </Note>
            <H3>webhook 수신구(Free)</H3>
            <P>
              <C>/webhook on</C>으로 토큰을 발급하면, 스크립트·cron·다른 앱에서{' '}
              <C>POST http://127.0.0.1:9801/webhook</C>에 JSON{' '}
              <C>{'{"token","title","text"}'}</C> 형태로 알림을 보낼 수 있습니다.
              도착한 알림은 비서의 알림과 마찬가지로, 한가한 타이밍에 인격을 거쳐 전합니다(1분에 3건까지).
            </P>
          </section>

          {/* --- 伺か互換 --- */}
          <section className="mb-16">
            <H2 id="ukagaka">우카가카 호환</H2>
            <P>
              옛 우카가카의 대본(사쿠라 스크립트)이 그대로 움직입니다.
              직접 시험해 보려면 <C>{'/sakura \\0\\s[0]こんにちは。\\w4\\1おい。\\e'}</C>.
              같은 포트로 <strong className="text-cream">SSTP(SEND / NOTIFY)를 수신</strong>하므로,
              SSP 등 기존 도구에서 대본을 보낼 수 있습니다(UTF-8만).
            </P>
            <H3>고스트 간 커뮤니케이트</H3>
            <P>
              같은 데스크톱에 있는 <strong className="text-cream">다른 고스트와 대화</strong>할 수
              있습니다. <C>/communicate &lt;말&gt;</C>로 옆의 아이에게 말을 걸면, 돌아온 대본을 그대로 말합니다.
              반대로 SSTP COMMUNICATE를 받았을 때는, 이 아이로서 대답을 돌려줍니다
              (사용자 개인의 일정이나 기억은 남의 집 아이에게는 말하지 않습니다).
            </P>
          </section>

          {/* --- キャラクターカード --- */}
          <section className="mb-16">
            <H2 id="card">캐릭터 카드</H2>
            <P>
              SillyTavern 등에서 배포되는 <strong className="text-cream">캐릭터 카드(V2 / V3)</strong>를,
              PNG 그대로 드래그 앤 드롭하기만 하면 인격으로 불러올 수 있습니다(<C>/card &lt;파일&gt;</C>로도 동일).
              JSON 카드에도 대응하고 있습니다.
            </P>
            <Steps
              items={[
                <>카드의 PNG를 캐릭터에 떨어뜨립니다</>,
                <>이름·설명·성격·장면·대화 예시가 성격 설정에 들어가고, 로어북은 설정 메모(<C>/lore</C>)로</>,
                <>PNG 카드는 <strong className="text-cream">그 그림이 몸이 되고</strong>, 카드의 첫마디로 인사합니다</>,
              ]}
            />
            <Note>
              <strong className="text-cream">덮어쓰기가 걱정될 때</strong> — 직접 쓴 성격이 들어 있는 경우에는,
              불러오기 전에 확인이 나옵니다(그대로 파일로 내보낸 뒤에 진행할 수도 있습니다).
              불러온 뒤에도 <C>/card undo</C>로 한 단계씩 되돌릴 수 있고(5회분 보관), <C>/card reset</C>이라면
              카드를 읽기 전까지 단숨에 돌아갑니다.
            </Note>
          </section>

          {/* --- 歌とお絵かき --- */}
          <section className="mb-16">
            <H2 id="play">노래와 그림 그리기</H2>
            <H3>노래하기</H3>
            <P>
              <C>/sing [주제]</C>로, 실제로 멜로디에 실어 노래합니다.
              가사는 그 자리에서 짓고, 선율은 앱이 가진 전래동요풍의 음형에 실습니다.
              VOICEVOX의 <strong className="text-cream">가창 대응 캐릭터</strong>가 필요합니다
              (설치되어 있지 않은 엔진에서는 그렇다고 알리고 아무것도 하지 않습니다).
            </P>
            <H3>그림 그리기</H3>
            <P>
              <C>/draw [주제]</C>로 그려서, 스케치북 창에 보여 줍니다.
              로컬에 이미지 생성 API(AUTOMATIC1111 호환. 7860 / 7861)가 돌고 있으면 그것으로 그리고,
              없으면 <strong className="text-cream">동그라미와 선으로 손그림</strong>을 그립니다. 그린 그림은
              설정 폴더의 <C>drawings/</C>에 남습니다.
            </P>
            <P>파트너가 있을 때는, 노래가 끝났을 때·그림이 완성됐을 때 딴지를 걸어 옵니다.</P>
          </section>

          {/* --- マルチゴースト --- */}
          <section className="mb-16">
            <H2 id="ghosts">
              멀티 고스트
              <Pro />
            </H2>
            <P>
              <C>/ghost new &lt;이름&gt;</C>으로, 지금 아이와는 다른 아이를 한 명 더 세울 수 있습니다.
              설정·기억·성격·몸이 모두 다른 독립된 고스트로 나란히 서고, <C>/communicate</C>로
              서로 대화할 수 있습니다.
            </P>
            <P>
              목록은 <C>/ghost list</C>, 같은 아이를 다시 부르려면 <C>/ghost &lt;이름&gt;</C>.
              포트(SSTP·에셋 제공)는 자동으로 서로 양보하고, 서는 위치도 겹치지 않게 비켜서 놓입니다.
            </P>
            <Note>
              지금 서 있는 이 아이와 <C>/ghost list</C>는 Free입니다. 두 번째 이후를 세우는 것이 Pro 기능이 됩니다.
              내장 엔진의 모델은 아이마다 따로 가지므로, 공유하고 싶은 경우에는 Ollama / LM Studio를 써 주세요.
            </Note>
          </section>

          {/* --- 配信者モード --- */}
          <section className="mb-16">
            <H2 id="stream">
              스트리머 모드
              <Pro />
            </H2>
            <P>
              <C>/stream on</C>으로 任意ラヂヲ풍의 라디오 방송 모드에 들어가고, <C>/stream start</C>로 방송이 열립니다.
              마무리는 <C>/stream end</C>(맺음말 "엔이-(En-ii)"로 끝나고 스탠바이로).
            </P>
            <P>
              코너는 사연·오오기리·토막 상식·가공 CM·고민 상담·뇌내 랭킹·삼지선다
              퀴즈·즉흥 드라마에 더해, <strong className="text-cream">즉흥 송·작사 대결·그림 그리기·일러스트 주제</strong>가 있어,
              도입부의 주고받는 대화 뒤에 실제로 노래하고, 그립니다.
            </P>
            <P>
              <C>/stream start &lt;라이브 URL&gt;</C>로 YouTube 라이브의 댓글을 주워서 읽어 줍니다
              (슈퍼챗은 최우선). 방송의 맛내기는 <C>/radio otaku</C>로 오타쿠 특화 팩으로 바꿀 수 있습니다.
            </P>
            <figure className="my-6 rounded-lg overflow-hidden border border-cream/10">
              <img
                src="/shots/settings-stream.png"
                alt="상세 설정의 방송 관련. 방송의 형태, 댓글 수신구, 수다 정도"
                className="block w-full h-auto"
                loading="lazy"
              />
              <figcaption className="px-4 py-2.5 text-xs text-sub bg-paper/40">
                상세 설정의 "방송". 형태·댓글 수신구·수다 정도는 여기에서도 정할 수 있습니다
              </figcaption>
            </figure>
            <H3>두 가지 방송의 형태</H3>
            <P>
              <C>/stream host</C>는 <strong className="text-cream">이 아이가 방송을 진행하는</strong> 형태입니다
              (코너 진행·노래·그림 그리기·마무리의 "엔이-(En-ii)". 시작은 <C>/stream start</C>). <C>/stream assist</C>는 <strong className="text-cream">당신이 주인공이고, 이 아이가 단짝 자리에 앉는</strong> 형태 —
              방송의 대본은 돌리지 않고, 댓글을 읽고, 불렸을 때와 질문일 때만 주워서 답합니다.
              너무 많이 말하지 않는 것이 이 모드의 품질이므로, 스트리머의 목소리에 겹치지 않기 위한 간격이 들어가 있습니다
              (조절은 <C>/stream chatty 0〜100</C>. 0은 읽는 일에만 전념합니다).
            </P>
            <P>
              방송 시작의 일련의 과정은 <C>/stream go &lt;방송 내용&gt;</C> 한마디로 —
              방송 모드에 들어가고, OBS의 송출을 시작하고(<C>/obs connect</C>가 끝나 있다면),
              공지문의 초안까지 만듭니다. <strong className="text-cream">게시만은 직접 누릅니다</strong>
              (돌이킬 수 없는 것을 멋대로 쏘지 않기 위해. <C>/announce post</C>로 게시 화면이 열립니다).
            </P>
            <H3>댓글 뷰어와 연결하기(보우요미짱 호환)</H3>
            <P>
              <C>/stream comments on</C>으로, 보우요미짱과 같은 수신구(TCP·기본 50001)가 열립니다.
              OneComme(왕코메)나 멀티 코멘트 뷰어 등, 쓰시는 도구의
              "보우요미짱 연동"을 그대로 향하게 하기만 하면, 댓글이 이 아이의 목소리로 흐릅니다
              (본가와 같은 포트라서, 동시에는 쓸 수 없습니다). <strong className="text-cream">방송 사이트별 대응은 댓글 뷰어 쪽에 맡깁니다</strong> —
              YouTube도 Twitch도 니코니코 생방송도, OneComme가 주울 수 있는 것은 그대로 도착합니다.
              어시스트 모드 중에는, 읽어 주는 것만이 아니라 주워서 답하는 판단도 여기를 거칩니다.
            </P>
            <H3>OBS에 올리기</H3>
            <P>
              오버레이는 다운로드와 같은 릴리스 페이지에 첨부된 <C>mirika-obs-overlays.zip</C>에
              들어 있습니다. 압축을 풀어 <C>radio-bg.html</C>을 브라우저 소스로 지정하면, 스튜디오풍의 배경에
              ON AIR 램프·지금의 코너·텔롭·음성 크레딧이 자동으로 나옵니다
              (책상 쪽의 오버레이는 <C>radio-desk.html</C>). 방송국 이름이나 텔롭은
              앱에서 <C>/radio title</C>로 바꿔 넣을 수
              있습니다. <strong className="text-cream">그림 그리기로 그린 그림은 오른쪽 아래의 이젤에 표시됩니다</strong>.
              캐릭터의 창 캡처를 그 위에 겹쳐 주세요.
            </P>
            <Note>
              방송 중에는 권리 문제로 인터넷 라디오·Spotify는 쓸 수
              없습니다. <C>/bgm folder &lt;폴더&gt;</C>의 보유 음원만 흐르고,
              파일명을 <C>제목__아티스트.mp3</C>로 하면 OBS에 크레딧이 자동 표시됩니다.
            </Note>
          </section>

          {/* --- Pro --- */}
          <section className="mb-16">
            <H2 id="pro">Pro와 라이선스</H2>
            <P>
              본체는 무료로 쓸 수 있습니다(전용 라이선스의 프리웨어).
              Pro는 한 번 구매하는 방식으로, <strong className="text-cream">스트리머 모드·시나리오 라이터·인터넷 라디오·Spotify 연동·멀티 고스트</strong>가 잠금 해제됩니다(각각의 내용은 <a href="https://pro.mirika.dev/" className="text-sakura hover:underline">pro.mirika.dev</a>에).
            </P>
            <Steps
              items={[
                <>
                  <a href="https://emerauda.booth.pm/items/8649631" className="text-sakura hover:underline">
                    Booth
                  </a>{' '}
                  에서 Pro를 구매합니다
                </>,
                <>
                  <a href="https://pro.mirika.dev/" className="text-sakura hover:underline">
                    pro.mirika.dev
                  </a>{' '}
                  에 주문 번호와 주문 날짜를 입력해 라이선스 키를 받습니다
                </>,
                <>
                  앱의 채팅창에서 <C>/pro &lt;키&gt;</C>라고 입력합니다
                </>,
              ]}
            />
            <P>
              검증은 완전 오프라인(Ed25519 서명)이라, 잠금 해제 후에는 인터넷 연결 없이 쓸 수 있습니다.
              조직에서 배포하는 경우에는 관리 정책(policy.json)과 감사 로그가 있는 Enterprise가 있습니다.
            </P>
          </section>

          {/* --- Discord --- */}
          <section className="mb-16">
            <H2 id="discord">Discord에서도 사용할 수 있습니다</H2>
            <P>
              Mirika는 Discord에도 있습니다.{' '}
              <a href="https://discord.gg/fnmUau5qzB" className="text-sakura hover:underline">공식 서버</a>
              에서 동작할 뿐 아니라, 앱을 "내 계정에 추가"(개인 설치)하면 DM에서도, 봇이 없는 서버에서도
              비서를 데리고 다닐 수 있습니다. 낭독 등 서버 기능은 Pro의 일부입니다.
            </P>
            <Steps
              items={[
                <>공식 Discord에 참여(또는 앱을 내 계정에 추가)</>,
                <>
                  Booth에서 구매하셨다면 <C>/order</C>에 주문번호와 주문일을 입력 — 그 자리에서 라이선스 키를 받을 수 있습니다
                </>,
                <>
                  <C>/verify</C>로 키를 제시합니다. 본인 연결·공식 롤·(서버 관리자라면) 서버 개방까지 한 번에 끝납니다
                </>,
              ]}
            />
            <P>
              <C>/talk</C>은 미리카와의 대화입니다. 사용법 질문에는 공식 문서를 근거로 출처 링크와 함께 답합니다.
              답장 아래 버튼으로 <strong className="text-cream">기억</strong>을 켜면 대화를 기억합니다
              (본인 것만·언제든 전부 삭제 가능). <C>/todo</C>는{' '}
              <strong className="text-cream">데스크톱 TODO와 양방향 동기화</strong>되며, 마감이 다가오면
              DM으로도 3단계(24시간 전 → 1시간 전 → 초과)로 알립니다.
            </P>
            <P>
              낭독은 <C>/voice bind</C>한 음성 채널을 VOICEVOX(+ Nemo, 총 136 보이스)로 읽습니다.
              내 목소리는 <C>/voice speaker</C>에서(검색으로도, 목록에서도) 고를 수 있습니다.
              <C>/voice listen</C>을 켠 서버에서는 "<strong className="text-cream">미리카</strong>"라고 부르면
              듣고 목소리로 답합니다 — 음성은 텍스트가 되는 순간 폐기되며, 부르지 않은 발화는 텍스트도 남기지 않습니다.
            </P>
            <Note>
              키 하나로 최대 3개 서버를 열 수 있습니다. 개인 데이터(TODO·기억·목소리 설정)는 키 유래의
              단방향 지문 단위로 분리되며, 키 자체는 Discord에 저장되지 않습니다.
              문제가 있으면 <C>/ticket</C>(스크린샷 첨부 가능)으로 알려주세요.
            </Note>
          </section>

          {/* --- コマンド一覧 --- */}
          <section className="mb-16">
            <H2 id="commands">명령어 목록</H2>
            <P>
              앱의 <C>/help</C>와 같은 전체 {commandCount}건입니다.
              입력창에서 <C>/</C>를 치면 후보가 나오므로, 외울 필요는 없습니다.
            </P>
            {commands}
          </section>

          {/* --- 開発者向け --- */}
          <section className="mb-16">
            <H2 id="dev">개발자용</H2>
            <P>
              고스트를 만들어 배포하는 분·주변 도구에서 Mirika에게 말을 걸고 싶은 분을 위한 입구입니다.
              사양의 자세한 내용은 리포지토리의 README에도 있습니다.
            </P>

            <H3>고스트를 만들어 배포하기(.mirika)</H3>
            <P>
              배포 형식 <C>.mirika</C>는 순수한 zip(<C>mirika.json</C> + <C>shell/</C>)으로,
              이름·성격·1인칭·파트너·설정 메모·몸을 하나로 묶습니다.
              앱을 실행하지 않아도, 동봉 스크립트로 틀 만들기부터 검증까지 할 수 있습니다:
            </P>
            <Steps
              items={[
                <><C>node scripts/mirika-package.mjs init {'<폴더>'}</C> — 틀(mirika.json과 shell/)을 만듭니다</>,
                <>그림과 성격을 써넣었다면 <C>pack</C>으로 1개의 파일로 굳힙니다</>,
                <><C>check</C>가 "받는 쪽과 같은 눈"으로 내용물을 검사합니다(성격이 비어 있음·기본 스탠딩이 없음 등을 배포하기 전에 알려 줍니다)</>,
              ]}
            />
            <Note>
              받는 쪽은 남의 파일로 취급합니다 — 압축 파일 밖으로 나가는 경로의 거부·길이 제한이 있는
              정규화·알 수 없는 항목의 폐기를 거친 뒤에 불러오고, 불러오기 전의 상태는 언제든 되돌릴 수 있습니다.
            </Note>

            <H3>인격 회귀 테스트(mirika test)</H3>
            <P>
              프롬프트나 두뇌(모델)를 바꿨을 때, "이 아이다움"이 무너지지 않았는지를
              골든 대화집으로 기계적으로 확인합니다. 대답은 매번 흔들리므로, 문면의
              일치가 아니라 <C>must</C>(반드시 나와야 하는 표현)/<C>mustNot</C>(나와서는 안 되는 표현)의
              정규 표현식으로 판정합니다. 실패가 있으면 종료 코드 1 — 그대로 CI에 둘 수 있습니다.
            </P>
            <Steps
              items={[
                <><C>node scripts/mirika-test.mjs --init golden.json</C> — 대화집의 틀을 만듭니다(말투·1인칭·지어내기 억제의 샘플 포함)</>,
                <>persona와 cases를 내 아이에 맞춰 씁니다</>,
                <><C>node scripts/mirika-test.mjs golden.json</C> — LM Studio / Ollama를 자동 감지해 판정합니다(<C>--runs 3</C>으로 흔들림까지 포함한 검사)</>,
              ]}
            />
            <Note>
              스크립트는 릴리스 첨부의 <C>mirika-sdk.zip</C>에도 들어 있습니다(틀 만들기·검증의
              mirika-package.mjs와 함께).
            </Note>

            <H3>SSTP로 말 걸기(우카가카 호환)</H3>
            <P>
              TCP <C>9801</C>(사용 중이면 9821 → 8801로 양보)로 <C>SEND / NOTIFY / COMMUNICATE / EXECUTE</C>를 받습니다.
              문자 인코딩은 보내는 쪽에 맞춥니다 — <C>Charset</C>을 먼저 읽고, 없으면 깨졌을 때
              Shift_JIS로 다시 읽고, 응답도 같은 문자 인코딩으로 돌려줍니다. <C>EXECUTE</C>는
              GetName / GetVersion / GetFQName에 답하고, 맡지 않는 명령에는 정직하게 204를 돌려줍니다.
              직접 시험해 보기에는 <C>/sakura {'\\0\\s[0]こんにちは。\\e'}</C>가 간편합니다.
            </P>

            <H3>HTTP 브리지(다른 앱과의 연동)</H3>
            <P>
              SSTP와 같은 포트로 HTTP도 받습니다. <C>MCP 브리지</C>로서 Claude Desktop·VS Code·Claude CLI에
              공개하면, 밖에서 전언(speak)과 태스크를 쓸 수 있습니다. 브라우저
              확장은 <C>POST /browser</C>로 보고 있는 페이지를 공유합니다. 어느 쪽도 127.0.0.1 바인드+Host/Origin
              검사가 있어, 열람 중인 사이트의 JavaScript에서는 두드릴 수 없습니다.
            </P>

            <H3>잘 움직이지 않을 때</H3>
            <P>
              <C>/check</C>로 두뇌·목소리·마이크·비서·기억의 상태를 한꺼번에 확인할 수 있습니다.
              그래도 상태가 이상할 때는 <C>/log</C> —— <strong className="text-cream">동작 로그가 든 폴더가 열립니다</strong>
              (7일분·API 키와 암호 문구는 가림 처리). 신고에 그날의 파일을 첨부해 주시면,
              이쪽에서 원인을 따라갈 수 있습니다. 상세 설정의 "문제가 생겼을 때"에서도 같은 폴더를 열 수 있습니다.
            </P>
            <H3>멀리 있는 몸(Display Shell)</H3>
            <P>
              <C>/display on</C>으로, 다른 기계를 이 아이의 몸으로 받아들이는 입구가 열립니다
              (암호 문구 포함. 기본 포트 8770). 태블릿 쪽은 <C>GET /shell/stream</C>으로 연결하고,
              처음에 배부되는 id로 <C>POST /shell/say</C>에 답합니다 — 브라우저만으로 몸을 만들 수 있습니다.
            </P>
            <P>
              약속은 <strong className="text-cream">연결만으로는 쓸 수 없는</strong> 형태로 되어 있습니다.
              버전의 대조·암호 문구·자기소개(할 수 있는 일의 신고)가 끝나야 비로소 지령이 도착하고,
              아직 준비되지 않은 상대나, 그 몸으로는 할 수 없는
              지령은 <strong className="text-cream">조용히 버리지 않고 송신 실패로 돌려줍니다</strong>
              ("가끔 말하지 않는 몸"을 만들지 않기 위해). 신고하지 않은 능력은 "할 수 없음" 취급입니다.
            </P>
            <H3>OBS 연동 API(SSE)</H3>
            <P>
              포트 <C>8763</C>(<C>MIRIKA_OBS_PORT</C>로 변경 가능)의 <C>/events</C>가,
              실황 날씨·화자·코너·텔롭·방송국 이름·음성과 BGM의 크레딧·그린 그림을 Server-Sent Events로
              흘려보냅니다(시계는 오버레이 쪽에서 그리고 있습니다).
              스튜디오 배경과 책상의 오버레이는 릴리스 첨부의 <C>mirika-obs-overlays.zip</C>에 있고,
              방송국 이름·주파수는 앱에서 <C>/radio title・sub・freq</C>로 보낼 수 있습니다(HTML 편집 불필요).
            </P>

            <H3>불러오기 형식의 대응 범위</H3>
            <P>
              캐릭터 카드는 V2/V3 — PNG 임베드(tEXt / zTXt / 압축 iTXt)와 순수 JSON을 읽습니다
              (<C>.charx</C>는 미대응). 클래식 셸은 <C>surfaces.txt</C>의 <C>interval,random / always / talk</C>와
              overlay 계열·collision·갈아입히기의 주요 사양에 대응하고,
              투명은 알파 / <C>.pna</C> / 왼쪽 위 색상의 3방식을 자동 판별합니다.
            </P>

            <H3>환경 변수와 Enterprise 정책</H3>
            <P>
              <C>MIRIKA_RES_PORT</C>(에셋 제공·기본 8764)/ <C>MIRIKA_OBS_PORT</C>(OBS 연동·기본 8763)/
              <C>MIRIKA_POLICY</C>(정책 파일 위치의 덮어쓰기). 조직 도입에서는 관리자가 배포하는 읽기
              전용 <C>policy.json</C>(Windows: <C>%ProgramData%\Mirika\</C>, macOS: <C>/Library/Application Support/Mirika/</C>,
              Linux: <C>/etc/mirika/</C>)이 사용자 설정보다 우선되어, 클라우드 금지·접속 대상 고정·감사 로그 등을 통제할 수 있습니다.
            </P>
          </section>

          {/* --- 困ったとき --- */}
          <section className="mb-8">
            <H2 id="trouble">문제가 생겼을 때</H2>
            <P>
              여기에 없는 증상은{' '}
              <a
                href="https://discord.gg/fnmUau5qzB"
                target="_blank"
                rel="noopener"
                className="text-sakura hover:underline"
              >
                공식 Discord
              </a>{' '}
              에서 물어봐 주세요. 그날의 동작 로그(우클릭 메뉴 →
              "동작 로그 열기(버그 신고용)")를 첨부해 주시면, 원인을 금방 알 수 있습니다.
            </P>
            <H3>실행 시 경고가 나온다</H3>
            <P>
              코드 서명을 아직 취득하지 않았기 때문에, Windows에서는 첫 회에 SmartScreen이 나옵니다
              ("추가 정보 → 실행"으로 시작). macOS판은 서명·공증 대응까지 배포를 보류하고 있습니다.
            </P>
            <H3>대답이 돌아오지 않는다</H3>
            <P>
              <C>/check</C>로 앱과 PC의 상태를 한눈에 볼 수 있습니다(두뇌·목소리·마이크·비서·브리지·기억의 규모).
              로컬 LLM이 보이지 않을 때는 Ollama / LM Studio가 실행 중인지 확인하고, <C>/rescan</C>으로
              다시 찾아보세요. 내장 엔진이 무거울 때는, 더 작은 GGUF를 고르면 가벼워집니다.
            </P>
            <H3>목소리가 나오지 않는다</H3>
            <P>
              일본어는 VOICEVOX / AivisSpeech가 필요합니다(설치되어 있으면 자동으로 실행합니다).
              영어·중국어는 <C>/piper</C>로 음성을 내려받아 주세요. 한국어는 TTS API를 꽂았을 때만 말합니다.
              출력 대상은 <C>/audio</C>로 고를 수 있습니다(가상 케이블로도 낼 수 있습니다).
            </P>
            <H3>노래하지 않는다</H3>
            <P>
              노래에는 VOICEVOX의 <strong className="text-cream">가창 대응 캐릭터</strong>가 필요합니다.
              AivisSpeech 등 가창에 대응하지 않는 엔진에서는 노래할 수 없습니다.
            </P>
            <H3>불러온 카드를 원래대로 되돌리고 싶다</H3>
            <P>
              <C>/card undo</C>로 한 단계씩, <C>/card reset</C>으로 카드를 읽기 전까지 되돌릴 수 있습니다.
            </P>
          </section>
    </>
  );
}
