import request from '@/lib/axios';
let URL = '/user';
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
  getInfo(){
    let promise = request({
      url: URL+'/userinfo',
      method: 'post',
    });
    return http(promise);
  },
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
  update(data){
    let promise = request({
      url: URL+'/update',
      method: 'post',
      data
    });
    return http(promise);
  },
  delete(id){
    let promise = request({
      url: URL+'/delete',
      method: 'post',
      data:{id}
    });
    return http(promise);
  },
  getLoginCode(uuid){
    let promise = request({
      url: URL+'/getLoginCode',
      method: 'get',
      params:{
        uuid
      }
    });
    return http(promise);
  }
}
export default USER;
// 角色列表
let URL1 = '/role'
export const ROLE = {
  list(params){
    let promise = request({
      url: URL1+'/list',
      method: 'get',
      params
    });
    return http(promise);
  },
  // 修改
  update(data){
    let promise = request({
      url: URL1+'/update',
      method: 'post',
      data
    });
    return http(promise);
  },
  // 创建
  create(data){
    let promise = request({
      url: URL1+'/create',
      method: 'post',
      data
    });
    return http(promise);
  },
  // 删除
  delete(id){
    let promise = request({
      url: URL1+'/delete',
      method: 'post',
      data:{
        id
      }
    });
    return http(promise);
  },
  // 配置菜单
  setMenu(id,menu){
    let promise = request({
      url: URL1+'/menu',
      method: 'post',
      data:{
        id,
        menu
      }
    });
    return http(promise);
  },
  // 配置资源
  setResource(id,resource){
    let promise = request({
      url: URL1+'/resource',
      method: 'post',
      data:{
        id,
        resource
      }
    });
    return http(promise);
  },
}
const URL2 = 'menu';
export const MENU = {
  list(){
    let promise = request({
      url: URL2+'/list',
      method: 'get',
    });
    return http(promise);
  },
  save(data){
    let promise = request({
      url: URL2+'/save',
      method: 'post',
      data
    });
    return http(promise);
  },
  delete(id){
    let promise = request({
      url: URL2+'/delete',
      method: 'post',
      data:{id}
    });
    return http(promise);
  },
  changeStatus(id,isHide){
    let promise = request({
      url: URL2+'/changeStatus',
      method: 'post',
      data:{
        id,
        isHide
      }
    });
    return http(promise);
  },
}
const URL3 = 'resource';
export const RESOURCE = {
  list(){
    let promise = request({
      url: URL3+'/list',
      method: 'get',
    });
    return http(promise);
  },
  save(data){
    let promise = request({
      url: URL3+'/save',
      method: 'post',
      data
    });
    return http(promise);
  },
  delete(id){
    let promise = request({
      url: URL3+'/delete',
      method: 'post',
      data:{id}
    });
    return http(promise);
  },
  changeStatus(id,isHide){
    let promise = request({
      url: URL3+'/changeStatus',
      method: 'post',
      data:{
        id,
        isHide
      }
    });
    return http(promise);
  },
}