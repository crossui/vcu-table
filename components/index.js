import XEUtils from 'xe-utils/ctor'
import VCUTable from './v-c-u-table'
import Table from './table'
import Column from './column'
import Header from './header'
import Footer from './footer'
import Filter from './filter'
import Menu from './menu'
import Tooltip from './tooltip'


import Edit from './edit'
import Export from './export'
import Keyboard from './keyboard'
import Validator from './validator'
import zhCN from './locale/lang/zh-CN'

import _ from "lodash";

// 按需加载的组件
const components = [
  // 模块
  Column,
  Header,
  Footer,
  Filter,
  Menu,
  Tooltip,

  Edit,
  Export,
  Keyboard,
  Validator,
  // 核心
  Table
]

// 默认安装
function install(Vue, options) {
  if (XEUtils.isPlainObject(options)) {
    VCUTable.setup(options)
  }
  components.map(component => component.install(Vue))
}

// 默认中文
VCUTable.setup({
  i18n: key => XEUtils.get(zhCN, key)
})

VCUTable.install = install

if (typeof window !== 'undefined' && window.Vue && window.Vue.use) {
  window.Vue.use(VCUTable)
}

export default VCUTable
