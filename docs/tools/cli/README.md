# cli

脚手架工具是前端工程化中的发起者。

## 脚手架的作用

> 创建项目基础结构、提供项目规范和约定。

- 相同的文件组织结构
- 相同的开发范式
- 相同的模块依赖
- 相同的工具配置
- 相同的基础代码（仓库模板）

## 常用的脚手架工具

- create-react-app vue-cli angular-cli

### Yeoman（老牌通用）

#### 基本使用

- 在全局安装 yo
  - `npm install yo --global` 或 `yarn global add yo`
- 安装对应的 generator
  - `npm install generator-node --global` 或 `yarn global add generator-node`
 - 通过 yo 运行 generator
  - `yo node`

- generator-node 子集的生成器 - 变成 cli 应用
  - `yo node:cli`
  - `yarn link`
  - `yarn`
  - `my-module --help`

- 自定义 generator
  - 本质就是一个 npm 模块
  - ejs 语法

### Plop

项目过程中创建文件


### node 搭建 cli

