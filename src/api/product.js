import request from '@/lib/axios';
const URL = '/product';
function http(request) {
  return new Promise((resolve, reject) => {
    request.then(res => {
      if (res.data.code == 200) {
        resolve(res.data);
      } else {
        resolve(res.data);
      }
    }).catch(err => {
      reject(err);
    })
  })
}
const PRODUCT = {
  list(params){
    let promise = request({
      url: URL+'/list',
      method: 'get',
      params
    });
    return http(promise);
  },
  add(data){
    let promise = request({
      url: URL+'/add',
      method: 'post',
      data
    });
    return http(promise);
  },
}
export default PRODUCT;