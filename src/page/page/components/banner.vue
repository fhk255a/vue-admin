<template>
  <div class="h5-page-component-banner">
    {{data.data.content}}
  </div>
</template>

<script>
export default {
  props:{
    data:{
      type:Object,
      default:()=>{}
    }
  }
}
</script>

<style>

</style>