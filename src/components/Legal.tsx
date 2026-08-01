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
 * 「翻訳は参考」の注記を自動で挿す。
 */
import { useLang, useT } from '../i18n';
import { Shell } from './legal-ui';
import { PrivacyBodyJa, TermsBodyJa } from './legal-body-ja';
import { PrivacyBodyEn, TermsBodyEn } from './legal-body-en';
import { PrivacyBodyZhCn, TermsBodyZhCn } from './legal-body-zh-cn';
import { PrivacyBodyZhTw, TermsBodyZhTw } from './legal-body-zh-tw';
import { PrivacyBodyKo, TermsBodyKo } from './legal-body-ko';

export function Privacy() {
  const { lang } = useLang();
  const t = useT();
  const Body =
    lang === 'en'
      ? PrivacyBodyEn
      : lang === 'zh-CN'
        ? PrivacyBodyZhCn
        : lang === 'zh-TW'
          ? PrivacyBodyZhTw
          : lang === 'ko'
            ? PrivacyBodyKo
            : PrivacyBodyJa;
  return (
    <Shell title={t('プライバシーポリシー', 'Privacy Policy', { 'zh-CN': '隐私政策', 'zh-TW': '隱私政策', ko: '개인정보 처리방침' })}>
      <Body />
    </Shell>
  );
}

export function Terms() {
  const { lang } = useLang();
  const t = useT();
  const Body =
    lang === 'en'
      ? TermsBodyEn
      : lang === 'zh-CN'
        ? TermsBodyZhCn
        : lang === 'zh-TW'
          ? TermsBodyZhTw
          : lang === 'ko'
            ? TermsBodyKo
            : TermsBodyJa;
  return (
    <Shell title={t('利用規約', 'Terms of Use', { 'zh-CN': '使用条款', 'zh-TW': '使用條款', ko: '이용약관' })}>
      <Body />
    </Shell>
  );
}
