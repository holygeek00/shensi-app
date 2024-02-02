import fs from 'fs'
import path from 'path'

// 获取所有页面
const pages = fs.readdirSync(path.join(process.cwd(), 'pages'))

// 创建站点地图
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages.map((page) => {
  // 忽略下划线开头的页面（例如，_app.js）
  if (page.startsWith('_')) {
    return ''
  }

  // 移除扩展名
  const pageName = page.replace(/\.[^.]+$/, '')

  // 生成站点地图条目
  return `<url>
      <loc>https://ai.shensi.co/${pageName}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>0.8</priority>
    </url>`
}).join('\n')}
</urlset>`

// 将站点地图写入文件
fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap)