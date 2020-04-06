// 封装webSocket
export default {
    // 保证项目中只有一个socket实例
    ws: null,//websocket实例
    init(config, onMessage, onError) {
        // console.log(config)
        if (!this.ws) {
            // 不存在ws,则实例化webSocket,ws://192.168.43.177连接谁，是谁跟我建立通讯
            this.ws = new WebSocket(`ws://39.101.193.187:3030//${config.user}`)
        }
        // 客户端接收消息
        console.log('jkjk', onMessage)
        this.ws.onmessage = event => {
            console.log('nn', event.data)
            let message = JSON.parse(event.data);
            onMessage && onMessage(message); // 接收到消息触发的回调
        };
        // 出错
        this.ws.onError = error => {
            reconnect();
            onError && onError(error)
        }
        // 连接关闭
        this.ws.onclose = () => {
            this.ws = null;
            reconnect();
            console.log("关闭")
        }
    },
    // 客户端发送消息
    send(msgObj) {
        // 发送消息的时候触发该函数
        console.log('msgObj', msgObj)
        //添加状态判断，当为OPEN时，发送消息
        console.log(this.ws)
        if (this.ws.readyState == 1) {
            this.ws.send(JSON.stringify(msgObj));
        } else {
            // 重新连接
        }
    }
}