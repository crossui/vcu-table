<template>
  <a-card title="右键快捷菜单">
    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            右键快捷菜单配置项
            <span class="blue-text"
              >context-menu={header,body,footer,trigger,visibleMethod,className}</span
            >
          </div>
        </div>
      </a-alert>
      <vxe-table
        ref="xTable"
        border
        resizable
        show-footer
        highlight-current-row
        highlight-current-column
        :footer-method="footerMethod"
        :columns="tableColumn"
        :data="tableData"
        :context-menu="tableMenu"
        @header-cell-context-menu="headerCellContextMenuEvent"
        @cell-context-menu="cellContextMenuEvent"
        @context-menu-click="contextMenuClickEvent"
      ></vxe-table>
      <a-alert type="success" class="mt-10">
        <div slot="message">
          <div>
            <p>| Arrow Up ↑ | 移动到上一个菜单选项 |</p>
            <p>| Arrow Down ↓ | 移动到下一个菜单选项 |</p>
            <p>| Arrow Left ← | 关闭二级菜单 |</p>
            <p>| Arrow Right → | 打开二级菜单 |</p>
            <p>| Esc | 关闭菜单选项 |</p>
            <p>| Enter | 选中当前菜单选项 |</p>
            <p>| Spacebar | 选中当前菜单选项 |</p>
          </div>
        </div>
      </a-alert>
    </div>
  </a-card>
</template>
<script>
import XEClipboard from "xe-clipboard";
export default {
  data() {
    return {
      tableColumn: [
        { type: "seq", width: 50 },
        { field: "name", title: "Name" },
        { field: "sex", title: "Sex", showHeaderOverflow: true },
        { field: "age", title: "Age", showHeaderOverflow: true },
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
      tableMenu: {
        className: "my-menus",
        header: {
          options: [[{ code: "exportAll", name: "导出所有.csv" }]],
        },
        body: {
          options: [
            [
              {
                code: "details",
                name: "查看详情",
                prefixIcon: "iconfont icon-detail",
                visible: true,
                disabled: false,
              },
            ],
            [
              {
                code: "copy",
                name: "复制",
                prefixIcon: "iconfont icon-file-copy",
                className: "my-copy-item",
              },
            ],
            [
              {
                code: "remove",
                name: "删除",
                prefixIcon: "iconfont icon-delete red-text",
              },
              {
                code: "filter",
                name: "筛选",
                prefixIcon: "iconfont icon-filter",
                children: [
                  { code: "clearFilter", name: "清除筛选" },
                  { code: "filterSelect", name: "按所选单元格的值筛选" },
                ],
              },
              {
                code: "sort",
                name: "排序",
                prefixIcon: "iconfont icon-sort blue-text",
                children: [
                  {
                    code: "clearSort",
                    name: "清除排序",
                    prefixIcon: "iconfont icon-clear",
                  },
                  {
                    code: "sortAsc",
                    name: "升序",
                    prefixIcon: "iconfont icon-sort-descending",
                  },
                  {
                    code: "sortDesc",
                    name: "倒序",
                    prefixIcon: "iconfont icon-sort-ascending",
                  },
                ],
              },
              { code: "print", name: "打印", disabled: true },
            ],
          ],
        },
        footer: {
          options: [[{ code: "clearAll", name: "清空数据" }]],
        },
        visibleMethod: this.visibleMethod,
      },
    };
  },
  methods: {
    footerMethod({ columns, data }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex === 0) {
            return "合计";
          }
          if (["name"].includes(column.property)) {
            return data.length;
          }
          return null;
        }),
      ];
      return footerData;
    },
    contextMenuClickEvent({ menu, row, column }) {
      switch (menu.code) {
        case "copy":
          // 示例
          if (row && column) {
            if (XEClipboard.copy(row[column.property])) {
              this.$success({
                title: "提示",
                content: "已复制到剪贴板！",
              });
            }
          }
          break;
        default:
          this.$message.info(`点击了 ${menu.name} 选项`);
      }
    },
    headerCellContextMenuEvent({ column }) {
      this.$refs.xTable.setCurrentColumn(column);
    },
    cellContextMenuEvent({ row }) {
      this.$refs.xTable.setCurrentRow(row);
    },
    visibleMethod({ options, column }) {
      // 示例：只有 name 列允许操作，清除按钮只能在 age 才显示
      // 显示之前处理按钮的操作权限
      const isDisabled = !column || column.property !== "name";
      const isVisible = column && column.property === "age";
      options.forEach((list) => {
        list.forEach((item) => {
          if (["copy", "remove"].includes(item.code)) {
            item.disabled = isDisabled;
          }
          if (["details"].includes(item.code)) {
            item.visible = column.property === "name";
          } else if (["clear", "filter"].includes(item.code)) {
            item.visible = isVisible;
          }
        });
      });
      return true;
    },
  },
};
</script>

