<template>
  <a-card title="自定义模板">
    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            使用
            <span class="blue-text"> slot </span> 方式
          </div>
        </div>
      </a-alert>
      
      <vcu-table
        ref="xTable"
        isLazy
        show-overflow
        height="200"
        :loadOptions="options"
      >
      </vcu-table>
    </div>
  </a-card>
</template>
<script>
export default {
  data() {
    return {
      options: {
        headUrl: "dataq/api/header/getApproveArrearageListAction",
        pageUrl: "dataq/api/page/getApproveArrearageList",
      },
    };
  },
  mounted() {},
  methods: {},
};
</script>

