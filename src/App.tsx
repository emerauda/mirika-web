import { lazy, Suspense } from 'react';
import { ScrollProgress } from './components/ScrollProgress';
import { BackgroundFX } from './components/BackgroundFX';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { Marquee } from './components/Marquee';
import { Concept } from './components/Concept';
import { Features } from './components/Features';
import { UseCases } from './components/UseCases';
import { Architecture } from './components/Architecture';
import { Stack } from './components/Stack';
import { Roadmap } from './components/Roadmap';
import { ForYou } from './components/ForYou';
import { Vision } from './components/Vision';
import { Faq } from './components/Faq';
import { Download } from './components/Download';
import { Cta } from './components/Cta';
import { Footer } from './components/Footer';
import { useT } from './i18n';

// 別画面(使い方・法務)は開いた人だけが取りに行く。5言語の長文まで
// トップページの JS に同梱すると、初回表示が本文の重さを背負ってしまう
const Docs = lazy(() => import('./components/Docs').then((m) => ({ default: m.Docs })));
const Privacy = lazy(() => import('./components/Legal').then((m) => ({ default: m.Privacy })));
const Terms = lazy(() => import('./components/Legal').then((m) => ({ default: m.Terms })));

const ROUTE_FALLBACK = <div className="min-h-screen" aria-busy="true" />;

/** 知らないパスに来たとき(共有リンクの打ち間違い等)。黙ってトップを装わない */
function NotFound() {
  const t = useT();
  return (
    <main className="relative z-10 mx-auto max-w-3xl px-6 pt-40 pb-24 text-center">
      <p className="font-mono text-sm text-sakura">404</p>
      <h1 className="mt-3 font-mincho text-3xl font-bold">
        {t('このページは見つかりませんでした', 'Page not found', {
          'zh-CN': '找不到该页面',
          'zh-TW': '找不到該頁面',
          ko: '페이지를 찾을 수 없습니다',
        })}
      </h1>
      <a href="/" className="mt-6 inline-block font-mono text-xs text-mist hover:text-sakura transition-colors">
        ← mirika.dev
      </a>
    </main>
  );
}

/** フォーカスが当たったときだけ現れる、本文への近道(キーボード操作者用) */
function SkipLink() {
  const t = useT();
  return (
    <a href="#main" className="skip-link font-mono text-xs">
      {t('本文へ移動', 'Skip to content', { 'zh-CN': '跳到正文', 'zh-TW': '跳到內文', ko: '본문으로 건너뛰기' })}
    </a>
  );
}

export default function App() {
  // /docs は同じアプリの別画面として出す(ルータは入れず、配信側の SPA
  // フォールバック(public/_redirects)で直リンクも開けるようにしてある)
  const path = typeof location !== 'undefined' ? location.pathname.replace(/\/+$/, '') : '';
  if (path === '/docs') {
    return (
      <>
        <SkipLink />
        <BackgroundFX />
        <Suspense fallback={ROUTE_FALLBACK}>
          <Docs />
        </Suspense>
        <Footer />
      </>
    );
  }
  if (path === '/privacy' || path === '/terms') {
    return (
      <>
        <SkipLink />
        <BackgroundFX />
        <Suspense fallback={ROUTE_FALLBACK}>{path === '/privacy' ? <Privacy /> : <Terms />}</Suspense>
        <Footer />
      </>
    );
  }
  if (path !== '' && path !== '/index.html') {
    return (
      <>
        <BackgroundFX />
        <NotFound />
        <Footer />
      </>
    );
  }
  return (
    <>
      <SkipLink />
      <ScrollProgress />
      <BackgroundFX />
      <Nav />
      <main id="main" className="relative z-10">
        <Hero />
        <Marquee />
        <Concept />
        <Features />
        <UseCases />
        <Architecture />
        <Stack />
        <Roadmap />
        <ForYou />
        <Vision />
        <Faq />
        <Download />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
