import request from '@/lib/axios';
const URL = '/product';
function http (request) {
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
  details(id){
    let promise = request({
      url: URL+'/details/'+id,
      method: 'get',
    });
    return http(promise);
  },
  save(data){
    let promise = request({
      url: URL+'/save',
      method: 'post',
      data
    });
    return http(promise);
  },
}
export default PRODUCT;

let URL1 = '/category'
export const CATEGORY = {
  tree(){
    let promise = request({
      url: URL1+'/tree',
      method: 'get',
    });
    return http(promise);
  }
}