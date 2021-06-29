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
      <v-button @click="$refs.ywTable.showFilterModal()">过滤</v-button>
      <vcu-table
        :loadOptions="loadOptions"
        border
        filterModalShow
        :filterFormData="filterFormData"
        ref="ywTable"
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
        token: "697fccc5581a46d3a99e697807a63c27",
      },
      filterFormData: {
        filterFindUrlPrefix: {
          find: "http://10.16.241.70:7089/dataq/filter/find/",
          save: "http://10.16.241.70:7089/dataq/filter/save/",
          delete: "http://10.16.241.70:7089/dataq/filter/delete/",
        },
        filterFindUrl: "getRKDQRYPList",
        filterFindFormData: {
          deptNo: "2280",
          staffNo: 3524
        },
        filterSaveFormData: {
          deptNo: "2280",
          staffNo: 3524
        },
      },
      loadOptions: {
        headUrl: "http://10.16.241.70:7089/dataq/api/header/getRKDQRYPList",
        pageUrl: "http://10.16.241.70:7089/dataq/api/page/getRKDQRYPList",
        seq: true,
        pageFormData: {
          RKDH00: 10115,
          ygbh00: 3524,
          zwxm00: "陈舒念",
        },
      },
    };
  },
  created() {},
  beforeDestroy() {},
  methods: {},
};
</script>

<style lang="less" scoped>
</style>