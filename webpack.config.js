const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  // 入口
  entry: './src/index.js',
  /**
   * @prop {Object} 解析
  */
  resolve: {
    /**
     * @prop {Array} 扩展（文件后缀），使用户在引入模块是不带文件后缀
    */
    extensions: ['.wasm', '.mjs', '.js', '.json', '.jsx']
  },
  /**
   * @prop {Object} 模块
  */
  module: {
    /**
     * @prop {Array} 创建模块时，匹配请求的** 规则 **数组（修改模块创建方式，对其应用loader或修改解析器）
     * 
    */
    rules: [
      {
        test: /\.jsx?$/, // jsx js 文件的正则
        exclude: /node_modules/, // 排除 node_modules 文件夹
        use: [
          {
            // babel-loader具体的使用和配置优化，查webpack官网
            loader: 'babel-loader',
            options: {
              // babel 转义的配置选项
              babelrc: false,
              presets: [
                // 添加 preset-react
                require.resolve('@babel/preset-react'),
                [
                  require.resolve('@babel/preset-env'),
                  // 不编译模块，默认 auto
                  { modules: false }
                ]
              ],
              // 用来缓存 loader 的执行结果,之后的 webpack 构建，将会尝试读取缓存，来避免在每次执行时
              // Babel 重新编译过程, 默认的缓存目录 node_modules/.cache/babel-loader
              cacheDirectory: true
            }
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: 10 // 优先级
        },
        common: {
          name: "common",
          test: /[\\/]src[\\/]/,
          minSize: 1024,
          chunks: "all",
          priority: 5
        }
      }
    }
  },
  // 插件 Array
  plugins: [
    // *** CommonsChunkPlugin 在 webpack v4 已经被 optimization.splitChunks 替代 ***
    // 当多个 bundle 共享一些相同的依赖，提取这些依赖到共享的 bundle 中，来避免重复打包
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   filename: 'vendor-[contenthash].min.js'
    // }),
    // 使用 **`html-webpack-plugin`** 插件，复制 index.html 到 dist 文件夹下
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
  ]
}