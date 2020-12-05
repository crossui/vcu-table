import Table from '../table'
import VCUTable from '../v-c-u-table'
import mixin, { handlePrint } from './src/mixin'

function print (options) {
  const opts = Object.assign({}, options, {
    type: 'html'
  })
  handlePrint(null, opts, opts.content)
}

export const Export = {
  install (Vue) {
    VCUTable.reg('export')
    VCUTable.print = print
    Object.assign(VCUTable.types, { csv: 1, html: 1, xml: 1, txt: 1 })
    Table.mixins.push(mixin)
  }
}

export default Export
