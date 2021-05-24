<template>
  <v-card title="vcu-table-column 文档">
    <v-input-search
      enter-button
      allowClear
      v-model="filterName"
      @search="searchEvent"
      class="mb-10"
      style="width: 400px"
    />
    <vcu-table
      resizable
      auto-resize
      show-header-overflow
      highlight-current-row
      highlight-hover-row
      highlight-current-column
      ref="xTable"
      id="document_api"
      class="api-table"
      row-id="id"
      :cell-class-name="cellClassNameFunc"
      :data="tableData"
      :custom-config="{ storage: true, checkMethod: checkColumnMethod }"
      :tree-config="{ children: 'list', expandRowKeys: defaultExpandRowKeys }"
      :context-menu="{
        header: { options: headerMenus },
        body: { options: bodyMenus },
        visibleMethod: menuVisibleMethod,
      }"
      :tooltip-config="{ contentMethod: showTooltipMethod }"
      @header-cell-context-menu="headerCellContextMenuEvent"
      @cell-context-menu="cellContextMenuEvent"
      @context-menu-click="contextMenuClickEvent"
    >
      <vcu-table-column
        field="name"
        title="属性"
        type="html"
        min-width="280"
        show-overflow
        :filters="nameFilters"
        tree-node
      ></vcu-table-column>
      <vcu-table-column
        field="desc"
        title="说明"
        type="html"
        min-width="200"
      ></vcu-table-column>
      <vcu-table-column
        field="type"
        title="类型 / 返回类型"
        type="html"
        min-width="140"
      ></vcu-table-column>
      <vcu-table-column
        field="enum"
        title="可选值"
        type="html"
        min-width="150"
      ></vcu-table-column>
      <vcu-table-column
        field="defVal"
        title="默认值 / 参数"
        type="html"
        min-width="160"
      ></vcu-table-column>
      <!-- <vcu-table-column field="version" title="兼容性" width="120">
        <template v-slot="{ row }">
          <template v-if="row.version === 'pro'"> pro 专业版 </template>
          <template v-else-if="row.disabled">
            <span class="disabled">已废弃</span>
          </template>
          <template v-else-if="row.abandoned">
            <span class="abandoned">评估阶段</span>
          </template>
          <template v-else>
            <span v-show="row.version" class="compatibility"
              >v{{ row.version }}</span
            >
          </template>
        </template>
      </vcu-table-column> -->
      <template v-slot:empty>
        <span class="red">找不对应 API，请输入正确的关键字！</span>
      </template>
    </vcu-table>
  </v-card>
</template>
<script>
import XEUtils from "xe-utils";
import apis from "./column";
export default {
  data() {
    return {
      filterName: "",
      defaultExpandRowKeys: [],
      tableData: [],
      nameFilters: [
        { label: "Props", value: "Props" },
        { label: "Slots", value: "Slots" },
      ],
      headerMenus: [
        [
          {
            code: "hideColumn",
            name: "隐藏列",
            disabled: false,
          },
          {
            code: "showAllColumn",
            name: "取消所有隐藏列",
          },
          {
            code: "resetColumn",
            name: "重置个性化数据",
          },
        ],
        [
          {
            code: "exportXLSXAPI",
            name: "导出文档.xlsx",
            prefixIcon: "fa fa-download",
          },
        ],
      ],
      bodyMenus: [
        [
          {
            code: "copy",
            name: "app.body.label.copy",
            prefixIcon: "fa fa-copy",
          },
        ],
        [
          {
            code: "resize",
            name: "重新加载",
          },
          {
            code: "exportHTMLAPI",
            name: "导出文档.html",
            prefixIcon: "fa fa-download",
          },
          {
            code: "exportXLSXAPI",
            name: "导出文档.xlsx",
            prefixIcon: "fa fa-download",
          },
        ],
        [
          {
            code: "allExpand",
            name: "全部展开",
          },
          {
            code: "allShrink",
            name: "全部收起",
          },
        ],
      ],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 生成唯一 id
      let index = 1;
      const searchProps = ["name", "desc", "type", "enum", "defVal"];
      this.tableData = XEUtils.clone(apis, true);
      XEUtils.eachTree(
        this.tableData,
        (item) => {
          item.id = index++;
          item.desc = item.descKey ? item.descKey : item.desc;
          searchProps.forEach((key) => {
            item[key] = XEUtils.escape(item[key]);
          });
        },
        { children: "list" }
      );
      // 默认展开一级
      this.defaultExpandRows = this.tableData.filter(
        (item) => item.list && item.list.length
      );
      this.defaultExpandRowKeys = this.defaultExpandRows.map((item) => item.id);
      this.loading = false;
    },
    cellClassNameFunc({ row, column }) {
      return {
        "api-pro": row.version === "pro",
        "api-disabled": row.disabled,
        "api-abandoned": row.abandoned,
        "disabled-line-through": row.disabled && column.property === "name",
      };
    },
    checkColumnMethod({ column }) {
      if (["name", "desc"].includes(column.property)) {
        return false;
      }
      return true;
    },
    showTooltipMethod({ type, row, column }) {
      if (type === "body") {
        if (column.property === "name") {
          if (row.disabled) {
            return "该参数已经被废弃了，除非不打算更新版本，否则不应该被使用";
          } else if (row.abandoned) {
            return "该参数属于评估阶段，谨慎使用，后续有可能会被废弃的风险";
          } else if (row.version === "pro") {
            return "该参数属于 pro 版本功能，开源版本不支持该功能";
          }
        }
      }
      return null;
    },
    headerCellContextMenuEvent({ column }) {
      this.$refs.xTable.setCurrentColumn(column);
    },
    contextMenuClickEvent({ menu, row, column }) {
      const xTable = this.$refs.xTable;
      switch (menu.code) {
        case "hideColumn":
          xTable.hideColumn(column);
          break;
        case "showAllColumn":
          xTable.resetColumn({ visible: true });
          break;
        case "resetColumn":
          xTable.resetColumn(true);
          break;
        case "exportHTMLAPI":
          xTable.exportData({
            type: "html",
            data: XEUtils.toTreeArray(this.tableData, { children: "list" }),
            filename: `vxe-${this.apiName}_v${pack.version}`,
          });
          break;
        case "exportXLSXAPI":
          xTable.exportData({
            type: "xlsx",
            data: XEUtils.toTreeArray(this.tableData, { children: "list" }),
            filename: `vxe-${this.apiName}_v${pack.version}`,
          });
          break;
        case "copy":
          if (row && column) {
            if (XEClipboard.copy(row[column.property])) {
              
            }
          }
          break;
        case "resize":
          this.filterName = "";
          this.tableData = [];
          this.$nextTick(() => {
            xTable.clearAll();
            this.loadList();
          });
          break;
        case "exportAPI":
          xTable.exportData({
            filename: `vxe-${this.apiName}_v${pack.version}.csv`,
          });
          break;
        case "allExpand":
          xTable.setAllTreeExpand(true);
          break;
        case "allShrink":
          xTable.clearTreeExpand();
          break;
      }
    },
    menuVisibleMethod({ options, column }) {
      const isDisabled = !this.checkColumnMethod({ column });
      options.forEach((list) => {
        list.forEach((item) => {
          if (["hideColumn"].includes(item.code)) {
            item.disabled = isDisabled;
          }
        });
      });
      return true;
    },
    cellContextMenuEvent({ row }) {
      this.$refs.xTable.setCurrentRow(row);
    },
    handleSearch() {
      const filterName = XEUtils.toString(this.filterName).trim().toLowerCase();
      if (filterName) {
        const filterRE = new RegExp(filterName, "gi");
        const options = { children: "list" };
        const searchProps = ["name", "desc", "type", "enum", "defVal"];
        const rest = XEUtils.searchTree(
          this.tableData,
          (item) =>
            searchProps.some(
              (key) => item[key].toLowerCase().indexOf(filterName) > -1
            ),
          options
        );
        XEUtils.eachTree(
          rest,
          (item) => {
            searchProps.forEach((key) => {
              item[key] = item[key].replace(
                filterRE,
                (match) => `<span class="keyword-lighten">${match}</span>`
              );
            });
          },
          options
        );
        this.tableData = rest;
        this.$nextTick(() => {
          if (this.$refs.xTable) {
            this.$refs.xTable.setAllTreeExpand(true);
          }
        });
      } else {
        this.tableData = this.tableData;
        this.$nextTick(() => {
          if (this.$refs.xTable) {
            this.$refs.xTable.setTreeExpand(this.defaultExpandRows, true);
          }
        });
      }
    },
    // 调用频率间隔 500 毫秒
    searchEvent: XEUtils.debounce(
      function () {
        this.handleSearch();
      },
      500,
      { leading: false, trailing: true }
    ),
  },
};
</script>

