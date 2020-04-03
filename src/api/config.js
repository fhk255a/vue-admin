import request from '@/lib/axios';
let URL = '/config';
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
// 数据字典
export const KEY = {
  // pid=0的列表
  list(params){
    let promise = request({
      url: URL+'/key/list',
      method: 'get',
      params
    });
    return http(promise);
  },
  // 根据pid 查询下拉内容
  getItem(id){
    let promise = request({
      url: URL+'/key/item/'+id,
      method: 'get',
    });
    return http(promise);
  },
  //创建key 查询下拉内容
  create(data){
    let promise = request({
      url: URL+'/key/create',
      method: 'post',
      data
    });
    return http(promise);
  },
  //修改key 查询下拉内容
  update(data){
    let promise = request({
      url: URL+'/key/update',
      method: 'post',
      data
    });
    return http(promise);
  },
  get(key){
    let promise = request({
      url: URL+'/key/'+key,
      method: 'get',
    });
    return http(promise);
  },
  // 保存跟修改
  updateItem(id,items,deleteIds=[]){
    let promise = request({
      url: URL+'/key/updateItem/'+id,
      method: 'post',
      data:{
        items,
        deleteIds
      }
    });
    return http(promise);
  },
  // 修改父级
};