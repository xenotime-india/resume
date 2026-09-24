// Renders public/og.png (1200x630) for Open Graph / Twitter previews.
import puppeteer from 'puppeteer'
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400..800&family=Instrument+Sans:wght@400;600&display=swap" rel="stylesheet">
<style>
  html,body{margin:0;width:1200px;height:630px;background:#14171C;color:#fff;font-family:'Instrument Sans',system-ui,sans-serif}
  .wrap{position:relative;height:630px;padding:72px 80px;box-sizing:border-box;display:flex;flex-direction:column;justify-content:space-between}
  .eyebrow{display:inline-flex;align-items:center;gap:12px;font-size:22px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#9AA3B0}
  .eyebrow::before{content:'';width:12px;height:12px;border-radius:50%;background:#2FB56A}
  .name{font-family:'Bricolage Grotesque',sans-serif;font-variation-settings:'opsz' 96,'wdth' 94;font-weight:800;font-size:112px;letter-spacing:-.035em;line-height:.95;margin-top:28px}
  .role{font-size:40px;font-weight:600;margin-top:22px;color:#E6E9EE}
  .tags{display:flex;gap:14px;flex-wrap:wrap;margin-top:26px}
  .tags span{font-size:22px;font-weight:600;padding:8px 16px;border:1.5px solid #3A4250;border-radius:999px;color:#C9D0DA}
  .foot{display:flex;justify-content:space-between;align-items:flex-end;font-size:24px;color:#9AA3B0}
  .foot b{color:#fff;font-weight:600}
  .rule{position:absolute;left:80px;right:80px;top:56px;height:3px;background:#0B5CAD}
</style></head><body><div class="wrap"><div class="rule"></div>
<div>
  <div class="eyebrow">Available for new engagements · remote</div>
  <div class="name">Sandeep Kumar</div>
  <div class="role">Salesforce &amp; Heroku Architect · Co-founder, CloudAlgo</div>
  <div class="tags"><span>Salesforce</span><span>Heroku</span><span>MuleSoft</span><span>Airflow</span><span>AWS</span><span>Node.js · React</span></div>
</div>
<div class="foot"><div><b>16+ years</b> · <b>70+ projects</b> · <b>8</b> Salesforce certifications</div><div>xenotime-india.github.io</div></div>
</div></body></html>`

const browser = await puppeteer.launch({ headless: true })
const page = await browser.newPage()
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 })
await page.setContent(html, { waitUntil: 'networkidle0' })
await page.evaluate(() => document.fonts.ready)
const out = resolve('public/og.png')
writeFileSync(out, await page.screenshot({ type: 'png' }))
await browser.close()
console.log('✓ OG image generated:', out)
