import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

/**
 * サイトの多言語対応(アプリ本体と同じ5言語・同じ書き方)。
 *
 * 文言はコンポーネントの中に `t('日本語', 'English', {...})` で置く —— アプリの
 * i18n と同じ形なので、両方を直すときに頭を切り替えなくて済む。
 * 訳が無い言語は 繁体→簡体→英語、韓国語→英語 の順で落ちる(空欄で出さない)。
 */
export type Lang = 'ja' | 'en' | 'zh-CN' | 'zh-TW' | 'ko';

export const LANGS: Array<{ code: Lang; label: string }> = [
  { code: 'ja', label: '日本語' },
  { code: 'en', label: 'English' },
  { code: 'zh-CN', label: '简体中文' },
  { code: 'zh-TW', label: '繁體中文' },
  { code: 'ko', label: '한국어' },
];

const STORAGE_KEY = 'mirika.lang';

function detectLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && LANGS.some((l) => l.code === saved)) return saved as Lang;
  } catch {
    /* プライベートモード等。ブラウザ検出へ */
  }
  // 第1候補だけだと、非対応言語(fr 等)を先頭に置く人の第2候補を捨ててしまう。
  // ブラウザの言語リストを上から順に、最初に対応できたものを採る
  const prefs = [...(navigator.languages ?? []), navigator.language].filter(Boolean);
  for (const raw of prefs) {
    const tag = raw.toLowerCase();
    if (tag.startsWith('ja')) return 'ja';
    if (tag.startsWith('ko')) return 'ko';
    if (tag.startsWith('en')) return 'en';
    if (tag.startsWith('zh')) {
      // 繁体は指定(Hant)か地域(台湾・香港・マカオ)で判る。それ以外の zh は簡体
      return /hant|tw|hk|mo/.test(tag) ? 'zh-TW' : 'zh-CN';
    }
  }
  return 'en';
}

const LangContext = createContext<{ lang: Lang; setLang: (lang: Lang) => void }>({
  lang: 'ja',
  setLang: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* 保存できなくてもセッション内は切り替わる */
    }
  };
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

type Extra = Partial<Record<'zh-CN' | 'zh-TW' | 'ko', string>>;

/** 現在の言語で文言を返すフック。書き方はアプリの t() と同じ。
 *  参照は言語が変わるまで安定(useMemo の依存に使える) */
export function useT() {
  const { lang } = useLang();
  return useCallback(
    (ja: string, en: string, extra?: Extra): string => {
      switch (lang) {
        case 'ja':
          return ja;
        case 'en':
          return en;
        case 'zh-CN':
          return extra?.['zh-CN'] ?? en;
        case 'zh-TW':
          return extra?.['zh-TW'] ?? extra?.['zh-CN'] ?? en;
        case 'ko':
          return extra?.ko ?? en;
      }
    },
    [lang],
  );
}

/** t() の5引数形。各所で `const T = (ja,en,cn,tw,ko) => …` と定義していたのを一本化 */
export function t5(t: ReturnType<typeof useT>) {
  return (ja: string, en: string, zhCN: string, zhTW: string, ko: string) =>
    t(ja, en, { 'zh-CN': zhCN, 'zh-TW': zhTW, ko });
}

/** 言語別に丸ごと持つもの(Docs/Legal の本文コンポーネント等)の選択 */
export function pickByLang<T>(lang: Lang, map: Record<Lang, T>): T {
  return map[lang];
}
