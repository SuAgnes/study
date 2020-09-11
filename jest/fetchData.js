// 异步代码

import axios from 'axios'

export const fetchData = (fn) => {
  axios.get('http://www.dell-lee.com/react/api/demo.json').then((res) => {
    fn(res.data)
  })
}


export const fetchDataNotFn = () => {
  return axios.get('http://www.dell-lee.com/react/api/demo.json');
}
export const fetchDataNoResult = () => {
  return axios.get('http://www.dell-lee.com/react/api/demo1.json');
}