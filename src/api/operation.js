import request from '@/lib/axios';
const URL = '/operation';
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
export default {
  add(data){
    let promise = request({
      url: URL+'/pageConfig/add',
      method: 'post',
      data
    });
    return http(promise);
  },
  save(data){
    let promise = request({
      url: URL+'/pageConfig/save',
      method: 'post',
      data
    });
    return http(promise);
  },
  // 获取页面
  getPage(id){
    let promise = request({
      url: URL+'/pageConfig/getPage/'+id,
      method: 'get',
    });
    return http(promise);
  }
}