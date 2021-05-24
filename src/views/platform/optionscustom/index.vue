<template>
  <v-card>
    <v-alert type="info" class="mb-10">
      <div slot="message">
        <div>
          调用
          <span class="blue-text"> showOptionColumnModal </span>
          方法，options: <span class="red-text"> tableName </span> 必须传
        </div>
      </div>
    </v-alert>
    <div class="mb-10">
      <v-button @click="handleClick">选项</v-button>
      <v-button @click="$refs.xTable.showFilterModal()">过滤</v-button>
    </div>
    <vcu-table
      border
      resizable
      column-key
      customModalShow
      filterModalShow
      ref="xTable"
      :filterFormData="filterFormData"
      :loadOptions="options"
      :scroll-x="{ enabled: false }"
      class="sortable-column-demo"
    ></vcu-table>
  </v-card>
</template>
<script>
import Sortable from "sortablejs";
export default {
  data() {
    return {
      sortable: null,
      filterFormData: {
        filterFindUrl: "getInHospPatientList4cy",
        operationUrl: "dataq/api/dict/operation", //正式环境不需要
        relationUrl: "dataq/api/dict/relation", //正式环境不需要
        filterFindFormData: {
          deptNo: "14",
        },
      },
      options: {
        headUrl: "dataq/api/header/optionscustomdemo",
        pageUrl: "dataq/api/page/optionscustomdemo",
        headerFormData: {
          ygbh00: 4569,
          zwxm00: "程瑾011",
        },
        pageFormData: {
          limit: 500,
          YPQLDH: "C11520",
          YFBMBH: 2275,
          ygbh00: 4569,
          zwxm00: "程瑾011",
        },
      },
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
    handleClick() {
      this.$refs.xTable.showOptionColumnModal({
        tableName: "optionscustomdemo",
      });
    },
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
              let { collectColumn, tableColumn } = xTable.getTableColumn();
              let targetThElem = item;
              let wrapperElem = targetThElem.parentNode;
              let newColumn = collectColumn[newIndex];
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
                return this.$error({
                  title: "错误",
                  content: "固定列不允许拖动！",
                });
              }
              // 转换真实索引
              let oldColumnIndex = xTable.getColumnIndex(tableColumn[oldIndex]);
              let newColumnIndex = xTable.getColumnIndex(tableColumn[newIndex]);
              // 移动到目标列
              let currRow = collectColumn.splice(oldColumnIndex, 1)[0];
              collectColumn.splice(newColumnIndex, 0, currRow);
              xTable.loadColumn(collectColumn);
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