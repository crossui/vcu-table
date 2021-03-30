<template>
  <v-card title="表尾数据">
    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            通过表尾来实现合计功能，设置
            <span class="blue-text">show-footer</span> 和
            <span class="blue-text">footer-method</span> 设置表尾数据
          </div>
          <div>
            <span class="blue-text">footer-method</span> 方法返回参数
            <span class="red-text">{$grid，$table，columns，data}</span>
          </div>
        </div>
      </v-alert>
      <vcu-table
        border
        show-footer
        :footer-method="footerMethod"
        :data="tableData"
      >
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column field="name" title="Name"></vcu-table-column>
        <vcu-table-column field="sex" title="Sex"></vcu-table-column>
        <vcu-table-column field="age" title="Age"></vcu-table-column>
      </vcu-table>
    </div>

    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          <div>结果返回一个二维数组时显示多行表尾数据</div>
          <div>
            需要注意的是表尾的调用并非实时的，而是在 data
            初始化时才会触发执行；如果要达到实时调用请手动调用
            <span class="red-text">updateFooter</span> 方法
          </div>
        </div>
      </v-alert>
      <vcu-table
        border
        show-footer
        :footer-method="footerMethod1"
        :data="tableData"
      >
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column field="name" title="Name"></vcu-table-column>
        <vcu-table-column field="sex" title="Sex"></vcu-table-column>
        <vcu-table-column field="age" title="Age"></vcu-table-column>
      </vcu-table>
    </div>

    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            配合
            <span class="blue-text">footer-cell-class-name</span>
            自定义不同列颜色
          </div>
        </div>
      </v-alert>
      <v-button
        class="mb-5"
        @click="
          () => {
            showFooter = !showFooter;
          }
        "
        >显示/隐藏表尾</v-button
      >
      <vcu-table
        border
        :show-footer="showFooter"
        :footer-method="footerMethod1"
        :columns="tableColumn"
        :data="tableData"
        :footer-cell-class-name="footerCellClassName"
      >
      </vcu-table>
    </div>
  </v-card>
</template>
<script>
import XEUtils from "xe-utils";
export default {
  data() {
    return {
      showFooter: true,
      tableColumn: [
        { type: "seq", width: 150, fixed: "left" },
        { field: "name", title: "Name", width: 600 },
        { field: "sex", title: "Sex", width: 600 },
        { field: "age", title: "Age", width: 600 },
        { field: "address", title: "Address", fixed: "right", width: 200 },
      ],
      tableData: [
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "好好学习天天向上",
        },
        {
          id: 10002,
          name: "Test2",
          role: "Test",
          sex: "Women",
          age: 22,
          address: "Guangzhou",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          age: 32,
          address: "Shanghai",
        },
        {
          id: 10004,
          name: "Test4",
          role: "Designer",
          sex: "Women ",
          age: 24,
          address: "Shanghai",
        },
      ],
    };
  },
  methods: {
    footerMethod({ columns, data }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return "合计";
          }
          if (["name"].includes(column.property)) {
            return data.length;
          }
          return null;
        }),
      ];
      return footerData;
    },
    footerMethod1({ columns, data }) {
      const means = [];
      const sums = [];
      const others = [];
      columns.forEach((column, columnIndex) => {
        if (columnIndex === 0) {
          means.push("平均");
          sums.push("和值");
          others.push("其他");
        } else {
          let meanCell = null;
          let sumCell = null;
          let otherCell = "-";
          switch (column.property) {
            case "age":
              meanCell = parseInt(XEUtils.mean(data, column.property));
              sumCell = XEUtils.sum(data, column.property);
              break;
            case "sex":
              otherCell = "无";
              break;
          }
          means.push(meanCell);
          sums.push(sumCell);
          others.push(otherCell);
        }
      });
      // 返回一个二维数组的表尾合计
      return [means, sums, others];
    },
    footerCellClassName({ $rowIndex, column, columnIndex }) {
      if (column.type === "seq") {
        if ($rowIndex === 0) {
          return "bg-blue";
        } else {
          return "bg-red";
        }
      } else if (column.property === "age") {
        if ($rowIndex === 1) {
          return "bg-green";
        }
      }
    },
  },
};
</script>

