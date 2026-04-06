# SceneSpeak 测试文档

> 测试策略、回归流程与开发指南

---

## 📊 测试状态

[![CI](https://github.com/wcc0077/scenespeak/actions/workflows/ci.yml/badge.svg)](https://github.com/wcc0077/scenespeak/actions/workflows/ci.yml)

| 指标 | 当前 | 目标 |
|------|------|------|
| 单元测试 | 6 个文件 | 20+ |
| E2E 测试 | 4 个文件 | 8+ |
| 覆盖率 | ~30% | 80%+ |
| CI 状态 | ✅ 通过 | - |

---

## 🏗️ 测试架构

### 三层测试策略

```
┌─────────────────────────────────────────────────────────┐
│  E2E 测试 (Playwright)                                  │
│  ├── home.spec.ts          # 首页功能                   │
│  ├── scene-select.spec.ts  # 场景选择                   │
│  ├── learning-flow.spec.ts # 学习流程                   │
│  └── mobile.spec.ts        # 移动端响应式               │
├─────────────────────────────────────────────────────────┤
│  集成测试                                               │
│  ├── health-check.mjs      # 7项健康检查                │
│  └── CI/CD pipeline                                     │
├─────────────────────────────────────────────────────────┤
│  单元测试 (Vitest + happy-dom)                          │
│  ├── hooks/                                             │
│  │   ├── useAudio.test.ts  # Web Speech API            │
│  │   └── useRecorder.test.ts # MediaRecorder           │
│  ├── components/                                        │
│  │   ├── AudioPlayer.test.tsx                          │
│  │   ├── ProgressBar.test.tsx                          │
│  │   └── SceneCard.test.tsx                            │
│  └── store/                                             │
│      └── progressStore.test.ts # Zustand               │
└─────────────────────────────────────────────────────────┘
```

---

## 🚀 快速命令

### 日常开发

```bash
# 单元测试 (开发模式，监听)
npm run test

# E2E 测试
npm run test:e2e

# E2E 带 UI 界面
npm run test:e2e:ui
```

### 回归测试

```bash
# ⭐ 一键完整回归测试 (推荐)
npm run verify
# 执行: lint → test:ci → build

# 分步执行
npm run lint              # ESLint 代码检查
npm run test:ci           # 单元测试 (CI模式，带覆盖率)
npm run test:e2e          # E2E 测试
npm run build             # TypeScript + Vite 构建

# 快速健康检查
npm run health-check
```

---

## 🔄 回归测试流程

### 每次迭代前必须执行

```bash
# 1. 运行健康检查 (7项检查)
node scripts/health-check.mjs

# 2. 运行单元测试
npm run test:ci

# 3. 运行 E2E 测试
npm run test:e2e

# 4. 验证构建
npm run build

# 或者一键完成
npm run verify
```

### CI/CD 自动化

**触发条件**:
- PR 到 main/develop 分支 → 运行 lint + test + e2e
- Push 到 main 分支 → 运行全部 + 自动部署

**GitHub Actions 配置**: `.github/workflows/ci.yml`

---

## 🧪 测试文件结构

```
src/
├── components/
│   ├── AudioPlayer.test.tsx    # 音频播放按钮测试
│   ├── ProgressBar.test.tsx    # 进度条组件测试
│   └── SceneCard.test.tsx      # 场景卡片组件测试
├── hooks/
│   ├── useAudio.test.ts        # Web Speech API hook
│   └── useRecorder.test.ts     # 录音 hook
├── store/
│   └── progressStore.test.ts   # Zustand 状态管理
└── test/
    └── setup.ts                # 测试配置和全局 mock

e2e/
├── home.spec.ts                # 首页 E2E 测试
├── scene-select.spec.ts        # 场景选择测试
├── learning-flow.spec.ts       # 学习流程测试
└── mobile.spec.ts              # 移动端响应式测试
```

---

## ✅ 测试覆盖清单

### 已覆盖

| 模块 | 文件 | 类型 |
|------|------|------|
| AudioPlayer | `src/components/AudioPlayer.test.tsx` | 组件 |
| ProgressBar | `src/components/ProgressBar.test.tsx` | 组件 |
| SceneCard | `src/components/SceneCard.test.tsx` | 组件 |
| useAudio | `src/hooks/useAudio.test.ts` | Hook |
| useRecorder | `src/hooks/useRecorder.test.ts` | Hook |
| progressStore | `src/store/progressStore.test.ts` | Store |
| 首页 | `e2e/home.spec.ts` | E2E |
| 场景选择 | `e2e/scene-select.spec.ts` | E2E |
| 学习流程 | `e2e/learning-flow.spec.ts` | E2E |
| 移动端 | `e2e/mobile.spec.ts` | E2E |

### 待补充 (高优先级)

| 模块 | 类型 | 说明 |
|------|------|------|
| Recorder | 组件 | 按住录音交互 |
| DialoguePlayer | 组件 | 对话播放 |
| LearningCard | 组件 | 学习卡片 |
| useSceneProgress | Hook | 场景进度计算 |
| useOffline | Hook | 离线状态检测 |

---

## 📝 编写新测试

### 单元测试示例

```typescript
// src/components/NewComponent.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { NewComponent } from './NewComponent';

describe('NewComponent', () => {
  it('renders correctly', () => {
    render(<NewComponent />);
    expect(screen.getByText('Expected Text')).toBeDefined();
  });

  it('handles click', () => {
    const mockOnClick = vi.fn();
    render(<NewComponent onClick={mockOnClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockOnClick).toHaveBeenCalled();
  });
});
```

### E2E 测试示例

```typescript
// e2e/new-feature.spec.ts
import { test, expect } from '@playwright/test';

test.describe('New Feature', () => {
  test('works as expected', async ({ page }) => {
    await page.goto('/new-feature');
    await expect(page.getByText('Feature')).toBeVisible();
    
    // 交互测试
    await page.click('button');
    await expect(page.getByText('Success')).toBeVisible();
  });
});
```

---

## 🔧 配置说明

### Vitest 配置 (`vitest.config.ts`)

```typescript
export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
```

### Playwright 配置 (`playwright.config.ts`)

- Desktop Chrome + Mobile Pixel 5
- 自动启动开发服务器
- 失败重试 2 次 (CI 模式)
- HTML 报告输出

---

## 📈 覆盖率目标

| 类型 | 目标 | 当前 | 差距 |
|------|------|------|------|
| 单元测试覆盖率 | 80% | ~30% | -50% |
| 核心组件 | 100% | 30% | -70% |
| E2E 关键流程 | 100% | 60% | -40% |

---

## 🐛 调试指南

### 测试失败排查

1. **查看错误日志**
   ```bash
   npm run test:ci 2>&1 | tee test.log
   ```

2. **E2E 失败截图**
   ```bash
   npm run test:e2e
   # 查看 playwright-report/
   npm run test:e2e:report
   ```

3. **健康检查失败**
   ```bash
   # 确保开发服务器在运行
   npm run dev &
   node scripts/health-check.mjs
   ```

---

## 🚧 持续改进

- [ ] 增加组件测试覆盖到 80%
- [ ] 添加视觉回归测试 (Storybook/Chromatic)
- [ ] 性能测试 (Lighthouse CI)
- [ ] API 契约测试 (如有后端对接)
- [ ] 测试并行化优化

---

**最后更新**: 2026-04-06
**版本**: v1.0.0
