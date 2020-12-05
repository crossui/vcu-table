import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import _ from "lodash";

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd);

import VCUTable from "../components/vcu-table.js";
Vue.use(VCUTable);


import Uicomponents from '@/components';
Vue.use(Uicomponents)

import importDirective from '@/directive';
/* 注册指令*/
importDirective(Vue);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
