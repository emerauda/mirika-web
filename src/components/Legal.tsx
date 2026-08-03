/**
 * プライバシーポリシーと利用規約。
 *
 * **この製品の実態に即して書く。** 既定では会話も画面も端末から出ないので、
 * 「収集します」を並べる一般的な文面はそのまま当てはまらない ——
 * かえって「取っているのだろう」と読まれる。
 *
 * だから構成を逆にした: **何を取らないか**を先に書き、そのうえで
 * 外に出る場面(クラウドの頭脳・同期・ライセンス確認)を1つずつ挙げる。
 *
 * 本文は言語ごとに legal-body-*.tsx が丸ごと持つ(法務文書の逐語 t() 分割は
 * 語順と文責の両面で危うい)。日本語が正文で、他言語には Shell が
 * 「翻訳は参考」の注記を自動で挿す。本文は言語別チャンク(lazy)。
 */
import { lazy, Suspense, type ComponentType } from 'react';
import { pickByLang, useLang, useT, type Lang } from '../i18n';
import { Shell } from './legal-ui';

const PRIVACY: Record<Lang, ComponentType> = {
  ja: lazy(() => import('./legal-body-ja').then((m) => ({ default: m.PrivacyBodyJa }))),
  en: lazy(() => import('./legal-body-en').then((m) => ({ default: m.PrivacyBodyEn }))),
  'zh-CN': lazy(() => import('./legal-body-zh-cn').then((m) => ({ default: m.PrivacyBodyZhCn }))),
  'zh-TW': lazy(() => import('./legal-body-zh-tw').then((m) => ({ default: m.PrivacyBodyZhTw }))),
  ko: lazy(() => import('./legal-body-ko').then((m) => ({ default: m.PrivacyBodyKo }))),
};
const TERMS: Record<Lang, ComponentType> = {
  ja: lazy(() => import('./legal-body-ja').then((m) => ({ default: m.TermsBodyJa }))),
  en: lazy(() => import('./legal-body-en').then((m) => ({ default: m.TermsBodyEn }))),
  'zh-CN': lazy(() => import('./legal-body-zh-cn').then((m) => ({ default: m.TermsBodyZhCn }))),
  'zh-TW': lazy(() => import('./legal-body-zh-tw').then((m) => ({ default: m.TermsBodyZhTw }))),
  ko: lazy(() => import('./legal-body-ko').then((m) => ({ default: m.TermsBodyKo }))),
};

const FALLBACK = <div className="min-h-[50vh]" aria-busy="true" />;

export function Privacy() {
  const { lang } = useLang();
  const t = useT();
  const Body = pickByLang(lang, PRIVACY);
  return (
    <Shell title={t('プライバシーポリシー', 'Privacy Policy', { 'zh-CN': '隐私政策', 'zh-TW': '隱私政策', ko: '개인정보 처리방침' })}>
      <Suspense fallback={FALLBACK}>
        <Body />
      </Suspense>
    </Shell>
  );
}

export function Terms() {
  const { lang } = useLang();
  const t = useT();
  const Body = pickByLang(lang, TERMS);
  return (
    <Shell title={t('利用規約', 'Terms of Use', { 'zh-CN': '使用条款', 'zh-TW': '使用條款', ko: '이용약관' })}>
      <Suspense fallback={FALLBACK}>
        <Body />
      </Suspense>
    </Shell>
  );
}
