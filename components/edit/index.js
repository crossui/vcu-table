import Table from '../table'
import mixin from './src/mixin'
import VCUTable from '../v-c-u-table'

export const Edit = {
  install () {
    VCUTable.reg('edit')
    Table.mixins.push(mixin)
  }
}

export default Edit
