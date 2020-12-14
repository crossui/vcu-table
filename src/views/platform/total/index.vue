<template>
  <a-card title="合计">
    <div class="mb-30">
      <vcu-table
        ref="xTable"
        show-footer
        :footer-method="footerMethod"
        :loadOptions="options"
        max-height="200"
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
      options: {
        headUrl: "dataq/api/bigDataHeader",
        pageUrl: "dataq/api/bigDataPage",
      },
    };
  },
  mounted() {},
  methods: {
    footerMethod({ columns, data, response }) {
      const stats = response && response.data.payload.stats;
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex == 1) {
            return data.length;
          }

          if (XEUtils.has(stats, column.property)) {
            return stats[column.property];
          }
          return null;
        }),
      ];
      return footerData;
    },
  },
};
</script>

