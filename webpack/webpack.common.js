const Path = require('path');
const Webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    'js/index': Path.resolve(__dirname, '../src/js/index.js'),
    'js/admin': Path.resolve(__dirname, '../src/js/admin.js'),
    'js/register': Path.resolve(__dirname, '../src/js/register.js'),
    'js/registro-cursos': Path.resolve(__dirname, '../src/js/registro-cursos.js'),
    'css/index': Path.resolve(__dirname, '../src/scss/index.scss'),
  },
  output: {
    path: Path.join(__dirname, '../dist'),
    filename: '[name].min.js',
  },
  plugins: [
    new Webpack.ProvidePlugin({
      'mdb': 'mdb',
    }),
    new CopyWebpackPlugin([
      { from: Path.resolve(__dirname, '../src/index.html') },
      { from: Path.resolve(__dirname, '../src/register.html') },
      { from: Path.resolve(__dirname, '../src/registro_cursos.html') },
      { from: Path.resolve(__dirname, '../src/404.html') },
      { from: Path.resolve(__dirname, '../src/meta') },
      { from: Path.resolve(__dirname, '../src/admin'), to: 'admin' },
      { from: Path.resolve(__dirname, '../src/img'), to: 'img' },
      { from: Path.resolve(__dirname, '../src/misc'), to: 'misc' },
    ]),
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].min.css',
    }),
  ],
  resolve: {
    alias: {
      '~': Path.resolve(__dirname, '../src'),
      'mdb': Path.join(__dirname, '../node_modules/mdb-ui-kit'),
    },
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
          },
        },
      },
      {
        test: /\.s?css/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
};
