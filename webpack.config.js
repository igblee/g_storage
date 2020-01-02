const path = require('path');
const shellJs = require('shelljs')
const merge = require('webpack-merge')
const fs = require('fs')
shellJs.exec('rm -rf dist/*')
const base = {
  mode: 'production',
  entry: path.join(__dirname, 'index.ts'),
  optimization: {
    minimize: true,
    removeAvailableModules: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial"
        }
      }
    }
  },
  externals: {
    'crypto-js': {
        commonjs: 'crypto-js',
        commonjs2: 'crypto-js',
        amd: 'crypto-js',
        root: 'cryptoJs'
    }
  },
  target: 'web',
  mode: 'production',
  devtool: 'cheap-module-source-map',
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: [{
        loader: 'tslint-loader',
        options: {
          configFile: './tslint.json',
          typeCheck: true,
          failOnHint: true
        }
      }]
    }, {
      test: /\.tsx?$/,
      loader: 'ts-loader'
    }]
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.ts', '.tsx']
  }
};

module.exports = [
  merge(base, {
    output: {
      filename: './storage-amd.js',
      path: path.join(__dirname, 'dist'),
      libraryTarget: 'amd',
      globalObject: 'this'

    }
  }),
  merge(base, {
    output: {
      filename: './storage-umd.js',
      path: path.join(__dirname, 'dist'),
      libraryTarget: 'umd',
      umdNamedDefine: true,
      globalObject: 'typeof self !== \'undefined\' ? self : this'
    }
  }),
  merge(base, {
    output: {
      filename: './storage-commonjs.js',
      path: path.join(__dirname, 'dist'),
      libraryTarget: 'commonjs',
      globalObject: 'this'
    }
  }),
  merge(base, {
    output: {
      filename: './storage-commonjs2.js',
      path: path.join(__dirname, 'dist'),
      libraryTarget: 'commonjs2',
      globalObject: 'this'
    }
  }),
  merge(base, {
    output: {
      filename: './storage-esm.js',
      path: path.join(__dirname, 'dist'),
      libraryTarget: 'commonjs-module',
      globalObject: 'this'
    }
  })
]