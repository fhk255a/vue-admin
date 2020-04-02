class JSocket {
  constructor(url){
    this.web = false;
    this.url = url;
    if (window.WebSocket) {
      console.log(url)
      this.web = new WebSocket(this.url);
    }
    if (window.MozWebSocket){
      this.web = new MozWebSocket(this.url);
    } 
    if(!this.web){
      console.log('您的电脑不支持扫码登录')
      return;
    }else{
      this.init();
    }
  }
  init(){
    this.web.message = this.web.onmessage;
    this.web.onopen = this.open;
    this.web.onerror = this.error;
    this.web.onclose = this.close;
  }
  // 开启
  open(){
    this.send(this.url+'------>开启socket服务')
  }
  // 通讯
  send(msg){
    this.web.send(msg)
  }
  // 关闭
  close(e){
    console.log('错误',e);
  }
  error(e){
    console.log('断开连接',e);
  }
}
export default JSocket;