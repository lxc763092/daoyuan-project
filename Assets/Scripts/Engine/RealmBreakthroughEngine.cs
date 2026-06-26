using System;
using System.Collections.Generic;
using UnityEngine;

namespace DaoyuanUnity.Engine
{
    /// <summary>
    /// 境界突破引擎：突破概率、天劫、附加属性加成。
    /// 映射自 fanren/engine/realm.ts + fanren/data/realms.ts
    /// </summary>
    public static class RealmBreakthroughEngine
    {
        /// <summary>跨大境界战力底数（原版18倍/大境界）</summary>
        public const float RealmPowerBase = 18f;
        
        /// <summary>突破基础概率表（大境界index → 基础成功率 0~1）</summary>
        private static readonly float[] BaseBreakthroughChance = {
            0.95f, // 0: 引气入体→通脉开窍
            0.85f, // 1: 通脉开窍→筑基凝脉
            0.70f, // 2: 筑基凝脉→金丹化婴
            0.45f, // 3: 金丹化婴→元婴出窍
            0.25f, // 4: 元婴出窍→化神归墟
            0.12f, // 5: 化神归墟→合道通玄
            0.05f, // 6: 合道通玄→大乘渡劫
            0.02f, // 7: 大乘渡劫→真仙归一
            0.005f,// 8: 真仙归一→道元无极
        };

        /// <summary>子境界内部系数（炼气1-13层线性映射）</summary>
        public static float SubRealmFactor(int subIndex, int maxSub = 4)
        {
            // 初/中/后/圆满 → 1.0 / 1.6 / 2.3 / 3.5
            float[] factors = { 1.0f, 1.6f, 2.3f, 3.5f };
            int idx = Mathf.Clamp(subIndex, 0, maxSub - 1);
            if (idx < factors.Length) return factors[idx];
            // 炼气13层特殊处理：线性插值
            return 1.0f + (subIndex / (float)(maxSub - 1)) * 2.5f;
        }

        /// <summary>综合战力系数 = 18^大境界index × 子境界内部系数</summary>
        public static float CombatPowerFactor(int realmIndex, int subIndex)
        {
            float realmPower = Mathf.Pow(RealmPowerBase, realmIndex);
            float within = SubRealmFactor(subIndex);
            return realmPower * within;
        }

        /// <summary>计算突破成功率（含各类加成/惩罚）</summary>
        public static float CalculateBreakthroughChance(
            int currentRealmIndex, 
            int currentSubIndex,
            float comprehension,      // 悟性 0~100
            float foundationStability, // 根基稳固度 0~1
            float auxiliaryBonus = 0f) // 丹药/灵脉等额外加成
        {
            if (currentRealmIndex >= BaseBreakthroughChance.Length)
                return 0.01f;

            float baseChance = BaseBreakthroughChance[Mathf.Clamp(currentRealmIndex, 0, BaseBreakthroughChance.Length - 1)];

            // 悟性修正：悟性50为基准1.0，0→0.5，100→1.5
            float compFactor = 0.5f + (comprehension / 100f);
            
            // 根基修正
            float foundationFactor = 0.5f + foundationStability * 0.5f;

            // 突破瓶颈递减（子境界越高越难）
            float subPenalty = 1f - (currentSubIndex * 0.05f);

            float finalChance = baseChance * compFactor * foundationFactor * subPenalty + auxiliaryBonus;
            return Mathf.Clamp01(finalChance);
        }

        /// <summary>计算天劫强度（合道通玄 index≥5 起触发）</summary>
        public static int TribulationPower(int realmIndex, float karma = 0f)
        {
            if (realmIndex < 5) return 0; // 化神以下无天劫
            // 基础强度 = 50 × 2^(index-5)，业力每点 +15%
            float basePower = 50f * Mathf.Pow(2f, realmIndex - 5);
            float karmaMod = 1f + karma * 0.15f;
            return Mathf.RoundToInt(basePower * karmaMod);
        }

        /// <summary>突破后属性加成</summary>
        public static RealmBonus GetBreakthroughBonus(int newRealmIndex)
        {
            return new RealmBonus
            {
                maxHpBonus = 100 * (newRealmIndex + 1),
                maxMpBonus = 80 * (newRealmIndex + 1),
                attackBonus = 10 * (newRealmIndex + 1),
                defenseBonus = 8 * (newRealmIndex + 1),
                speedBonus = 5 * (newRealmIndex + 1),
                lifespanBonus = GetLifespanBonus(newRealmIndex)
            };
        }

        /// <summary>寿元表（年）</summary>
        public static int GetLifespanBonus(int realmIndex)
        {
            int[] lifespan = { 100, 150, 200, 300, 500, 800, 1200, 2000, 5000, 10000 };
            return realmIndex >= 0 && realmIndex < lifespan.Length 
                ? lifespan[realmIndex] 
                : 10000;
        }

        /// <summary>境界修炼难度系数：5 × 2.5^(index-1)</summary>
        public static float CultivationDifficulty(int realmIndex)
        {
            if (realmIndex <= 0) return 5f;
            return 5f * Mathf.Pow(2.5f, realmIndex - 1);
        }
    }

    /// <summary>突破奖励</summary>
    [System.Serializable]
    public struct RealmBonus
    {
        public int maxHpBonus;
        public int maxMpBonus;
        public int attackBonus;
        public int defenseBonus;
        public int speedBonus;
        public int lifespanBonus;
    }
}
