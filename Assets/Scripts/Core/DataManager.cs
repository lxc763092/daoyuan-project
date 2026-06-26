using System;
using System.Collections.Generic;
using UnityEngine;

namespace DaoyuanUnity.Core
{
    /// <summary>
    /// 游戏数据管理器 — 集中管理所有游戏数据资产
    /// ScriptableObject 模式下加载/序列化游戏数据
    /// </summary>
    [CreateAssetMenu(fileName = "GameDataManager", menuName = "道元纪/GameDataManager")]
    public class DataManager : ScriptableObject
    {
        [Header("区域数据")]
        public List<RegionData> regions;

        [Header("NPC数据")]
        public List<NPCData> npcs;

        [Header("功法数据")]
        public List<TechniqueData> techniques;

        [Header("物品数据")]
        public List<ItemData> items;

        [Header("机缘数据")]
        public List<OpportunityData> opportunities;

        [Header("宗门数据")]
        public List<SectData> sects;

        private static DataManager _instance;
        public static DataManager Instance
        {
            get
            {
                if (_instance == null)
                    _instance = Resources.Load<DataManager>("Data/GameDataManager");
                return _instance;
            }
        }
    }

    // ━━━━━━━ ScriptableObject 数据容器 ━━━━━━━
    [Serializable]
    public class RegionData
    {
        public string id;
        public string name;
        public string description;
        public int unlockChapter;
        public List<string> adjacentRegionIds;
        public List<string> npcIds;
    }

    [Serializable]
    public class NPCData
    {
        public string id;
        public string name;
        public string title;
        public int fromChapter;
        public int toChapter;
        public string defaultRegion;
        public int initialRealm; // enum value of RealmType
        public string[] chronicleEntries;
    }

    [Serializable]
    public class TechniqueData
    {
        public string id;
        public string name;
        public string description;
        public int maxLevel;
        public int requiredRealm; // enum value of RealmType
        public float attackMultiplier;
        public float defenseMultiplier;
        public float speedMultiplier;
        public List<SkillDef> skills;
    }

    [Serializable]
    public class SkillDef
    {
        public string name;
        public string description;
        public float damageMultiplier;
        public int cooldown;
        public int duration;
    }

    [Serializable]
    public class ItemData
    {
        public string id;
        public string name;
        public string description;
        public int category; // enum value of ItemCategory
        public int rarity;   // enum value of ItemRarity
        public string effectDescription;
    }

    [Serializable]
    public class OpportunityData
    {
        public string id;
        public string name;
        public string regionId;
        public int canonChapter;
        public string discoverHint;
        public int spoilerLevel;
    }

    [Serializable]
    public class SectData
    {
        public string id;
        public string name;
        public string regionId;
        public int defaultReputation;
        public List<string> techniqueIds;
    }
}
