<template>
  <v-card title="点击触发">
    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            设置
            <span class="blue-text">
              edit-config={trigger: 'click', mode: 'cell'}
            </span>
            启用点击单元格编辑的功能
          </div>
          <div class="red-text">
            输入法字典组件 要聚焦配置
            <span class="blue-text">
              edit-render="{ autoselect: true, autofocus: '.auto-typewrit-iput'
              }
            </span>
          </div>
        </div>
      </v-alert>

      <v-button @click="handleSetActiveCell">y设置编辑</v-button>
      <vcu-table
        ref="xTable"
        :data="tableData"
        :edit-config="{ trigger: 'click', mode: 'cell' }"
      >
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column
          field="name"
          title="Name"
          :edit-render="{ autoselect: true, autofocus: '.my-input' }"
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
        <vcu-table-column
          field="address"
          title="Address"
          :edit-render="{ autoselect: true, autofocus: '.auto-typewrit-iput' }"
        >
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

    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            设置
            <span class="blue-text">
              edit-config={trigger: 'click', mode: 'row'}
            </span>
            启用点击行编辑的功能
          </div>
        </div>
      </v-alert>

      <vcu-table
        ref="xTable1"
        :data="tableData"
        :edit-config="{ trigger: 'click', mode: 'row' }"
      >
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column
          field="name"
          title="Name"
          width="360"
          :edit-render="{ autofocus: '.my-input' }"
        >
          <template v-slot:edit="scope">
            <v-input
              size="small"
              v-model="scope.row.name"
              class="my-input"
            ></v-input>
          </template>
        </vcu-table-column>
        <vcu-table-column field="sex" title="Sex" :edit-render="{}" width="360">
          <template v-slot:edit="scope">
            <v-select size="small" v-model="scope.row.sex" style="width: 100%">
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
        <vcu-table-column field="age" title="Age" :edit-render="{}" width="360">
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
        <vcu-table-column
          field="address"
          title="Address"
          width="360"
          :edit-render="{ autofocus: '.auto-typewrit-iput' }"
        >
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
    handleSetActiveCell() {
      let row = this.$refs.xTable.getData(1);
      this.$refs.xTable.setActiveCell(row,"address");
    },
  },
};
</script>

