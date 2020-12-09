<template>
  <a-card title="筛选">
    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            配置
            <span class="blue-text"> loadOptions.filters=true </span>
            开启筛选
          </div>
        </div>
      </a-alert>
      <div class="mb-5"></div>
      <vcu-table ref="xTable" :loadOptions="options" max-height="200">
      </vcu-table>
    </div>

    
  </a-card>
</template>
<script>
export default {
  data() {
    return {
      options: {
        headUrl: "dataq/api/bigDataHeader",
        pageUrl: "dataq/api/bigDataPage",
        seq: true,
        checkbox: true,
        radio: true,
        filters: true
      },
    };
  },
  mounted() {},
  methods: {
    
  },
};
</script>

