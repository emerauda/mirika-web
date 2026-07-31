import { Kicker, TitleBar } from './ui';
import { Reveal } from './primitives';

type StackItem = { name: string; desc: string };

const STACK: StackItem[] = [
  { name: 'Electron', desc: '透過ウィンドウ・クリックスルー・トレイ常駐' },
  { name: '@pixiv/three-vrm', desc: 'VRMシェル: 表情・視線・SpringBone(揺れもの)' },
  { name: 'mmd-parser', desc: 'MMDシェル: PMX の読解(組み立て・VMD 変換は自前)' },
  { name: 'Cubism SDK for Web', desc: 'Live2Dシェル+伺かクラシックシェル(ともに実装済み)' },
  { name: 'llama.cpp / Ollama', desc: '同梱エンジン+外部ランタイム自動検出(LM Studio 対応)' },
  { name: 'VOICEVOX / Piper + Whisper', desc: '全ローカル音声対話(日=VOICEVOX・英中=内蔵Piper)・音素リップシンク' },
  { name: 'SQLite(node:sqlite)', desc: '数年単位の長期記憶・想起検索・就寝時整理' },
  { name: 'MCP', desc: '秘書ツール連携(SAORI文化の現代版)' },
];

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
  return (
    <section id="tech" className="border-t border-cream/10 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-14 items-start">
        <Reveal>
          <Kicker index="05" label="Stack" />
          <h2 className="font-mincho font-bold text-3xl md:text-4xl mb-6">
            Built for TypeScript<br />Developers.
          </h2>
          <p className="text-mist leading-loose mb-10">
            すべてをモダンなJavaScript/TypeScriptエコシステムで完結。
            Web開発者なら誰でも、慣れ親しんだツールで自分のゴーストをハックできます。
            そして、さくらスクリプト作者ならもっと簡単——
            <span className="font-mono text-xs text-cream">\0\s[0]こんにちは。\e</span> は、ここでもそのまま動きます。
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
          <div className="bg-[#0b0912] text-slate-300 p-6 font-mono text-xs md:text-[13px] leading-relaxed overflow-x-auto whitespace-pre">
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
            &gt; 旧ゴーストの辞書も import で「話し方の見本」として人格に受け継げます
          </div>
        </Reveal>
      </div>
    </section>
  );
}
