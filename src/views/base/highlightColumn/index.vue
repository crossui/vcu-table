<template>
  <v-card title="高亮列">
    <v-alert type="info" class="mb-10">
      <div slot="message">
        列和行选中高亮，通过设置
        <span class="blue-text">
          highlight-hover-column、 highlight-current-column</span
        >
        参数
      </div>
    </v-alert>
    <vcu-table
      :data="tableData"
      highlight-hover-column
      highlight-current-column
      border
    >
      <vcu-table-column type="seq" width="60"></vcu-table-column>
      <vcu-table-column field="name" title="Name"></vcu-table-column>
      <vcu-table-column field="sex" title="Sex"></vcu-table-column>
      <vcu-table-column field="age" title="Age"></vcu-table-column>
      <vcu-table-column field="address" title="address"></vcu-table-column>
    </vcu-table>

    <v-alert type="info" class="mb-10">
      <div slot="message">
        通过设置
        <span class="blue-text">currentColumnClassName</span>
        参数, 改变默认CLASSNAME
      </div>
    </v-alert>
    <vcu-table
      :data="tableData"
      highlight-hover-column
      highlight-current-column
      border
      hoverColumnClassName="col-hover-new"
      currentColumnClassName="col-current-new"
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
};
</script>
<style lang="less" scoped>
/deep/ .vcu-table {
  .vcu-header--column,
  .vcu-body--column,
  .vcu-footer--column {
    &.col-current-new {
      background: olive;
      color: #fff;
    }
  }

  &.column--highlight {
    .vcu-header--column {
      &.col-hover-new:not(.col--seq) {
        &:hover {
          background: red;
          color: #fff;
        }
      }
    }
  }
}
</style>

