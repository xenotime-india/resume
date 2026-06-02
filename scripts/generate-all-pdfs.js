/**
 * Generates a PDF for every theme and places them all in dist/.
 *
 * Each theme is activated by passing ACTIVE_THEME as an env var to astro build —
 * no config.ts file mutations needed.
 *
 * Output:
 *   dist/resume.pdf              ← active theme (ACTIVE_THEME env var or default)
 *   dist/resume-editorial.pdf
 *   dist/resume-brutalist.pdf
 *   ... (one per theme)
 *
 * Run: node scripts/generate-all-pdfs.js
 * Run with custom active: ACTIVE_THEME=executive node scripts/generate-all-pdfs.js
 */

import { spawnSync }                              from 'node:child_process'
import { copyFileSync, mkdirSync, rmSync,
         existsSync, statSync }                  from 'node:fs'
import { resolve }                               from 'node:path'

const THEMES      = ['editorial', 'brutalist', 'luxury', 'cloudalgo', 'noir', 'blueprint', 'broadsheet', 'executive']
const activeTheme = process.env.ACTIVE_THEME ?? 'cloudalgo'
const tempDir     = resolve('./dist-pdfs-temp')

/** Spawn a command safely — args are an array, no shell interpolation. */
const run = (cmd, args, extraEnv = {}) => {
  const result = spawnSync(cmd, args, {
    stdio: 'inherit',
    env: { ...process.env, ...extraEnv },
  })
  if (result.status !== 0) throw new Error(`"${cmd} ${args.join(' ')}" exited with code ${result.status}`)
}

mkdirSync(tempDir, { recursive: true })

try {
  for (const theme of THEMES) {
    console.log(`\n${'─'.repeat(52)}`)
    console.log(`  Building theme: ${theme}`)
    console.log(`${'─'.repeat(52)}\n`)

    // Pass theme via env var — no file system mutations
    run('npm', ['run', 'build'],       { ACTIVE_THEME: theme })
    run('node', ['scripts/generate-pdf.js'])

    copyFileSync('./dist/resume.pdf', `${tempDir}/resume-${theme}.pdf`)
    console.log(`  ✓ saved resume-${theme}.pdf`)
  }

  // Final build uses the intended active theme (env var or default)
  console.log(`\n${'─'.repeat(52)}`)
  console.log(`  Final build — active theme: ${activeTheme}`)
  console.log(`${'─'.repeat(52)}\n`)

  run('npm', ['run', 'build'],       { ACTIVE_THEME: activeTheme })
  run('node', ['scripts/generate-pdf.js'])

  // Copy all theme PDFs back into dist/
  for (const theme of THEMES) {
    copyFileSync(`${tempDir}/resume-${theme}.pdf`, `./dist/resume-${theme}.pdf`)
  }

} catch (err) {
  rmSync(tempDir, { recursive: true, force: true })
  console.error('\n✗ Failed.\n', err.message)
  process.exit(1)
}

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
console.log(`   resume.pdf          →  ${mainKb} KB  (active: ${activeTheme})`)
