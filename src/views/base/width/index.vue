<template>
  <v-card title="列宽">
    <div class="mb-30">
      <v-alert
        message="列宽，通过设置 width 参数，支持固定像素、百分比、等比例分配等，如果不设置则按照表格的宽度进行均匀分配"
        type="info"
        class="mb-10"
      >
        <span slot="description" class="red-text"
          >(注：不应该全部都使用固定像素，应该当所有列加起来的宽度小于表格宽度时，就会出现空白区，可以配合
          "%" 或 "min-width" 实现等比例缩放)</span
        >
      </v-alert>
      <vcu-table :data="tableData">
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column type="radio" width="60"></vcu-table-column>
        <vcu-table-column type="checkbox" width="60"></vcu-table-column>
        <vcu-table-column field="name" title="Name"></vcu-table-column>
        <vcu-table-column field="age" title="Age"></vcu-table-column>
        <vcu-table-column field="sex" title="Sex"></vcu-table-column>
        <vcu-table-column field="sex2" title="Sex2"></vcu-table-column>
        <vcu-table-column field="address" title="Address"></vcu-table-column>
      </vcu-table>
    </div>

    <div class="mb-30">
      <v-alert
        message="设置固定和最小宽，实现等比例放大"
        type="info"
        class="mb-10"
      />
      <vcu-table :data="tableData">
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column type="radio" width="60"></vcu-table-column>
        <vcu-table-column type="checkbox" width="60"></vcu-table-column>
        <vcu-table-column
          field="name"
          title="Name"
          min-width="200"
        ></vcu-table-column>
        <vcu-table-column
          field="age"
          title="Age"
          min-width="200"
        ></vcu-table-column>
        <vcu-table-column
          field="sex"
          title="Sex"
          min-width="200"
        ></vcu-table-column>
        <vcu-table-column
          field="sex2"
          title="Sex2"
          min-width="200"
        ></vcu-table-column>
        <vcu-table-column
          field="address"
          title="Address"
          min-width="200"
        ></vcu-table-column>
      </vcu-table>
    </div>

    <div class="mb-30">
      <v-alert message="设置百分比" type="info" class="mb-10" />
      <vcu-table :data="tableData" size="small">
        <vcu-table-column type="seq" width="10%"></vcu-table-column>
        <vcu-table-column type="radio" width="10%"></vcu-table-column>
        <vcu-table-column type="checkbox" width="10%"></vcu-table-column>
        <vcu-table-column field="name" title="Name"></vcu-table-column>
        <vcu-table-column field="age" title="Age"></vcu-table-column>
        <vcu-table-column field="sex" title="Sex"></vcu-table-column>
        <vcu-table-column field="sex2" title="Sex2"></vcu-table-column>
        <vcu-table-column field="address" title="Address"></vcu-table-column>
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
          sex2: "Man",
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
          sex2: "Man",
          age: 32,
          address: "Shanghai",
        },
        {
          id: 10004,
          name: "Test4",
          role: "Designer",
          sex: "Women",
          sex2: "Man",
          age: 23,
          address: "好好学习天天向上",
        },
        {
          id: 10005,
          name: "Test5",
          role: "Develop",
          sex: "Women",
          sex2: "Man",
          age: 30,
          address: "Shanghai",
        },
        {
          id: 10006,
          name: "Test6",
          role: "Designer",
          sex: "Women",
          sex2: "Man",
          age: 21,
          address: "好好学习天天向上",
        },
        {
          id: 10007,
          name: "Test7",
          role: "Test",
          sex: "Man",
          sex2: "Man",
          age: 29,
          address: "好好学习天天向上",
        },
        {
          id: 10008,
          name: "Test8",
          role: "Develop",
          sex: "Man",
          sex2: "Man",
          age: 35,
          address: "好好学习天天向上",
        },
      ],
    };
  },
};
</script>

