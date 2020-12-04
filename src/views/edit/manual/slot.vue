<template>
  <div class="mb-30">
    <a-alert type="info" class="mb-10">
      <div slot="message">
        <div>使用 <span class="blue-text"> slot </span> 方式引入第三方组件</div>
        <div>
          通过设置
          <span class="blue-text"> edit-config={autoClear:false} </span>
          取消失去焦点关闭编辑功能
          <span class="red-text">
            （注：如果设置为手动模式则不会自动关闭激活状态，需要手动调用
            clearActived 关闭编辑状态）
          </span>
        </div>
      </div>
    </a-alert>
    <vxe-table
      ref="xTable"
      :data="tableData"
      :edit-config="{ trigger: 'manual', mode: 'row', autoClear: false }"
    >
      <vxe-table-column type="seq" width="60"></vxe-table-column>
      <vxe-table-column
        field="name"
        title="Name"
        :edit-render="{ autoselect: true }"
      >
        <template v-slot:edit="scope">
          <a-input
            size="small"
            v-model="scope.row.name"
            @input="$refs.xTable.updateStatus(scope)"
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
      <vxe-table-column title="Action">
        <template v-slot="{ row }">
          <template v-if="$refs.xTable.isActiveByRow(row)">
            <a-button-group size="small">
              <a-button @click="saveRowEvent(row)">保存</a-button>
              <a-button @click="cancelRowEvent(row)">取消</a-button>
            </a-button-group>
          </template>
          <template v-else>
            <a-button size="small" @click="editRowEvent(row)">编辑</a-button>
          </template>
        </template>
      </vxe-table-column>
    </vxe-table>
  </div>
</template>
<script>
import XEUtils from "xe-utils";
export default {
  data() {
    return {
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

