<template>
  <div>
    <v-card class="mb-10">
      <v-form-model :model="form" layout="inline">
        <v-form-model-item label="Token">
          <v-input v-model="form.token"></v-input>
        </v-form-model-item>
      </v-form-model>
    </v-card>

    <v-card class="mb-10">
      <v-button @click="handleExport">导出</v-button>
      <vcu-table
        :exportExcelUrl="exportExcelUrl"
        :loadOptions="loadOptions"
        :exportExcelUrlCommon="exportExcelUrlCommon"
        :exportSheetData="exportSheetData"
        border
        ref="ywTable"
      ></vcu-table>
    </v-card>

    <v-card class="mb-10">
      <v-button @click="handleExport1">导出</v-button>
      <vcu-table
        :exportExcelUrl="exportExcelUrl1"
        :loadOptions="loadOptions1"
        :exportExcelUrlCommon="exportExcelUrlCommon"
        :exportSheetData="true"
        border
        ref="reTable"
      ></vcu-table>
    </v-card>

    <v-card class="mb-10">
      <v-button @click="handleExport2">导出</v-button>
      <vcu-table
        :exportExcelUrl="exportExcelUrl2"
        :loadOptions="loadOptions2"
        :exportExcelUrlCommon="exportExcelUrlCommon"
        :exportSheetData="exportSheetData2"
        :footer-method="footerMethod"
        border
        show-footer
        ref="rxTable"
      ></vcu-table>
    </v-card>
  </div>
</template>
<script>
import XEUtils from "xe-utils";

export default {
  data() {
    return {
      form: {
        token: "8e806d947d1d4257aa905ea6f5b63907",
      },
      exportExcelUrlCommon: "http://10.16.241.70:9089/dataq/export/api/common", //正式环境这个参数不用配置
      //table
      exportExcelUrl: "qryMedicalCardLose",
      exportSheetData: {
        headers: [
          {
            data: "门诊病人就诊卡挂失查询",
          },
          {
            data: "操作员：张三                          导出日期：2021-06-01", //当需要间距自行空格处理
          },
        ],
        footers: [
          {
            data: "页脚1",
          },
          {
            data: "页脚2",
          },
        ],
      },
      loadOptions: {
        headUrl: "dataq/api/header/qryMedicalCardLose",
        pageUrl: "dataq/api/page/qryMedicalCardLose",
        seq: true,
        pageFormData: {
          BEGINDAY: 20200604,
          ENDDAY: 20210619,
          token: "",
          ygbh00: 3524,
          zwxm00: "陈舒念",
        },
      },
      //table1
      exportExcelUrl1: "qryCharges",
      loadOptions1: {
        headUrl: "dataq/api/header/qryCharges",
        pageUrl: "dataq/api/page/qryCharges",
        seq: true,
        pageFormData: {
          token: "",
          JFRQ00: "20210619A",
          JFSJ00: "14:42:34",
          YYID00: "",
          JFCZY0: 4569,
          ygbh00: 4569,
          zwxm00: "程瑾011",
        },
      },
      //table2
      exportExcelUrl2: "qryMedicalCardLose",
      exportSheetData2: {
        rows: true,
        rowMethods: [
          {
            key: "YBID00",
            method: ({row}) => {
              if(row.YBID00 == "0"){
                return "否"
              }else{
                return "是"
              }
            },
          },
        ],
      },
      loadOptions2: {
        headUrl: "dataq/api/header/qryMedicalCardLose",
        pageUrl: "dataq/api/page/qryMedicalCardLose",
        seq: true,
        checkbox: true,
        pageFormData: {
          BEGINDAY: 20200604,
          ENDDAY: 20210619,
          token: "",
          ygbh00: 3524,
          zwxm00: "陈舒念",
        },
      },
    };
  },
  created() {},
  beforeDestroy() {},
  methods: {
    handleExport() {
      this.loadOptions.pageFormData.token = this.form.token;
      this.$refs.ywTable.exportExcel();
    },
    handleExport1() {
      this.loadOptions1.pageFormData.token = this.form.token;
      this.$refs.reTable.exportExcel();
    },
    handleExport2() {
      this.loadOptions2.pageFormData.token = this.form.token;
      this.$refs.rxTable.exportExcel();
    },
    footerMethod({ columns, data, response }) {
      const stats = response && response.data.payload.stats;
      if (!stats) return [];
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 1) {
            return "合计";
          } else if (columnIndex === 2) {
            return data.length;
          } else if (column.property == "YBKH00") {
            return `${stats.YBKH00}`;
          } else if (column.property == "ZWXM00") {
            return `人数：${stats.ZWXM00}`;
          }
          return null;
        }),
      ];
    },
  },
};
</script>

<style lang="less" scoped>
</style>