import request from '@/lib/axios';
const URL = '/h5';
function requestHttp(request) {
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
    return requestHttp(promise);
  }
}
export default PRODUCT;