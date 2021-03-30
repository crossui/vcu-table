<template>
  <v-card title="响应式宽高">
    <v-button-group class="mb-10">
      <v-button @click="tableWidth = '600px'">宽600px</v-button>
      <v-button @click="tableWidth = '700px'">宽700px</v-button>
      <v-button @click="tableWidth = '800px'">宽800px</v-button>
      <v-button @click="tableHeight = '300px'">高300px</v-button>
      <v-button @click="tableHeight = '500px'">高500px</v-button>
      <v-button @click="tableHeight = '800px'">高800px</v-button>
    </v-button-group>
    <v-alert type="info" class="mb-10">
      <div slot="message">
        当一个表格需要铺满父容器时，通过设置
        <span class="blue-text">height=auto</span>
        表格会自动根据父容器的高度去铺满，但是只会在数据重新加载时才会计算
        还可以根据不同场景添加
        <span class="blue-text">sync-resize</span>（属性监听） 或
        <span class="blue-text">auto-resize</span
        >（父元素监听），这样就只需要通过样式控制父容器高度就可以实现响应式表格
      </div>
    </v-alert>
    <div :style="{ width: tableWidth, height: tableHeight }">
      <vcu-table
        border
        auto-resize
        show-footer
        height="auto"
        :footer-method="footerMethod"
        :data="tableData"
      >
        <vcu-table-column type="seq" width="60" fixed="left"></vcu-table-column>
        <vcu-table-column
          field="name"
          title="Name"
          width="300"
        ></vcu-table-column>
        <vcu-table-column
          field="sex"
          title="Sex"
          width="300"
        ></vcu-table-column>
        <vcu-table-column
          field="age"
          title="Age"
          width="300"
        ></vcu-table-column>
        <vcu-table-column
          field="date13"
          title="Date"
          width="300"
        ></vcu-table-column>
        <vcu-table-column
          field="address"
          title="Address"
          width="200"
          fixed="right"
          show-overflow
        ></vcu-table-column>
      </vcu-table>
    </div>
  </v-card>
</template>
<script>
import XEUtils from "xe-utils";
export default {
  data() {
    return {
      tableWidth: null,
      tableHeight: "300px",
      tableData: [],
    };
  },
  mounted() {
    let lng = new Array(20);
    for (let i = 0; i < 20; i++) {
      this.tableData.push({
        id: i,
        name: "Test4",
        role: "Designer",
        sex: "Women ",
        age: 24,
        address: "Shanghai",
      });
    }
  },
  methods: {
    footerMethod({ columns, data }) {
      const means = [];
      const sums = [];
      columns.forEach((column, columnIndex) => {
        if (columnIndex === 0) {
          means.push("平均");
          sums.push("和值");
        } else {
          let meanCell = null;
          let sumCell = null;
          switch (column.property) {
            case "age":
            case "rate":
              meanCell = parseInt(XEUtils.mean(data, column.property));
              sumCell = XEUtils.sum(data, column.property);
              break;
          }
          means.push(meanCell);
          sums.push(sumCell);
        }
      });
      // 返回一个二维数组的表尾合计
      return [means, sums];
    },
  },
};
</script>

