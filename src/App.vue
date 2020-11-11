<template>
  <div id="app">
    <a-layout class="app-main">
      <a-layout-sider>
        <a-menu mode="inline" theme="dark" @click="handleClickMenu">
          <template v-for="item in menuList">
            <a-sub-menu :key="item.name" v-if="item.children">
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
@import "../components/styles/index.less";
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




@textColor : red,
orange,
green,
cyan,
blue,
purple,
magenta,
aqua,
lime;

.text-color-classes(@i: length(@textColor)) when (@i > 0) {
    .text-color-classes(@i - 1);
    @color: extract(@textColor, @i);

    .@{color}-text {
        color: @color;
    }
}

.text-color-classes();



@spacinglist: 5, 10, 15, 20, 25, 30, 35, 40, 50, 100, 200;

.spacing-loop(@counter) when (@counter > 0) {
  @class: extract(@spacinglist, @counter);
  .m-@{class}{
    margin: (1px * extract(@spacinglist, @counter)); 
  }
  .mt-@{class}{
    margin-top: (1px * extract(@spacinglist, @counter)); 
  }
  .mb-@{class}{
    margin-bottom: (1px * extract(@spacinglist, @counter)); 
  }
  .mtb-@{class}{
    margin-top: (1px * extract(@spacinglist, @counter)); 
    margin-bottom: (1px * extract(@spacinglist, @counter)); 
  }
  .ml-@{class}{
    margin-left: (1px * extract(@spacinglist, @counter)); 
  }
  .mr-@{class}{
    margin-right: (1px * extract(@spacinglist, @counter)); 
  }
  .mlr-@{class}{
    margin-left: (1px * extract(@spacinglist, @counter)); 
    margin-right: (1px * extract(@spacinglist, @counter)); 
  }

  .p-@{class}{
    padding: (1px * extract(@spacinglist, @counter)); 
  }
  .pt-@{class}{
    padding-top: (1px * extract(@spacinglist, @counter)); 
  }
  .pb-@{class}{
    padding-bottom: (1px * extract(@spacinglist, @counter)); 
  }
  .ptb-@{class}{
    padding-top: (1px * extract(@spacinglist, @counter)); 
    padding-bottom: (1px * extract(@spacinglist, @counter)); 
  }
  .pl-@{class}{
    padding-left: (1px * extract(@spacinglist, @counter)); 
  }
  .pr-@{class}{
    padding-right: (1px * extract(@spacinglist, @counter)); 
  }
  .plr-@{class}{
    padding-left: (1px * extract(@spacinglist, @counter)); 
    padding-right: (1px * extract(@spacinglist, @counter)); 
  }
  .spacing-loop((@counter - 1));  
}

.spacing-loop(11);
</style>
