import XEUtils from 'xe-utils'

const contextMenuAPI = [
  {
    name: 'disabled',
    desc: '是否禁用右键',
    version: '',
    type: 'boolean',
    enum: '',
    defVal: 'false',
    list: []
  },
  {
    name: 'options',
    desc: '菜单配置',
    version: '',
    type: 'any[][]',
    enum: '',
    defVal: '',
    list: [
      {
        name: 'code',
        desc: '菜单键值',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'name',
        desc: '菜单名称（支持开启国际化）',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'prefixIcon',
        desc: '前缀图标 className',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'suffixIcon',
        desc: '后缀图标 className',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'className',
        desc: '菜单项的 className',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'visible',
        desc: '是否可视',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'true',
        list: []
      },
      {
        name: 'disabled',
        desc: '是否禁用',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'children',
        desc: '二级菜单（最多只允许有二级）',
        version: '',
        type: 'any[]',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'code',
            desc: '菜单键值',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'name',
            desc: '菜单名称',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'prefixIcon',
            desc: '前缀图标 className',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'visible ',
            desc: '是否可视',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'true',
            list: []
          },
          {
            name: 'disabled ',
            desc: '是否禁用',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          }
        ]
      }
    ]
  }
]

const exportDataAPI = [
  {
    name: 'filename',
    desc: '文件名',
    version: '',
    type: 'string',
    enum: '',
    defVal: '',
    list: []
  },
  {
    name: 'sheetName',
    desc: '表名（只对支持的文档类型有效）',
    version: '',
    type: 'string',
    enum: '',
    defVal: '',
    list: []
  },
  {
    name: 'type',
    desc: '文件类型',
    version: '',
    type: 'string',
    enum: 'csv, html, xml, txt',
    defVal: 'csv',
    list: []
  },
  {
    name: 'types',
    desc: '可选文件类型列表',
    version: '',
    type: 'string[]',
    enum: 'csv, html, xml, txt',
    defVal: '[\'csv\', \'html\', \'xml\', \'txt\']',
    list: []
  },
  {
    name: 'mode',
    desc: '输出数据的方式',
    version: '',
    type: 'string',
    enum: 'current, selected, all',
    defVal: 'current',
    list: []
  },
  {
    name: 'modes',
    desc: '输出数据的方式列表',
    version: '',
    type: 'string[]',
    enum: 'current, selected, all',
    defVal: '[\'current\', \'selected\', \'all\']',
    list: []
  },
  {
    name: 'original',
    desc: '是否为源数据（某些场景下支持 true， 比如虚拟滚动、优化的固定列..，如果需要支持导入，则必须设置为 true）',
    version: '',
    type: 'boolean',
    enum: '',
    defVal: 'false',
    list: []
  },
  {
    name: 'message',
    desc: '是否显示内置的消息提示',
    version: '',
    type: 'boolean',
    enum: '',
    defVal: 'false',
    list: []
  },
  {
    name: 'isHeader',
    desc: '是否需要表头',
    version: '',
    type: 'boolean',
    enum: '',
    defVal: 'true',
    list: []
  },
  {
    name: 'isFooter',
    desc: '是否需要表尾',
    version: '',
    type: 'boolean',
    enum: '',
    defVal: 'true',
    list: []
  },
  {
    name: 'download',
    desc: '是否马上下载，如果设置为 false 则通过返回结果为内容的 Promise',
    version: '',
    type: 'boolean',
    enum: '',
    defVal: 'true',
    list: []
  },
  {
    name: 'data',
    desc: '自定义数据',
    version: '',
    type: 'any[]',
    enum: '',
    defVal: '',
    list: []
  },
  {
    name: 'columns',
    desc: '自定义列（如果指定了 columns 则 columnFilterMethod 默认为空）',
    version: '',
    type: 'any[]',
    enum: '',
    defVal: '',
    list: []
  },
  {
    name: 'columnFilterMethod',
    desc: '列过滤方法，该函数 Function({ column, $columnIndex }) 的返回值用来决定是否过滤掉列',
    version: '',
    type: 'Function',
    enum: '',
    defVal: '默认过滤掉 type=seq,checkbox,radio 和 field 为空的列',
    list: []
  },
  {
    name: 'dataFilterMethod',
    desc: '数据过滤方法，该函数 Function({ row, $rowIndex }) 的返回值用来决定是否过滤掉数据行',
    version: '',
    type: 'Function',
    enum: '',
    defVal: '',
    list: []
  },
  {
    name: 'footerFilterMethod',
    desc: '表尾过滤方法，该函数 Function({ items, $rowIndex }) 的返回值用来决定是否过滤掉表尾行',
    version: '',
    type: 'Function',
    enum: '',
    defVal: '',
    list: []
  },
  {
    name: 'remote',
    desc: '是否服务端导出',
    version: '',
    type: 'boolean',
    enum: '',
    defVal: 'false',
    list: []
  },
  {
    name: 'exportMethod',
    desc: '只对 remote=true 有效，该函数 Function({ options }) 用于自定义导出或服务端导出，返回 Promise',
    version: '',
    type: 'Function',
    enum: '',
    defVal: '',
    list: []
  },
  {
    name: 'style',
    desc: '只对 type=html 有效，自定义文档的 css 样式信息',
    version: '',
    type: 'string',
    enum: '',
    defVal: '',
    list: []
  }
]

const importDataAPI = [
  {
    name: 'mode',
    desc: '导入数据的方式',
    version: '',
    type: 'string',
    enum: 'covering, insert',
    defVal: 'covering',
    list: []
  },
  {
    name: 'message',
    desc: '是否显示内置的消息提示',
    version: '',
    type: 'boolean',
    enum: '',
    defVal: 'false',
    list: []
  },
  {
    name: 'types',
    desc: '导入的文件类型列表',
    version: '',
    type: 'string[]',
    enum: 'csv, html, xml, txt',
    defVal: '[\'csv\', \'html\', \'xml\', \'txt\']',
    list: []
  },
  {
    name: 'remote',
    desc: '是否服务端导入',
    version: '',
    type: 'boolean',
    enum: '',
    defVal: 'false',
    list: []
  },
  {
    name: 'importMethod',
    desc: '只对 remote=true 有效，该函数 Function({ file, options }) 用于自定义导入或服务端导入，返回 Promise',
    version: '',
    type: 'Function',
    enum: '',
    defVal: '',
    list: []
  }
]

const printAPI = exportDataAPI.filter(item => !['filename', 'type', 'types', 'download', 'message', 'remote', 'exportMethod'].includes(item.name)).concat([
  {
    name: 'content',
    desc: '自定义打印的内容',
    version: '',
    type: 'string',
    enum: '',
    defVal: '',
    list: []
  },
  {
    name: 'beforePrintMethod',
    desc: '该函数 Function({ content, options }) 会在打印之前触发，可以通过返回自定义打印的内容',
    version: '',
    type: '({ content, options }) => string',
    enum: '',
    defVal: '',
    list: []
  }
])

const platformProps = [
  {
    name: 'locking',
    descKey: '初始是否锁定加载表格内容数据',
    version: '',
    type: 'Boolean',
    enum: '',
    defVal: 'false',
    list: []
  }, {
    name: 'lazyNoCount',
    descKey: '开启isLazy通用查询不分页场景',
    version: '',
    type: 'Boolean',
    enum: '',
    defVal: 'false',
    list: []
  },
  {
    name: 'lazyLimit',
    descKey: '开启isLazy设置每次加载多少条数据',
    version: '',
    type: 'Number',
    enum: '',
    defVal: '10',
    list: []
  },
  {
    name: 'isLazy',
    descKey: '是否滚动加载数据（一定要设置height）',
    version: '',
    type: 'Boolean',
    enum: '',
    defVal: 'false',
    list: []
  },
  {
    name: 'ajaxType',
    descKey: '接口请求方式',
    version: '',
    type: 'String',
    enum: '',
    defVal: 'POST',
    list: []
  },
  {
    name: 'exportExcelUrl',
    descKey: '导出excel文件接口地址',
    version: '',
    type: 'String',
    enum: '',
    defVal: '',
    list: []
  },
  {
    name: 'loadOptions',
    desc: '通用平台请求参数配置',
    version: '',
    type: '',
    enum: '',
    defVal: '',
    list: [
      {
        name: 'headUrl',
        desc: '通用平台表头请求地址',
        version: '',
        type: 'String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'pageUrl',
        desc: '通用平台表内容请求地址',
        version: '',
        type: 'String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'headerFormData',
        desc: '通用平台表头请求入参',
        version: '',
        type: 'String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'pageFormData',
        desc: '通用平台表内容请求入参',
        version: '',
        type: 'String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'customRender',
        desc: '生成复杂数据',
        version: '',
        type: 'Object',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'key',
            desc: '表格列key',
            version: '',
            type: 'String',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'params',
            desc: '所有vcu-table-column参数',
            version: '',
            type: 'Object',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'checkbox',
            desc: '是否开启多选框',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'radio',
            desc: '是否开启单选框',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'seq',
            desc: '是否开启索引',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          }
        ]
      }
    ]
  },
  {
    name: 'filterModalShow',
    descKey: '允许显示过滤弹窗',
    version: '',
    type: 'boolean',
    enum: '',
    defVal: 'false',
    list: []
  },
  {
    name: 'filterOldColumns',
    descKey: '过滤下拉列数据是否使用旧数据',
    version: '',
    type: 'boolean',
    enum: '',
    defVal: 'false',
    list: []
  },
  {
    name: 'filterFormData',
    descKey: '过滤设置数据',
    version: '',
    type: 'Object',
    enum: '',
    defVal: '',
    list: [
      {
        name: 'filterFindUrl',
        descKey: '过滤数据请示地址',
        version: '',
        type: 'String',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'filterFindUrlPrefix',
        descKey: '过滤数据请示地址前缀',
        version: '',
        type: 'Object',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'find',
            descKey: '查找地址',
            version: '',
            type: 'String',
            enum: '',
            defVal: 'dataq/filter/find/',
            list: []
          },
          {
            name: 'save',
            descKey: '保存地址',
            version: '',
            type: 'String',
            enum: '',
            defVal: 'dataq/filter/save/',
            list: []
          },
          {
            name: 'delete',
            descKey: '删除地址',
            version: '',
            type: 'String',
            enum: '',
            defVal: 'dataq/filter/delete/',
            list: []
          }
        ]
      },
      {
        name: 'filterSaveFormData',
        descKey: '数据保存入参',
        version: '',
        type: 'Object',
        enum: '',
        defVal: '参考旧表格',
        list: []
      },
      {
        name: 'filterFindFormData',
        descKey: '数据查找入参',
        version: '',
        type: 'Object',
        enum: '',
        defVal: '参考旧表格',
        list: []
      },
      {
        name: 'operationUrl',
        descKey: '运算符字典地址',
        version: '',
        type: 'String',
        enum: '',
        defVal: 'dataq/api/dict',
        list: []
      },
      {
        name: 'operationFormData',
        descKey: '运算符字典入参',
        version: '',
        type: 'Object',
        enum: '',
        defVal: '{zdmc: "运算符"}',
        list: []
      },
      {
        name: 'relationUrl',
        descKey: '关系符字典地址',
        version: '',
        type: 'String',
        enum: '',
        defVal: 'dataq/api/dict',
        list: []
      },
      {
        name: 'relationFormData',
        descKey: '关系符字典入参',
        version: '',
        type: 'Object',
        enum: '',
        defVal: '{zdmc: "关系符"}',
        list: []
      },
    ]
  }]

const platformEvents = [
  {
    name: 'onLazyCheng',
    desc: '开启懒加载后，滚动到底部触发',
    version: '',
    type: '',
    enum: '',
    defVal: 'lazyCurrent',
    list: []
  },
  {
    name: 'onHeaderLoad',
    desc: '加载表头数据后触发',
    version: '',
    type: '',
    enum: '',
    defVal: 'columns',
    list: []
  },
  {
    name: 'onPageLoad',
    desc: '加载表内容数据后触发',
    version: '',
    type: '',
    enum: '',
    defVal: '{datas，count，response}',
    list: []
  }
]

const platformMethods = [
  {
    name: 'getTableListData',
    descKey: '获取表格内容',
    version: '',
    type: '',
    enum: '',
    defVal: 'isRest (Boolean 重置当前列表),{clearFilterData:false} //clearFilterData 重置过滤',
    list: []
  },
  {
    name: 'getTableHeaderData',
    descKey: '获取表头内容',
    version: '',
    type: '',
    enum: '',
    defVal: '',
    list: []
  },
  {
    name: 'showFilterModal',
    descKey: '显示过滤窗口',
    version: '',
    type: '',
    enum: '',
    defVal: '',
    list: []
  },
  {
    name: 'showColumnModal',
    descKey: '显示列选择窗口',
    version: '',
    type: '',
    enum: '',
    defVal: '',
    list: []
  },
  {
    name: 'operateRestore',
    descKey: '还原',
    version: '',
    type: '',
    enum: '',
    defVal: '',
    list: []
  },
  {
    name: 'exportExcel',
    descKey: '导出excel文件',
    version: '',
    type: '',
    enum: '',
    defVal: '',
    list: []
  },
  {
    name: 'emptyTableLists',
    descKey: '清空表格列表数据',
    version: '',
    type: '',
    enum: '',
    defVal: '',
    list: []
  },
  {
    name: 'handleFilterRemote',
    descKey: '远程获取通用平台筛选表格列表数据',
    version: '',
    type: '',
    enum: '',
    defVal: '',
    list: []
  }
]


const apis = [
  {
    name: 'Props',
    descKey: '参数',
    version: '',
    type: '',
    enum: '',
    defVal: '',
    list: [
      {
        name: 'id',
        descKey: '唯一标识（被某些特定的功能所依赖）',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'data',
        descKey: '表格数据（与 loadData 行为一致，更新数据是不会重置状态）',
        version: '',
        type: 'any[]',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'height',
        descKey: '表格的高度；支持铺满父容器或者固定高度，如果设置 auto 为铺满父容器（如果设置为 auto，则必须确保存在父节点且不允许存在相邻元素）',
        version: '',
        type: 'number | string',
        enum: 'auto, %, px',
        defVal: '',
        list: []
      },
      {
        name: 'max-height',
        descKey: '表格的最大高度',
        version: '',
        type: 'number | string',
        enum: '%, px',
        defVal: '',
        list: []
      },
      {
        name: 'auto-resize',
        descKey: '自动监听父元素的变化去重新计算表格（对于父元素可能存在动态变化、显示隐藏的容器中、列宽异常等场景中的可能会用到）',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'sync-resize',
        descKey: '自动跟随某个属性的变化去重新计算表格，和手动调用 recalculate 方法是一样的效果（对于通过某个属性来控制显示/隐藏切换时可能会用到）',
        version: '',
        type: 'boolean | string | number',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'resizable',
        descKey: '所有的列是否允许拖动列宽调整大小',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: '默认 false，继承 setup.table.resizable',
        list: []
      },
      {
        name: 'stripe',
        descKey: '是否带有斑马纹（需要注意的是，在可编辑表格场景下，临时插入的数据不会有斑马纹样式）',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: '默认 false，继承 setup.table.stripe',
        list: []
      },
      {
        name: 'border',
        descKey: '是否带有边框',
        version: '',
        type: 'boolean | string',
        enum: 'default（默认）, full（完整边框）, outer（外边框）, inner（内边框）, none（无边框）',
        defVal: '默认 false，继承 setup.table.border',
        list: []
      },
      {
        name: 'round',
        descKey: '是否为圆角边框',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: '默认 false，继承 setup.table.round',
        list: []
      },
      {
        name: 'size',
        descKey: '表格的尺寸',
        version: '',
        type: 'string',
        enum: 'medium, small, mini',
        defVal: '继承上下文',
        list: []
      },
      {
        name: 'loading',
        descKey: '表格是否显示加载中',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'true',
        list: []
      },
      {
        name: 'align',
        descKey: '所有的列对齐方式',
        version: '',
        type: 'string',
        enum: 'left（左对齐）, center（居中对齐）, right（右对齐）',
        defVal: 'left',
        list: []
      },
      {
        name: 'header-align',
        descKey: '所有的表头列的对齐方式',
        version: '',
        type: 'string',
        enum: 'left（左对齐）, center（居中对齐）, right（右对齐）',
        defVal: '继承 align',
        list: []
      },
      {
        name: 'footer-align',
        descKey: '所有的表尾列的对齐方式',
        version: '',
        type: 'string',
        enum: 'left（左对齐）, center（居中对齐）, right（右对齐）',
        defVal: '继承 align',
        list: []
      },
      {
        name: 'show-header',
        descKey: '是否显示表头',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'highlight-current-row',
        descKey: '是否要高亮当前行',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'highlight-hover-row',
        descKey: '鼠标移到行是否要高亮显示',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'highlight-current-column',
        descKey: '是否要高亮当前列',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'highlight-hover-column',
        descKey: '鼠标移到列是否要高亮显示',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'highlight-cell',
        abandoned: true,
        descKey: '只对 edit-config 配置时有效，是否在编辑时高亮单元格边框（只支持部分）',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'row-class-name',
        descKey: '给行附加 className，也可以是函数 Function({row, rowIndex, $rowIndex})',
        version: '',
        type: 'string | Function',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'cell-class-name',
        descKey: '给单元格附加 className，也可以是函数 Function({row, rowIndex, $rowIndex, column, columnIndex, $columnIndex})',
        version: '',
        type: 'string | Function',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'header-row-class-name',
        descKey: '给表头的行附加 className，也可以是函数 Function({$rowIndex})',
        version: '',
        type: 'string | Function',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'header-cell-class-name',
        descKey: '给表头的单元格附加 className，也可以是函数 Function({$rowIndex, column, columnIndex, $columnIndex})',
        version: '',
        type: 'string | Function',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'footer-row-class-name',
        descKey: '给表尾的行附加 className，也可以是函数 Function({$rowIndex})',
        version: '',
        type: 'string | Function',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'footer-cell-class-name',
        descKey: '给表尾的单元格附加 className，也可以是函数 Function({$rowIndex, column, columnIndex, $columnIndex})',
        version: '',
        type: 'string | Function',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'cell-style',
        abandoned: true,
        descKey: '给单元格附加样式，也可以是函数 Function({row, rowIndex, $rowIndex, column, columnIndex, $columnIndex})',
        version: '',
        type: 'any | Function',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'header-cell-style',
        abandoned: true,
        descKey: '给表头单元格附加样式，也可以是函数 Function({$rowIndex, column, columnIndex, $columnIndex})',
        version: '',
        type: 'any | Function',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'footer-cell-style',
        abandoned: true,
        descKey: '给表尾单元格附加样式，也可以是函数 Function({$rowIndex, column, columnIndex, $columnIndex})',
        version: '',
        type: 'any | Function',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'row-style',
        abandoned: true,
        descKey: '给行附加样式，也可以是函数 Function({row, rowIndex, $rowIndex})',
        version: '',
        type: 'any | Function',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'header-row-style',
        abandoned: true,
        descKey: '给表头行附加样式，也可以是函数 Function({$rowIndex, column, columnIndex, $columnIndex})',
        version: '',
        type: 'any | Function',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'footer-row-style',
        abandoned: true,
        descKey: '给表尾行附加样式，也可以是函数 Function({$rowIndex})',
        version: '',
        type: 'any | Function',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'show-footer',
        descKey: '是否显示表尾',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'footer-method',
        descKey: '表尾的数据获取方法 Function({columns, data}) 返回一个二维数组',
        version: '',
        type: 'Function',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'merge-cells',
        descKey: '临时合并指定的单元格（不能用于树形结构、展开行，不建议用于固定列）',
        version: '',
        type: 'Array<{ row: number, col: number, rowspan: number, colspan: number }>',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'merge-footer-items',
        descKey: '临时合并表尾（不能用于树形结构、展开行，不建议用于固定列）',
        version: '',
        type: 'Array<{ row: number, col: number, rowspan: number, colspan: number }>',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'span-method',
        abandoned: true,
        descKey: '自定义合并函数，该方法 Function({row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, data}) 返回计算后的值，不能用于树形结构、展开行、固定列',
        version: '',
        type: 'Function',
        enum: '',
        defVal: '{ rowspan: 1, colspan: 1}',
        list: []
      },
      {
        name: 'footer-span-method',
        abandoned: true,
        descKey: '表尾合并行或列，该函数 Function({$rowIndex, column, columnIndex, $columnIndex, data}) 返回计算后的值，不能用于树形结构、展开行、固定列',
        version: '',
        type: 'Function',
        enum: '',
        defVal: '{ rowspan: 1, colspan: 1}',
        list: []
      },
      {
        name: 'show-overflow',
        descKey: '设置所有内容过长时显示为省略号（如果是固定列建议设置该值，提升渲染速度）',
        version: '',
        type: 'boolean | string',
        enum: 'ellipsis（只显示省略号）,title（并且显示为原生 title）,tooltip（并且显示为 tooltip 提示）',
        defVal: '',
        list: []
      },
      {
        name: 'show-header-overflow',
        descKey: '设置表头所有内容过长时显示为省略号',
        version: '',
        type: 'boolean | string',
        enum: 'ellipsis（只显示省略号）,title（并且显示为原生 title）,tooltip（并且显示为 tooltip 提示）',
        defVal: '',
        list: []
      },
      {
        name: 'show-footer-overflow',
        descKey: '设置表尾所有内容过长时显示为省略号',
        version: '',
        type: 'boolean | string',
        enum: 'ellipsis（只显示省略号）,title（并且显示为原生 title）,tooltip（并且显示为 tooltip 提示）',
        defVal: '',
        list: []
      },
      {
        name: 'column-key',
        descKey: '是否需要为每一列的 VNode 设置 key 属性（非特殊情况下不需要使用）',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'row-key',
        descKey: '是否需要为每一行的 VNode 设置 key 属性（非特殊情况下没必要设置）',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'row-id',
        descKey: '自定义行数据唯一主键的字段名（行数据必须要有唯一主键，默认自动生成）',
        version: '',
        type: 'string',
        enum: '',
        defVal: '默认 _XID，继承 setup.table.rowId',
        list: []
      },
      {
        name: 'keep-source',
        descKey: '保持原始值的状态，被某些功能所依赖，比如编辑状态、还原数据等（开启后影响性能，具体取决于数据量）',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: '默认 false，继承 setup.table.keepSource',
        list: []
      },
      {
        name: 'z-index',
        abandoned: true,
        descKey: '自定义堆叠顺序（对于某些特殊场景，比如被遮挡时可能会用到）',
        version: '',
        type: 'number',
        enum: '',
        defVal: '继承 setup.table.zIndex',
        list: []
      },
      {
        name: 'column-config',
        desc: '列的默认参数',
        version: '',
        type: 'any',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'width',
            desc: '列的默认宽度',
            version: '',
            type: 'Number, String',
            enum: 'auto, px, %',
            defVal: '',
            list: []
          },
          {
            name: 'min-width',
            desc: '列的默认最小宽度',
            version: '',
            type: 'Number, String',
            enum: 'auto, px, %',
            defVal: '',
            list: []
          }
        ]
      },
      {
        name: 'seq-config',
        descKey: '序号配置项',
        version: '',
        type: 'any',
        enum: '',
        defVal: '继承 setup.table.seqConfig',
        list: [
          {
            name: 'startIndex',
            desc: '设置序号的起始值',
            version: '',
            type: 'number',
            enum: '',
            defVal: '0',
            list: []
          },
          {
            name: 'seqMethod',
            desc: '自定义序号的方法 Function({ row, rowIndex, column, columnIndex }) 返回处理后的值',
            version: '',
            type: 'Function',
            enum: '',
            defVal: '',
            list: []
          }
        ]
      },
      {
        name: 'sort-config',
        descKey: '排序配置项',
        version: '',
        type: 'any',
        enum: '',
        defVal: '继承 setup.table.sortConfig',
        list: [
          {
            name: 'defaultSort',
            desc: '默认排序（只会在初始化时被触发一次）',
            version: '',
            type: 'any',
            enum: '',
            defVal: '',
            list: [
              {
                name: 'field',
                desc: '列字段名',
                version: '',
                type: 'string',
                enum: '',
                defVal: '',
                list: []
              },
              {
                name: 'order',
                desc: '排序方式',
                version: '',
                type: 'string',
                enum: 'asc（升序）,desc（降序）, null',
                defVal: '',
                list: []
              }
            ]
          },
          {
            name: 'orders',
            desc: '自定义轮转顺序',
            version: '',
            type: 'string[]',
            enum: 'asc, desc, null',
            defVal: '[\'asc\', \'desc\', \'null\']',
            list: []
          },
          {
            name: 'sortMethod',
            desc: '全局排序方法，当触发排序时会调用该函数 Function({ data, column, property, order }) 返回排序后的列表',
            version: '',
            type: 'Function',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'remote',
            desc: '所有列是否使用服务端排序，如果设置为 true 则不会对数据进行处理',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'trigger',
            desc: '触发方式',
            version: '',
            type: 'string',
            enum: 'default（点击按钮触发）, cell（点击表头触发）',
            defVal: 'default',
            list: []
          },
          {
            name: 'showIcon',
            desc: '是否显示列头排序图标',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'true',
            list: []
          },
          {
            name: 'iconAsc',
            desc: '自定义升序的图标',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'iconDesc',
            desc: '自定义降序的图标',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          }
        ]
      },
      {
        name: 'filter-config',
        descKey: '筛选配置项',
        version: '',
        type: 'any',
        enum: '',
        defVal: '继承 setup.table.filterConfig',
        list: [
          {
            name: 'remote',
            desc: '所有列是否使用服务端筛选，如果设置为 true 则不会对数据进行处理',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'filterMethod',
            desc: '全局筛选方法，当触发筛选时会调用该函数 Function({ value, row, column }) 返回是否有效',
            version: '',
            type: 'Function',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'showIcon',
            desc: '是否显示列头筛选图标',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'true',
            list: []
          },
          {
            name: 'iconNone',
            desc: '自定义无条件时显示的图标',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'iconMatch',
            desc: '自定义带条件时显示的图标',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          }
        ]
      },
      {
        name: 'export-config',
        descKey: '导出配置项',
        version: '',
        type: 'any',
        enum: '',
        defVal: '继承 setup.table.exportConfig',
        list: XEUtils.clone(exportDataAPI, true)
      },
      {
        name: 'import-config',
        descKey: '导入配置项',
        version: '',
        type: 'any',
        enum: '',
        defVal: '继承 setup.table.importConfig',
        list: XEUtils.clone(importDataAPI, true)
      },
      {
        name: 'print-config',
        descKey: '打印配置项',
        version: '',
        type: 'any',
        enum: '',
        defVal: '继承 setup.table.printConfig',
        list: XEUtils.clone(printAPI, true)
      },
      {
        name: 'radio-config',
        descKey: '单选框配置项',
        version: '',
        type: 'any',
        enum: '',
        defVal: '继承 setup.table.radioConfig',
        list: [
          {
            name: 'reserve',
            desc: '是否保留勾选状态，对于某些场景下非常有用，比如数据被刷新之后还保留之前选中的状态（需要有 row-id）',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'labelField',
            desc: '单选框显示的字段名，可以直接显示在单选框中',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'checkRowKey',
            desc: '默认选中指定行（只会在初始化时被触发一次，需要有 row-id）',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'checkMethod',
            desc: '是否允许选中的方法，该方法 Function({ row }) 的返回值用来决定这一行的 Radio 是否可以选中',
            version: '',
            type: 'Function',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'trigger',
            desc: '触发方式',
            version: '',
            type: 'string',
            enum: 'default（默认）, cell（点击单元格触发）, row（点击行触发）',
            defVal: 'default',
            list: []
          },
          {
            name: 'highlight',
            desc: '高亮选中行',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          }
        ]
      },
      {
        name: 'checkbox-config',
        descKey: '复选框配置项',
        version: '',
        type: 'any',
        enum: '',
        defVal: '继承 setup.table.checkboxConfig',
        list: [
          {
            name: 'labelField',
            desc: '复选框显示的字段名，可以直接显示在复选框中',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'checkField',
            desc: '绑定选中属性，如果设置了该属性渲染速度更快（建议数据量大时使用，行数据中必须存在该字段，否则无效）',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'showHeader',
            desc: '是否显示全选按钮（如果 checkStrictly=true 则默认为 false）',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'true',
            list: []
          },
          {
            name: 'checkAll',
            desc: '默认勾选所有（只会在初始化时被触发一次）',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'checkRowKeys',
            desc: '默认勾选指定行（只会在初始化时被触发一次，需要有 row-id）',
            version: '',
            type: 'string[]',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'checkStrictly',
            desc: '是否严格的遵循父子不互相关联的做法',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'strict',
            desc: '严格模式，当数据为空或全部禁用时，列头的复选框为禁用状态',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'checkMethod',
            desc: '是否允许勾选的方法，该方法 Function({ row }) 的返回值用来决定这一行的 checkbox 是否可以勾选',
            version: '',
            type: 'Function',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'trigger',
            desc: '触发方式',
            version: '',
            type: 'string',
            enum: 'default（默认）, cell（点击单元格触发）, row（点击行触发）',
            defVal: 'default',
            list: []
          },
          {
            name: 'highlight',
            desc: '高亮勾选行',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'reserve',
            desc: '是否保留勾选状态，对于某些场景可能会用到，比如数据被刷新之后还保留之前选中的状态（需要有 row-id）',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'range',
            desc: '开启复选框范围选择功能（启用后通过鼠标在复选框的列内滑动选中或取消指定行）',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          }
        ]
      },
      {
        name: 'tooltip-config',
        descKey: 'tooltip 配置项',
        version: '',
        type: 'any',
        enum: '',
        defVal: '继承 setup.table.tooltipConfig',
        list: [
          {
            name: 'enabled',
            desc: '所有单元格开启 tooltip 显示',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'theme',
            desc: 'tooltip 的主题颜色',
            version: '',
            type: 'string',
            enum: 'dark,light',
            defVal: 'dark',
            list: []
          },
          {
            name: 'enterable',
            desc: '鼠标是否可进入到 tooltip 中',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'leaveDelay',
            desc: '鼠标移出后延时多少才隐藏 tooltip',
            version: '',
            type: 'number',
            enum: '',
            defVal: '300',
            list: []
          },
          {
            name: 'contentMethod',
            desc: '该方法 Function({ items?, row?, rowIndex?, $rowIndex, column, columnIndex, $columnIndex, type, cell, $event }) 接收一个字符串，可以通过返回值来重写默认的提示内容',
            version: '',
            type: 'Function',
            enum: '',
            defVal: '',
            list: []
          }
        ]
      },
      {
        name: 'expand-config',
        descKey: '展开行配置项',
        version: '',
        type: 'any',
        enum: '',
        defVal: '继承 setup.table.expandConfig',
        list: [
          {
            name: 'labelField',
            desc: '展开列显示的字段名，可以直接显示在单元格中',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'expandAll',
            desc: '默认展开所有行（只会在初始化时被触发一次）',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'expandRowKeys',
            desc: '默认展开指定行（只会在初始化时被触发一次，需要有 row-id）',
            version: '',
            type: 'string[]',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'accordion',
            desc: '每次只能展开一行',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'trigger',
            desc: '触发方式',
            version: '',
            type: 'string',
            enum: 'default（点击按钮触发）, cell（点击单元格触发）, row（点击行触发）',
            defVal: 'default',
            list: []
          },
          {
            name: 'lazy',
            desc: '是否使用懒加载',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'loadMethod',
            desc: '该方法 Function({ row, rowIndex?, $rowIndex? }) 用于异步加载展开后的内容（必须返回 Promise<any[]> 对象）',
            version: '',
            type: 'Function',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'toggleMethod',
            desc: '该方法 Function({ expanded, column, columnIndex, row, rowIndex? }) 在展开或关闭触发之前调用，可以通过返回值来决定是否允许继续执行',
            version: '',
            type: 'Function',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'visibleMethod',
            desc: '该函数 Function({ column, columnIndex, row, rowIndex? }) 的返回值用来决定是否允许显示展开按钮',
            version: '',
            type: 'Function',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'reserve',
            desc: '是否保留展开状态，对于某些场景可能会用到，比如数据被刷新之后还保留之前展开的状态（需要有 row-id）',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'showIcon',
            desc: '是否显示图标按钮',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'true',
            list: []
          },
          {
            name: 'iconOpen',
            desc: '自定义展开后显示的图标',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'iconClose',
            desc: '自定义收起后显示的图标',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'iconLoaded',
            desc: '自定义懒加载中显示的图标',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          }
        ]
      },
      {
        name: 'tree-config',
        descKey: '树形结构配置项',
        version: '',
        type: 'any',
        enum: '',
        defVal: '继承 setup.table.treeConfig',
        list: [
          {
            name: 'children',
            desc: '树子节点的属性',
            version: '',
            type: 'string',
            enum: '',
            defVal: 'children',
            list: []
          },
          {
            name: 'indent',
            desc: '树节点的缩进',
            version: '',
            type: 'number',
            enum: '',
            defVal: '20',
            list: []
          },
          {
            name: 'line',
            desc: '树节点的连接线（启用连接线会降低渲染性能）',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'expandAll',
            desc: '默认展开所有子孙树节点（只会在初始化时被触发一次）',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'expandRowKeys',
            desc: '默认展开指定树节点（只会在初始化时被触发一次，需要有 row-id）',
            version: '',
            type: 'string[]',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'accordion',
            desc: '对于同一级的节点，每次只能展开一个',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'trigger',
            desc: '触发方式',
            version: '',
            type: 'string',
            enum: 'default（点击按钮触发）, cell（点击单元格触发）, row（点击行触发）',
            defVal: 'default',
            list: []
          },
          {
            name: 'lazy',
            desc: '是否使用懒加载（启用后只有指定 hasChild 的节点才允许被点击）',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'hasChild',
            desc: '只对 lazy 启用后有效，标识是否存在子节点，从而控制是否允许被点击',
            version: '',
            type: 'string',
            enum: '',
            defVal: 'hasChild',
            list: []
          },
          {
            name: 'loadMethod',
            desc: '该方法 Function({ row }) 用于异步加载子节点（必须返回 Promise<any[]> 对象）',
            version: '',
            type: 'Function',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'toggleMethod',
            desc: '该方法 Function({ expanded, row, column, columnIndex }) 在展开或关闭触发之前调用，可以通过返回值来决定是否允许继续执行',
            version: '',
            type: 'Function',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'reserve',
            desc: '是否保留展开状态，对于某些场景可能会用到，比如数据被刷新之后还保留之前展开的状态（需要有 row-id）',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'showIcon',
            desc: '是否显示图标按钮',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'true',
            list: []
          },
          {
            name: 'iconOpen',
            desc: '自定义展开后显示的图标',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'iconClose',
            desc: '自定义收起后显示的图标',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'iconLoaded',
            desc: '自定义懒加载中显示的图标',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          }
        ]
      },
      {
        name: 'context-menu',
        descKey: '快捷菜单配置项',
        version: '',
        type: 'any',
        enum: '',
        defVal: '继承 setup.table.contextMenu',
        list: [
          {
            name: 'header',
            desc: '表头的快捷菜单',
            version: '',
            type: 'any',
            enum: '',
            defVal: '',
            list: XEUtils.clone(contextMenuAPI, true)
          },
          {
            name: 'body',
            desc: '内容的快捷菜单',
            version: '',
            type: 'any',
            enum: '',
            defVal: '',
            list: XEUtils.clone(contextMenuAPI, true)
          },
          {
            name: 'footer',
            desc: '表尾的快捷菜单',
            version: '',
            type: 'any',
            enum: '',
            defVal: '',
            list: XEUtils.clone(contextMenuAPI, true)
          },
          {
            name: 'trigger',
            desc: '触发方式',
            version: '',
            type: 'string',
            enum: 'default（默认触发）, cell（右键单元格触发）',
            defVal: 'default',
            list: []
          },
          {
            name: 'visibleMethod',
            desc: '该函数 Function({ type, options, columns, row?, rowIndex?, column?, columnIndex? }) 的返回值用来决定是否允许显示右键菜单（对于需要对菜单进行权限控制时可能会用到）',
            version: '',
            type: 'Function',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'className',
            desc: '菜单面板的 className',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          }
        ]
      },
      {
        name: 'mouse-config',
        descKey: '鼠标配置项',
        version: '',
        type: 'any',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'selected',
            desc: '开启单元格选中功能（只对 edit-config.mode=cell 有效）',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'area',
            desc: '如果功能被支持，则开启鼠标左键单元格区域选取功能，非连续的区域，同时按住 鼠标左键 + Ctrl 键，用鼠标逐一选取',
            version: 'pro',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'extension',
            desc: '只对 area 启用后有效，是否开启区域延伸选取功能，开启后可以通过鼠标左键按住区域内右下角延伸按钮，将区域横向或纵向扩大',
            version: 'pro',
            type: 'boolean',
            enum: '',
            defVal: 'true',
            list: []
          }
        ]
      },
      {
        name: 'keyboard-config',
        descKey: '按键配置项',
        version: '',
        type: 'any',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'isArrow',
            desc: '开启方向键功能',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'isDel',
            desc: '开启删除键功能',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'isEnter',
            desc: '开启回车键功能',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'isTab',
            desc: '开启 Tab 键功能',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'isEdit',
            desc: '开启任意键进入编辑（功能键除外）',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'isMerge',
            desc: '如果功能被支持，用于 mouse-config.area，开启合并和取消合并功能',
            version: 'pro',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'isClip',
            desc: '如果功能被支持，用于 mouse-config.area，开启复制、剪贴、粘贴功能',
            version: 'pro',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'isFNR',
            desc: '如果功能被支持，用于 mouse-config.area，开启查找和替换功能',
            version: 'pro',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'isChecked',
            desc: '如果功能被支持，用于 mouse-config.area & column.type=checkbox|radio，开启空格键切换复选框或单选框状态功能',
            version: 'pro',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'enterToTab',
            desc: '是否将回车键行为改成 Tab 键行为',
            version: '',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'editMethod',
            desc: '只对 isEdit=true 有效，用于重写选中编辑处理逻辑，该函数 Function({ row, rowIndex, column, columnIndex }) 可以返回 false 来阻止默认行为',
            version: '',
            type: 'Function',
            enum: '',
            defVal: '',
            list: []
          }
        ]
      },
      {
        name: 'edit-config',
        descKey: '可编辑配置项',
        version: '',
        type: 'any',
        enum: '',
        defVal: '继承 setup.table.editConfig',
        list: [
          {
            name: 'trigger',
            desc: '触发方式',
            version: '',
            type: 'string',
            enum: 'manual（手动触发方式，只能用于 mode=row）,click（点击触发编辑）,dblclick（双击触发编辑）',
            defVal: 'click',
            list: []
          },
          {
            name: 'mode',
            desc: '编辑模式',
            version: '',
            type: 'string',
            enum: 'cell（单元格编辑模式）,row（行编辑模式）',
            defVal: 'cell',
            list: []
          },
          {
            name: 'showIcon',
            desc: '是否显示列头编辑图标',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'true',
            list: []
          },
          {
            name: 'showStatus',
            desc: '只对 keep-source 开启有效，是否显示单元格值的修改状态',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'showAsterisk',
            desc: '是否显示必填字段的红色星号',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'true',
            list: []
          },
          {
            name: 'autoClear',
            desc: '当点击非编辑列之后，是否自动清除单元格的激活状态',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'true',
            list: []
          },
          {
            name: 'activeMethod',
            desc: '该方法 Function({ row, rowIndex, column, columnIndex }) 的返回值用来决定该单元格是否允许编辑',
            version: '',
            type: 'Function',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'icon',
            desc: '自定义可编辑列的状态图标',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          }
        ]
      },
      {
        name: 'valid-config',
        descKey: '校验配置项',
        version: '',
        type: 'any',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'autoPos',
            desc: '是否自动定位到校验不通过的单元格',
            version: '',
            type: 'bolean',
            enum: '',
            defVal: 'true',
            list: []
          },
          {
            name: 'message',
            abandoned: true,
            desc: '校验提示框的方式',
            version: '',
            type: 'string',
            enum: 'default（如果不设置高度，则默认第一行使用 tooltip，之后使用 inline）, none（关闭提示）, inline（强制使用内联的提示）, tooltip（强制使用 tooltip 提示）',
            defVal: 'default',
            list: []
          },
          {
            name: 'maxWidth',
            abandoned: true,
            desc: '校验提示框的最大宽度（对于某些特殊场景可能会用到）',
            version: '',
            type: 'string | number',
            enum: '',
            defVal: '320',
            list: []
          }
        ]
      },
      {
        name: 'edit-rules',
        descKey: '校验规则配置项',
        version: '',
        type: '{ [field: string]: ColumnEditRule[] }',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'required',
            desc: '是否必填',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'min',
            desc: '校验值最小长度（如果 type=number 则比较值大小）',
            version: '',
            type: 'number',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'max',
            desc: '校验值最大长度（如果 type=number 则比较值大小）',
            version: '',
            type: 'number',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'type',
            desc: '数据校验的类型',
            version: '',
            type: 'string',
            enum: 'number, string',
            defVal: 'string',
            list: []
          },
          {
            name: 'pattern',
            desc: '正则校验',
            version: '',
            type: 'RegExp | string',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'validator',
            desc: '自定义校验方法 Function({ cellValue, rule, rules, row, rowIndex，column, columnIndex }) 返回一个 Promise<new Error("提示消息")>',
            version: '',
            type: 'Function',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'message',
            desc: '校验提示内容（支持开启国际化）',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'trigger',
            desc: '触发校验方式（如果为空，则为常规校验方式； 如果指定触发方式，则只会在匹配情况下进行校验）',
            version: '',
            type: 'string',
            enum: 'blur,change',
            defVal: '',
            list: []
          },
          {
            name: 'maxWidth',
            abandoned: true,
            desc: '提示框的最大宽度（对于某些特殊场景可能会用到）',
            version: '',
            type: 'number',
            enum: '',
            defVal: '320',
            list: []
          }
        ]
      },
      {
        name: 'empty-text',
        descKey: '空数据时显示的内容',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'empty-render',
        descKey: '空内容渲染配置项',
        version: '',
        type: 'any',
        enum: '',
        defVal: '继承 setup.table.emptyRender',
        list: [
          {
            name: 'name',
            desc: '渲染器名称',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'props',
            desc: '渲染的参数（请查看目标渲染的 Props）',
            version: '',
            type: 'any',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'attrs',
            desc: '渲染的属性（请查看目标渲染的 Attribute）',
            version: '',
            type: 'any',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'events',
            desc: '渲染组件的事件（请查看目标渲染的 Events）',
            version: '',
            type: 'any',
            enum: '',
            defVal: '{}, ...[目标渲染的 arguments]',
            list: []
          },
          {
            name: 'nativeEvents',
            desc: '渲染组件的原生事件（请查看目标渲染的 Events）',
            version: '',
            type: 'any',
            enum: '',
            defVal: '{}, ...[目标渲染的 arguments]',
            list: []
          }
        ]
      },
      {
        name: 'custom-config',
        descKey: '自定义列配置项',
        version: '',
        type: 'any',
        enum: '',
        defVal: '继承 setup.table.customConfig',
        list: [
          {
            name: 'storage',
            desc: '是否启用 localStorage 本地保存，会将列操作状态保留在本地（需要有 id）',
            version: '',
            type: 'any',
            enum: '',
            defVal: '',
            list: [
              {
                name: 'visible',
                desc: '启用显示/隐藏列状态',
                version: '',
                type: 'boolean',
                enum: '',
                defVal: '',
                list: []
              },
              {
                name: 'resizable',
                desc: '启用列宽状态',
                version: '',
                type: 'boolean',
                enum: '',
                defVal: '',
                list: []
              }
            ]
          },
          {
            name: 'checkMethod',
            desc: '自定义列是否允许列选中的方法，该方法 Function({ column }) 的返回值用来决定这一列的 checkbox 是否可以选中',
            version: '',
            type: 'Function',
            enum: '',
            defVal: '',
            list: []
          }
        ]
      },
      {
        name: 'animat',
        abandoned: true,
        desc: '表格动画效果开关（关闭后视觉效果更快）',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: '默认 true，继承 setup.table.animat',
        list: []
      },
      {
        name: 'cloak',
        abandoned: true,
        desc: '用于低性能的浏览器，可以设置为 true 来避免初始化渲染时的闪动',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: '默认 false，继承 setup.table.cloak',
        list: []
      },
      {
        name: 'delay-hover',
        abandoned: true,
        desc: '当表格发生拖动、滚动...等行为时，至少多少毫秒之后才允许触发 hover 事件',
        version: '',
        type: 'number',
        enum: '',
        defVal: '默认 250，继承 setup.table.delayHover',
        list: []
      },
      {
        name: 'scroll-x',
        desc: '横向虚拟滚动配置（注：当 tree-config 启用后自动关闭该功能）',
        version: '',
        type: 'any',
        enum: '',
        defVal: '继承 setup.table.scrollX',
        list: [
          {
            name: 'gt',
            desc: '指定大于指定列时自动启动横向虚拟滚动，如果为 0 则总是启用，如果为 -1 则关闭（注：启用横向虚拟滚动之后将不能支持分组表头）',
            version: '',
            type: 'number',
            enum: '',
            defVal: '60',
            list: []
          },
          {
            name: 'oSize',
            desc: '指定每次渲染的数据偏移量，偏移量越大渲染次数就越少，但每次渲染耗时就越久（对于古董级的低性能浏览器可以设置大一点）',
            version: '',
            type: 'number',
            enum: '',
            defVal: '0',
            list: []
          }
        ]
      },
      {
        name: 'scroll-y',
        desc: '纵向虚拟滚动配置（注：当 tree-config 启用后自动关闭该功能）',
        version: '',
        type: 'any',
        enum: '',
        defVal: '继承 setup.table.scrollY',
        list: [
          {
            name: 'gt',
            desc: '指定大于指定行时自动启动纵向虚拟滚动，如果为 0 则总是启用，如果为 -1 则关闭（注：启用纵向虚拟滚动之后将不能支持动态行高）',
            version: '',
            type: 'number',
            enum: '',
            defVal: '100',
            list: []
          },
          {
            name: 'oSize',
            desc: '指定每次渲染的数据偏移量，偏移量越大渲染次数就越少，但每次渲染耗时就越久（对于古董级的低性能浏览器可以设置大一点）',
            version: '',
            type: 'number',
            enum: '',
            defVal: '0',
            list: []
          }
        ]
      },
      {
        name: 'params',
        descKey: '额外的参数（可以用来存放一些私有参数）',
        version: '',
        type: 'any',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'customModalShow',
        desc: '是否显示列工具弹窗',
        version: '',
        type: 'Boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      /* 通用平台 */
      {
        name: '通用平台',
        descKey: '',
        version: '',
        type: 'any',
        enum: '',
        defVal: '',
        list: XEUtils.clone(platformProps, true)
      }

    ]
  },
  {
    name: 'Slots',
    descKey: '插槽',
    version: '',
    type: '',
    enum: '',
    defVal: '',
    list: [
      {
        name: 'empty',
        descKey: '空数据时显示的文本内容',
        version: '',
        type: '',
        enum: '',
        defVal: '{}',
        list: []
      }
    ]
  },
  {
    name: 'Events',
    descKey: '事件',
    version: '',
    type: '',
    enum: '',
    defVal: '',
    list: [
      {
        name: 'keydown',
        desc: '当表格被激活且键盘被按下时会触发的事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ $event }',
        list: []
      },
      {
        name: 'current-change',
        descKey: '只对 highlightCurrentRow 有效，当手动选中行并且值发生改变时触发的事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }',
        list: []
      },
      {
        name: 'radio-change',
        descKey: '只对 type=radio 有效，当手动勾选并且值发生改变时触发的事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }',
        list: []
      },
      {
        name: 'checkbox-change',
        descKey: '只对 type=checkbox 有效，当手动勾选并且值发生改变时触发的事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ records, reserves, indeterminates, checked, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }',
        list: []
      },
      {
        name: 'checkbox-change-get-keys',
        descKey: '只对 type=checkbox 有效，返回被选中的数据索引值',
        version: '',
        type: '',
        enum: '',
        defVal: '{ selectedRowKeys, $event }',
        list: []
      },
      {
        name: 'checkbox-all',
        descKey: '只对 type=checkbox 有效，当手动勾选全选时触发的事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ records, reserves, indeterminates, checked, $event }',
        list: []
      },
      {
        name: 'checkbox-range-start',
        desc: '只对 checkbox-config.range 有效，当鼠标范围选择开始时会触发的事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ records, reserves, $event }',
        list: []
      },
      {
        name: 'checkbox-range-change',
        desc: '只对 checkbox-config.range 有效，当鼠标范围选择内的行数发生变化时会触发的事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ records, reserves, $event }',
        list: []
      },
      {
        name: 'checkbox-range-end',
        desc: '只对 checkbox-config.range 有效，当鼠标范围选择结束时会触发的事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ records, reserves, $event }',
        list: []
      },
      {
        name: 'cell-click',
        descKey: '单元格被点击时会触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, triggerRadio, triggerCheckbox, triggerTreeNode, triggerExpandNode, $event }',
        list: []
      },
      {
        name: 'cell-dblclick',
        descKey: '单元格被双击时会触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }',
        list: []
      },
      {
        name: 'cell-context-menu',
        descKey: '只对 context-menu 配置时有效，单元格被鼠标右键时触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ type, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }',
        list: []
      },
      {
        name: 'cell-mouseenter',
        descKey: '当单元格 hover 进入时会触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }',
        list: []
      },
      {
        name: 'cell-mouseleave',
        descKey: '当单元格 hover 退出时会触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }',
        list: []
      },
      {
        name: 'header-cell-click',
        descKey: '表头单元格被点击时会触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ $rowIndex, column, columnIndex, $columnIndex, triggerResizable, triggerSort, triggerFilter, $event }',
        list: []
      },
      {
        name: 'header-cell-dblclick',
        descKey: '表头单元格被双击时会触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ $rowIndex, column, columnIndex, $columnIndex, $event }',
        list: []
      },
      {
        name: 'header-cell-context-menu',
        descKey: '只对 context-menu 配置时有效，表头单元格被鼠标右键时触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ type, column, columnIndex, $event }',
        list: []
      },
      {
        name: 'footer-cell-click',
        descKey: '表尾单元格被点击时会触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ items, $rowIndex, column, columnIndex, $columnIndex, $event }',
        list: []
      },
      {
        name: 'footer-cell-dblclick',
        descKey: '表尾单元格被双击时会触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ items, $rowIndex, column, columnIndex, $columnIndex, $event}',
        list: []
      },
      {
        name: 'footer-cell-context-menu',
        descKey: '只对 context-menu 配置时有效，表尾单元格被鼠标右键时触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ type, column, columnIndex, $event}',
        list: []
      },
      {
        name: 'sort-change',
        descKey: '当排序条件发生变化时会触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ column, property, order, $event }',
        list: []
      },
      {
        name: 'filter-change',
        descKey: '当筛选条件发生变化时会触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ column, property, values, datas, filters, $event }',
        list: []
      },
      {
        name: 'resizable-change',
        descKey: '当列宽拖动发生变化时会触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ $rowIndex, column, columnIndex, $columnIndex, $event }',
        list: []
      },
      {
        name: 'toggle-row-expand',
        descKey: '当行展开或收起时会触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ expanded, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, $event }',
        list: []
      },
      {
        name: 'toggle-tree-expand',
        descKey: '当树节点展开或收起时会触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ expanded, row, column, columnIndex, $columnIndex, $event }',
        list: []
      },
      {
        name: 'context-menu-click',
        descKey: '只对 context-menu 配置时有效，当点击快捷菜单时会触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ menu, type, row, rowIndex, column, columnIndex, $event }',
        list: []
      },
      {
        name: 'edit-closed',
        descKey: '只对 edit-config 配置时有效，单元格编辑状态下被关闭时会触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex }',
        list: []
      },
      {
        name: 'edit-actived',
        descKey: '只对 edit-config 配置时有效，单元格被激活编辑时会触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex }',
        list: []
      },
      {
        name: 'edit-disabled',
        descKey: '只对 edit-config 配置时有效，当单元格激活时如果是禁用状态时会触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex }',
        list: []
      },
      {
        name: 'valid-error',
        descKey: '只对 edit-rules 配置时有效，当数据校验不通过时会触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ rule, row, rowIndex, $rowIndex, column, columnIndex, $columnIndex }',
        list: []
      },
      {
        name: 'scroll',
        descKey: '表格滚动时会触发该事件',
        version: '',
        type: '',
        enum: '',
        defVal: '{ type, scrollTop, scrollLeft, isX, isY, $event }',
        list: []
      },
      {
        name: '通用平台事件',
        desc: '',
        version: '',
        type: '',
        enum: '',
        defVal: '',
        list: XEUtils.clone(platformEvents, true)
      }
    ]
  },
  {
    name: 'Methods',
    descKey: '方法',
    version: '',
    type: '',
    enum: '',
    defVal: '',
    list: [
      {
        name: 'loadData(data)',
        desc: '加载数据（对于表格数据需要重载、局部递增场景下可能会用到）',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'data: array',
        list: []
      },
      {
        name: 'reloadData(data)',
        desc: '加载数据并清除所有状态（对于表格数据需要重载、局部递增的场景中可能会用到）',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'data: array',
        list: []
      },
      {
        name: 'updateData()',
        desc: '手动处理数据（对于手动更改了排序、筛选...等条件后需要重新处理数据时可能会用到）',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'syncData()',
        desc: '同步 data 数据；如果用了该方法，那么组件将不再记录增删改的状态，只能自行实现对应逻辑（对于某些特殊的场景，比如深层树节点元素发生变动时可能会用到）',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'reloadRow(rows, record, field)',
        desc: '局部加载行数据并恢复到初始状态（对于行数据需要局部更改的场景中可能会用到）',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'rows: Row | Row[], record: object, field?: string',
        list: []
      },
      {
        name: 'reloadExpandContent(rows)',
        desc: '用于懒加载展开行，重新加载展开行的内容',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'rows: Row | Row[]',
        list: []
      },
      {
        name: 'reloadTreeChilds(rows)',
        desc: '用于懒加载树表格，重新加载子节点',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'rows: Row | Row[]',
        list: []
      },
      {
        name: 'loadColumn(columns)',
        desc: '加载列配置（对于表格列需要重载、局部递增场景下可能会用到）',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'columns: array',
        list: []
      },
      {
        name: 'reloadColumn(columns)',
        desc: '加载列配置并恢复到初始状态（对于表格列需要重载、局部递增场景下可能会用到）',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'columns: array',
        list: []
      },
      {
        name: 'refreshColumn()',
        desc: '刷新列配置（对于动态修改属性、显示/隐藏列等场景下可能会用到）',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'createRow(records)',
        desc: '创建 Row|Rows 对象（对于某些特殊场景需要对数据进行手动插入时可能会用到）',
        version: '',
        type: 'Promise<row|rows>',
        enum: '',
        defVal: 'records: object | array',
        list: []
      },
      {
        name: 'createData(records)',
        desc: '创建 data 对象（对于某些特殊场景可能会用到，会自动对数据的字段名进行检测，如果不存在就自动定义）',
        version: '',
        type: 'Promise<Array>',
        enum: '',
        defVal: 'records: array',
        list: []
      },
      {
        name: 'insert(records)',
        desc: '往表格插入临时数据（不支持深层结构），从第一行插入一行或多行新数据',
        version: '',
        type: 'Promise<{row, rows}>',
        enum: '',
        defVal: 'records?: object | Array<object>',
        list: []
      },
      {
        name: 'insertAt(records, row)',
        desc: '往表格插入临时数据（不支持深层结构），从指定位置插入一行或多行；第二个参数：row 指定位置、null从第一行插入、-1 从最后插入',
        version: '',
        type: 'Promise<{row, rows}>',
        enum: '',
        defVal: 'records: object | Array<object>, row?: Row',
        list: []
      },
      {
        name: 'revertData(rows, field)',
        desc: '只对 keep-source 开启有效，还原指定行 row 或者整个表格的数据',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'rows: Row | Array<Row>, field?: string',
        list: []
      },
      {
        name: 'remove(rows)',
        desc: '删除指定行数据（不支持深层结构），指定 row 或 [row, ...] 删除多条数据，如果为空则删除所有数据',
        version: '',
        type: 'Promise<{row, rows}>',
        enum: '',
        defVal: 'rows: Row | Array<Row>',
        list: []
      },
      {
        name: 'removeCheckboxRow()',
        desc: '删除复选框选中的行数据（不支持深层结构）',
        version: '',
        type: 'Promise<{row, rows}>',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'removeRadioRow()',
        desc: '删除单选框选中的行数据（不支持深层结构）',
        version: '',
        type: 'Promise<{row, rows}>',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'removeCurrentRow()',
        desc: '删除当前行选中的行数据（不支持深层结构）',
        version: '',
        type: 'Promise<{row, rows}>',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'removeMergeCells(merges)',
        desc: '取消单元格的临时合并状态，如果为数组，则取消多个合并',
        version: '',
        type: 'Promise<merges>',
        enum: '',
        defVal: 'merges: {row: Row, col: ColumnInfo} | {row: Row, col: ColumnInfo}[]',
        list: []
      },
      {
        name: 'removeMergeFooterItems(merges)',
        desc: '取消表尾的临时合并状态，如果为数组，则取消多个合并',
        version: '',
        type: 'Promise<merges>',
        enum: '',
        defVal: 'merges: {row: Row, col: ColumnInfo} | {row: Row, col: ColumnInfo}[]',
        list: []
      },
      {
        name: 'getRowIndex(row)',
        desc: '根据 row 获取相对于 data 中的索引',
        version: '',
        type: 'Number',
        enum: '',
        defVal: 'row: Row',
        list: []
      },
      {
        name: '_getRowIndex(row)',
        desc: '根据 row 获取相对于当前数据中的索引',
        version: '',
        type: 'Number',
        enum: '',
        defVal: 'row: Row',
        list: []
      },
      {
        name: '$getRowIndex(row)',
        desc: '根据 row 获取渲染中的虚拟索引',
        version: '',
        type: 'Number',
        enum: '',
        defVal: 'row: Row',
        list: []
      },
      {
        name: 'getRowNode(tr)',
        desc: '根据 tr 元素获取对应的 row 信息',
        version: '',
        type: '{item, items, index, parent}',
        enum: '',
        defVal: 'tr: Element',
        list: []
      },
      {
        name: 'getColumns()',
        desc: '获取表格的可视的列',
        version: '',
        type: 'Array',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'getColid(column)',
        desc: '根据列获取列的唯一主键',
        version: '',
        type: 'String',
        enum: '',
        defVal: 'column: ColumnConfig',
        list: []
      },
      {
        name: 'getColumnById(colid)',
        desc: '根据列的唯一主键获取列',
        version: '',
        type: 'Column',
        enum: '',
        defVal: 'colid: string',
        list: []
      },
      {
        name: 'getColumnByField(field)',
        desc: '根据列的字段名获取列',
        version: '',
        type: 'Column',
        enum: '',
        defVal: 'field: string',
        list: []
      },
      {
        name: 'getTableColumn()',
        desc: '获取当前表格的列（收集到的全量列、全量表头列、处理条件之后的全量表头列、当前渲染中的表头列）',
        version: '',
        type: '{collectColumn, fullColumn, visibleColumn, tableColumn}',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'getColumnIndex(column)',
        desc: '根据 column 获取相对于 columns 中的索引',
        version: '',
        type: 'Number',
        enum: '',
        defVal: 'column: ColumnConfig',
        list: []
      },
      {
        name: '$getColumnIndex(column)',
        desc: '根据 column 获取渲染中的虚拟索引',
        version: '',
        type: 'Number',
        enum: '',
        defVal: 'column',
        list: []
      },
      {
        name: '_getColumnIndex(column)',
        desc: '根据 column 获取相对于当前表格列中的索引（分组表头可能会用到）',
        version: '',
        type: 'Number',
        enum: '',
        defVal: 'column',
        list: []
      },
      {
        name: 'getColumnNode(cell)',
        desc: '根据 th/td 元素获取对应的 column 信息',
        version: '',
        type: '{item, items, index, parent}',
        enum: '',
        defVal: 'cell: Element',
        list: []
      },
      {
        name: 'getSortColumn()',
        desc: '获取当前排序的 column 信息',
        version: '',
        type: 'Column',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'getTableData()',
        desc: '获取当前表格的数据（完整的全量表体数据、处理条件之后的全量表体数据、当前渲染中的表体数据、当前渲染中的表尾数据）',
        version: '',
        type: '{fullData, visibleData, tableData, footerData}',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'getRowById(rowid)',
        desc: '根据行的唯一主键获取行',
        version: '',
        type: 'String',
        enum: '',
        defVal: 'rowid: string',
        list: []
      },
      {
        name: 'getRowid(row)',
        desc: '根据行获取行的唯一主键',
        version: '',
        type: 'Row',
        enum: '',
        defVal: 'row: Row',
        list: []
      },
      {
        name: 'getData(rowIndex)',
        desc: '获取数据，和 data 的行为一致，也可以指定索引获取数据',
        version: '',
        type: 'Array',
        enum: '',
        defVal: 'rowIndex?: number',
        list: []
      },
      {
        name: 'getRecordset()',
        desc: '获取表格数据集（获取插入、删除、更改的数据，对于增删改查表格非常方便）',
        version: '',
        type: '{insertRecords, removeRecords, updateRecords}',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'getInsertRecords()',
        desc: '用于 edit-config，获取插入的临时数据',
        version: '',
        type: 'Array',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'getRemoveRecords()',
        desc: '获取已删除的数据',
        version: '',
        type: 'Array',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'getUpdateRecords()',
        desc: '只对 keep-source 开启有效，获取已修改的数据',
        version: '',
        type: 'Array',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'getMergeCells()',
        desc: '获取临时合并的单元格',
        version: '',
        type: 'Array<{row: any, col: ColumnInfo, rowspan: number, colspan: number}>',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'getMergeFooterItems()',
        desc: '获取临时合并的表尾',
        version: '',
        type: 'Array<{row: any, col: ColumnInfo, rowspan: number, colspan: number}>',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'getCurrentColumn()',
        desc: '用于 highlight-current-column，获取当前列',
        version: '',
        type: 'ColumnConfig',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'getCurrentRecord()',
        desc: '用于 highlight-current-row，获取高亮的当前行数据',
        version: '',
        type: 'Row',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'getRadioRecord()',
        desc: '用于 type=radio，获取当已选中的行数据',
        version: '',
        type: 'Row',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'getRadioReserveRecord()',
        desc: '用于 radio-config.reserve，获取已保留选中的行数据（不包含当前列表）',
        version: '',
        type: 'Row',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'getCheckboxRecords()',
        desc: '用于 type=checkbox，获取已选中的行数据',
        version: '',
        type: 'Array<Row>',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'getCheckboxReserveRecords()',
        desc: '用于 checkbox-config.reserve，获取已保留选中的行数据（不包含当前列表）',
        version: '',
        type: 'Array<Row>',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'getCheckboxIndeterminateRecords()',
        desc: '用于 tree-config 和 type=checkbox，获取半选状态的行数据',
        version: '',
        type: 'Array<Row>',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'getRowExpandRecords()',
        desc: '用于 expand-config，用于展开行，获取已展开的行数据',
        version: '',
        type: 'Array<Row>',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'getTreeExpandRecords()',
        desc: '用于 tree-config，用于树表格，获取已展开的节点（注意，即使父节点被收起，只要该节点还处于展开状态都能获取到）',
        version: '',
        type: 'Array<Row>',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'getActiveRecord()',
        desc: '用于 edit-config，获取已激活的行数据',
        version: '',
        type: '{row,rowIndex,$rowIndex,column,columnIndex,$columnIndex}',
        enum: '',
        defVal: 'row',
        list: []
      },
      {
        name: 'getSelectedCell()',
        desc: '用于 mouse-config.selected，获取选中的单元格信息',
        version: '',
        type: '{row,column}',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'getCellAreas()',
        desc: '如果功能被支持，用于 mouse-config.area，用于获取鼠标选择的所有区域',
        version: 'pro',
        type: 'Array<{cols: ColumnConfig[], rows: any[]}>',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'getActiveCellArea()',
        desc: '如果功能被支持，用于 mouse-config.area，用于获取区域中的活动单元格',
        version: 'pro',
        type: '{column: ColumnConfig, row: any}',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'getCopyCellArea()',
        desc: '如果功能被支持，用于 mouse-config.area，用于获取被标记为复制状态的区域',
        version: 'pro',
        type: '{cols: ColumnConfig[], rows: any[]}',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'getScroll()',
        desc: '获取表格的滚动状态',
        version: '',
        type: '{virtualX, virtualY, scrollTop, scrollLeft}',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'isActiveByRow(row)',
        desc: '用于 edit-config，判断行是否为激活编辑状态',
        version: '',
        type: 'Boolean',
        enum: '',
        defVal: 'row',
        list: []
      },
      {
        name: 'isInsertByRow(row)',
        desc: '用于 edit-config，判断行是否为插入的临时数据',
        version: '',
        type: 'Boolean',
        enum: '',
        defVal: 'row: Row',
        list: []
      },
      {
        name: 'isUpdateByRow(row, field)',
        desc: '只对 keep-source 开启有效，判断行数据是否发生改变',
        version: '',
        type: 'Boolean',
        enum: '',
        defVal: 'row: Row, field?: string',
        list: []
      },
      {
        name: 'isAllCheckboxChecked()',
        desc: '用于 type=checkbox，判断复选行是否被全部选中',
        version: '',
        type: 'Boolean',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'isCheckedByCheckboxRow(row)',
        desc: '用于 type=checkbox，判断复选行数据是否勾选',
        version: '',
        type: 'Boolean',
        enum: '',
        defVal: 'row: Row',
        list: []
      },
      {
        name: 'isCheckedByRadioRow(row)',
        desc: '用于 type=radio，判断单选行数据是否勾选',
        version: '',
        type: 'Boolean',
        enum: '',
        defVal: 'row: Row',
        list: []
      },
      {
        name: 'isExpandByRow(row)',
        desc: '用于 expand-config，判断行是否为展开状态',
        version: '',
        type: 'Boolean',
        enum: '',
        defVal: 'row',
        list: []
      },
      {
        name: 'isRowExpandLoaded(row)',
        desc: '用于 expand-config.lazy，用于懒加载展开行，判断展开行是否懒加载完成',
        version: '',
        type: 'Boolean',
        enum: '',
        defVal: 'row',
        list: []
      },
      {
        name: 'isTreeExpandByRow(row)',
        desc: '用于 tree-config，判断行是否为树形节点展开状态',
        version: '',
        type: 'Boolean',
        enum: '',
        defVal: 'row: Row',
        list: []
      },
      {
        name: 'isTreeExpandLoaded(row)',
        desc: '用于 tree-config.lazy，用于懒加载树表格，判断树节点是否懒加载完成',
        version: '',
        type: 'Boolean',
        enum: '',
        defVal: 'row: Row',
        list: []
      },
      {
        name: 'isFilter(column)',
        desc: '判断指定列是否为筛选状态，如果为空则判断所有列',
        version: '',
        type: 'Boolean',
        enum: '',
        defVal: 'column?: Column',
        list: []
      },
      {
        name: 'setFilter(column, options)',
        desc: '用于 filters，修改筛选列表（在筛选条件更新之后可以调用 updateData 函数处理表格数据）',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'column: Column, options: []',
        list: []
      },
      {
        name: 'setActiveRow(row,opts)',
        desc: '用于 edit-config，激活行编辑，如果是 mode=cell 则默认激活第一个单元格, opts 其他参数 { noScrollColumn: true }',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'row: Row',
        list: []
      },
      {
        name: 'setActiveCell(row, field)',
        desc: '用于 edit-config，激活单元格编辑',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'row: Row, field: string',
        list: []
      },
      {
        name: 'setSelectCell(row, field)',
        desc: '用于 mouse-config.selected，选中指定的单元格',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'row: Row, field: string',
        list: []
      },
      {
        name: 'setCellAreas(areas)',
        desc: '如果功能被支持，用于 mouse-config.area，选择指定区域的单元格',
        version: 'pro',
        type: 'Promise',
        enum: '',
        defVal: 'areas: CellAreaOptions',
        list: []
      },
      {
        name: 'setMergeCells(merges)',
        desc: '临时合并单元格，如果为数组则合并多个',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'merges: MergeOptions | MergeOptions[]',
        list: []
      },
      {
        name: 'setMergeFooterItems(merges)',
        desc: '临时合并表尾，如果为数组则合并多个',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'merges: MergeOptions | MergeOptions[]',
        list: []
      },
      {
        name: 'setRowExpand(rows, checked)',
        desc: '用于 expand-config，设置展开行，二个参数设置这一行展开与否',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'rows: Row | Array<Row>, checked: boolean',
        list: []
      },
      {
        name: 'setAllRowExpand(checked)',
        desc: '用于 expand-config，设置所有行的展开与否（如果是关闭所有行，可以使用 clearRowExpand 快速清除）',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'checked: boolean',
        list: []
      },
      {
        name: 'setTreeExpand(rows, checked)',
        desc: '用于 tree-config，设置展开树形节点，二个参数设置这一行展开与否',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'rows: Row | Array<Row>, checked: boolean',
        list: []
      },
      {
        name: 'setAllTreeExpand(checked)',
        desc: '用于 tree-config，设置所有树节点的展开与否（如果是关闭所有树节点，可以使用 clearTreeExpand 快速清除）',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'checked: boolean',
        list: []
      },
      {
        name: 'setCurrentRow(row,change)',
        desc: '用于 highlight-current-row，设置某一行为高亮状态; 当change为true时触发current-change事件',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'row: Row',
        list: []
      },
      {
        name: 'setCurrentColumn(column)',
        desc: '用于 highlight-current-column，设置某列行为高亮状态',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'column: ColumnConfig',
        list: []
      },
      {
        name: 'setRadioRow(row)',
        desc: '用于 type=radio，设置某一行为选中状态',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'row: Row',
        list: []
      },
      {
        name: 'setCheckboxRow(rows, checked)',
        desc: '用于 type=checkbox，设置行为选中状态，第二个参数为选中与否',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'rows: Row | Array<Row>, checked: boolean',
        list: []
      },
      {
        name: 'setAllCheckboxRow(checked)',
        desc: '用于 type=checkbox，设置所有行的选中状态',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'checked: boolean',
        list: []
      },
      {
        name: 'toggleCheckboxRow(row)',
        desc: '用于 type=checkbox，切换某一行的选中状态',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'row: Row',
        list: []
      },
      {
        name: 'toggleAllCheckboxRow()',
        desc: '用于 type=checkbox，切换所有行的选中状态',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'toggleRowExpand(row)',
        desc: '用于 type=expand，切换展开行的状态',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'row: Row',
        list: []
      },
      {
        name: 'toggleTreeExpand(row)',
        desc: '用于 tree-config，切换展开树形节点的状态',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'row: Row',
        list: []
      },
      {
        name: 'clearMergeCells()',
        desc: '手动清除临时合并的单元格',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'clearMergeFooterItems()',
        desc: '手动清除临时合并的表尾',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'clearCurrentRow()',
        desc: '用于 highlight-current-row，手动清空当前高亮的状态',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'clearCurrentColumn()',
        desc: '用于 highlight-current-column，手动清空当前高亮的状态',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'clearRadioRow()',
        desc: '用于 type=radio，手动清空用户的选择',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'clearRadioReserve()',
        desc: '用于 radio-config.reserve，手动清空用户保留选中的行数据',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'clearCheckboxRow()',
        desc: '用于 type=checkbox，手动清空用户的选择',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'clearCheckboxReserve()',
        desc: '用于 checkbox-config.reserve，手动清空用户保留选中的行数据',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'clearRowExpand()',
        desc: '用于 type=expand，手动清空展开行状态，数据会恢复成未展开的状态',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'clearRowExpandLoaded()',
        desc: '用于 expand-config.lazy，手动清空懒加载展开行的状态，数据会恢复成未展开的状态，当再次展开时会重新加载',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'clearTreeExpand()',
        desc: '用于 tree-config，手动清空树形节点的展开状态，数据会恢复成未展开的状态',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'clearTreeExpandLoaded()',
        desc: '用于 tree-config.lazy，手动清空懒加载树节点的状态，数据会恢复成未展开的状态，当再次展开时会重新加载',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'clearSort()',
        desc: '手动清空排序条件，数据会恢复成未排序的状态',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'clearFilter(column)',
        desc: '手动清空筛选条件（如果不传 column 则清空所有筛选条件），数据会恢复成未筛选的状态',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'column?: ColumnConfig',
        list: []
      },
      {
        name: 'clearSelected()',
        desc: '手动清除单元格选中状态',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'clearActived()',
        desc: '手动清除单元格激活状态',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      // {
      //   name: 'clearCopyed()',
      //   desc: '手动清空已复制的内容',
      //   type: 'Promise',
      //   enum: '',
      //   defVal: '',
      //   list: []
      // },
      {
        name: 'clearCellAreas()',
        desc: '如果功能被支持，用于 mouse-config.area，手动清除鼠标选择的区域',
        version: 'pro',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'clearCopyCellArea()',
        desc: '如果功能被支持，用于 mouse-config.area，手动清除标记为复制粘贴的区域',
        version: 'pro',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'clearData(rows, field)',
        desc: '手动清空单元格内容，如果不创参数，则清空整个表格内容，如果传了行则清空指定行内容，如果传了指定字段，则清空该字段内容',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'rows?: Row | Array<Row>, field?: string',
        list: []
      },
      {
        name: 'clearScroll()',
        desc: '手动清除滚动相关信息，还原到初始状态',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'clearValidate()',
        desc: '手动清除校验',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'clearAll()',
        desc: '手动清除表格所有条件，还原到初始状态（对于增删改查的场景中可能会用到，比如在数据保存之后清除表格缓存）',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'resetColumn(options)',
        desc: '手动重置列的显示隐藏、列宽拖动的状态；如果为 true 则重置所有状态（如果已关联工具栏，则会同步更新）',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'options: boolean | object',
        list: [
          {
            name: 'visible',
            desc: '是否重置可视列状态',
            version: '',
            type: 'Boolean',
            enum: '',
            defVal: 'true',
            list: []
          },
          {
            name: 'resizable',
            desc: '是否重置列宽拖动状态',
            version: '',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          }
        ]
      },
      {
        name: 'closeFilter()',
        desc: '手动关闭筛选面板（某些特殊场景可能会用到）',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'clostTooltip()',
        desc: '手动关闭 tooltip 提示（某些特殊场景可能会用到）',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'closeMenu()',
        desc: '手动关闭快捷菜单（某些特殊场景可能会用到）',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'updateFooter()',
        desc: '手动更新表尾（对于某些需要频繁更新的场景下可能会用到）',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'updateStatus(scope)',
        desc: '更新单元格状态（当使用自定义渲染时可能会用到）',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'scope: { row, column }',
        list: []
      },
      {
        name: 'hideColumn(column)',
        desc: '隐藏指定列',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'column: ColumnConfig',
        list: []
      },
      {
        name: 'showColumn(column)',
        desc: '显示指定列',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'column: ColumnConfig',
        list: []
      },
      {
        name: 'scrollTo(scrollLeft, scrollTop)',
        desc: '如果有滚动条，则滚动到对应的位置',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'scrollLeft?: number, scrollTop?: number',
        list: []
      },
      {
        name: 'scrollToRow(row, column)',
        desc: '如果有滚动条，则滚动到对应的行（对于某些特定的场景可能会用到，比如定位到某一行）',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'row: Row, column?: ColumnConfig',
        list: []
      },
      {
        name: 'scrollToColumn(column)',
        desc: '如果有滚动条，则滚动到对应的列（对于某些特定的场景可能会用到，比如定位到某一列）',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'column: ColumnConfig',
        list: []
      },
      {
        name: 'scrollToCondition(functions)',
        desc: '如果有滚动条，则滚动到对应值的那一行',
        version: '',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      // {
      //   name: 'scrollToTreeRow(row)',
      //   desc: '对于树形结构中，可以直接滚动到指定深层节点中（对于某些特定的场景可能会用到，比如定位到某一节点）',
      //   version: '',
      //   type: 'Promise',
      //   enum: '',
      //   defVal: 'column: ColumnConfig',
      //   list: []
      // },
      {
        name: 'sort(field, order)',
        desc: '手动对表格进行排序（如果 order 为空则自动切换排序）',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'field: string, order?: \'desc\' | \'asc\'',
        list: []
      },
      {
        name: 'recalculate(refull)',
        desc: '重新计算表格，如果传 true 则进行完整计算（对于某些特殊场景可能会用到，比如隐藏的表格、重新计算列宽...等）',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'refull?: boolean',
        list: []
      },
      {
        name: 'refreshScroll()',
        desc: '刷新滚动操作，手动同步滚动相关位置（对于某些特殊的操作，比如滚动条错位、固定列不同步）',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'validate(rows, callback)',
        desc: '快速校验，如果存在记录不通过的记录，则返回不再继续校验（异步校验除外）；如果第一个参数为 true 则校验当前表格数据，如果指定 row 或 rows 则校验指定行或多行，如果不指定数据，则默认只校验临时变动的数据，例如新增或修改。该回调函数会在校验结束后被调用 callback(errMap)。若不传入回调函数，则会返回一个 promise',
        version: '',
        type: 'Promise<ErrMap>',
        enum: '',
        defVal: 'rows?: Row | Row[], callback?: Function',
        list: []
      },
      {
        name: 'fullValidate(rows, callback)',
        desc: '完整校验，和 validate 的区别就是会给有效数据中的每一行进行校验',
        version: '',
        type: 'Promise<ErrMap>',
        enum: '',
        defVal: 'rows?: Row | Row[], callback?: Function',
        list: []
      },
      {
        name: 'exportData(options)',
        desc: '将表格数据导出（只支持基本数据结构，目前不支持分组、合并等；树结构和虚拟滚动只允许导出数据源）',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'options: object',
        list: XEUtils.clone(exportDataAPI, true)
      },
      {
        name: 'openExport(options)',
        desc: '打开高级导出（只对 export-config 启用后有效）',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'options: object',
        list: XEUtils.clone(exportDataAPI.filter(item => !['columns', 'data', 'download', 'columnFilterMethod', 'dataFilterMethod', 'footerFilterMethod'].includes(item.name)), true).concat([
          {
            name: 'isPrint',
            desc: '是否需要打印按钮',
            version: '',
            type: 'Boolean',
            enum: '',
            defVal: 'true',
            list: []
          }
        ])
      },
      {
        name: 'importData(options)',
        desc: '将数据导入表格（只支持基本数据结构，目前不支持分组、合并等）',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'options: object',
        list: XEUtils.clone(importDataAPI, true)
      },
      {
        name: 'openImport(options)',
        desc: '打开高级导入（只对 import-config 启用后有效）',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'options: object',
        list: XEUtils.clone(importDataAPI, true)
      },
      {
        name: 'print(options)',
        desc: '打印（只支持基本数据结构，目前不支持分组、合并等）',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: 'options: object',
        list: XEUtils.clone(printAPI, true)
      },
      {
        name: 'readFile(options)',
        desc: '读取本地文件',
        version: '',
        type: 'Promise<Event>',
        enum: '',
        defVal: 'options: object',
        list: [
          {
            name: 'multiple',
            desc: '是否允许多选',
            version: '',
            type: 'Boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'types',
            desc: '支持选取的文件类型',
            version: '',
            type: 'Array',
            enum: '',
            defVal: '[\'csv\', \'html\', \'xml\', \'txt\']',
            list: []
          },
          {
            name: 'message',
            desc: '是否显示内置的消息提示',
            version: '',
            type: 'Boolean',
            enum: '',
            defVal: 'true',
            list: []
          }
        ]
      },
      {
        name: 'openFind()',
        desc: '如果功能被支持，用于 mouse-config.area，打开单元格查找功能',
        version: 'pro',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'openReplace()',
        desc: '如果功能被支持，用于 mouse-config.area，打开单元格替换功能',
        version: 'pro',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'focus()',
        desc: '使表格获取焦点',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'blur()',
        desc: '使表格失去焦点',
        version: '',
        type: 'Promise',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'showColumnModal()',
        desc: '显示列选择窗口',
        version: '',
        type: '',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: '通用平台扩展方法',
        desc: '',
        version: '',
        type: '',
        enum: '',
        defVal: '',
        list: XEUtils.clone(platformMethods, true)
      }
    ]
  }
]

export default apis
