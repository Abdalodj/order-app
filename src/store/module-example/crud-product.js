import {api} from "boot/axios";

export function getAllProducts() {
  let data;

  return api.get('/api/v1/product/')
    .then(result => new Promise(resolve => resolve(result.data)))
    .catch(err => new Promise(resolve => resolve('NoResult')))
}

export function upload(file) {
  return api.post('api/v1/product/upload', file, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  })
    .then(result => '')
    .catch(err => 'There is problem with the file')
}
