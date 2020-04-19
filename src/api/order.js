import request from '@/lib/axios';
const URL = '/order';
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
const ORDER = {
  list(params){
    let promise = request({
      url: URL+'/list',
      method: 'get',
      params
    });
    return http(promise);
  },
  // 取消订单
  cancel(id){
    let promise = request({
      url: URL+'/cancel',
      method: 'post',
      data:{
        id
      }
    });
    return http(promise);
  },
  // 查询订单
  details(id){
    let promise = request({
      url: URL+'/details',
      method: 'get',
      params:{
        id
      }
    });
    return http(promise);
  },
};

const URL1 = 'order/review'
export const REVIEW = {
  list(params){
    let promise = request({
      url: URL1+'/list',
      method: 'get',
      params
    });
    return http(promise);
  }
}
export default ORDER;