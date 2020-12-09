<template>
  <a-card title="可选择">
    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            配置
            <span class="blue-text"> loadOptions.checkbox = true </span>
            开启checkbox
          </div>
        </div>
      </a-alert>

      <vcu-table
        ref="xTable"
        isLazy
        height="300"
        show-footer
        :footer-method="footerMethod"
        :loadOptions="options"
        :checkbox-config="{ checkField: 'checked', highlight: true }"
      >
      </vcu-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            配置
            <span class="blue-text">
              :checkbox-config="{ labelField: '某列KEY' }"
            </span>
            并且
            <span class="blue-text"> loadOptions.customRender </span>
          </div>
        </div>
      </a-alert>

      <vcu-table
        ref="xTable1"
        isLazy
        height="300"
        show-footer
        :footer-method="footerMethod"
        :loadOptions="options1"
        :checkbox-config="{
          checkField: 'checked',
          highlight: true,
          labelField: 'pName',
        }"
      ></vcu-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            配置
            <span class="blue-text"> loadOptions.radio = true </span>
            开启radio
          </div>
        </div>
      </a-alert>

      <vcu-table
        ref="xTable2"
        isLazy
        height="300"
        show-footer
        :footer-method="footerMethod"
        :loadOptions="options2"
        :radio-config="{ highlight: true }"
      >
      </vcu-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            配置
            <span class="blue-text">
              :radio-config="{ labelField: '某列KEY' }"
            </span>
            并且
            <span class="blue-text"> loadOptions.customRender </span>
          </div>
        </div>
      </a-alert>

      <vcu-table
        ref="xTable1"
        isLazy
        height="300"
        show-footer
        :footer-method="footerMethod"
        :loadOptions="options3"
        :radio-config="{
          highlight: true,
          labelField: 'pName',
        }"
      ></vcu-table>
    </div>
  </a-card>
</template>
<script>
export default {
  data() {
    return {
      options: {
        headUrl: "dataq/api/header/getApproveArrearageList",
        pageUrl: "dataq/api/page/getApproveArrearageList",
        checkbox: true,
      },
      options1: {
        headUrl: "dataq/api/header/getApproveArrearageList",
        pageUrl: "dataq/api/page/getApproveArrearageList",
        customRender: [
          {
            key: "pName",
            params: {
              type: "checkbox",
            },
          },
        ],
      },
      options2: {
        headUrl: "dataq/api/header/getApproveArrearageList",
        pageUrl: "dataq/api/page/getApproveArrearageList",
        radio: true,
      },
      options3: {
        headUrl: "dataq/api/header/getApproveArrearageList",
        pageUrl: "dataq/api/page/getApproveArrearageList",
        customRender: [
          {
            key: "pName",
            params: {
              type: "radio",
            },
          },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    footerMethod({ columns, data }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex == 0) {
            return "合计";
          }
          if (columnIndex == 1) {
            return data.length;
          }
          return null;
        }),
      ];
      return footerData;
    },
  },
};
</script>

