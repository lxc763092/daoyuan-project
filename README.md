# 道元纪 Unity Edition (Daoyuan Unity)

> **凡人修仙傳 · 正史文字冒险游戏** — Unity C# 重制版  
> 基于原 [daoyuan-project](https://github.com/lxc763092/daoyuan-project) Web版（11.6万行 TypeScript）系统性映射

## 项目概述

道元纪是一款基于《凡人修仙传》正史世界观的文字冒险游戏。本仓库是将原 Web 版（React + TypeScript，v0.3.2.6）的游戏引擎与数据系统，系统性映射为 Unity C# 项目，目标平台包括 WebGL / 桌面 / 移动端。

### 已映射的核心引擎（10个C#文件，~1,800行）

| 文件 | 行数 | 映射源 | 功能 |
|------|------|--------|------|
| `Core/GameTypes.cs` | 329 | types.ts 子系统 | 15个子系统类型定义（境界/属性/物品/灵根/功法/战斗/宗门/NPC/世界/机缘/修仙百艺/灵宠/存档/事件/地图） |
| `Core/DataManager.cs` | 125 | data层 | ScriptableObject数据资产容器 |
| `Core/GameManager.cs` | 146 | app入口 | 游戏生命周期控制、存档流程 |
| `Engine/RealmEngine.cs` | 164 | realm.ts + realms.ts | 10境界系统、经验值表、寿元表 |
| `Engine/BattleEngine.cs` | 131 | battle相关 | 回合制战斗、伤害计算、天劫 |
| `Engine/ClockEngine.cs` | 120 | clock.ts | 时间系统（360天/年）、章节↔天数双向映射 |
| `Engine/TravelEngine.cs` | 185 | travel.ts + mapGate.ts | 旅行路径规划、传送、旅途奇遇 |
| `Engine/RealmBreakthroughEngine.cs` | 112 | realm.ts + realms.ts | 突破概率、18倍跨大境界战力、天劫强度 |
| `Engine/TurnEngine.cs` | 238 | turnEngine.ts (57KB) | 核心回合循环、10种行动类型分派、修炼效率五因子计算 |
| `Engine/MechanicsEngine.cs` | 198 | mechanics.ts (13.5KB) | 10种异能原型、平衡约束、边际递减 |
| `Engine/WorldEvolutionEngine.cs` | 144 | worldEvolution.ts | NPC人口、势力消长、天道事件 |

### 核心数值设计（忠实映射原版）

- **境界系统**：10大境界（引气入体→道元无极），每境界4子境界，炼气期13层
- **修炼难度**：`5 × 2.5^(index-1)` — 筑基5 / 结丹13 / 元婴31 / 化神78...
- **跨大境界战力**：18^境界index 为底数的指数级计算
- **修炼效率**：灵根倍率 × 灵脉系数（0~2.5x） × 悟性系数（0→1/3, 50→1, 100→3） × 境界难度倒数 × 化神法则（人界0.5x）
- **世界地图**：45个地点，7大区域（人界5子区 + 灵界 + 魔界 + 仙界）

## 项目结构

```
Assets/
├── Scripts/
│   ├── Core/          # 核心类型与游戏管理
│   │   ├── GameTypes.cs
│   │   ├── DataManager.cs
│   │   └── GameManager.cs
│   └── Engine/        # 游戏引擎
│       ├── RealmEngine.cs
│       ├── BattleEngine.cs
│       ├── ClockEngine.cs
│       ├── TravelEngine.cs
│       ├── RealmBreakthroughEngine.cs
│       ├── TurnEngine.cs
│       ├── MechanicsEngine.cs
│       └── WorldEvolutionEngine.cs
│   └── UI/            # UI控制器（待映射 — 16个React组件）
│   └── Data/          # 数据资产（待转存 — 19个TS数据文件）
├── Scenes/            # 场景文件（待创建）
└── Resources/         # 运行时资源
```

## 开发环境

- **Unity 版本**：2022.3.45f1 LTS
- **目标平台**：WebGL / Windows / macOS / Android / iOS
- **渲染管线**：Built-in（可按需升级至 URP）

## 构建与部署

### Unity WebGL 构建（本地桌面端）

1. 使用 Unity Hub 打开本项目（Unity 2022.3.45f1）
2. `File → Build Settings → WebGL → Switch Platform`
3. `Build` 输出到 `WebGL/` 目录
4. 构建产物可部署至任何静态托管（Vercel / Netlify / GitHub Pages）

### Vercel 部署

将 WebGL 构建产物推送到 GitHub 后，在 Vercel 中：
1. Import Git Repository
2. Framework Preset: `Other`
3. Output Directory: `WebGL`
4. 部署（Vercel 自动处理 WebGL 所需的 gzip/Brotli 压缩和 COOP/COEP 头）

## 待完成工作（WIP）

- [ ] 剩余 40 个引擎文件的详细映射（turnEngine.ts 完整10种行动、sect.ts宗门系统、procGen.ts程序生成、crafting.ts炼器炼丹等）
- [ ] 19 个数据文件转存为 JSON/ScriptableObject（realms/regions/techniques/beasts/sects 等）
- [ ] 16 个 React UI 组件映射为 Unity Canvas UI（CanonView → 叙事面板、CanonCreation → 角色创建、WorldMapView → 世界地图等）
- [ ] Unity 场景文件（MainScene.unity）
- [ ] Unity Editor 内 WebGL 构建（需 Unity 2022.3.45f1 桌面端）

## 版权声明

本项目基于《凡人修仙传》原著（作者：忘语）的正史世界观，仅用于学习与同人创作用途。

---

**道元纪 · 凡人修仙 · 文字冒险**
