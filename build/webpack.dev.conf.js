var config = require('./config')('development')
var webpack = require('webpack')

var scssLoaders = [
  'vue-style-loader',
  'css-loader',
  'postcss-loader',
  {
    loader: 'sass-loader',
    options: config.sassLoaderOptions
  }
]

module.exports = {
  entry: config.entry,

  output: {
    filename: '[name].js' // for multi chunks
  },

  resolve: config.resolve,

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin()
  ].concat(config.plugins),

  devServer: {
    noInfo: true,
    host: '0.0.0.0',
    port: config.port,
    disableHostCheck: true
  },
  devtool: '#cheap-module-eval-source-map',

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
        loader: 'file-loader'
      }
    ]
  }
}
