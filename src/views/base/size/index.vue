<template>
  <a-card title="尺寸">
    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          使用 <span class="blue-text"> size=default</span>
        </div>
      </a-alert>
      <vxe-table size="default" :data="tableData">
        <vxe-table-column type="seq" width="60"></vxe-table-column>
        <vxe-table-column type="radio" width="60"></vxe-table-column>
        <vxe-table-column type="checkbox" width="60"></vxe-table-column>
        <vxe-table-column field="name" title="Name"></vxe-table-column>
        <vxe-table-column field="age" title="Age"></vxe-table-column>
        <vxe-table-column field="sex" title="Sex"></vxe-table-column>
        <vxe-table-column field="sex2" title="Sex2"></vxe-table-column>
        <vxe-table-column field="address" title="Address"></vxe-table-column>
      </vxe-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          使用 <span class="blue-text"> size=large</span>
        </div>
      </a-alert>
      <vxe-table size="large" :data="tableData">
        <vxe-table-column type="seq" width="60"></vxe-table-column>
        <vxe-table-column type="radio" width="60"></vxe-table-column>
        <vxe-table-column type="checkbox" width="60"></vxe-table-column>
        <vxe-table-column field="name" title="Name"></vxe-table-column>
        <vxe-table-column field="age" title="Age"></vxe-table-column>
        <vxe-table-column field="sex" title="Sex"></vxe-table-column>
        <vxe-table-column field="sex2" title="Sex2"></vxe-table-column>
        <vxe-table-column field="address" title="Address"></vxe-table-column>
      </vxe-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          使用 <span class="blue-text"> size=small</span>
        </div>
      </a-alert>
      <vxe-table :data="tableData" size="small">
        <vxe-table-column type="seq" width="60"></vxe-table-column>
        <vxe-table-column type="radio" width="60"></vxe-table-column>
        <vxe-table-column type="checkbox" width="60"></vxe-table-column>
        <vxe-table-column field="name" title="Name"></vxe-table-column>
        <vxe-table-column field="age" title="Age"></vxe-table-column>
        <vxe-table-column field="sex" title="Sex"></vxe-table-column>
        <vxe-table-column field="sex2" title="Sex2"></vxe-table-column>
        <vxe-table-column field="address" title="Address"></vxe-table-column>
      </vxe-table>
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

