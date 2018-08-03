const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './main.js'], // 入口文件路径
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'index.js'
    },
    mode: 'development',
    optimization: {
        minimize: false
    },
    devtool: '#source-map',
    devServer: {
        inline: true,
        port: 3333,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.js$/, // babel 转换为兼容性的 js
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'latest'],
                    plugins: [ 'transform-decorators-legacy', 'transform-class-properties']
                }
            },
            {
                test: /\.less|\.css$/,
                use: [
                  'style-loader',
                  { loader: 'css-loader', options: { importLoaders: 1 } },
                  'less-loader'
                ]
              },

        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({template: './index.html'}),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
      ],
}
