<template>
  <v-card title="普通树">
    <div class="mb-30">
      <v-button-group class="mb-5">
        <v-button @click="getTreeRadioEvent">获取选中</v-button>
        <v-button @click="getTreeExpansionEvent">获取已展开</v-button>
        <v-button @click="$refs.xTree.setAllTreeExpand(true)">
          展开所有
        </v-button>
        <v-button @click="$refs.xTree.clearTreeExpand()">关闭所有</v-button>
      </v-button-group>
      <vcu-table
        ref="xTree"
        row-id="id"
        tree-config
        :show-header="false"
        :data="tableData"
        :radio-config="{ labelField: 'name' }"
        max-height="400"
      >
        <vcu-table-column type="radio" tree-node></vcu-table-column>
      </vcu-table>
    </div>

    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          <div>更多功能</div>
        </div>
      </v-alert>
      <vcu-table
        ref="xTree1"
        border="inner"
        :show-header="false"
        :checkbox-config="{ labelField: 'name' }"
        :tree-config="{
          children: 'children',
          accordion: true,
          line: true,
          iconOpen: 'iconfont icon-minus-square',
          iconClose: 'iconfont icon-plus-square',
        }"
        :data="tableData"
        highlight-hover-row
        row-key
      >
        <vcu-table-column type="checkbox" tree-node></vcu-table-column>
        <vcu-table-column title="操作" width="140">
          <template v-slot="{ row }">
            <v-button type="link" size="small" icon="eye"></v-button>
            <v-button type="link" size="small" icon="edit"></v-button>
            <v-button
              size="small"
              type="link"
              icon="delete"
              @click="removeRowEvent(row)"
            ></v-button>
            <v-button size="small" type="link" icon="contacts"></v-button>
          </template>
        </vcu-table-column>
      </vcu-table>
    </div>
  </v-card>
</template>
<script>
import XEUtils from "xe-utils";
import datas from "../data.js";
export default {
  data() {
    return {
      defaultExpandKeys: ["30000"],
      tableData: datas,
    };
  },
  methods: {
    getTreeRadioEvent() {
      let selectRow = this.$refs.xTree.getRadioRecord();
      console.info(selectRow ? selectRow.name : "null");
    },
    getTreeExpansionEvent() {
      let treeExpandRecords = this.$refs.xTree.getTreeExpandRecords();
      console.info(treeExpandRecords.length);
    },
    removeRowEvent(row) {
      let _this = this;
      this.$confirm({
        title: "提示",
        content: (h) => "您确定要删除吗？",
        onOk() {
          let matchObj = XEUtils.findTree(
            _this.tableData,
            (item) => item === row
          );
          if (matchObj) {
            // 从树节点中移除
            matchObj.items.splice(matchObj.index, 1);
          }
        },
      });
    },
  },
};
</script>

