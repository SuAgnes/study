const http = require('http');
const fs = require('fs');
http.createServer(function(request,response){
    console.log('request come',request.url);

    const html = fs.readFileSync('test.html','utf8');
    const img = fs.readFileSync('test.png');
    if(request.url === '/'){
        response.writeHead(200,{
            'Content-Type':'text/html',
            'Connection':'close'
        })
    response.end(html);
}else{
        response.writeHead(200,{
            'Content-Type':'image/png',
            'Connection':'close'
        })
    response.end(img);
    }
}).listen(8892);
console.log('server listening on 8892');

// 长连接会复用TCP/IP的连接
// 默认情况下Connection: keep-alive
// Connection: close 一个请求完毕后TCP连接就会被关闭,每一个Connection ID都是不同的(没有复用TCP连接,每次请求发送完成后,TCP连接都被关闭了)
// 正常情况下HTTP服务都是利用Connection: keep-alive , 我们可以给Connection: keep-alive设置一个自动关闭的时间,但是这个是在服务端设置操作的,本身和HTTP协议没有什么关系,并不会在http头上有什么展示

// 在HTTP2里出现了一个新的概念叫信道复用:
// 在TCP连接上可以并发的发送HTTP请求
// 也就是说我们连接一个网站的时候只需要一个TCP连接
// GOOGLE已经都是HTTP2了 所有的都是一个TCP连接(仅限同域) 开销降低 速度提升

// 长连接:
// 理解HTTP请求是在TCP连接上进行发送的,一个TCP连接可以发送多个HTTP请求
// 在HTTP1.1里面HTTP请求如果要在TCP连接上进行发送是有先后顺序的,所以为了提高性能还是要使用并发TCP连接的方式
// 在HTTP2里,因为可以在一个TCP连接上并发的发HTTP请求,所以只开一个TCP连接就够了