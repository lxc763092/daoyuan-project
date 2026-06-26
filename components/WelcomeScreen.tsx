import React, { useRef } from 'react';
import { Sparkles, Play, Upload } from 'lucide-react';
import { SealBadge, Wordmark } from '../fanren/ui/Brand';
import { STORAGE_KEYS } from '../constants/storageKeys';
import {
  getCurrentSlotId,
  saveToSlot,
  importSave,
  ensurePlayerStatsCompatibility,
} from '../utils/saveManagerUtils';
import { showError, showConfirm } from '../utils/toastUtils';

interface Props {
  hasSave: boolean;
  onStart: () => void;
  onContinue: () => void;
}

const WelcomeScreen: React.FC<Props> = ({ hasSave, onStart, onContinue }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

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

      onContinue();
      // 确认导入
      showConfirm(
        `确定要导入此存档吗？\n\n玩家名称: ${playerName}\n境界: ${realm}\n保存时间: ${timestamp}\n\n当前存档将被替换，页面将自动刷新。`,
        '确认导入',
        () => {
          try {
            // 先還原（或清除）凡人編年史世界時間線，避免匯入後 player↔world 失同步
            try {
              if (saveData.world && saveData.world.enabled) {
                localStorage.setItem('fanren_world_v1', JSON.stringify(saveData.world));
              } else {
                localStorage.removeItem('fanren_world_v1');
              }
            } catch {}

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

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 ink-wash z-50 overflow-y-auto touch-manipulation">
      {/* 主要内容区域 */}
      <div className="relative z-10 flex min-h-full flex-col items-center justify-center w-full p-3 sm:p-4 md:p-6 lg:p-8">
        {/* 朱砂印章 */}
        <div className="mb-5 sm:mb-7 md:mb-9 animate-fade-in">
          <SealBadge size={196} className="scale-[0.68] sm:scale-90 md:scale-100" />
        </div>

        {/* 游戏标题 */}
        <div
          className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 px-4 animate-fade-in"
          style={{ animationDelay: '0.2s' }}
        >
          <Wordmark
            titleClassName="text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            sub={false}
          />
          <p className="mt-3 sm:mt-4 text-[#9bbcad] text-sm sm:text-base md:text-lg lg:text-xl font-light tracking-[0.3em] px-2">
            一介凡人 · 問鼎長生
          </p>
        </div>

        {/* 游戏按钮 */}
        <div
          className="animate-fade-in flex flex-col gap-2 sm:gap-3 md:gap-4 w-full max-w-xs sm:max-w-sm md:max-w-md px-4 sm:px-0"
          style={{ animationDelay: '0.4s' }}
        >
          {/* 隐藏的文件输入 */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,.txt"
            onChange={handleImportSave}
            className="hidden"
          />

          {hasSave ? (
            // 有存档：显示继续游戏和新游戏按钮
            <>
              <button
                onClick={onContinue}
                className="group relative px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-3.5 md:py-4 lg:py-5 bg-gradient-to-r from-[#5aa085] to-[#2f6b57] text-[#0b1410] font-bold text-sm sm:text-base md:text-lg lg:text-xl rounded-lg transition-all duration-300 shadow-lg shadow-emerald-950/40 hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2 sm:gap-3 min-h-[50px] sm:min-h-[55px] md:min-h-[60px] lg:min-h-[70px] touch-manipulation overflow-hidden"
              >
                {/* 按钮光效 */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                <Play
                  size={20}
                  className="sm:w-6 sm:h-6 md:w-7 md:h-7 relative z-10 flex-shrink-0"
                />
                <span className="relative z-10 whitespace-nowrap">
                  繼續修行
                </span>
              </button>
              <button
                onClick={onStart}
                className="group relative px-4 sm:px-6 md:px-8 lg:px-12 py-2.5 sm:py-3 md:py-4 lg:py-5 bg-gradient-to-r from-zinc-700 to-zinc-800 text-zinc-200 font-bold text-xs sm:text-sm md:text-base lg:text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2 sm:gap-3 min-h-[45px] sm:min-h-[50px] md:min-h-[55px] lg:min-h-[60px] touch-manipulation overflow-hidden border border-[#3f5a50]"
              >
                {/* 按钮光效 */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                <Sparkles
                  size={18}
                  className="sm:w-5 sm:h-5 md:w-6 md:h-6 relative z-10 flex-shrink-0"
                />
                <span className="relative z-10 whitespace-nowrap">新遊戲</span>
              </button>
              <button
                onClick={handleImportClick}
                className="group relative px-4 sm:px-6 md:px-8 lg:px-12 py-2.5 sm:py-3 md:py-4 lg:py-5 bg-gradient-to-r from-zinc-800 to-zinc-900 text-zinc-300 font-bold text-xs sm:text-sm md:text-base lg:text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2 sm:gap-3 min-h-[45px] sm:min-h-[50px] md:min-h-[55px] lg:min-h-[60px] touch-manipulation overflow-hidden border border-[#3f5a50]"
              >
                {/* 按钮光效 */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                <Upload
                  size={18}
                  className="sm:w-5 sm:h-5 md:w-6 md:h-6 relative z-10 flex-shrink-0"
                />
                <span className="relative z-10 whitespace-nowrap">匯入存檔</span>
              </button>
            </>
          ) : (
            // 没有存档：显示开始游戏和导入存档按钮
            <>
              <button
                onClick={onStart}
                className="group relative px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-3.5 md:py-4 lg:py-5 bg-gradient-to-r from-[#5aa085] to-[#2f6b57] text-[#0b1410] font-bold text-sm sm:text-base md:text-lg lg:text-xl rounded-lg transition-all duration-300 shadow-lg shadow-emerald-950/40 hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2 sm:gap-3 min-h-[50px] sm:min-h-[55px] md:min-h-[60px] lg:min-h-[70px] touch-manipulation overflow-hidden"
              >
                {/* 按钮光效 */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                <Sparkles
                  size={20}
                  className="sm:w-6 sm:h-6 md:w-7 md:h-7 relative z-10 flex-shrink-0"
                />
                <span className="relative z-10 whitespace-nowrap">開始修仙</span>
              </button>
              <button
                onClick={handleImportClick}
                className="group relative px-4 sm:px-6 md:px-8 lg:px-12 py-2.5 sm:py-3 md:py-4 lg:py-5 bg-gradient-to-r from-zinc-800 to-zinc-900 text-zinc-300 font-bold text-xs sm:text-sm md:text-base lg:text-lg rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 flex items-center justify-center gap-2 sm:gap-3 min-h-[45px] sm:min-h-[50px] md:min-h-[55px] lg:min-h-[60px] touch-manipulation overflow-hidden border border-[#3f5a50]"
              >
                {/* 按钮光效 */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                <Upload
                  size={18}
                  className="sm:w-5 sm:h-5 md:w-6 md:h-6 relative z-10 flex-shrink-0"
                />
                <span className="relative z-10 whitespace-nowrap">匯入存檔</span>
              </button>
            </>
          )}
        </div>

        {/* 原作致謝（起始頁註明） */}
        <p
          className="animate-fade-in mt-8 sm:mt-10 max-w-md px-4 text-center text-[10px] sm:text-[11px] leading-relaxed text-[#6b8a7c]/70"
          style={{ animationDelay: '0.6s' }}
        >
          本作改編自開源文字修仙遊戲《雲靈修仙》（JeasonLoop/react-xiuxian-game），沿用其遊戲引擎；
          <br className="hidden sm:block" />
          世界觀與劇情皆重構自《凡人修仙傳》。謹此致謝原作者。
        </p>
      </div>
    </div>
  );
};

export default WelcomeScreen;
