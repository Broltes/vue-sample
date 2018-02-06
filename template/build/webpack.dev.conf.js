const webpack = require('webpack');
const config = require('./config');
const { devPort } = require('../package.json').config;

const scssLoaders = [
  'vue-style-loader',
  'css-loader',
  'postcss-loader',
  {
    loader: 'sass-loader',
    options: config.sassLoaderOptions,
  },
];

module.exports = {
  entry: config.entry.app,

  output: {
    filename: '[name].js', // for multi chunks
  },

  resolve: config.resolve,
  resolveLoader: config.resolveLoader,

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"',
      },
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
  ].concat(config.plugins),

  devServer: {
    noInfo: true,
    host: '0.0.0.0',
    port: devPort,
    disableHostCheck: true,
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
              'css-loader',
            ],
            scss: scssLoaders,
          },
        },
      },

      {
        // scss
        test: /\.scss$/,
        use: scssLoaders,
      },

      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
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
                { removeAttrs: { attrs: '(class|fill)' } },
              ],
            },
          },
        ],
      },

      {
        test: /\.(png|jpg)$/,
        loader: 'file-loader',
      },
    ],
  },
};
