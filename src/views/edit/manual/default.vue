<template>
  <div class="mb-30">
    <a-alert type="info" class="mb-10">
      <div slot="message">
        <div>
          设置
          <span class="blue-text">
            edit-config={trigger: 'manual', mode: 'row'}
          </span>
          启用行编辑的功能，还可以配合
          <span class="blue-text">revertData</span> 函数实现取消就还原数据
        </div>
        <div>
          配置
          <span class="blue-text">
            edit-render={name: 'input|textarea|select'}
          </span>
          渲染器名称
        </div>
        <div>
          可以通过
          <span class="blue-text"> edit-render={autoselect:true} </span>
          开启默认选中 <span class="red-text">（第三方组件暂不支持）</span>
        </div>
        <div><span class="red-text">（此方式不推荐使用）</span></div>
      </div>
    </a-alert>
    <vcu-table
      ref="xTable"
      :data="tableData"
      :edit-config="{ trigger: 'manual', mode: 'row' }"
    >
      <vcu-table-column type="seq" width="60"></vcu-table-column>
      <vcu-table-column
        field="name"
        title="Name"
        :edit-render="{
          name: 'input',
          autoselect: true,
        }"
      ></vcu-table-column>
      <vcu-table-column
        field="sex"
        title="Sex"
        :edit-render="{ name: 'select', options: sexList }"
      ></vcu-table-column>
      <vcu-table-column
        field="age"
        title="Age"
        :edit-render="{
          name: 'input',
          immediate: true,
          attrs: { type: 'number' },
        }"
      ></vcu-table-column>
      <vcu-table-column
        field="address"
        title="Address"
        :edit-render="{
          name: 'textarea',
        }"
      ></vcu-table-column>
      <vcu-table-column title="Action">
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
      </vcu-table-column>
    </vcu-table>
  </div>
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

