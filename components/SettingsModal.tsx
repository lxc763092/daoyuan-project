import React, { useRef, useState } from 'react';
import {
  Volume2,
  Music,
  Save,
  Globe,
  Upload,
  Download,
  Github,
  RotateCcw,
  FolderOpen,
  Keyboard,
} from 'lucide-react';
import { Modal } from './common';
import { GameSettings } from '../types';
import { readLang, writeLang, LangMode } from '../fanren/i18n/hanConvert';
import dayjs from 'dayjs';
import { showError, showSuccess, showInfo, showConfirm } from '../utils/toastUtils';
import { STORAGE_KEYS } from '../constants/storageKeys';
import {
  getCurrentSlotId,
  saveToSlot,
  loadFromSlot,
  exportSave,
  importSave,
  ensurePlayerStatsCompatibility,
} from '../utils/saveManagerUtils';
import ChangelogModal from './ChangelogModal';
import ShortcutsModal from './ShortcutsModal';
import { KeyboardShortcut } from '../hooks/useKeyboardShortcuts';
import { KeyboardShortcutConfig } from '../types';
import {
  DEFAULT_SHORTCUTS,
  SHORTCUT_DESCRIPTIONS,
  getShortcutConfig,
  configToShortcut,
} from '../utils/shortcutUtils';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  settings: GameSettings;
  onUpdateSettings: (settings: Partial<GameSettings>) => void;
  onImportSave?: () => void;
  onRestartGame?: () => void;
  onOpenSaveManager?: () => void;
}

const SettingsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  settings,
  onUpdateSettings,
  onRestartGame,
  onOpenSaveManager,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isChangelogOpen, setIsChangelogOpen] = useState(false);
  const [isShortcutsOpen, setIsShortcutsOpen] = useState(false);

  // 生成快捷键列表（用于显示）
  const shortcuts: KeyboardShortcut[] = Object.keys(SHORTCUT_DESCRIPTIONS).map(
    (actionId) => {
      const desc = SHORTCUT_DESCRIPTIONS[actionId];
      const config = getShortcutConfig(
        actionId,
        settings.keyboardShortcuts
      );
      return configToShortcut(
        config,
        () => {}, // 空操作，仅用于显示
        desc.description,
        desc.category
      );
    }
  );

  // 处理快捷键更新
  const handleUpdateShortcuts = (newShortcuts: Record<string, KeyboardShortcutConfig>) => {
    onUpdateSettings({ keyboardShortcuts: newShortcuts });
  };

  // Modal 组件内部处理 isOpen，这里不需要提前返回

  const handleImportSave = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 支持 .json 和 .txt 文件
    const fileName = file.name.toLowerCase();
    if (!fileName.endsWith('.json') && !fileName.endsWith('.txt')) {
      showError('请选择 .json 或 .txt 格式的存档文件！');
      return;
    }

    try {
      const text = await file.text();
      // 使用 importSave 函数处理存档（支持 Base64 编码）
      const saveData = importSave(text);

      if (!saveData) {
        showError('存档文件格式错误！请确保文件内容是有效的JSON格式。');
        return;
      }

      // 显示存档信息预览
      const playerName = saveData.player.name || '未知';
      const realm = saveData.player.realm || '未知';
      const timestamp = saveData.timestamp
        ? new Date(saveData.timestamp).toLocaleString('zh-CN')
        : '未知';

      // 确认导入
      showConfirm(
        `确定要导入此存档吗？\n\n玩家名称: ${playerName}\n境界: ${realm}\n保存时间: ${timestamp}\n\n当前存档将被替换，页面将自动刷新。`,
        '确认导入',
        () => {
          try {
            // 获取当前存档槽位ID，如果没有则使用槽位1
            const currentSlotId = getCurrentSlotId();

            // 使用新的存档系统保存到当前槽位
            const success = saveToSlot(
              currentSlotId,
              ensurePlayerStatsCompatibility(saveData.player),
              saveData.logs
            );

            if (!success) {
              showError('保存存档失败，请重试！');
              return;
            }

            // 直接刷新页面，不需要再次确认
            // 延迟一小段时间让用户看到操作完成
            setTimeout(() => {
              window.location.reload();
            }, 100);
          } catch (error) {
            console.error('保存存档失败:', error);
            showError('保存存档失败，请重试！');
          }
        }
      );
    } catch (error) {
      console.error('导入存档失败:', error);
      showError(
        `导入存档失败！错误信息: ${error instanceof Error ? error.message : '未知错误'}，请检查文件格式是否正确。`
      );
    }

    // 清空文件输入，以便可以重复选择同一文件
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleExportSave = () => {
    try {
      // 获取当前存档槽位ID
      const currentSlotId = getCurrentSlotId();

      // 从当前槽位加载存档
      const saveData = loadFromSlot(currentSlotId);

      if (!saveData) {
        showError('没有找到存档数据！请先开始游戏。');
        return;
      }

      // 使用 exportSave 函数导出（支持 Base64 编码）
      const jsonString = exportSave(saveData);

      // 创建文件名
      const playerName = saveData.player?.name || 'player';
      const fileName = `xiuxian-save-${playerName}-${dayjs().format('YYYY-MM-DD HH:mm:ss')}.json`;

      // 创建下载链接
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // 显示成功提示
      showSuccess('存档导出成功！');
    } catch (error) {
      console.error('导出存档失败:', error);
      showError(
        `导出存档失败！错误信息: ${error instanceof Error ? error.message : '未知错误'}`
      );
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="设置"
        size="md"
        height="lg"
      >
        <div className="space-y-6">
          {/* 音效设置 */}
          {/* <div>
            <div className="flex items-center gap-2 mb-3">
              <Volume2 size={20} className="text-stone-400" />
              <h3 className="font-bold">音效</h3>
            </div>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-stone-300">启用音效</span>
                <input
                  type="checkbox"
                  checked={settings.soundEnabled}
                  onChange={(e) =>
                    onUpdateSettings({ soundEnabled: e.target.checked })
                  }
                  className="w-5 h-5"
                />
              </label>
              {settings.soundEnabled && (
                <div>
                  <label className="block text-sm text-stone-400 mb-2">
                    音效音量: {settings.soundVolume}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={settings.soundVolume}
                    onChange={(e) =>
                      onUpdateSettings({
                        soundVolume: parseInt(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                </div>
              )}
            </div>
          </div> */}

          {/* 音乐设置 */}
          {/* <div>
            <div className="flex items-center gap-2 mb-3">
              <Music size={20} className="text-stone-400" />
              <h3 className="font-bold">音乐</h3>
            </div>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-stone-300">启用音乐</span>
                <input
                  type="checkbox"
                  checked={settings.musicEnabled}
                  onChange={(e) =>
                    onUpdateSettings({ musicEnabled: e.target.checked })
                  }
                  className="w-5 h-5"
                />
              </label>
              {settings.musicEnabled && (
                <div>
                  <label className="block text-sm text-stone-400 mb-2">
                    音乐音量: {settings.musicVolume}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={settings.musicVolume}
                    onChange={(e) =>
                      onUpdateSettings({
                        musicVolume: parseInt(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                </div>
              )}
            </div>
          </div> */}

          {/* 游戏设置 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Save size={20} className="text-stone-400" />
              <h3 className="font-bold">游戏</h3>
            </div>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-stone-300">自动保存</span>
                <input
                  type="checkbox"
                  checked={settings.autoSave}
                  onChange={(e) =>
                    onUpdateSettings({ autoSave: e.target.checked })
                  }
                  className="w-5 h-5"
                />
              </label>
              <div>
                <label className="block text-sm text-stone-400 mb-2">
                  动画速度
                </label>
                <select
                  value={settings.animationSpeed}
                  onChange={(e) =>
                    onUpdateSettings({
                      animationSpeed: e.target.value as GameSettings['animationSpeed']
                    })
                  }
                  className="w-full bg-stone-900 border border-stone-700 rounded px-3 py-2 text-stone-200"
                >
                  <option value="slow">慢</option>
                  <option value="normal">正常</option>
                  <option value="fast">快</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-stone-400 mb-2">
                  生死規則
                </label>
                <div className="w-full bg-stone-900 border border-stone-700 rounded px-3 py-2 text-stone-200">
                  <span className="text-red-300 font-semibold">永久死亡 — 一世仙途，身死則道消</span>
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  本作主角壽元有盡、身死則終局，無復活、無轉世讀檔；唯留編年史供後人觀覽。
                </p>
              </div>
            </div>
          </div>

          {/* 存档管理 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Save size={20} className="text-stone-400" />
              <h3 className="font-bold">存档管理</h3>
            </div>
            <div className="space-y-3">
              {onOpenSaveManager && (
                <div>
                  <label className="block text-sm text-stone-400 mb-2">
                    多存档槽位管理
                  </label>
                  <button
                    onClick={() => {
                      onOpenSaveManager();
                      onClose();
                    }}
                    className="w-full bg-mystic-gold hover:bg-yellow-600 text-stone-900 border border-yellow-500 rounded px-4 py-2 flex items-center justify-center transition-colors font-semibold"
                  >
                    <FolderOpen size={16} className="mr-2" />
                    打开存档管理器
                  </button>
                  <p className="text-xs text-stone-500 mt-2">
                    管理多个存档槽位、备份和对比存档
                  </p>
                </div>
              )}
              <div>
                <label className="block text-sm text-stone-400 mb-2">
                  导出存档
                </label>
                <button
                  onClick={handleExportSave}
                  className="w-full bg-stone-700 hover:bg-stone-600 text-stone-200 border border-stone-600 rounded px-4 py-2 flex items-center justify-center transition-colors"
                >
                  <Download size={16} className="mr-2" />
                  导出当前存档 (.json)
                </button>
                <p className="text-xs text-stone-500 mt-2">
                  将当前存档导出为 JSON 文件，可用于备份或分享
                </p>
              </div>
              <div>
                <label className="block text-sm text-stone-400 mb-2">
                  导入存档
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,.txt"
                  onChange={handleImportSave}
                  className="hidden"
                  id="import-save-input"
                />
                <label
                  htmlFor="import-save-input"
                  className="block w-full bg-stone-700 hover:bg-stone-600 text-stone-200 border border-stone-600 rounded px-4 py-2 text-center cursor-pointer transition-colors"
                >
                  <Upload size={16} className="inline mr-2" />
                  选择存档文件 (.json 或 .txt)
                </label>
                <p className="text-xs text-stone-500 mt-2">
                  选择 .json 或 .txt
                  格式的存档文件，导入后将替换当前存档并刷新页面
                </p>
              </div>
              {onRestartGame && (
                <div>
                  <label className="block text-sm text-stone-400 mb-2">
                    重新开始游戏
                  </label>
                  <button
                    onClick={() => {
                      showInfo('重新开始游戏将清除当前所有进度，包括：\n- 角色数据\n- 装备和物品\n- 境界和修为\n- 所有成就\n\n此操作无法撤销！', '转世重修', () => {
                        onRestartGame();
                        onClose();
                      });

                    }}
                    className="w-full bg-red-700 hover:bg-red-600 text-white border border-red-600 rounded px-4 py-2 flex items-center justify-center transition-colors font-semibold"
                  >
                    <RotateCcw size={16} className="mr-2" />
                    重新开始游戏
                  </button>
                  <p className="text-xs text-stone-500 mt-2">
                    清除所有存档数据，返回游戏开始界面。建议先导出存档备份。
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 语言设置：繁體 / 简体（顯示層由 OpenCC 統一，切換後重載套用） */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Globe size={20} className="text-stone-400" />
              <h3 className="font-bold">語言 / 语言</h3>
            </div>
            <select
              value={readLang()}
              onChange={(e) => {
                const lang = e.target.value as LangMode;
                writeLang(lang); // 寫入專屬語言鍵（與存檔 autosave 解耦）
                onUpdateSettings({ language: lang }); // 盡力同步 settings（顯示用）
                // 重載以乾淨重建畫面，再由顯示層正規化為所選字體
                setTimeout(() => window.location.reload(), 60);
              }}
              className="w-full bg-stone-900 border border-stone-700 rounded px-3 py-2 text-stone-200"
            >
              <option value="traditional">繁體中文</option>
              <option value="simplified">简体中文</option>
            </select>
            <p className="text-xs text-stone-500 mt-2">
              全遊戲文案以繁體為本；選簡體時由系統自動轉換。切換後將重新載入。
            </p>
          </div>

          {/* 快捷键 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Keyboard size={20} className="text-stone-400" />
              <h3 className="font-bold">快捷键</h3>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => setIsShortcutsOpen(true)}
                className="flex items-center gap-2 w-full bg-stone-700 hover:bg-stone-600 text-stone-200 border border-stone-600 rounded px-4 py-2 transition-colors text-left"
              >
                <Keyboard size={16} />
                <span>查看键盘快捷键</span>
              </button>
              <p className="text-xs text-stone-500">
                查看所有可用的键盘快捷键，提高操作效率
              </p>
            </div>
          </div>

          {/* 关于 / 致謝原作 */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Github size={20} className="text-stone-400" />
              <h3 className="font-bold">關於</h3>
            </div>
            <div className="space-y-3">
              <div className="bg-stone-900/50 border border-stone-700 rounded px-4 py-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-stone-400">遊戲版本</span>
                  <span className="text-sm font-mono text-mystic-gold">
                    v{import.meta.env.VITE_APP_VERSION || '-'}
                  </span>
                </div>
                <div className="text-xs text-stone-500">
                  《凡人修仙編年史》— 以《凡人修仙傳》為骨架重構的文字修仙遊戲
                </div>
              </div>
              <div className="bg-stone-900/50 border border-stone-700 rounded px-4 py-3 text-xs text-stone-400 leading-relaxed">
                本作為開源文字修仙遊戲《雲靈修仙》的二次創作改版，沿用其後端遊戲引擎；
                前端、世界觀與劇情皆已依《凡人修仙傳》重構。謹此致謝原作者 JeasonLoop。
              </div>
              <a
                href="https://github.com/JeasonLoop/react-xiuxian-game"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 w-full bg-stone-700 hover:bg-stone-600 text-stone-200 border border-stone-600 rounded px-4 py-2 transition-colors"
              >
                <Github size={16} />
                <span>原作《雲靈修仙》· JeasonLoop/react-xiuxian-game</span>
                <span className="ml-auto text-xs text-stone-400">↗</span>
              </a>
              <button
                onClick={() => setIsChangelogOpen(true)}
                className="flex items-center gap-2 w-full bg-stone-700 hover:bg-stone-600 text-stone-200 border border-stone-600 rounded px-4 py-2 transition-colors text-left"
              >
                <Save size={16} />
                <span>查看更新日誌</span>
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* 更新日志弹窗 */}
      <ChangelogModal
        isOpen={isChangelogOpen}
        onClose={() => setIsChangelogOpen(false)}
      />

      {/* 快捷键说明弹窗 */}
      <ShortcutsModal
        isOpen={isShortcutsOpen}
        onClose={() => setIsShortcutsOpen(false)}
        shortcuts={shortcuts}
        customShortcuts={settings.keyboardShortcuts}
        onUpdateShortcuts={handleUpdateShortcuts}
      />
    </>
  );
};

export default SettingsModal;
