import type { APIContext } from 'astro';
import { SITE } from '../config';
import { getAll, fmtDate } from '../lib/posts';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function GET(context: APIContext) {
  const site = context.site!.toString().replace(/\/$/, '');
  const posts = (await getAll()).slice(0, 50);
  const items = posts
    .map((p) => {
      const link = site + p.href;
      const title = p.title ?? `笔记 ${fmtDate(p.date)}`;
      const desc = p.description ?? p.body.slice(0, 200);
      return `<item><title>${esc(title)}</title><link>${link}</link><guid>${link}</guid><pubDate>${p.date.toUTCString()}</pubDate><description>${esc(desc)}</description></item>`;
    })
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(SITE.title)}</title><link>${site}${import.meta.env.BASE_URL}</link><description>${esc(SITE.description)}</description><language>${SITE.lang}</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
