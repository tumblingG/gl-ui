<template>
  <div>
    <ion-icon name="heart"></ion-icon>
    <button class="button button-positive button-block">positive</button>
    <div class="item row">
      <img class="img" src="../assets/haha3.jpg">
    </div>
    <scaleable :scale="2" width="200" height="200">
      <div class="item item1">
        <img class="img" src="../assets/haha3.jpg">
      </div>
    </scaleable>
    <badge :num="3"></badge>
  </div>
</template>
<script>
    import Scaleable from 'packages/scalable/scalable.vue'
    import Badge from 'packages/badge/badge'
    export default {
        name: 'Test',

        components: {
            Scaleable,
            Badge
        }
    }
</script>

<style lang="less">
  @import "~theme-default/mixins.less";
  .item {
    width: 100px;
    height: 100px;
    background-color: red;
    &:before {
      .hairline(top);
    }
  }
  .item1 {
    background-color: green;
  }

  .img {
    height: 100%;
    width: 100%;
  }
</style>
