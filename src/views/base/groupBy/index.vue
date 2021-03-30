<template>
  <v-card title="行分组">
    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            行分组，例如：按日期分组显示
            <span class="red-text">（具体请自行实现，该示例仅供参考）</span>
          </div>
        </div>
      </v-alert>

      <vcu-table
        resizable
        tree-config
        ref="xTable"
        :loading="loading"
        :data="tableData"
      >
        <vcu-table-column
          field="name"
          title="Name"
          tree-node
        ></vcu-table-column>
        <vcu-table-column field="sex" title="Sex"></vcu-table-column>
        <vcu-table-column field="age" title="Age"></vcu-table-column>
        <vcu-table-column field="date14" title="Date"></vcu-table-column>
      </vcu-table>
    </div>
  </v-card>
</template>
<script>
import * as api from "@/api/test";
import XEUtils from "xe-utils";
export default {
  data() {
    return {
      loading: false,
      tableData: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      this.loading = true;
      let res = await api.getGroupByData();
      this.loading = false;
      if (res) {
        const result = [];
        XEUtils.each(
          XEUtils.groupBy(res.data.payload.data, "date14"),
          (childs, key) => {
            result.push({
              name: key,
              children: childs,
            });
          }
        );
        this.tableData = result;
      }
    },
  },
};
</script>

