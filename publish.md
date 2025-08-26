## 登录 npm 账户
npm login

### 检查并更新 package.json
确保 name 唯一，version 递增，main 指向正确入口文件
```json
{
  "name": "zero-element",
  "version": "1.1.11",
  "main": "lib/index.js",
  "files": ["lib", "dist"]
}
```

### 安装依赖
npm install

### 构建项目
npm run build

### 发布到 npm
npm publish
