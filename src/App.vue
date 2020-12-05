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
<style lang="less">
@import "../components/styles/index.less";
@import "./styles/index.less";
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
</style>
