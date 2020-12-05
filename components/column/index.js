import VcuTableColumn from './src/column'

VcuTableColumn.install = function (Vue) {
  Vue.component(VcuTableColumn.name, VcuTableColumn)
}

export const Column = VcuTableColumn
export default VcuTableColumn
