# SceneSpeak 测试与回归测试指南

## ✅ 当前状态

**健康检查**: 7/7 通过 ✓

| 检查项 | 状态 |
|--------|------|
| 开发服务器运行 | ✅ |
| 首页路由 | ✅ |
| 场景选择路由 | ✅ |
| 对话页路由 | ✅ |
| PWA 图标 | ✅ |
| PWA 配置 | ✅ |
| 构建成功 | ✅ |

## 🧪 测试套件

### 1. 单元测试 (Vitest)

**位置**: `src/**/*.test.{ts,tsx}`

**组件测试**:
- `AudioPlayer.test.tsx` - 音频播放按钮测试
- `ProgressBar.test.tsx` - 进度条组件测试
- `SceneCard.test.tsx` - 场景卡片组件测试

**Hook 测试**:
- `useAudio.test.ts` - Web Speech API hook 测试
- `useRecorder.test.ts` - 录音 hook 测试

**Store 测试**:
- `progressStore.test.ts` - Zustand 状态管理测试

**运行命令**:
```bash
# 开发模式（监听）
npm run test

# CI 模式（运行一次）
npm run test -- --run

# 带覆盖率报告
npm run test:coverage
```

### 2. E2E 测试 (Playwright)

**位置**: `e2e/*.spec.ts`

**测试文件**:
- `home.spec.ts` - 首页功能测试
- `scene-select.spec.ts` - 场景选择测试
- `learning-flow.spec.ts` - 学习流程测试
- `mobile.spec.ts` - 移动端响应式测试

**运行命令**:
```bash
# 运行所有 E2E 测试
npm run test:e2e

# 带 UI 界面
npm run test:e2e:ui

# 查看报告
npm run test:e2e:report
```

### 3. 健康检查

**位置**: `scripts/health-check.mjs`

```bash
node scripts/health-check.mjs
```

检查内容：
- 开发服务器状态
- 关键路由可访问性
- PWA 资源完整性
- 构建成功率

## 🔄 回归测试流程

### 每次迭代前执行

```bash
# 1. 运行健康检查
node scripts/health-check.mjs

# 2. 运行单元测试
npm run test -- --run

# 3. 运行 E2E 测试（可选，耗时较长）
npm run test:e2e

# 4. 验证构建
npm run build
```

### CI/CD 自动化

**GitHub Actions** 配置 (`.github/workflows/ci.yml`):
- PR 时自动运行单元测试和 E2E 测试
- 代码合并到 main 时自动构建部署

### 手动测试清单

**核心功能**:
- [ ] 首页显示正常
- [ ] 场景列表可切换分类
- [ ] 点击场景进入对话页
- [ ] 对话播放按钮可用
- [ ] 句型学习页面可录音
- [ ] 短语卡片可翻转
- [ ] 单词学习页面显示图片
- [ ] 完成页显示统计

**PWA 功能**:
- [ ] 可安装到桌面
- [ ] 离线可用
- [ ] Service Worker 运行正常

**移动端**:
- [ ] 响应式布局正常
- [ ] 触摸交互可用
- [ ] 底部导航正常

## 📊 覆盖率目标

| 类型 | 目标 | 当前 |
|------|------|------|
| 单元测试 | > 70% | 待测量 |
| 核心组件 | 100% | 进行中 |
| E2E 关键流程 | 100% | 进行中 |

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 运行健康检查
node scripts/health-check.mjs

# 运行测试
npm run test -- --run
```

## 📝 添加新测试

### 单元测试示例

```typescript
// src/components/NewComponent.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NewComponent } from './NewComponent';

describe('NewComponent', () => {
  it('renders correctly', () => {
    render(<NewComponent />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
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
  });
});
```

## 🔧 配置说明

- **Vitest**: `vitest.config.ts`
- **Playwright**: `playwright.config.ts`
- **测试工具**: `@testing-library/react`, `@testing-library/jest-dom`

## 📈 持续改进

- [ ] 增加更多组件测试
- [ ] 添加视觉回归测试
- [ ] 性能测试 (Lighthouse CI)
- [ ] 增加测试覆盖率到 80%

---

**最后更新**: 2026-04-06
**版本**: v1.0.0
