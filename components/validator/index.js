import Table from '../table'
import mixin from './src/mixin'
import VCUTable from '../v-c-u-table'

export const Validator = {
  install () {
    VCUTable.reg('valid')
    Table.mixins.push(mixin)
  }
}

export default Validator
