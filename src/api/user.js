import request from '@/lib/axios';
const URL = '/user';
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
const USER = {
  login(username,password){
    let promise = request({
      url: URL+'/login',
      method: 'post',
      data:{
        username,
        password
      }
    });
    return http(promise);
  },
  register(data){
    let promise = request({
      url: URL+'/register',
      method: 'post',
      data
    });
    return http(promise);
  },
  userList(params){
    let promise = request({
      url: URL+'/userList',
      method: 'get',
      params
    });
    return http(promise);
  },
}
export default USER;