const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin= require('html-webpack-plugin');
const glob = require('glob');
const PurifyCSSPlugin = require("purifycss-webpack");
const extractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');


if(process.env.type == "build"){
    var website ={
        publicPath:"http://127.0.0.1:1717/"
    }
}else{
    var website ={
        publicPath:"http://localhost:1717/"
    }
}

module.exports = {
    devtool: 'source-map',
    entry: {
        app: './src/entry.js',
        app2: './src/entry2.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath:website.publicPath
    },
    module: require('./webpack_config/module.js'),
    plugins: [
        // new uglify(),
        new htmlPlugin({
            minify:{ removeAttributeQuotes:true },
            hash:true,
            template:'./src/index.html'
        }),
        new extractTextPlugin("/css/index.css"),
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'src/*.html')),
        }),
        //import third party plugins
        new webpack.ProvidePlugin({
            $$:"jquery"
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: '127.0.0.1',
        compress: true,
        port: 1717
    },
}