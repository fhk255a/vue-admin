import request from '@/lib/axios';
const URL = '/media';
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
const MEDIA = {
  // 返回文件夹
  dirList(params){
    let promise = request({
      url: URL+'/dirList',
      method: 'get',
      params
    });
    return http(promise);
  },
  // 根据文件夹查找文件夹下得全部图片
  dirQueryFiles(dirName){
    let promise = request({
      url: URL+'/dirQueryFiles',
      method: 'get',
      params:{
        dirName
      }
    });
    return http(promise);
  },
  // 删除服务器图片
  deleteFileItem(id){
    let promise = request({
      url: URL+'/deleteFileItem',
      method: 'post',
      data:{
        id
      }
    });
    return http(promise);
  },
  // 删除服务器文件夹
  deleteDir(id){
    let promise = request({
      url: URL+'/deleteDir',
      method: 'post',
      params:{
        id
      }
    });
    return http(promise);
  },
}

export default MEDIA;