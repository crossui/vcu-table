<template>
  <div id="app">
    <a-layout class="app-main">
      <a-layout-sider>
        <a-menu mode="inline" theme="dark" @click="handleClickMenu">
          <template v-for="(item, index) in menuList">
            <a-sub-menu :key="index" v-if="item.children">
              <span slot="title">{{ item.meta.title }}</span>
              <a-menu-item :key="subitem.name" v-for="subitem in item.children">
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
</template>
<script>
import { menuRouter } from "@/router/router";

export default {
  data() {
    return {
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
  },
  watch: {},
  mounted() {},
};
</script>
<style lang="less">
@import "../components/styles/index.css";
html,
body {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  overflow: hidden;
}
.app-main {
  height: 100vh;
}
</style>
