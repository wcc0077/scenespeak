#!/usr/bin/env node
/**
 * SceneSpeak 健康检查脚本
 * 用于验证应用基本功能是否正常
 */

import http from 'http';
import { execSync } from 'child_process';

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;

// 颜色输出
const colors = {
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
};

// 检查结果
let passed = 0;
let failed = 0;

function check(name, result, details = '') {
  if (result) {
    console.log(colors.green(`✓ ${name}`));
    passed++;
  } else {
    console.log(colors.red(`✗ ${name}`));
    if (details) console.log(colors.yellow(`  ${details}`));
    failed++;
  }
}

async function healthCheck() {
  console.log(colors.blue('🔍 SceneSpeak Health Check\n'));

  // 1. 检查开发服务器是否运行
  try {
    const response = await fetch(BASE_URL);
    check(
      'Development server is running',
      response.status === 200,
      `Status: ${response.status}`
    );
  } catch (error) {
    check('Development server is running', false, 'Server not responding. Run: npm run dev');
  }

  // 2. 检查关键路由
  const routes = ['/', '/scenes', '/scenes/greetings/dialogue'];
  for (const route of routes) {
    try {
      const response = await fetch(`${BASE_URL}${route}`);
      check(
        `Route ${route} is accessible`,
        response.status === 200,
        `Status: ${response.status}`
      );
    } catch (error) {
      check(`Route ${route} is accessible`, false, error.message);
    }
  }

  // 3. 检查静态资源
  try {
    const response = await fetch(`${BASE_URL}/icons/icon-192x192.png`);
    check(
      'PWA icons are accessible',
      response.status === 200,
      `Status: ${response.status}`
    );
  } catch (error) {
    check('PWA icons are accessible', false, error.message);
  }

  // 4. 检查 manifest
  try {
    const response = await fetch(`${BASE_URL}/manifest.webmanifest`);
    const manifest = await response.json();
    check(
      'PWA manifest is valid',
      manifest.name && manifest.icons && manifest.icons.length > 0,
      'Manifest missing required fields'
    );
  } catch (error) {
    check('PWA manifest is valid', false, error.message);
  }

  // 5. 检查构建
  try {
    execSync('npm run build', { stdio: 'pipe' });
    check('Build completes successfully', true);
  } catch (error) {
    check('Build completes successfully', false, 'Build failed. Check for TypeScript errors.');
  }

  // 总结
  console.log('\n' + colors.blue('📊 Summary'));
  console.log(colors.green(`  Passed: ${passed}`));
  console.log(failed > 0 ? colors.red(`  Failed: ${failed}`) : colors.green(`  Failed: ${failed}`));

  process.exit(failed > 0 ? 1 : 0);
}

healthCheck();
