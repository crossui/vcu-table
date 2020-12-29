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
          <div>
            配置
            <span class="blue-text"> loadOptions.customRender </span>
            自定义筛选条件
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
import XEUtils from "xe-utils";
export default {
  data() {
    return {
      options: {
        headUrl: "dataq/api/bigDataHeader",
        pageUrl: "dataq/api/bigDataPage",
        seq: true,
        checkbox: true,
        radio: true,
        filters: true,
        customRender: [
          {
            key: "hospDepartCode",
            params: {
              filters: [{ label: "包含 201", value: "201" }],
              filterMethod: ({ value, row, column }) => {
                return (
                  XEUtils.toString(row.hospDepartCode)
                    .toLowerCase()
                    .indexOf(value) > -1
                );
              },
            },
          },
        ],
      },
    };
  },
  mounted() {},
  methods: {},
};
</script>

