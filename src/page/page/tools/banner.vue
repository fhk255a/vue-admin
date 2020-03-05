<template>
  <div >
    banner
    {{$store.state.page.componentIndex}}
    {{currentComponent}}
  </div>
</template>

<script>
export default {
  props:{
    data:{
      type:Object,
      default:()=>{}
    }
  },
  computed:{
    currentComponent(){
      return this.$store.state.page.components[this.$store.state.page.componentIndex];
    },
  }
}
</script>

<style>

</style>