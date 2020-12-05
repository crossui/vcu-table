import Table from '../table'
import VCUTable from '../v-c-u-table'
import Panel from './src/panel'
import mixin from './src/mixin'

Panel.install = function (Vue) {
  VCUTable.reg('menu')
  Table.mixins.push(mixin)
  Vue.component(Panel.name, Panel)
}

export const Menu = Panel
export default Panel
