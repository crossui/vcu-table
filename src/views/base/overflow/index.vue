<template>
  <a-card title="单元格溢出省略号">
    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="description">
          <div>
            当内容溢出时显示为省略号，<span class="blue-text"
              >show-overflow</span
            >
            和 <span class="blue-text">show-header-overflow</span> 和
            <span class="blue-text">show-footer-overflow</span>
          </div>
          <div>
            <span class="blue-text">ellipsis</span> 当内容溢出时显示为省略号
          </div>
          <div>
            <span class="blue-text">title</span>
            当内容溢出时显示为省略号并用原生 title 显示
          </div>
          <div>
            <span class="blue-text">tooltip</span> 当内容溢出时显示为省略号并用
            tooltip 显示
          </div>
        </div>
      </a-alert>
      <vcu-table
        show-footer
        highlight-hover-row
        :footer-method="footerMethod"
        :data="tableData1"
      >
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column
          field="name"
          title="名称"
          show-overflow="ellipsis"
        ></vcu-table-column>
        <vcu-table-column
          field="role"
          title="角色"
          show-overflow
        ></vcu-table-column>
        <vcu-table-column
          field="date"
          title="标题溢出，显示为 tooltip xxxxxxxxxx"
          show-header-overflow
          show-overflow="title"
          show-footer-overflow
        ></vcu-table-column>
        <vcu-table-column
          field="rate"
          title="Rate"
          show-header-overflow="title"
        >
          <template v-slot:header>
            <span>标题显示原生 title ___________________________</span>
          </template>
        </vcu-table-column>
        <vcu-table-column
          field="address"
          title="不换行不换行不换行不换行不换行不换行不换行不换行不换行"
          width="160"
        ></vcu-table-column>
      </vcu-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="description">
          <div>
            通过设置 <span class="blue-text">contentMethod</span>
            方法重写默认的提示内容，显示逻辑完全自定义控制，可以返回 null
            使用默认的提示消息
          </div>
          <div>
            还可以通过
            <span class="blue-text">enterable</span> 开启鼠标是否可进入到
            tooltip 中
          </div>
        </div>
      </a-alert>
      <vcu-table
        border
        show-footer
        show-header-overflow
        highlight-hover-row
        :footer-method="footerMethod"
        :data="tableData2"
        :tooltip-config="{ contentMethod: showTooltipMethod, enterable: true }"
      >
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column field="name" title="名称"></vcu-table-column>
        <vcu-table-column
          field="role"
          title="标题溢出直接隐藏 xxxxxxxxxxxxxxxxxxxxxxxxxxx"
          show-header-overflow="ellipsis"
        ></vcu-table-column>
        <vcu-table-column
          field="date"
          title="Date"
          show-header-overflow
          show-overflow
          show-footer-overflow
        ></vcu-table-column>
        <vcu-table-column title="基本信息">
          <vcu-table-column field="rate" show-header-overflow="title">
            <template v-slot:header>
              <span>标题溢出显示原生 title xxxxxxxxxxxxxxxxxxxxxxxxxxx</span>
            </template>
          </vcu-table-column>
          <vcu-table-column title="详细信息">
            <vcu-table-column
              type="html"
              field="address"
              title="标题溢出显示tooltip内容内容内容内容内容内容"
              width="160"
              show-header-overflow
              show-overflow
            ></vcu-table-column>
          </vcu-table-column>
        </vcu-table-column>
      </vcu-table>
    </div>
  </a-card>
</template>
<script>
export default {
  data() {
    return {
      tableData1: [
        {
          name: "Test1",
          role: "前端",
          date: "内容显示原生 title",
          rate: 5,
          address: "address1",
        },
        {
          name: "内容超出隐藏，不显示提示信息xxxxxxxxxxxxxxxxxxx",
          role: "后端",
          date: "2020-02-22",
          rate: 2,
          address: "address2\ntooltip文本换行\n换行xx",
        },
        {
          name: "Test3",
          role: "内容超出一行显示为 tooltip xxxxxxxxxxxxxx",
          date: "2020-01-01",
          rate: 0,
          address: "address3\ntooltip文本换行\n换行xx",
        },
        {
          name: "Test4",
          role: "设计师",
          date: "2020-02-23",
          rate: 1,
          address: "address4",
        },
        {
          name: "Test5",
          role: "前端",
          date: "2020-01-20",
          rate: 3,
          address: "address5\ntooltip文本换行\n换行xx",
        },
      ],
      tableData2: [
        {
          name: "Test1",
          role: "前端",
          date: "不管是否超出都显示 tooltip",
          rate: 5,
          address:
            "支持多行超出显示 tooltip xxxxxxxxxxxxxxx<br>html换行<br>换行xx",
        },
        {
          name: "Test2",
          role: "后端",
          date: "2020-02-22",
          rate: 2,
          address: "address2",
        },
        {
          name: "Test3",
          role: "前端",
          date: "2020-01-01",
          rate: 0,
          address:
            "支持多行超出显示 tooltip xxxxxxxxxxxxxxx<br>html换行<br>支持多行超出显示 tooltip xxxxxxxxxxxxxxx",
        },
        {
          name: "Test4",
          role: "设计师",
          date: "2020-02-23",
          rate: 1,
          address: "address4<br>html换行<br>换行xx",
        },
        {
          name: "Test5",
          role: "前端",
          date: "2020-01-20",
          rate: 3,
          address: "address5 xxxxxxxxxxxxxxxxxxxxxx<br>html换行<br>换行xx",
        },
      ],
    };
  },
  methods: {
    showTooltipMethod({ type, column, row, items, _columnIndex }) {
      // 重写默认的提示内容
      if (column.property === "date") {
        if (type === "header") {
          return "自定义标题提示内容：" + column.title;
        } else if (type === "footer") {
          return "自定义表尾提示内容：" + items[_columnIndex];
        }
        return "自定义提示内容：" + row[column.property];
      }
    },
    footerMethod({ columns }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return "合计";
          }
          if (["date"].includes(column.property)) {
            return "说明 xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
          }
          if (["rate"].includes(column.property)) {
            return "不想换行不想换行不想换行不想换行不想换行不想换行不想换行不想换行";
          }
          return null;
        }),
      ];
      return footerData;
    },
  },
};
</script>

