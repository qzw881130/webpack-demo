const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin= require('html-webpack-plugin');
const extractTextPlugin = require("extract-text-webpack-plugin");

var website ={
    publicPath:"http://127.0.0.1:1717/"
}

module.exports = {
    entry: {
        entry: './src/entry.js',
        entry2: './src/entry2.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath:website.publicPath
    },
    module: {
        rules: [
            {
              test: /\.css$/,
            //   include: path.resolve(__dirname, "src"),
              use: extractTextPlugin.extract({
                fallback: "style-loader",
                use: [
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'postcss-loader'
                ]
              })
            },{
                test:/\.(png|jpg|gif)/ ,
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:500000, //是把小于500000B的文件打成Base64的格式，写入JS。
                        outputPath: 'images/',
                    }
                }]
            }, {
                test: /\.(htm|html)$/i,
                use: ['html-withimg-loader']
            }, {
                test: /\.less$/,
                use: extractTextPlugin.extract({
                    use: [{
                        loader: "css-loader" // compiles Less to CSS
                    },{
                        loader: "less-loader" // translates CSS into CommonJS
                    }],
                    fallback: "style-loader"
                })
            },{
                test: /\.scss|\.sass$/,
                use: extractTextPlugin.extract({
                    use: ["css-loader", "sass-loader"],
                    fallback: 'style-loader',
                })
            }
          ]
    },
    plugins: [
        // new uglify(),
        new htmlPlugin({
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            template:'./src/index.html'

        }),
        new extractTextPlugin("/css/index.css"),

    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: '127.0.0.1',
        compress: true,
        port: 1717
    },
}