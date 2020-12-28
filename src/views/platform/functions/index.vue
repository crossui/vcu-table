<template>
  <a-card title="功能操作">
    <div class="mb-30">
      <div class="mb-5">
        <a-button-group>
          <a-button @click="$refs.xTable.showColumnModal()">列选择</a-button>
          <a-button @click="$refs.xTable.showFilterModal()">过 滤</a-button>
          <a-button @click="$refs.xTable.operateRestore()">还 原</a-button>
          <a-button @click="$refs.xTable.exportExcel()">导 出</a-button>
          <a-button @click="$refs.xTable.emptyTableLists()">清空数据</a-button>
        </a-button-group>
      </div>
      <vcu-table
        ref="xTable"
        border
        :loadOptions="options"
        customModalShow
        filterModalShow
        :filterFormData="filterFormData"
        :exportExcelUrl="exportExcelUrl"
      ></vcu-table>
    </div>

    <div class="mb-30">
      <div class="mb-5">
        <a-button-group>
          <a-button @click="$refs.xTable1.showColumnModal()">列选择</a-button>
          <a-button @click="$refs.xTable1.showFilterModal()">过 滤</a-button>
          <a-button @click="$refs.xTable1.operateRestore()">还 原</a-button>
          <a-button @click="$refs.xTable1.exportExcel()">导 出</a-button>
          <a-button @click="$refs.xTable1.emptyTableLists()">清空数据</a-button>
        </a-button-group>
      </div>
      <vcu-table
        ref="xTable1"
        border
        :loadOptions="options2"
        customModalShow
        filterModalShow
        :filterFormData="filterFormData"
        :exportExcelUrl="exportExcelUrl"
      >
      </vcu-table>
    </div>
  </a-card>
</template>
<script>
import XEUtils from "xe-utils";

export default {
  data() {
    return {
      exportExcelUrl:
        "http://10.16.0.78:8089/dataq/export/getInHospPatientList",
      filterFormData: {
        filterFindUrl: "getInHospPatientList4cy",
        operationUrl: "dataq/api/dict/operation", //正式环境不需要
        relationUrl: "dataq/api/dict/relation", //正式环境不需要
        filterFindFormData: {
          deptNo: "14",
        },
      },
      options: {
        headUrl: "dataq/api/header/getInHospPatientList",
        pageUrl: "dataq/api/page/getInHospPatientList",
        seq: true,
        radio: true,
        checkbox: true,
      },

      tableColumn2: [],
      options2: {
        headUrl: "dataq/api/header/headerGroups",
        pageUrl: "dataq/api/page/headerGroups",
        seq: true,
        radio: true,
        checkbox: true,
        filters: true,
      },
    };
  },
  mounted() {},
  methods: {},
};
</script>

