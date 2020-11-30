<template>
  <a-config-provider :getPopupContainer="getPopupContainer" :locale="zh_CN">
    <div id="app">
      <a-layout class="app-main">
        <a-layout-sider class="sider-wrap">
          <a-menu mode="inline" theme="dark" @click="handleClickMenu">
            <template v-for="item in menuList">
              <a-sub-menu :key="item.name" v-if="item.children">
                <span slot="title">{{ item.meta.title }}</span>
                <a-menu-item
                  :key="subitem.name"
                  v-for="subitem in item.children"
                >
                  {{ subitem.meta.title }}
                </a-menu-item>
              </a-sub-menu>
            </template>
          </a-menu>
        </a-layout-sider>
        <a-layout>
          <a-layout-content><router-view /></a-layout-content>
        </a-layout>
      </a-layout>
    </div>
  </a-config-provider>
</template>
<script>
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
moment.locale("zh-cn");
import { menuRouter } from "@/router/router";

export default {
  data() {
    return {
      zh_CN,
      menuList: menuRouter,
    };
  },
  computed: {},
  methods: {
    handleClickMenu({ key }) {
      this.$router.push({
        name: key,
      });
    },
    getPopupContainer(el, dialogContext) {
      if (dialogContext) {
        return dialogContext.getDialogWrap();
      } else {
        return document.body;
      }
    },
  },
  watch: {},
  mounted() {},
};
</script>
<style lang="scss">
@import "../components/styles/index.scss";
html,
body {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  overflow: hidden;
}
.app-main {
  height: 100vh;
  .sider-wrap {
    overflow: hidden;
    overflow-y: scroll;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}

/*  */
.clearfix {
  zoom: 1;
  &:before,
  &:after {
    content: " ";
    display: table;
  }
  &:after {
    clear: both;
    visibility: hidden;
    font-size: 0;
    height: 0;
  }
}

.fl {
  float: left;
}

.fr {
  float: right;
}

.text-left {
  text-align: left;
}

.text-right {
  text-align: right;
}

.text-center {
  text-align: center;
}

.red-text {
  color: red;
}
.orange-text {
  color: orange;
}
.green-text {
  color: green;
}
.cyan-text {
  color: cyan;
}
.blue-text {
  color: blue;
}
.purple-text {
  color: purple;
}
.magenta-text {
  color: magenta;
}
.aqua-text {
  color: aqua;
}
.lime-text {
  color: lime;
}
.m-200 {
  margin: 200px;
}
.mt-200 {
  margin-top: 200px;
}
.mb-200 {
  margin-bottom: 200px;
}
.mtb-200 {
  margin-top: 200px;
  margin-bottom: 200px;
}
.ml-200 {
  margin-left: 200px;
}
.mr-200 {
  margin-right: 200px;
}
.mlr-200 {
  margin-left: 200px;
  margin-right: 200px;
}
.p-200 {
  padding: 200px;
}
.pt-200 {
  padding-top: 200px;
}
.pb-200 {
  padding-bottom: 200px;
}
.ptb-200 {
  padding-top: 200px;
  padding-bottom: 200px;
}
.pl-200 {
  padding-left: 200px;
}
.pr-200 {
  padding-right: 200px;
}
.plr-200 {
  padding-left: 200px;
  padding-right: 200px;
}
.m-100 {
  margin: 100px;
}
.mt-100 {
  margin-top: 100px;
}
.mb-100 {
  margin-bottom: 100px;
}
.mtb-100 {
  margin-top: 100px;
  margin-bottom: 100px;
}
.ml-100 {
  margin-left: 100px;
}
.mr-100 {
  margin-right: 100px;
}
.mlr-100 {
  margin-left: 100px;
  margin-right: 100px;
}
.p-100 {
  padding: 100px;
}
.pt-100 {
  padding-top: 100px;
}
.pb-100 {
  padding-bottom: 100px;
}
.ptb-100 {
  padding-top: 100px;
  padding-bottom: 100px;
}
.pl-100 {
  padding-left: 100px;
}
.pr-100 {
  padding-right: 100px;
}
.plr-100 {
  padding-left: 100px;
  padding-right: 100px;
}
.m-50 {
  margin: 50px;
}
.mt-50 {
  margin-top: 50px;
}
.mb-50 {
  margin-bottom: 50px;
}
.mtb-50 {
  margin-top: 50px;
  margin-bottom: 50px;
}
.ml-50 {
  margin-left: 50px;
}
.mr-50 {
  margin-right: 50px;
}
.mlr-50 {
  margin-left: 50px;
  margin-right: 50px;
}
.p-50 {
  padding: 50px;
}
.pt-50 {
  padding-top: 50px;
}
.pb-50 {
  padding-bottom: 50px;
}
.ptb-50 {
  padding-top: 50px;
  padding-bottom: 50px;
}
.pl-50 {
  padding-left: 50px;
}
.pr-50 {
  padding-right: 50px;
}
.plr-50 {
  padding-left: 50px;
  padding-right: 50px;
}
.m-40 {
  margin: 40px;
}
.mt-40 {
  margin-top: 40px;
}
.mb-40 {
  margin-bottom: 40px;
}
.mtb-40 {
  margin-top: 40px;
  margin-bottom: 40px;
}
.ml-40 {
  margin-left: 40px;
}
.mr-40 {
  margin-right: 40px;
}
.mlr-40 {
  margin-left: 40px;
  margin-right: 40px;
}
.p-40 {
  padding: 40px;
}
.pt-40 {
  padding-top: 40px;
}
.pb-40 {
  padding-bottom: 40px;
}
.ptb-40 {
  padding-top: 40px;
  padding-bottom: 40px;
}
.pl-40 {
  padding-left: 40px;
}
.pr-40 {
  padding-right: 40px;
}
.plr-40 {
  padding-left: 40px;
  padding-right: 40px;
}
.m-35 {
  margin: 35px;
}
.mt-35 {
  margin-top: 35px;
}
.mb-35 {
  margin-bottom: 35px;
}
.mtb-35 {
  margin-top: 35px;
  margin-bottom: 35px;
}
.ml-35 {
  margin-left: 35px;
}
.mr-35 {
  margin-right: 35px;
}
.mlr-35 {
  margin-left: 35px;
  margin-right: 35px;
}
.p-35 {
  padding: 35px;
}
.pt-35 {
  padding-top: 35px;
}
.pb-35 {
  padding-bottom: 35px;
}
.ptb-35 {
  padding-top: 35px;
  padding-bottom: 35px;
}
.pl-35 {
  padding-left: 35px;
}
.pr-35 {
  padding-right: 35px;
}
.plr-35 {
  padding-left: 35px;
  padding-right: 35px;
}
.m-30 {
  margin: 30px;
}
.mt-30 {
  margin-top: 30px;
}
.mb-30 {
  margin-bottom: 30px;
}
.mtb-30 {
  margin-top: 30px;
  margin-bottom: 30px;
}
.ml-30 {
  margin-left: 30px;
}
.mr-30 {
  margin-right: 30px;
}
.mlr-30 {
  margin-left: 30px;
  margin-right: 30px;
}
.p-30 {
  padding: 30px;
}
.pt-30 {
  padding-top: 30px;
}
.pb-30 {
  padding-bottom: 30px;
}
.ptb-30 {
  padding-top: 30px;
  padding-bottom: 30px;
}
.pl-30 {
  padding-left: 30px;
}
.pr-30 {
  padding-right: 30px;
}
.plr-30 {
  padding-left: 30px;
  padding-right: 30px;
}
.m-25 {
  margin: 25px;
}
.mt-25 {
  margin-top: 25px;
}
.mb-25 {
  margin-bottom: 25px;
}
.mtb-25 {
  margin-top: 25px;
  margin-bottom: 25px;
}
.ml-25 {
  margin-left: 25px;
}
.mr-25 {
  margin-right: 25px;
}
.mlr-25 {
  margin-left: 25px;
  margin-right: 25px;
}
.p-25 {
  padding: 25px;
}
.pt-25 {
  padding-top: 25px;
}
.pb-25 {
  padding-bottom: 25px;
}
.ptb-25 {
  padding-top: 25px;
  padding-bottom: 25px;
}
.pl-25 {
  padding-left: 25px;
}
.pr-25 {
  padding-right: 25px;
}
.plr-25 {
  padding-left: 25px;
  padding-right: 25px;
}
.m-20 {
  margin: 20px;
}
.mt-20 {
  margin-top: 20px;
}
.mb-20 {
  margin-bottom: 20px;
}
.mtb-20 {
  margin-top: 20px;
  margin-bottom: 20px;
}
.ml-20 {
  margin-left: 20px;
}
.mr-20 {
  margin-right: 20px;
}
.mlr-20 {
  margin-left: 20px;
  margin-right: 20px;
}
.p-20 {
  padding: 20px;
}
.pt-20 {
  padding-top: 20px;
}
.pb-20 {
  padding-bottom: 20px;
}
.ptb-20 {
  padding-top: 20px;
  padding-bottom: 20px;
}
.pl-20 {
  padding-left: 20px;
}
.pr-20 {
  padding-right: 20px;
}
.plr-20 {
  padding-left: 20px;
  padding-right: 20px;
}
.m-15 {
  margin: 15px;
}
.mt-15 {
  margin-top: 15px;
}
.mb-15 {
  margin-bottom: 15px;
}
.mtb-15 {
  margin-top: 15px;
  margin-bottom: 15px;
}
.ml-15 {
  margin-left: 15px;
}
.mr-15 {
  margin-right: 15px;
}
.mlr-15 {
  margin-left: 15px;
  margin-right: 15px;
}
.p-15 {
  padding: 15px;
}
.pt-15 {
  padding-top: 15px;
}
.pb-15 {
  padding-bottom: 15px;
}
.ptb-15 {
  padding-top: 15px;
  padding-bottom: 15px;
}
.pl-15 {
  padding-left: 15px;
}
.pr-15 {
  padding-right: 15px;
}
.plr-15 {
  padding-left: 15px;
  padding-right: 15px;
}
.m-10 {
  margin: 10px;
}
.mt-10 {
  margin-top: 10px;
}
.mb-10 {
  margin-bottom: 10px;
}
.mtb-10 {
  margin-top: 10px;
  margin-bottom: 10px;
}
.ml-10 {
  margin-left: 10px;
}
.mr-10 {
  margin-right: 10px;
}
.mlr-10 {
  margin-left: 10px;
  margin-right: 10px;
}
.p-10 {
  padding: 10px;
}
.pt-10 {
  padding-top: 10px;
}
.pb-10 {
  padding-bottom: 10px;
}
.ptb-10 {
  padding-top: 10px;
  padding-bottom: 10px;
}
.pl-10 {
  padding-left: 10px;
}
.pr-10 {
  padding-right: 10px;
}
.plr-10 {
  padding-left: 10px;
  padding-right: 10px;
}
.m-5 {
  margin: 5px;
}
.mt-5 {
  margin-top: 5px;
}
.mb-5 {
  margin-bottom: 5px;
}
.mtb-5 {
  margin-top: 5px;
  margin-bottom: 5px;
}
.ml-5 {
  margin-left: 5px;
}
.mr-5 {
  margin-right: 5px;
}
.mlr-5 {
  margin-left: 5px;
  margin-right: 5px;
}
.p-5 {
  padding: 5px;
}
.pt-5 {
  padding-top: 5px;
}
.pb-5 {
  padding-bottom: 5px;
}
.ptb-5 {
  padding-top: 5px;
  padding-bottom: 5px;
}
.pl-5 {
  padding-left: 5px;
}
.pr-5 {
  padding-right: 5px;
}
.plr-5 {
  padding-left: 5px;
  padding-right: 5px;
}
</style>
