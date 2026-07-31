import { Download } from 'lucide-react';
import { GitHubMark } from './ui';
import { Reveal, MagneticLink } from './primitives';

export function Cta() {
  return (
    <section className="relative border-t border-cream/10 bg-black/20 overflow-hidden">
      {/* 締めの一枚(夜景と桜)。文字が主役なので、絵は暗幕の向こうに敷く */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <img
          src="/kv/night.webp"
          alt=""
          loading="lazy"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0912] via-[#0b0912]/60 to-[#0b0912]" />
      </div>
      <div className="relative max-w-3xl mx-auto px-6 py-24 text-center">
        <Reveal>
          <p className="font-mincho font-bold text-2xl md:text-3xl leading-relaxed mb-5">
            新しいゴーストを、<br className="md:hidden" />いっしょに。
          </p>
        </Reveal>
        <Reveal>
          <p className="text-mist leading-loose mb-10 max-w-xl mx-auto">
            Mirika はローカルファーストのフリーウェアです。
            企画書を読んで、あなたのアイデアを聞かせてください。
          </p>
        </Reveal>
        <Reveal className="flex flex-wrap justify-center gap-4">
          <MagneticLink
            href="#download"
            className="btn-hard inline-flex items-center gap-2 bg-sakura text-white px-6 py-3.5 font-bold text-sm"
          >
            <Download className="w-4 h-4" /> ダウンロード
          </MagneticLink>
          <MagneticLink
            href="https://github.com/emerauda/mirika-releases"
            target="_blank"
            rel="noopener"
            className="btn-hard inline-flex items-center gap-2 bg-paper text-ink px-6 py-3.5 font-bold text-sm"
          >
            <GitHubMark className="w-4 h-4" /> GitHub で Watch
          </MagneticLink>
        </Reveal>
      </div>
    </section>
  );
}
