<template>
  <a-card title="分组表头">
    <div class="mb-30">
      <vcu-table
        ref="xTable"
        border
        show-footer
        :footer-method="footerMethod"
        :loadOptions="options"
        :columns="tableColumn"
        isLazy
        height="300"
        @onHeaderLoad="onHeaderLoad"
      >
      </vcu-table>
    </div>
  </a-card>
</template>
<script>
import XEUtils from "xe-utils";

const renderColumns = (res) => {
  let seq = {
    title: "序号",
    fixed: "left",
    align: "center",
    type: "seq",
    width: 60,
  };
  let userColumns = {
    title: "用户信息",
    fixed: "left",
    align: "center",
    children: [],
  };
  let dateColumns = {
    title: "时间",
    fixed: "right",
    align: "center",
    children: [],
  };
  let columns = res
    .map((item) => {
      if (item.hidden == undefined || !item.hidden) {
        if (item.key == "pName" || item.key == "pSex" || item.key == "pAge") {
          userColumns.children.push(item);
        } else if (item.key == "admissDate" || item.key == "outHospDate") {
          dateColumns.children.push(item);
        } else {
          return item;
        }
      }
    })
    .filter((item) => {
      return item != undefined;
    });
  let _columns = [seq, userColumns, ...columns, dateColumns];
  return _columns;
};

export default {
  data() {
    return {
      options: {
        headUrl: "dataq/api/header/getApproveArrearageList",
        pageUrl: "dataq/api/page/getApproveArrearageList",
      },
      tableColumn: [],
    };
  },
  mounted() {},
  methods: {
    onHeaderLoad(columns) {
      this.tableColumn = renderColumns(columns);
    },
    footerMethod({ columns, data, response }) {
      const stats = response && response.data.payload.stats;
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex == 1) {
            return data.length;
          }

          if (XEUtils.has(stats, column.property)) {
            return stats[column.property];
          }
          return null;
        }),
      ];
      return footerData;
    },
  },
};
</script>

