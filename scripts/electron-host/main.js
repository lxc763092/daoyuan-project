// Electron 主行程樣板（受版控）：build-exe.cjs 會把本檔複製到 _electron_stage/ 作為封裝入口。
// 建立視窗並以 file:// 載入打包後的前端（dist/index.html，由 vite build --base=./ 產出）。
const { app, BrowserWindow, shell } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 900,
    minHeight: 600,
    backgroundColor: '#0c0a09',
    title: '凡人修仙編年史',
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      spellcheck: false,
    },
  });

  win.removeMenu();
  win.loadFile(path.join(__dirname, 'dist', 'index.html'));

  // 外部連結（字型 CDN、原作者倉庫）以系統瀏覽器開啟，不在遊戲視窗內導航。
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:\/\//i.test(url)) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
