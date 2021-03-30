<template>
  <v-card title="实时更新数据">
    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            通过 <span class="blue-text"> slot </span> 插槽（实时） 或者
            <span class="blue-text"> formatter </span>
            格式化内容（值改变时），自动计算联动的行数据，如果是用原生输入框可以通过添加
            <span class="blue-text">immediate</span> 启用实时运算
          </div>
        </div>
      </v-alert>

      <vcu-table
        ref="xTable"
        :data="tableData"
        :edit-config="{
          trigger: 'click',
          mode: 'cell',
        }"
        show-footer
        :footer-method="footerMethod"
      >
        <vcu-table-column type="checkbox" width="60"></vcu-table-column>
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column
          field="name"
          title="书名"
          :edit-render="{ autofocus: '.my-input' }"
        >
          <template v-slot:edit="scope">
            <v-input
              size="small"
              v-model="scope.row.name"
              @input="$refs.xTable.updateStatus(scope)"
              class="my-input"
            ></v-input>
          </template>
        </vcu-table-column>
        <vcu-table-column field="amount" title="单价" :edit-render="{}">
          <template v-slot:edit="scope">
            <v-input-number
              size="small"
              v-model="scope.row.amount"
              style="width: 100%"
            ></v-input-number>
          </template>
        </vcu-table-column>
        <vcu-table-column field="number" title="数量" :edit-render="{}">
          <template v-slot:edit="{ row }">
            <v-input-number
              size="small"
              v-model="row.number"
              style="width: 100%"
            ></v-input-number>
          </template>
        </vcu-table-column>
        <vcu-table-column title="总价">
          <template v-slot="{ row }">
            <span>{{ countAmount(row) }} 元</span>
          </template>
        </vcu-table-column>
      </vcu-table>
    </div>
  </v-card>
</template>
<script>
import XEUtils from "xe-utils";
export default {
  data() {
    return {
      tableData: [
        {
          id: 10001,
          name: "JavaScript 权威指南",
          amount: 80,
          number: 2,
        },
        {
          id: 10002,
          name: "Vue 入门到精通",
          amount: 180,
          number: 22,
        },
        {
          id: 10003,
          name: "深入现代 JavaScript 应用开发",
          amount: 60,
          number: 1,
        },
        {
          id: 10004,
          name: "ECMAScript 6 入门",
          amount: 30,
          number: 5,
        },
      ],
    };
  },
  mounted() {},
  methods: {
    getSelectLabel(value, list, valueProp = "value", labelField = "label") {
      const item = XEUtils.find(list, (item) => item[valueProp] === value);
      return item ? item[labelField] : null;
    },
    countAmount(row) {
      return XEUtils.multiply(row.amount, row.number);
    },
    countAllAmount(data) {
      return XEUtils.sum(data.map((row) => this.countAmount(row)));
    },
    footerMethod({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return "合计";
          }
          if (columnIndex === 4) {
            return `${XEUtils.sum(data, "number")} 本`;
          } else if (columnIndex === 5) {
            return `共 ${this.countAllAmount(data)} 元`;
          }
          return "-";
        }),
      ];
    },
  },
};
</script>

