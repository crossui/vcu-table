<template>
  <v-card title="键盘移动高亮行">
    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          键盘移动高亮行，设置
          <span class="blue-text">keyboard-config={isArrow: true}</span>
          启用方向键功能
        </div>
      </v-alert>
      <vcu-table
        highlight-current-row
        :columns="tableColumn"
        :data="tableData"
        :keyboard-config="{ isArrow: true }"
      ></vcu-table>
    </div>
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

