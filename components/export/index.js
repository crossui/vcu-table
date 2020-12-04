import Table from '../table'
import VXETable from '../v-x-e-table'
import mixin, { handlePrint } from './src/mixin'

function print (options) {
  const opts = Object.assign({}, options, {
    type: 'html'
  })
  handlePrint(null, opts, opts.content)
}

export const Export = {
  install (Vue) {
    VXETable.reg('export')
    VXETable.print = print
    Object.assign(VXETable.types, { csv: 1, html: 1, xml: 1, txt: 1 })
    Table.mixins.push(mixin)
  }
}

export default Export
