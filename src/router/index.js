import Vue from 'vue'
import VueRouter from 'vue-router'
import { menuRouter } from './router';

Vue.use(VueRouter)
// 路由配置
const RouterConfig = {
  //mode: 'history',
  routes: menuRouter
};

const router = new VueRouter(RouterConfig)
export default router
