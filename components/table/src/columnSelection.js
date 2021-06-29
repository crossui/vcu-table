import XEUtils from 'xe-utils'
import { UtilTools } from '../../tools'
import GlobalConfig from '../../conf'


function renderCustoms(h, _vm) {
  const { columns, customStore } = _vm
  const cols = []
  XEUtils.eachTree(columns, (column) => {
    const colTitle = UtilTools.formatText(column.getTitle(), 1)
    const colKey = column.getKey()
    const isColGroup = column.children && column.children.length
    if (isColGroup || colKey) {
      cols.push(
        h('li', {
          class: ['vcu-custom--option', `level--${column.level}`, {
            'is--group': isColGroup,
            'is--checked': column.visible,
            'is--indeterminate': column.halfVisible,
          }],
          attrs: {
            title: colTitle
          },
          on: {
            click: () => {
              _vm.onChange(column)
            }
          }
        }, [
          h('span', {
            class: 'vcu-checkbox--icon vcu-checkbox--checked-icon'
          }),
          h('span', {
            class: 'vcu-checkbox--icon vcu-checkbox--unchecked-icon'
          }),
          h('span', {
            class: 'vcu-checkbox--icon vcu-checkbox--indeterminate-icon'
          }),
          h('span', {
            class: 'vcu-checkbox--label'
          }, colTitle)
        ])
      )
    }
  })

  return h('div', {
    class: ['vcu-custom--wrapper', {
      'is--active': true
    }],
    ref: 'customWrapper'
  }, [
    h('div', {
      class: 'vcu-custom--option-wrapper'
    }, [
      h('ul', {
        class: 'vcu-custom--header'
      }, [
        h('li', {
          class: ['vcu-custom--option', {
            'is--checked': customStore.isAll,
            'is--indeterminate': customStore.isIndeterminate
          }],
          on: {
            click: _vm.allCustomEvent
          }
        }, [
          h('span', {
            class: 'vcu-checkbox--icon vcu-checkbox--checked-icon'
          }),
          h('span', {
            class: 'vcu-checkbox--icon vcu-checkbox--unchecked-icon'
          }),
          h('span', {
            class: 'vcu-checkbox--icon vcu-checkbox--indeterminate-icon'
          }),
          h('span', {
            class: 'vcu-checkbox--label'
          }, "全部")
        ])
      ]),
      h('ul', {
        class: 'vcu-custom--body',
      }, cols)
    ])
  ])
}


export default {
  props: {
    value: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: "default"
    },
  },
  watch: {
    value(val) {
      this.visible = val;
    },
  },
  computed: {

  },
  data() {
    return {
      $xetable: null,
      visible: false,
      customStore: {
        isAll: false,
        isIndeterminate: false,
        visible: false
      },
      optionsCustom: false,
      saveCurrSet: false,
      saveHeaderSetUrl: "",
      saveFormData: null,
      columns: []
    };
  },
  render(h) {
    const {
      visible,
      handleSubmit,
      resetCustomEvent,
      optionsCustom,
      onChangeCheckbox,
      size
    } = this;

    const modalProps = {
      ref: 'columnSelectionModalDom',
      props: {
        bodyStyle: {
          "padding": "0px"
        },
        visible: visible,
        title: "请选择列",
        maskClosable: false,
        destroyOnClose: true,
        wrapClassName: "columnSelection-modal",
      },
      attrs: {},
      on: {
        cancel: resetCustomEvent
      }
    }


    return (<v-modal {...modalProps}>
      <div class="clearfix" slot="footer">
        <div class="fl">
          {
            !optionsCustom
              ?
              <v-button key="reset" size={size} onClick={resetCustomEvent}>还原</v-button>
              :
              <v-checkbox onChange={onChangeCheckbox}>保存当前设置</v-checkbox>
          }

        </div>
        <div class="fr">
          <v-button key="back" size={size} onClick={resetCustomEvent}>取消</v-button>
          <v-button key="submit" type="primary" size={size} onClick={handleSubmit}>保存</v-button>
        </div>
      </div>
      {renderCustoms(h, this)}
    </v-modal>)
  },
  mounted() {

  },
  methods: {
    syncUpdate(params) {
      const { collectColumn, $table, optionsCustom = false, saveHeaderSetUrl = "", formData } = params
      this.$xetable = $table
      this.optionsCustom = optionsCustom
      this.saveHeaderSetUrl = saveHeaderSetUrl
      this.saveFormData = formData
      this.columns = XEUtils.filter(collectColumn, item => !XEUtils.includes(["seq", "radio", "checkbox"], item.type))
      this.checkCustomStatus()
    },
    async saveCurrSetRequest() {
      let params = XEUtils.merge({}, this.saveFormData)
      let headerList = XEUtils.mapTree(this.columns, (item, index) => {
        let col = {
          sequence: index,
          hidden: !item.visible,
          title: item.title,
          width: item.resizeWidth == 0 ? item.width : item.resizeWidth.toString(),
          key: item.key
        }
        return col;
      })
      headerList = XEUtils.toTreeArray(headerList)
      params.headerList = JSON.stringify(headerList)
      let res = await GlobalConfig.request({
        method: "POST",
        url: this.saveHeaderSetUrl,
        data: params
      });
      return res;
    },
    async handleSubmit() {
      const { columns } = this
      const _c = XEUtils.filterTree(columns, item => item.visible === true)
      if (!_c.length) {
        let modalRes = await UtilTools.showConfirmModal({ content: "您未选择一个列，继续吗？" })
        if (!modalRes) return false;
      }
      if (this.saveCurrSet) {
        if (this.saveFormData == null || !this.saveFormData.tableName || this.saveFormData.tableName == "") {
          console.error("缺少入参参数'tableName'")
          return;
        }
        let res = await this.saveCurrSetRequest()
        if (!res) {
          this.$message.error("保存失败！！！")
          return;
        }
      }

      this.handleCustoms()
      this.$emit("onChangeColumns", this.columns)
      this.handleCancel()
    },
    handleCancel() {
      this.visible = false;
      this.saveCurrSet = false;
      this.$emit("input", this.visible);
    },
    onChange(column) {
      const isChecked = !column.visible
      XEUtils.eachTree([column], (item) => {
        item.visible = isChecked
        item.halfVisible = false
      })
      this.handleOptionCheck(column)
      this.checkCustomStatus()
    },
    onChangeCheckbox(e) {
      this.saveCurrSet = e.target.checked
    },
    allCustomEvent() {
      const { $xetable, columns, customStore } = this
      const checkMethod = $xetable.customOpts.checkMethod
      const isAll = !customStore.isAll
      XEUtils.eachTree(columns, column => {
        if (!checkMethod || checkMethod({ column })) {
          column.visible = isAll
          column.halfVisible = false
        }
      })
      customStore.isAll = isAll
      this.checkCustomStatus()
    },
    handleOptionCheck(column) {
      const matchObj = XEUtils.findTree(this.columns, item => item === column)
      if (matchObj && matchObj.parent) {
        const { parent } = matchObj
        if (parent.children && parent.children.length) {
          parent.visible = parent.children.every(column => column.visible)
          parent.halfVisible = !parent.visible && parent.children.some(column => column.visible || column.halfVisible)
          this.handleOptionCheck(parent)
        }
      }
    },
    handleCustoms() {
      const { $xetable } = this
      $xetable.saveCustomVisible()
      $xetable.analyColumnWidth()
      $xetable.refreshColumn()
    },
    checkCustomStatus() {
      const { $xetable, columns } = this
      const checkMethod = $xetable.customOpts.checkMethod
      this.customStore.isAll = columns.every(column => (checkMethod ? !checkMethod({ column }) : false) || column.visible)
      this.customStore.isIndeterminate = !this.customStore.isAll && columns.some(column => (!checkMethod || checkMethod({ column })) && (column.visible || column.halfVisible))
      this.$forceUpdate()
    },
    resetCustomEvent() {
      const { $xetable, columns } = this
      const checkMethod = $xetable.customOpts.checkMethod
      XEUtils.eachTree(columns, column => {
        if (!checkMethod || checkMethod({ column })) {
          column.visible = column.defaultVisible
          column.halfVisible = false
        }
        column.resizeWidth = 0
      })
      $xetable.saveCustomResizable(true)
      this.handleCustoms()
      this.handleCancel()
    }
  }
};