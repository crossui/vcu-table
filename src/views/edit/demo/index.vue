<template>
  <a-card title="手动触发">
    <div class="mb-30">
      <div class="mb-5"></div>
      <vxe-table
        ref="xTable"
        :data="tableData"
        :edit-config="{ trigger: 'manual', mode: 'row' }"
      >
        <vxe-table-column type="seq" width="60"></vxe-table-column>
        <vxe-table-column field="name" title="Name" :edit-render="{}">
          <template v-slot:edit="scope">
            <a-input
              size="small"
              v-model="scope.row.name"
              @input="$refs.xTable.updateStatus(scope)"
            ></a-input>
          </template>
        </vxe-table-column>
        <vxe-table-column field="sex" title="Sex"></vxe-table-column>
        <vxe-table-column field="age" title="Age"></vxe-table-column>
        <vxe-table-column field="address" title="Address"></vxe-table-column>
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
  </a-card>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "好好学习天天向上",
        },
        {
          id: 10002,
          name: "Test2",
          role: "Test",
          sex: "Women",
          age: 22,
          address: "Guangzhou",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          age: 32,
          address: "Shanghai",
        },
        {
          id: 10004,
          name: "Test4",
          role: "Designer",
          sex: "Women ",
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
  },
};
</script>

