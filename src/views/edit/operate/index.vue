<template>
  <a-card title="数据操作">
    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            调用
            <span class="blue-text"> insert、insertAt </span> 函数插入临时数据
          </div>
          <div>
            调用
            <span class="blue-text"> remove </span> 删除指定行数据
          </div>
          <div>
            通过 <span class="blue-text"> icon </span> 自定义编辑状态的图标，
            还可以设置
            <span class="blue-text"> showIcon=false </span> 不显示修改图标
          </div>
          <div>
            设置
            <span class="blue-text"> keep-source </span>
            开启保持原始值状态，通过调用
            <span class="blue-text"> revertData </span> 还原数据
            <span class="red-text"
              >（注：开启 keep-source 将会影响性能，具体取决于数据量）</span
            >
          </div>
        </div>
      </a-alert>
      <a-button-group class="mb-5">
        <a-button @click="insertEvent()">新增</a-button>
        <a-button @click="insertEvent(tableData[2])"> 在第3行插入 </a-button>
        <a-button @click="insertEvent(-1)">在最后行插入</a-button>
        <a-button @click="removeEvent(tableData[1])">删除第2行</a-button>
        <a-button @click="$refs.xTable.removeCheckboxRow()">删除选中</a-button>
        <a-button @click="getSelectionEvent">获取选中</a-button>
        <a-button @click="getInsertEvent">获取新增</a-button>
        <a-button @click="saveEvent">保存</a-button>
        <a-button @click="revertEvent">还原</a-button>
      </a-button-group>

      <vxe-table
        ref="xTable"
        class="my_table_insert"
        keep-source
        :data="tableData"
        :edit-config="{
          trigger: 'click',
          mode: 'row',
          icon: 'iconfont icon-edit-square',
        }"
      >
        <vxe-table-column type="checkbox" width="60"></vxe-table-column>
        <vxe-table-column type="seq" width="60"></vxe-table-column>
        <vxe-table-column
          field="name"
          title="Name"
          :edit-render="{ autofocus: '.my-input' }"
        >
          <template v-slot:edit="scope">
            <a-input
              size="small"
              v-model="scope.row.name"
              @input="$refs.xTable.updateStatus(scope)"
              class="my-input"
            ></a-input>
          </template>
        </vxe-table-column>
        <vxe-table-column field="sex" title="Sex" :edit-render="{}">
          <template v-slot:edit="scope">
            <a-select
              size="small"
              v-model="scope.row.sex"
              @change="$refs.xTable.updateStatus(scope)"
              style="width: 100%"
            >
              <a-select-option
                v-for="item in sexList"
                :key="item.value"
                :value="item.value"
                >{{ item.label }}</a-select-option
              >
            </a-select>
          </template>
          <template v-slot="{ row }">{{
            getSelectLabel(row.sex, sexList)
          }}</template>
        </vxe-table-column>
        <vxe-table-column field="age" title="Age" :edit-render="{}">
          <template v-slot:edit="{ row }">
            <a-input-number
              size="small"
              v-model="row.age"
              :max="105"
              :min="1"
              style="width: 100%"
            ></a-input-number>
          </template>
        </vxe-table-column>
        <vxe-table-column field="address" title="Address" :edit-render="{}">
          <template v-slot:edit="scope">
            <autoTypewrit
              size="small"
              v-model="scope.row.address"
              :loadOptions="loadOptions"
              transfer
              backfillKey="inHospDeptName"
            ></autoTypewrit>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
  </a-card>
</template>
<script>
import XEUtils from "xe-utils";
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
    };
  },
  mounted() {},
  methods: {
    getSelectLabel(value, list, valueProp = "value", labelField = "label") {
      const item = XEUtils.find(list, (item) => item[valueProp] === value);
      return item ? item[labelField] : null;
    },
    async insertEvent(row) {
      let record = {
        sex: "1",
      };
      let { row: newRow } = await this.$refs.xTable.insertAt(record, row);
      await this.$refs.xTable.setActiveCell(newRow, "sex");
    },
    getInsertEvent() {
      let insertRecords = this.$refs.xTable.getInsertRecords();
      this.$info({ content: insertRecords.length });
    },
    getSelectionEvent() {
      let selectRecords = this.$refs.xTable.getCheckboxRecords();
      this.$info({ content: selectRecords.length });
    },
    saveEvent() {
      const {
        insertRecords,
        removeRecords,
        updateRecords,
      } = this.$refs.xTable.getRecordset();
      this.$info({
        content: `insertRecords=${insertRecords.length} removeRecords=${removeRecords.length} updateRecords=${updateRecords.length}`,
      });
    },
    removeEvent(row) {
      let _this = this;
      this.$confirm({
        title: "提示",
        content: "您确定要删除该数据?",
        onOk() {
          _this.$refs.xTable.remove(row);
        },
      });
    },
    revertEvent() {
      let _this = this;
      this.$confirm({
        title: "提示",
        content: "您确定要还原数据吗?",
        onOk() {
          _this.$refs.xTable.revertData();
        },
      });
    },
  },
};
</script>
<style>
.my_table_insert .vxe-body--row.is--new {
  background-color: #f1fdf1;
}
</style>

