<template>
  <v-card title="Tab 页签切换">
    <v-alert type="info" class="mb-10">
      <div slot="message">
        <div>
          Tab
          页签切换（如果需要将表格放到隐藏的元素中，那么就必然会导致宽度无法计算），有以下方法解决
        </div>
        <div>
          1.每次切换 Tab 页显示之后手动调用
          <span class="blue-text">recalculate</span> 重新计算表格
        </div>
        <div>
          2.使用
          <span class="blue-text">sync-resize</span>
          绑定指定的变量来触发重新计算表格
        </div>
        <div>
          3.使用
          <span class="blue-text">auto-resize</span>
          自动监听父容器来触发重新计算表格
        </div>
      </div>
    </v-alert>

    <v-tabs default-active-key="1">
      <v-tab-pane key="1" tab="Tab 1"
        ><vcu-table :columns="tableColumn" :data="tableData"></vcu-table
      ></v-tab-pane>
      <v-tab-pane key="2" tab="Tab 2" force-render>
        <vcu-table :columns="tableColumn" :data="tableData"></vcu-table>
      </v-tab-pane>
      <v-tab-pane key="3" tab="Tab 3">
        <vcu-table :columns="tableColumn" :data="tableData"></vcu-table>
      </v-tab-pane>
    </v-tabs>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      tableColumn: [
        { type: "seq", width: 50 },
        { field: "name", title: "Name" },
        { field: "sex", title: "Sex", showHeaderOverflow: true },
        { field: "address", title: "Address", showOverflow: true },
      ],
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
    };
  },
};
</script>

