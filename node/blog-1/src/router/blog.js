const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require('../controller/blog')
const { SuccessModel, ErrorModel } = require('../model/resModel')

const handleBlogRouter = (req, res) => {
  const { method } =  req;
  const id = req.query.id;

  // 获取博客列表
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || '';
    const keyword = req.query.keyword || '';
    // const listData = getList(author, keyword);
    // return new SuccessModel(listData);

    const result = getList(author, keyword);
    return result.then(listData => {
      return new SuccessModel(listData);
    })
  }

  // 获取博客详情
  if (method === 'GET' && req.path === '/api/blog/detail') {
    // const data = getDetail(id);
    // return new SuccessModel(data);
    const result = getDetail(id);
    return result.then(data => {
      return new SuccessModel(data)
    })
  }

  // 新建一篇博客
  if (method === 'POST' && req.path === '/api/blog/new') {
    // const blogData = req.body;
    // const data = newBlog(blogData);
    // return new SuccessModel(data);

    req.body.author = 'z3';
    const result = newBlog(req.body);
    return result.then(data => {
      return new SuccessModel(data)
    })
  }

  // 更新一篇博客
  if (method === 'POST' && req.path === '/api/blog/update') {
    const result = updateBlog(id, req.body);
    // if (result) {
    //   return new SuccessModel()
    // } else {
    //   return new ErrorModel('fail')
    // }
    return result.then(val => {
      if (val) {
        return new SuccessModel();
      } else {
        return new ErrorModel('更新博客失败');
      }
    })
  } 


  // 删除一篇博客
  if (method === 'POST' && req.path === '/api/blog/del') {
    // const result = deleteBlog(id);
    // if (result) {
    //   return new SuccessModel()
    // } else {
    //   return new ErrorModel('fail')
    // }
    const author = 'z3';
    const result = deleteBlog(id, author);
    return result.then(val => {
      if (val) {
        return new SuccessModel();
      } else {
        return new ErrorModel('更新博客失败');
      }
    })
  }

}

module.exports = handleBlogRouter;