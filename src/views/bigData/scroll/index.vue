<template>
  <v-card title="虚拟滚动">
    <v-button @click="init()" class="mb-5">加载数据</v-button>
    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            高性能的虚拟渲染，通过设置
            <span class="blue-text"> height、max-height </span>
            即可启用虚拟渲染，只会渲染可指定范围内的可视区数据，其他的数据将被卷去收起，当滚动到可视区时才显示出来
          </div>
          <div class="red-text">最大可以支撑 5w 列、30w 行</div>
        </div>
      </v-alert>
      <vcu-table
        ref="xTable"
        show-overflow
        highlight-hover-row
        height="300"
        :loading="loading"
        :columns="tableColumn"
        :data="tableData"
      >
      </vcu-table>
    </div>

    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            手动调优，对于低性能的浏览器可以通过设置
            <span class="blue-text"> oSize </span>
            偏移量来缓解渲染次数，偏移量越大渲染次数就越少，但是每次渲染的耗时就越久
          </div>
          <div>
            通过指定
            <span class="blue-text">
              scroll-x={gt: 20} 或 scroll-y={gt: 40}
            </span>
            适合的参数可以手动调优，如果为
            <span class="blue-text"> 0 </span> 则总是启用，如果为
            <span class="blue-text"> -1 </span> 关闭虚拟滚动
          </div>
          <div>
            设置
            <span class="blue-text">
              checkbox-config="{ checkField: 'checked' }"
            </span>
            checkbox提升勾选后渲染速度
          </div>
        </div>
      </v-alert>
      <v-button-group class="mb-5">
        <v-button @click="$refs.xTable1.setAllCheckboxRow(true)">
          所有选中
        </v-button>
        <v-button @click="$refs.xTable1.clearCheckboxRow()">清除选中</v-button>
        <v-button @click="getSelectEvent">获取选中</v-button>
      </v-button-group>
      <vcu-table
        ref="xTable1"
        show-overflow
        highlight-hover-row
        height="300"
        show-footer
        :loading="loading"
        :columns="tableColumn"
        :data="tableData"
        :footer-method="footerMethod"
        :scroll-x="{ gt: 10 }"
        :scroll-y="{ gt: 100 }"
        :checkbox-config="{ checkField: 'checked', highlight: true }"
      >
      </vcu-table>
    </div>
  </v-card>
</template>
<script>
import * as api from "@/api/test.js";
export default {
  data() {
    return {
      loading: false,
      tableColumn: [
        { type: "seq", width: 80 },
        { type: "radio", width: 80 },
        { type: "checkbox", width: 80 },
        { field: "name", title: "Name" },
        { field: "nickname", title: "Nickname" },
        { field: "role", title: "Role" },
        { field: "sex", title: "Sex", showHeaderOverflow: true },
        { field: "age", title: "Age", showHeaderOverflow: true },
        { field: "address", title: "Address", showOverflow: true },
        { field: "createTime", title: "CreateTime", showOverflow: true },
      ],
      tableData: [],
    };
  },
  mounted() {},
  methods: {
    async init() {
      this.loading = true;
      let res = await api.getScrollData();
      this.loading = false;
      if (res) {
        this.tableData = res.data.payload.data;
      }
    },
    footerMethod({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return "合计";
          }
          switch (column.property) {
            case "name":
              return data.length;
          }
          return "-";
        }),
      ];
    },
    getSelectEvent() {
      let selectRecords = this.$refs.xTable1.getCheckboxRecords();
      console.info(selectRecords.length);
    },
  },
};
</script>

