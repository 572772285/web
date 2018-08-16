const path = require('path');

module.exports = {
  mode:'development',
  //入口文件
  // entry: './src/index.js',
  entry:{
    common:'./src/common/index.js',
    index:'./src/index/index.js',
  },
  //出口文件
  output: {
    filename: '[name].bundle.js',
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
      }
    ]
  } 
};