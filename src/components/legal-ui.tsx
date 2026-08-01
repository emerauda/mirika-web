import type { ReactNode } from 'react';
import { useLang, useT } from '../i18n';

/** 法務ページ(プライバシー・規約)の組版部品。本文は legal-body-*.tsx が言語ごとに持つ。 */

export function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="scroll-mt-28 font-mincho text-2xl font-bold mt-14 mb-4">
      {children}
    </h2>
  );
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="font-bold text-cream mt-8 mb-2">{children}</h3>;
}

export function P({ children }: { children: ReactNode }) {
  return <p className="text-mist leading-relaxed mb-4">{children}</p>;
}

export function Ul({ children }: { children: ReactNode }) {
  return <ul className="mb-4 space-y-2 text-mist leading-relaxed list-disc pl-5">{children}</ul>;
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <div className="my-5 rounded-lg border-l-2 border-sakura/50 bg-paper/40 px-4 py-3 text-sm text-mist leading-relaxed">
      {children}
    </div>
  );
}

/** 最終更新日。内容を変えたときだけ改める(翻訳の追加は内容の変更ではない) */
const UPDATED = { ja: '2026年7月28日', en: 'July 28, 2026', zh: '2026年7月28日', ko: '2026년 7월 28일' };

export function Shell({ title, children }: { title: string; children: ReactNode }) {
  const { lang } = useLang();
  const t = useT();
  const updated = lang === 'ko' ? UPDATED.ko : lang === 'en' ? UPDATED.en : lang === 'ja' ? UPDATED.ja : UPDATED.zh;
  return (
    <div className="relative z-10 mx-auto max-w-3xl px-5 sm:px-8 pt-28 pb-24">
      <a href="/" className="font-mono text-xs text-mist hover:text-sakura transition-colors">
        ← mirika.dev
      </a>
      <h1 className="mt-4 font-mincho text-4xl font-bold">{title}</h1>
      <p className="mt-3 font-mono text-xs text-mist">
        {t('最終更新: ', 'Last updated: ', { 'zh-CN': '最后更新:', 'zh-TW': '最後更新:', ko: '최종 업데이트: ' })}
        {updated}
      </p>
      {lang !== 'ja' && (
        <p className="mt-4 rounded-lg border border-sakura/30 bg-paper/40 px-4 py-3 text-sm text-mist leading-relaxed">
          {t('', 'This translation is provided for convenience. The Japanese text is the authoritative version.', {
            'zh-CN': '本翻译仅供参考。以日文版本为准。',
            'zh-TW': '本翻譯僅供參考。以日文版本為準。',
            ko: '이 번역은 참고용입니다. 일본어 원문이 우선합니다.',
          })}
        </p>
      )}
      <article className="mt-10">{children}</article>
    </div>
  );
}
