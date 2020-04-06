module.exports = {
  devServer: {
    // 设置代理
    proxy: {
      "/api": {
        target: "http://39.101.193.187:5001/", //服务端地址
        ws: true, // 是否启用websockets
        changOrigin: true, //开启代理
      }
    }
  }
};
