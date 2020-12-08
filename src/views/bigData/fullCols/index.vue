<template>
  <a-card title="复杂渲染">
    <div class="mb-30">
      <a-button-group class="mb-5">
        <a-button @click="$refs.xTable1.setAllCheckboxRow(true)">
          所有选中
        </a-button>
        <a-button @click="$refs.xTable1.clearCheckboxRow()">清除选中</a-button>
        <a-button @click="getSelectEvent">获取选中</a-button>
      </a-button-group>
      <vcu-table
        ref="xTable1"
        border
        resizable
        show-overflow
        show-header-overflow
        highlight-hover-row
        highlight-current-row
        height="300"
        show-footer
        :loading="loading"
        :columns="tableColumn"
        :data="tableData"
        :footer-method="footerMethod"
        :checkbox-config="{checkField: 'checked'}"
      >
        <!-- <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column type="radio" width="60"></vcu-table-column>
        <vcu-table-column type="checkbox" width="60"></vcu-table-column>
        <vcu-table-column field="name" title="Name"></vcu-table-column>
        <vcu-table-column field="nickname" title="Nickname"></vcu-table-column>
        <vcu-table-column field="sex" title="Sex"></vcu-table-column>
        <vcu-table-column field="age" title="Age"></vcu-table-column>
        <vcu-table-column field="address" title="Address"></vcu-table-column>
        <vcu-table-column
          field="createTime"
          title="CreateTime"
        ></vcu-table-column> -->
      </vcu-table>
    </div>
  </a-card>
</template>
<script>
//
import * as api from "@/api/test.js";
export default {
  data() {
    return {
      loading: false,
      tableColumn: [
        { type: "seq", width: 80 },
        { type: "radio", width: 80 },
        { type: "checkbox", width: 80 },
        { field: "name", title: "Name" },
        { field: "nickname", title: "Nickname" },
        { field: "role", title: "Role" },
        { field: "sex", title: "Sex" },
        { field: "age", title: "Age" },
        { field: "address", title: "Address" },
        { field: "createTime", title: "CreateTime" },
      ],
      tableData: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      this.loading = true;
      let res = await api.getScrollData();
      this.loading = false;
      if (res) {
        this.tableData = res.data.payload.data;
      }
    },
    footerMethod({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return "合计";
          }
          switch (column.property) {
            case "name":
              return data.length;
          }
          return "-";
        }),
      ];
    },
    getSelectEvent() {
      let selectRecords = this.$refs.xTable1.getCheckboxRecords();
      console.info(selectRecords.length);
    },
  },
};
</script>

