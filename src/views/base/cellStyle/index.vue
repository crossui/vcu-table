<template>
  <v-card title="单元格样式">
    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            行的样色、单元格样式，表头的样式、表尾的样式、全部都可以完全自定义，通过设置
            <span class="blue-text"
              >cell-class-name、header-cell-class-name、row-class-name、footer-row-class-name</span
            >
            ...等参数
          </div>
          <div>
            预设背景色CLASSNAME：
            <span class="blue-text">
              bg-red, bg-orange, bg-green, bg-cyan, bg-blue, bg-purple,
              bg-magenta, bg-aqua, bg-lime, bg-mistyrose, bg-cornsilk,
              bg-palegreen, bg-lightcyan, bg-lightskyblue, bg-lavender,
              bg-pink</span
            >
          </div>
          <div class="red-text">
            注：当自定义样式之后可能会覆盖表格的样式，比如选中行..等，记得自行处理好相关样式
          </div>
        </div>
      </v-alert>
      <vcu-table
        border
        show-footer
        highlight-hover-row
        highlight-current-row
        :footer-method="footerMethod"
        :header-cell-class-name="headerCellClassName"
        :row-class-name="rowClassName"
        :cell-class-name="cellClassName"
        :footer-row-class-name="footerRowClassName"
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
            通过<span class="blue-text">cell-click</span> 事件点击改变颜色
          </div>
        </div>
      </v-alert>
      <vcu-table
        border
        :data="tableData"
        :cell-class-name="cellClassName2"
        @cell-click="cellClickEvent"
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
            行的动态样色、单元格动态样式，表头的动态样式、表尾的动态样式、全部都可以完全自定义，通过设置
            <span class="blue-text"
              >cell-style、header-cell-style、row-style ...</span
            >等参数
          </div>
          <div class="red-text">
            注：当自定义样式之后可能会覆盖表格的样式，比如选中行..等，记得自行处理好相关样式
          </div>
        </div>
      </v-alert>
      <vcu-table
        border
        :data="tableData"
        :header-cell-style="headerCellStyle"
        :row-style="rowStyle"
        :cell-style="cellStyle"
      >
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column field="name" title="Name"></vcu-table-column>
        <vcu-table-column field="sex" title="Sex"></vcu-table-column>
        <vcu-table-column field="age" title="Age"></vcu-table-column>
      </vcu-table>
    </div>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "vcu-table 好好学习天天向上",
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
      selectRow: null,
      selectColumn: null,
    };
  },
  methods: {
    footerMethod({ columns }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 1) {
            return "合计";
          }
          if (["sex"].includes(column.property)) {
            return this.tableData.length;
          }
          return null;
        }),
      ];
      return footerData;
    },
    headerCellClassName({ column }) {
      if (column.property === "name") {
        return "bg-blue";
      }
    },
    rowClassName({ rowIndex }) {
      if ([2, 3, 5].includes(rowIndex)) {
        return "bg-green";
      }
    },
    cellClassName({ row, column }) {
      if (column.property === "sex") {
        if (row.sex == "Women") {
          return "bg-red";
        } else {
          return "bg-pink";
        }
      }
    },
    footerRowClassName(a) {
      return "bg-purple";
      console.info(a);
    },
    cellClassName2({ row, column }) {
      if ((row === this.selectRow) & (column === this.selectColumn)) {
        return "bg-orange";
      }
    },
    cellClickEvent({ row, column }) {
      this.selectRow = row;
      this.selectColumn = column;
    },

    headerCellStyle({ column, columnIndex }) {
      if (column.property === "name") {
        return {
          backgroundColor: "#f60",
          color: "#ffffff",
        };
      }
    },
    rowStyle({ row, rowIndex }) {
      if ([2, 3, 5].includes(rowIndex)) {
        return {
          backgroundColor: "red",
          color: "#ffffff",
        };
      }
    },
    cellStyle({ row, rowIndex, column, columnIndex }) {
      if (column.property === "sex") {
        if (row.sex >= "1") {
          return {
            backgroundColor: "#187",
          };
        } else if (row.age === 26) {
          return {
            backgroundColor: "#2db7f5",
          };
        }
      }
    },
  },
};
</script>

