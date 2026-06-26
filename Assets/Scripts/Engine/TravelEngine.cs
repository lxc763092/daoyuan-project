using System;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;

namespace DaoyuanUnity.Engine
{
    /// <summary>
    /// 旅行與地圖引擎：路徑規劃、傳送、旅途奇遇。
    /// 映射自 fanren/engine/travel.ts + mapGate.ts + mapDiscovery.ts
    /// </summary>
    public static class TravelEngine
    {
        /// <summary>世界階層（人界、靈界、魔界、仙界）</summary>
        public enum WorldTier { Human, Spirit, Demon, Immortal }

        /// <summary>旅行模式</summary>
        public enum TravelMode { Here, Walk, Fly, Teleport, Blocked }

        public class TravelPlan
        {
            public TravelMode Mode;
            public string ToId;
            public string ToName;
            public int Days;
            public int SpiritStoneCost;
            public bool Feasible;
            public string Reason;
        }

        /// <summary>境界→旅行速度（日行距離因子）</summary>
        private static readonly Dictionary<string, float> RealmSpeedMultiplier = new Dictionary<string, float>
        {
            { "引气入体", 1f }, { "通脉开窍", 1.5f }, { "筑基凝脉", 2.5f },
            { "金丹化婴", 5f }, { "元婴出窍", 10f }, { "化神归墟", 20f },
            { "合道通玄", 40f }, { "大乘渡劫", 60f }, { "真仙归一", 100f }, { "道元无极", 150f },
        };

        /// <summary>敏捷速度加成（0-100 → 0-3x 線性）</summary>
        public static float SpeedBonusFromAgility(float agility)
        {
            return 1f + (Mathf.Clamp(agility, 0, 100) / 100f) * 2f;
        }

        /// <summary>計算兩地之間旅行的天數</summary>
        public static int CalculateTravelDays(string fromId, string toId, string realmType,
            Dictionary<string, float> regionDistances, float agility = 50f)
        {
            string key1 = $"{fromId}→{toId}";
            string key2 = $"{toId}→{fromId}";
            float baseDist = 200f; // 默認近距離

            if (regionDistances.ContainsKey(key1)) baseDist = regionDistances[key1];
            else if (regionDistances.ContainsKey(key2)) baseDist = regionDistances[key2];

            float speedMult = RealmSpeedMultiplier.ContainsKey(realmType)
                ? RealmSpeedMultiplier[realmType] : 1f;
            float agiMult = SpeedBonusFromAgility(agility);

            // 遁速越盛，日行距離越大
            float dailyDist = 50f * speedMult * agiMult;
            if (speedMult >= 10f) dailyDist *= 2f; // 元嬰以上可長程破空飛遁

            return Mathf.Max(1, Mathf.RoundToInt(baseDist / dailyDist));
        }

        /// <summary>規劃旅行方案</summary>
        public static TravelPlan PlanTravel(string fromId, string toId, string realmType,
            int spiritStones, Dictionary<string, float> regionDistances, float agility = 50f)
        {
            if (fromId == toId)
                return new TravelPlan { Mode = TravelMode.Here, Reason = "你已身在此地。" };

            // 跨大界域（人→靈、靈→魔等）不可直接飛行
            // 此處簡化：檢查是否跨 tier
            bool crossRealm = false; // 由調用方傳入跨域檢測

            if (crossRealm)
                return new TravelPlan { Mode = TravelMode.Blocked, Reason = "此去橫跨大界域，非一般遁法可達，須尋各界傳送大陣。" };

            int days = CalculateTravelDays(fromId, toId, realmType, regionDistances, agility);
            float speedMult = RealmSpeedMultiplier.ContainsKey(realmType)
                ? RealmSpeedMultiplier[realmType] : 1f;

            TravelMode mode;
            string reason = "";

            if (speedMult >= 40f)
            {
                mode = TravelMode.Fly;
                reason = $"御空飛遁，{HumanizeDays(days)}（{days}日）可至。";
            }
            else if (speedMult >= 5f)
            {
                mode = TravelMode.Fly;
                reason = $"御器飛行，{HumanizeDays(days)}（{days}日）後抵達。";
            }
            else
            {
                mode = TravelMode.Walk;
                reason = $"徒步跋涉，{HumanizeDays(days)}（{days}日）後抵達。";
            }

            return new TravelPlan
            {
                Mode = mode,
                ToId = toId,
                Days = days,
                SpiritStoneCost = 0,
                Feasible = true,
                Reason = reason,
            };
        }

        public static string HumanizeDays(int days)
        {
            if (days <= 0) return "頃刻";
            int years = days / ClockEngine.DaysPerYear;
            int months = (days % ClockEngine.DaysPerYear) / ClockEngine.DaysPerMonth;
            int remainder = days % ClockEngine.DaysPerMonth;

            List<string> parts = new List<string>();
            if (years > 0) parts.Add($"{years}年");
            if (months > 0) parts.Add($"{months}月");
            if (remainder > 0) parts.Add($"{remainder}日");

            return parts.Count > 0 ? string.Join("", parts) : "數日";
        }

        /// <summary>隨機旅途奇遇</summary>
        public class TravelEncounter
        {
            public string Text;
            public int? HpDelta;
            public int? ExpGain;
        }

        public static TravelEncounter RollTravelEncounter(string tier, float realmScale,
            int travelDays, float luck, System.Random rng = null)
        {
            rng = rng ?? new System.Random();
            float roll = (float)rng.NextDouble();

            // 運氣加權
            float luckBonus = luck > 50 ? (luck - 50) / 100f : 0f;
            roll += luckBonus * 0.15f;

            // 長途旅行 → 更高機率奇遇
            float encounterChance = Mathf.Min(0.35f, travelDays / 90f * 0.2f);

            if (roll > encounterChance && roll < 0.98f) return null;

            if (roll >= 0.98f)
            {
                // 大吉奇遇
                return new TravelEncounter
                {
                    Text = "途中你偶然捕捉到一絲天地靈機的波動，循跡而去，竟在一處荒山洞穴中發現一株千年靈藥！你小心翼翼將其採收，此物若入藥煉丹，價值非同小可。",
                    ExpGain = Mathf.RoundToInt(realmScale * 150f),
                };
            }
            else if (roll < 0.02f)
            {
                // 險遇
                return new TravelEncounter
                {
                    Text = "途經一處峽谷，忽聞腥風撲面——一頭潛伏的厲害妖獸自暗處撲出！你倉猝應敵，雖未重創，但也吃了一番苦頭。",
                    HpDelta = Mathf.RoundToInt(-realmScale * 50f),
                };
            }
            else
            {
                // 小吉小怪
                string[] encounters = new[]
                {
                    "途中你遇見一名散修在道旁擺攤，以低價淘得一張殘破的丹方殘頁。",
                    "一陣靈風拂過，你感應到不遠處有靈藥成熟的氣息。",
                    "路過一處廢棄的修士洞府，你細細搜尋，找到了幾塊殘留的靈石。",
                };
                string text = encounters[rng.Next(encounters.Length)];
                return new TravelEncounter { Text = text, ExpGain = Mathf.RoundToInt(realmScale * 30f) };
            }
        }
    }
}
