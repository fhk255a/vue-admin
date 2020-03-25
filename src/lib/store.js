let local = window.localStorage;
const STORE = {
  get(key){
    let value = local.getItem(key)?JSON.parse(local.getItem(key)):null;
		return value;  
  },
  set(key,value=null){
    local.setItem(key,JSON.stringify(value));
  },
  delete(key){
    local.removeItem(key);
  }
}
export default STORE;