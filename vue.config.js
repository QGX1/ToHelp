// const path = require('path')
// const webpack = require('webpack')
// function resolve (dir) {
//   return path.join(__dirname, dir)
// }
module.exports = {
  devServer: {
    // 设置代理
    proxy: {
      "/api": {
        target: "  http://192.168.43.177:5001", //服务端地址
        ws: true, // 是否启用websockets
        changOrigin: true, //开启代理
      }
    }
  }
};
