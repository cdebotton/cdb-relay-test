import path from 'path';
import webpack from 'webpack';
import {green} from 'colors';
import {
  ReportStatsPlugin,
  WriteStatsPlugin,
} from './helpers/plugins';

const WEBPACK_PORT = process.env.WEBPACK_PORT || '3333';
const PUBLIC_PATH = `http://localhost:${WEBPACK_PORT}/`;

export default {
  devtool: "#eval",
  entry: {
    bundle: [
      `webpack-dev-server/client?${PUBLIC_PATH}`,
      'webpack/hot/only-dev-server',
      path.join(__dirname, '..', 'src', 'client.js'),
    ],
  },
  output: {
    path: path.join(__dirname, '..', 'public','build'),
    publicPath: PUBLIC_PATH,
    filename: '[hash].js',
    chunkFilename: '[chunkhash].js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel'],
      }
    ],
  },
  babel: {
    stage: 0,
    loose: ['all'],
    optional: ['runtime'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        NODE_ENV: 'development',
        BROWSER: true,
      }),
    }),
    new ReportStatsPlugin(),
    new WriteStatsPlugin(),
  ]
};
