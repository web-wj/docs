# cli

脚手架工具是前端工程化中的发起者。

## 脚手架的作用

- 创建项目基础结构、提供项目规范和约定。
- 相同的文件组织结构
- 相同的开发范式
- 相同的模块依赖
- 相同的工具配置
- 相同的基础代码（仓库模板）

## 常用的脚手架工具

- create-react-app、vue-cli、angular-cli
- Yeoman：用于 Web 应用程序的开源客户端脚手架工具。
- Plop：Micro-generator framework that makes it easy for an entire team to create files with a level of uniformity.

## node 搭建 cli

- 需求：
    - 可以根据模板拉取代码，并自动安装依赖。
    - 约定路由设置。(类比 Nuxt.js)

- 实现步骤：
    1. 解释器类型 shebang `#!/usr/bin/env node` 。
    2. `npm link` 把你的包链接到全局。
    3. [commander](https://github.com/tj/commander.js/blob/master/Readme_zh-CN.md) 库 —— 完整的 node.js 命令行解决方案。

- 拓展

https://unix.stackexchange.com/questions/29608/why-is-it-better-to-use-usr-bin-env-name-instead-of-path-to-name-as-my
