/**
 * Generates dist/resume.pdf using Puppeteer (headless Chrome).
 * Run after `astro build`: node scripts/generate-pdf.js
 *
 * Uses a local HTTP server so base-path asset references (/resume/...) resolve correctly.
 * Header/footer templates fill the page margin zones with the theme background colour
 * so the PDF has no white gaps between pages.
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
  const urlPath = decodeURIComponent(req.url?.split('?')[0] ?? '/')
  const stripped = urlPath.replace(/^\/resume\/?/, '') || 'index.html'
  let filePath = resolve(distPath, stripped)
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

await page.goto(`http://localhost:${PORT}/resume/`, {
  waitUntil: 'networkidle0',
  timeout: 30_000,
})

// Settle time for web fonts
await new Promise(r => setTimeout(r, 1500))

// Read the theme background colour in print mode so header/footer can match it
await page.emulateMediaType('print')
const bgColor = await page.evaluate(() => {
  const toHex = (rgb) => {
    const m = rgb.match(/(\d+)/g)
    if (!m || m.length < 3) return null
    return '#' + m.slice(0, 3).map(n => parseInt(n).toString(16).padStart(2, '0')).join('')
  }
  const isTransparent = (c) => !c || c === 'rgba(0, 0, 0, 0)' || c === 'transparent'
  const htmlBg = window.getComputedStyle(document.documentElement).backgroundColor
  const bodyBg = window.getComputedStyle(document.body).backgroundColor
  return toHex(isTransparent(htmlBg) ? bodyBg : htmlBg) ?? '#f5f5f2'
})
await page.emulateMediaType('screen')

console.log(`Theme background: ${bgColor}`)

// Margin height — must match @page margin in CSS
const MARGIN = '14mm'

// Header/footer templates fill the @page margin zones with the theme colour.
// Must include a CSS reset — Puppeteer's header/footer frame has default margins.
const bgDiv = () =>
  `<style>*,html,body{margin:0!important;padding:0!important;}</style>` +
  `<div style="width:100%;height:100%;background:${bgColor};display:block;-webkit-print-color-adjust:exact;print-color-adjust:exact;"></div>`

const pdfPath = resolve(distPath, 'resume.pdf')

await page.pdf({
  path: pdfPath,
  format: 'A4',
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: bgDiv(),
  footerTemplate: bgDiv(),
  margin: { top: MARGIN, bottom: MARGIN, left: '0', right: '0' },
})

await browser.close()
server.close()

console.log(`✓ PDF generated: ${pdfPath}`)
