<template>
  <a-card title="最大高度">
    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          当一个表格高度需要自适应的时候可以设置为最大高度，通过设置
          <span class="blue-text"> max-height </span>参数
        </div>
      </a-alert>

      <vcu-table :data="tableData" max-height="100">
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column field="name" title="Name"></vcu-table-column>
        <vcu-table-column field="sex" title="Sex"></vcu-table-column>
        <vcu-table-column field="age" title="Age"></vcu-table-column>
      </vcu-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          也可以设置相对于父容器的百分比
        </div>
      </a-alert>
      <div style="height: 100px">
        <vcu-table :data="tableData" max-height="100%">
          <vcu-table-column type="seq" width="60"></vcu-table-column>
          <vcu-table-column field="name" title="Name"></vcu-table-column>
          <vcu-table-column field="sex" title="Sex"></vcu-table-column>
          <vcu-table-column field="age" title="Age"></vcu-table-column>
        </vcu-table>
      </div>
    </div>
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

