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
import { Cta } from './components/Cta';
import { Footer } from './components/Footer';

export default function App() {
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
        <Cta />
      </main>
      <Footer />
    </>
  );
}
