<template>
  <a-card title="格式化内容">
    <a-alert type="info" class="mb-10">
      <div slot="message">
        局部自定义 <span class="blue-text">formatter</span> 格式化内容
        <div class="red-text">
          注：formatter 只会在指定的 field
          值发生改变时触发格式化，如果想要多字段关联变化请使用自定义模板
        </div>
      </div>
    </a-alert>

    <vxe-table :data="tableData">
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column field="name" title="Name"></vxe-table-column>
      <vxe-table-column field="sex" title="Sex"></vxe-table-column>
      <vxe-table-column field="age" title="Age"></vxe-table-column>
      <vxe-table-column
        field="time"
        title="Time"
        :formatter="formatTime"
      ></vxe-table-column>
    </vxe-table>
  </a-card>
</template>
<script>
import XEUtils from "xe-utils";
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
          time: 1599320111520
        },
        {
          id: 10002,
          name: "Test2",
          role: "Test",
          sex: "Women",
          age: 22,
          address: "Guangzhou",
          time: 1599320111520
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          age: 32,
          address: "Shanghai",
          time: 1599320111520
        },
        {
          id: 10004,
          name: "Test4",
          role: "Designer",
          sex: "Women ",
          age: 24,
          address: "Shanghai",
          time: 1599320111520
        },
      ],
    };
  },
  methods: {
    formatTime({ cellValue, row, column }) {
      return XEUtils.toDateString(cellValue, "yyyy-MM-dd HH:ss:mm");
    },
  },
};
</script>

