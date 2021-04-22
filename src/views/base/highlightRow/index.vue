<template>
  <v-card title="高亮行">
    <v-alert type="info" class="mb-10">
      <div slot="message">
        列和行选中高亮，通过设置
        <span class="blue-text"
          >highlight-hover-row、 highlight-current-row
        </span>
        参数
      </div>
    </v-alert>
    <vcu-table
      :data="tableData"
      highlight-hover-row
      highlight-current-row
      stripe
      border
    >
      <vcu-table-column type="seq" width="60"></vcu-table-column>
      <vcu-table-column field="name" title="Name"></vcu-table-column>
      <vcu-table-column field="sex" title="Sex"></vcu-table-column>
      <vcu-table-column field="age" title="Age"></vcu-table-column>
      <vcu-table-column field="address" title="address"></vcu-table-column>
    </vcu-table>

    <v-alert type="info" class="mtb-10">
      <div slot="message">
        通过设置
        <span class="blue-text">hoverRowClassName、 currentRowClassName </span>
        参数, 改变默认的CLASSNAME
      </div>
    </v-alert>
    <vcu-table
      :data="tableData"
      highlight-hover-row
      highlight-current-row
      border
      stripe
      :row-class-name="rowClassName"
      hoverRowClassName="row-hover-new"
      currentRowClassName="row-current-new"
    >
      <vcu-table-column type="seq" width="60"></vcu-table-column>
      <vcu-table-column field="name" title="Name"></vcu-table-column>
      <vcu-table-column field="sex" title="Sex"></vcu-table-column>
      <vcu-table-column field="age" title="Age"></vcu-table-column>
      <vcu-table-column field="address" title="address"></vcu-table-column>
    </vcu-table>
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
    rowClassName({ rowIndex }) {
      if ([1, 3, 5].includes(rowIndex)) {
        return "bg-green";
      }
    },
  },
};
</script>
<style lang="less" scoped>
.vcu-table {
  /deep/ .vcu-body--row {
    &.row-current-new {
      background: orange;
      color: #fff;
    }
    &.row-hover-new {
      background: red;
      color: #fff;
    }
  }
}
</style>

