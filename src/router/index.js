import Vue from 'vue'
import VueRouter from 'vue-router'
import { menuRouter } from './router';

Vue.use(VueRouter)
//NavigationDuplicated的可能解决方案
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// 路由配置
const RouterConfig = {
  //mode: 'history',
  routes: menuRouter
};

const router = new VueRouter(RouterConfig)
export default router
