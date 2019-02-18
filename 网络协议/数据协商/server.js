const http = require('http');
const fs = require('fs');
const zlib = require('zlib');

http.createServer(function(request,response){
    console.log('request come',request.url);

    const html = fs.readFileSync('test.html');
    response.writeHead(200,{
        'Content-Type':'text/html',
        'X-Content-Type-Options': 'nosniff', //告诉浏览器不要随意猜测类型
        'Content-Encoding': 'gzip'
    })
    response.end(zlib.gzipSync(html)); //450B→414B 传输信息变小了,在传输的过程中把body压缩了
}).listen(8893);
console.log('server listening on 8893');
// Size里上面是传输信息 下面是body信息
// 压缩可以加快网络传输的开销

// 数据协商:在客户端发送给服务端一个请求的时候,客户端会声明这个请求希望拿到的数据格式以及具体相关的一些限制都是怎么样的
// 服务端会根据它的请求里表示的数据,做出判断,可能会返回不同类型的数据。
// Accpet: 指定想要的数据类型
// Accpet-Encoding: 代表数据以怎么样的编码方式来进行传输,主要来限制服务端如何进行一个数据的压缩
// 可以根据Accpet-Encoding去选择认为最好的压缩算法
// Accpet-Language: 判断语言
// User-Agent: 表示浏览器相关信息

// 服务端返回的
// Content-Type: 返回的数据格式
// Content-Encoding: 返回数据压缩方式
// Content-Language: 返回语言