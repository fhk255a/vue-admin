import Cookie from './cookie';

const tokenKey = 'vue-admin-token';

export function setToken(token){
    Cookie.set(tokenKey, token, {path: '/'});
}

export function getToken(){
    return Cookie.get()[tokenKey];
}

export function removeToken(){
    Cookie.remove(tokenKey);
}

export function hasToken(){
    return Cookie.has(tokenKey);
}

export default {
    setToken,
    getToken,
    removeToken
}