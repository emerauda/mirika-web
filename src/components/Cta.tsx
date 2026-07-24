import { BookOpen } from 'lucide-react';
import { GitHubMark } from './ui';
import { Reveal, MagneticLink } from './primitives';

export function Cta() {
  return (
    <section className="border-t border-cream/10 bg-black/20">
      <div className="max-w-3xl mx-auto px-6 py-24 text-center">
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
            href="https://github.com/emerauda/mirika"
            target="_blank"
            rel="noopener"
            className="btn-hard inline-flex items-center gap-2 bg-sakura text-white px-6 py-3.5 font-bold text-sm"
          >
            <BookOpen className="w-4 h-4" /> 企画書を読む
          </MagneticLink>
          <MagneticLink
            href="https://github.com/emerauda/mirika"
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
