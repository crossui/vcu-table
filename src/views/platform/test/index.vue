<template>
  <v-card>
    <v-button @click="$refs.ywTable.exportExcel()">导出</v-button>
    <vcu-table
      :locking="locking"
      :height="ywTableHeight"
      :loadOptions="ywTableLoadOptions"
      :filterFormData="ywTableFilterFormData"
      :footer-method="ywTableFooterMethod"
      :row-class-name="ywTableRowClassName"
      :columns="ywTableColumnSource"
      :cell-style="ywTableCellStyle"
      border
      show-footer
      show-overflow
      show-footer-overflow
      show-header-overflow
      resizable
      filterModalShow
      filterOldColumns
      column-key
      @onPageLoad="ywTableOnPageLoad"
      @onHeaderLoad="ywTableHeaderLoad"
      
      :edit-config="{ trigger: 'manual', mode: 'row', autoClear: false }"
      ref="ywTable"
    ></vcu-table>
  </v-card>
</template>
<script>
import XEUtils from "xe-utils";
import Sortable from "sortablejs";

const tableMergeHeader = (headerColumn = [], nameList = [], flag = "-") => {
  const columns = [...headerColumn]
  const obj = {}
  nameList.map((item) => {
    obj[item.field] = getTableColoumneEmptyItem(item)
  })
  let newColumns = [],
    hasChildenList = []
  columns.map((item) => {
    if ((item.hidden == undefined || !item.hidden) && item.title != "序号") {
      let isPattern = false
      Object.keys(obj).map((key) => {
        if (item.title.includes(`${obj[key].title + flag}`)) {
          let title = item.title.split(flag)[1]
          if (title.includes("(")) {
            title = title.replace(/(\(.*\))/gi, "")
          }
          item.title = title
          obj[key].children.push(item)
          isPattern = true
        }
      })
      isPattern ? "" : newColumns.push(item)
    }
  })
  Object.keys(obj).map((key) => {
    newColumns.splice(obj[key].insertIndex, 0, obj[key])
  })
  return newColumns
}
function getTableColoumneEmptyItem(item) {
  return {
    title: item.title,
    insertIndex: item.insertIndex,
    fixed: "",
    align: "center",
    children: []
  }
}
export default {
  data() {
    return {
      locking: false,
      ywTableHeight: 300,
      ywTableColumnSource: [],
      ywTableFilterFormData:{
        filterFindUrl:"showYjYw"
      },
      ywTableLoadOptions: {
        headUrl: "dataq/api/header/showYjYw", //通用平台表头地址
        pageUrl: "dataq/api/page/showYjYw", //通用平台列表地址
        pageFormData: {},
        customRender: [
          //选择
          {
            key: "NX",
            params: {
              editRender: {
                enabled: true,
              },
              slots: {
                default: ({ row }) => {
                  const isCheck = row.NX == "N" ? false : true
                  return [ <v-checkbox checked={isCheck}></v-checkbox> ]
                },
                edit: ({ row }) => {
                  let isCheck = row.NX == "N" ? false : true
                  return [ <v-checkbox checked={isCheck} onChange={this.ywTableNXChange}></v-checkbox> ]
                }
              }
            },
          },
          //类别
          {
            key: "MZZYBZ",
            params: {
              slots: {
                default: ({ row }) => {
                  const type = row.MZZYBZ == "0" ? "门诊" : "住院"
                  return [ <span>{ type }</span> ]
                },
                edit: ({ row }) => {}
              }
            },
          },
          //自费
          {
            key: "SFZF00",
            params: {
              slots: {
                default: ({ row }) => {
                  const check = row.SFZF00 == "0" ? false : true
                  return [ <v-checkbox checked={check}></v-checkbox> ]
                },
                edit: ({ row }) => {
                  const check = row.SFZF00 == "0" ? false : true
                  return [ <v-checkbox disabled checked={check}></v-checkbox> ]
                }
              }
            },
          },
        ]
      },
    };
  },
  created() {},
  beforeDestroy() {},
  methods: {
    
    ywTableOnPageLoad({ datas, response, count }) {
      /* this.ywTableDatasOld = _.cloneDeep(datas);
      this.ywTableDatas = datas;
      this.ywTableDatas.map(item => {
        if(this.TFCheck) {
          item.NX = "N"
        } else {
          if(item.ZT0000 === "已执行") {
            item.NX = "N"
          } else {
            item.NX = "Y"
          }
        }
      })
      const patternIndex = this.ywTableDatas.findIndex(item => item.YJDJH0 == this.ywTablePositionYJDH)
      if(this.ywTablePositionYJDH && patternIndex != -1) {
        this.ywTableCelClick({
          row: datas[patternIndex],
          $rowIndex: patternIndex,
        })
        setTimeout(()=>{
          this.tablePositionTo("ywTable",patternIndex)
        })
        this.ywTablePositionYJDH = null
      } else {
        this.ywTableCelClick({
          row: datas[0],
          $rowIndex: 0
        })
      } */
    },
    ywTableCellStyle({ row, rowIndex, column, columnIndex }) {
      let _style = {}
      if(column.key == "ZT0000") {
        switch(row.ZT0000) {
          case "申请退费":
          case "未收费":
            _style.color = "blue"
            break;
          case "已执行":
            _style.color = "red"
            break;
        }
      }
      if(column.key == "JZBZ00" && row.JZBZ00 == "Y") {
        _style.background = "red"
      }
      return _style
    },
    ywTableHeaderLoad(column){
      const nameList = [
        {
          field: "kdColumns",
          title: "开单",
          insertIndex: 15,
        },
        {
          field: "zxColumns",
          title: "执行",
          insertIndex: 18,
        },
      ]
      this.ywTableColumnSource = tableMergeHeader(column,nameList,"-")
    },
    ywTableRowClassName({ rowIndex, row }) {
      let className = ""
      if ([this.ywTableCurrIndex].includes(rowIndex)) {
        className += "vcu-current-row ";
      }
      if(row.NX == "Y") {
        className += "pi-table-color__sky "
      }
      if(row.ZT0000 == "已执行" || row.ZT0000 == "已退费") {
        className += "pi-table-color__grey "
      }
      return className
    },
    ywTableFooterMethod({ columns, data, response }) {
      const stats = response && response.data.payload.stats;
      return [
        columns.map((column, columnIndex) => {
          if (XEUtils.has(stats, column.property)) {
            return stats[column.property];
          }
        }),
      ];
    },
  },
};
</script>

<style lang="less" scoped>
</style>