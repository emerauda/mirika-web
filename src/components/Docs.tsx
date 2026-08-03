import { lazy, Suspense, useEffect, useMemo, useState, type ComponentType, type ReactNode } from 'react';
import { Search } from 'lucide-react';
import { buildCommandGroups } from './docs-commands';
import { Reveal } from './primitives';
import { pickByLang, t5, useLang, useT, type Lang } from '../i18n';
import { C } from './docs-ui';
import { LangSwitch } from './Nav';
import { useActiveSection } from '../hooks/useActiveSection';

/**
 * 使い方ドキュメント。トップページとは別の読み物として、導入から
 * 各機能・全スラッシュコマンド・困ったときまでを一枚で通す。
 * 本文は言語ごとに docs-body-*.tsx が丸ごと持つ(長文は t() の逐語訳だと
 * 語順で破綻するため)。目次・コマンド表・枠組みだけがここ。
 * 本文は言語別チャンクに割って、読む言語のぶんだけ取りに行く(5言語全文を
 * 同梱するとトップページの JS まで太る)。
 */

type BodyProps = { commands: ReactNode; commandCount: number };
const BODIES: Record<Lang, ComponentType<BodyProps>> = {
  ja: lazy(() => import('./docs-body-ja').then((m) => ({ default: m.DocsBodyJa }))),
  en: lazy(() => import('./docs-body-en').then((m) => ({ default: m.DocsBodyEn }))),
  'zh-CN': lazy(() => import('./docs-body-zh-cn').then((m) => ({ default: m.DocsBodyZhCn }))),
  'zh-TW': lazy(() => import('./docs-body-zh-tw').then((m) => ({ default: m.DocsBodyZhTw }))),
  ko: lazy(() => import('./docs-body-ko').then((m) => ({ default: m.DocsBodyKo }))),
};

const SECTION_IDS = [
  'start',
  'brain',
  'voice',
  'body',
  'persona',
  'secretary',
  'ukagaka',
  'card',
  'play',
  'ghosts',
  'stream',
  'pro',
  'discord',
  'commands',
  'dev',
  'trouble',
] as const;

function buildSections(
  t: ReturnType<typeof useT>,
): { id: (typeof SECTION_IDS)[number]; title: string }[] {
  const T = t5(t);
  return [
    { id: 'start', title: T('はじめに', 'Getting started', '快速开始', '快速開始', '시작하기') },
    { id: 'brain', title: T('頭脳(LLM)をつなぐ', 'Connect a brain (LLM)', '连接头脑(LLM)', '連接頭腦(LLM)', '두뇌(LLM) 연결') },
    { id: 'voice', title: T('声とマイク', 'Voice & mic', '声音与麦克风', '聲音與麥克風', '목소리와 마이크') },
    { id: 'body', title: T('身体(シェル)', 'Body (shells)', '身体(外壳)', '身體(外殼)', '몸(셸)') },
    { id: 'persona', title: T('人格と記憶', 'Persona & memory', '人格与记忆', '人格與記憶', '인격과 기억') },
    { id: 'secretary', title: T('AI秘書', 'AI secretary', 'AI 秘书', 'AI 秘書', 'AI 비서') },
    { id: 'ukagaka', title: T('伺か互換', 'Ukagaka compat', '伺か兼容', '伺か相容', '우카가카 호환') },
    { id: 'card', title: T('キャラクターカード', 'Character cards', '角色卡', '角色卡', '캐릭터 카드') },
    { id: 'play', title: T('歌とお絵かき', 'Singing & drawing', '唱歌与画画', '唱歌與畫畫', '노래와 그림') },
    { id: 'ghosts', title: T('マルチゴースト', 'Multi-ghost', '多幽灵', '多幽靈', '멀티 고스트') },
    { id: 'stream', title: T('配信者モード', 'Streamer mode', '主播模式', '直播主模式', '스트리머 모드') },
    { id: 'pro', title: T('Pro とライセンス', 'Pro & license', 'Pro 与许可', 'Pro 與授權', 'Pro와 라이선스') },
    { id: 'discord', title: T('Discord でも使える', 'Mirika on Discord', '在 Discord 上使用', '在 Discord 上使用', 'Discord에서도 사용') },
    { id: 'commands', title: T('コマンド一覧', 'All commands', '命令一览', '指令一覽', '명령 목록') },
    { id: 'dev', title: T('開発者向け', 'For developers', '面向开发者', '面向開發者', '개발자용') },
    { id: 'trouble', title: T('困ったとき', 'Troubleshooting', '疑难解答', '疑難排解', '문제 해결') },
  ];
}

/** Suspense の中で mount された合図を親へ返す(lazy 本文の到着で目次の観測をやり直す) */
function BodyReady({ onReady }: { onReady: () => void }) {
  useEffect(onReady, [onReady]);
  return null;
}

export function Docs() {
  const { lang } = useLang();
  const t = useT();
  const SECTIONS = useMemo(() => buildSections(t), [t]);
  const COMMAND_GROUPS = useMemo(() => buildCommandGroups(t), [t]);
  const [query, setQuery] = useState('');
  const [bodyReady, setBodyReady] = useState(0);
  // 「読み始めた節」を指したいので、既定(画面中央)より上寄りの帯で見る
  const active = useActiveSection(SECTION_IDS, '-20% 0px -70% 0px', bodyReady);

  const commandCount = COMMAND_GROUPS.reduce((n, g) => n + g.items.length, 0);
  // コマンド絞り込み: 名前・引数・説明のどれかに一致した行だけ出す(空欄で全件)
  const commands = useMemo(() => {
    const q = query.trim().toLowerCase();
    const groups = q
      ? COMMAND_GROUPS.map((g) => ({
          ...g,
          items: g.items.filter((cmd) =>
            `${cmd.name} ${cmd.arg} ${cmd.help}`.toLowerCase().includes(q),
          ),
        })).filter((g) => g.items.length > 0)
      : COMMAND_GROUPS;
    const shown = groups.reduce((n, g) => n + g.items.length, 0);
    return (
      <>
        <div className="mb-6">
          <label className="relative block max-w-sm">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-mist"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('コマンドを探す(名前・説明)', 'Filter commands (name, description)', {
                'zh-CN': '查找命令(名称・说明)',
                'zh-TW': '尋找指令(名稱・說明)',
                ko: '명령 찾기(이름・설명)',
              })}
              aria-label={t('コマンドを探す', 'Filter commands', {
                'zh-CN': '查找命令',
                'zh-TW': '尋找指令',
                ko: '명령 찾기',
              })}
              className="w-full rounded-lg border border-cream/15 bg-paper/50 py-2 pl-9 pr-3 font-mono text-sm text-cream placeholder:text-mist/80 focus:border-sakura/50 focus:outline-none"
            />
          </label>
          {q ? (
            <p className="mt-2 font-mono text-xs text-mist">
              {shown} / {commandCount}
            </p>
          ) : null}
        </div>
        {groups.length === 0 ? (
          <p className="mb-8 text-mist">
            {t('見つかりませんでした。', 'No commands matched.', {
              'zh-CN': '没有匹配的命令。',
              'zh-TW': '沒有相符的指令。',
              ko: '일치하는 명령이 없습니다.',
            })}
          </p>
        ) : null}
        {groups.map((group) => (
          <div key={group.group} className="mb-8">
            <h3 className="font-mono text-xs text-sakura tracking-wider mb-3">{group.group}</h3>
            <div className="overflow-x-auto">
              {/* 幅を固定する。auto のままだと、長い引数を持つ行が表を横に押し広げ、
                  説明の列が1文字ぶんまで潰れる(実際に配信の行で起きた) */}
              <table className="w-full table-fixed text-sm border-collapse">
                <tbody>
                  {group.items.map((cmd) => (
                    <tr key={cmd.name} className="border-b border-cream/5 align-top">
                      {/* コマンド名は折らない。引数は折る —— 折り返しを止めると、
                          引数の長いコマンドが表を横に押し広げて説明の列を潰す */}
                      <td className="py-2 pr-4 font-mono text-cream w-[46%] break-words">
                        <span className="whitespace-nowrap">/{cmd.name}</span>
                        {cmd.arg ? <span className="text-mist/80"> {cmd.arg}</span> : null}
                      </td>
                      <td className="py-2 text-mist">{cmd.help}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </>
    );
  }, [COMMAND_GROUPS, commandCount, query, t]);

  const Body = pickByLang(lang, BODIES);

  return (
    <main id="main" className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 pt-28 pb-24">
      <Reveal>
        <div className="flex items-center justify-between gap-4">
          <a href="/" className="font-mono text-xs text-mist hover:text-sakura transition-colors">
            ← mirika.dev
          </a>
          <LangSwitch />
        </div>
        <h1 className="mt-4 font-mincho text-4xl sm:text-5xl font-bold">
          {t('使い方', 'How to use', { 'zh-CN': '使用指南', 'zh-TW': '使用指南', ko: '사용법' })}
        </h1>
        <p className="mt-3 text-mist leading-relaxed max-w-2xl">
          {t('インストールしてからできることを、ひととおり。迷ったらアプリのチャット欄で ', 'Everything you can do once installed. Whenever you are unsure, type ', {
            'zh-CN': '安装之后能做的事,在这里过一遍。拿不准时,在应用的聊天栏输入 ',
            'zh-TW': '安裝之後能做的事,在這裡過一遍。拿不準時,在應用的聊天欄輸入 ',
            ko: '설치한 뒤 할 수 있는 일을 한 바퀴. 헷갈리면 앱의 채팅란에 ',
          })}
          <C>/help</C>
          {t(' と打てば、同じ一覧がその場に出ます。', ' in the app’s chat box and the same list appears right there.', {
            'zh-CN': ',同样的清单就会出现在眼前。',
            'zh-TW': ',同樣的清單就會出現在眼前。',
            ko: ' 을 치면 같은 목록이 그 자리에 나옵니다.',
          })}
        </p>
      </Reveal>

      <div className="mt-14 grid lg:grid-cols-[200px_1fr] gap-10">
        {/* 目次 */}
        <nav
          className="hidden lg:block"
          aria-label={t('目次', 'Table of contents', { 'zh-CN': '目录', 'zh-TW': '目錄', ko: '목차' })}
        >
          <div className="sticky top-28 space-y-1">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                aria-current={active === s.id ? 'true' : undefined}
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
          <Suspense fallback={<div className="min-h-[70vh]" aria-busy="true" />}>
            <Body commands={commands} commandCount={commandCount} />
            <BodyReady onReady={() => setBodyReady((n) => n + 1)} />
          </Suspense>

          <Reveal>
            <div className="mt-16 pt-8 border-t border-cream/10 flex flex-wrap gap-4 items-center">
              <a href="/" className="font-mono text-xs text-mist hover:text-sakura transition-colors">
                ← mirika.dev
              </a>
              <a
                href="https://github.com/emerauda/mirika-releases"
                className="font-mono text-xs text-mist hover:text-sakura transition-colors"
              >
                {t('ダウンロード / リリースノート', 'Download / release notes', { 'zh-CN': '下载 / 更新日志', 'zh-TW': '下載 / 更新日誌', ko: '다운로드 / 릴리스 노트' })}
              </a>
              <a
                href="https://pro.mirika.dev/"
                className="font-mono text-xs text-mist hover:text-sakura transition-colors"
              >
                {t('Pro について', 'About Pro', { 'zh-CN': '关于 Pro', 'zh-TW': '關於 Pro', ko: 'Pro 안내' })}
              </a>
            </div>
          </Reveal>
        </article>
      </div>
    </main>
  );
}
