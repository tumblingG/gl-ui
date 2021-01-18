import '../theme-default/index.less';
import 'vue-class-component/hooks';

import Vue from 'vue';
import App from './App.vue';

new Vue({
    render: h => h(App)
}).$mount('#app');
