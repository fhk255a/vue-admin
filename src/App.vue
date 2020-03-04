<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import isPass from '@/lib/esss';
export default {
  mixins:[isPass],
  name: 'App',
}
</script>

<style lang="scss">
</style>
