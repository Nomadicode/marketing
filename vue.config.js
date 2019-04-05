const path = require('path');
const PrerenderSPAPlugin = require('prerender-spa-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    configureWebpack: {
        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html',
                inject: false
            }),
            new PrerenderSPAPlugin({
                staticDir: path.join(__dirname, './dist'),
                routes: ['/'],
            })
        ],
    },
};