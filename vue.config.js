const path = require('path')

module.exports = {  
  // 基本路径
  publicPath: process.env.NODE_ENV === 'production' ? '' : '',  
  // 输出文件目录
  outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',  
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // 是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,  
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,  
  // 生成的 HTML 中的 <link rel="stylesheet"> 和 <script> 标签上启用 Subresource Integrity (SRI)
  integrity: false,  
  // webpack相关配置
  configureWebpack: config => { // webpack配置，值位对象时会合并配置，为方法时会改写配置
        if (debug) { // 开发环境配置
            config.devtool = 'cheap-module-eval-source-map'
        } else { // 生产环境配置
        }
         Object.assign(config, { // 开发生产共同配置，配置别名
             resolve: {
                 alias: {
                     '@': path.resolve(__dirname, './src'),
                     '@c': path.resolve(__dirname, './src/components'),
                    'vue$': 'vue/dist/vue.esm.js'
                }
            }
         })
    },
  chainWebpack: (config) => {
  },
  configureWebpack: (config) => {    
  if (process.env.NODE_ENV === 'production') {      
      // 生产环境
      config.mode = 'production'
    } else {      
      // 开发环境
      config.mode = 'development'
    }
  },  
  // css相关配置
  css: {
    requireModuleExtension: true,
    // 是否分离css（插件ExtractTextPlugin）
    extract: true,    
    // 是否开启 CSS source maps
    sourceMap: false,   
    // css预设器配置项
    loaderOptions: {
        scss: {
            prependData: `@import "./src/styles/main.scss";`
          },
    },    
    // 是否启用 CSS modules for all css / pre-processor files.
    // modules: false
  },  
  // 是否使用 thread-loader
  parallel: require('os').cpus().length > 1, 
  // PWA 插件相关配置
  pwa: {}, 
  // webpack-dev-server 相关配置
  devServer: {
    open: false, //编译完是否打开网页
    host: '0.0.0.0', // 指定使用地址，默认localhost,0.0.0.0代表可以被外界访问
    port: 8080, // 访问端口
    https: false,// 编译失败时刷新页面
    hot: true, // 开启热加载
    hotOnly: false,// 
    // http 代理配置
    proxy: null,
    before: (app) => {}
  }, 
  // 第三方插件配置
  pluginOptions: {

  }
}