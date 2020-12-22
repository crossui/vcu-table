<template>
  <a-card title="手风琴效果">
    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            手风琴展开效果，通过配置
            <span class="blue-text"> tree-config={accordion} </span>
            属性来开启同一级的节点，限制只能展开一个
          </div>
        </div>
      </a-alert>
      <vcu-table
        ref="xTree"
        row-id="id"
        :tree-config="{
          children: 'children',
          accordion: true,
        }"
        :data="tableData"
        max-height="400"
      >
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column
          field="name"
          title="Name"
          tree-node
        ></vcu-table-column>
        <vcu-table-column field="size" title="Size"></vcu-table-column>
        <vcu-table-column field="date" title="Date" sortable></vcu-table-column>
      </vcu-table>
    </div>
  </a-card>
</template>
<script>
import datas from "../data.js";
export default {
  data() {
    return {
      tableData: datas,
    };
  },
  methods: {},
};
</script>

