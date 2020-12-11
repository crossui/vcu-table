<template>
  <a-card title="可编辑及数据校验">
    <a-button @click="init()" class="mb-5">加载数据</a-button>
    <div class="mb-30">

      <div class="mb-5">
        <a-dropdown class="mr-10">
          <a-button icon="down">新增操作</a-button>
          <a-menu slot="overlay" @click="handleAddClick">
            <a-menu-item key="1"> 从第一行插入</a-menu-item>
            <a-menu-item key="2"> 从最后插入</a-menu-item>
            <a-menu-item key="3"> 插入到 100 行</a-menu-item>
          </a-menu>
        </a-dropdown>

        <a-dropdown class="mr-10">
          <a-button icon="down">删除操作</a-button>
          <a-menu slot="overlay" @click="handleRemoveClick">
            <a-menu-item key="1"> 删除选中</a-menu-item>
            <a-menu-item key="2"> 删除第一行</a-menu-item>
            <a-menu-item key="3"> 删除第 100 行</a-menu-item>
          </a-menu>
        </a-dropdown>

        <a-dropdown class="mr-10">
          <a-button icon="down">校验操作</a-button>
          <a-menu slot="overlay" @click="handleVildClick">
            <a-menu-item key="1"> 基本校验</a-menu-item>
            <a-menu-item key="2"> 完整校验</a-menu-item>
            <a-menu-item key="3"> 选中校验</a-menu-item>
          </a-menu>
        </a-dropdown>
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
          slots: {
            edit: (scope) => {
              return [
                <a-input
                  size="small"
                  class="my-input"
                  v-model={scope.row.name}
                />,
              ];
            },
          },
        },
        { field: "nickname", title: "Nickname" },
        { field: "role", title: "Role" },
        { field: "sex", title: "Sex", showHeaderOverflow: true },
        {
          field: "age",
          title: "Age",
          showHeaderOverflow: true,
          editRender: true,
          slots: {
            edit: ({ row }) => {
              return [
                <a-input-number
                  size="small"
                  v-model={row.age}
                  max={105}
                  min={1}
                  style="width: 100%"
                ></a-input-number>,
              ];
            },
          },
        },
        { field: "address", title: "Address", showOverflow: true },
        { field: "createTime", title: "CreateTime", showOverflow: true },
      ],
      tableData: [],
      validRules: {
        name: [{ required: true, message: "姓名必须填写" }],
        age: [{ required: true, message: "年龄必须填写" }],
      },
    };
  },
  mounted() {
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
    handleAddClick(e) {
      switch (e.key) {
        case "1":
          this.insertEvent(null);
          break;
        case "2":
          this.insertEvent(-1);
          break;
        case "3":
          this.insertEvent(this.$refs.xTable.getData(100));
          break;
      }
    },
    insertEvent(row) {
      let xTable = this.$refs.xTable;
      let record = {};
      xTable.insertAt(record, row).then(({ row }) => {
        xTable.setActiveRow(row);
      });
    },
    handleRemoveClick(e) {
      switch (e.key) {
        case "1":
          this.$refs.xTable.removeCheckboxRow();
          break;
        case "2":
          this.$refs.xTable.remove(this.$refs.xTable.getData(0));
          break;
        case "3":
          this.$refs.xTable.remove(this.$refs.xTable.getData(100));
          break;
      }
    },
    handleVildClick(e) {
      switch (e.key) {
        case "1":
          this.$refs.xTable.validate((errMap) => {
            if (errMap) {
              this.$message.error("校验不通过！");
            } else {
              this.$message.success("校验成功！");
            }
          });
          break;
        case "2":
          this.$refs.xTable.fullValidate((errMap) => {
            if (errMap) {
              let msgList = [];
              Object.values(errMap).forEach((errList) => {
                errList.forEach((params) => {
                  let { rowIndex, column, rules } = params;
                  rules.forEach((rule) => {
                    msgList.push(
                      `第 ${rowIndex} 行 ${column.title} 校验错误：${rule.message}`
                    );
                  });
                });
              });
              this.$error({
                title: "提示",
                content: () => {
                  return [
                    <div style="max-height: 400px;overflow: auto;">
                      {msgList.map((msg) => {
                        return <div>{msg}</div>;
                      })}
                    </div>,
                  ];
                },
              });
            } else {
              this.$message.success("校验成功！");
            }
          });
          break;
        case "3":
          let selectRecords = this.$refs.xTable.getCheckboxRecords();
          if (selectRecords.length > 0) {
            this.$refs.xTable.validate(selectRecords, (errMap) => {
              if (errMap) {
                this.$message.error("校验不通过！");
              } else {
                this.$message.success("校验成功！");
              }
            });
          } else {
            this.$message.warning("未选中数据！");
          }
          break;
      }
    },
  },
};
</script>

