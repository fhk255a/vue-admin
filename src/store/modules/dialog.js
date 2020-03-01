const dialog = {
  state: {
    bigImg:{
      img:'',
      dialog:false
    }
  },
  mutations: {
    // 大图dialog
    imgDialog(state,data){
      state.bigImg.dialog=data.status;
      state.bigImg.img=data.img;
    }
  },
  actions: {
    imgDialog(context, data){
      context.commit('imgDialog', data);
    }
  }
}

export default dialog;