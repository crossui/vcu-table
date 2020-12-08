<template>
  <a-card title="局部加载">
    <div class="mb-30">
      <div class="mb-5">
        <a-button-group>
          <a-button @click="loadList(300)">+300条</a-button>
          <a-button @click="removeList(50)">-50条</a-button>
          <a-button @click="loadColumns()">+1列</a-button>
          <a-button @click="removeColumn()">-1列</a-button>
          <a-button @click="$refs.xTable.scrollTo(1000,8000)">
            x=1000,y=8000
          </a-button>
          <a-button @click="$refs.xTable.clearScroll()">清除滚动</a-button>
        </a-button-group>
      </div>
      <vcu-table
        ref="xTable"
        show-overflow
        highlight-hover-row
        max-height="300"
        show-footer
        :loading="loading"
        :columns="tableColumn"
        :data="tableData"
        :footer-method="footerMethod"
        :edit-config="{ trigger: 'click', mode: 'row' }"
        :edit-rules="validRules"
      >
      </vcu-table>
    </div>
  </a-card>
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
        {
          field: "name",
          title: "Name",
          editRender: true,
          width: 600,
        },
        { field: "nickname", title: "Nickname", width: 600 },
        { field: "role", title: "Role", width: 600 },
        { field: "sex", title: "Sex", showHeaderOverflow: true, width: 600 },
        {
          field: "age",
          title: "Age",
          showHeaderOverflow: true,
          width: 600,
        },
        { field: "address", title: "Address", showOverflow: true, width: 600 },
        {
          field: "createTime",
          title: "CreateTime",
          showOverflow: true,
          width: 600,
        },
      ],
      tableData: [],
      validRules: {
        name: [{ required: true, message: "姓名必须填写" }],
        age: [{ required: true, message: "年龄必须填写" }],
      },
    };
  },
  mounted() {
    this.init();
  },
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
    loadList(size) {
      this.loading = true;
      let data = [];
      for (let i = 0; i < size; i++) {
        data.push({
          address: "wangWu",
          age: 32,
          createTime: "2020-10-16",
          date3: "20:30",
          name: "Test111",
          nickname: "T2",
          rate: 3,
          role: "admin",
          sex: "Women",
          updateTime: "2020-10-16",
        });
      }
      console.info(data);
      setTimeout(() => {
        this.tableData = this.tableData.concat(data);
        this.loading = false;
        console.info(this.tableData);
      }, 2000);
    },
    removeList(size) {
      this.loading = true;
      setTimeout(() => {
        if (this.tableData.length > size) {
          this.tableData = this.tableData.slice(
            0,
            this.tableData.length - size
          );
        }
        this.loading = false;
      }, 100);
    },
    loadColumns() {
      this.tableColumn = this.tableColumn.concat([
        {
          field: "updateTime",
          title: "UpdateTime",
          showHeaderOverflow: true,
          width: 600,
        },
      ]);
    },
    removeColumn() {
      this.tableColumn = this.tableColumn.slice(0, this.tableColumn.length - 1);
    },
  },
};
</script>

