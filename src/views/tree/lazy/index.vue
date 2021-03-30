<template>
  <v-card title="懒加载">
    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            树表格的懒加载，通过配置 <span class="blue-text"> row-id </span> 和
            <span class="blue-text"> tree-config={lazy, loadMethod} </span>
            加载方法来开启树形懒加载
          </div>
          <div>
            当启用懒加载后，必须通过
            <span class="blue-text"> hasChild </span>
            属性来标识是否存在子节点，从而控制该节点是否允许被点击
          </div>
          <div class="red-text">
            （注：懒加载启用后一次只允许异步加载一层根节点）
          </div>
        </div>
      </v-alert>
      <vcu-table
        ref="xTree"
        row-id="id"
        :tree-config="{
          lazy: true,
          children: 'children',
          hasChild: 'hasChild',
          loadMethod: loadChildrenMethod,
        }"
        :context-menu="{ body: { options: bodyMenus }, visibleMethod }"
        :columns="tableColumn"
        :data="tableData"
        max-height="400"
        @context-menu-click="contextMenuClickEvent"
      >
      </vcu-table>
    </div>
  </v-card>
</template>
<script>
import XEUtils from "xe-utils";
import datas from "../data.js";
export default {
  data() {
    return {
      tableColumn: [
        { type: "seq", width: 160, treeNode: true, title: "Number" },
        { field: "name", title: "Name" },
        { field: "size", title: "Size" },
        { field: "date", title: "Date" },
      ],
      tableData: [],
      bodyMenus: [
        [
          {
            code: "clearLoaded",
            name: "清除加载状态",
            disabled: false,
          },
          {
            code: "reloadNodes",
            name: "重新加载子节点",
            disabled: false,
          },
          {
            code: "expand",
            name: "展开节点",
            disabled: false,
          },
          {
            code: "contract",
            name: "收起节点",
            disabled: false,
          },
        ],
      ],
    };
  },
  mounted() {
    XEUtils.arrayEach(datas, (item, key) => {
      let _item = { ...item };
      _item.children = null;
      this.tableData.push(_item);
    });
  },
  methods: {
    loadChildrenMethod({ row }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          let currRow = XEUtils.filterTree(
            datas,
            (item) => {
              return item.id == row.id;
            },
            {
              children: "children",
            }
          );
          let list = [];
          XEUtils.arrayEach(currRow[0].children, (item, key) => {
            let _item = { ...item };
            _item.children = null;
            list.push(_item);
          });
          resolve(list);
        }, 1000);
      });
    },
    visibleMethod({ row, type }) {
      let xTree = this.$refs.xTree;
      if (type === "body") {
        this.bodyMenus.forEach((list) => {
          list.forEach((item) => {
            if (["clearLoaded", "reloadNodes"].includes(item.code)) {
              item.disabled = !row.hasChild || !xTree.isTreeExpandLoaded(row);
            } else if (["expand", "contract"].includes(item.code)) {
              if (row.hasChild) {
                let isExpand = xTree.isTreeExpandByRow(row);
                item.disabled = ["expand"].includes(item.code)
                  ? isExpand
                  : !isExpand;
              } else {
                item.disabled = true;
              }
            }
          });
        });
      }
      return true;
    },
    contextMenuClickEvent({ menu, row, column }) {
      let xTree = this.$refs.xTree;
      switch (menu.code) {
        case "clearLoaded":
          xTree.clearTreeExpandLoaded(row);
          break;
        case "reloadNodes":
          xTree.reloadTreeChilds(row);
          break;
        case "expand":
          xTree.setTreeExpand(row, true);
          break;
        case "contract":
          xTree.setTreeExpand(row, false);
          break;
      }
    },
  },
};
</script>

