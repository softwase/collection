const path = require('path');
const webpack = require('webpack');

const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const PATHS = {
  entry: path.resolve('src/core/index.tsx'),
  output: path.resolve('dist'),
  template: path.resolve('src/core/index.pug'),
  src: path.resolve('src')
}

module.exports = {
  devtool: 'source-map',
  entry: PATHS.entry,
  output: {
    filename: '[name].[contenthash].js',
    path: PATHS.output,
    publicPath: '/'
  },
  mode:  'development',
  devServer: {
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.pug$/,
        use: 'pug-loader'
      },
      {
        test: /\.[jt]sx?$/,
        include: PATHS.src,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: { plugins: ['react-refresh/babel'] },
          },
          {
            loader: 'ts-loader',
            options: { transpileOnly: true },
          },
        ].filter(Boolean),
      },
    ],
    
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: PATHS.template
    }),
    new CleanWebpackPlugin(),
    // new BundleAnalyzerPlugin({
    //   openAnalyzer: false
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    isDev && new ReactRefreshWebpackPlugin({
      overlay: {
          // integration with webpack-hot-middleware
          sockIntegration: 'whm',
      },
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: isDev ? '[id].css' : '[id].[contenthash].css',
    }),
  ].filter(Boolean),
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
    ],
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
       cacheGroups: {
         vendor: {
           test: /[\\/]node_modules[\\/]/,
           name: 'vendors',
           chunks: 'all',
         },
       },
     },
  },
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.css',
      '.sass',
      '.json'
    ],
    alias: {
      app:  'src/app/*',
      core:  'src/core/*'
    }
  },
};

