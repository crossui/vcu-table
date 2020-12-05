<template>
  <i class="iconfont" :class="type" @click="handleClick"></i>
</template>
<script>
export default {
  name: "iconfont",
  props: {
    type: {
      required: true,
      type: String
    }
  },
  methods: {
    handleClick(event){
      this.$emit('click', event)
    }
  }
};
</script>
<style lang="less" scoped>
@import "./index.less";
</style>
