<template>
  <a-card title="事件绑定">
    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          表格事件绑定，通过设置
          <span class="blue-text">
            header-cell-click、 header-cell-dblclick、
            header-cell-context-menu、 cell-click、 cell-dblclick、
            cell-mouseenter、 cell-mouseleave、 cell-context-menu、 scroll </span
          >等常用事件
        </div>
      </a-alert>
      <vcu-table
        border
        resizable
        show-footer
        height="200"
        :footer-method="footerMethod"
        :columns="tableColumn"
        :data="tableData"
        @header-cell-click="headerCellClickEvent"
        @header-cell-dblclick="headerCellDBLClickEvent"
        @header-cell-context-menu="headerCellContextMenuEvent"
        @cell-click="cellClickEvent"
        @cell-dblclick="cellDBLClickEvent"
        @cell-mouseenter="cellMouseenterEvent"
        @cell-mouseleave="cellMouseleaveEvent"
        @cell-context-menu="cellContextMenuEvent"
        @scroll="scrollEvent"
      ></vcu-table>
    </div>
  </a-card>
</template>
<script>
export default {
  data() {
    return {
      tableColumn: [
        { type: "seq", width: 50 },
        { field: "name", title: "Name" },
        { field: "sex", title: "Sex", showHeaderOverflow: true },
        { field: "age", title: "Age", showHeaderOverflow: true },
        { field: "address", title: "Address", showOverflow: true },
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
        {
          id: 10005,
          name: "Test4",
          role: "Designer",
          sex: "Women ",
          age: 24,
          address: "Shanghai",
        },
        {
          id: 10006,
          name: "Test4",
          role: "Designer",
          sex: "Women ",
          age: 24,
          address: "Shanghai",
        },
        {
          id: 10007,
          name: "Test4",
          role: "Designer",
          sex: "Women ",
          age: 24,
          address: "Shanghai",
        },
        {
          id: 10008,
          name: "Test4",
          role: "Designer",
          sex: "Women ",
          age: 24,
          address: "Shanghai",
        },
        {
          id: 10009,
          name: "Test4",
          role: "Designer",
          sex: "Women ",
          age: 24,
          address: "Shanghai",
        },
        {
          id: 10010,
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
    headerCellClickEvent({ column }) {
      console.log(`表头单元格点击${column.title}`);
    },
    headerCellDBLClickEvent({ column }) {
      console.log(`表头单元格双击${column.title}`);
    },
    headerCellContextMenuEvent({ column }) {
      console.log(`右键列 ${column.title}`);
    },
    cellClickEvent({ row, rowIndex, column }) {
      console.log(`单元格点击${column.title},${rowIndex}`);
    },
    cellDBLClickEvent({ column }) {
      console.log(`单元格双击${column.title}`);
    },
    cellMouseenterEvent({ column }) {
      console.log(`鼠标进入单元格${column.title}`);
    },
    cellMouseleaveEvent({ column }) {
      console.log(`鼠标离开单元格${column.title}`);
    },
    cellContextMenuEvent({ row }) {
      console.log(`右键行 ${row.name}`);
    },
    scrollEvent({ scrollTop, scrollLeft }) {
      console.log(`滚动事件scrollTop=${scrollTop} scrollLeft=${scrollLeft}`);
    },
  },
};
</script>

