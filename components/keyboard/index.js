import Table from '../table'
import mixin from './src/mixin'
import VCUTable from '../v-c-u-table'

export const Keyboard = {
  install () {
    VCUTable.reg('keyboard')
    Table.mixins.push(mixin)
  }
}

export default Keyboard
