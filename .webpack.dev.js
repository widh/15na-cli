const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'components', 'index.tsx'),
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            query: {
              modules: {
                localIdentName: '[local]-[hash:base64:6]',
              },
              importLoaders: 1,
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            query: {
              modules: {
                localIdentName: '[local]-[hash:base64:6]',
              },
              importLoaders: 1,
              sourceMap: true,
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      components: path.resolve(__dirname, 'src', 'components'),
      assets: path.resolve(__dirname, 'src', 'assets'),
    },
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: path.join('dist', 'app.js'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 14833,
    publicPath: 'http://localhost:14833/',
    hotOnly: true,
  },
  devtool: 'source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
