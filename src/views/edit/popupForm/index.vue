<template>
  <v-card title="弹框编辑">
    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          <div>实现弹框表单编辑功能，双击行可以弹出编辑框</div>
        </div>
      </v-alert>
      <div class="mb-5">
        <v-button icon="plus" @click="insertEvent">新增</v-button>
      </div>
      <vcu-table
        border
        resizable
        row-key
        highlight-hover-row
        ref="xTable"
        :loading="loading"
        :height="500"
        :data="tableData"
        @cell-dblclick="cellDBLClickEvent"
      >
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column field="name" title="Name"></vcu-table-column>
        <vcu-table-column
          field="sex"
          title="Sex"
          :formatter="formatterSex"
        ></vcu-table-column>
        <vcu-table-column field="age" title="Age"></vcu-table-column>
        <vcu-table-column
          field="address"
          title="Address"
          show-overflow
        ></vcu-table-column>
        <vcu-table-column title="操作" width="100" show-overflow>
          <template v-slot="{ row }">
            <v-button-group size="small">
              <v-button icon="edit" @click="editEvent(row)"></v-button>
              <v-button icon="delete" @click="removeEvent(row)"></v-button>
            </v-button-group>
          </template>
        </vcu-table-column>
      </vcu-table>
    </div>

    <v-modal
      :title="selectRow ? '编辑&保存' : '新增&保存'"
      :visible="showEdit"
      :confirm-loading="submitLoading"
      @ok="submitEvent"
      @cancel="handleCancel"
    >
      <v-form-model
        ref="ruleForm"
        :model="formData"
        :rules="formRules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <v-form-model-item label="name" prop="name">
          <v-input v-model="formData.name" placeholder="请输入名称" />
        </v-form-model-item>
        <v-form-model-item label="sex" prop="sex">
          <v-select v-model="formData.sex" placeholder="请选择性别">
            <v-select-option value="0"> 女 </v-select-option>
            <v-select-option value="1"> 男 </v-select-option>
          </v-select>
        </v-form-model-item>
        <v-form-model-item label="age" prop="age">
          <v-input-number
            v-model="formData.age"
            :min="1"
            :max="200"
            style="width: 200px"
          />
        </v-form-model-item>
        <v-form-model-item label="address" prop="address">
          <v-textarea
            v-model="formData.address"
            placeholder="请输入地址"
            :auto-size="{ minRows: 3, maxRows: 5 }"
          />
        </v-form-model-item>
      </v-form-model>
    </v-modal>
  </v-card>
</template>
<script>
import * as api from "@/api/test";
import XEUtils from "xe-utils";
export default {
  data() {
    return {
      submitLoading: false,
      selectRow: null,
      showEdit: false,
      sexList: [
        { label: "女", value: "0" },
        { label: "男", value: "1" },
      ],
      labelCol: { span: 4 },
      wrapperCol: { span: 18 },
      formData: {
        name: null,
        sex: null,
        age: null,
        address: null,
      },
      formRules: {
        name: [
          { required: true, message: "请输入名称" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符" },
        ],
        sex: [{ required: true, message: "请选择性别" }],
      },
      loading: false,
      tableData: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      this.loading = true;
      let res = await api.getPopupFormData();
      this.loading = false;
      if (res) {
        this.tableData = res.data.payload.data;
      }
    },
    formatterSex({ cellValue }) {
      let item = this.sexList.find((item) => item.value === cellValue);
      return item ? item.label : "";
    },
    insertEvent() {
      this.selectRow = null;
      this.showEdit = true;
    },
    cellDBLClickEvent({ row }) {
      this.editEvent(row);
    },
    editEvent(row) {
      this.formData = {
        name: row.name,
        sex: row.sex,
        age: row.age,
        address: row.address,
      };
      this.selectRow = row;
      this.showEdit = true;
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
    submitEvent() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.submitLoading = true;
          setTimeout(() => {
            this.submitLoading = false;
            this.showEdit = false;
            if (this.selectRow) {
              this.$message.success("保存成功");
              Object.assign(this.selectRow, this.formData);
            } else {
              this.$message.success("新增成功");
              this.$refs.xTable.insert(this.formData);
            }
          }, 1000);
        }
      });
    },
    handleCancel() {
      this.$refs.ruleForm.resetFields();
      this.showEdit = false;
    },
  },
};
</script>

