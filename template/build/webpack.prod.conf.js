var config = require('./config')('production')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var scssLoaders = ExtractTextPlugin.extract({
  use: [
    'css-loader',
    'postcss-loader',
    {
      loader: 'sass-loader',
      options: config.sassLoaderOptions
    }
  ],
  fallback: 'vue-style-loader'
})

// remove old assets
require('child_process').exec('rm -rf ' + config.outputPath)

module.exports = {
  entry: config.entry,

  output: {
    path: config.outputPath,
    filename: '[name].js?[chunkhash]' // for multi chunks
  },

  resolve: config.resolve,
  resolveLoader: config.resolveLoader,

  plugins: [
    new ExtractTextPlugin('[name].css?[contenthash]'),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest'],
      minChunks: Infinity
    })
  ].concat(config.plugins),

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: [
              'vue-style-loader',
              'css-loader'
            ],
            scss: scssLoaders
          }
        }
      },

      {
        // scss
        test: /\.scss$/,
        use: scssLoaders
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },

      {
        test: /\.svg$/,
        use: [
          'svg-sprite-loader',
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { removeTitle: true },
                { removeAttrs: { attrs: '(class|fill)' } }
              ]
            }
          }
        ]
      },

      {
        test: /\.(png|jpg)$/,
        use: [
          'url-loader?limit=10000&name=[path][name].[ext]?[hash]',
          'image-webpack-loader'
        ]
      }
    ]
  }
}
