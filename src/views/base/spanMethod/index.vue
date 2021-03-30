<template>
  <v-card title="合并行或列">
    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            合并列，通过自定义
            <span class="blue-text">span-method</span> 合并方法
          </div>
          <div>
            可用值<span class="blue-text"
              >{column，columnIndex，items，row，rowIndex，visibleData}等等</span
            >
          </div>
          <div class="red-text">
            （注：span-method
            ，不能用于树形结构、展开行、固定列，合并的逻辑都是自行实现的，该示例仅供参考）
          </div>
        </div>
      </v-alert>
      <vcu-table
        border
        show-footer
        :footer-method="footerMethod"
        :columns="tableColumn"
        :data="tableData"
        :span-method="colspanMethod"
      ></vcu-table>
    </div>

    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">实现横向树列表</div>
      </v-alert>
      <vcu-table
        border
        :scroll-y="{ gt: -1 }"
        :span-method="rowspanMethod1"
        :data="tableData1"
      >
        <vcu-table-column field="name1" title="功能模块">
          <template v-slot="{ row }">
            <v-checkbox
              v-model="row.check1"
              @change="check1ChangeEvent(row, row.check1)"
              >{{ row.name1 }}</v-checkbox
            >
          </template>
        </vcu-table-column>
        <vcu-table-column field="name2" title="详细功能">
          <template v-slot="{ row }">
            <v-checkbox
              v-model="row.check2"
              @change="check2ChangeEvent(row, row.check2)"
              >{{ row.name2 }}</v-checkbox
            >
          </template>
        </vcu-table-column>
        <vcu-table-column field="name3" title="权限类型">
          <template v-slot="{ row }">
            <v-checkbox
              v-model="row.check3"
              @change="check3ChangeEvent(row, row.check3)"
              >{{ row.name3 }}</v-checkbox
            >
          </template>
        </vcu-table-column>
        <vcu-table-column field="name4" title="权限列表">
          <template v-slot="{ row }">
            <v-checkbox
              v-model="row.check4"
              @change="check4ChangeEvent(row, row.check4)"
              >{{ row.name4 }}</v-checkbox
            >
          </template>
        </vcu-table-column>
      </vcu-table>
    </div>

    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            表尾合并列，通过自定义
            <span class="blue-text">footer-span-method</span> 合并方法
          </div>
          <div>
            可用值<span class="blue-text"
              >{column，columnIndex，items，itemIndex，_rowIndex，data}等等</span
            >
          </div>
          <div class="red-text">
            （注：footer-span-method
            不能用于树形结构、展开行、固定列，合并的逻辑都是自行实现的，该示例仅供参考）
          </div>
        </div>
      </v-alert>
      <vcu-table
        border
        show-footer
        :footer-method="footerMethod1"
        :columns="tableColumn"
        :data="tableData"
        :footer-span-method="footerColspanMethod"
      ></vcu-table>
    </div>

    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          单元格与表尾单元格合并，可以通过绑定参数
          <span class="blue-text">merge-cells，merge-footer-items</span>
          或调用函数
          <span class="blue-text">setMergeCells、setMergeFooterItems</span>
          来控制单元格的临时合并状态
        </div>
      </v-alert>
      <v-button-group class="mb-5">
        <v-button @click="handleCellUpdate">更新单元格合并</v-button>
        <v-button @click="handleFooterUpdate">更新表尾单元格合并</v-button>
      </v-button-group>
      <vcu-table
        ref="xTable"
        border
        show-footer
        :footer-method="footerMethod"
        :columns="tableColumn"
        :data="tableData"
        :merge-cells="mergeCells"
        :merge-footer-items="mergeFooterItems"
      ></vcu-table>
    </div>
  </v-card>
</template>
<script>
import XEUtils from "xe-utils";
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
      tableData1: [],
      mergeCells: [
        { row: 0, col: 1, rowspan: 2, colspan: 1 },
        { row: 1, col: 2, rowspan: 0, colspan: 0 },
      ],
      mergeFooterItems: [
        { row: 0, col: 2, rowspan: 1, colspan: 3 },
        { row: 0, col: 3, rowspan: 1, colspan: 0 },
        { row: 0, col: 4, rowspan: 1, colspan: 0 },
      ],
    };
  },
  mounted() {
    const treeData = XEUtils.toArrayTree(this.getList());
    this.toColTreeData(treeData);
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
    colspanMethod({ rowIndex, columnIndex, visibleData }) {
      //合并行
      if (rowIndex % 2 === 0) {
        if (columnIndex === 2) {
          return { rowspan: 1, colspan: 2 };
        } else if (columnIndex === 3) {
          return { rowspan: 0, colspan: 0 };
        }
      }
      //合并列
      if (columnIndex == 1) {
        if (rowIndex == 0) {
          return { rowspan: visibleData.length, colspan: 1 };
        } else {
          return { rowspan: 0, colspan: 0 };
        }
      }
    },

    getList() {
      const list = [
        { id: "10000", parentId: null, name: "账号管理" },
        { id: "11000", parentId: "10000", name: "用户管理" },
        { id: "11100", parentId: "11000", name: "查看" },
        { id: "11110", parentId: "11100", name: "用户列表" },
        { id: "11200", parentId: "11000", name: "编辑" },
        { id: "11210", parentId: "11200", name: "用户列表" },
        { id: "11220", parentId: "11200", name: "新增用户" },
        { id: "11300", parentId: "11000", name: "操作" },
        { id: "11310", parentId: "11300", name: "新增" },
        { id: "11320", parentId: "11300", name: "删除" },
        { id: "11330", parentId: "11300", name: "修改" },
        { id: "12000", parentId: "10000", name: "角色管理" },
        { id: "12100", parentId: "12000", name: "查看" },
        { id: "12110", parentId: "12100", name: "角色列表" },
        { id: "12200", parentId: "12000", name: "编辑" },
        { id: "122100", parentId: "12200", name: "角色列表" },
        { id: "12220", parentId: "12200", name: "新增角色" },
        { id: "12300", parentId: "12000", name: "操作" },
        { id: "12310", parentId: "12300", name: "新增" },
        { id: "12320", parentId: "12300", name: "删除" },
        { id: "12330", parentId: "12300", name: "修改" },
        { id: "20000", parentId: null, name: "个人中心" },
        { id: "21000", parentId: "20000", name: "个性化设置" },
        { id: "21100", parentId: "21000", name: "查看" },
        { id: "21110", parentId: "21100", name: "信息列表" },
        { id: "21200", parentId: "21000", name: "操作" },
        { id: "21210", parentId: "21200", name: "重置信息" },
        { id: "22000", parentId: "20000", name: "账户管理" },
        { id: "22100", parentId: "22000", name: "查看" },
        { id: "22110", parentId: "22100", name: "账户余额" },
        { id: "22120", parentId: "22100", name: "帐变记录" },
      ];
      return list;
    },
    // 将普通树结构转换为横向树列表
    toColTreeData(treeData) {
      const options = { children: "children" };
      const list = [];
      const keyMap = {};
      XEUtils.eachTree(
        treeData,
        (item, index, result, paths, parent) => {
          keyMap[item.id] = item;
          item.keys = parent ? parent.keys.concat([item.id]) : [item.id];
          if (!item.children || !item.children.length) {
            const row = {};
            item.keys.forEach((key, index) => {
              const level = index + 1;
              const obj = keyMap[key];
              row[`check${level}`] = false;
              row[`id${level}`] = obj.id;
              row[`name${level}`] = obj.name;
            });
            list.push(row);
          }
        },
        options
      );
      this.keyMap = keyMap;
      this.tableData1 = list;
    },
    rowspanMethod1({ row, _rowIndex, column, visibleData }) {
      const fields = ["name1", "name2", "name3"];
      const cellValue = XEUtils.get(row, column.property);
      if (cellValue && fields.includes(column.property)) {
        const prevRow = visibleData[_rowIndex - 1];
        let nextRow = visibleData[_rowIndex + 1];
        if (prevRow && XEUtils.get(prevRow, column.property) === cellValue) {
          return { rowspan: 0, colspan: 0 };
        } else {
          let countRowspan = 1;
          while (
            nextRow &&
            XEUtils.get(nextRow, column.property) === cellValue
          ) {
            nextRow = visibleData[++countRowspan + _rowIndex];
          }
          if (countRowspan > 1) {
            return { rowspan: countRowspan, colspan: 1 };
          }
        }
      }
    },
    check1ChangeEvent(row, checked) {
      const { tableData1 } = this;
      let childList = tableData1.filter((item) => item.name1 === row.name1);
      childList.forEach((item) => {
        item.check1 = checked;
      });
      childList = this.tableData1.filter((item) => item.id1 === row.id1);
      childList.forEach((item) => {
        this.check2ChangeEvent(item, checked);
      });
    },
    check2ChangeEvent(row, checked) {
      const { tableData1 } = this;
      let childList = tableData1.filter(
        (item) => item.id1 === row.id1 && item.name2 === row.name2
      );
      childList.forEach((item) => {
        item.check2 = checked;
      });
      childList = this.tableData1.filter((item) => item.id2 === row.id2);
      childList.forEach((item) => {
        this.check3ChangeEvent(item, checked);
      });
    },
    check3ChangeEvent(row, checked) {
      const { tableData1 } = this;
      let childList = tableData1.filter(
        (item) => item.id2 === row.id2 && item.name3 === row.name3
      );
      childList.forEach((item) => {
        item.check3 = checked;
      });
      childList = tableData1.filter((item) => item.id3 === row.id3);
      childList.forEach((item) => {
        this.check4ChangeEvent(item, checked);
      });
    },
    check4ChangeEvent(row, checked) {
      const { tableData1 } = this;
      let childList = tableData1.filter(
        (item) => item.id3 === row.id3 && item.name4 === row.name4
      );
      childList.forEach((item) => {
        item.check4 = checked;
      });
      childList = tableData1.filter((item) => item.id3 === row.id3);
      const isChecked3 = childList.every((item) => item.check4);
      childList.forEach((item) => {
        item.check3 = isChecked3;
      });
      childList = tableData1.filter((item) => item.id2 === row.id2);
      const isChecked2 = childList.every((item) => item.check3);
      childList.forEach((item) => {
        item.check2 = isChecked2;
      });
      childList = tableData1.filter((item) => item.id1 === row.id1);
      const isChecked1 = childList.every((item) => item.check2);
      childList.forEach((item) => {
        item.check1 = isChecked1;
      });
    },

    footerMethod1({ columns, data }) {
      const means = [];
      const sums = [];
      const others = [];
      columns.forEach((column, columnIndex) => {
        if (columnIndex === 0) {
          means.push("平均");
          sums.push("和值");
          others.push("其他");
        } else {
          let meanCell = null;
          let sumCell = null;
          let otherCell = "-";
          switch (column.property) {
            case "age":
              meanCell = parseInt(XEUtils.mean(data, column.property));
              sumCell = XEUtils.sum(data, column.property);
              break;
            case "sex":
              otherCell = "无";
              break;
          }
          means.push(meanCell);
          sums.push(sumCell);
          others.push(otherCell);
        }
      });
      // 返回一个二维数组的表尾合计
      return [means, sums, others];
    },
    footerColspanMethod({ _rowIndex, columnIndex }) {
      if (_rowIndex === 0) {
        if (columnIndex === 2) {
          return { rowspan: 2, colspan: 1 };
        }
      } else if (_rowIndex === 1) {
        if (columnIndex === 2) {
          return { rowspan: 0, colspan: 0 };
        }
      }

      if (columnIndex === 3) {
        return {
          rowspan: 1,
          colspan: 2,
        };
      } else if (columnIndex === 4) {
        return {
          rowspan: 0,
          colspan: 0,
        };
      }
    },
    handleCellUpdate() {
      this.$refs.xTable.setMergeCells([
        { row: 0, col: 2, rowspan: 2, colspan: 1 },
        { row: 1, col: 3, rowspan: 0, colspan: 0 },
      ]);
    },
    handleFooterUpdate() {
      this.$refs.xTable.setMergeFooterItems([
        { row: 0, col: 2, rowspan: 1, colspan: 2 },
        { row: 0, col: 3, rowspan: 1, colspan: 0 },
        { row: 0, col: 4, rowspan: 1, colspan: 1 },
      ]);
    },
  },
};
</script>

