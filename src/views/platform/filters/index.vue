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

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            配置
            <span class="blue-text"> filter-config="{ remote: true }" </span>
            开启服务端筛选
          </div>
          <div>
            <span class="blue-text"> filter-change </span>
            事件来拼接通用平台需要的数据格式
          </div>
          <div>
            调用方法
            <span class="blue-text"> handleFilterRemote </span>
            请求 （ <span class="blue-text"> type </span> : 是否重置过滤值）
          </div>
        </div>
      </a-alert>
      <div class="mb-5"></div>
      <vcu-table
        ref="xTable1"
        :filter-config="{ remote: true }"
        :loadOptions="options1"
        max-height="200"
        @filter-change="filterChange"
        @onPageLoad="onPageLoad"
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
      options1: {
        headUrl: "dataq/api/bigDataHeader",
        pageUrl: "dataq/api/bigDataPage",
        seq: true,
        checkbox: true,
        radio: true,
        filters: true,
      },
      isSetFilter: false,
    };
  },
  mounted() {},
  methods: {
    onPageLoad() {
      if (!this.isSetFilter) {
        const xTable = this.$refs.xTable1;
        const column = xTable.getColumnByField("hospDepartCode");
        xTable.setFilter(column, [
          { label: "包含 101", value: "101" },
          { label: "包含 201", value: "201" },
        ]);
        this.isSetFilter = true;
      }
    },
    filterChange(obj) {
      if (obj.filters && obj.filters.length) {
        let filterParameter = [];
        XEUtils.arrayEach(obj.filters, (item, index) => {
          if (item.datas.length) {
            XEUtils.arrayEach(item.values, (subItem, subIndex) => {
              filterParameter.push({
                detailValue:
                  item.column.filter_name && item.column.filter_name != ""
                    ? item.column.filter_name
                    : item.column.ora_name,
                detailNo: filterParameter.length + 1,
                detailName: item.column.title,
                arithmetic: item.property == "hospDepartCode" ? "7" : "1",
                fieldValue: subItem,
                operators: subIndex == item.values.length - 1 ? "1" : "2",
              });
            });
          }
        });

        this.$refs.xTable1.handleFilterRemote(
          filterParameter.length ? filterParameter : null,
          false
        );
      }
    },
  },
};
</script>

