const webpackDevSever = require('webpack-dev-server');
const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.config');

const options = {
    contentBase: path.resolve(__dirname, '../'),
    hot: true,
    host: 'localhost',
    open: true
}
webpackDevSever.addDevServerEntrypoints(config, options);
const compiler = webpack(config);
const devServer = new webpackDevSever(compiler, options);
devServer.listen(8088, 'localhost', () => {
    console.log('devServer listening on port 8088');
});