using UnityEngine;
using UnityEngine.SceneManagement;
using DaoyuanUnity.Core;
using DaoyuanUnity.Engine;

namespace DaoyuanUnity
{
    /// <summary>
    /// 道元纪 · 凡人修仙传 — Unity 版游戏主管理器
    /// 控制游戏状态流转、存档加载、场景切换
    /// </summary>
    public class GameManager : MonoBehaviour
    {
        public static GameManager Instance { get; private set; }

        [Header("游戏状态")]
        public PlayerStats player;
        public WorldState world;
        public SaveData currentSave;

        [Header("设置")]
        public bool enableAI = true;
        public string aiProvider = "GLM"; // GLM | OpenAI | SiliconFlow

        private void Awake()
        {
            if (Instance == null)
            {
                Instance = this;
                DontDestroyOnLoad(gameObject);
                InitializeGame();
            }
            else
            {
                Destroy(gameObject);
            }
        }

        private void InitializeGame()
        {
            // 新建默认玩家
            player = new PlayerStats
            {
                attack = 10,
                defense = 5,
                spirit = 8,
                physique = 7,
                speed = 6,
                hp = 100,
                maxHp = 100,
                exp = 0,
                lifespan = 80,
                age = 18,
                realm = RealmType.Mortal,
                realmLayer = 1
            };

            world = new WorldState
            {
                enabled = false,
                currentChapter = 1,
                currentYear = 1027,
                currentRegionId = "qixuan-city"
            };
        }

        /// <summary>
        /// 初始化编年史模式
        /// </summary>
        public void StartCanonMode()
        {
            world.enabled = true;
            world.currentChapter = 1;
            Debug.Log($"编年史模式启动 — 第{world.currentChapter}章 青牛镇");
        }

        /// <summary>
        /// 保存游戏到 PlayerPrefs / 文件
        /// </summary>
        public void SaveGame(string slotName = "auto")
        {
            currentSave = new SaveData
            {
                version = "0.3.2.6",
                timestamp = System.DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"),
                player = player,
                world = world,
                gold = 100,
                spiritStones = 0
            };

            string json = JsonUtility.ToJson(currentSave, true);
            PlayerPrefs.SetString($"save_{slotName}", json);
            PlayerPrefs.Save();
            Debug.Log($"游戏已保存: {slotName}");
        }

        /// <summary>
        /// 加载游戏存档
        /// </summary>
        public bool LoadGame(string slotName = "auto")
        {
            string json = PlayerPrefs.GetString($"save_{slotName}", "");
            if (string.IsNullOrEmpty(json))
            {
                Debug.LogWarning($"存档不存在: {slotName}");
                return false;
            }

            currentSave = JsonUtility.FromJson<SaveData>(json);
            player = currentSave.player;
            world = currentSave.world;
            Debug.Log($"游戏已加载: {slotName} — 境界={RealmEngine.GetRealmName(player.realm)}");
            return true;
        }

        /// <summary>
        /// 添加经验值并检查突破
        /// </summary>
        public void AddExperience(int amount)
        {
            player.exp += amount;

            if (RealmEngine.CanBreakthrough(player, out var nextRealm, out var nextLayer))
            {
                player = RealmEngine.ApplyBreakthrough(player, nextRealm, nextLayer);
                string realmName = RealmEngine.GetRealmName(nextRealm);
                string layerName = RealmEngine.GetLayerName(nextLayer);
                Debug.Log($"突破！{realmName} {layerName}");

                // 触发突破事件
                OnBreakthrough?.Invoke(nextRealm, nextLayer);
            }
        }

        // 游戏事件
        public System.Action<RealmType, int> OnBreakthrough;
        public System.Action<BattleEngine.BattleResult> OnBattleEnd;
        public System.Action<string> OnNPCInteraction;

        private void OnApplicationQuit()
        {
            SaveGame("auto");
        }
    }
}
