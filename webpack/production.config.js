import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import {
  ReportStatsPlugin,
  WriteStatsPlugin,
} from './helpers/plugins';

const PUBLIC_PATH = `/build/`;

export default {
  entry: {
    bundle: path.join(__dirname, '..', 'src', 'client.js'),
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
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract('style', 'css!stylus'),
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      }
    ],
  },
  babel: {
    stage: 0,
    loose: [
      'all'
    ],
    optional: [
      'runtime'
    ],
  },
  stylus: {
    use: [
      require('nib')(),
      require('rupture')(),
    ],
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false,
        screw_ie8: true,
      },
    }),
    new ExtractTextPlugin('/stylesheets/[hash].css'),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        NODE_ENV: 'production',
        BROWSER: true,
      }),
    }),
    new ReportStatsPlugin(),
    new WriteStatsPlugin(),
  ]
};
