const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
  mode:'development',
  // mode:'production',
  //入口文件
  // entry: './src/index.js',
  entry:{
    index:'./src/index.js',
  },
  //出口文件
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
   module: {
    rules: [
    //处理css
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      //处理image
      {
        test:/\.(png|jpg|gif)$/,
        use:[
          'url-loader'
        ]
      },
        {
            test:/\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'react'],
                    plugins: [
                      ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }] // `style: true` 会加载 less 文件
                    ]
                }
            }               
        }
    ]
  },
  plugins:[
    new htmlWebpackPlugin({
        filename:'index.html',
        template:'./src/index.html',//模板文件
        inject:true,//脚本写在那个标签里,默认是true(在body结束后)
        hash:true//给生成的js/css文件添加一个唯一的hash
    }),
    new CleanWebpackPlugin(['dist']) 

],
  devServer: {
    contentBase: './dist',
    port:3001
  }
}