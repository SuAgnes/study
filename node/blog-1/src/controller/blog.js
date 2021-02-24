const { exec } = require('../db/mysql');

const getList = (author, keyword) => {
  // 先返回假数据（格式是正确的）
  // return [{
  //   id: 1,
  //   title: '标题A',
  //   content: '内容A',
  //   createTime: 1610206765177,
  //   author: 'author-a'
  // },
  // {
  //   id: 2,
  //   title: '标题B',
  //   content: '内容B',
  //   createTime: 1610206801983,
  //   author: 'author-b'
  // }]
  // 1=1 永远成立，用处是占一个位，用于author和keyword都没有值的情况
  let sql = `select * from blogs where 1=1 `;
  if (author) {
    sql += `and author ='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql+= `order by createtime desc;`
  // 返回promise
  return exec(sql);
}

const getDetail = (id) => {
  // 先返回假数据（格式是正确的）
  // return [{
  //   id: 1,
  //   title: '标题A',
  //   content: '内容A',
  //   createTime: 1610206765177,
  //   author: 'author-a'
  // },
  // {
  //   id: 2,
  //   title: '标题B',
  //   content: '内容B',
  //   createTime: 1610206801983,
  //   author: 'author-b'
  // }]
  const sql = `select * from blogs where id='${id}'`;
  return exec(sql).then(rows => {
    return rows[0];
  })
}

const newBlog = (blogData = {}) => {
  const { title, content, author } = blogData;
  const createTime = Date.now();
  const  sql = `insert into blogs (title, content, createtime, author) values('${title}', '${content}', ${createTime}, '${author}');`
  return exec(sql).then(insertData => {
    return {
      id: insertData.insertId
    }
  })
  return {
    id: 3, // 新建博客插入到数据表里的 id
  }
}

const updateBlog = (id, blogData = {}) => {
  // console.log(id, blogData);
  // return true;
  const title = blogData.title;
  const content = blogData.content;
  const sql = `update blogs set title='${title}', content='${content}' where id=${id}`;
  return exec(sql).then(updateData => {
    if (updateData.affectedRows > 0) { // 代表更新成功
      return true;
    }
    return false;
  })
}

const deleteBlog = (id, author ) => {
  // return true;
  const sql = `delete from blogs where id='${id}' and author='${author}'`;
  return exec(sql).then(deleteData => {
    if (deleteData.affectedRows > 0) { // 代表更新成功
      return true;
    }
    return false;
  })
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
}