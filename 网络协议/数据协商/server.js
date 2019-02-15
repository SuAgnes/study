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
// 可以根据Accpet-Encoding去选择认为最好的压缩算法