export default {
  components: {},
  props: {},
  mixins: [],
  watch: {},
  computed: {},
  data() {
    return {
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 获取表格数据
    async getTableData(tableParams) {
      this.tableOptions.pageFormData = {
        ...this.tableOptions.pageFormData,
        ...tableParams
      } 
      await this.$refs.table.getTableListData()
    },
    // 点击单元格事件
    onCellClick({ row, $rowIndex }) {
      this.currentIndex = $rowIndex
      this.currentRowData = row
      // console.log("onCellClick单元格点击事件", this.currentIndex, this.currentRowData)
    },
    async insertEvent(rowData) {
      let table = this.$refs.table
      let { row: newRow,rows: rows  } = await table.insertAt(rowData, -1)
      this.currentRowData = newRow
      this.currentIndex = this.$refs.table.tableData.length - 1
      await table.setCurrentRow(newRow)
    },
    setCurrentRow({row, rowIndex=0 }) {
      if (rowIndex === undefined && !row) return
      if (rowIndex === undefined) {
        rowIndex = this.$refs.table.getRowIndex(row)
      }
      if (!row) {
        row = this.$refs.table.getData(rowIndex)
      }
      // /如果有滚动条，则滚动到对应的行（对于某些特定的场景可能会用到，比如定位到某一行）
      this.$refs.table.scrollToRow(row)
      this.currentRowData = row
      this.currentIndex = rowIndex
      // 用于 highlight-current-row，设置某一行为高亮状态
      this.$refs.table.setCurrentRow(row)
    },
    // 触发当前激活的单元格
    async setActiveCell({ row, cellName}){
      if (row) {
        await this.$refs.table.setActiveCell(row, cellName)
      }
    },
    // 表格数据
    getTableList(){
      return this.$refs.table.tableData
    },
    // 删除某行
    async removeRow(rowData){
      await this.$refs.table.remove(rowData)
    },
    // 获取表格增删改数据
    getTableRecordset(){
      return this.$refs.table.getRecordset()
    },
    // 用于 type=checkbox，获取已选中的行数据
    getCheckData() {
      return this.$refs.table.getCheckboxRecords()
    },
    // 设置数据全选中
    setAllCheckboxRow(){
      return this.$refs.table.setAllCheckboxRow(true)
    },
    // 全选取消
    clearCheckboxRow(){
      return this.$refs.table.clearCheckboxRow()
    },
    // 重置表格
    resetTable() {
      return this.$refs.table.loadData()
    },
    // 过滤
    tableFilter(){
      this.$refs.table.showFilterModal()
    },
    //还原
    tableRestore(){
      this.$refs.table.operateRestore()
    }
  },
  activated() {},
  deactivated() {}
}
