<template>
  <div>
    <v-card class="mb-10">
      <v-button-group class="mb-10">
        <v-button @click="handleSearch">查询</v-button>
        <v-button @click="$refs.ywTable.showFilterModal()">过滤</v-button>
        <v-button @click="$refs.ywTable.operateRestore()">还 原</v-button>
        <v-button @click="$refs.ywTable.emptyTableLists()">清空数据</v-button>
      </v-button-group>
      <vcu-table
        :loadOptions="loadOptions"
        :filter-config="{ autoFilterRemote: true }"
        @filter-change="filterChange"
        show-overflow
        show-footer
        filterModalShow
        :filterFormData="filterFormData"
        :footer-method="footerTotalDatas"
        border
        ref="ywTable"
        :height="400"
      ></vcu-table>
    </v-card>
  </div>
</template>
<script>
import XEUtils from "xe-utils";

export default {
  data() {
    return {
      //table
      filterFormData: {
        filterFindUrl: "quryMedicalInsurancePayment",
        filterFindUrlPrefix: {
          find: "http://10.16.241.70:9089/dataq/filter/find/",
          save: "http://10.16.241.70:9089/dataq/filter/save/",
          delete: "http://10.16.241.70:9089/dataq/filter/delete/"
        },
        filterFindFormData: {
          deptNo: "14",
        },
      },
      loadOptions: {
        headUrl:
          "http://10.16.241.70:9089/dataq/api/header/quryMedicalInsurancePayment",
        pageUrl:
          "http://10.16.241.70:9089/dataq/api/page/quryMedicalInsurancePayment",
        seq: true,
        filters: true,
        pageFormData: {
          BEGINDAY: 20200101,
          ENDDAY: 20210622,
          ZFFSMC: "",
          YBMC00: "",
          ygbh00: 4569,
          zwxm00: "程瑾011",
        },
      },
    };
  },
  created() {},
  beforeDestroy() {},
  methods: {
    footerTotalDatas({ columns, data, response }) {
      const stats = response && response.data.payload.stats;
      const footer = [
        columns.map((column, columnIndex) => {
          if (XEUtils.has(stats, column.property)) {
            return stats[column.property];
          }
          return null;
        }),
      ];
      return footer;
    },
    filterChange(a) {
      //console.info(a);
    },
    handleSearch() {
      this.$refs.ywTable.getTableListData(true);
    },
  },
};
</script>

<style lang="less" scoped>
</style>