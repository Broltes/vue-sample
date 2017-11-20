var HtmlWebpackPlugin = require('html-webpack-plugin')
var path = require('path')
var { execSync } = require('child_process')
var { dist, devPort } = require('../package.json').config
var rootModulesPath = execSync('npm root -g').toString().trim()
var title = 'Vue Sample'

var config = {
  entry: {
    app: [
      './src/main'
    ],
    vendor: [
      'vue'
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    // Limit the module searching
    modules: [path.resolve('node_modules'), rootModulesPath],
    alias: {
      // vue pre-compile
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve('src')
    }
  },
  sassLoaderOptions: {
    data: '@import "~@/assets/scss/variables";'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title,
      filename: 'index.html',
      template: 'build/index.ejs',
      inject: true
    })
  ],
  outputPath: path.resolve(dist)
}

module.exports = function(ENV) {
  if (ENV === 'development') {
    Object.assign(config, {
      entry: config.entry.app,
      port: devPort
    })
  }

  return config
}
