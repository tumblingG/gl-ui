import Vue from 'vue';
import Toast from './toast.vue';

class ToastService {

    constructor() {
        this.vm = null;
        this.timer = null;
    }

    show(tips, duration = 2000) {
        if (!this.vm) {
            const container = document.createElement('div');
            this.vm = new Vue(Toast).$mount(container);
            document.body.appendChild(this.vm.$el);
        }

        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }

        this.vm.show(tips);

        this.timer = setTimeout(() => {
            clearTimeout(this.timer);
            this.timer = null;
            this.vm.hide();
        }, duration);
    }
}

export default new ToastService();
