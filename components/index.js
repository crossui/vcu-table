//import XEUtils from 'xe-utils/ctor'
import Table from './table'
import Column from './column'
import Header from './header'
import Footer from './footer'
/*import Filter from './filter'
import Loading from './loading'
import Keyboard from './keyboard'
import Validator from './validator'
import Resize from './resize' */



// 按需加载的组件
const components = [
  // 模块
  Column,
  Header,
  Footer,
  //Filter,

  // 核心
  Table
]

// 默认安装
function install(Vue, options) {
  components.map(component => {
    Vue.component(component.name, component)
  })
}


export default install
