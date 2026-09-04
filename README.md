# 在线简历生成器

基于 [visiky/resume](https://github.com/visiky/resume) 的二次开发。Vite + React 18 + Tailwind + shadcn。当前版本是无需注册、无需后端的本地简历制作工具。

在线编辑、JSON 导入导出、打印 PDF。用户数据只在当前浏览器页面中处理，不上传到服务端。

## 本地开发

```bash
pnpm install
pnpm dev
```

- 开发：<http://localhost:5173/>
- 测试：`pnpm test`
- 构建：`pnpm build`

部署走 [Vercel](https://vercel.com)。连这个仓库后会按 `vercel.json` 把所有路径回退到 `index.html`。

## 查询参数

| 参数 | 说明 | 默认 |
| --- | --- | --- |
| `data` | 压缩后的分享配置（分享按钮生成） | 无 |
| `mode` | `edit` 进入编辑，`read` 为只读 | 首页为 `edit`，分享链接为 `read` |

加载顺序：`data` → 默认示例简历。

用户自己的简历请通过编辑器中的「导入配置」上传本地 JSON 文件。

示例：

```
https://your-app.vercel.app/
https://your-app.vercel.app/?mode=read
```

## 保存简历

编辑后点「导出 JSON」下载文件。下次打开时重新导入该文件。也可以点「分享链接」生成带 `?data=` 的链接；链接本身会包含简历内容，请谨慎发送。

## 仓库

- 本仓库：<https://github.com/fallingduck/myresume>
- 上游（已停更）：<https://github.com/visiky/resume>
