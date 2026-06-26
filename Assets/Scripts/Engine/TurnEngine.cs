using System;
using System.Collections.Generic;
using UnityEngine;

namespace DaoyuanUnity.Engine
{
    /// <summary>
    /// 动态回合引擎：玩家行动 → 输入治理 → 数值结算 → 时间推进 → 世界演化 → 叙事 → 提醒/记忆。
    /// 映射自 fanren/engine/turnEngine.ts (57KB 核心引擎)
    /// </summary>
    public class TurnEngine : MonoBehaviour
    {
        [Header("依赖组件")]
        [SerializeField] private GameManager gameManager;
        [SerializeField] private ClockEngine clockEngine;

        [Header("修炼参数")]
        [Tooltip("灵根资质对修炼效率的倍率表（0=废灵根→5=天灵根）")]
        public float[] spiritRootMultipliers = { 0.3f, 0.6f, 1.0f, 1.5f, 2.5f, 4.0f };

        [Tooltip("灵脉品质系数（0=无灵脉→2.5=极品灵脉）")]
        public float lingMaiMaxBonus = 2.5f;

        [Tooltip("化神及以上在人界修炼效率衰减")]
        public float immortalRealmHumanWorldPenalty = 0.5f;

        /// <summary>行动类型枚举</summary>
        public enum ActionType
        {
            Cultivate,   // 修炼
            Travel,       // 旅行
            Explore,      // 探索
            Fight,        // 战斗
            Talk,         // 交谈
            Party,        // 组队
            Transmit,     // 传音
            UseGoldenFinger, // 动用金手指
            Craft,        // 炼器/炼丹
            SystemQuery   // 系统查询
        }

        /// <summary>行动请求</summary>
        [System.Serializable]
        public class ActionRequest
        {
            public ActionType type;
            public string intent;           // 玩家原始输入
            public Dictionary<string, object> parameters = new();
        }

        /// <summary>行动结果</summary>
        [System.Serializable]
        public class ActionResult
        {
            public bool success;
            public string narrative;        // AI叙事文本
            public float timeCost;          // 消耗时间（天）
            public Dictionary<string, float> statChanges = new(); // 属性变化
            public List<string> reminders = new();    // 提醒
            public List<string> memories = new();     // 记忆片段
        }

        /// <summary>执行单次行动（核心回合循环入口）</summary>
        public ActionResult ExecuteAction(ActionRequest request, GameState state)
        {
            // 1. 治理审核（检测作弊/出戏行为）
            if (!GovernAction(request, state))
            {
                return new ActionResult
                {
                    success = false,
                    narrative = "天道感应：此行为不合天道法则，已被天道之力驳回。",
                    timeCost = 0
                };
            }

            // 2. 按行动类型分派
            ActionResult result = request.type switch
            {
                ActionType.Cultivate => ExecuteCultivate(request, state),
                ActionType.Travel => ExecuteTravel(request, state),
                ActionType.Explore => ExecuteExplore(request, state),
                ActionType.Fight => ExecuteFight(request, state),
                _ => new ActionResult { success = true, narrative = "行动类型暂未实现完整映射（WIP）", timeCost = 0.1f }
            };

            // 3. 时间推进
            if (result.timeCost > 0)
            {
                clockEngine?.AdvanceTime(result.timeCost);
            }

            // 4. 世界演化（每日检查）
            EvolveWorld(state, result.timeCost);

            // 5. 生成提醒与记忆
            result.reminders = BuildReminders(state, result);
            result.memories = BuildMemories(state, result);

            return result;
        }

        /// <summary>治理审核</summary>
        private bool GovernAction(ActionRequest request, GameState state)
        {
            // 简化治理：拒绝明显不合理的行动
            if (string.IsNullOrEmpty(request.intent)) return false;
            if (request.intent.Length > 1000) return false; // 过长输入
            // TODO: 完整映射 governor.ts 的作弊检测逻辑
            return true;
        }

        /// <summary>修炼行动结算</summary>
        private ActionResult ExecuteCultivate(ActionRequest request, GameState state)
        {
            var result = new ActionResult { success = true };

            // 修炼效率 = 灵根倍率 × 灵脉系数 × 悟性系数 × 境界难度倒数 × 化神法则
            int rootIndex = Mathf.Clamp(state.player.spiritRootQuality, 0, spiritRootMultipliers.Length - 1);
            float rootMultiplier = spiritRootMultipliers[rootIndex];

            float lingMaiFactor = 1f + (state.currentLocation?.lingMaiQuality ?? 0f) * lingMaiMaxBonus;
            
            // 悟性：0→1/3, 50→1, 100→3
            float compFactor = 1f / 3f + (state.player.comprehension / 100f) * (8f / 3f);
            
            float difficultyInverse = 1f / RealmBreakthroughEngine.CultivationDifficulty(state.player.realmIndex);

            // 化神及以上在人界的修炼限制
            float realmPenalty = (state.player.realmIndex >= 4 && state.currentLocation?.worldTier == WorldTier.Human)
                ? immortalRealmHumanWorldPenalty : 1f;

            float cultivationEfficiency = rootMultiplier * lingMaiFactor * compFactor * difficultyInverse * realmPenalty;

            // 经验获取（基础10exp/天 × 效率）
            float expGain = 10f * cultivationEfficiency;
            state.player.cultivationExp += expGain;

            // 走火入魔检测（根基不稳时概率触发）
            if (state.player.cultivationExp > state.player.maxCultivationExp * 1.5f &&
                UnityEngine.Random.value < 0.05f)
            {
                result.narrative = "修炼中真气突然暴走！你感到经脉剧痛，走火入魔的征兆显现…";
                state.player.qiDeviation += 1;
                state.player.cultivationExp *= 0.8f;
            }
            else
            {
                result.narrative = $"潜心修炼，灵气如涓涓细流汇入丹田。修炼效率：{cultivationEfficiency:F2}x，获得 {expGain:F1} 修为。";
            }

            result.timeCost = 1f; // 一次修炼消耗1天
            result.statChanges["cultivationExp"] = expGain;
            return result;
        }

        /// <summary>旅行行动结算（委托TravelEngine）</summary>
        private ActionResult ExecuteTravel(ActionRequest request, GameState state)
        {
            // TODO: 完整映射 travel.ts 逻辑
            return new ActionResult
            {
                success = true,
                narrative = "你踏上了旅途，前方的道路延伸向未知的远方…（TravelEngine完整映射WIP）",
                timeCost = 5f
            };
        }

        /// <summary>探索行动结算</summary>
        private ActionResult ExecuteExplore(ActionRequest request, GameState state)
        {
            // TODO: 完整映射 procGen.ts + explore 逻辑
            return new ActionResult
            {
                success = true,
                narrative = "你在附近仔细探索，感知周遭的灵气波动与隐秘迹象…（ExploreEngine完整映射WIP）",
                timeCost = 2f
            };
        }

        /// <summary>战斗行动结算（委托BattleEngine）</summary>
        private ActionResult ExecuteFight(ActionRequest request, GameState state)
        {
            // TODO: 完整的NPC遭遇→战斗流程
            return new ActionResult
            {
                success = true,
                narrative = "战斗系统骨架已就位（BattleEngine），完整遭遇流程待映射。",
                timeCost = 0.5f
            };
        }

        /// <summary>世界演化（每日触发）</summary>
        private void EvolveWorld(GameState state, float daysPassed)
        {
            int fullDays = Mathf.FloorToInt(daysPassed);
            for (int i = 0; i < fullDays; i++)
            {
                // NPC移动、势力消长、秘境刷新等
                // TODO: 完整映射 worldEvolution.ts
            }
        }

        /// <summary>构建提醒列表</summary>
        private List<string> BuildReminders(GameState state, ActionResult result)
        {
            var reminders = new List<string>();
            
            // 突破提醒
            if (state.player.cultivationExp >= state.player.maxCultivationExp * 0.9f)
                reminders.Add("修为积累已达瓶颈，可尝试突破境界。");
            
            // 寿元提醒
            int remainingYears = RealmBreakthroughEngine.GetLifespanBonus(state.player.realmIndex) - state.player.age;
            if (remainingYears < 10)
                reminders.Add($"寿元将尽！仅剩约{remainingYears}年。");

            // 走火入魔提醒
            if (state.player.qiDeviation > 0)
                reminders.Add($"体内真气紊乱（走火入魔x{state.player.qiDeviation}），需尽快调理。");

            return reminders;
        }

        /// <summary>构建记忆片段</summary>
        private List<string> BuildMemories(GameState state, ActionResult result)
        {
            var memories = new List<string>();
            if (!string.IsNullOrEmpty(result.narrative))
                memories.Add(result.narrative);
            return memories;
        }
    }

    /// <summary>世界层级</summary>
    public enum WorldTier { Human, Spirit, Demon, Immortal }
}
