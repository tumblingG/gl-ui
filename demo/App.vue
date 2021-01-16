<template>
  <div id="app">
    <test/>
  </div>
</template>
<script>
    import '@ionic/vue/css/core.css';

    /* Basic CSS for apps built with Ionic */
    import '@ionic/vue/css/normalize.css';
    import '@ionic/vue/css/structure.css';
    import '@ionic/vue/css/typography.css';
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
  }
</style>
