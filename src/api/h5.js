import request from '@/lib/axios';
let URL = '/h5';
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
const H5 = {
  list(params){
    let promise = request({
      url: URL+'/list',
      method: 'get',
      params
    });
    return http(promise);
  },
  details(pid){
    let promise = request({
      url: URL+'/details',
      method: 'get',
      params:{
        pid
      }
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
  qrCode(id){
    let promise = request({
      url: URL+'/qr',
      method: 'post',
      data:{
        id
      }
    });
    return http(promise);
  },
  getPid(id){
    let promise = request({
      url: URL+'/getPid/'+id,
      method: 'get',
    });
    return http(promise);
  }
}
export default H5;