<template>
  <div style="overflow: scroll;  height:100%;">
    <div>
      <spinner :color="'secondary'" :size="30" :type="'circle'"></spinner>
    </div>
    <div>
      <tabs color="success" mode="ios" v-model="id">
        <tabs-item id="tab1">tab1</tabs-item>
        <tabs-item id="tab2">tab2</tabs-item>
        <tabs-item id="tab3">tab3</tabs-item>
      </tabs>
    </div>
    <div>
      <gl-button @click="showLoading">Loading</gl-button>
      <gl-button @click="showToast">Toast</gl-button>
    </div>
    <div>
      <gl-input disabled label="用户名" placeholder="输入用户名"></gl-input>
      <gl-input label="密码" placeholder="输入密码" type="password"></gl-input>
      <gl-input label="电话" placeholder="输入电话号码" type="tel"></gl-input>
      <gl-input placeholder="输入电话号hah码" type="tel"></gl-input>
      <gl-input label="自我介绍" placeholder="自我介绍" rows="3" type="textarea"></gl-input>
    </div>
    <div>
      <checkbox :max="2" :options="checkboxOptions" align="right" color="warning" v-model="checkboxValue"></checkbox>
    </div>
    <div>
      <radio :options="options" color="secondary" v-model="value"></radio>
    </div>
    <div style="padding: 10px;">
      <toggle :disabled="true" v-model="checked"></toggle>
      <toggle color="secondary" v-model="checked"></toggle>
    </div>
    <gl-button :expand="'block'" color="tertiary">按钮</gl-button>
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
    import GlButton from "packages/button/button";
    import Toggle from "packages/toggle/toggle";
    import Radio from "packages/radio/radio";
    import Checkbox from "packages/checkbox/checkbox";
    import GlInput from "packages/input/input";
    import Loading from "packages/loading";
    import Toast from "packages/toast";
    import Tabs from "packages/tabs";
    import TabsItem from "packages/tabs-item";
    import Spinner from "packages/spinner/spinner";

    export default {
        name: 'Test',

        components: {
            Scalable,
            Badge,
            Hairline,
            Skeleton,
            GlButton,
            Toggle,
            Radio,
            Checkbox,
            GlInput,
            Tabs,
            TabsItem,
            Spinner
        },

        data() {
          return {
            checked: false,
            options: [{label: 'A', disabled: true, value: 'A'}, 'B', 'C'],
            value: 'A',
            checkboxOptions: ['A', 'B', 'C'],
            checkboxValue: ['A', 'B'],
            id: 'tab1'
          }
        },

        methods: {
          showLoading() {
            Loading.show('正在加载...');

            setTimeout(() => {
              Loading.hide();
            }, 3000);
          },

          showToast() {
            Toast.show('请输入数字')
          }
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
