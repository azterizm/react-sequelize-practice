/** @type {import('webpack').Configuration} */
const path = require('path')
const webpackNodeExternals = require('webpack-node-externals')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const LoadablePlugin = require('@loadable/webpack-plugin')

module.exports = [
  {
    name: 'client',
    entry: './src/client.tsx',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'build'),
      publicPath: '/'
    },
    target: 'web',
    mode: 'development',
    devtool: 'source-map',
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript'
            ],
            plugins: [
              '@loadable/babel-plugin'
            ]
          }
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/,
          type: 'asset'
        }
      ]
    },
    plugins: [
      new LoadablePlugin()
    ],
  },

  {
    name: 'server',
    entry: './src/server.tsx',
    output: {
      publicPath: '/',
      filename: 'server.js',
      path: path.resolve(__dirname, 'build')
    },
    target: 'node',
    mode: 'development',
    devtool: 'source-map',
    externals: [webpackNodeExternals()],
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {targets: {node: '10'}}],
              '@babel/preset-react',
              '@babel/preset-typescript'
            ],
            plugins: ['@loadable/babel-plugin']
          }
        },
        {
          test: /\.(png|svg|jpe?g|gif)$/,
          type: 'asset'
        }
      ]
    },
    plugins: [
      new CopyWebpackPlugin({patterns: [{from: 'public'}]})
    ],
  }
]
