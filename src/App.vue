<template>
  <v-config-provider :getPopupContainer="getPopupContainer" :locale="zh_CN">
    <div id="app">
      <v-layout class="app-main">
        <v-layout-sider class="sider-wrap">
          <v-menu mode="inline" theme="dark" @click="handleClickMenu">
            <template v-for="item in menuList">
              <v-sub-menu :key="item.name" v-if="item.children">
                <span slot="title">{{ item.meta.title }}</span>
                <v-menu-item
                  :key="subitem.name"
                  v-for="subitem in item.children"
                >
                  {{ subitem.meta.title }}
                </v-menu-item>
              </v-sub-menu>
            </template>
          </v-menu>
        </v-layout-sider>
        <v-layout>
          <v-layout-content><router-view /></v-layout-content>
        </v-layout>
      </v-layout>
    </div>
  </v-config-provider>
</template>
<script>
import zh_CN from "vcu/dist/locale/zh_CN";
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
