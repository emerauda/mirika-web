import type { ReactNode } from 'react';
import { Kicker, TitleBar } from './ui';
import { Reveal, StaggerGroup, StaggerItem } from './primitives';
import { useT } from '../i18n';

type Row = {
  l: ReactNode;
  r: ReactNode;
  highlight?: boolean;
  lClass?: string;
  rClass?: string;
};

export function Concept() {
  const t = useT();
  const ROWS: Row[] = [
    {
      l: t('ベースウェア(SSP / materia)', 'Baseware (SSP / materia)', { 'zh-CN': '基础软件(SSP / materia)', 'zh-TW': '基礎軟體(SSP / materia)', ko: '베이스웨어(SSP / materia)' }),
      r: t('Mirika 本体(Electron・3OS常駐)', 'Mirika itself (Electron, resident on 3 OSes)', { 'zh-CN': 'Mirika 本体(Electron・常驻三大系统)', 'zh-TW': 'Mirika 本體(Electron・常駐三大系統)', ko: 'Mirika 본체(Electron·3OS 상주)' }),
    },
    {
      l: t('SHIORI(里々・YAYA・華和梨)', 'SHIORI (Satori / YAYA / Kawari)', { 'zh-CN': 'SHIORI(里々・YAYA・華和梨)', 'zh-TW': 'SHIORI(里々・YAYA・華和梨)', ko: 'SHIORI(사토리·YAYA·카와리)' }),
      r: t('ローカルLLM(Qwen / Gemma)+クラウド任意', 'A local LLM (Qwen / Gemma), cloud optional', { 'zh-CN': '本地 LLM(Qwen / Gemma)+可选云端', 'zh-TW': '本地 LLM(Qwen / Gemma)+可選雲端', ko: '로컬 LLM(Qwen / Gemma)+클라우드는 선택' }),
    },
    {
      l: t('シェル(サーフェス画像・\\s[n])', 'Shells (surface images, \\s[n])', { 'zh-CN': '外壳(surface 图片・\\s[n])', 'zh-TW': '外殼(surface 圖片・\\s[n])', ko: '셸(서피스 이미지·\\s[n])' }),
      r: t('VRM / Live2D / MMD(表情・視線・撫で判定)+クラシック互換', 'VRM / Live2D / MMD (expressions, gaze, petting) + classic compatibility', { 'zh-CN': 'VRM / Live2D / MMD(表情・视线・抚摸判定)+经典外壳兼容', 'zh-TW': 'VRM / Live2D / MMD(表情・視線・撫摸判定)+經典外殼相容', ko: 'VRM / Live2D / MMD(표정·시선·쓰다듬기)+클래식 호환' }),
    },
    {
      l: t('「AIトーク」(スクリプト再生)', '"AI talk" (scripted playback)', { 'zh-CN': '「AI 对话」(脚本回放)', 'zh-TW': '「AI 對話」(腳本回放)', ko: '"AI 토크"(스크립트 재생)' }),
      r: t('「AIトーク」(本物のAI)', '"AI talk" (an actual AI)', { 'zh-CN': '「AI 对话」(真正的 AI)', 'zh-TW': '「AI 對話」(真正的 AI)', ko: '"AI 토크"(진짜 AI)' }),
      highlight: true,
      lClass: 'font-bold',
      rClass: 'font-bold text-sakura',
    },
    {
      l: t('メールチェック(POP3 biff)', 'Mail check (POP3 biff)', { 'zh-CN': '邮件检查(POP3 biff)', 'zh-TW': '郵件檢查(POP3 biff)', ko: '메일 확인(POP3 biff)' }),
      r: t('Gmail・カレンダー・タスク(MCP秘書)', 'Gmail, calendar, tasks (an MCP secretary)', { 'zh-CN': 'Gmail・日历・任务(MCP 秘书)', 'zh-TW': 'Gmail・日曆・任務(MCP 秘書)', ko: 'Gmail·캘린더·태스크(MCP 비서)' }),
    },
    {
      l: t('辞書(エンジン依存・起動回数で成長)', 'Dictionaries (engine-bound, grow by boot count)', { 'zh-CN': '词典(依赖引擎・按启动次数成长)', 'zh-TW': '詞典(依賴引擎・按啟動次數成長)', ko: '사전(엔진 종속·기동 횟수로 성장)' }),
      r: t('人格プロンプト+memory.db(モデル非依存・数年単位で成長)', 'A persona prompt + memory.db (model-independent, grows over years)', { 'zh-CN': '人格提示词+memory.db(不依赖模型・以年为单位成长)', 'zh-TW': '人格提示詞+memory.db(不依賴模型・以年為單位成長)', ko: '인격 프롬프트+memory.db(모델 비종속·몇 년 단위로 성장)' }),
    },
    {
      l: t('ゴーストのネットワーク更新', 'Ghost network updates', { 'zh-CN': '幽灵的网络更新', 'zh-TW': '幽靈的網路更新', ko: '고스트 네트워크 업데이트' }),
      r: t('.mirika パッケージ配布(作って、配って、育てる)', '.mirika package distribution (make it, share it, raise it)', { 'zh-CN': '.mirika 包分发(制作、分发、养成)', 'zh-TW': '.mirika 包分發(製作、分發、養成)', ko: '.mirika 패키지 배포(만들고, 나누고, 키운다)' }),
    },
  ];
  return (
    <section id="concept" className="max-w-6xl mx-auto px-6 py-24 scroll-mt-20">
      <Reveal className="mb-14">
        <Kicker index="01" label="Concept" />
        <h2 className="font-mincho font-bold text-3xl md:text-4xl leading-relaxed">
          {t('ただのチャットAIは、つくらない。', 'Not just another chat AI.', { 'zh-CN': '我们不做「又一个聊天 AI」。', 'zh-TW': '我們不做「又一個聊天 AI」。', ko: '그저 그런 채팅 AI는 만들지 않는다.' })}
        </h2>
        <p className="text-mist leading-loose mt-5 max-w-2xl">
          {t('つくるのは、デスクトップに住む「存在」です。頭脳はローカルLLMだから、24時間そばにいても利用料はゼロで、会話は端末の外に出ない。', 'What we build is a presence that lives on your desktop. The brain is a local LLM, so being together around the clock costs nothing — and no conversation leaves the machine. ', {
            'zh-CN': '我们要做的是住在桌面上的「存在」。头脑是本地 LLM,24 小时相伴也零费用,对话不出设备一步。',
            'zh-TW': '我們要做的是住在桌面上的「存在」。頭腦是本地 LLM,24 小時相伴也零費用,對話不出裝置一步。',
            ko: '만드는 것은 데스크톱에 사는 "존재"입니다. 두뇌가 로컬 LLM이라 24시간 곁에 있어도 요금이 없고, 대화는 기기 밖으로 나가지 않습니다. ',
          })}
          <strong className="text-cream">
            {t('記憶と人格はモデルから独立しているから、数年単位で関係が育つ。', 'Memory and persona live apart from the model, so the relationship grows over years.', {
              'zh-CN': '记忆与人格独立于模型,关系能以年为单位成长。',
              'zh-TW': '記憶與人格獨立於模型,關係能以年為單位成長。',
              ko: '기억과 인격은 모델에서 독립되어 있어, 관계가 몇 년 단위로 자랍니다.',
            })}
          </strong>
          {t('ルーツは2000年のデスクトップマスコット「伺か」——受け継ぐものと、新しくするものは、この表のとおりです。', ' The roots go back to "Ukagaka", the desktop mascot of 2000 — what we inherit and what we renew is laid out in this table.', {
            'zh-CN': '根源是 2000 年的桌面萌宠文化「伺か」——继承什么、革新什么,都在这张表里。',
            'zh-TW': '根源是 2000 年的桌面萌寵文化「伺か」——繼承什麼、革新什麼,都在這張表裡。',
            ko: ' 뿌리는 2000년의 데스크톱 마스코트 "우카가카" — 무엇을 잇고 무엇을 새로 하는지는 이 표에 담았습니다.',
          })}
        </p>
      </Reveal>

      <Reveal className="os-window">
        <TitleBar>
          <span>mapping — ukagaka (2000) → mirika (2026)</span>
          <span className="text-sub tracking-widest">— □ ×</span>
        </TitleBar>
        <StaggerGroup className="divide-y divide-ink/10">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_56px_1fr] items-center px-6 py-3.5 font-mono text-[11px] text-sub uppercase tracking-widest bg-ink/5">
            <span>Ukagaka — 2000</span>
            <span className="hidden md:block"></span>
            <span>Mirika — 2026</span>
          </div>
          {ROWS.map((row, i) => (
            <StaggerItem
              key={i}
              className={`grid grid-cols-1 md:grid-cols-[1fr_56px_1fr] items-center px-6 py-4 gap-1 ${row.highlight ? 'bg-sakura/10' : ''}`}
            >
              <span className={row.lClass}>{row.l}</span>
              <span className="text-sakura font-mono md:text-center">→</span>
              <span className={row.rClass}>{row.r}</span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Reveal>
    </section>
  );
}
