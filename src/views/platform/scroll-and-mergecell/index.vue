<template>
  <v-card title="虚拟滚动+合并单元格">
    <v-alert type="info" class="mb-10">
      <div slot="message">
        <div>
          虚拟渲染与单元格合并，可以通过设置参数 <span class="blue-text">merge-cells</span> 或调用函数 <span class="blue-text">setMergeCells</span> 来控制单元格的临时合并状态
        </div>
        <div class="red-text">
          注意：合并数据属于临时行为，例如：操作数据源、显示隐藏列、固定列...等操作都会导致合并状态被取消
        </div>
      </div>
    </v-alert>
    <div class="mb-5">
      <v-button-group>
        <v-button @click="$refs.table.showColumnModal()">列选择</v-button>
        <v-button @click="$refs.table.operateRestore()">还 原</v-button>
      </v-button-group>
    </div>
    <vcu-table
      :checkbox-config="{
        checkField: 'checked',
        trigger: 'row',
        highlight: true,
      }"
      :footer-method="footerMethod"
      :height="500"
      :loadOptions="tableOptions"
      :row-class-name="rowClassName"
      @onPageLoad="onPageLoad"
      @onChangeColumns="onChangeColumns"
      filterModalShow
      ref="table"
      resizable
      show-footer
      show-overflow
      border
      customModalShow
    ></vcu-table>
  </v-card>
</template>
<script>
import XEUtils from "xe-utils";

const colMergeCells = ({
  datas = [],
  columns = [],
  fields = [],
  type = true,
}) => {
  if (type) {
    //新方案
    if (datas.length && columns.length && fields.length) {
      let mergeCells = [];
      let _fields = [];
      const mergeCellsFun = (rowIndex, index, num) => {
        mergeCells.push({
          row: rowIndex,
          col: index,
          rowspan: num,
          colspan: 1,
        });
      };
      XEUtils.arrayEach(columns, (item, index) => {
        if (
          XEUtils.findLastIndexOf(
            fields,
            (fieldItem) => fieldItem === item.property
          ) > -1
        ) {
          _fields.push({
            property: item.property,
            index,
          });
        }
      });
      XEUtils.arrayEach(_fields, (field, fieldIndex) => {
        let num = 1;
        let rowIndex = 0;
        XEUtils.arrayEach(datas, (data, dataIndex) => {
          if (datas[dataIndex + 1]) {
            if (data[field.property] === datas[dataIndex + 1][field.property]) {
              num++;
            } else {
              mergeCellsFun(rowIndex, field.index, num);
              rowIndex = dataIndex + 1;
              num = 1;
            }
          } else {
            mergeCellsFun(rowIndex, field.index, num);
          }
        });
      });
      return mergeCells;
    } else {
      return [];
    }
  } else {
    //旧方案 （直接操作数据）
    if (datas.length) {
      let data = _.concat(datas, []);
      for (let j = 0; j < key.length; j++) {
        let num = 1;
        let RowSpan = `${key[j]}RowSpan`;
        let oldNum = 0;
        let oldIndex = [oldNum];
        let newIndex = [];

        for (let i = 0; i < data.length; i++) {
          if (data[i + 1] && data[i][key[j]] === data[i + 1][key[j]]) {
            num++;
          } else {
            newIndex.push(num);
            oldIndex.push((oldNum += num));
            num = 1;
          }
        }
        for (let i = 0; i < data.length; i++) {
          data[i][RowSpan] = 0;
        }
        for (let i = 0; i < oldIndex.length - 1; i++) {
          data[oldIndex[i]][RowSpan] = newIndex[i];
        }
      }
      return data;
    } else {
      return [];
    }
  }
};

export default {
  data() {
    return {
      tableDatas: null,
      tableOptions: {
        headUrl: "colspan/datas/header",
        pageUrl: "colspan/datas/page",
        checkbox: true,
        seq: true,
        filters: true,
        customRender: [
          {
            key: "JCBZ00",
            params: {
              slots: {
                default: ({ row }) => {
                  return [
                    <v-checkbox
                      disabled
                      checked={row.JCBZ00 == "Y"}
                    ></v-checkbox>,
                  ];
                },
              },
            },
          },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    onChangeColumns() {
      this.handleMergeCells(this.tableDatas);
    },
    onPageLoad({ count, datas, response }) {
      this.tableDatas = datas;
      this.handleMergeCells(datas);
    },
    handleMergeCells(datas) {
      let _colMergeCells = colMergeCells({
        datas,
        columns: this.$refs.table.getColumns(),
        fields: ["SQKS00", "BRXM00"],
      });
      this.$refs.table.setMergeCells(_colMergeCells);
    },
    // 合计栏
    footerMethod({ columns, data, response }) {
      const stats = response && response.data.payload.stats;
      return [
        columns.map((column, columnIndex) => {
          if (columnIndex === 1) {
            return "合计";
          } else if (columnIndex === 2) {
            return data.length;
          } else if (column.property == "CH0000") {
            return "人数";
          } else if (XEUtils.has(stats, column.property)) {
            return stats[column.property];
          }
          return null;
        }),
      ];
    },
    // 单元格样式
    rowClassName({ row }) {
      if (row["JCBZ00"] == "Y") {
        return "bg-green";
      }
    },
  },
};
</script>

