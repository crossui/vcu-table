const iconPrefix = 'vcu-icon--'
const GlobalConfig = {
  size: "default",
  zIndex: 100,
  version: 0,
  resizeInterval: 500,
  emptyCell: '　',
  request:null,
  table: {
    fit: true,
    showHeader: true,
    animat: true,
    delayHover: 250,
    paginationAlign: "right",
    stripe: false,
    keepSource: false,
    cloak: false,
    showOverflow: null,
    showHeaderOverflow: null,
    showFooterOverflow: null,
    resizeInterval: 500,
    size: null,
    zIndex: null,
    resizable: false,
    autoResize: true,
    border: false,
    round: false,
    emptyRender: {
      name: ''
    },
    radioConfig: {
      trigger: 'default'
    },
    checkboxConfig: {
      trigger: 'default'
    },
    tooltipConfig: {
      theme: 'dark',
      enterable: false
    },
    validConfig: {
      message: 'default'
    },
    contextMenu: {
      //visibleMethod() { }
    },
    customConfig: {
      storage: false,
      //checkMethod() { }
    },
    rowId: '_VCUID',
    sortConfig: {
      remote: false,
      trigger: 'default',
      orders: ['asc', 'desc', null],
      sortMethod: null,
      showIcon: true
    },
    filterConfig: {
      remote: false,
      filterMethod: null,
      showIcon: true
    },
    treeConfig: {
      children: 'children',
      hasChild: 'hasChild',
      indent: 20,
      showIcon: true
    },
    expandConfig: {
      trigger: 'default',
      showIcon: true
    },
    editConfig: {
      mode: 'cell',
      showIcon: true,
      showAsterisk: true
    },
    importConfig: {
      modes: ['insert', 'covering']
    },
    exportConfig: {
      isPrint: true,
      modes: ['current', 'selected']
    },
    mouseConfig: {
      extension: true
    },
    scrollX: {
      gt: 60,
      oSize: 0
    },
    scrollY: {
      gt: 100,
      oSize: 0
    }
  },
  icon: {
    TABLE_SORT_ASC: iconPrefix + 'caret-top',
    TABLE_SORT_DESC: iconPrefix + 'caret-bottom',
    TABLE_FILTER_NONE: iconPrefix + 'funnel',
    TABLE_FILTER_MATCH: iconPrefix + 'funnel',
    TABLE_EDIT: iconPrefix + 'edit-outline',
    TABLE_HELP: iconPrefix + 'question',
    TABLE_TREE_LOADED: iconPrefix + 'refresh roll',
    TABLE_TREE_OPEN: iconPrefix + 'caret-right rotate90',
    TABLE_TREE_CLOSE: iconPrefix + 'caret-right',
    TABLE_EXPAND_LOADED: iconPrefix + 'refresh roll',
    TABLE_EXPAND_OPEN: iconPrefix + 'arrow-right rotate90',
    TABLE_EXPAND_CLOSE: iconPrefix + 'arrow-right'
  },

  tooltip: {
    size: null,
    trigger: 'hover',
    theme: 'dark',
    leaveDelay: 300
  },

  i18n: key => key
}

export default GlobalConfig
