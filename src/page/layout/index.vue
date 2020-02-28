<template>
  <div class="joker-container">
    <sidebar/>
    <div class="joker-main">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Main from './Main';
import sidebar from './Sidebar';
export default {
  components:{
    Main,
    sidebar
  }
}
</script>