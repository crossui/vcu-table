<template>
  <a-card title="行拖拽">
    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          <div><span class="blue-text">sortablejs</span> 等库实现行拖动</div>
          <div class="red-text">必须设置 row-key</div>
        </div>
      </a-alert>
      <vcu-table
        border
        ref="xTable"
        column-key
        :columns="tableColumn"
        :data="tableData"
        :scroll-y="{ enabled: false }"
        class="sortable-row-demo"
      ></vcu-table>
    </div>
  </a-card>
</template>
<script>
import Sortable from "sortablejs";
export default {
  data() {
    return {
      sortable: null,
      tableColumn: [
        {
          align: "center",
          width: 60,
          slots: {
            default: (scope) => {
              return [
                <span class="drag-btn">
                  <i class="iconfont icon-menu"></i>
                </span>,
              ];
            },
          },
        },
        { type: "seq" },
        { field: "name", title: "Name" },
        { field: "sex", title: "Sex" },
        { field: "age", title: "Age" },
        { field: "address", title: "Address" },
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
  created() {
    this.rowDrop();
  },
  beforeDestroy() {
    if (this.sortable) {
      this.sortable.destroy();
    }
  },
  methods: {
    rowDrop() {
      this.$nextTick(() => {
        let xTable = this.$refs.xTable;
        this.sortable = Sortable.create(
          xTable.$el.querySelector(".body--wrapper>.vcu-table--body tbody"),
          {
            handle: ".drag-btn",
            onEnd: ({ newIndex, oldIndex }) => {
              let currRow = this.tableData.splice(oldIndex, 1)[0];
              this.tableData.splice(newIndex, 0, currRow);
            },
          }
        );
      });
    },
  },
};
</script>
<style lang="less" scoped>
.sortable-row-demo .drag-btn {
  cursor: move;
  font-size: 12px;
}
.sortable-row-demo .vcu-body--row.sortable-ghost,
.sortable-row-demo .vcu-body--row.sortable-chosen {
  background-color: #dfecfb;
}
</style>

