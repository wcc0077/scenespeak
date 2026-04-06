# SceneSpeak 🎙️

[![CI](https://github.com/wcc0077/scenespeak/actions/workflows/ci.yml/badge.svg)](https://github.com/wcc0077/scenespeak/actions/workflows/ci.yml)
![Tests](https://img.shields.io/badge/tests-6%20unit%20+%204%20e2e-blue)
![Coverage](https://img.shields.io/badge/coverage-30%25-yellow)
![License](https://img.shields.io/badge/license-MIT-green)

> 场景式英语口语学习应用 - 培养英语内核

## ✨ 特性

- 🎯 **场景切入学习** - 从真实对话场景开始，而非孤立单词
- 🗣️ **对话 → 句型 → 短语 → 单词** - 层层递进的学习路径
- 🎙️ **录音对比** - 录制自己的发音与原音对比
- 📱 **PWA 支持** - 可安装到手机桌面，离线可用
- 📊 **学习进度** - 追踪完成场景和学习统计

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 运行测试
npm run test              # 单元测试
npm run test:e2e          # E2E 测试
npm run verify            # 完整回归测试 (lint + test + build)
```

## 🧪 测试与回归

### 测试架构

| 层级 | 工具 | 覆盖范围 |
|------|------|----------|
| 单元测试 | Vitest + happy-dom | hooks, components, store |
| E2E 测试 | Playwright | 首页、场景选择、学习流程、移动端 |
| 健康检查 | Node.js 脚本 | 服务器、路由、PWA、构建 |

### 回归测试命令

```bash
# 一键完整回归测试
npm run verify

# 分步执行
npm run lint              # 代码检查
npm run test:ci           # 单元测试 (CI 模式)
npm run test:e2e          # E2E 测试
npm run build             # 构建验证

# 快速健康检查
npm run health-check
```

### CI/CD

- **PR 触发**: lint → 单元测试 → E2E 测试 → 构建
- **main 分支**: 自动部署到 GitHub Pages
- **测试报告**: 覆盖率自动上传到 Codecov

📖 [详细测试文档](./docs/TESTING.md)

## 📁 项目结构

```
src/
├── components/       # React 组件
├── hooks/           # 自定义 hooks (useAudio, useRecorder)
├── pages/           # 页面组件
├── store/           # Zustand 状态管理
├── data/            # 场景数据
├── types/           # TypeScript 类型
└── test/            # 测试配置

e2e/                 # Playwright E2E 测试
scripts/             # 构建脚本、健康检查
```

## 🛠️ 技术栈

- **框架**: React 18 + TypeScript
- **构建**: Vite 5 + PWA 插件
- **样式**: Tailwind CSS
- **状态**: Zustand + persist 中间件
- **路由**: React Router 6
- **测试**: Vitest + Playwright

## 📱 PWA 安装

### iOS Safari
1. 访问应用网页
2. 点击分享按钮 → "添加到主屏幕"

### Android Chrome
1. 访问应用网页
2. 点击菜单 → "安装应用"

## 📄 文档

- [测试指南](./docs/TESTING.md) - 测试策略与回归流程
- [设计文档](./docs/superpowers/specs/) - 产品设计与实现规划

## 📜 License

MIT
