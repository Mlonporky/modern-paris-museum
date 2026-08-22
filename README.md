# 光线照进现代巴黎

一个用 Astro Content Collections 制作的中文线上美术馆。第一期通过四幅作品解释19世纪巴黎的城市改造、铁路、消费文化、服务劳动与艺术市场。

## 我在这个项目中学习什么

- HTML 如何组织网页内容
- CSS 如何形成杂志式视觉和手机布局
- JavaScript 如何提供小测验反馈
- Astro 如何把结构化内容变成静态网页
- Git 如何保存每个小阶段
- GitHub Actions 如何自动发布 GitHub Pages

## 本地运行

```powershell
npm install
npm run dev
```

终端会显示本地网址，通常为 `http://localhost:4321`。

## 验证

```powershell
npm run verify
```

这会检查内容 schema、Astro 构建、生成页面、测验逻辑和四张本地图片。

## 内容结构

- `src/data/artworks/`：每幅作品一个 Markdown 文件
- `src/data/timeline.json`：历史时间线
- `src/content.config.ts`：规定每条内容必须填写的字段
- `src/components/`：可重复使用的页面组件
- `src/pages/index.astro`：把全部内容组合成一个展览页面

新增作品时，复制一份 artwork Markdown，填写新的元数据和三个正文栏目，再加入合法来源的本地图片。构建检查会阻止缺少来源、权利说明或替代文字的作品上线。

## 图片与研究来源

四幅作品的收藏机构记录来自芝加哥艺术博物馆、英国国家美术馆、奥赛博物馆和科陶德美术馆。本地图片来自各 artwork 文件记录的 Wikimedia Commons 页面；每张图片的权利状态必须以对应文件页为准。

详细策展设计见 `docs/superpowers/specs/2026-08-21-impressionist-online-museum-design.md`。

## 发布

推送到 `main` 后，`.github/workflows/deploy.yml` 使用 Astro 官方 GitHub Action 构建，并发布到 GitHub Pages。
