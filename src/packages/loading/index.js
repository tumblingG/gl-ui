import Vue from 'vue';
import Loading from "./loading.vue";

class LoadingService {

    constructor() {
        this.vm = null;
        this.tips = 'loading...';
    }

    setLoadingText(tips) {
        this.tips = tips;
    }

    show(tips) {
        if (!this.vm) {
            const container = document.createElement('div');
            this.vm = new Vue(Loading).$mount(container);
            document.body.appendChild(this.vm.$el);
        }

        this.vm.show(tips || this.tips);
    }

    hide() {
        if (this.vm) {
            this.vm.hide();
        }
    }
}

export default new LoadingService();
