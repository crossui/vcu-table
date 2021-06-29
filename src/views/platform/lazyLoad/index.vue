<template>
  <v-card title="懒加载">
    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            开启
            <span class="blue-text"> isLazy </span>
          </div>
        </div>
      </v-alert>
      <div class="mb-5">
        <v-button @click="$refs.xTable.getTableListData(true)">重置数据</v-button>
        <v-button @click="$refs.xTable.scrollToRow($refs.xTable.getData(30))">
          指定行
        </v-button>
      </div>
      <vcu-table
        ref="xTable"
        :filter-config="{ autoFilterRemote: true }"
        isLazy
        show-overflow
        height="300"
        :loadOptions="options"
      >
      </vcu-table>
    </div>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      options: {
        headUrl: "dataq/api/header/getApproveArrearageList",
        pageUrl: "dataq/api/page/getApproveArrearageList",
        filters: true,
        seq: true
      },
    };
  },
  mounted() {},
  methods: {},
};
</script>

