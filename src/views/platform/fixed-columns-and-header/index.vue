<template>
  <a-card title="固定头和列">
    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            通用平台设置
            <span class="blue-text"> fixed </span> 固定;
            <span class="blue-text"> ellipsis </span>
            开启省略号，
          </div>
        </div>
      </a-alert>
      <div class="mb-5"></div>
      <vcu-table ref="xTable" :loadOptions="options"> </vcu-table>
    </div>
  </a-card>
</template>
<script>
export default {
  data() {
    return {
      options: {
        headUrl: "dataq/api/header/getApproveArrearageList",
        pageUrl: "dataq/api/page/getApproveArrearageList",
      },
    };
  },
  mounted() {},
  methods: {},
};
</script>

