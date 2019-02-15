const http = require('http');
const fs = require('fs');
http.createServer(function(request,response){
    console.log('request come',request.url);
    if(request.url === '/'){
        const html = fs.readFileSync('test.html', 'utf8');
        response.writeHead(200,{
            'Content-Type':'text/html'
        })
        response.end(html);
    }
    if(request.url === '/script.js'){
        response.writeHead(200,{
            'Content-Type':'text/javascript',
            'Cache-Control':'max-age=20',
        })
        response.end('console.log("script loaded")');
        //如果url没有变 在max-age时间内,还是会从memory cache里去读缓存,即使服务器返回内容改了,页面也不会改变
        //如果设置了cache-control就是直接在客户端缓存,根本不经过服务端验证,客户端也不知道服务端更新文件
        //解决就是hash码
    }
}).listen(8889);
console.log('server listening on 8889');
//Chrome Network里的disable cache勾掉后 代表允许缓存访问