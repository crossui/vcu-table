<template>
  <a-card title="深层查找">
    <div class="mb-30">
      <a-input-search
        v-model="filterName"
        class="mb-5 w-500"
        enter-button
        @search="onSearch"
      />
      <vcu-table ref="xTree" tree-config :data="tableData" max-height="400">
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
import XEUtils from "xe-utils";
import datas from "../data.js";
export default {
  data() {
    return {
      filterName: "",
      tableData: datas,
      originData: [],
    };
  },
  created() {
      this.originData = XEUtils.clone(this.tableData, true);
  },
  methods: {
    onSearch() {
      let filterName = XEUtils.toString(this.filterName).trim();
      if (filterName) {
        let options = { children: "children" };
        let searchProps = ["name"];
        this.tableData = XEUtils.searchTree(
          this.originData,
          (item) =>
            searchProps.some(
              (key) => XEUtils.toString(item[key]).indexOf(filterName) > -1
            ),
          options
        );
        // 搜索之后默认展开所有子节点
        this.$nextTick(() => {
          this.$refs.xTree.setAllTreeExpand(true);
        });
      } else {
        this.tableData = this.originData;
      }
    },
  },
};
</script>

