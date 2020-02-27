<template>
  <div class="joker-container">
    <div class="joker-sidebar">
      <sidebar/>
    </div>
    <div class="joker-main">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Main from './Main';
import Sidebar from './Sidebar';
export default {
  components:{
    Main,
    sidebar
  }
}
</script>