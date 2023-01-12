const extractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
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
}