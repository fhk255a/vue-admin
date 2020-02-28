import axios from 'axios';
import qs from 'qs';
import { getToken, removeToken } from './token';
import { MessageBox } from 'element-ui';
import router from '@/router';

// 创建axios
const request = axios.create({
  baseURL: baseUrl
});

// 发送请求
request.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['Authorization'] = getToken();
    }
    // 请求拦截: 成功
    if (config.method === 'post') {
      // 解析请求的json
      config.data = qs.stringify(config.data);
    } 
    return config;
  },
  error => {
    // 请求拦截: 失败
    console.error('请求失败： ', error);
    return error;
  }
);

// 接受回调
request.interceptors.response.use(
  response => {
    // 响应拦截: 成功
    if (response.data.code == 401) {
      MessageBox.confirm('你还没登录噢，是否去登录?', '验证失败', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'error'
      }).then(() => {
        removeToken();
        router.push('/login');
      })
    }
    return response;
  },
  error => {
    // 响应拦截: 失败
    return error;
  }
);

export default request;