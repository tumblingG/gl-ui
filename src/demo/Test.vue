<template>
  <div>
    <skeleton style="width: 100px; height: 100px; border-radius: 50%;"></skeleton>
    <skeleton :animated="true"></skeleton>
    <ion-icon name="heart"></ion-icon>
    <button class="button button-positive button-block">positive</button>
    <div class="item row">
      <img class="img" src="../assets/haha3.jpg">
    </div>
    <scalable :scale="2" width="200" height="200">
      <div class="item item1">
        <img class="img" src="../assets/haha3.jpg">
      </div>
    </scalable>
    <badge :num="3"></badge>
    <div class="hairline-wrap">
      <hairline position="top"></hairline>
    </div>
  </div>
</template>
<script>
    import Scalable from '../packages/scalable'
    import Badge from 'packages/badge'
    import Hairline from 'packages/hairline';
    import Skeleton from "packages/skeleton/skeleton";

    export default {
        name: 'Test',

        components: {
            Scalable,
            Badge,
            Hairline,
            Skeleton
        }
    }
</script>

<style lang="less">

  @import "../theme-default/mixins.less";
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
  .hairline-wrap {
    width: 100%;
    position: relative;
    height: 50px;
    margin: 20px;
  }
</style>
