<template>
  <v-card title="事件">
    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          更多事件请查看基础功能 <span class="blue-text"> 事件绑定 </span>
        </div>
      </v-alert>
      <vcu-table
        ref="xTable"
        isLazy
        :loadOptions="options"
        max-height="200"
        :row-class-name="rowClassName"
        @cell-click="cellClickEvent"
      >
      </vcu-table>
    </div>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      currRowIndex: 0,
      options: {
        headUrl: "dataq/api/bigDataHeader",
        pageUrl: "dataq/api/bigDataPage",
      },
    };
  },
  mounted() {},
  methods: {
    rowClassName({ rowIndex }) {
      if (this.currRowIndex == rowIndex) {
        return "bg-green";
      }
    },
    cellClickEvent({ rowIndex }) {
      this.currRowIndex = rowIndex;
      console.info(rowIndex);
    },
  },
};
</script>

