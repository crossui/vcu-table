<template>
  <v-card title="基础">
    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            与通用平台数据交互需要在注册组件同进
            <span class="blue-text"> VCUTable.setup({request: request}) </span>
            此request为axios已经封装好的对象（包含项目中写的拦截器）
          </div>
          <div class="red-text">
            如果发现表格没有铺满，通用平台上列的宽度最少一列不用设置以便表格表格自动铺满
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
            可以开启
            <span class="blue-text"> locking </span> 初始化不加载列表数据
          </div>
        </div>
      </v-alert>
      <div class="mb-5">
        <v-button @click="$refs.xTable1.getTableListData()"
          >加载列表数据</v-button
        >
      </div>
      <vcu-table ref="xTable1" :loadOptions="options" locking> </vcu-table>
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
      },
    };
  },
  mounted() {},
  methods: {},
};
</script>

