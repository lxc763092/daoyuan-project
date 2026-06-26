using System;
using UnityEngine;

namespace DaoyuanUnity.Engine
{
    /// <summary>
    /// 自適應時間系統：絕對天數 ↔ 年月日，章號↔天數對映，行動耗時尺度。
    /// 映射自 fanren/engine/clock.ts
    /// </summary>
    public static class ClockEngine
    {
        public const int DaysPerMonth = 30;
        public const int MonthsPerYear = 12;
        public const int DaysPerYear = DaysPerMonth * MonthsPerYear; // 360

        /// <summary>章號→世界紀元天數（以原著時間跨度的分段線性插值）</summary>
        private static readonly (int chapter, int year)[] ChapterAnchors = new[]
        {
            (1, 0),
            (99, 5),      // 七玄門卷末
            (270, 22),     // 黃楓谷築基
            (500, 60),     // 亂星海初臨
            (760, 160),    // 結丹後期
            (900, 230),    // 元嬰・名震天南
            (1180, 330),   // 化神・入靈界
            (1500, 520),   // 煉虛
            (1750, 760),   // 合體
            (2050, 1080),  // 大乘・魔界
            (2350, 1280),
            (2446, 1320),  // 飛升
        };

        public struct GameTime
        {
            public int TotalDays;
            public int Year;
            public int Month;
            public int Day;

            public string Format() => $"修真曆 第{Year}年 {Month}月 {Day}日";
        }

        /// <summary>由絕對天數重建年月日</summary>
        public static GameTime DayToGameTime(int totalDays)
        {
            int d = Mathf.Max(0, totalDays);
            int year = d / DaysPerYear + 1;
            int rem = d % DaysPerYear;
            int month = rem / DaysPerMonth + 1;
            int day = (rem % DaysPerMonth) + 1;
            return new GameTime { TotalDays = d, Year = year, Month = month, Day = day };
        }

        public static GameTime AdvanceTime(GameTime time, int days)
        {
            return DayToGameTime(time.TotalDays + Mathf.Max(0, Mathf.RoundToInt(days)));
        }

        public static int ChapterToDay(int chapter)
        {
            var a = ChapterAnchors;
            if (chapter <= a[0].chapter) return Mathf.RoundToInt(a[0].year * DaysPerYear);
            if (chapter >= a[a.Length - 1].chapter) return Mathf.RoundToInt(a[a.Length - 1].year * DaysPerYear);

            for (int i = 0; i < a.Length - 1; i++)
            {
                var (c0, y0) = a[i];
                var (c1, y1) = a[i + 1];
                if (chapter >= c0 && chapter <= c1)
                {
                    float t = (float)(chapter - c0) / (c1 - c0);
                    return Mathf.RoundToInt((y0 + t * (y1 - y0)) * DaysPerYear);
                }
            }
            return Mathf.RoundToInt(a[a.Length - 1].year * DaysPerYear);
        }

        /// <summary>由天數粗估對應到的「進度章號」</summary>
        public static int DayToChapter(int totalDays)
        {
            float years = (float)totalDays / DaysPerYear;
            var a = ChapterAnchors;
            if (years <= a[0].year) return a[0].chapter;
            if (years >= a[a.Length - 1].year) return a[a.Length - 1].chapter;

            for (int i = 0; i < a.Length - 1; i++)
            {
                var (c0, y0) = a[i];
                var (c1, y1) = a[i + 1];
                if (years >= y0 && years <= y1)
                {
                    float t = y1 == y0 ? 0f : (years - y0) / (y1 - y0);
                    return Mathf.RoundToInt(c0 + t * (c1 - c0));
                }
            }
            return a[a.Length - 1].chapter;
        }

        public enum TimeScale { Instant, Short, Medium, Long, Epoch }

        public static (int min, int max, string label) GetScaleRange(TimeScale scale) => scale switch
        {
            TimeScale.Instant => (0, 0, "瞬間"),
            TimeScale.Short => (1, 7, "數日"),
            TimeScale.Medium => (15, 60, "旬月"),
            TimeScale.Long => (180, 2160, "數月至數年（閉關，可被打斷）"),
            TimeScale.Epoch => (3600, 36000, "數十至數百年（長期閉關/跨歷史節點）"),
            _ => (0, 0, ""),
        };

        public static int DaysForScale(TimeScale scale, int? requestedDays = null)
        {
            var (min, max, _) = GetScaleRange(scale);
            if (requestedDays.HasValue && requestedDays.Value > 0)
                return Mathf.Clamp(requestedDays.Value, min, Mathf.Max(max, requestedDays.Value));
            return Mathf.RoundToInt((min + max) / 2f);
        }
    }
}
