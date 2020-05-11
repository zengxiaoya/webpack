const path = require('path');
const webpack = require('webpack');
const config = require('./base.config');
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'dev';
}
console.log(process.env.NODE_ENV);
const plugins = config[process.env.NODE_ENV].plugins || [];
module.exports = {
    mode: process.env.NODE_ENV === 'dev' ? 'development' : 'production',
    entry: config[process.env.NODE_ENV].entry,
    devtool: 'inline-source-map',
    output: Object.assign({
        libraryTarget: 'umd',
        libraryExport: 'default'
    }, config[process.env.NODE_ENV].output),
    resolve: {
        modules: [path.resolve(path.resolve(__dirname, '../src')), 'node_modules'],
        alias: {
            '@': path.resolve(__dirname, '../src')
        },
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ["es2015"]
                        ],
                        plugins: [
                            "transform-remove-strict-mode"
                        ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.(js)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                options: {
                    formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.(ts|tsx)$/,
                loader:'ts-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                loader: 'file-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        ...plugins
    ]
}