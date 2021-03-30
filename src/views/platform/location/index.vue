<template>
  <v-card title="精确定位">
    <div class="mb-30">
      <div class="mb-5">
        <v-button
          type="primary"
          @click="$refs.xTable.scrollToColumn($refs.xTable.getColumns(15))"
        >
          滚动第 15 列
        </v-button>
      </div>
      <div class="mb-5">
        <v-input-number v-model="value" :min="1" />
        <v-button type="primary" @click="gotoRow" class="ml-10">
          指定行
        </v-button>
      </div>

      <div class="mb-5">
        <v-input-search
          addon-before="GUID:"
          v-model="value1"
          style="width: 400px"
          enter-button
          @search="handleCondition"
        >
        </v-input-search>
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
  </v-card>
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

