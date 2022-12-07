import Vue from 'vue';
import DModal from './modal.vue';
import './stop-scroll-chain';

const GlModal = Vue.extend(DModal);

class ModalRef {
  constructor (options, store, router, modalContainer) {
    this.modalInstance = new GlModal({
      el: document.createElement('div'),
      store,
      router,
      propsData: {
        options
      }
    });

    modalContainer.appendChild(this.modalInstance.$el);

    const isFullScreen = typeof options.isFullScreen === 'boolean' ? options.isFullScreen : true;
    this.modalInstance.$on('close', () => {
      if (isFullScreen) {
        // 只有全屏才显示关闭动画
        this.modalInstance.show(false);
      }
      const timer = setTimeout(() => {
        clearTimeout(timer);
        this.modalInstance.$destroy();
        modalContainer.removeChild(this.modalInstance.$el);
      }, isFullScreen ? 300 : 100);
    });
  }

  close () {
    this.modalInstance.closeModal();
  }
}

export class Modal {
  constructor (options) {
    const {router, store} = options;
    this.router = router;
    this.store = store;
    this.modalContainer = null;
  }

  _getModalContainer () {
    let container = document.getElementById('gl-modal-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'gl-modal-container';
      container.style.zIndex = '300';
      document.body.appendChild(container);
    }
    return container;
  }

  create (options) {
    if (!this.modalContainer) {
      this.modalContainer = this._getModalContainer();
    }
    return new ModalRef(options, this.store, this.router, this.modalContainer);
  }
}

export default new Modal();

