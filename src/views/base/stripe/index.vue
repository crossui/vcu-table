<template>
  <v-card title="斑马线条纹">
    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            斑马线条纹，通过设置 <span class="blue-text">stripe</span> 参数
          </div>
          <div class="red-text">
            注：不支持树形结构，在可编辑表格场景下，临时插入的数据不会有斑马纹样式
          </div>
        </div>
      </v-alert>
      <vcu-table stripe :data="tableData">
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column field="name" title="Name"></vcu-table-column>
        <vcu-table-column field="sex" title="Sex"></vcu-table-column>
        <vcu-table-column field="age" title="Age"></vcu-table-column>
        <vcu-table-column field="address" title="address"></vcu-table-column>
      </vcu-table>
    </div>

    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            使用 <span class="blue-text">highlight-hover-row</span> 属性启用
            hover 行高亮
          </div>
        </div>
      </v-alert>
      <vcu-table
        stripe
        highlight-current-row
        highlight-hover-row
        :data="tableData"
      >
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column field="name" title="Name"></vcu-table-column>
        <vcu-table-column field="sex" title="Sex"></vcu-table-column>
        <vcu-table-column field="age" title="Age"></vcu-table-column>
        <vcu-table-column field="address" title="address"></vcu-table-column>
      </vcu-table>
    </div>
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

