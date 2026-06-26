// 以 Electron (Chromium) 將 HTML 報告渲染為 PDF。
// 用法：npx electron html-to-pdf.cjs <input.html> <output.pdf>
const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

const input = process.argv[2];
const output = process.argv[3];
if (!input || !output) {
  console.error('用法: electron html-to-pdf.cjs <input.html> <output.pdf>');
  app.exit(1);
}

app.whenReady().then(async () => {
  const win = new BrowserWindow({ show: false, width: 1240, height: 1754, webPreferences: { offscreen: true } });
  const fileUrl = 'file://' + path.resolve(input).replace(/\\/g, '/');
  await win.loadURL(fileUrl);
  // 給字型與佈局一點時間穩定
  await new Promise((r) => setTimeout(r, 1200));
  try {
    const data = await win.webContents.printToPDF({
      pageSize: 'A4',
      printBackground: true,
      margins: { marginType: 'default' },
      preferCSSPageSize: true,
    });
    fs.writeFileSync(path.resolve(output), data);
    console.log('PDF 已輸出: ' + path.resolve(output) + ' (' + data.length + ' bytes)');
    app.exit(0);
  } catch (e) {
    console.error('printToPDF 失敗:', e);
    app.exit(1);
  }
});
