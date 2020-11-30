<template>
  <a-card title="高亮列">
    <a-alert type="info" class="mb-10">
      <div slot="message">
        列和行选中高亮，通过设置
        <span class="blue-text"
          >highlight-hover-row、
          highlight-current-row、
          highlight-hover-column、
          highlight-current-column</span
        >
        参数
      </div>
    </a-alert>
    <vxe-table
      :data="tableData"
      highlight-hover-row
      highlight-current-row
      highlight-hover-column
      highlight-current-column
      border
    >
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column field="address" title="address"></vxe-table-column>
    </vxe-table>
  </a-card>
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

