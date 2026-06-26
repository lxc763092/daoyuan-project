using System;
using System.Collections.Generic;
using DaoyuanUnity.Core;
using Random = UnityEngine.Random;

namespace DaoyuanUnity.Engine
{
    /// <summary>
    /// 战斗引擎 — 回合制修仙战斗逻辑
    /// 从 services/battleService.ts + constants/advanced.ts 映射
    /// </summary>
    public static class BattleEngine
    {
        public enum BattleResult { Ongoing, PlayerWin, EnemyWin, PlayerRetreat }

        /// <summary>
        /// 执行一个战斗回合
        /// </summary>
        public static BattleResult ExecuteTurn(
            BattleUnit player, BattleUnit enemy,
            TurnAction playerAction, TurnAction enemyAction)
        {
            // 处理 buff/debuff 效果
            ProcessBuffs(player);
            ProcessBuffs(enemy);

            // 速度决定先手
            var (first, second, firstAction, secondAction) =
                player.speed >= enemy.speed
                    ? (player, enemy, playerAction, enemyAction)
                    : (enemy, player, enemyAction, playerAction);

            // 先手攻击
            ApplyDamage(second, first, firstAction);
            if (second.hp <= 0)
            {
                return first == player ? BattleResult.PlayerWin : BattleResult.EnemyWin;
            }

            // 后手攻击
            ApplyDamage(first, second, secondAction);
            if (first.hp <= 0)
            {
                return first == player ? BattleResult.EnemyWin : BattleResult.PlayerWin;
            }

            return BattleResult.Ongoing;
        }

        private static void ApplyDamage(BattleUnit target, BattleUnit attacker, TurnAction action)
        {
            // 基础伤害
            float rawDamage = attacker.attack * action.basePower;

            // 防御减免
            float reduction = target.defense / (target.defense + 100f);
            rawDamage *= (1 - reduction);

            // 检查免疫
            bool hasImmunity = target.buffs.Exists(b => b.immunity);
            if (hasImmunity)
            {
                rawDamage *= 0.3f; // 大幅减伤
            }

            // 伤害减免 buff
            foreach (var buff in target.buffs)
            {
                rawDamage *= (1 - buff.damageReduction);
            }

            int finalDamage = Math.Max(1, (int)rawDamage);
            target.hp = Math.Max(0, target.hp - finalDamage);
        }

        private static void ProcessBuffs(BattleUnit unit)
        {
            // 减少 buff/debuff 持续时间，移除过期效果
            unit.buffs.RemoveAll(b =>
            {
                b.duration--;
                return b.duration <= 0;
            });
            unit.debuffs.RemoveAll(b =>
            {
                b.duration--;
                return b.duration <= 0;
            });
        }

        /// <summary>
        /// 获取天劫强度
        /// </summary>
        public static int GetTribulationPower(RealmType targetRealm, int layer)
        {
            int basePower = (int)targetRealm * 100;
            return basePower + layer * 50;
        }

        /// <summary>
        /// 生成随机遭遇敌人
        /// </summary>
        public static BattleUnit GenerateRandomEnemy(RealmType playerRealm)
        {
            int baseStat = (int)playerRealm * 80 + Random.Range(50, 200);

            return new BattleUnit
            {
                name = GetRandomEnemyName(playerRealm),
                hp = baseStat * 3,
                maxHp = baseStat * 3,
                attack = baseStat,
                defense = baseStat / 2,
                spirit = baseStat / 2,
                speed = baseStat / 2,
                buffs = new List<BattleBuff>(),
                debuffs = new List<BattleBuff>()
            };
        }

        private static string GetRandomEnemyName(RealmType realm)
        {
            string[] prefixes = { "野生", "狂暴", "变异", "上古", "暗影" };
            string[] types = {
                "妖兽", "邪修", "魔物", "妖虫", "煞魂",
                "毒蟒", "血蝠", "骨魔", "幻妖", "噬灵兽"
            };
            return $"{prefixes[Random.Range(0, prefixes.Length)]}{types[Random.Range(0, types.Length)]}";
        }
    }
}
