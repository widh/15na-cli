const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/frontend/index.jsx',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { presets: ['@babel/env'] },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    alias: { 'react-dom': '@hot-loader/react-dom' },
  },
  output: {
    path: path.resolve(__dirname, 'public/dist/'),
    publicPath: '/',
    filename: 'dist/app.js',
  },
  devServer: {
    contentBase: path.join(__dirname, 'public/'),
    port: 14833,
    publicPath: 'http://localhost:14833/',
    hotOnly: true,
  },
  devtool: 'source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
