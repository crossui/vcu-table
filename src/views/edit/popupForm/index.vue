<template>
  <a-card title="弹框编辑">
    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          <div>实现弹框表单编辑功能，双击行可以弹出编辑框</div>
        </div>
      </a-alert>
      <div class="mb-5">
        <a-button icon="plus" @click="insertEvent">新增</a-button>
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
            <a-button-group size="small">
              <a-button icon="edit" @click="editEvent(row)"></a-button>
              <a-button icon="delete" @click="removeEvent(row)"></a-button>
            </a-button-group>
          </template>
        </vcu-table-column>
      </vcu-table>
    </div>

    <a-modal
      :title="selectRow ? '编辑&保存' : '新增&保存'"
      :visible="showEdit"
      :confirm-loading="submitLoading"
      @ok="submitEvent"
      @cancel="handleCancel"
    >
      <a-form-model
        ref="ruleForm"
        :model="formData"
        :rules="formRules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-form-model-item label="name" prop="name">
          <a-input v-model="formData.name" placeholder="请输入名称" />
        </a-form-model-item>
        <a-form-model-item label="sex" prop="sex">
          <a-select v-model="formData.sex" placeholder="请选择性别">
            <a-select-option value="0"> 女 </a-select-option>
            <a-select-option value="1"> 男 </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="age" prop="age">
          <a-input-number
            v-model="formData.age"
            :min="1"
            :max="200"
            style="width: 200px"
          />
        </a-form-model-item>
        <a-form-model-item label="address" prop="address">
          <a-textarea
            v-model="formData.address"
            placeholder="请输入地址"
            :auto-size="{ minRows: 3, maxRows: 5 }"
          />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </a-card>
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

