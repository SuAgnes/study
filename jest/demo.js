import axios from 'axios';

export const runCallback = (cb) => {
  cb('args');
}

export const createObject = (classItem) => {
  new classItem();
}

export const getData = () => {
  return axios.get('/api').then(res => res.data);
}
