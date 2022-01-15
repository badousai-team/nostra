/* eslint-disable global-require, no-confusing-arrow, max-len */
const { TARGET } = process.env
const ENV = process.env.NODE_ENV || 'development'
const isDebug = ENV !== 'production'

let dotEnvPath = '../../.env'
if (TARGET === 'production') {
  dotEnvPath = '../../.env.production'
} else if (TARGET === 'staging') {
  dotEnvPath = '../../.env.staging'
}
require('dotenv').config({ path: dotEnvPath })

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Dotenv = require('dotenv-webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const svgToMiniDataURI = require('mini-svg-data-uri')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

const isVerbose = process.argv.includes('--verbose') || process.argv.includes('-v')

const packageJson = require('./package.json')
const babelConfig = require('./.babelrc')

const analyze = process.argv.includes('analyze')

const PORT = process.env.SITE_PORT || 3000

// Webpack configuration (index.js => dist/main.{hash}.js)
// http://webpack.github.io/docs/configuration.html
const config = {

  target: 'web',

  mode: isDebug ? 'development' : 'production',

  bail: !isDebug,

  // The base directory for resolving the entry option

  // The entry point for the bundle
  entry: [
    './src/index.js',
  ],

  // Options affecting the output of the compilation
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    assetModuleFilename: 'assets/[hash][ext][query]',
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
  },

  // Developer tool to enhance debugging, source maps
  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: isDebug ? 'source-map' : false,

  resolve: {
    symlinks: false,
    alias: {
      site: path.resolve(__dirname, 'src'),
    },
    fallback: {
      fs: false,
      http: require.resolve('stream-http'),
    },
  },

  // What information should be printed to the console
  stats: {
    colors: true,
    reasons: isDebug,
    hash: isVerbose,
    version: isVerbose,
    timings: true,
    chunks: isVerbose,
    chunkModules: isVerbose,
    cached: isVerbose,
    cachedAssets: isVerbose,
    modules: false,
  },

  // The list of plugins for Webpack compiler
  plugins: [
    new NodePolyfillPlugin(),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
      __ENV__: `'${TARGET}'`,
      __VERSION__: JSON.stringify(packageJson.version),
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /yup$/,
    }),
    new webpack.LoaderOptionsPlugin({
      debug: isDebug,
      minimize: !isDebug,
    }),
    new Dotenv({
      path: dotEnvPath, // load this now instead of the ones in '.env'
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
      silent: true, // hide any errors
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.ejs'),
      config: { ENV },
      hash: isDebug,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    new CaseSensitivePathsPlugin(),
    new CopyPlugin({
      patterns: [
        path.resolve(__dirname, 'assets'),
      ],
    }),
  ],

  // Options affecting the normal modules
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/[/\\\\]node_modules[/\\\\]/], // exclude node_modules folder per default
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: [
          {
            loader: 'thread-loader',
          },
          {
            loader: 'babel-loader',
            options: {
              ...babelConfig,
              cacheDirectory: isDebug,
              compact: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          isDebug ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
        ],
      },
      {
        test: /\.svg/,
        type: 'asset/inline',
        generator: {
          dataUrl: (content) => svgToMiniDataURI(content.toString()),
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|ico|eot|ttf|wav|mp3|csv|mp4)$/,
        type: 'asset/resource',
      },
    ],
  },
}

// Optimize the bundle in release (production) mode
if (!isDebug) {
  config.plugins.push(new webpack.optimize.AggressiveMergingPlugin())
  config.plugins.push(new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css',
    chunkFilename: '[id].[contenthash].css',
  }))
  config.optimization = {
    nodeEnv: 'production',
    minimize: true,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
    emitOnErrors: true,
    runtimeChunk: 'multiple',
    splitChunks: {
      chunks: 'all',
    },
  }
} else {
  config.plugins.push(new ReactRefreshWebpackPlugin())
  config.devServer = {
    host: '0.0.0.0',
    port: PORT,
    contentBase: path.resolve(__dirname, 'dist'),
    compress: false,
    open: true,
    hot: true,
    disableHostCheck: true,
    historyApiFallback: true,
  }
  config.optimization = {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
    emitOnErrors: true,
  }
}

if (analyze) {
  config.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = config
