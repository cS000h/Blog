// @ts-check
import { defineConfig } from 'astro/config';

// 网站地址：GitHub Pages 的项目站点是 https://<用户名>.github.io/<仓库名>/
// 如果以后改了仓库名或绑定了自己的域名，只需要改这里两行。
export default defineConfig({
  site: 'https://cs000h.github.io',
  base: '/Blog',
  trailingSlash: 'always',
  markdown: {
    shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } },
  },
});
