function SESWebSocket() {
    this.connectURL = 'ws://localhost:';
    this.prots = [70, 80, 81];
    this.index = 0;
    this.webSocketObj = null;
    this.status = 0;
    this.error = null;
    this.message = null;
    this.open = null;
    this.close = null;
    this.cache = [];   //如果在ws没准备好的情况下已经send了,就放到这里,等到准备好统一发送
    this.create(this.bindEvents);
}
SESWebSocket.prototype = {
    /**
     * 递归调用 找到对应的端口 
     * 当创建成功后 进行绑定事件
     */
    create: function(callback) {
        var self = this,
            connectURL = self.connectURL,
            index = self.index,
            prot = self.prots[index],
            ws = new WebSocket(connectURL + prot);
        //error继续递归
        ws.onerror = function(err) {
            self.index = ++self.index;
            self.create(callback);
        }
        //链接成功后,将ws赋值给this.webSocket;
        //并且清空当前ws的onerror和onopen事件
        ws.onopen = function() {
            self.webSocketObj = this;
            this.onerror = null;
            this.onopen = null;
            callback.call(self, ws);    //由于callback作为参数传递 this指向有变化 所以这里call一下 重新绑定一下指针
            self.sendCache();
        }
    },
    //暂存事件 等待webSocket建立好链接 绑定到实例上
    bindEvents: function(ws) {
        if (this.error) ws.onerror= this.error;
        if (this.message) ws.onmessage = this.message;
        if (this.close) ws.onclose = this.close;
        if (this.open) ws.onerror = this.open;
    },
    //如果链接已经创建成功,就直接绑定在实例上 如果没有
    onerror: function(fn) {
        if (this.webSocketObj && this.webSocketObj.readyState === 1) this.webSocketObj.onerror = fn;
        this.error = fn;
    },
    onmessage: function(fn) {
        if (this.webSocketObj && this.webSocketObj.readyState === 1) this.webSocketObj.onmessage = fn;
        this.message = fn;
    },
    onclose: function(fn) {
        if (this.webSocketObj && this.webSocketObj.readyState === 1) this.webSocketObj.onclose = fn;
        this.close = fn;
    },
    onopen: function(fn) {
        if (this.webSocketObj && this.webSocketObj.readyState === 1) this.webSocketObj.onopen = fn;
        this.open = fn;
    },
    sendCache: function() {
        var self = this,
            cache = self.cache,
            ws = this.webSocketObj;
        while(cache.length){
            ws.send(cache[0]);
            cache.shift();
        }
    },
    send: function(msg) {
        if (this.webSocketObj && this.webSocketObj.readyState === 1) {
            this.webSocketObj.send(msg);
        } else {
            this.cache.push(msg);
        }
    }
}

function FileTransfer() {
    this.ws = new SESWebSocket();
    this.islogin = false;
    this.uploadList = [];
    this.downloadList = [];
    this.islogin = false;
    this.ws.onmessage(this.responseEvent.bind(this));
}
FileTransfer.prototype = {
    //随机生成uuid 作为唯一识别码
    uuidGenerator: function() {
        var originStr = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
            originChar = '0123456789abcdef',
            len = originChar.length;
        return originStr.replace(/x/g, function(match) {
            return originChar.charAt(Math.ceil(Math.random()*len))
        })
    },
    //处理onmessage返回的数据,通过判断type,调用不同的函数
    responseEvent: function(e) {
        var self = this,
            data = JSON.parse(e.data.split(': ')[1]),
            type = data.type;
        if (type == 1) self.initResponse(data);
    },
    //登录
    init: function(uid, sessionid, callback) {
        var self = this,
            ws = self.ws,
            info = {},
            obj = {
                type: 1,
                id: self.uuidGenerator(),
                info: info
            };
        if(callback) self.callback = callback;
        //判断uid不为空字符串 不为undefined null 
        if (uid != undefined && uid !== '') info.user_id = uid;
        if (sessionid != undefined && uid !== '') info['X-LENOVO-SESS-ID'] = sessionid;
        info.result = 1;
        ws.send(JSON.stringify(obj));
    },
    //登录应答
    initResponse: function(data) {
        console.log(data);
        if (this.islogin) return false;       //防止重复登录
        var result = data.info.result;
        if (result == 1) this.islogin = true;
    },
    upload: function() {

    },
    uploadResponse: function(data) {

    }
    
    
}