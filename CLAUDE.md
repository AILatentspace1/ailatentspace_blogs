   # AI Latent Space Blog - Claude Instructions

## Project Overview
This is an AI research blog built with Next.js, TypeScript, and Tailwind CSS, designed for daily AI tech research posts with comment system and newsletter signup functionality.

## Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Content**: MDX for blog posts
- **Deployment**: GitHub Pages (static export)
- **Comments**: Giscus (GitHub Discussions)
- **Newsletter**: ConvertKit/Mailchimp integration

## Development Commands
```bash
npm run dev -- --port 3001

# Build
npm run build

# Lint
npm run lint

# Type check
npm run type-check
```

## Running Locally
1. Install dependencies: `npm install`
2. Start development server: `npm run dev -- --port 3001`
3. Open browser to: `http://localhost:3001`

## Project Structure
```
src/
├── app/
│   ├── blog/[slug]/          # Individual blog posts
│   ├── about/                # About page
│   ├── newsletter/           # Newsletter signup
│   └── layout.tsx           # Root layout
├── components/
│   ├── BlogPost.tsx         # Blog post component
│   ├── Comments.tsx         # Giscus comments
│   ├── Newsletter.tsx       # Newsletter signup form
│   └── Navigation.tsx       # Site navigation
├── content/posts/           # MDX blog posts
└── lib/                     # Utilities and helpers
```

## Blog Post Format
Blog posts are written in MDX format with frontmatter:

```mdx
---
title: "AI Research Title"
date: "2024-01-01"
category: "Papers" | "Tools" | "Experiments" | "Tutorials"
tags: ["ai", "research", "ml"]
description: "Brief description"
---

# Post content here
```

## Categories
- **Papers**: AI research paper analyses
- **Tools**: AI tool reviews and tutorials
- **Experiments**: Personal AI experiments
- **Tutorials**: Technical tutorials and guides

## Features Required
- [x] Next.js setup with TypeScript
- [ ] MDX configuration for blog posts
- [ ] Blog post structure and metadata
- [ ] Site layout and navigation
- [ ] Giscus comment system
- [ ] Newsletter signup component
- [ ] GitHub Actions deployment
- [ ] RSS feed generation
- [ ] Search functionality
- [ ] SEO optimization

## Deployment
- Static export to GitHub Pages
- Automated deployment via GitHub Actions
- Custom domain support ready

## Content Guidelines
- Daily AI research posts
- Technical accuracy required
- Code examples with syntax highlighting
- Math equations supported via KaTeX
- Images and diagrams in `/public/images/`
- 请stop server，然后启动在3000端口，后面如果3000端口被占用的话先stop掉。

---

## 📝 MD 文件转博客文章发布流程

### 快速发布模板（适用于标准 .md 文件）

当给定一个 .md 文件需要发布到博客时，按以下步骤操作：

#### 1. 文件准备和读取
```bash
# 读取源文件内容
Read file_path="E:\workspace\social_media_work\writing_assistant\articles\[目录名]\[文件名].md"
```

#### 2. 创建博客 MDX 文件
在 `src/content/posts/` 目录下创建新的 .mdx 文件：
```bash
# 文件命名规则：使用英文 kebab-case
Write file_path="E:\workspace\social_media_work\ailatentspace_blogs\src\content\posts\[article-slug].mdx"
```

#### 3. Frontmatter 模板
```yaml
---
title: "文章标题"
date: "2025-01-09"
category: "Papers" | "Tools" | "Experiments" | "Tutorials"
tags: ["tag1", "tag2", "tag3"]
description: "文章简介"
author: "作者名"
readTime: "阅读时间 X 分钟"
series: "系列名称（可选）"
part: 1  # 系列第几部分（可选）
---
```

#### 4. 内容处理

##### 数学公式支持
- 块级公式：`$$公式$$`
- 行内公式：`$公式$`
- 使用 KaTeX 自动渲染

##### 图片处理
- 本地图片：`![alt](../../path/to/image.png)`
- 动画说明格式：
```markdown
![图片描述](../../path/to/image.gif)

> **动画说明**: 动画内容描述
```

##### 引用文献
- 格式：`[1]`, `[2]`, `[3]`
- 自动链接到参考文献列表

#### 5. 图片文件复制（如有）
```bash
# 复制图片文件到 public/images/ 目录
# Excalidraw 输出
Copy from: "../../excalidraw-generator-output/"
To: "public/images/excalidraw-generator-output/"

# Manim 动画输出
Copy from: "../../manim-animator-output/"
To: "public/images/manim-animator-output/"
```

#### 6. 参考文献（可选）
如有参考文献，在文章末尾添加：
```markdown
## 参考文献

[1] 作者. "标题". 来源, 年份. [链接](URL)
[2] 作者. "标题". 来源, 年份. [链接](URL)
```

#### 7. 服务器管理
```bash
# 停止现有服务器
KillShell [shell_id]

# 检查端口占用
netstat -ano | findstr :3000

# 终止占用进程
taskkill //F //PID [进程ID]

# 启动服务器
cd "E:\workspace\social_media_work\ailatentspace_blogs" && npm run dev -- --port 3000
```

#### 8. 访问和验证
- 本地访问：http://localhost:3000/blog/[article-slug]
- 检查数学公式渲染
- 检查图片显示
- 检查引用链接

### 🔄 完整示例流程

以神经网络文章为例：

1. **读取源文件**
   - `E:\workspace\social_media_work\writing_assistant\articles\11_神经网络基础原理与核心概念深度解析\12_最终成稿.md`

2. **创建博客文件**
   - `E:\workspace\social_media_work\ailatentspace_blogs\src\content\posts\neural-networks-fundamentals.mdx`

3. **复制图片资源**
   - SVG 文件 → `public/images/excalidraw-generator-output/`
   - GIF 文件 → `public/images/manim-animator-output/`

4. **添加图片引用**
   - 在文章中添加 `![描述](../../path/to/image)` 格式的图片引用

5. **启动服务器**
   - 杀死占用 3000 端口的进程
   - 运行 `npm run dev -- --port 3000`

6. **验证发布**
   - 访问 http://localhost:3000/blog/neural-networks-fundamentals
   - 检查所有功能正常

### ⚠️ 常见问题解决

1. **端口占用**
   ```bash
   netstat -ano | findstr :3000
   taskkill //F //PID [PID]
   ```

2. **编译错误**
   - 检查 MDX 语法
   - 验证图片路径
   - 确认 frontmatter 格式

3. **图片不显示**
   - 确认图片已复制到 `public/images/`
   - 检查路径转换是否正确
   - 验证文件名拼写

4. **引用链接失效**
   - 确认引用编号格式 `[数字]`
   - 检查参考文献列表存在

### 🎯 组件说明

#### CitationRenderer 组件特性：
- ✅ 数学公式渲染 (KaTeX)
- ✅ 图片和动画支持
- ✅ 43个内置学术引用
- ✅ 可折叠参考文献列表
- ✅ 响应式设计
- ✅ 引用链接跳转

#### 文件路径转换：
- `../../excalidraw-generator-output/` → `/images/excalidraw-generator-output/`
- `../../manim-animator-output/` → `/images/manim-animator-output/`