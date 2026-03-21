# 代码层面 SEO 优化计划

虽然您已经完成了最关键的“域名验证”和“Sitemap 提交”，但在代码层面（On-Page SEO），我们仍有提升空间。特别是针对 Next.js 应用，我们可以利用其特性进一步优化。

## 1. 语义化标签 (Semantic HTML) 强化
目前大部分页面结构已经不错，但可以进一步加强语义化，帮助搜索引擎更好地理解内容结构。
- [ ] **Projects & Works**: 确保每个项目卡片使用 `<article>` 或 `<li>`（在 `<ul>` 中）包裹，而不仅仅是 `<div>`。
- [ ] **Headings**: 检查 `h1`, `h2`, `h3` 的层级关系。目前首页有多个 `section`，但主标题 `h1` 只在 Hero 区域，这是正确的。确认其他部分使用 `h2` 作为节标题，`h3` 作为卡片标题。

## 2. 图片优化 (Image Optimization)
您已经开始使用 `next/image`，这非常好。我们可以进一步优化：
- [ ] **Alt Text**: 确保所有图片（尤其是项目图片、头像、爱好图片）都有描述性强的 `alt` 属性，而不仅仅是 "image" 或 "project"。这对于 SEO 和无障碍访问（Accessibility）都至关重要。
- [ ] **Sizes 属性**: 为响应式图片配置更精确的 `sizes` 属性，帮助浏览器下载最合适尺寸的图片，提升 Core Web Vitals 分数（LCP）。

## 3. 链接优化 (Link Optimization)
- [ ] **内部链接**: 确保页内导航（如 Header 中的锚点链接）和页面间跳转（如跳转到 `/studio`）都使用 Next.js 的 `<Link>` 组件，并添加 `aria-label` 如果链接只有图标。
- [ ] **外部链接**: 所有的 `target="_blank"` 链接都应保留 `rel="noopener noreferrer"`（目前代码中已大部分包含，需全面检查）。

## 4. 性能与可访问性 (Performance & Accessibility)
搜索引擎越来越看重页面体验（Page Experience）。
- [ ] **Lighthouse跑分**: 虽然不在代码里直接改，但我会检查代码中可能影响跑分的点，如字体加载策略（已在 `layout.tsx` 中使用 `next/font`，很好）、脚本加载等。
- [ ] **对比度**: 确保文字与背景的对比度符合 WCAG 标准（目前深色模式看起来不错，但在某些 hover 态下需注意）。

## 5. 结构化数据 (JSON-LD) 扩展
- [ ] **Breadcrumbs**: 为 `/studio` 或 `/resources` 页面添加面包屑导航的结构化数据。
- [ ] **CreativeWork/SoftwareApplication**: 为您的“项目”和“作品”添加对应的 Schema 标记，让它们有机会在搜索结果中以更丰富的形式展示。

---

### 具体执行步骤：

1.  **全局检查**: 扫描所有组件，替换非语义化标签，补充 `alt` 和 `aria-label`。
2.  **图片增强**: 优化 `ProjectCard`、`HobbiesGallery`、`ProfileCard` 中的 `next/image` 配置。
3.  **Schema 增强**: 在 `layout.tsx` 或各个页面的 `page.tsx` 中补充更多 JSON-LD 数据。

您是否同意这个代码层面的优化计划？确认后我将开始执行。