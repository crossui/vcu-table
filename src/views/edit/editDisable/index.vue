<template>
  <a-card title="禁止编辑">
    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            设置
            <span class="blue-text"> edit-config </span> 的
            <span class="blue-text"> activeMethod </span> 方法判断是否禁用
          </div>
          <div>
            设置
            <span class="blue-text"> edit-disabled </span>
            在点击被禁用的回调方法
          </div>
        </div>
      </a-alert>

      <vcu-table
        ref="xTable"
        :data="tableData"
        :edit-config="{
          trigger: 'click',
          mode: 'row',
          activeMethod: activeRowMethod,
        }"
        @edit-disabled="editDisabledEvent"
      >
        <vcu-table-column type="checkbox" width="60"></vcu-table-column>
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column
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
        </vcu-table-column>
        <vcu-table-column field="sex" title="Sex" :edit-render="{}">
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
        </vcu-table-column>
        <vcu-table-column field="age" title="Age" :edit-render="{}">
          <template v-slot:edit="{ row }">
            <a-input-number
              size="small"
              v-model="row.age"
              :max="105"
              :min="1"
              style="width: 100%"
            ></a-input-number>
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
    activeRowMethod({ row, rowIndex }) {
      return rowIndex !== 1;
    },
    editDisabledEvent({ row, column }) {
      this.$message.error("禁止编辑");
    },
  },
};
</script>

