const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { execSync } = require('child_process');
const { dist } = require('../package.json').config;

const rootModulesPath = execSync('npm root -g').toString().trim();
const title = 'Vue Sample';

module.exports = {
  entry: {
    app: [
      './src/main',
    ],
    vendor: [
      'vue',
    ],
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    // Limit the module searching
    modules: [path.resolve('node_modules')],
    alias: {
      // vue pre-compile
      vue$: 'vue/dist/vue.esm.js',
      '@': path.resolve('src'),
    },
  },
  resolveLoader: {
    modules: [path.resolve('node_modules'), rootModulesPath],
  },
  sassLoaderOptions: {
    data: '@import "~@/style/variables";',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title,
      filename: 'index.html',
      template: 'build/index.ejs',
      inject: true,
    }),
  ],
  outputPath: path.resolve(dist),
};
