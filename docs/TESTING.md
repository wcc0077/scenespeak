# SceneSpeak 测试指南

## 测试架构

本项目使用多层测试策略：

1. **单元测试** - Vitest + React Testing Library
   - 组件渲染测试
   - Hook 逻辑测试
   - Store 状态测试

2. **E2E 测试** - Playwright
   - 端到端用户流程测试
   - 移动端响应式测试
   - 跨浏览器兼容性测试

## 运行测试

```bash
# 运行单元测试（开发模式）
npm run test

# 运行单元测试（CI模式）
npm run test -- --run

# 运行单元测试并生成覆盖率报告
npm run test:coverage

# 运行 E2E 测试
npm run test:e2e

# 运行 E2E 测试（带UI）
npm run test:e2e:ui

# 查看 E2E 测试报告
npm run test:e2e:report
```

## 测试文件结构

```
src/
├── components/
│   ├── AudioPlayer.test.tsx    # 组件单元测试
│   ├── ProgressBar.test.tsx
│   └── SceneCard.test.tsx
├── hooks/
│   ├── useAudio.test.ts        # Hook 单元测试
│   └── useRecorder.test.ts
├── store/
│   └── progressStore.test.ts   # Store 单元测试
└── test/
    └── setup.ts                # 测试配置和 mock

e2e/
├── home.spec.ts                # 首页 E2E 测试
├── scene-select.spec.ts        # 场景选择 E2E 测试
├── learning-flow.spec.ts       # 学习流程 E2E 测试
└── mobile.spec.ts              # 移动端 E2E 测试
```

## 回归测试清单

每次迭代前运行以下测试：

- [ ] 单元测试全部通过
- [ ] E2E 测试全部通过
- [ ] 手动测试关键用户路径
- [ ] 移动端响应式测试
- [ ] PWA 离线功能测试

## 测试覆盖目标

- 单元测试覆盖率 > 70%
- 核心组件 100% 覆盖
- 关键用户流程 E2E 覆盖
