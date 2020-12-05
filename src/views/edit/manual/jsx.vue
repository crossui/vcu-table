<template>
  <div class="mb-30">
    <a-alert type="info" class="mb-10">
      <div slot="message">
        <div>使用 <span class="blue-text"> jsx </span> 方式引入第三方组件</div>
        <div>配置 <span class="blue-text"> editRender: { autofocus: "类名" } </span> 指定聚焦组件</div>
      </div>
    </a-alert>
    <vcu-table
      ref="xTable"
      :columns="tableColumn"
      :data="tableData"
      :edit-config="{ trigger: 'manual', mode: 'row' }"
    >
    </vcu-table>
  </div>
</template>
<script>
import XEUtils from "xe-utils";
export default {
  data() {
    return {
      tableColumn: [
        {
          type: "seq",
          width: 50,
        },
        {
          field: "name",
          title: "Name",
          editRender: { autofocus: ".my-input" },
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
        {
          field: "sex",
          title: "Sex",
          editRender: true,
          slots: {
            default: ({ row }) => {
              return [this.getSelectLabel(row.sex, this.sexList)];
            },
            edit: (scope) => {
              return [
                <a-select
                  size="small"
                  v-model={scope.row.sex}
                  style="width: 100%"
                >
                  {this.sexList.map((item, index) => {
                    return [
                      <a-select-option key={item.value} value={item.value}>
                        {item.label}
                      </a-select-option>,
                    ];
                  })}
                </a-select>,
              ];
            },
          },
        },
        {
          field: "age",
          title: "Age",
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
        {
          field: "address",
          title: "Address",
          editRender: true,
          slots: {
            edit: (scope) => {
              return [
                <autoTypewrit
                  size="small"
                  v-model={scope.row.address}
                  loadOptions={this.loadOptions}
                  transfer
                  backfillKey="inHospDeptName"
                ></autoTypewrit>,
              ];
            },
          },
        },
        {
          title: "Action",
          slots: {
            default: ({ row }) => {
              if (this.$refs.xTable.isActiveByRow(row)) {
                return [
                  <a-button-group size="small">
                    <a-button
                      onClick={() => {
                        this.saveRowEvent(row);
                      }}
                    >
                      保存
                    </a-button>
                    <a-button
                      onClick={() => {
                        this.cancelRowEvent(row);
                      }}
                    >
                      取消
                    </a-button>
                  </a-button-group>,
                ];
              } else {
                return [
                  <a-button
                    size="small"
                    onClick={() => {
                      this.editRowEvent(row);
                    }}
                  >
                    编辑
                  </a-button>,
                ];
              }
            },
          },
        },
      ],
      tableData: [
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "0",
          age: 28,
          address: "absdsdss",
        },
        {
          id: 10002,
          name: "Test2",
          role: "Test",
          sex: "1",
          age: 22,
          address: "Guangzhou",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "0",
          age: 32,
          address: "Shanghai",
        },
        {
          id: 10004,
          name: "Test4",
          role: "Designer",
          sex: "1",
          age: 24,
          address: "Shanghai",
        },
      ],
      sexList: [
        { label: "Women", value: "0" },
        { label: "Man", value: "1" },
      ],
      loadOptions: {
        headUrl:
          "http://10.16.0.78:8033/mock/9cf15880587211ea804331cf8/dataq/api/header",
        listUrl:
          "http://10.16.0.78:8033/mock/9cf15880587211ea804331cf8/dataq/api/page",
      },
    };
  },
  mounted() {},
  methods: {
    getSelectLabel(value, list, valueProp = "value", labelField = "label") {
      const item = XEUtils.find(list, (item) => item[valueProp] === value);
      return item ? item[labelField] : null;
    },
    editRowEvent(row) {
      this.$refs.xTable.setActiveRow(row);
    },
    saveRowEvent(row) {
      this.$refs.xTable.clearActived().then(() => {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.$message.success("保存成功！");
        }, 300);
      });
    },
    cancelRowEvent(row) {
      const xTable = this.$refs.xTable;
      xTable.clearActived().then(() => {
        // 还原行数据
        xTable.revertData(row);
      });
    },
    handleSelectSubmit(row) {
      console.info(row);
      this.form.autoValue = row.inHospDeptName;
    },
  },
};
</script>

