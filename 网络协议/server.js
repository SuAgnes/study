const http = require('http');
const fs = require('fs');
http.createServer(function(request,response){
    console.log('request come',request.url);

    const html = fs.readFileSync('test.html','utf8');
    response.writeHead(200,{
        'Content-Type':'text/html',
    })
    // response.writeHead(200,{
    //     'Content-Type':'text/plain' //显示源码
    // })
    response.end(html);
}).listen(8888);
console.log('server listening on 8888');
