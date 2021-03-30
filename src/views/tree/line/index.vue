<template>
  <v-card title="连接线">
    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            树表格，通过配置 <span class="blue-text"> tree-config={line: true} </span> 属性来开启树节点连接线
          </div>
          <div class="red-text">
            注：连接线只支持基本功能，开启渲染节点线将会影响渲染性能，具体取决于数据量
          </div>
        </div>
      </v-alert>
      <vcu-table
        ref="xTree"
        show-overflow
        row-key
        row-id="id"
        :tree-config="{
          children: 'children',
          line: true,
        }"
        :data="tableData"
        max-height="400"
        highlight-hover-row
      >
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column
          field="name"
          title="Name"
          tree-node
        ></vcu-table-column>
        <vcu-table-column field="size" title="Size"></vcu-table-column>
        <vcu-table-column field="date" title="Date"></vcu-table-column>
      </vcu-table>
    </div>

    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            自定义图标，通过设置
            <span class="blue-text"> tree-config={iconOpen, iconClose} </span>
            局部替换默认的图标
          </div>
        </div>
      </v-alert>
      <vcu-table
        ref="xTree1"
        show-overflow
        row-key
        row-id="id"
        :tree-config="{
          children: 'children',
          accordion: true,
          line: true,
          iconOpen: 'iconfont icon-minus-square',
          iconClose: 'iconfont icon-plus-square',
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
        <vcu-table-column field="date" title="Date"></vcu-table-column>
      </vcu-table>
    </div>
  </v-card>
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

