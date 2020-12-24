<template>
  <a-card title="精确定位">
    <div class="mb-30">
      <div class="mb-5">
        <a-input-number v-model="value" :min="1" />
        <a-button type="primary" @click="gotoRow" class="ml-10">
          指定行
        </a-button>
      </div>

      <div class="mb-5">
        <a-input-search
          addon-before="GUID:"
          v-model="value1"
          style="width: 400px"
          enter-button
          @search="handleCondition"
        >
        </a-input-search>
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
      value: 1,
      options: {
        headUrl: "dataq/api/header/getApproveArrearageList",
        pageUrl: "dataq/api/page/getApproveArrearageList",
        seq: true,
      },
      value1: "",
    };
  },
  methods: {
    gotoRow() {
      this.$refs.xTable.scrollToRow(this.$refs.xTable.getData(this.value - 1));
    },
    handleCondition() {
      this.$refs.xTable.scrollToCondition((row) => {
        console.info(row.guid, this.value1);
        return row.guid == this.value1;
      });
    },
  },
};
</script>

