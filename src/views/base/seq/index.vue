<template>
  <a-card title="序号">
    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          设置 <span class="blue-text">type=seq</span> 开启序号列
        </div>
      </a-alert>
      <vxe-table :data="tableData">
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
          使用 <span class="blue-text">seq-config={startIndex}</span> 自定义起始序号
        </div>
      </a-alert>
      <vxe-table :data="tableData" :seq-config="{startIndex: 100}">
        <vxe-table-column type="seq" title="序号" width="60"></vxe-table-column>
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
          使用 <span class="blue-text">seq-config={seqMethod}</span> 自定义方法
        </div>
      </a-alert>
      <vxe-table :seq-config="{seqMethod: seqMethod}" :data="tableData">
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
  methods:{
    seqMethod(item){
      return `id: ${item.seq}`
    }
  }
};
</script>

