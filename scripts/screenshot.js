const fs = require('fs')
const path = require('path')
const playwright = require('playwright')

;(async () => {
  const url = process.argv[2] || 'http://localhost:3001/docs/study-notes/programming-languages/Javascript/Javascript_Intro'
  const outDir = path.join(__dirname, '..', 'screenshots')
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

  // Launch Chromium
  const browser = await playwright.chromium.launch({ args: ['--disable-gpu'] })
  try {
    const contextDesktop = await browser.newContext({ viewport: { width: 1280, height: 800 } })
    const pageDesktop = await contextDesktop.newPage()
    await pageDesktop.goto(url, { waitUntil: 'networkidle' })
    await pageDesktop.waitForTimeout(1000)
    await pageDesktop.screenshot({ path: path.join(outDir, 'desktop.png') })
    await contextDesktop.close()

    // Mobile-like capture (412x914)
    const contextMobile = await browser.newContext({
      viewport: { width: 412, height: 914 },
      userAgent: 'Mozilla/5.0 (Linux; Android 11; SM-A515F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Mobile Safari/537.36',
    })
    const pageMobile = await contextMobile.newPage()
    await pageMobile.goto(url, { waitUntil: 'networkidle' })
    await pageMobile.waitForTimeout(1000)
    await pageMobile.screenshot({ path: path.join(outDir, 'mobile.png') })
    await contextMobile.close()

    console.log('Screenshots saved to', outDir)
  } catch (err) {
    console.error('Screenshot script error:', err)
    process.exitCode = 2
  } finally {
    await browser.close()
  }
})()
