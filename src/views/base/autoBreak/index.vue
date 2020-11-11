<template>
  <a-card title="自动换行">
    <a-alert
      message="默认自动换行；单元格超出指定宽度自动换行，可以通过设置 scroll-x={gt: -1} 和 scroll-y={gt: -1} 启用自动换行"
      type="info"
      class="mb-10"
    />
    <vxe-table :data="tableData" :scroll-x="{gt: -1}" :scroll-y="{gt: -1}">
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
          address:
            "从入门到放弃从入门到放弃从入门到放弃从入门到放弃从入门到放弃从入门到放弃从入门到放弃从入门到放弃从入门到放弃从入门到放弃从入门到放弃从入门到放弃从入门到放弃",
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
          sex:
            "ManManManManManManManManManManManManManManManManManManManManManManManManManManManManManManManManManManManManManManManManManManManMan",
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

