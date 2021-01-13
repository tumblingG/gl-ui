const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    mode: 'development',

    entry: './demo/main.js',

    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, 'dist')
    },

    devtool: 'inline-source-map',

    devServer: {
        port: '8080',
        hot: true,
        clientLogLevel: 'error'
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
            src: path.resolve(__dirname, './src'),
        }
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false,
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false
                        }
                    },
                    'less-loader'
                ]
            },
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                )
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },

    plugins: [
        // 请确保引入这个插件来施展魔法
        new ESLintPlugin({
            extensions: ['js', 'vue'],
            failOnError: true
        }),
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            title: 'gl-ui',
            template: './demo/index.html',
            favicon: './demo/favicon.ico',
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};
