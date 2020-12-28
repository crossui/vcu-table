<template>
  <a-card title="测试">
    <div class="mb-30">
      <vcu-table
        ref="xTable"
        border
        keep-source
        show-footer
        resizable
        :edit-config="{
          trigger: 'click',
          mode: 'cell',
          showStatus: true,
          autoClear: false,
        }"
        :footer-method="footerMethod"
        :loadOptions="options"
        :edit-rules="validRules"
      >
        <template v-slot:GJBM00="scope">
          <a-input
            size="small"
            class="GJBM00"
            v-model="scope.row.GJBM00"
          ></a-input>
        </template>
      </vcu-table>
    </div>
  </a-card>
</template>
<script>
import XEUtils from "xe-utils";
export default {
  data() {
    return {
      validRules: {
        GJBM00: [{ required: true, message: "国家编码必须填写" }],
      },
      options: {
        headUrl: "dataq/api/header/headerGroups",
        pageUrl: "dataq/api/page/headerGroups",
        seq: true,
        filters: true,
        pageFormData: {
          RKDH00: "R10643",
        },
        customRender: [
          {
            key: "GJBM00",
            params: {
              editRender: {
                enabled: true,
                autofocus: ".GJBM00",
              },
              slots: {
                edit: "GJBM00",
              },
            },
          },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    footerMethod({ columns, data, response }) {
      const stats = response && response.data.payload.stats;
      const footerData = [
        columns.map((column, columnIndex) => {
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

