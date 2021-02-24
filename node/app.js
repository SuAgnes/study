const http = require('http');
const querystring = require('querystring');

// get
// const server = http.createServer((req, res) => {
//   console.log(req.method);
//   const url = req.url;
//   console.log(url);
//   req.query = querystring.parse(url.split('?')[1])
//   console.log(req.query);
//   res.end(JSON.stringify(req.query))
//   // res.writeHead(200, {'content-type': 'text/html' })
//   // res.end('<h1> hello </h1>')
// })

// post

// const server = http.createServer((req, res) => {
//   exercise 1
//   if (req.method === 'POST') {
//     console.log(req.headers['content-type']);
//     // 接受数据
//     let postData = '';
//     req.on('data', chunk => { // chunk是二进制
//       postData += chunk.toString();
//     })

//     req.on('end', () => {
//       console.log(postData);
//       res.end('end!')
//     })
//   }
// })

const server = http.createServer((req, res) => {
   // exercise 2
   const { method, url } = req;
   const path = url.split('?')[0];
   const query = querystring.parse(url.split('?')[1]);
   // 设置返回格式为json (字符串类型为json)
   res.setHeader('Content-type', 'application/json');
   // 返回的数据
   const resData = {
     method,
     url,
     path,
     query
   }
    
   // 返回
   if (method === 'GET') {
     res.end(
       JSON.stringify(resData)
     )
   }

   if(method === 'POST') {
    //  let postData = '';
    //  req.on('data', chunk => {
    //    postData += chunk.toString();
    //  })
    //  req.on('end', () => {
    //    resData.postData = postData
    //    //返回
    //    res.end(
    //     JSON.stringify(resData)
    //     )
    //  })
   }
})
server.listen(3000, () => {
  console.log('listening on 3000 port');
})