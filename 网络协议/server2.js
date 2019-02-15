const http = require('http');
http.createServer(function(request,response){
    console.log('request come',request.url);
    response.writeHead(200,{
        'Access-Control-Allow-Origin':'*', //跨域 任何域名的页面都可以返回这个服务
        // 'Access-Control-Allow-Origin':'http://192.168.1.40:8888', //浏览器认为这个和http://localhost:8888/不是一回事
        'Access-Control-Allow-Headers':'X-Test-Cors', //允许自定义头,预请求,先发送options
        'Access-Control-Allow-Methods':'POST, PUT, Delete',//允许发送默认方法(GET/POST/HEAD)之外的方法
        // 'Access-Control-Max-Age':'1000', //允许以↑↑这种方式进行跨域的请求的最长时间,1000秒之内不需要发预请求去验证了,直接发请求就可以

    })
    //请求已发送 内容已返回
    //只不过浏览器在解析返回的内容后发现是不允许的,然后被浏览器拦截掉了
    //浏览器发送请求的时候不知道是不是跨域
    //只不过浏览器在接收数据返回的时候没有看到Access-Control-Allow-Origin并设置为允许的头部的话
    //那么会忽略请求返回,并报错
    response.end('123');
}).listen(8887);
console.log('server listening on 8887');
