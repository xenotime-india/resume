/**
 * Generates dist/resume.pdf using Puppeteer (headless Chrome).
 * Run after `astro build`: node scripts/generate-pdf.js
 *
 * Uses a local HTTP server so base-path asset references (/resume/...) resolve correctly.
 */

import puppeteer from 'puppeteer'
import { createServer } from 'node:http'
import { readFileSync, existsSync } from 'node:fs'
import { resolve, extname } from 'node:path'

const distPath = resolve('./dist')

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
}

// Minimal static file server for dist/
const server = createServer((req, res) => {
  // Strip query strings and decode URI
  const urlPath = decodeURIComponent(req.url?.split('?')[0] ?? '/')

  // Map /resume/ → dist/index.html, /resume/foo.css → dist/foo.css
  const stripped = urlPath.replace(/^\/resume\/?/, '') || 'index.html'
  let filePath = resolve(distPath, stripped)

  // Directory → index.html
  if (!existsSync(filePath) || filePath.endsWith('/')) {
    filePath = resolve(distPath, stripped, 'index.html')
  }
  if (!existsSync(filePath)) {
    filePath = resolve(distPath, 'index.html')
  }

  const mime = MIME[extname(filePath)] ?? 'application/octet-stream'

  try {
    const content = readFileSync(filePath)
    res.writeHead(200, { 'Content-Type': mime })
    res.end(content)
  } catch {
    res.writeHead(404)
    res.end('Not found')
  }
})

const PORT = 4099
await new Promise(resolve => server.listen(PORT, '127.0.0.1', resolve))
console.log(`Static server running on http://localhost:${PORT}`)

const browser = await puppeteer.launch({
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

const page = await browser.newPage()
await page.setViewport({ width: 1200, height: 900 })

// Wait for fonts + animations to settle
await page.goto(`http://localhost:${PORT}/resume/`, {
  waitUntil: 'networkidle0',
  timeout: 30_000,
})

// Extra settle time for web fonts
await new Promise(r => setTimeout(r, 1500))

const pdfPath = resolve(distPath, 'resume.pdf')

await page.pdf({
  path: pdfPath,
  format: 'A4',
  printBackground: true,
  margin: { top: '12mm', bottom: '12mm', left: '14mm', right: '14mm' },
})

await browser.close()
server.close()

console.log(`✓ PDF generated: ${pdfPath}`)
