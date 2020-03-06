const dialog = {
  state: {
    bigImg:{
      img:'',
      dialog:false
    },
    media:{
      img:'',
      dialog:false
    }
  },
  mutations: {
    // 大图dialog
    imgDialog(state,data){
      state.bigImg.dialog=data.status;
      state.bigImg.img=data.img;
    },
    // 打开媒体库
    media(state,status,img){
      state.media.dialog=status;
      state.media.img=img;
    }
  },
  actions: {
    imgDialog(context, data){
      context.commit('imgDialog', data);
    },
    media(context, status,img){
      context.commit('media', status,img);
    }
  }
}

export default dialog;