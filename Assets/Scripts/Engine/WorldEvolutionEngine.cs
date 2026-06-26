using System;
using System.Collections.Generic;
using UnityEngine;

namespace DaoyuanUnity.Engine
{
    /// <summary>
    /// 世界演化引擎：NPC移动、势力消长、秘境刷新、天道事件。
    /// 映射自 fanren/engine/worldEvolution.ts + demographics.ts + census.ts
    /// </summary>
    public class WorldEvolutionEngine : MonoBehaviour
    {
        [Header("演化参数")]
        [Tooltip("每日演化概率（0~1）")]
        [Range(0f, 1f)]
        public float dailyEventChance = 0.3f;

        [Tooltip("势力消长速率")]
        [Range(0.01f, 0.1f)]
        public float factionGrowthRate = 0.03f;

        [Header("天道事件表")]
        public WorldEvent[] possibleEvents;

        private System.Random rng = new();

        /// <summary>执行每日世界演化</summary>
        public WorldEvolutionResult EvolveDay(GameState state)
        {
            var result = new WorldEvolutionResult();

            // 1. NPC人口动态
            EvolveDemographics(state, result);

            // 2. 势力消长
            EvolveFactions(state, result);

            // 3. 随机天道事件
            if (UnityEngine.Random.value < dailyEventChance)
            {
                var evt = PickRandomEvent(state);
                if (evt != null)
                {
                    result.events.Add(evt);
                    ApplyEvent(evt, state);
                }
            }

            // 4. 秘境刷新
            RefreshSecretRealms(state, result);

            return result;
        }

        /// <summary>人口演化</summary>
        private void EvolveDemographics(GameState state, WorldEvolutionResult result)
        {
            // 简化模型：每个区域的人口有小幅随机波动
            if (state.regions == null) return;

            foreach (var region in state.regions)
            {
                float growth = (float)(rng.NextDouble() * 0.02 - 0.005); // -0.5%~1.5%
                region.population = Mathf.Max(100, region.population * (1f + growth));
            }
        }

        /// <summary>势力消长</summary>
        private void EvolveFactions(GameState state, WorldEvolutionResult result)
        {
            if (state.factions == null) return;

            foreach (var faction in state.factions)
            {
                // 随机波动 + 向平衡态回归
                float drift = (float)(rng.NextDouble() * factionGrowthRate * 2 - factionGrowthRate);
                faction.influence = Mathf.Clamp01(faction.influence + drift);
            }
        }

        /// <summary>随机选择天道事件</summary>
        private WorldEvent PickRandomEvent(GameState state)
        {
            if (possibleEvents == null || possibleEvents.Length == 0)
                return null;

            // 按章节解锁筛选
            var eligible = new List<WorldEvent>();
            int currentChapter = state.currentChapter;
            foreach (var evt in possibleEvents)
            {
                if (evt.unlockChapter <= currentChapter)
                    eligible.Add(evt);
            }

            if (eligible.Count == 0) return null;
            return eligible[rng.Next(eligible.Count)];
        }

        /// <summary>应用事件效果</summary>
        private void ApplyEvent(WorldEvent evt, GameState state)
        {
            // TODO: 完整事件效果链（含NPC反应、势力关系变化等）
            Debug.Log($"[世界演化] 触发天道事件: {evt.name} - {evt.description}");
        }

        /// <summary>秘境刷新</summary>
        private void RefreshSecretRealms(GameState state, WorldEvolutionResult result)
        {
            // TODO: 完整映射 localSecretRealms.ts 的秘境刷新逻辑
        }
    }

    /// <summary>世界演化结果</summary>
    [System.Serializable]
    public class WorldEvolutionResult
    {
        public List<WorldEvent> events = new();
        public List<string> notifications = new();
    }

    /// <summary>天道事件</summary>
    [System.Serializable]
    public class WorldEvent
    {
        public string id;
        public string name;
        public string description;
        public int unlockChapter;
        public WorldEventEffect[] effects;
    }

    /// <summary>事件效果</summary>
    [System.Serializable]
    public class WorldEventEffect
    {
        public enum EffectType { ModifyFactionInfluence, SpawnNPC, OpenSecretRealm, GlobalBuff }
        public EffectType type;
        public string targetId;
        public float value;
        public int duration; // 天数，0=永久
    }
}
