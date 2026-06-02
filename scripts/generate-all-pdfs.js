/**
 * Generates a PDF for every theme and places them all in dist/.
 *
 * Output:
 *   dist/resume.pdf              ← active theme (as configured in src/config.ts)
 *   dist/resume-editorial.pdf
 *   dist/resume-brutalist.pdf
 *   dist/resume-luxury.pdf
 *   dist/resume-cloudalgo.pdf
 *
 * Run: node scripts/generate-all-pdfs.js
 */

import { spawnSync }                                              from 'node:child_process'
import { readFileSync, writeFileSync, copyFileSync,
         mkdirSync, rmSync, existsSync, statSync }               from 'node:fs'
import { resolve }                                               from 'node:path'

const THEMES         = ['editorial', 'brutalist', 'luxury', 'cloudalgo', 'noir', 'blueprint', 'broadsheet', 'executive']
const configPath     = resolve('./src/config.ts')
const originalConfig = readFileSync(configPath, 'utf8')
const tempDir        = resolve('./dist-pdfs-temp')

// Extract active theme before we start
const activeMatch    = originalConfig.match(/ACTIVE_THEME = '([^']+)'/)
const originalTheme  = activeMatch?.[1] ?? 'cloudalgo'

/** Run a command safely via spawnSync — no shell interpolation. */
const run = (cmd, args) => {
  const result = spawnSync(cmd, args, { stdio: 'inherit' })
  if (result.status !== 0) throw new Error(`"${cmd} ${args.join(' ')}" exited with code ${result.status}`)
}

const setTheme = (theme) => {
  const updated = originalConfig.replace(
    /export const ACTIVE_THEME = '[^']+' as const/,
    `export const ACTIVE_THEME = '${theme}' as const`
  )
  writeFileSync(configPath, updated)
}

const restoreConfig = () => writeFileSync(configPath, originalConfig)

// Temp dir to hold PDFs between Astro builds (Astro cleans dist/ each time)
mkdirSync(tempDir, { recursive: true })

try {
  for (const theme of THEMES) {
    console.log(`\n${'─'.repeat(52)}`)
    console.log(`  Building theme: ${theme}`)
    console.log(`${'─'.repeat(52)}\n`)

    setTheme(theme)
    run('npm', ['run', 'build'])
    run('node', ['scripts/generate-pdf.js'])

    // Move PDF to temp dir before next build wipes dist/
    copyFileSync('./dist/resume.pdf', `${tempDir}/resume-${theme}.pdf`)
    console.log(`  ✓ saved resume-${theme}.pdf`)
  }

  // Restore original theme for the final HTML build
  console.log(`\n${'─'.repeat(52)}`)
  console.log(`  Restoring active theme: ${originalTheme}`)
  console.log(`${'─'.repeat(52)}\n`)

  restoreConfig()
  run('npm', ['run', 'build'])
  run('node', ['scripts/generate-pdf.js'])

  // Copy all theme PDFs back into dist/
  for (const theme of THEMES) {
    copyFileSync(`${tempDir}/resume-${theme}.pdf`, `./dist/resume-${theme}.pdf`)
  }

} catch (err) {
  restoreConfig()
  rmSync(tempDir, { recursive: true, force: true })
  console.error('\n✗ Failed — config.ts restored.\n', err.message)
  process.exit(1)
}

// Cleanup temp dir
rmSync(tempDir, { recursive: true, force: true })

// Summary
console.log('\n✅  All PDFs in dist/:\n')
for (const theme of THEMES) {
  const p = `./dist/resume-${theme}.pdf`
  if (existsSync(p)) {
    const kb = Math.round(statSync(p).size / 1024)
    console.log(`   resume-${theme}.pdf  →  ${kb} KB`)
  }
}
const mainKb = Math.round(statSync('./dist/resume.pdf').size / 1024)
console.log(`   resume.pdf          →  ${mainKb} KB  (active: ${originalTheme})`)
