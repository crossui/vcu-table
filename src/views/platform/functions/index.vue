<template>
  <a-card title="功能操作">
    <div class="mb-30">
      <div class="mb-5">
        <a-button-group>
          <a-button>列选择</a-button>
          <a-button>过 滤</a-button>
          <a-button>还 原</a-button>
          <a-button>导 出</a-button>
        </a-button-group>
      </div>
      <vcu-table
        ref="xTable"
        :loadOptions="options"
      ></vcu-table>
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
      },
    };
  },
  mounted() {},
  methods: {
    
  },
};
</script>

