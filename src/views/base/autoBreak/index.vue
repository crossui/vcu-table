<template>
  <v-card title="自动换行">
    <vcu-table :data="tableData">
      <vcu-table-column type="seq" width="60"></vcu-table-column>
      <vcu-table-column field="name" title="Name"></vcu-table-column>
      <vcu-table-column field="sex" title="Sex"></vcu-table-column>
      <vcu-table-column field="age" title="Age"></vcu-table-column>
      <vcu-table-column field="address" title="address"></vcu-table-column>
    </vcu-table>
  </v-card>
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
          address:
            "好好学习天天向上好好学习天天向上好好学习天天向上好好学习天天向上好好学习天天向上好好学习天天向上好好学习天天向上好好学习天天向上好好学习天天向上好好学习天天向上好好学习天天向上好好学习天天向上好好学习天天向上",
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
          sex:
            "ManManManManManManManManManManManManManManManManManManManManManManManManManManManManManManManManManManManManManManManManManManManMan",
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

