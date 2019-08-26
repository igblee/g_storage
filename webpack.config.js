const path = require('path');
const library = 'storage';
module.exports = {
  mode: 'production',
  entry: path.join(__dirname, 'index.ts'),
  output: {
    library: {
      root: library,
      amd: `${library}.amd`,
      commonjs: `${library}.common`
    },
    libraryTarget: 'umd',
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
    globalObject: 'this'
  },
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
  },
  devtool: 'cheap-module-eval-source-map',
};