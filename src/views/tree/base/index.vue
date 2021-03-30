<template>
  <v-card title="基础">
    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            树表格，通过配置
            <span class="blue-text"> tree-config </span> 和指定列
            <span class="blue-text"> tree-node </span> 属性来开启树表格，通过
            <span class="blue-text"> row-id </span> 指定主键，还可以通过
            <span class="blue-text"> trigger </span> 指定触发方式
          </div>
          <div>
            默认展开树节点，通过
            <span class="blue-text"> tree-config={expandRowKeys: []} </span>
            设置默认展开树节点的主键
          </div>
          <div class="red-text">
            注：树结构不支持大量数据，如果数据量超过 2000 条，请谨慎使用！
          </div>
        </div>
      </v-alert>
      <v-button-group class="mb-5">
        <v-button @click="getTreeExpansionEvent">获取已展开</v-button>
        <v-button
          @click="$refs.xTree.setTreeExpand([tableData[2], tableData[3]], true)"
        >
          设置第三、四行展开
        </v-button>
        <v-button @click="$refs.xTree.setAllTreeExpand(true)">
          展开所有
        </v-button>
        <v-button @click="$refs.xTree.clearTreeExpand()">关闭所有</v-button>
      </v-button-group>
      <vcu-table
        ref="xTree"
        row-id="id"
        :tree-config="{
          children: 'children',
          expandRowKeys: defaultExpandKeys,
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

    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            默认展开所有树节点，通过
            <span class="blue-text"> tree-config={expandAll: true} </span>
            设置默认展开所有树节点
          </div>
        </div>
      </v-alert>
      <vcu-table
        ref="xTree1"
        row-id="id"
        :tree-config="{
          children: 'children',
          expandAll: true,
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
      defaultExpandKeys: ["30000"],
      tableData: datas,
    };
  },
  methods: {
    getTreeExpansionEvent() {
      let treeExpandRecords = this.$refs.xTree.getTreeExpandRecords();
      console.info(treeExpandRecords.length);
    },
  },
};
</script>

