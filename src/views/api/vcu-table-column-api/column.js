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
        name: 'type',
        descKey: '列的类型',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'seq',
            descKey: '序号',
            version: '',
            type: '',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'checkbox',
            descKey: '复选框',
            version: '',
            type: '',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'radio',
            descKey: '单选框',
            version: '',
            type: '',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'expand',
            descKey: '展开行',
            version: '',
            type: '',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'html',
            descKey: 'HTML 标签（动态渲染任意 HTML 是非常危险的，很容易导致 XSS 攻击，应该确保内容是可信的）',
            version: '',
            type: '',
            enum: '',
            defVal: '',
            list: []
          }
        ]
      },
      {
        name: 'field',
        descKey: '列字段名（注：属性层级越深，渲染性能就越差，例如：aa.bb.cc.dd.ee）',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'title',
        descKey: '列标题',
        version: '',
        type: 'string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'width',
        descKey: '列宽度（如果为空则均匀分配剩余宽度，如果全部列固定了，可能会存在宽屏下不会铺满，可以配合 "%" 或者 "min-width" 布局）',
        version: '',
        type: 'number | string',
        enum: 'px, %',
        defVal: '继承 table.column-config.width',
        list: []
      },
      {
        name: 'min-width',
        descKey: '最小列宽度；会自动将剩余空间按比例分配',
        version: '',
        type: 'number | string',
        enum: 'px, %',
        defVal: '继承 table.column-config.minWidth',
        list: []
      },
      {
        name: 'resizable',
        descKey: '列是否允许拖动列宽调整大小',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: '继承 table.resizable',
        list: []
      },
      {
        name: 'visible',
        descKey: '列是否显示',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'fixed',
        descKey: '将列固定在左侧或者右侧（注意：固定列应该放在左右两侧的位置）',
        version: '',
        type: 'string',
        enum: 'left（固定左侧）, right（固定右侧）',
        defVal: '',
        list: []
      },
      {
        name: 'align',
        descKey: '列对齐方式',
        version: '',
        type: 'string',
        enum: 'left（左对齐）, center（居中对齐）, right（右对齐）',
        defVal: '继承 table.align',
        list: []
      },
      {
        name: 'header-align',
        descKey: '表头列的对齐方式',
        version: '',
        type: 'string',
        enum: 'left（左对齐）, center（居中对齐）, right（右对齐）',
        defVal: '继承 align > 继承 table.header-align',
        list: []
      },
      {
        name: 'footer-align',
        descKey: '表尾列的对齐方式',
        version: '',
        type: 'string',
        enum: 'left（左对齐）, center（居中对齐）, right（右对齐）',
        defVal: '继承 align > 继承 table.footer-align',
        list: []
      },
      {
        name: 'show-overflow',
        descKey: '当内容过长时显示为省略号',
        version: '',
        type: 'string | boolean',
        enum: 'ellipsis（只显示省略号）, title（并且显示为原生 title）, tooltip（并且显示为 tooltip 提示）',
        defVal: '继承 table.show-overflow',
        list: []
      },
      {
        name: 'show-header-overflow',
        descKey: '当表头内容过长时显示为省略号',
        version: '',
        type: 'string | boolean',
        enum: 'ellipsis（只显示省略号）, title（并且显示为原生 title）, tooltip（并且显示为 tooltip 提示）',
        defVal: '继承 table.show-header-overflow',
        list: []
      },
      {
        name: 'show-footer-overflow',
        descKey: '当表尾内容过长时显示为省略号',
        version: '',
        type: 'boolean | string',
        enum: 'ellipsis（只显示省略号）,title（并且显示为原生 title）,tooltip（并且显示为 tooltip 提示）',
        defVal: '继承 table.show-footer-overflow',
        list: []
      },
      {
        name: 'class-name',
        descKey: '给单元格附加 className，也可以是函数 Function({row, rowIndex, $rowIndex, column, columnIndex, $columnIndex})',
        version: '',
        type: 'string | Function',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'header-class-name',
        descKey: '给表头的单元格附加 className，也可以是函数 Function({$rowIndex, column, columnIndex, $columnIndex})',
        version: '',
        type: 'string | Function',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'footer-class-name',
        descKey: '给表尾的单元格附加 className，也可以是函数 Function({$rowIndex, column, columnIndex, $columnIndex})',
        version: '',
        type: 'string | Function',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'formatter',
        descKey: '格式化显示内容 Function({cellValue, row, column})',
        version: '',
        type: 'Function | any[] | string',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'seq-method',
        descKey: '只对 type=seq 有效，自定义索引方法 Function({row, rowIndex, column, columnIndex})',
        version: '',
        type: 'Function',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'sortable',
        descKey: '是否允许列排序',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
      },
      {
        name: 'sort-by',
        descKey: '只对 sortable 有效，自定义排序的属性',
        version: '',
        type: 'string | string[]',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'sort-method',
        descKey: '只对 sortable 有效，列的排序方法，该方法 Function(prevRow, nexRow) 的返回值用来决定该行的排序规则',
        version: '',
        type: 'Function',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'remote-sort',
        descKey: '是否使用服务端排序，如果设置为 true 则不会对数据进行处理',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: '继承 table.remote-sort',
        list: []
      },
      {
        name: 'filters',
        descKey: '配置筛选条件（注：筛选只能用于列表，如果是树结构则过滤根节点）',
        version: '',
        type: 'any[]',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'label',
            desc: '显示的值',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'value',
            desc: '实际的值',
            version: '',
            type: 'any',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'checked',
            desc: '默认是否选中',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'resetValue',
            desc: '重置时的默认值',
            version: '',
            type: 'any',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'data',
            desc: '自定义渲染的数据值（当使用自定义模板时可能会用到）',
            version: '',
            type: 'any',
            enum: '',
            defVal: '',
            list: []
          }
        ]
      },
      {
        name: 'filter-multiple',
        descKey: '只对 filters 有效，筛选是否允许多选',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'true',
        list: []
      },
      {
        name: 'filter-method',
        descKey: '只对 filters 有效，列的筛选方法，该方法 Function({value, row, column}) 返回值用来决定该行是否显示',
        version: '',
        type: 'Function',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'filter-render',
        descKey: '筛选渲染器配置项',
        version: '',
        type: 'any',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'name',
            desc: '渲染器名称',
            version: '',
            type: 'String',
            enum: 'input, textarea, select',
            defVal: '',
            list: []
          },
          {
            name: 'props',
            desc: '渲染的参数（请查看目标渲染的 Props）',
            version: '',
            type: 'Object',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'attrs',
            desc: '渲染的属性（请查看目标渲染的 Attribute）',
            version: '',
            type: 'Object',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'events',
            desc: '渲染组件的事件（请查看目标渲染的 Events）',
            version: '',
            type: 'Object',
            enum: '',
            defVal: '{row,rowIndex,$rowIndex,column,columnIndex,$columnIndex}, ...[目标渲染的 arguments]',
            list: []
          },
          {
            name: 'nativeEvents',
            desc: '渲染组件的原生事件（请查看目标渲染的 Events）',
            version: '',
            type: 'Object',
            enum: '',
            defVal: '{row,rowIndex,$rowIndex,column,columnIndex,$columnIndex}, ...[目标渲染的 arguments]',
            list: []
          },
          {
            name: 'content',
            desc: '渲染组件的内容（仅用于特殊组件）',
            version: '',
            type: 'String',
            enum: '',
            defVal: '',
            list: []
          }
        ]
      },
      {
        name: 'export-method',
        desc: '自定义单元格数据导出方法，该方法 Function({ row, column }) 的返回值将会被导出',
        version: '',
        type: 'Function',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'footer-export-method',
        desc: '自定义表尾单元格数据导出方法，该方法 Function({ items, _columnIndex }) 的返回值将会被导出',
        version: '',
        type: 'Function',
        enum: '',
        defVal: '',
        list: []
      },
      {
        name: 'title-help',
        desc: '标题帮助图标配置项',
        version: '',
        type: 'any',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'message',
            desc: '提示消息（支持开启国际化）',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'icon',
            desc: '自定义图标',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          }
        ]
      },
      {
        name: 'cell-type',
        descKey: '只对特定功能有效，单元格值类型（例如：导出数据类型设置）',
        version: '',
        type: 'string',
        enum: 'auto（默认自动转换），number（数值）, string（字符串）',
        defVal: 'auto',
        list: []
      },
      {
        name: 'cell-render',
        descKey: '默认的渲染器配置项',
        version: '',
        type: 'any',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'name',
            desc: '渲染器名称',
            version: '',
            type: 'string',
            enum: 'input, textarea, select',
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
            name: 'options',
            desc: '只对 name=select 有效，下拉选项列表',
            version: '',
            type: 'any[]',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'optionProps',
            desc: '只对 name=select 有效，下拉选项属性参数配置',
            version: '',
            type: 'any',
            enum: '',
            defVal: '{ value, label }',
            list: []
          },
          {
            name: 'optionGroups',
            desc: '只对 name=select 有效，下拉分组选项列表',
            version: '',
            type: 'any[]',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'optionGroupProps',
            desc: '只对 name=select 有效，下拉分组选项属性参数配置',
            version: '',
            type: 'any',
            enum: '',
            defVal: '{ options, label }',
            list: []
          },
          {
            name: 'events',
            desc: '渲染组件的事件（请查看目标渲染的 Events）',
            version: '',
            type: 'any',
            enum: '',
            defVal: '{row,rowIndex,$rowIndex,column,columnIndex,$columnIndex}, ...[目标渲染的 arguments]',
            list: []
          },
          {
            name: 'nativeEvents',
            desc: '渲染组件的原生事件（请查看目标渲染的 Events）',
            version: '',
            type: 'any',
            enum: '',
            defVal: '{row,rowIndex,$rowIndex,column,columnIndex,$columnIndex}, ...[目标渲染的 arguments]',
            list: []
          },
          {
            name: 'content',
            desc: '渲染组件的内容（仅用于特殊组件）',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          }
        ]
      },
      {
        name: 'edit-render',
        descKey: '可编辑渲染器配置项',
        version: '',
        type: 'any',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'name',
            desc: '渲染器名称',
            version: '',
            type: 'string',
            enum: 'input, textarea, select',
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
            name: 'options',
            desc: '只对 name=select 有效，下拉选项列表',
            version: '',
            type: 'any[]',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'optionProps',
            desc: '只对 name=select 有效，下拉选项属性参数配置',
            version: '',
            type: 'any',
            enum: '',
            defVal: '{ value, label }',
            list: []
          },
          {
            name: 'optionGroups',
            desc: '只对 name=select 有效，下拉分组选项列表',
            version: '',
            type: 'any[]',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'optionGroupProps',
            desc: '只对 name=select 有效，下拉分组选项属性参数配置',
            version: '',
            type: 'any',
            enum: '',
            defVal: '{ options, label }',
            list: []
          },
          {
            name: 'events',
            desc: '渲染组件的事件（请查看目标渲染的 Events）',
            version: '',
            type: 'any',
            enum: '',
            defVal: '{row,rowIndex,$rowIndex,column,columnIndex,$columnIndex}, ...[目标渲染的 arguments]',
            list: []
          },
          {
            name: 'nativeEvents',
            desc: '渲染组件的原生事件（请查看目标渲染的 Events）',
            version: '',
            type: 'any',
            enum: '',
            defVal: '{row,rowIndex,$rowIndex,column,columnIndex,$columnIndex}, ...[目标渲染的 arguments]',
            list: []
          },
          {
            name: 'content',
            desc: '渲染组件的内容（仅用于特殊组件）',
            version: '',
            type: 'string',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'autofocus',
            desc: '如果是自定义渲染可以指定聚焦的选择器，例如 .my-input',
            version: '',
            type: 'String',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'autoselect',
            desc: '是否在激活编辑之后自动选中输入框内容',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          },
          {
            name: 'defaultValue',
            desc: '默认值（插入数据时列的默认值）',
            version: '',
            type: 'any',
            enum: '',
            defVal: 'null',
            list: []
          },
          {
            name: 'immediate',
            desc: '输入值实时同步更新（默认情况下单元格编辑的值只会在被触发时同步，如果需要实时同步可以设置为 true）',
            version: '',
            type: 'boolean',
            enum: '',
            defVal: 'false',
            list: []
          }
        ]
      },
      {
        name: 'content-render',
        descKey: '内容渲染配置项',
        version: '',
        type: 'any',
        enum: '',
        defVal: '',
        list: [
          {
            name: 'name',
            desc: '渲染器名称',
            version: '',
            type: 'string',
            enum: 'input, textarea, select',
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
            name: 'options',
            desc: '只对 name=select 有效，下拉选项列表',
            version: '',
            type: 'any[]',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'optionProps',
            desc: '只对 name=select 有效，下拉选项属性参数配置',
            version: '',
            type: 'any',
            enum: '',
            defVal: '{ value, label }',
            list: []
          },
          {
            name: 'optionGroups',
            desc: '只对 name=select 有效，下拉分组选项列表',
            version: '',
            type: 'any[]',
            enum: '',
            defVal: '',
            list: []
          },
          {
            name: 'optionGroupProps',
            desc: '只对 name=select 有效，下拉分组选项属性参数配置',
            version: '',
            type: 'any',
            enum: '',
            defVal: '{ options, label }',
            list: []
          },
          {
            name: 'events',
            desc: '渲染组件的事件（请查看目标渲染的 Events）',
            version: '',
            type: 'any',
            enum: '',
            defVal: '{data, property}, ...[目标渲染的 arguments]',
            list: []
          },
          {
            name: 'nativeEvents',
            desc: '渲染组件的原生事件（请查看目标渲染的 Events）',
            version: '',
            type: 'any',
            enum: '',
            defVal: '{data, property}, ...[目标渲染的 arguments]',
            list: []
          }
        ]
      },
      {
        name: 'tree-node',
        descKey: '只对 tree-config 配置时有效，指定为树节点',
        version: '',
        type: 'boolean',
        enum: '',
        defVal: 'false',
        list: []
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
        name: 'colId',
        desc: '自定义列的唯一主键（注：非必要不需要设置，操作不正确将导致出现问题）',
        version: '',
        type: 'string | number',
        enum: '',
        defVal: '',
        list: []
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
        name: 'default',
        desc: '自定义显示内容模板',
        version: '',
        type: '',
        enum: '',
        defVal: '{row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, _columnIndex}',
        list: []
      },
      {
        name: 'header',
        desc: '自定义表头内容的模板',
        version: '',
        type: '',
        enum: '',
        defVal: '{column, columnIndex, $columnIndex, _columnIndex, $rowIndex}',
        list: []
      },
      {
        name: 'footer',
        desc: '自定义表尾内容的模板',
        version: '',
        type: '',
        enum: '',
        defVal: '{column, columnIndex, $columnIndex, _columnIndex, $rowIndex, items}',
        list: []
      },
      {
        name: 'content',
        desc: '只对 type=expand 有效，自定义展开后的内容模板',
        version: '',
        type: '',
        enum: '',
        defVal: '{row, rowIndex, $rowIndex, column}',
        list: []
      },
      {
        name: 'filter',
        desc: '只对 filter-render 启用时有效，自定义筛选模板',
        version: '',
        type: '',
        enum: '',
        defVal: '{column, columnIndex, $columnIndex}',
        list: []
      },
      {
        name: 'edit',
        desc: '只对 edit-render 启用时有效，自定义可编辑组件模板',
        version: '',
        type: '',
        enum: '',
        defVal: '{row, rowIndex, $rowIndex, column, columnIndex, $columnIndex, _columnIndex}',
        list: []
      // },
      // {
      //   name: 'icon',
      //   desc: '只对 type=expand 或 tree-node 有效，自定义图标模板',
      //   version: '',
      //   type: '',
      //   enum: '',
      //   defVal: '{row,rowIndex,$rowIndex,column,columnIndex,$columnIndex}',
      //   list: []
      }
    ]
  },
  /* {
    name: 'Events',
    descKey: '事件',
    version: '',
    type: '',
    enum: '',
    defVal: '',
    list: []
  },
  {
    name: 'Methods',
    descKey: '方法',
    version: '',
    type: '',
    enum: '',
    defVal: '',
    list: []
  } */
]

export default apis
