const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const config = require('./config');
const components = require('../src/components.json');

const entries = {};
Object.keys(components).forEach(key => {
  const value = components[key];
  entries[key] = value.replace('./', './src/');
});

const webpackConfig = {
  mode: 'production',
  entry: entries,
  output: {
    path: path.resolve(process.cwd(), './lib'),
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[id].js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.js', '.vue', '.ts', 'tsx', '.json'],
    modules: ['node_modules']
  },
  externals: config.externals,
  performance: {
    hints: false
  },
  stats: 'none',
  optimization: {
    minimize: false
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|babel|es6)$/,
        exclude: config.jsexclude,
        loader: 'babel-loader'
      },
      {
        test: /\.(tsx?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
              transpileOnly: true,
              // declaration: true,
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false,
          }
        }
      }
    ]
  },
  plugins: [
    new ProgressBarPlugin(),
    new VueLoaderPlugin(),
    // new ForkTsCheckerWebpackPlugin({
    //   typescript: {
    //     extensions: {
    //       vue: true,
    //     },
    //     mode: 'write-dts',
    //     configOverwrite: {
    //       declaration: true,
    //     }
    //     // build: true,
    //   }
    // })
  ]
};

module.exports = webpackConfig;