<template>
  <a-card title="分组表头">
    <vcu-table
      ref="xTable1"
      border
      :loadOptions="options1"
      :edit-config="{ trigger: 'manual', mode: 'row', autoClear: false }"
      :row-class-name="boeMainTableRowClassName"
      @cell-click="boeMainTableCelClick"
    ></vcu-table>
  </a-card>
</template>
<script>
import XEUtils from "xe-utils";

import autoTypewrit from "@/components/autoTypewrit";
export default {
  components: {
    autoTypewrit,
  },
  data() {
    return {
      currIndex: 0,
      autoTypewritLoadOptions: {
        headUrl:
          "http://10.16.0.78:8033/mock/9cf15880587211ea804331cf8/dataq/api/header",
        listUrl:
          "http://10.16.0.78:8033/mock/9cf15880587211ea804331cf8/dataq/api/page",
      },
      options1: {
        seq: true,
        checkbox: true,
        headUrl:
          "http://10.16.0.78:8033/mock/9cf15880587211ea804331cf8/dataq/api/header/headerGroups",
        pageUrl:
          "http://10.16.0.78:8033/mock/9cf15880587211ea804331cf8/dataq/api/page/headerGroups",
        filters: true,
        customRender: [
          {
            key: "GJBM00",
            params: {
              editRender: true,
              slots: {
                edit: ({ row }) => {
                  return [
                    <a-input v-model={row.GJBM00} size="small"></a-input>,
                  ];
                },
              },
            },
          },
          {
            key: "XMGG00",
            params: {
              editRender: true,
              slots: {
                edit: ({ row }) => {
                  return [
                    <autoTypewrit
                      size="small"
                      v-model={row.XMGG00}
                      loadOptions={this.autoTypewritLoadOptions}
                      transfer
                      backfillKey="inHospDeptName"
                    ></autoTypewrit>,
                  ];
                },
              },
            },
          },
          {
            key: "XMSL00",
            params: {
              editRender: true,
              slots: {
                edit: ({ row }) => {
                  return [
                    <a-input-number
                      v-model={row.inputCode}
                      size="small"
                    ></a-input-number>,
                  ];
                },
              },
            },
          },
          {
            key: "KFKSMC",
            params: {
              editRender: true,
              slots: {
                edit: ({ row }) => {
                  return [
                    <a-input v-model={row.KFKSMC} size="small"></a-input>,
                  ];
                },
              },
            },
          },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    boeMainTableRowClassName({ rowIndex }) {
      if (rowIndex == this.currIndex) {
        return "bg-blue";
      }
    },
    boeMainTableCelClick({ rowIndex, $rowIndex, row, seq }) {
      this.currIndex = rowIndex;
      this.$refs.xTable1.setActiveRow(row);
    },
  },
};
</script>

