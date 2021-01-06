import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import request from '@/utils/request'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd);

import VCUTable from "../components/index.js";
Vue.use(VCUTable);
VCUTable.setup({
  request: request
})


import Uicomponents from '@/components';
Vue.use(Uicomponents)

import importDirective from '@/directive';
/* 注册指令*/
importDirective(Vue);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  watch: {
    $route: {
      handler: (val, oldVal) => {
        window.history.pushState('forward', null, document.URL);
      },
      deep: true
    }
  },
}).$mount('#app')

window.onpopstate = () => {
  window.history.forward(1);
}
