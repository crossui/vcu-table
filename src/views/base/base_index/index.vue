<template>
  <a-card title="基础">
    <div class="mb-30">
      <vcu-table :data="tableData">
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column field="name" title="Name"></vcu-table-column>
        <vcu-table-column field="sex" title="Sex"></vcu-table-column>
        <vcu-table-column field="age" title="Age"></vcu-table-column>
      </vcu-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          <div>设置 <span class="blue-text">allAlign</span> 表格对齐方向</div>
          <div>设置 <span class="blue-text">columns</span> 表头数据源</div>
        </div>
      </a-alert>
      <a-button-group class="mb-10">
        <a-button @click="allAlign = 'left'"> 居左</a-button>
        <a-button @click="allAlign = 'center'"> 居中 </a-button>
        <a-button @click="allAlign = 'right'"> 居右 </a-button>
      </a-button-group>
      <vcu-table
        :columns="tableColumn"
        :align="allAlign"
        :data="tableData"
      ></vcu-table>
    </div>
  </a-card>
</template>
<script>
export default {
  data() {
    return {
      allAlign: "left",
      tableColumn: [
        { type: "seq", width: 50 },
        { field: "name", title: "Name" },
        { field: "sex", title: "Sex", showHeaderOverflow: true },
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
      ],
    };
  },
};
</script>

