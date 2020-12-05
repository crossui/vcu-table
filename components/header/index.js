import VcuTableHeader from './src/header'

VcuTableHeader.install = function (Vue) {
  Vue.component(VcuTableHeader.name, VcuTableHeader)
}

export const Header = VcuTableHeader
export default VcuTableHeader
