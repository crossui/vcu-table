<template>
  <a-card title="导出">
    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            通过调用 <span class="blue-text">exportData</span> 函数指定
            <span class="blue-text">type='csv'</span> 可以直接将表格导出为
            <span class="blue-text">CSV/HTML/XML/TXT</span> 格式的文件；
          </div>
          <div>
            默认会排除 <span class="blue-text">field</span> 为空和
            <span class="blue-text">type</span> 相关的功能列，可以通过自定义
            <span class="blue-text">data</span> 和
            <span class="blue-text">columns</span> 导出数据
          </div>
          <div>
            对于 <span class="blue-text">csv</span> 等特殊类型，可以通过设置
            <span class="blue-text">cell-type</span> 将数值类型转为字符串类型
          </div>
          <div>
            如果是服务端导出，通过设置 <span class="blue-text">remote</span> 和
            <span class="blue-text">exportMethod</span> 开启服务端自定义导出
          </div>
          <div>配置 <span class="blue-text">filename</span> 参数指定文件名</div>
          <div>
            配置
            <span class="blue-text">columnFilterMethod</span> 参数过滤指定列
          </div>
          <div>
            配置 <span class="blue-text">dataFilterMethod</span> 参数过滤指定行
          </div>
          <div class="red-text">
            （注：只支持基本数据结构，目前不支持分组、合并等；树结构和虚拟滚动只允许导出数据源，前端导出的数据量有限，建议使用后端导出）
          </div>
        </div>
      </a-alert>
      <a-button-group class="mb-5">
        <a-button @click="exportDataEvent">默认导出</a-button>
        <a-button @click="exportSelectEvent">导出选中</a-button>
        <a-button @click="exportCustomEvent">导出自定义</a-button>
      </a-button-group>

      <vxe-table
        highlight-hover-row
        export-config
        border
        ref="xTable1"
        :data="tableData"
      >
        <vxe-table-column type="checkbox" width="60"></vxe-table-column>
        <vxe-table-column type="seq" width="60"></vxe-table-column>
        <vxe-table-column
          field="name"
          title="自动转换"
          cell-type="string"
        ></vxe-table-column>
        <vxe-table-column
          field="amount"
          title="导出数值"
          cell-type="number"
        ></vxe-table-column>
        <vxe-table-column
          field="num"
          title="导出字符串"
          cell-type="string"
          sortable
        ></vxe-table-column>
      </vxe-table>
    </div>
  </a-card>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        { name: "test1", amount: "12953.6985", num: 1259326 },
        {
          name: "154645623546345",
          amount: "45646464888888654654",
          num: 4564566456645,
        },
        { name: 1231242, amount: "4564564545646.6985", num: 0 },
        { name: true, amount: "12953.6985", num: 54646646 },
        { name: "0", amount: "0", num: "645645645665567645234326456" },
        { name: false, amount: "1231231213123.456", num: "45645645645646456" },
        { name: "test2", amount: "99999.08", num: 9999.88 },
      ],
    };
  },
  methods: {
    exportDataEvent() {
      this.$refs.xTable1.exportData({ type: "csv" });
    },
    exportSelectEvent() {
      this.$refs.xTable1.exportData({
        data: this.$refs.xTable1.getCheckboxRecords(),
      });
    },
    exportCustomEvent() {
      this.$refs.xTable1.exportData({
        filename: "自定义文件名",
        type: "csv",
        isHeader: true,

        isFooter: true,
        columnFilterMethod({ column }) {
          return ["name", "amount"].includes(column.property);
        },
        dataFilterMethod({ row }) {
          return row.name != "0";
        },
      });
    },
  },
};
</script>

