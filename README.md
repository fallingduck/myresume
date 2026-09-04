# 在线简历生成器

基于 [visiky/resume](https://github.com/visiky/resume) 的二次开发。Vite + React 18 + Tailwind + shadcn。一期只内置 Template3，界面中文。

在线编辑、本地缓存、JSON 导入导出、打印 PDF。也可从 GitHub 同名仓库或任意 raw JSON 拉取简历。

## 本地开发

```bash
pnpm install
pnpm dev
```

- 开发：<http://localhost:5173/?mode=edit>
- 测试：`pnpm test`
- 构建：`pnpm build`

部署走 [Vercel](https://vercel.com)。连这个仓库后会按 `vercel.json` 把所有路径回退到 `index.html`。

## 查询参数

| 参数 | 说明 | 默认 |
| --- | --- | --- |
| `user` | GitHub 用户名，拉取 `github.com/{user}/{user}/resume.json` | 无则用默认简历 / 本地缓存 |
| `branch` | 仓库分支 | `master` |
| `url` | 任意 CORS 开放的 raw JSON（gist / raw.githubusercontent.com） | 无 |
| `data` | 压缩后的分享配置（分享按钮生成） | 无 |
| `mode` | `edit` 进入编辑；省略或 `read` 为只读 | `read` |

加载顺序：`data` → `url` →（编辑模式本地缓存）→ `user` → 默认简历。

只读模式下 `user` 拉取失败会提示进入编辑。`url` 需要目标站点允许浏览器跨域，一期没有代理。

示例：

```
https://your-app.vercel.app/?mode=edit
https://your-app.vercel.app/?user=yourname
https://your-app.vercel.app/?url=https://raw.githubusercontent.com/yourname/yourname/master/resume.json
```

## 保存简历

编辑后点「保存简历」下载 JSON，放到自己的 GitHub 同名仓库根目录 `resume.json`。或点「分享」复制带 `?data=` 的链接。

## 仓库

- 本仓库：<https://github.com/fallingduck/myresume>
- 上游（已停更）：<https://github.com/visiky/resume>
