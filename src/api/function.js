import request from '@/lib/axios';
let URL = '/function';
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
const FUNCTION = {
  upload(file){
    let promise = request({
      url: URL+'/upload',
      method: 'get',
      data:{
        file
      }
    });
    return http(promise);
  },
}
export default FUNCTION;