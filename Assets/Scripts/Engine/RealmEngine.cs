using System.Collections.Generic;
using DaoyuanUnity.Core;

namespace DaoyuanUnity.Engine
{
    /// <summary>
    /// 境界引擎 — 控制修为突破、境界跃迁、寿元计算
    /// 从 fanren/engine/realm.ts 映射
    /// </summary>
    public static class RealmEngine
    {
        // 每境界最高经验值（13层制）
        public static readonly Dictionary<RealmType, int> RealmMaxExp = new()
        {
            { RealmType.Mortal, 0 },
            { RealmType.QiRefining, 1300 },
            { RealmType.Foundation, 2600 },
            { RealmType.CoreFormation, 5200 },
            { RealmType.NascentSoul, 10400 },
            { RealmType.DeityTransformation, 20800 },
            { RealmType.VoidRefining, 41600 },
            { RealmType.BodyIntegration, 83200 },
            { RealmType.GreatVehicle, 166400 },
            { RealmType.Tribulation, 332800 },
            { RealmType.TrueImmortal, 665600 },
            { RealmType.GoldenImmortal, 1331200 },
            { RealmType.TaiyiJade, 2662400 },
            { RealmType.DaLuo, 5324800 },
            { RealmType.DaoAncestor, -1 }, // 无上限
        };

        // 每境界基础寿元（年）
        public static readonly Dictionary<RealmType, int> RealmLifespan = new()
        {
            { RealmType.Mortal, 80 },
            { RealmType.QiRefining, 150 },
            { RealmType.Foundation, 250 },
            { RealmType.CoreFormation, 500 },
            { RealmType.NascentSoul, 1000 },
            { RealmType.DeityTransformation, 2000 },
            { RealmType.VoidRefining, 5000 },
            { RealmType.BodyIntegration, 10000 },
            { RealmType.GreatVehicle, 20000 },
            { RealmType.Tribulation, 50000 },
            { RealmType.TrueImmortal, 100000 },
            { RealmType.GoldenImmortal, 300000 },
            { RealmType.TaiyiJade, 1000000 },
            { RealmType.DaLuo, 5000000 },
            { RealmType.DaoAncestor, -1 }, // 永生
        };

        /// <summary>
        /// 检查是否可以突破到下一层/下一境界
        /// </summary>
        public static bool CanBreakthrough(PlayerStats player, out RealmType nextRealm, out int nextLayer)
        {
            nextRealm = player.realm;
            nextLayer = player.realmLayer;

            if (player.realm == RealmType.DaoAncestor)
                return false;

            int maxExp = RealmMaxExp.TryGetValue(player.realm, out var val) ? val : 0;
            if (maxExp <= 0 && player.realm != RealmType.DaoAncestor)
                return false;

            if (player.exp >= maxExp)
            {
                if (player.realmLayer >= 13)
                {
                    // 境界跃迁
                    nextRealm = GetNextRealm(player.realm);
                    nextLayer = 1;
                }
                else
                {
                    nextLayer = player.realmLayer + 1;
                }
                return true;
            }
            return false;
        }

        private static RealmType GetNextRealm(RealmType current)
        {
            int next = (int)current + 1;
            return next <= (int)RealmType.DaoAncestor ? (RealmType)next : current;
        }

        /// <summary>
        /// 突破时获得的属性加成
        /// </summary>
        public static PlayerStats ApplyBreakthrough(PlayerStats player, RealmType newRealm, int newLayer)
        {
            float multiplier = 1f;
            if (newRealm != player.realm)
                multiplier = 1.5f; // 大境界突破，属性大幅提升

            player.attack = (int)(player.attack * (1 + 0.3f * multiplier));
            player.defense = (int)(player.defense * (1 + 0.3f * multiplier));
            player.spirit = (int)(player.spirit * (1 + 0.4f * multiplier));
            player.physique = (int)(player.physique * (1 + 0.25f * multiplier));
            player.speed = (int)(player.speed * (1 + 0.2f * multiplier));
            player.maxHp = (int)(player.maxHp * (1 + 0.35f * multiplier));
            player.hp = player.maxHp;
            player.realm = newRealm;
            player.realmLayer = newLayer;
            player.exp = 0;
            player.lifespan = RealmLifespan.TryGetValue(newRealm, out var ls) ? ls : 80;

            return player;
        }

        /// <summary>
        /// 获取境界中文名称
        /// </summary>
        public static string GetRealmName(RealmType realm)
        {
            return realm switch
            {
                RealmType.Mortal => "凡人",
                RealmType.QiRefining => "炼气",
                RealmType.Foundation => "筑基",
                RealmType.CoreFormation => "结丹",
                RealmType.NascentSoul => "元婴",
                RealmType.DeityTransformation => "化神",
                RealmType.VoidRefining => "炼虚",
                RealmType.BodyIntegration => "合体",
                RealmType.GreatVehicle => "大乘",
                RealmType.Tribulation => "渡劫",
                RealmType.TrueImmortal => "真仙",
                RealmType.GoldenImmortal => "金仙",
                RealmType.TaiyiJade => "太乙玉仙",
                RealmType.DaLuo => "大罗",
                RealmType.DaoAncestor => "道祖",
                _ => "未知"
            };
        }

        /// <summary>
        /// 获取境界层数的字符串表示
        /// </summary>
        public static string GetLayerName(int layer)
        {
            return layer switch
            {
                1 => "初期",
                2 => "前期",
                3 => "中前期",
                4 => "中期",
                5 => "中后期",
                6 => "后期",
                7 => "后巅峰",
                8 => "大成期",
                9 => "顶峰",
                10 => "圆满",
                11 => "大圆满",
                12 => "极限",
                13 => "破境",
                _ => $"第{layer}层"
            };
        }
    }
}
