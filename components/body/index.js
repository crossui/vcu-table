import VcuTableBody from './src/body'

VcuTableBody.install = function (Vue) {
  Vue.component(VcuTableBody.name, VcuTableBody)
}

export const Body = VcuTableBody
export default VcuTableBody
