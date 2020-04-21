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
  status(id,status){
    let promise = request({
      url: URL+'/changeStatus/'+id,
      method: 'post',
      data:{
        status
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

let URL2 = '/shop'
export const SHOP = {
  list(params){
    let promise = request({
      url: URL2+'/list',
      method: 'get',
      params
    });
    return http(promise);
  },
  // 创建 & 保存店铺
  save(data){
    let promise = request({
      url: URL2+'/save',
      method: 'post',
      data
    });
    return http(promise);
  },
  // 删除店铺
  delete(id){
    let promise = request({
      url: URL2+'/delete',
      method: 'post',
      data:{
        id
      }
    });
    return http(promise);
  },
}

// 商品集
let URL3 = '/collection'
export const COLLECTION = {
  list(params){
    let promise = request({
      url: URL3+'/list',
      method: 'get',
      params
    });
    return http(promise);
  },
  // 创建 & 保存店铺
  save(data){
    let promise = request({
      url: URL3+'/save',
      method: 'post',
      data
    });
    return http(promise);
  },
  // 删除店铺
  delete(id){
    let promise = request({
      url: URL3+'/delete',
      method: 'post',
      data:{
        id
      }
    });
    return http(promise);
  },
}