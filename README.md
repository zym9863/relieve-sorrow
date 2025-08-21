# 解忧 - Relieve Sorrow

一个基于 Ionic React 的移动应用，帮助用户记录心情、分享感受，获得心灵慰藉。

## 📱 功能特色

### 🍷 时光酒杯
- 记录每日心情和生活点滴
- 为不同的情绪举杯
- 查看历史记录，回顾过往时光

### ✨ 灵魂回响  
- 将心事装进漂流瓶，投向远方
- 捡起他人的漂流瓶，给予温暖回应
- 与陌生灵魂建立共鸣连接

### 🏠 首页
- 每日寄语，带来正能量
- 统计数据展示
- 快速访问各功能模块

## 🚀 快速开始

### 环境要求
- Node.js 16+
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建项目
```bash
npm run build
```

### 预览构建结果
```bash
npm run preview
```

## 🧪 测试

### 运行单元测试
```bash
npm run test.unit
```

### 运行端到端测试
```bash
npm run test.e2e
```

### 代码检查
```bash
npm run lint
```

## 🛠️ 技术栈

- **框架**: Ionic React
- **语言**: TypeScript
- **路由**: React Router
- **构建工具**: Vite
- **移动端**: Capacitor
- **测试**: Vitest, Cypress
- **代码规范**: ESLint

## 📂 项目结构

```
relieve-sorrow/
├── src/
│   ├── components/     # 通用组件
│   ├── pages/          # 页面组件
│   │   ├── Home.tsx        # 首页
│   │   ├── GobletOfTime.tsx   # 时光酒杯
│   │   └── EchoesOfSoul.tsx   # 灵魂回响
│   ├── services/       # 服务层
│   │   ├── storage.ts      # 本地存储服务
│   │   └── echoService.ts  # 漂流瓶服务
│   ├── types/          # TypeScript 类型定义
│   ├── theme/          # 主题样式
│   └── App.tsx         # 应用主入口
├── public/             # 静态资源
└── package.json        # 项目配置
```

## 🎨 主题定制

应用支持深色模式，会自动跟随系统主题设置。可以在 `src/theme/variables.css` 中自定义主题颜色。

## 📝 版本信息

当前版本: v1.0.0

## 💡 特性

- 📱 跨平台支持 (iOS/Android/Web)
- 🌙 深色模式
- 💾 本地数据存储
- 🎨 精美的 UI 设计
- ⚡ 快速响应
- 🔒 用户隐私保护

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可

MIT License

---

**愿你被这世界温柔以待 ❤️**