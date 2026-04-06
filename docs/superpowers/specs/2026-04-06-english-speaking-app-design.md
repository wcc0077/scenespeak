# SceneSpeak 英语口语学习应用 - 设计文档

**创建日期**: 2026-04-06  
**版本**: MVP v1.0  
**状态**: 待实现

---

## 1. 产品概述

### 1.1 核心理念

**SceneSpeak** 是一款以真实场景切入的英语口语学习应用，通过"场景→对话→句型→短语→单词"的线性递进学习流程，培养学习者的英语直觉思维。

### 1.2 目标用户

- 想提升实用口语的初级-中级学习者
- 有出国旅行、日常社交需求的人群
- 希望摆脱"翻译思维"、建立英语直觉的学习者

### 1.3 学习理念

1. **先整体感知** - 先看完整场景对话，建立语境感知
2. **再拆解句型** - 学习核心句型，掌握表达骨架
3. **然后学短语** - 掌握高频短语，丰富表达细节
4. **最后巩固单词** - 通过图片建立英语-实物直接联想
5. **全程录音对比** - 跟读-录音-对比，形成肌肉记忆

### 1.4 沉浸式体验原则

- **全程无中文** - 只用图片、表情、颜色、英文释义传达含义
- **培养英语直觉** - 强制建立英语直接联想，不经过中文翻译

---

## 2. 用户流程

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   首页      │───▶│  场景选择   │───▶│  场景入口   │
│ (今日学习)  │    │(社交/出行)  │    │ (封面图+   │
│             │    │             │    │  核心句)    │
└─────────────┘    └─────────────┘    └──────┬──────┘
                                             │
                    ┌────────────────────────┘
                    ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│  单词巩固   │◀───│  短语学习   │◀───│  句型学习   │
│ (图片+发音) │    │ (核心短语   │    │ (核心句型   │
│             │    │  录音对比)  │    │  录音对比)  │
└──────┬──────┘    └─────────────┘    └──────┬──────┘
       │                                      │
       │         ┌────────────────────────────┘
       │         ▼
       │    ┌─────────────┐
       │    │  对话学习   │
       │    │ (完整对话   │
       │    │  可跟读)    │
       │    └─────────────┘
       │
       ▼
┌─────────────┐    ┌─────────────┐
│  完成页     │───▶│  下一单元   │
│ (进度展示)  │    │  或场景列表 │
└─────────────┘    └─────────────┘
```

### 2.1 流程说明

- 每个环节必须完成才能进入下一步（线性递进）
- 不可跳跃，确保学习的系统性
- 录音对比环节是学习核心，建议停留时间最长

---

## 3. 技术架构

### 3.1 技术栈

| 类别 | 技术 | 说明 |
|------|------|------|
| 框架 | React 18 + TypeScript | 类型安全，生态成熟 |
| 构建 | Vite | 快速开发，PWA支持好 |
| 样式 | Tailwind CSS | 原子化CSS，移动端适配方便 |
| 状态 | Zustand | 轻量状态管理 |
| 路由 | React Router | 场景切换 |
| PWA | Vite PWA Plugin | 离线缓存、manifest生成 |
| 音频 | Web Audio API + MediaRecorder | 播放与录音 |
| 数据 | JSON静态文件 + localStorage | 场景内容 + 学习进度 |

### 3.2 项目结构

```
src/
├── components/        # 可复用组件
│   ├── AudioPlayer/   # 音频播放控制
│   ├── Recorder/      # 录音组件
│   ├── ProgressBar/   # 进度条
│   └── SceneCard/     # 场景卡片
├── scenes/            # 页面级组件
│   ├── Home/          # 首页
│   ├── SceneSelect/   # 场景选择
│   ├── Dialogue/      # 对话学习
│   ├── Sentences/     # 句型学习
│   ├── Phrases/       # 短语学习
│   ├── Vocabulary/    # 单词巩固
│   └── Complete/      # 完成页
├── data/              # 场景内容数据
│   ├── scenes/        # 场景JSON文件
│   └── index.ts       # 数据导出
├── hooks/             # 自定义hooks
│   ├── useAudio.ts    # 音频管理
│   ├── useRecorder.ts # 录音管理
│   └── useProgress.ts # 学习进度
├── store/             # Zustand状态
│   └── progressStore.ts
├── types/             # TypeScript类型
└── utils/             # 工具函数
```

---

## 4. 数据结构设计

### 4.1 核心类型定义

```typescript
// 场景
interface Scene {
  id: string;
  category: 'social' | 'travel';
  title: string;           // 英文标题
  coverImage: string;      // 场景图片
  description: string;     // 英文简短描述
  coreSentence: string;    // 场景核心句
  dialogue: Dialogue;      // 完整对话
  sentences: Sentence[];   // 核心句型
}

// 对话
interface Dialogue {
  id: string;
  context: string;         // 场景提示
  speakers: Speaker[];
  lines: Line[];
}

interface Speaker {
  id: string;
  name: string;
  avatar: string;
}

interface Line {
  speakerId: string;
  text: string;
  audioUrl?: string;
}

// 句型（学习重点）
interface Sentence {
  id: string;
  text: string;            // 句子
  audioUrl: string;        // 标准发音
  context: string;         // 使用场景（英文）
  phrases: Phrase[];       // 包含的短语
}

// 短语
interface Phrase {
  id: string;
  text: string;            // 短语
  meaning: string;         // 英文释义
  usage: string;           // 用法说明（英文）
  example: string;         // 例句
  words: Word[];           // 核心单词
}

// 单词
interface Word {
  id: string;
  word: string;
  phonetic: string;        // 音标
  meaning: string;         // 英文释义
  image: string;           // 配图
  audioUrl: string;        // 发音
}
```

### 4.2 学习进度存储

```typescript
interface ProgressStore {
  // 已完成场景
  completedScenes: string[];
  
  // 每个句型的学习记录
  sentenceProgress: {
    [sentenceId: string]: {
      recorded: boolean;     // 是否录过音
      attempts: number;      // 尝试次数
      lastStudied: string;   // ISO日期
    }
  };
  
  // 学习统计
  stats: {
    totalStudyTime: number;  // 分钟
    streakDays: number;      // 连续学习天数
    lastStudyDate: string;   // 最后学习日期
  };
}
```

---

## 5. 页面设计

### 5.1 首页（Home）

**布局**:
- 顶部：应用logo + 用户头像
- 中部：当日学习进度（圆形进度条 + "Today's Progress"）
- 下部：推荐场景卡片（大图 + 核心句预览）
- 底部导航：Home | Scenes | Stats

**交互**:
- 点击场景卡片进入场景选择页

### 5.2 场景选择（SceneSelect）

**布局**:
- 顶部：分类标签（Social | Travel）
- 中部：网格布局，每类2-3个场景卡片
- 每个场景：封面图 + 英文标题 + 完成状态（✓标记）

**场景列表**:
- **Social**: Greetings, Small Talk, Making Plans
- **Travel**: Airport Check-in, Hotel Check-in, Taking a Taxi

### 5.3 对话页（Dialogue）

**布局**:
- 顶部：场景标题 + 进度条（步骤1/5）
- 中部：对话气泡（A/B角色区分颜色，如蓝/绿）
- 底部："Start Learning Sentences" 按钮

**交互**:
- 点击句子播放音频
- 滑动查看完整对话
- 完成后点击进入句型学习

### 5.4 句型学习（Sentences）

**布局**:
- 顶部：进度条（步骤2/5）+ 句型计数（1/4）
- 中部：当前句型大字居中显示
- 音频控制：播放标准发音按钮
- 录音区域：按住录音，松手播放自己的录音
- 对比提示：波形图对比（视觉化展示差异）
- 底部：Previous | Next 导航，完成后进入短语学习

**交互**:
- 按住录音按钮开始录制
- 松手自动播放录音
- 可重复录制直到满意
- 标记为"Mastered"后进入下一句

### 5.5 短语学习（Phrases）

**布局**:
- 顶部：进度条（步骤3/5）+ 短语计数
- 卡片轮播：每个短语一张卡片
- 正面：短语 + 播放按钮
- 背面：英文释义 + 例句（点击翻转）
- 录音对比功能同句型页

### 5.6 单词巩固（Vocabulary）

**布局**:
- 顶部：进度条（步骤4/5）+ 单词计数
- 卡片布局：
  - 上部：配图（建立直观联想）
  - 中部：单词 + 音标
  - 下部：发音按钮 + 英文释义
- 录音跟读区域

**设计要点**:
- 配图代替中文释义，培养英语直觉
- 例句使用已学过的句型

### 5.7 完成页（Complete）

**布局**:
- 顶部：庆祝动画/图标
- 中部：学习统计
  - "Scene Completed!"
  - 学习时间
  - 掌握度展示（星星或百分比）
- 下部：推荐下一场景卡片

---

## 6. 音频处理方案

### 6.1 音频来源

| 阶段 | 方案 | 说明 |
|------|------|------|
| MVP | Web Speech API | 浏览器原生TTS，免费，无需服务器 |
| 后期 | ElevenLabs或真人录音 | 更自然的发音（可选升级） |

### 6.2 录音实现

- **API**: `MediaRecorder`
- **格式**: WebM（浏览器原生支持）
- **存储**: 临时Blob URL，对比完即释放，不持久化

### 6.3 音频播放

- **API**: `HTMLAudioElement`
- **功能**: 播放/暂停/重播
- **扩展**: 支持播放速度调节（0.8x / 1.0x / 1.2x）

---

## 7. PWA 与离线支持

### 7.1 Service Worker

使用 Vite PWA Plugin 自动生成，无需手动配置。

### 7.2 缓存策略

| 资源类型 | 策略 | 说明 |
|----------|------|------|
| 静态资源 | 预缓存 | JS/CSS/字体打包时缓存 |
| 场景音频 | 运行时缓存 | 首次播放后本地存储 |
| 图片 | 缓存优先 | 场景配图 |

### 7.3 离线体验

- 安装后完全离线可用（除首次需联网下载）
- 网络恢复时自动同步学习进度

### 7.4 Manifest 配置

```json
{
  "name": "SceneSpeak - 场景英语口语",
  "short_name": "SceneSpeak",
  "theme_color": "#4F46E5",
  "background_color": "#ffffff",
  "display": "standalone",
  "orientation": "portrait",
  "icons": [...]
}
```

---

## 8. 内容规划（MVP）

### 8.1 日常社交（Social）

| 场景 | 英文标题 | 核心句 | 句型数 |
|------|----------|--------|--------|
| 问候介绍 | Greetings | Nice to meet you. | 3 |
| 闲聊话题 | Small Talk | How's your day going? | 3 |
| 邀约安排 | Making Plans | Are you free this weekend? | 3 |

### 8.2 出行交通（Travel）

| 场景 | 英文标题 | 核心句 | 句型数 |
|------|----------|--------|--------|
| 机场值机 | Airport Check-in | I'd like to check in for my flight. | 4 |
| 酒店入住 | Hotel Check-in | I have a reservation. | 3 |
| 打车出行 | Taking a Taxi | Can you take me to...? | 3 |

### 8.3 内容组织

每个场景包含：
- 1 段对话（5-7 句）
- 3-4 个核心句型
- 每个句型 2-3 个短语
- 每个短语 2-3 个单词

**总计**: 6 个场景，预计学习内容可支撑 1-2 周日常使用。

---

## 9. 开发范围

### 9.1 包含功能

- [x] 首页与场景选择
- [x] 对话展示与音频播放
- [x] 句型学习（录音对比）
- [x] 短语学习（录音对比）
- [x] 单词巩固（图片+发音）
- [x] 学习进度追踪
- [x] PWA离线支持
- [x] 响应式移动端适配

### 9.2 不包含功能（未来迭代）

- [ ] AI发音评分
- [ ] 间隔重复复习算法
- [ ] 用户自定义场景
- [ ] 社交功能（排行榜、分享）
- [ ] 多语言支持
- [ ] 后端同步

---

## 10. 成功标准

### 10.1 用户体验

- 首次用户能在30秒内理解如何开始学习
- 完成一个场景的学习流程不超过15分钟
- 录音对比功能响应时间 < 1秒

### 10.2 技术指标

- 首屏加载时间 < 3秒（4G网络）
- Lighthouse PWA评分 > 90
- 支持 iOS Safari 和 Android Chrome

---

## 11. 附录

### 11.1 设计原则

1. **Immersive First** - 全程无中文，用视觉元素传达含义
2. **Progressive Disclosure** - 线性递进，逐步深入
3. **Active Learning** - 强调录音对比，主动输出
4. **Mobile Native** - 为移动端触摸优化

### 11.2 参考资源

- 配色方案：Indigo (#4F46E5) + White + Slate Gray
- 图标库：Lucide React
- 字体：System UI / Inter

---

**文档作者**: Claude Code  
**最后更新**: 2026-04-06
