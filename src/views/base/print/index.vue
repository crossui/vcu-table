<template>
  <a-card title="打印">
    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          <div>通过调用 <span class="blue-text">print</span> 函数打印表格</div>
          <div class="red-text">
            （注：打印的页数有限，如果超大数据量请关闭打印功能或者分页打印）
          </div>
        </div>
      </a-alert>
      <a-button-group class="mb-5">
        <a-button @click="printEvent">打印</a-button>
        <a-button @click="printSelectEvent">打印选中</a-button>
      </a-button-group>

      <vxe-table
        border
        show-footer
        export-config
        ref="xTable"
        :footer-method="footerMethod"
        :columns="tableColumn"
        :data="tableData"
      ></vxe-table>
    </div>
  </a-card>
</template>
<script>
export default {
  data() {
    return {
      tableColumn: [
        { type: "seq" },
        { field: "name", title: "Name" },
        { field: "sex", title: "Sex" },
        { field: "age", title: "Age" },
        { field: "address", title: "Address" },
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
    printEvent() {
      this.$refs.xTable.print();
    },
    printSelectEvent() {
      this.$refs.xTable.print({
        data: this.$refs.xTable.getCheckboxRecords(),
      });
    },
  },
};
</script>

