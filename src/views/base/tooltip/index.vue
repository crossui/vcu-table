<template>
  <v-card title="单元格工具提示">
    <vcu-table
      show-footer
      :footer-method="footerMethod"
      :tooltip-config="{ enabled: true, contentMethod: showTooltipMethod }"
      :data="tableData"
    >
      <vcu-table-column type="seq" width="60"></vcu-table-column>
      <vcu-table-column
        field="name"
        title="名称"
        :title-help="{ message: '自定义帮助提示信息' }"
      ></vcu-table-column>
      <vcu-table-column
        field="role"
        title="角色"
        :title-help="{ message: '自定义图标', icon: 'iconfont icon-addteam' }"
      ></vcu-table-column>
      <vcu-table-column field="date" title="Date"></vcu-table-column>
      <vcu-table-column field="rate" title="Rate">
        <template v-slot:header>
          <span>自定义标题</span>
        </template>
      </vcu-table-column>
      <vcu-table-column
        field="address"
        title="Address"
        width="160"
      ></vcu-table-column>
      <vcu-table-column
        type="html"
        field="content"
        title="Content"
        width="200"
      ></vcu-table-column>
    </vcu-table>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: "Test1",
          role: "前端",
          date: "2020-02-28",
          rate: 5,
          address: "address1",
          content: "xxxxx1<br>换行换行11111111111",
        },
        {
          name: "Test2",
          role: "后端",
          date: "2020-02-22",
          rate: 2,
          address: "address2\ntooltip文本换行\n换行xx",
          content: "xxxxx1<br>换行换行2",
        },
        {
          name: "Test3",
          role: "前端",
          date: "2020-01-01",
          rate: 0,
          address: "address3\ntooltip文本换行\n换行xx",
          content: "xxxxx1<br>换行换行<br>3333",
        },
        {
          name: "Test4",
          role: "设计师",
          date: "2020-02-23",
          rate: 1,
          address: "address4",
          content: "xxxxx1<br>换行换行4",
        },
        {
          name: "Test5",
          role: "前端",
          date: "2020-01-20",
          rate: 3,
          address: "address5\ntooltip文本换行\n换行xx",
          content: "xxxxx1<br>换行换行55",
        },
      ],
    };
  },
  methods: {
    showTooltipMethod({ type, column, row, items, _columnIndex }) {
      const { property } = column;
      // 重写默认的提示内容
      if (property === "role" || property === "date") {
        if (type === "header") {
          return column.title ? "自定义标题提示内容：" + column.title : "";
        } else if (type === "footer") {
          return items[_columnIndex]
            ? "自定义表尾提示内容：" + items[_columnIndex]
            : "";
        }
        return row[property] ? "自定义提示内容：" + row[property] : "";
      }
      // 其余的单元格使用默认行为
      return null;
    },
    footerMethod({ columns }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return "合计";
          }
          if (["date"].includes(column.property)) {
            return "2020-09-05";
          }
          if (["rate"].includes(column.property)) {
            return 999.8;
          }
          return null;
        }),
      ];
      return footerData;
    },
  },
};
</script>

