# 随手记

我的个人博客：零碎的想法、学习和探索的记录。

网址：https://cs000h.github.io/Blog/

用 [Astro](https://astro.build) 生成静态网页，内容全部是仓库里的 Markdown 文件，推送到 `main` 后自动发布到 GitHub Pages。

---

## 写一条新记录

### 笔记（短的，一两句也行）

在 `src/content/notes/` 里新建一个文件，**文件名以日期开头**：

```
src/content/notes/2026-11-26-something.md
```

内容：

```markdown
---
section: daily
---

今天想到的一件事……
```

开头 `---` 之间的部分叫 frontmatter，全都可以省略：

| 字段 | 说明 |
| --- | --- |
| `section` | 栏目，见下文。不写就不属于任何栏目 |
| `title` | 标题。笔记一般不需要 |
| `date` | 日期，如 `2026-11-26`。不写就用文件名开头的日期 |
| `tags` | 标签，如 `[Unity, 物理]` |
| `draft` | 写 `true` 就先不发布 |

### 文章（完整一点的）

在 `src/content/articles/` 里新建文件，文件名同样以日期开头。只有 `title` 是必填的：

```markdown
---
title: 文章标题
description: 一句话摘要（可选）
section: gamedev
---

正文。用 `##` 和 `###` 写小标题，会自动生成左侧的动态目录。
```

### 模板

`templates/` 里给每个栏目都准备了笔记和文章模板，复制一份改内容就行：

| 栏目 | 笔记模板 | 文章模板 |
| --- | --- | --- |
| 课程学习 | `templates/notes/course.md` | `templates/articles/course.md` |
| 游戏开发 | `templates/notes/gamedev.md` | `templates/articles/gamedev.md` |
| 今日见闻 | `templates/notes/daily.md` | `templates/articles/daily.md` |
| 杂想 | `templates/notes/misc.md` | `templates/articles/misc.md` |

步骤：

1. 复制模板到 `src/content/notes/`（笔记）或 `src/content/articles/`（文章）。
2. 改文件名为「日期-英文短名.md」，比如 `2026-11-26-jump-feel.md`。
3. 把正文换成你的内容。模板里 `#` 开头的说明行和 `<!-- -->` 里的提示都不会显示在网站上，留着也没关系。
4. 提交（在 GitHub 网页上传，或者用 git 推送），一两分钟后网站自动更新。

`templates/` 文件夹本身不会被发布到网站上。

### 在手机或网页上写

1. 打开仓库，进入 `src/content/notes`（或 `articles`）。
2. 点 **Add file → Create new file**，填文件名，比如 `2026-11-26-idea.md`。
3. 写内容，点 **Commit changes**（直接提交到 `main`）。
4. 一两分钟后网站自动更新。可以在仓库的 **Actions** 页看进度。

### Markdown 小抄

```markdown
**加粗**  *斜体*  `代码`  [链接](https://example.com)
> 引用
- 列表
![图片说明](./图片.png)
脚注[^1]

[^1]: 脚注内容会显示在文章底部。
```

图片可以和 Markdown 文件放在同一个文件夹里，用相对路径引用。

---

## 栏目

栏目在 [`src/config.ts`](src/config.ts) 里定义。新增一个栏目只需加一行：

```ts
{ id: 'reading', name: '读书', intro: '读书时的摘录和想法。' },
```

- `id` 用英文，会出现在网址里（`/sections/reading/`），也是 frontmatter 里 `section:` 要写的值。
- `name` 是显示的名字。

加好后网站会自动多一个栏目页，首页也会多一个筛选标签。如果某篇记录写了不存在的栏目，构建时会报错提醒。

网站标题、简介、作者也在 `src/config.ts` 里改。

---

## 第一次开启 GitHub Pages（只需做一次）

1. 打开仓库的 **Settings → Pages**。
2. **Source** 选 **GitHub Actions**。
3. 之后每次推送到 `main`，`.github/workflows/deploy.yml` 会自动构建并发布。

如果改了仓库名，记得同时改 `astro.config.mjs` 里的 `base`。

---

## 在电脑上预览（可选）

需要 Node.js 22.23 以上。

```bash
npm install
npm run dev      # 打开 http://localhost:4321/Blog/
```

## 文件结构

```
src/
  config.ts            网站信息和栏目列表
  content/
    notes/             笔记
    articles/          文章
  pages/about.md       “关于”页面
  styles/global.css    配色和字体（顶部的变量）
  layouts/ components/ pages/   页面模板，平时不用动
templates/             每个栏目的笔记 / 文章模板（不会被发布）
```
