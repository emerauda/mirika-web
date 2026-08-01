import { Download } from 'lucide-react';
import { DiscordMark, GitHubMark } from './ui';
import { Reveal, MagneticLink } from './primitives';
import { useT } from '../i18n';

export function Cta() {
  const t = useT();
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
            {t('新しいゴーストを、いっしょに。', 'A new kind of ghost — together.', {
              'zh-CN': '新的幽灵,与你一起。',
              'zh-TW': '新的幽靈,與你一起。',
              ko: '새로운 고스트를, 함께.',
            })}
          </p>
        </Reveal>
        <Reveal>
          <p className="text-mist leading-loose mb-10 max-w-xl mx-auto">
            {t('Mirika はローカルファーストのフリーウェアです。試して、コミュニティであなたのアイデアを聞かせてください。', 'Mirika is local-first freeware. Try it, join the community, and tell us what you want her to become.', {
              'zh-CN': 'Mirika 是本地优先的免费软件。来试试,加入社区,告诉我们你希望她成为什么样子。',
              'zh-TW': 'Mirika 是本地優先的免費軟體。來試試,加入社群,告訴我們你希望她成為什麼樣子。',
              ko: 'Mirika는 로컬 우선 프리웨어입니다. 써 보고, 커뮤니티에 참여해서, 그녀가 어떤 모습이 되길 바라는지 들려주세요.',
            })}
          </p>
        </Reveal>
        <Reveal className="flex flex-wrap justify-center gap-4">
          <MagneticLink
            href="#download"
            className="btn-hard inline-flex items-center gap-2 bg-sakura text-white px-6 py-3.5 font-bold text-sm"
          >
            <Download className="w-4 h-4" />{' '}
            {t('ダウンロード', 'Download', { 'zh-CN': '下载', 'zh-TW': '下載', ko: '다운로드' })}
          </MagneticLink>
          <MagneticLink
            href="https://discord.gg/fnmUau5qzB"
            target="_blank"
            rel="noopener"
            className="btn-hard inline-flex items-center gap-2 bg-paper text-ink px-6 py-3.5 font-bold text-sm"
          >
            <DiscordMark className="w-4 h-4" />{' '}
            {t('Discord に参加', 'Join the Discord', { 'zh-CN': '加入 Discord', 'zh-TW': '加入 Discord', ko: 'Discord 참여' })}
          </MagneticLink>
          <MagneticLink
            href="https://github.com/emerauda/mirika-releases"
            target="_blank"
            rel="noopener"
            className="btn-hard inline-flex items-center gap-2 bg-paper text-ink px-6 py-3.5 font-bold text-sm"
          >
            <GitHubMark className="w-4 h-4" />{' '}
            {t('GitHub で Watch', 'Watch on GitHub', { 'zh-CN': '在 GitHub 上关注', 'zh-TW': '在 GitHub 上關注', ko: 'GitHub에서 Watch' })}
          </MagneticLink>
        </Reveal>
      </div>
    </section>
  );
}
