<h2 align="center">webpack配置优化（react）</h2>

### 基础配置

> \# 新建目录，并进入
> <font color=red>mkdir</font> react-webpack <font color=brown>&&</font> <font color=red>cd</font> <font color=orange>$_</font>

> \# 创建 package.json
> <font color=red>npm/yarn</font> init -y

> \# 安装 react react-dom 依赖
> <font color=red>npm i (install) / yarn add</font> react react-dom

> \# 安装 webpack 和 webpack-cli 开发依赖
> <font color=red>npm i (install) / yarn add</font> webpack webpack-cli <font color=red>-D</font>

> \# 安装 babel
> <font color=red>npm i (install) / yarn add</font> babel-loader @babel/core @babel/preset-env <font color=red>-D</font>

> \# 安装 babel preset-react
> <font color=red>npm i (install) / yarn add</font> @babel/preset-react <font color=red>-D</font>

使用react的JSX语法，需要babel编译，新建**webpack.config.js**

> Tips：注意这里将 Babel 的配置放到 webpack.config.js 中，没有单独放到 .babelrc，这是推荐写法，有些打包器不支持，显性声明配置，还能第一时间在 webpack 配置中找到。

使用 **`html-webpack-plugin`** 插件，复制 index.html 到 dist 文件夹下

1.安装 `html-webpack-plugin` 插件
  > <font color=red>npm i / yarn add</font> html-webpack-plugin <font color=red>-D</font>

将执行 webpack 打包的命令放到 npm 的 scripts 下

```json
{
  "scripts": {
    "build": "webpack --mode production"
  }
}
```

#### React 的开发阶段配置

##### 配置 React 开发的 webpack-dev-server

使用 `webpack-dev-server` 搭建一个本地开发服务， 安装依赖

> **``` yarn add webpack-dev-server -D ```**

在 `package.json` 增加 `start` 命令

```json
{
  "scripts": {
    ...
    "start": "webpack-dev-server --mode development --open
  }
}
```

为了方便开发，新建测试的配置文件：`webpack.config.dev.js`

> 可以拆分 webpack 配置文件，将公共部分放到 webpack.config.base.js ，然后使用 <font color=red>webpack-merge</font> 来合并配置项

##### 配置 React 的 HMR

热更新是开发阶段很好用的一个功能，配置后，在开发中修改代码，页面将无刷新更新对应的内容

> webpack.config.dev.js 做完对 HMR 的配置后，需要在入口文件出，添加对应 HMR 实现需要的代码， 但是直接写在 source 文件中，侵入性太大，所以建议独立放入一个 js 文件中，然后修改 webpack.config.dev.js 的 entry，将 源代码的入口文件 和 独立出来的文件合并。