/**
 * 一鍵建置 exe：自舉 _electron_stage → vite build → 同步 dist → 複製 Electron runtime 並注入 app → 產出 exe。
 * 用法：npm run build:exe
 * 產出：../凡人修仙編年史-win32-x64/凡人修仙編年史.exe
 * 注意：打包前請關閉執行中的 exe（檔案鎖會使覆寫失敗）。
 *
 * 設計重點：
 *  - _electron_stage 的主行程樣板（main.js / package.json）由「受版控的」scripts/electron-host/ 自舉，
 *    乾淨 clone 不再因 _electron_stage 被 .gitignore 而缺主行程，導致打包出空殼。
 *  - 採「複製 Electron runtime + 注入 resources/app」的決定性封裝，取代 electron-packager 的非同步流程，
 *    確保不同環境都能穩定產出（先前 electron-packager 在本機曾靜默無輸出）。
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const root = __dirname;
const stage = path.join(root, '_electron_stage');
const APP_NAME = '凡人修仙編年史';

// 手動遞迴複製（fs.cpSync 在此環境曾異常崩潰；自行遞迴較穩）
function copyDir(srcDir, dstDir) {
  fs.mkdirSync(dstDir, { recursive: true });
  for (const ent of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const s = path.join(srcDir, ent.name);
    const d = path.join(dstDir, ent.name);
    if (ent.isDirectory()) copyDir(s, d);
    else fs.copyFileSync(s, d);
  }
}

// [0] 自舉 _electron_stage 主行程樣板（來源＝受版控的 scripts/electron-host/）
function ensureStageScaffold() {
  fs.mkdirSync(stage, { recursive: true });
  const hostDir = path.join(root, 'scripts', 'electron-host');
  fs.copyFileSync(path.join(hostDir, 'main.js'), path.join(stage, 'main.js'));
  const version = require('./package.json').version || '0.0.0';
  const tmpl = fs.readFileSync(path.join(hostDir, 'package.json.tmpl'), 'utf8');
  fs.writeFileSync(path.join(stage, 'package.json'), tmpl.replace('__VERSION__', version));
}

// [0b] 確保 Electron 執行檔存在；缺失則嘗試 install.js（網路受限時拋出清楚提示）
function ensureElectronBinary() {
  const distDir = path.join(root, 'node_modules', 'electron', 'dist');
  const exe = path.join(distDir, process.platform === 'win32' ? 'electron.exe' : 'electron');
  if (fs.existsSync(exe)) return distDir;
  console.log('  未偵測到 Electron 執行檔，嘗試執行 electron/install.js 下載…');
  try {
    execSync('node install.js', { cwd: path.join(root, 'node_modules', 'electron'), stdio: 'inherit' });
  } catch (e) {
    /* 容後統一判斷 */
  }
  if (!fs.existsSync(exe)) {
    throw new Error(
      '找不到 Electron 執行檔（node_modules/electron/dist）。請在可連網環境執行 `node node_modules/electron/install.js`，' +
        '或手動將對應版本的 electron zip 解壓到該資料夾後重跑。'
    );
  }
  return distDir;
}

// 穩健刪除：OneDrive/防毒掃描常造成短暫 EPERM/EBUSY 鎖，採內建重試。
function rmDirRobust(dir) {
  if (!fs.existsSync(dir)) return;
  fs.rmSync(dir, { recursive: true, force: true, maxRetries: 12, retryDelay: 500 });
}

// [3] 決定性封裝：複製 runtime → 注入 resources/app → 移除預設 app → 改名主程式
function packApp(distDir) {
  const out = path.join(root, '..', `${APP_NAME}-win32-x64`);
  rmDirRobust(out);
  fs.mkdirSync(out, { recursive: true });
  copyDir(distDir, out);

  const appDir = path.join(out, 'resources', 'app');
  fs.mkdirSync(appDir, { recursive: true });
  fs.copyFileSync(path.join(stage, 'main.js'), path.join(appDir, 'main.js'));
  fs.copyFileSync(path.join(stage, 'package.json'), path.join(appDir, 'package.json'));
  copyDir(path.join(stage, 'dist'), path.join(appDir, 'dist'));

  const defApp = path.join(out, 'resources', 'default_app.asar');
  if (fs.existsSync(defApp)) fs.rmSync(defApp, { force: true });

  const srcExe = path.join(out, 'electron.exe');
  const dstExe = path.join(out, `${APP_NAME}.exe`);
  if (fs.existsSync(srcExe)) fs.renameSync(srcExe, dstExe);
  if (!fs.existsSync(dstExe)) throw new Error('封裝後找不到主程式 exe，封裝可能未完成。');
  return dstExe;
}

console.log('[0/3] 自舉 _electron_stage 主行程樣板（main.js / package.json）');
ensureStageScaffold();
const electronDist = ensureElectronBinary();

// 關鍵：Electron 以 file:// 載入，須用相對路徑 base='./'（web/vercel 仍用 '/'，故只在此處覆寫，不動 vite.config）。
console.log('[1/3] vite build --base=./（最新原始碼 → dist；相對路徑供 Electron file:// 載入）');
execSync(process.platform === 'win32' ? 'npm.cmd run build -- --base=./' : 'npm run build -- --base=./', { cwd: root, stdio: 'inherit' });

console.log('[2/3] 同步 dist → _electron_stage/dist');
const stageDist = path.join(stage, 'dist');
rmDirRobust(stageDist);
copyDir(path.join(root, 'dist'), stageDist);

console.log('[3/3] 複製 Electron runtime 並注入 app → 產出 exe');
try {
  const exe = packApp(electronDist);
  console.log('✔ EXE 已更新：', String(exe));
} catch (e) {
  console.error('✗ EXE 打包失敗：', e && e.message ? e.message : String(e), '\n（若為檔案鎖，請先關閉執行中的 exe 再重跑）');
  process.exit(1);
}
