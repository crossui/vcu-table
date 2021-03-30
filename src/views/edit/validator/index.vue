<template>
  <v-card title="数据校验">
    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            通过调用
            <span class="blue-text"> validate </span> 函数校验数据，
            <span class="blue-text"> edit-rules </span>
            校验规则配置，如果第一个参数为 true 则全量校验
          </div>
        </div>
      </v-alert>

      <v-button-group class="mb-5">
        <v-button @click="validEvent">校验</v-button>
        <v-button @click="fullValidEvent">完整校验</v-button>
        <v-button @click="validAllEvent">全量校验</v-button>
        <v-button @click="selectValidEvent">选中校验</v-button>
      </v-button-group>

      <vcu-table
        ref="xTable"
        :data="tableData"
        :edit-config="{
          trigger: 'click',
          mode: 'row',
        }"
        :edit-rules="validRules"
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
export default {
  data() {
    const nameValid = ({ cellValue }) => {
      if (cellValue && !/^\w+$/.test(cellValue)) {
        return new Error("名称格式不正确，必须字母或数字");
      }
    };
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
          name: "",
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
      validRules: {
        name: [
          { required: true, message: "姓名必须填写" },
          { validator: nameValid },
        ],
        age: [{ required: true, message: "年龄必须填写" }],
      },
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
    async validEvent() {
      const errMap = await this.$refs.xTable
        .validate()
        .catch((errMap) => errMap);
      if (errMap) {
        this.$message.error("校验不通过！");
      } else {
        this.$message.success("校验成功！");
      }
    },
    async fullValidEvent() {
      const errMap = await this.$refs.xTable
        .fullValidate()
        .catch((errMap) => errMap);
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

        let validHtml = "";
        for (let item in msgList) {
          validHtml += `<div class="mb-5">${item}</div>`;
        }

        this.$error({
          title: "提示",
          content: (h) => {
            return h("div", {
              domProps: {
                innerHTML: validHtml,
              },
            });
          },
        });
      } else {
        this.$message.success("校验成功！");
      }
    },
    async validAllEvent() {
      const errMap = await this.$refs.xTable
        .validate(true)
        .catch((errMap) => errMap);
      if (errMap) {
        this.$message.error("校验不通过！");
      } else {
        this.$message.success("校验成功！");
      }
    },
    async selectValidEvent() {
      let selectRecords = this.$refs.xTable.getCheckboxRecords();
      if (selectRecords.length > 0) {
        const errMap = await this.$refs.xTable
          .validate(selectRecords)
          .catch((errMap) => errMap);
        if (errMap) {
          this.$message.error("校验不通过！");
        } else {
          this.$message.success("校验成功！");
        }
      } else {
        this.$message.warning("未选中数据！");
      }
    },
  },
};
</script>

