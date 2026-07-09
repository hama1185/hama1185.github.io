// src/lib/site.ts — global site config: wordmark, nav, social links, UI strings.
import type { I18n } from './i18n';

export const site = {
  wordmark: 'Hamazaki',
  copyright: '© 2026 Ren Hamazaki',
};

export const nav: { href: string; key: string; label: I18n }[] = [
  { href: '/research',      key: 'research',     label: { en: 'Research',     ja: '研究' } },
  { href: '/publications',  key: 'publications', label: { en: 'Publications', ja: '文献' } },
  { href: '/cv',            key: 'cv',           label: { en: 'CV',           ja: 'CV' } },
  { href: '/contact',       key: 'contact',      label: { en: 'Contact',      ja: '連絡先' } },
];

// UI copy that isn't tied to a data file.
export const ui = {
  viewResearch:  { en: 'View research',        ja: '研究を見る' },
  allResearch:   { en: 'All research',         ja: 'すべての研究' },
  recentPubs:    { en: 'Recent publications',  ja: '最近の論文' },
  news:          { en: 'News',                 ja: 'ニュース' },
  about:         { en: 'About',                ja: '概要' },
  timeline:      { en: '経歴 / Timeline',      ja: '経歴' },
  fullCv:        { en: 'Full CV',              ja: 'CV 全文' },
  projects:      { en: 'Projects',             ja: 'プロジェクト' },
  personal:      { en: 'Personal / Side projects', ja: '個人プロジェクト' },
  downloadPdf:   { en: 'Download PDF',         ja: 'PDF をダウンロード' },
  getInTouch:    { en: 'Get in touch',         ja: 'お問い合わせ' },
  sendMessage:   { en: 'Send message',         ja: '送信' },
  fullList:      { en: 'Full list on the Publications page', ja: 'Publications ページに全文' },
};
