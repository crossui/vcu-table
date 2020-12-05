import VcuTable from './src/table'
import VCUTable from '../v-c-u-table'

VcuTable.install = function (Vue) {
  if (typeof window !== 'undefined' && window.VCUTableMixin) {
    VcuTable.mixins.push(window.VCUTableMixin)
    delete window.VCUTableMixin
  }
  VCUTable.Vue = Vue
  VCUTable.Table = VcuTable
  if (!Vue.prototype.$vcu) {
    Vue.prototype.$vcu = { t: VCUTable.t }
  } else {
    Vue.prototype.$vcu.t = VCUTable.t
  }
  Vue.component(VcuTable.name, VcuTable)
}

export const Table = VcuTable
export default VcuTable
