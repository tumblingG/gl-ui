<template>
  <div id="app">
    <test/>
  </div>
</template>
<script>
  // import Test from './Test.vue'
  import Test from './text2.tsx'
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
  }
</style>
