<template>
  <a-card title="功能操作">
    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            开启
            <span class="blue-text"> filterModalShow，customModalShow </span>
          </div>
          <div>
            配置 <span class="blue-text"> filterFormData，exportExcelUrl </span>
          </div>
        </div>
      </a-alert>
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
        :loadOptions="options1"
        customModalShow
        filterModalShow
        :filterFormData="filterFormData"
        :exportExcelUrl="exportExcelUrl"
      >
      </vcu-table>
    </div>

    <div class="mb-30">
      <div class="mb-5">
        <a-button-group>
          <a-button @click="$refs.xTable2.showColumnModal()">列选择</a-button>
          <a-button @click="$refs.xTable2.showFilterModal()">过 滤</a-button>
          <a-button @click="$refs.xTable2.operateRestore()">还 原</a-button>
          <a-button @click="$refs.xTable2.exportExcel()">导 出</a-button>
          <a-button @click="$refs.xTable2.emptyTableLists()">清空数据</a-button>
        </a-button-group>
      </div>
      <vcu-table
        ref="xTable2"
        border
        :columns="tableColumn"
        :loadOptions="options2"
        customModalShow
        filterModalShow
        filterOldColumns
        :filterFormData="filterFormData"
        :exportExcelUrl="exportExcelUrl"
        @onHeaderLoad="onHeaderLoad"
      ></vcu-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            配置 <span class="blue-text"> filterFormData.autoTypewritLists </span> 过滤项中的值组件是输入法字典
          </div>
        </div>
      </a-alert>
      <div class="mb-5">
        <a-button-group>
          <a-button @click="$refs.xTable3.showColumnModal()">列选择</a-button>
          <a-button @click="$refs.xTable3.showFilterModal()">过 滤</a-button>
          <a-button @click="$refs.xTable3.operateRestore()">还 原</a-button>
          <a-button @click="$refs.xTable3.exportExcel()">导 出</a-button>
          <a-button @click="$refs.xTable3.emptyTableLists()">清空数据</a-button>
        </a-button-group>
      </div>
      <vcu-table
        ref="xTable3"
        border
        :columns="tableColumn"
        :loadOptions="options2"
        customModalShow
        filterModalShow
        filterOldColumns
        :filterFormData="filterFormData1"
        :exportExcelUrl="exportExcelUrl"
        @onHeaderLoad="onHeaderLoad"
      ></vcu-table>
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
  let columns1 = {
    title: "西药",
    align: "center",
    children: [],
  };
  let columns2 = {
    title: "中成药",
    align: "center",
    children: [],
  };
  let columns3 = {
    title: "中草药",
    align: "center",
    children: [],
  };
  let columns4 = {
    title: "物资",
    align: "center",
    children: [],
  };
  let columns5 = {
    title: "合计",
    align: "center",
    children: [],
  };
  let columns = res
    .map((item) => {
      if (item.hidden == undefined || !item.hidden) {
        let title = item.title.split("|");
        item.title = title.length > 1 ? title[1] : item.title;
        if (
          item.key == "C_XYCJ" ||
          item.key == "XYLSJE" ||
          item.key == "XYGJJE"
        ) {
          columns1.children.push(item);
        } else if (
          item.key == "C_CYCJ" ||
          item.key == "CYLSJE" ||
          item.key == "CYGJJE"
        ) {
          columns2.children.push(item);
        } else if (
          item.key == "C_ZYCJ" ||
          item.key == "ZYLSJE" ||
          item.key == "ZYGJJE"
        ) {
          columns3.children.push(item);
        } else if (
          item.key == "C_YXCJ" ||
          item.key == "YXLSJE" ||
          item.key == "YXGJJE"
        ) {
          columns4.children.push(item);
        } else if (
          item.key == "C_CJHJ" ||
          item.key == "C_LSHJ" ||
          item.key == "C_GJHJ"
        ) {
          columns5.children.push(item);
        } else {
          return item;
        }
      }
    })
    .filter((item) => {
      return item != undefined;
    });
  let _columns = [
    seq,
    ...columns,
    columns1,
    columns2,
    columns3,
    columns4,
    columns5,
  ];
  return _columns;
};
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
      filterFormData1: {
        filterFindUrl: "getInHospPatientList4cy",
        operationUrl: "dataq/api/dict/operation", //正式环境不需要
        relationUrl: "dataq/api/dict/relation", //正式环境不需要
        filterFindFormData: {
          deptNo: "14",
        },
        autoTypewritLists: [
          {
            key: "XMMC00",
            loadOptions: {
              listUrl: "dataq/api/page/getApproveArrearageList",
              headUrl: "dataq/api/header/getApproveArrearageList",
            },
            modalWidth: "800px",
            backfillKey: "pName",
          },
          {
            key: "XYLSJE",
            loadOptions: {
              listUrl: "dataq/api/page",
              headUrl: "dataq/api/header",
            },
            modalWidth: "600px",
            backfillKey: "inHospDeptName",
          },
        ],
      },
      options: {
        headUrl: "dataq/api/header/getInHospPatientList",
        pageUrl: "dataq/api/page/getInHospPatientList",
        seq: true,
        radio: true,
        checkbox: true,
      },
      options1: {
        headUrl: "dataq/api/header/headerGroups",
        pageUrl: "dataq/api/page/headerGroups",
        seq: true,
        radio: true,
        checkbox: true,
        filters: true,
      },
      tableColumn: [],
      options2: {
        headUrl: "/dataq/api/header/headerGroups1",
        pageUrl: "/dataq/api/page/headerGroups1",
        filters: true,
      },
    };
  },
  mounted() {},
  methods: {
    onHeaderLoad(columns) {
      this.tableColumn = renderColumns(columns);
    },
  },
};
</script>

