import VcuTableFooter from './src/footer'

VcuTableFooter.install = function (Vue) {
  Vue.component(VcuTableFooter.name, VcuTableFooter)
}

export const Footer = VcuTableFooter
export default VcuTableFooter
