<template>
  <v-card title="快捷菜单">
    <div class="mb-30">
      <vcu-table
        ref="xTable"
        :data="tableData"
        :edit-config="{
          trigger: 'click',
          mode: 'row',
        }"
        :loading="loading"
        :context-menu="tableMenu"
        @context-menu-click="contextMenuClickEvent"
      >
        <vcu-table-column type="checkbox" width="60"></vcu-table-column>
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column
          field="name"
          title="Name"
          :edit-render="{ autofocus: '.my-input' }"
        >
          <template v-slot:edit="scope">
            <v-input
              size="small"
              v-model="scope.row.name"
              @input="$refs.xTable.updateStatus(scope)"
              class="my-input"
            ></v-input>
          </template>
        </vcu-table-column>
        <vcu-table-column field="sex" title="Sex" :edit-render="{}">
          <template v-slot:edit="scope">
            <v-select
              size="small"
              v-model="scope.row.sex"
              @change="$refs.xTable.updateStatus(scope)"
              style="width: 100%"
            >
              <v-select-option
                v-for="item in sexList"
                :key="item.value"
                :value="item.value"
                >{{ item.label }}</v-select-option
              >
            </v-select>
          </template>
          <template v-slot="{ row }">{{
            getSelectLabel(row.sex, sexList)
          }}</template>
        </vcu-table-column>
        <vcu-table-column field="age" title="Age" :edit-render="{}">
          <template v-slot:edit="{ row }">
            <v-input-number
              size="small"
              v-model="row.age"
              :max="105"
              :min="1"
              style="width: 100%"
            ></v-input-number>
          </template>
        </vcu-table-column>
        <vcu-table-column field="address" title="Address" :edit-render="{}">
          <template v-slot:edit="scope">
            <autoTypewrit
              size="small"
              v-model="scope.row.address"
              :loadOptions="loadOptions"
              transfer
              backfillKey="inHospDeptName"
            ></autoTypewrit>
          </template>
        </vcu-table-column>
      </vcu-table>
    </div>
  </v-card>
</template>
<script>
import XEUtils from "xe-utils";
import XEClipboard from "xe-clipboard";
export default {
  data() {
    return {
      loadOptions: {
        headUrl:
          "http://10.16.0.78:8033/mock/9cf15880587211ea804331cf8/dataq/api/header",
        listUrl:
          "http://10.16.0.78:8033/mock/9cf15880587211ea804331cf8/dataq/api/page",
      },
      tableData: [
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "1",
          age: 28,
          address: "好好学习天天向上",
        },
        {
          id: 10002,
          name: "Test2",
          role: "Test",
          sex: "0",
          age: 22,
          address: "Guangzhou",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "1",
          age: 32,
          address: "Shanghai",
        },
        {
          id: 10004,
          name: "Test4",
          role: "Designer",
          sex: "0",
          age: 24,
          address: "Shanghai",
        },
      ],
      sexList: [
        { label: "女", value: "0" },
        { label: "男", value: "1" },
      ],
      loading: false,
      tableMenu: {
        header: {
          options: [
            [
              { code: "hideColumn", name: "隐藏列", disabled: false },
              {
                code: "showAllColumn",
                name: "取消所有隐藏列",
                disabled: false,
              },
            ],
          ],
        },
        body: {
          options: [
            [
              {
                code: "copy",
                name: "复制",
                disabled: false,
              },
              { code: "reload", name: "刷新", disabled: false },
              { code: "insertAt", name: "插入", disabled: false },
              { code: "remove", name: "删除", disabled: false },
              {
                code: "save",
                name: "保存",
                disabled: false,
              },
            ],
          ],
        },
        visibleMethod: this.visibleMethod,
      },
    };
  },
  mounted() {},
  methods: {
    getSelectLabel(value, list, valueProp = "value", labelField = "label") {
      const item = XEUtils.find(list, (item) => item[valueProp] === value);
      return item ? item[labelField] : null;
    },
    visibleMethod({ options, column }) {
      let isDisabled = !column;
      options.forEach((list) => {
        list.forEach((item) => {
          item.disabled = isDisabled;
        });
      });
      return true;
    },
    contextMenuClickEvent({ menu, row, column }) {
      let xTable = this.$refs.xTable;
      switch (menu.code) {
        case "hideColumn":
          xTable.hideColumn(column);
          break;
        case "showAllColumn":
          xTable.resetColumn();
          break;
        case "copy":
          if (XEClipboard.copy(row[column.property])) {
            this.$message.success("已复制到剪贴板！");
          }
          break;
        case "reload":
          this.findList();
          break;
        case "insertAt":
          this.insertEvent(row, column);
          break;
        case "remove":
          xTable.remove(row);
          break;
        case "save":
          this.$message.success("保存成功");
          this.findList();
          break;
      }
    },
    insertEvent(row, column) {
      let xTable = this.$refs.xTable;
      xTable
        .insertAt(null, row)
        .then(({ row }) => xTable.setActiveCell(row, column.property));
    },
    findList() {
      this.loading = true;
      this.tableData = [];
      setTimeout(() => {
        this.tableData = [
          {
            id: 10001,
            name: "Test1",
            role: "Develop",
            sex: "1",
            age: 28,
            address: "好好学习天天向上",
          },
          {
            id: 10002,
            name: "Test2",
            role: "Test",
            sex: "0",
            age: 22,
            address: "Guangzhou",
          },
          {
            id: 10003,
            name: "Test3",
            role: "PM",
            sex: "1",
            age: 32,
            address: "Shanghai",
          },
          {
            id: 10004,
            name: "Test4",
            role: "Designer",
            sex: "0",
            age: 24,
            address: "Shanghai",
          },
        ];
        this.loading = false;
      }, 1500);
    },
  },
};
</script>

