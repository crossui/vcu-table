<template>
  <v-card title="索引">
    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            配置
            <span class="blue-text"> loadOptions.seq=true </span>
            开启索引
          </div>
        </div>
      </v-alert>
      <div class="mb-5"></div>
      <vcu-table ref="xTable" :loadOptions="options" max-height="200">
      </vcu-table>
    </div>

    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            配置
            <span class="blue-text"> loadOptions.seq={title:"序号"} </span> 开启索引并显示标题
          </div>
        </div>
      </v-alert>
      <vcu-table ref="xTable1" :loadOptions="options1"> </vcu-table>
    </div>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      options: {
        headUrl: "dataq/api/bigDataHeader",
        pageUrl: "dataq/api/bigDataPage",
        seq: true
      },
      options1: {
        headUrl: "dataq/api/bigDataHeader",
        pageUrl: "dataq/api/bigDataPage",
        seq: {title:"序号"}
      },
    };
  },
  mounted() {},
  methods: {},
};
</script>

