<template>
  <v-card title="手动触发">
    <defaults />
    <slots />
    <jsxs />
  </v-card>
</template>
<script>
import defaults from "./default";
import slots from "./slot";
import jsxs from "./jsx";

export default {
  components: {
    defaults,
    slots,
    jsxs
  },
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

