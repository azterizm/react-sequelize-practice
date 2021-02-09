/** @type {import('webpack').Configuration} */
const path = require('path')
const webpackNodeExternals = require('webpack-node-externals')

module.exports = [
  {
    name: 'client',
    entry: './src/client.tsx',
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'build')
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
          loader: 'awesome-typescript-loader',
          options: {useCache: true}
        },
      ]
    },
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
          loader: 'awesome-typescript-loader',
        },
      ]
    },
  }
]
