<template>
  <div id="app">
    <div>{{message}}</div>
    <div>44</div>
    <Bb></Bb>
  </div>
</template>

<script>
  import Bb from './Bb.vue'
    export default {
        name: 'App',
        components: {Bb},

        data () {
            return {message: '6666'}
        }
    }
</script>

<style scoped lang="less">
  #app {
    color: red;
  }
</style>
