<script lang="ts">
import 'reflect-metadata';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Options } from './options';
import { createUid, findParentNodeByClassName } from './utils';
import { Subscriber } from './subscriber';

@Component({
    name: 'GlModal'
})
export default class Modal extends Vue {
  @Prop({default: () => ({})}) readonly options!: Options;

  visible = false;
  uid = '';
  stopScroll = false;

  /**
   * 是否全屏, 默认true
   * @return {boolean}
   */
  get isFullScreen () {
    return typeof this.options.isFullScreen === 'boolean' ? this.options.isFullScreen : true;
  }

  /**
   * 最小高度, 默认100px，仅在非全屏模式下有用
   * @return {string}
   */
  get minHeight () {
    return this.isFullScreen ? '0' : this.options.minHeight || '100px';
  }

  /**
   * 宽度，默认80%, 仅在非全屏模式下有用
   * @return {*}
   */
  get width () {
    return this.isFullScreen ? '100%' : this.options.width || '80%';
  }

  /**
   * 遮盖层是否可点击，默认true
   * @return {boolean}
   */
  get maskClick () {
    return typeof this.options.maskClick === 'boolean' ? this.options.maskClick : true;
  }

  /**
   * 右上角是否显示x关闭按钮，默认true
   * @return {boolean}
   */
  get showCloseIcon () {
    return typeof this.options.showCloseIcon === 'boolean' ? this.options.showCloseIcon : true;
  }

  /**
   * 点击确定按钮的回调，会将当然前传入的组件实例作为参数
   * @return {*}
   */
  get onOk () {
    return typeof this.options.onOk === 'function' ? this.options.onOk : () => true;
  }

  /**
   * 点击取消按钮的回调，会将当然前传入的组件实例作为参数
   * @return {*}
   */
  get onClose () {
    return typeof this.options.onClose === 'function' ? this.options.onClose : () => true;
  }

  /**
   * 动画类，全屏的动画和非全屏的动画不同
   * @return {string[]}
   */
  get animationClass () {
    return this.isFullScreen ? ['gl-modal-slide-top-animation'] : ['gl-modal-fade-in-animation'];
  }

  created () {
    // 新建模态框唯一id
    this.uid = createUid()
    // 注册一个订阅者，模态框内滚动元素滚动到最上面或最底部之后，防止滚动穿透
    Subscriber.registerEvent(this.uid, (stopScroll) => {
      this.stopScroll = stopScroll
    })
  }

  mounted () {
    // 显示模态框
    const timer = setTimeout(() => {
      clearTimeout(timer);
      this.show();
    }, 50);
  }

  beforeDestroy () {
    // 取消订阅
    Subscriber.deregisterEvent(this.uid);
  }

  /**
   * 关闭模态框
   */
  closeModal () {
    this.beforeClose('onClose')
  }
  /**
   * 确认模态框
   */
  confirm () {
    this.beforeClose('onOk')
  }

  beforeClose (type) {
    let componentRef = this.$refs.componentRef || null;
    const p = this[type](componentRef);
    if (this._isPromise(p)) {
      p.then(() => {
        this.$emit('close')
      }).catch(() => {})
    } else {
      p === true && this.$emit('close')
    }
  }

  show (bool = true) {
    this.visible = bool
  }

  _isPromise (obj) {
    return !!obj && typeof obj.then === 'function' && typeof obj.catch === 'function'
  }

  maskClickEvent () {
    if (!this.maskClick) return;
    this.closeModal()
  }

  /**
   * 解决滚动链穿透问题，仅仅在可滚动的元素以及其子元素触摸才触发滚动事件，否则阻止滚动，
   * 这种例子在模态框局部可滚动的时候有用
   * @param e {event}
   */
  stopScrollChain (e) {
    const parent = findParentNodeByClassName('gl-modal-scroll-el', e.touches[0].target, this.$refs.modal)
    if ((!parent || this.stopScroll) && e.cancelable) {
      e.preventDefault();
      return false;
    }
  }

}
</script>

<template src="./modal.html"></template>
