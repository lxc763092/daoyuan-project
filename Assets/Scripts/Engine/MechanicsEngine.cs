using System;
using System.Collections.Generic;
using UnityEngine;

namespace DaoyuanUnity.Engine
{
    /// <summary>
    /// 演绎引擎核心：异能推导、平衡约束、触发执行。
    /// 映射自 fanren/engine/mechanics.ts (13.5KB)
    /// </summary>
    public static class MechanicsEngine
    {
        /// <summary>异能原型枚举（10种）</summary>
        public enum AbilityArchetype
        {
            Devour,      // 吞噬（forbidden，+业力）
            Cultivation, // 修炼增效
            Body,        // 护体（体魄+气血）
            Agility,     // 速度
            Combat,      // 攻击（+神識）
            Craft,       // 炼丹/炼器
            Fortune,     // 气运
            Knowledge,   // 洞察
            Drain,       // 吸取（修为）
            Vitality     // 疗伤
        }

        /// <summary>异能规格</summary>
        [System.Serializable]
        public class MechanicSpec
        {
            public AbilityArchetype archetype;
            public int tier;              // 异能等级 1-10
            public float permanentGain;   // 永久属性增益
            public float cultivationMult; // 修炼倍率
            public float expBonus;        // 经验加成
            public float combatBonus;     // 战力加成
            
            /// <summary>单次触发上限（硬约束）</summary>
            public float capPerHit;
            /// <summary>每日触发上限</summary>
            public float capPerDay;
            /// <summary>总量上限</summary>
            public float capTotal;
            /// <summary>业力累积（吞噬类）</summary>
            public float karmaCost;

            // 当日已触发量（运行时）
            public float dailyUsed;
            // 总量已使用
            public float totalUsed;
        }

        /// <summary>为异能原型生成平衡后的规格</summary>
        public static MechanicSpec BalanceSpec(AbilityArchetype archetype, int tier)
        {
            float t = Mathf.Clamp(tier, 1, 10);
            var spec = new MechanicSpec { archetype = archetype, tier = tier };

            switch (archetype)
            {
                case AbilityArchetype.Devour:
                    spec.cultivationMult = 1.0f + 0.15f * t;
                    spec.karmaCost = 1.5f * t;
                    spec.capPerHit = 50f * t;
                    spec.capPerDay = 200f * t;
                    spec.capTotal = 2000f * t;
                    break;

                case AbilityArchetype.Cultivation:
                    spec.cultivationMult = 1.0f + 0.10f * t;
                    spec.expBonus = 20f * t;
                    spec.capPerHit = 30f * t;
                    spec.capPerDay = 150f * t;
                    spec.capTotal = float.MaxValue;
                    break;

                case AbilityArchetype.Body:
                    spec.permanentGain = 4f * t;   // 体魄+4×t
                    spec.capPerHit = 25f * t;
                    spec.capPerDay = 100f * t;
                    spec.capTotal = 500f * t;
                    break;

                case AbilityArchetype.Agility:
                    spec.permanentGain = 3f * t;   // 速度+3×t
                    spec.capPerDay = 80f * t;
                    spec.capTotal = 300f * t;
                    break;

                case AbilityArchetype.Combat:
                    spec.combatBonus = 3f * t;     // 攻击+3×t
                    spec.permanentGain = 2f * t;   // 神識+2×t
                    spec.capPerDay = 120f * t;
                    spec.capTotal = 400f * t;
                    break;

                case AbilityArchetype.Craft:
                    spec.expBonus = 15f * t;        // 成丹率+8%×t
                    spec.capPerDay = 60f * t;
                    spec.capTotal = 600f * t;
                    break;

                case AbilityArchetype.Fortune:
                    spec.permanentGain = 4f * t;    // 气运+4×t
                    spec.capPerHit = 4f * t;
                    spec.capPerDay = 20f * t;
                    spec.capTotal = 200f * t;
                    break;

                case AbilityArchetype.Knowledge:
                    spec.permanentGain = 2f * t;    // 神識+2×t
                    spec.capPerDay = 50f * t;
                    spec.capTotal = 500f * t;
                    break;

                case AbilityArchetype.Drain:
                    spec.expBonus = 40f * t;        // 修为+40×t
                    spec.karmaCost = 1.0f * t;      // 吸取产生业力
                    spec.capPerHit = 40f * t;
                    spec.capPerDay = 160f * t;
                    spec.capTotal = 800f * t;
                    break;

                case AbilityArchetype.Vitality:
                    spec.permanentGain = 2f * t;    // 回血2%×t/回合
                    spec.capPerDay = 30f * t;
                    spec.capTotal = 300f * t;
                    break;
            }

            return spec;
        }

        /// <summary>触发异能（含边际递减与上限约束）</summary>
        /// <returns>实际应用的效果值</returns>
        public static float ApplyTrigger(MechanicSpec spec, GameState state)
        {
            // 检查总量上限
            if (spec.totalUsed >= spec.capTotal && spec.capTotal > 0)
                return 0f;

            // 检查每日上限
            if (spec.dailyUsed >= spec.capPerDay)
                return 0f;

            // 边际递减：已使用越多，每次获得越少
            float diminishingFactor = 1f - (spec.totalUsed / (spec.capTotal > 0 ? spec.capTotal : 1f));
            diminishingFactor = Mathf.Clamp(diminishingFactor, 0.1f, 1f);

            // 计算本次获得（不超过单次上限和每日剩余）
            float rawGain = spec.capPerHit * diminishingFactor;
            float dailyRemaining = spec.capPerDay - spec.dailyUsed;
            float totalRemaining = spec.capTotal - spec.totalUsed;
            float actualGain = Mathf.Min(rawGain, dailyRemaining, totalRemaining);

            // 更新计数器
            spec.dailyUsed += actualGain;
            spec.totalUsed += actualGain;

            // 应用业力惩罚
            if (spec.karmaCost > 0 && state.player != null)
            {
                state.player.karma += spec.karmaCost;
            }

            return actualGain;
        }

        /// <summary>每日重置（新的一天清零dailyUsed）</summary>
        public static void ResetDaily(MechanicSpec spec)
        {
            spec.dailyUsed = 0f;
        }

        /// <summary>从自由文本演绎异能（简化版，完整映射需NLP/AI推断）</summary>
        public static AbilityArchetype? DeduceFromText(string playerIntent)
        {
            if (string.IsNullOrEmpty(playerIntent)) return null;

            string lower = playerIntent.ToLower();
            
            if (lower.Contains("吞噬") || lower.Contains("吞食")) return AbilityArchetype.Devour;
            if (lower.Contains("修炼") || lower.Contains("练功")) return AbilityArchetype.Cultivation;
            if (lower.Contains("炼体") || lower.Contains("护体")) return AbilityArchetype.Body;
            if (lower.Contains("遁") || lower.Contains("闪避")) return AbilityArchetype.Agility;
            if (lower.Contains("攻") || lower.Contains("杀") || lower.Contains("斩")) return AbilityArchetype.Combat;
            if (lower.Contains("炼") || lower.Contains("打造")) return AbilityArchetype.Craft;
            if (lower.Contains("幸运") || lower.Contains("机缘")) return AbilityArchetype.Fortune;
            if (lower.Contains("洞察") || lower.Contains("观察")) return AbilityArchetype.Knowledge;
            if (lower.Contains("吸取") || lower.Contains("掠夺")) return AbilityArchetype.Drain;
            if (lower.Contains("疗") || lower.Contains("恢复")) return AbilityArchetype.Vitality;

            return null;
        }
    }
}
