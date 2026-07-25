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
import { Docs } from './components/Docs';

export default function App() {
  // /docs は同じアプリの別画面として出す(ルータは入れず、配信側の SPA
  // フォールバック(public/_redirects)で直リンクも開けるようにしてある)
  if (typeof location !== 'undefined' && location.pathname.replace(/\/+$/, '') === '/docs') {
    return (
      <>
        <BackgroundFX />
        <Docs />
        <Footer />
      </>
    );
  }
  return (
    <>
      <ScrollProgress />
      <BackgroundFX />
      <Nav />
      <main className="relative z-10">
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
