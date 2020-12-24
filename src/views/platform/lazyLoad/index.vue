<template>
  <a-card title="懒加载">
    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            开启
            <span class="blue-text"> isLazy </span>
          </div>
        </div>
      </a-alert>
      <div class="mb-5">
        <a-button @click="$refs.xTable.getTableListData(true)">重置数据</a-button>
        <a-button @click="$refs.xTable.scrollToRow($refs.xTable.getData(30))">
          指定行
        </a-button>
      </div>
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
        headUrl: "dataq/api/header/getApproveArrearageList",
        pageUrl: "dataq/api/page/getApproveArrearageList",
        seq: true
      },
    };
  },
  mounted() {},
  methods: {},
};
</script>

