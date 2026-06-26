using System;
using System.Collections.Generic;
using UnityEngine;

/// <summary>
/// 道元纪 · 凡人修仙传同人游戏 — Unity 版核心类型
/// 从原 Web 版 TypeScript types.ts + fanren/types.ts 映射
/// </summary>

namespace DaoyuanUnity.Core
{
    // ━━━━━━━━━━━━━ 境界系统 ━━━━━━━━━━━━━
    public enum RealmType
    {
        None = 0,
        // 人界
        Mortal = 1,
        QiRefining = 2,      // 炼气
        Foundation = 3,      // 筑基
        CoreFormation = 4,   // 结丹
        NascentSoul = 5,     // 元婴
        DeityTransformation = 6, // 化神
        // 灵界
        VoidRefining = 7,    // 炼虚
        BodyIntegration = 8, // 合体
        GreatVehicle = 9,    // 大乘
        Tribulation = 10,    // 渡劫
        // 仙界
        TrueImmortal = 11,   // 真仙
        GoldenImmortal = 12, // 金仙
        TaiyiJade = 13,      // 太乙玉仙
        DaLuo = 14,          // 大罗
        DaoAncestor = 15,    // 道祖
    }

    // ━━━━━━━━━━━━━ 属性系统 ━━━━━━━━━━━━━
    [Serializable]
    public struct PlayerStats
    {
        public int attack;
        public int defense;
        public int spirit;      // 灵力
        public int physique;    // 体魄
        public int speed;
        public int hp;
        public int maxHp;
        public int exp;
        public int lifespan;    // 寿元（年）
        public int age;
        public RealmType realm;
        public int realmLayer;  // 境界层数（1-13）
    }

    // ━━━━━━━━━━━━━ 物品系统 ━━━━━━━━━━━━━
    public enum ItemCategory
    {
        Weapon, Armor, Accessory, Pill, Material,
        Technique, Treasure, Quest, Pet, Misc
    }

    public enum ItemRarity
    {
        Common, Uncommon, Rare, Epic, Legendary, Mythic
    }

    [Serializable]
    public class GameItem
    {
        public string id;
        public string name;
        public ItemCategory category;
        public ItemRarity rarity;
        public int quantity;
        public string description;
        public Dictionary<string, int> attributes;  // 属性加值
    }

    // ━━━━━━━━━━━━━ 灵根系统 ━━━━━━━━━━━━━
    public enum SpiritRootType
    {
        None, Metal, Wood, Water, Fire, Earth,
        Wind, Thunder, Ice, Light, Dark
    }

    [Serializable]
    public struct SpiritRoot
    {
        public SpiritRootType primary;
        public SpiritRootType secondary;
        public int purity;       // 纯度 0-100
        public int grade;        // 品级 1-9
    }

    // ━━━━━━━━━━━━━ 功法系统 ━━━━━━━━━━━━━
    [Serializable]
    public class Technique
    {
        public string id;
        public string name;
        public string description;
        public int maxLevel;
        public int currentLevel;
        public RealmType requiredRealm;
        public Dictionary<string, float> multipliers;
        public Dictionary<string, SkillEffect> skills;
    }

    [Serializable]
    public struct SkillEffect
    {
        public string name;
        public string description;
        public float damageMultiplier;
        public int cooldown;
        public int duration;
        public Dictionary<string, float> buffs;
    }

    // ━━━━━━━━━━━━━ 战斗系统 ━━━━━━━━━━━━━
    public enum DamageType
    {
        Physical, Fire, Ice, Thunder, Poison, Spirit, TrueDamage
    }

    [Serializable]
    public struct TurnAction
    {
        public string actionId;
        public string techniqueId;
        public string itemId;
        public DamageType damageType;
        public float basePower;
        public string description;
    }

    [Serializable]
    public struct BattleUnit
    {
        public string name;
        public int hp;
        public int maxHp;
        public int attack;
        public int defense;
        public int spirit;
        public int speed;
        public List<BattleBuff> buffs;
        public List<BattleBuff> debuffs;
    }

    [Serializable]
    public struct BattleBuff
    {
        public string id;
        public string name;
        public int duration;
        public bool immunity;
        public float damageReduction;
        public Dictionary<string, float> statModifiers;
    }

    // ━━━━━━━━━━━━━ 宗门系统 ━━━━━━━━━━━━━
    [Serializable]
    public class Sect
    {
        public string id;
        public string name;
        public string regionId;
        public int reputation;
        public int memberCount;
        public List<string> techniques;     // 宗门功法
        public List<string> treasures;      // 宗门宝物
        public Dictionary<string, int> resources; // 宗门资源
    }

    // ━━━━━━━━━━━━━ NPC系统 ━━━━━━━━━━━━━
    [Serializable]
    public class GameNPC
    {
        public string id;
        public string name;
        public string title;
        public RealmType realm;
        public float relationship;  // -100..100
        public string regionId;
        public int fromChapter;
        public int toChapter;
        public List<string> chronicle;  // 人物编年史
    }

    // ━━━━━━━━━━━━━ 世界系统（编年史模式） ━━━━━━━━━━━━━
    [Serializable]
    public class WorldState
    {
        public bool enabled;            // 编年史模式启用
        public int currentChapter;       // 当前章号
        public int currentYear;          // 当前年份
        public string currentRegionId;
        public List<string> completedEvents;
        public List<Divergence> divergences;
        public Dictionary<string, NPCState> npcStates;
    }

    [Serializable]
    public struct Divergence
    {
        public string eventId;
        public int chapterLocked;
        public string description;
        public bool playerIntervened;
    }

    [Serializable]
    public struct NPCState
    {
        public string npcId;
        public bool alive;
        public RealmType currentRealm;
        public string currentRegion;
        public float playerRelationship;
    }

    // ━━━━━━━━━━━━━ 机缘系统 ━━━━━━━━━━━━━
    [Serializable]
    public class HiddenOpportunity
    {
        public string id;
        public string name;
        public string regionId;
        public int canonChapter;
        public string discoverHint;
        public List<TreasureDef> treasures;
        public List<OpportunityAction> actions;
        public int spoilerLevel;
    }

    [Serializable]
    public struct TreasureDef
    {
        public string name;
        public string type;
        public string rarity;
        public int quantity;
    }

    [Serializable]
    public struct OpportunityAction
    {
        public string id;
        public string label;
        public int magnitude;       // 0-100 时间线震幅
        public string note;
    }

    // ━━━━━━━━━━━━━ 修仙百艺 ━━━━━━━━━━━━━
    [Serializable]
    public struct BaiYiProficiency
    {
        public string artId;
        public string artName;      // 炼丹、炼器、阵法、符箓...
        public int level;
        public int exp;
        public float successRate;
    }

    // ━━━━━━━━━━━━━ 灵宠系统 ━━━━━━━━━━━━━
    [Serializable]
    public class SpiritPet
    {
        public string id;
        public string name;
        public string species;
        public int level;
        public int exp;
        public int bond;            // 羁绊值 0-100
        public PlayerStats stats;
        public List<string> abilities;
    }

    // ━━━━━━━━━━━━━ 存档系统 ━━━━━━━━━━━━━
    [Serializable]
    public class SaveData
    {
        public string version;
        public string timestamp;
        public PlayerStats player;
        public SpiritRoot spiritRoot;
        public List<GameItem> inventory;
        public List<Technique> techniques;
        public List<SpiritPet> pets;
        public WorldState world;
        public Dictionary<string, BaiYiProficiency> baiyi;
        public int gold;
        public int spiritStones;
    }

    // ━━━━━━━━━━━━━ 游戏事件 ━━━━━━━━━━━━━
    public enum GameEventType
    {
        Combat, Discovery, NPCEncounter, Quest,
        Tribulation, Opportunity, Market, Crafting,
        SectEvent, WorldEvent, Dialogue
    }

    [Serializable]
    public struct GameEvent
    {
        public string id;
        public GameEventType type;
        public string title;
        public string description;
        public string[] choices;
        public Dictionary<string, object> effects;
    }

    // ━━━━━━━━━━━━━ 地图系统 ━━━━━━━━━━━━━
    [Serializable]
    public class Region
    {
        public string id;
        public string name;
        public string description;
        public int unlockChapter;
        public List<string> adjacentRegions;
        public List<string> npcs;
        public List<string> events;
        public List<string> resources;
    }
}
