const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; // 打包分析插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 清空打包目录
const HtmlWebpackPlugin = require('html-webpack-plugin') // 抽取html
const name = 'demo';
const version = 'v1.0';
module.exports = {
    name,
    version,
    production: {
        entry: path.resolve(__dirname,'../src/index.ts'),
        output: {
            filename: `${name}-${version}[hash:5].js`,
            path: path.resolve(__dirname, '../dist')
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: './public/index.html' // html模块
            }),
            new CleanWebpackPlugin(),
            new BundleAnalyzerPlugin({
                analyzerMode: 'disabled', // 不启动展示打包报告的http服务器
                generateStatsFile: true, // 是否生成stats.json文件
            })
        ]
    },
    dev: {
        entry: path.resolve(__dirname,'../src/index.ts'),
        output: {
            filename: `${name}-${version}[hash:5].js`,
            path: path.resolve(__dirname, '../')
        },
        plugins: [ 
            new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/index.html' // html模块
        })]
    }
}