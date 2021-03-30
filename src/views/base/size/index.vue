<template>
  <v-card title="尺寸">
    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          使用 <span class="blue-text"> size=default</span>
        </div>
      </v-alert>
      <vcu-table size="default" :data="tableData">
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
      <v-alert type="info" class="mb-10">
        <div slot="message">
          使用 <span class="blue-text"> size=large</span>
        </div>
      </v-alert>
      <vcu-table size="large" :data="tableData">
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
      <v-alert type="info" class="mb-10">
        <div slot="message">
          使用 <span class="blue-text"> size=small</span>
        </div>
      </v-alert>
      <vcu-table :data="tableData" size="small">
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

