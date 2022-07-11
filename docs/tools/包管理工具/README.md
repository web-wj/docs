# 包管理工具

## npm

- 解决 This is probably not a problem with npm. There is likely additional logging output above.
  - 解决步骤：
    - 首先删除 node_modules
    - 删除 package-lock.json 文件
    - npm cache clean --force
    - npm install

## yarn

> yarn最初比npm多个lock。


## pnpm

> pnpm 使用本地链接节省了硬盘和时间。

- 树形结构、解决长路径以及重复依赖。
- 只能使用直接依赖，不能使用间接依赖。
  - 很多包使用了间接依赖会导致 pnpm 使用出问题。

## ni

> 在它运行之前，它会检测你的 yarn.lock pnpm-lock.yaml package-lock.json以了解当前的包管理器，并运行相应的命令。
