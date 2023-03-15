'use strict'
const path = require('path')
const { merge } = require('webpack-merge') // 管理配置文件
const tsImportPluginFactory = require('ts-import-plugin') // 按需引入
// const config = require('./config') // 根目录配置文件
const { name } = require('./package')

function resolve(dir) {
  return path.join(__dirname, dir)
}
// const { mockURL } = process.env.NODE_ENV? config[process.env.NODE_ENV] : 'https://www.zkrxlink.com/'
module.exports = {
  // publicPath: process.env.PUBLIC_PATH || '/',
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  parallel: process.env.NODE_ENV === 'development',
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    overlay: {
      warnings: false,
      errors: true
    },
    // proxy: {
    //   '/guoke-createfile/api/v1': {
    //     target: "http://10.0.3.251:8080",
    //     // pathRewrite: {
    //     //   '^/api/v1': ''
    //     // },
    //     secure: false,
    //     changeOrigin: true,
    //     logLevel: "debug"
    //   }
    // }
  },
  transpileDependencies: [
    'vuex-module-decorators'
  ],
  configureWebpack: {
    devtool: 'source-map',
    name: 'vue-h5-template',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
  chainWebpack(config) {
    // set ts-loader
    config.module
      .rule('ts')
      .use('ts-loader')
      .tap(options => {
        options = merge(options, {
          transpileOnly: true,
          // getCustomTransformers: () => ({
          //   before: [
          //     tsImportPluginFactory({
          //       libraryName: 'vant',
          //       libraryDirectory: 'es',
          //       style: true
          //     })
          //   ]
          // }),
          compilerOptions: {
            module: 'es2015'
          }
        })
        return options
      })
  },
  css: {
    extract: true,
    sourceMap: false,
    requireModuleExtension: true,
    // loaderOptions: {
    //   sass: {
    //     prependData: `
    //     @import "@/assets/scss/reset.scss";
    //     @import "@/assets/scss/variable.scss";`,
    //     sassOptions: {
    //       modules: true,
    //       exclude: [
    //         path.resolve(__dirname, "node_modules")
    //       ],
    //     }
    //   },
    //   css:{
    //     modules:{
    //       localIdentName: '[path][name]__[local]_[hash:base64:16]'
    //     },
    //   }
    // },
  },
}
