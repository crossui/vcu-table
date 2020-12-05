import VcuTooltip from './src/tooltip'
import VCUTable from '../v-c-u-table'

VcuTooltip.install = function (Vue) {
  VCUTable._tooltip = 1
  Vue.component(VcuTooltip.name, VcuTooltip)
}

export const Tooltip = VcuTooltip
export default VcuTooltip
