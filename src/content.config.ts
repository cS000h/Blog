import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { SECTIONS } from './config';

// 栏目只能是 src/config.ts 里列出的 id，写错了构建时会提示。
const section = z.enum(SECTIONS.map((s) => s.id) as [string, ...string[]]).optional();

// 笔记：短小的想法。所有字段都可以省略，
// 日期默认从文件名开头的 YYYY-MM-DD 读取。
const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string().optional(),
    date: z.coerce.date().optional(),
    section,
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// 文章：完整一点的记录。只有 title 必填。
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    description: z.string().optional(),
    section,
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { notes, articles };
