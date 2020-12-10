export default {
  props: {
    value: {
      type: Boolean,
      default: true
    },
    columnSelectionFull: {
      type: Array,
      default: () => []
    },
    tableColumns: {
      type: Array,
      default: () => []
    },
    size: {
      type: String,
      default: "default"
    }
  },
  watch: {
    value(val) {
      val && this.initColumnsList();
      this.visible = val;
    },
  },
  computed: {

  },
  data() {
    return {
      visible: false,
      columnsList: [],
      indeterminate: false,
      checkAll: false,
      plainOptions: [],
      checkedList: []
    };
  },
  render() {
    const {
      visible,
      handleCancel,
      handleSubmit,
      columnsList,
      onChange,
      indeterminate,
      checkAll,
      onCheckAllChange,
      plainOptions,
      size
    } = this;

    const modalProps = {
      ref: 'columnSelectionModalDom',
      props: {
        visible: visible,
        title: "请选择列",
        destroyOnClose: true,
        wrapClassName: "columnSelection-modal",
      },
      attrs: {},
      on: {
        cancel: handleCancel
      }
    }

    const checkAllProps = {
      props: {
        indeterminate: indeterminate,
        checked: checkAll
      },
      on: {
        change: onCheckAllChange
      }
    }

    const checkGruopProps = {
      style: {
        width: "100%"
      },
      props: {
        options: plainOptions
      },
      on: {
        change: onChange
      }
    }

    return (<a-modal {...modalProps}>
      <div class="clearfix" slot="footer">
        <div class="fl"><a-checkbox {...checkAllProps}>全选</a-checkbox></div>
        <div class="fr">
          <a-button key="back" size={size} onClick={handleCancel}>取消</a-button>
          <a-button key="submit" type="primary" size={size} onClick={handleSubmit}>保存</a-button>
        </div>
      </div>
      <a-checkbox-group {...checkGruopProps} v-model={this.checkedList}>
        <a-row>
          {columnsList.map((item, index) => { return (<a-col span={8} class="mb-5"><a-checkbox value={item.key}>{item.title}</a-checkbox></a-col>) })}
        </a-row>
      </a-checkbox-group>
    </a-modal>)
  },
  mounted() {

  },
  methods: {
    initColumnsList() {
      this.columnsList = [...this.columnSelectionFull]
      this.checkedList = this.tableColumns.map(item => {
        return item.key
      })
      this.checkAll = this.checkedList.length === this.columnSelectionFull.length;
      this.indeterminate = !!this.checkedList.length && this.checkedList.length < this.columnSelectionFull.length;
    },
    handleSubmit(e) {
      this.$emit("onChangeColumns", this.checkedList)
      this.handleCancel()
    },
    handleCancel(e) {
      this.visible = false;
      this.$emit("input", this.visible);
    },
    onCheckAllChange(e) {
      this.checkAll = e.target.checked
      this.indeterminate = false
      this.checkedList = e.target.checked ? this.columnsList.map(item => { return item.key }) : []
    },
    onChange(checkedList) {
      this.indeterminate = !!checkedList.length && checkedList.length < this.columnSelectionFull.length;
      this.checkAll = checkedList.length === this.columnSelectionFull.length;
    }
  }
};