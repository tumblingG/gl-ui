/* Automatically generated by './build/build-entry.js' */

import Badge from './badge/index.js';
import Button from './button/index.js';
import Checkbox from './checkbox/index.js';
import Grids from './grids/index.js';
import Hairline from './hairline/index.js';
import Input from './input/index.js';
import Radio from './radio/index.js';
import Scalable from './scalable/index.js';
import Scroll from './scroll/index.js';
import Skeleton from './skeleton/index.js';
import Spinner from './spinner/index.js';
import Swipe from './swipe/index.js';
import SwipeItem from './swipe-item/index.js';
import Tabs from './tabs/index.js';
import TabsItem from './tabs-item/index.js';
import Toggle from './toggle/index.js';
import Loading from './loading/index.js';
import Modal from './modal/index.js';
import Toast from './toast/index.js';

const components = [
  Badge,
  Button,
  Checkbox,
  Grids,
  Hairline,
  Input,
  Radio,
  Scalable,
  Scroll,
  Skeleton,
  Spinner,
  Swipe,
  SwipeItem,
  Tabs,
  TabsItem,
  Toggle,
];

const install = function(Vue, opts = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });

  Vue.prototype.$glLoading = Loading;
  Vue.prototype.$glModal = Modal;
  Vue.prototype.$glToast = Toast.alert;
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '1.0.0',
  install,
  Badge,
  Button,
  Checkbox,
  Grids,
  Hairline,
  Input,
  Radio,
  Scalable,
  Scroll,
  Skeleton,
  Spinner,
  Swipe,
  SwipeItem,
  Tabs,
  TabsItem,
  Toggle,
  Loading,
  Modal,
  Toast
};
