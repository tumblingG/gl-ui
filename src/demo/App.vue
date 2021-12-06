<template>
  <div id="app">
    <test/>
  </div>
</template>
<script>
  import Test from './Test.vue'
    export default {
        name: 'App',
        components: {Test},

        data () {
            return {message: '6666'}
        }
    }
</script>

<style lang="less">
  #app {
    color: red;
    height:100%;
  }
</style>
