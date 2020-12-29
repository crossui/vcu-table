<template>
  <a-card title="分组表头">
    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          <div>手动设置分组表头</div>
        </div>
      </a-alert>
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

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            自动设置分组表头，配置通用平台
            <span class="blue-text"> 父列key值 </span>
            字段
          </div>
        </div>
      </a-alert>
      <vcu-table ref="xTable1" border :loadOptions="options1">
        <template v-slot:XMMC00_default> 111111 </template>
        <template v-slot:GJBM00_default> 22222 </template>
        <template v-slot:XMSL00_default> 333333 </template>
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
        seq: true
      },
      tableColumn: [],
      options1: {
        seq: true,
        checkbox: true,
        headUrl: "dataq/api/header/headerGroups",
        pageUrl: "dataq/api/page/headerGroups",
        filters: true,
        customRender: [
          {
            key: "XMMC00",
            params: {
              slots: {
                default: "XMMC00_default",
              },
            },
          },
          {
            key: "GJBM00",
            params: {
              slots: {
                default: "GJBM00_default",
              },
            },
          },
          {
            key: "XMSL00",
            params: {
              slots: {
                default: "XMSL00_default",
              },
            },
          },
          {
            key: "XMDJ00",
            params: {
              filters: [{ label: "包含 1", value: "1" }],
              filterMethod: ({ value, row, column }) => {
                return (
                  XEUtils.toString(row.XMDJ00).toLowerCase().indexOf(value) > -1
                );
              },
            },
          },
        ],
      },
    };
  },
  mounted() {
  },
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

