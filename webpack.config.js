const path = require('path');

module.exports = {
  entry: ['./index.ts'],
  target: "web",
  output: {
    filename: 'combined.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'chatdownloader',
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  optimization: {
      minimize: false
  },
};