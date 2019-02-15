// const http = require('http');
// const fs = require('fs');
// http.createServer(function(request,response){
//     console.log('request come',request.url);
//     if(request.url === '/'){
//         const html = fs.readFileSync('test.html', 'utf8');
//         response.writeHead(200,{
//             'Content-Type':'text/html'
//         })
//         response.end(html);
//     }
//     if(request.url === '/script.js'){
//         response.writeHead(200,{
//             'Content-Type':'text/javascript',
//             'Cache-Control':'max-age=200000, no-cache', //设置下一次请求还要到服务器验证
//             'Last-Modified':'123',
//             'Etag':'777'
//             // 浏览器在下次发送请求的时候会把对应验证缓存的头带上
//             // If-Modified-Since: 123
//             // If-None-Match: 777
//         })
//         const etag = request
//         response.end('console.log("script loaded")');
//         //如果url没有变 在max-age时间内,还是会从memory cache里去读缓存,即使服务器返回内容改了,页面也不会改变
//         //如果设置了cache-control就是直接在客户端缓存,根本不经过服务端验证,客户端也不知道服务端更新文件
//         //解决就是hash码
//     }
// }).listen(8890);
// console.log('server listening on 8890');
//Chrome Network里的disable cache勾掉后 代表允许缓存访问


//如果内容没有进行更改,希望服务器不要反悔内容,只需要服务器告诉浏览器去读缓存的话,进行↓↓判断

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
        const etag = request.headers['if-none-match'];
        if(etag === '777'){
            // 304语义就是not-modified,资源没有修改,直接读缓存,那么就会直接忽略服务端返回body里的内容,直接去读缓存里面保存的这部分数据
            response.writeHead(304,{
                'Content-Type':'text/javascript',
                'Cache-Control':'max-age=200000, no-cache', 
                'Last-Modified':'123',
                'Etag':'777'
            })
            response.end('')
        }else{
            response.writeHead(200,{
                'Content-Type':'text/javascript',
                'Cache-Control':'max-age=200000, no-cache', //设置下一次请求还要到服务器验证
                'Last-Modified':'123',
                'Etag':'777'
            })
            response.end('console.log("script loaded")');
        }
}
}).listen(8890);
console.log('server listening on 8890');