import { Kicker, TitleBar } from './ui';
import { Reveal } from './primitives';
import { useT } from '../i18n';

type StackItem = { name: string; desc: string };

function buildStack(t: ReturnType<typeof useT>): StackItem[] {
  return [
    { name: 'Electron', desc: t('透過ウィンドウ・クリックスルー・トレイ常駐', 'Transparent windows, click-through, tray residency', { 'zh-CN': '透明窗口・点击穿透・托盘常驻', 'zh-TW': '透明視窗・點擊穿透・系統匣常駐', ko: '투명 창·클릭 스루·트레이 상주' }) },
    { name: '@pixiv/three-vrm', desc: t('VRMシェル: 表情・視線・SpringBone(揺れもの)', 'VRM shell: expressions, gaze, SpringBone physics', { 'zh-CN': 'VRM 外壳:表情・视线・SpringBone(摇曳物)', 'zh-TW': 'VRM 外殼:表情・視線・SpringBone(搖曳物)', ko: 'VRM 셸: 표정·시선·SpringBone(흔들림)' }) },
    { name: 'mmd-parser', desc: t('MMDシェル: PMX の読解(組み立て・VMD 変換は自前)', 'MMD shell: PMX parsing (assembly and VMD conversion are ours)', { 'zh-CN': 'MMD 外壳:PMX 解析(组装与 VMD 转换为自研)', 'zh-TW': 'MMD 外殼:PMX 解析(組裝與 VMD 轉換為自研)', ko: 'MMD 셸: PMX 해석(조립·VMD 변환은 자체)' }) },
    { name: 'Cubism SDK for Web', desc: t('Live2Dシェル+伺かクラシックシェル(ともに実装済み)', 'Live2D shell + classic Ukagaka shells (both shipped)', { 'zh-CN': 'Live2D 外壳+伺か经典外壳(均已实现)', 'zh-TW': 'Live2D 外殼+伺か經典外殼(均已實現)', ko: 'Live2D 셸+우카가카 클래식 셸(둘 다 구현)' }) },
    { name: 'llama.cpp / Ollama', desc: t('同梱エンジン+外部ランタイム自動検出(LM Studio 対応)', 'Bundled engine + auto-detected external runtimes (LM Studio too)', { 'zh-CN': '内置引擎+自动检测外部运行时(支持 LM Studio)', 'zh-TW': '內建引擎+自動偵測外部執行時(支援 LM Studio)', ko: '동봉 엔진+외부 런타임 자동 감지(LM Studio 대응)' }) },
    { name: 'VOICEVOX / Piper + Whisper', desc: t('全ローカル音声対話(日=VOICEVOX・英中=内蔵Piper)・音素リップシンク', 'Fully local voice (ja=VOICEVOX, en/zh=built-in Piper), phoneme lip sync', { 'zh-CN': '全本地语音对话(日=VOICEVOX・英中=内置 Piper)・音素口型同步', 'zh-TW': '全本地語音對話(日=VOICEVOX・英中=內建 Piper)・音素口型同步', ko: '완전 로컬 음성 대화(일=VOICEVOX·영중=내장 Piper)·음소 립싱크' }) },
    { name: 'SQLite(node:sqlite)', desc: t('数年単位の長期記憶・想起検索・就寝時整理・絆と気分の力学', 'Years-long memory, recall search, bedtime consolidation, the bond-and-mood mechanics', { 'zh-CN': '以年计的长期记忆・唤起检索・睡前整理・羁绊与心情的力学', 'zh-TW': '以年計的長期記憶・喚起檢索・睡前整理・羈絆與心情的力學', ko: '몇 년 단위 장기 기억·상기 검색·취침 시 정리·유대와 기분의 역학' }) },
    { name: 'MCP', desc: t('秘書ツール連携(SAORI文化の現代版)', 'Secretary tool integration (SAORI culture, modernized)', { 'zh-CN': '秘书工具联动(SAORI 文化的现代版)', 'zh-TW': '秘書工具連動(SAORI 文化的現代版)', ko: '비서 도구 연동(SAORI 문화의 현대판)' }) },
    { name: 'Cloudflare Workers + Vectorize', desc: t('Discord 側の秘書(Bot・読み上げ・音声会話・記憶とドキュメント検索)', 'The Discord side of the secretary (bot, reading aloud, voice chat, memory & docs search)', { 'zh-CN': 'Discord 侧的秘书(Bot・朗读・语音对话・记忆与文档检索)', 'zh-TW': 'Discord 側的秘書(Bot・朗讀・語音對話・記憶與文件檢索)', ko: 'Discord 쪽의 비서(봇·낭독·음성 대화·기억과 문서 검색)' }) },
  ];
}

type Tok = { t: string; c?: string };

const CODE_LINES: Tok[][] = [
  [{ t: '// 感情・モーションの語彙はシェル(mapping.json)が決める', c: 'text-slate-500' }],
  [
    { t: 'const', c: 'text-rose-300' },
    { t: ' reply = ' },
    { t: 'await', c: 'text-rose-300' },
    { t: ' llm.' },
    { t: 'chat', c: 'text-amber-200' },
    { t: '(prompt, {' },
  ],
  [
    { t: '  provider: ' },
    { t: '"ollama"', c: 'text-emerald-300' },
    { t: ',  ' },
    { t: '// ローカル既定・クラウドはオプトイン', c: 'text-slate-500' },
  ],
  [
    { t: '  memory: ' },
    { t: 'await', c: 'text-rose-300' },
    { t: ' ' },
    { t: 'recall', c: 'text-amber-200' },
    { t: '(event, ' },
    { t: '5', c: 'text-orange-300' },
    { t: '),   ' },
    { t: '// 長期記憶から想起', c: 'text-slate-500' },
  ],
  [
    { t: '  schema: ' },
    { t: 'segmentSchema', c: 'text-amber-200' },
    { t: '(shell.' },
    { t: 'vocabulary', c: 'text-amber-200' },
    { t: '()),' },
  ],
  [{ t: '});' }],
  [],
  [
    { t: 'for', c: 'text-rose-300' },
    { t: ' (' },
    { t: 'const', c: 'text-rose-300' },
    { t: ' seg ' },
    { t: 'of', c: 'text-rose-300' },
    { t: ' reply.segments) {' },
  ],
  [
    { t: '  ' },
    { t: '// { text: "おかえり！", emotion: "happy", motion: "greet" }', c: 'text-slate-500' },
  ],
  [
    { t: '  ' },
    { t: 'const', c: 'text-rose-300' },
    { t: ' audio = ' },
    { t: 'await', c: 'text-rose-300' },
    { t: ' voicevox.' },
    { t: 'synth', c: 'text-amber-200' },
    { t: '(seg); ' },
    { t: '// 文単位で即発話', c: 'text-slate-500' },
  ],
  [
    { t: '  ' },
    { t: 'await', c: 'text-rose-300' },
    { t: ' shell.' },
    { t: 'speak', c: 'text-amber-200' },
    { t: '({ ...seg, audio });  ' },
    { t: '// ShellProtocol', c: 'text-slate-500' },
  ],
  [{ t: '}' }],
  [],
  [
    { t: 'await', c: 'text-rose-300' },
    { t: ' memory.' },
    { t: 'remember', c: 'text-amber-200' },
    { t: '(event, reply); ' },
    { t: '// 夜、整理して長期記憶へ', c: 'text-slate-500' },
  ],
];

export function Stack() {
  const t = useT();
  const STACK = buildStack(t);
  return (
    <section id="tech" className="border-t border-cream/10 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-14 items-start">
        <Reveal>
          <Kicker index="05" label="Stack" />
          <h2 className="font-mincho font-bold text-3xl md:text-4xl mb-6">
            Built for TypeScript<br />Developers.
          </h2>
          <p className="text-mist leading-loose mb-10">
            {t('すべてをモダンなJavaScript/TypeScriptエコシステムで完結。Web開発者なら誰でも、慣れ親しんだツールで自分のゴーストをハックできます。そして、さくらスクリプト作者ならもっと簡単——', 'Everything lives in the modern JavaScript/TypeScript ecosystem, so any web developer can hack their own ghost with familiar tools. Sakura Script authors have it even easier — ', {
              'zh-CN': '一切都在现代 JavaScript/TypeScript 生态里完成。任何 Web 开发者都能用熟悉的工具折腾自己的幽灵。Sakura Script 作者更简单——',
              'zh-TW': '一切都在現代 JavaScript/TypeScript 生態裡完成。任何 Web 開發者都能用熟悉的工具折騰自己的幽靈。Sakura Script 作者更簡單——',
              ko: '모든 것이 현대 JavaScript/TypeScript 생태계 안에서 끝납니다. 웹 개발자라면 익숙한 도구로 자신의 고스트를 해킹할 수 있습니다. 사쿠라 스크립트 작자라면 더 간단 — ',
            })}
            <span className="font-mono text-xs text-cream">\0\s[0]こんにちは。\e</span>{' '}
            {t('は、ここでもそのまま動きます。', 'runs here exactly as it is.', { 'zh-CN': '在这里也原样运行。', 'zh-TW': '在這裡也原樣運行。', ko: '는 여기서도 그대로 움직입니다.' })}
          </p>
          <ul className="divide-y divide-cream/10 border-y border-cream/10">
            {STACK.map((s) => (
              <li key={s.name} className="py-4 flex items-baseline gap-4">
                <span className="font-mono text-xs text-sakura w-40 shrink-0">{s.name}</span>
                <span className="text-sm text-mist">{s.desc}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="os-window">
          <TitleBar>
            <span>brain.ts</span>
            <span className="text-sub tracking-widest">— □ ×</span>
          </TitleBar>
          <div className="bg-void text-slate-300 p-6 font-mono text-xs md:text-[13px] leading-relaxed overflow-x-auto whitespace-pre">
            {CODE_LINES.map((line, i) => (
              <div key={i}>
                {line.length === 0
                  ? ' '
                  : line.map((tok, j) =>
                      tok.c ? (
                        <span key={j} className={tok.c}>
                          {tok.t}
                        </span>
                      ) : (
                        <span key={j}>{tok.t}</span>
                      ),
                    )}
              </div>
            ))}
          </div>
          <div className="border-t-2 border-white/10 px-4 py-2.5 font-mono text-[11px] text-sub bg-white/[0.04]">
            &gt;{' '}
            {t('旧ゴーストの辞書も import で「話し方の見本」として人格に受け継げます', 'Old ghost dictionaries can be imported as "speech samples" the persona inherits', { 'zh-CN': '旧幽灵的词典也能 import,作为「说话方式的样本」传给人格', 'zh-TW': '舊幽靈的詞典也能 import,作為「說話方式的樣本」傳給人格', ko: '옛 고스트의 사전도 import로 "말투 견본"으로서 인격에 물려줄 수 있습니다' })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
