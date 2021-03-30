<template>
  <v-card title="列拖拽">
    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          <div><span class="blue-text">sortablejs</span> 等库实现列拖动</div>
          <div class="red-text">必须设置 row-key</div>
        </div>
      </v-alert>

      <vcu-table
        border
        column-key
        ref="xTable"
        :columns="tableColumn"
        :data="tableData"
        :scroll-x="{ enabled: false }"
        class="sortable-column-demo"
      ></vcu-table>
    </div>
  </v-card>
</template>
<script>
import Sortable from "sortablejs";
export default {
  data() {
    return {
      sortable: null,
      tableColumn: [
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
    this.columnDrop();
  },
  beforeDestroy() {
    if (this.sortable) {
      this.sortable.destroy();
    }
  },
  methods: {
    columnDrop() {
      this.$nextTick(() => {
        let xTable = this.$refs.xTable;
        this.sortable = Sortable.create(
          xTable.$el.querySelector(
            ".body--wrapper>.vcu-table--header .vcu-header--row"
          ),
          {
            handle: ".vcu-header--column:not(.col--fixed)",
            onEnd: ({ item, newIndex, oldIndex }) => {
              let { fullColumn, tableColumn } = xTable.getTableColumn();
              let targetThElem = item;
              let wrapperElem = targetThElem.parentNode;
              let newColumn = fullColumn[newIndex];
              if (newColumn.fixed) {
                // 错误的移动
                if (newIndex > oldIndex) {
                  wrapperElem.insertBefore(
                    targetThElem,
                    wrapperElem.children[oldIndex]
                  );
                } else {
                  wrapperElem.insertBefore(
                    wrapperElem.children[oldIndex],
                    targetThElem
                  );
                }
                return this.$XModal.message({
                  message: "固定列不允许拖动！",
                  status: "error",
                });
              }
              // 转换真实索引
              let oldColumnIndex = xTable.getColumnIndex(tableColumn[oldIndex]);
              let newColumnIndex = xTable.getColumnIndex(tableColumn[newIndex]);
              // 移动到目标列
              let currRow = fullColumn.splice(oldColumnIndex, 1)[0];
              fullColumn.splice(newColumnIndex, 0, currRow);
              xTable.loadColumn(fullColumn);
            },
          }
        );
      });
    },
  },
};
</script>

<style lang="less" scoped>
.sortable-column-demo .vcu-header--row .vcu-header--column.sortable-ghost,
.sortable-column-demo .vcu-header--row .vcu-header--column.sortable-chosen {
  background-color: #dfecfb;
}
</style>