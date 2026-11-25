import { getCollection, type CollectionEntry } from 'astro:content';
import { SECTIONS } from '../config';

export type Kind = 'note' | 'article';

export interface Post {
  kind: Kind;
  id: string;
  title?: string;
  description?: string;
  date: Date;
  section?: string;
  tags: string[];
  href: string;
  body: string;
  entry: CollectionEntry<'notes'> | CollectionEntry<'articles'>;
}

/** 给站内链接加上 base 前缀（GitHub Pages 项目站点在 /仓库名/ 下）。 */
export function url(path = '/') {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}

/** 没写 date 时，从文件名开头的 YYYY-MM-DD 取日期。 */
function resolveDate(date: Date | undefined, entry: { id: string; filePath?: string }) {
  if (date) return date;
  const name = (entry.filePath ?? entry.id).split('/').pop() ?? '';
  const m = name.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (m) return new Date(`${m[1]}-${m[2]}-${m[3]}T00:00:00Z`);
  throw new Error(
    `「${entry.filePath ?? entry.id}」缺少日期：请在开头写 date: 2026-01-01，或让文件名以日期开头。`,
  );
}

const show = (draft: boolean) => import.meta.env.DEV || !draft;

export async function getNotes(): Promise<Post[]> {
  const items = await getCollection('notes', ({ data }) => show(data.draft));
  return items
    .map((e) => ({
      kind: 'note' as const,
      id: e.id,
      title: e.data.title,
      date: resolveDate(e.data.date, e),
      section: e.data.section,
      tags: e.data.tags,
      href: url(`/notes/${e.id}/`),
      body: e.body ?? '',
      entry: e,
    }))
    .sort(byDate);
}

export async function getArticles(): Promise<Post[]> {
  const items = await getCollection('articles', ({ data }) => show(data.draft));
  return items
    .map((e) => ({
      kind: 'article' as const,
      id: e.id,
      title: e.data.title,
      description: e.data.description,
      date: resolveDate(e.data.date, e),
      section: e.data.section,
      tags: e.data.tags,
      href: url(`/articles/${e.id}/`),
      body: e.body ?? '',
      entry: e,
    }))
    .sort(byDate);
}

export async function getAll(): Promise<Post[]> {
  return [...(await getNotes()), ...(await getArticles())].sort(byDate);
}

function byDate(a: Post, b: Post) {
  return b.date.getTime() - a.date.getTime();
}

/** 2026-11-25 */
export function fmtDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

/** 阅读时间：中文约 400 字/分钟，英文约 200 词/分钟。 */
export function readingMinutes(text: string) {
  const plain = text.replace(/```[\s\S]*?```/g, '').replace(/<[^>]+>/g, '');
  const cjk = (plain.match(/[㐀-鿿豈-﫿]/g) ?? []).length;
  const words = (plain.replace(/[㐀-鿿豈-﫿]/g, ' ').match(/[A-Za-z0-9]+/g) ?? []).length;
  return Math.max(1, Math.round(cjk / 400 + words / 200));
}

export const KIND_LABEL: Record<Kind, string> = { note: '笔记', article: '文章' };

export function sectionOf(id?: string) {
  return SECTIONS.find((s) => s.id === id);
}
