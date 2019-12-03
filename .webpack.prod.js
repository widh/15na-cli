const path = require('path');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src', 'components', 'main.tsx'),
    alert: path.resolve(__dirname, 'src', 'components', 'alert.tsx'),
  },
  mode: 'production',
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
                localIdentName: '[hash:base64]',
              },
              importLoaders: 1,
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
                localIdentName: '[hash:base64]',
              },
              importLoaders: 1,
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
    },
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: path.join('dist', '[name].js'),
  },
};
