import Main from '@/views/main.vue';
export const menuRouter = [
    {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Home.vue')
    },
    {
        path: '/base',
        meta: {
            title: '基础功能'
        },
        name: 'base',
        component: Main,
        children: [{
            path: 'demo',
            meta: {
                title: 'test',
            },
            name: 'demo',
            component: () =>
                import('@/views/base/demo/index.vue')
        },{
            path: 'index',
            meta: {
                title: '基础',
            },
            name: 'baseIndex',
            component: () =>
                import('@/views/base/base_index/index.vue')
        }, {
            path: 'size',
            meta: {
                title: '尺寸',
            },
            name: 'size',
            component: () =>
                import('@/views/base/size/index.vue')
        }, {
            path: 'seq',
            meta: {
                title: '序号',
            },
            name: 'seq',
            component: () =>
                import('@/views/base/seq/index.vue')
        }, {
            path: 'width',
            meta: {
                title: '列宽',
            },
            name: 'width',
            component: () =>
                import('@/views/base/width/index.vue')
        }, {
            path: 'footer',
            meta: {
                title: '表尾数据',
            },
            name: 'footer',
            component: () =>
                import('@/views/base/footer/index.vue')
        }, {
            path: 'autoBreak',
            meta: {
                title: '自动换行',
            },
            name: 'autoBreak',
            component: () =>
                import('@/views/base/autoBreak/index.vue')
        }, {
            path: 'border',
            meta: {
                title: '边框',
            },
            name: 'border',
            component: () =>
                import('@/views/base/border/index.vue')
        }, {
            path: 'tooltip',
            meta: {
                title: '单元格工具提示',
            },
            name: 'tooltip',
            component: () =>
                import('@/views/base/tooltip/index.vue')
        }, {
            path: 'overflow',
            meta: {
                title: '单元格溢出省略号',
            },
            name: 'overflow',
            component: () =>
                import('@/views/base/overflow/index.vue')
        }, {
            path: 'stripe',
            meta: {
                title: '斑马线条纹',
            },
            name: 'stripe',
            component: () =>
                import('@/views/base/stripe/index.vue')
        }, {
            path: 'cellStyle',
            meta: {
                title: '单元格样式',
            },
            name: 'cellStyle',
            component: () =>
                import('@/views/base/cellStyle/index.vue')
        }, {
            path: 'scrollStyle',
            meta: {
                title: '滚动条样式',
            },
            name: 'scrollStyle',
            component: () =>
                import('@/views/base/scrollStyle/index.vue')
        }, {
            path: 'headers',
            meta: {
                title: '隐藏、分组头部',
            },
            name: 'headers',
            component: () =>
                import('@/views/base/headers/index.vue')
        }, {
            path: 'resizable',
            meta: {
                title: '列宽拖动',
            },
            name: 'resizable',
            component: () =>
                import('@/views/base/resizable/index.vue')
        }, {
            path: 'customCell',
            meta: {
                title: '显示/隐藏列',
            },
            name: 'customCell',
            component: () =>
                import('@/views/base/customCell/index.vue')
        }, {
            path: 'maxHeight',
            meta: {
                title: '最大高度',
            },
            name: 'maxHeight',
            component: () =>
                import('@/views/base/maxHeight/index.vue')
        }, {
            path: 'autoHeight',
            meta: {
                title: '响应式宽高',
            },
            name: 'autoHeight',
            component: () =>
                import('@/views/base/autoHeight/index.vue')
        }, {
            path: 'highlightColumn',
            meta: {
                title: '高亮列',
            },
            name: 'highlightColumn',
            component: () =>
                import('@/views/base/highlightColumn/index.vue')
        }, {
            path: 'highlightRow',
            meta: {
                title: '高亮行',
            },
            name: 'highlightRow',
            component: () =>
                import('@/views/base/highlightRow/index.vue')
        }, {
            path: 'highlightKeyboard',
            meta: {
                title: '键盘移动高亮行',
            },
            name: 'highlightKeyboard',
            component: () =>
                import('@/views/base/highlightKeyboard/index.vue')
        }, {
            path: 'radioType',
            meta: {
                title: '单选框',
            },
            name: 'radioType',
            component: () =>
                import('@/views/base/radioType/index.vue')
        }, {
            path: 'checkboxType',
            meta: {
                title: '多选框',
            },
            name: 'checkboxType',
            component: () =>
                import('@/views/base/checkboxType/index.vue')
        }, {
            path: 'sort',
            meta: {
                title: '排序',
            },
            name: 'sort',
            component: () =>
                import('@/views/base/sort/index.vue')
        }, {
            path: 'filter',
            meta: {
                title: '筛选',
            },
            name: 'filter',
            component: () =>
                import('@/views/base/filter/index.vue')
        }, {
            path: 'empty',
            meta: {
                title: '空数据',
            },
            name: 'empty',
            component: () =>
                import('@/views/base/empty/index.vue')
        }, {
            path: 'loading',
            meta: {
                title: '加载效果',
            },
            name: 'loading',
            component: () =>
                import('@/views/base/loading/index.vue')
        }, {
            path: 'page',
            meta: {
                title: '分页',
            },
            name: 'page',
            component: () =>
                import('@/views/base/page/index.vue')
        }, {
            path: 'expand',
            meta: {
                title: '展开行',
            },
            name: 'expand',
            component: () =>
                import('@/views/base/expand/index.vue')
        }, {
            path: 'groupBy',
            meta: {
                title: '行分组',
            },
            name: 'groupBy',
            component: () =>
                import('@/views/base/groupBy/index.vue')
        }, {
            path: 'spanMethod',
            meta: {
                title: '合并行或列',
            },
            name: 'spanMethod',
            component: () =>
                import('@/views/base/spanMethod/index.vue')
        }, {
            path: 'formatter',
            meta: {
                title: '格式化内容',
            },
            name: 'formatter',
            component: () =>
                import('@/views/base/formatter/index.vue')
        }, {
            path: 'template',
            meta: {
                title: '自定义模板',
            },
            name: 'template',
            component: () =>
                import('@/views/base/template/index.vue')
        }, {
            path: 'event',
            meta: {
                title: '事件绑定',
            },
            name: 'event',
            component: () =>
                import('@/views/base/event/index.vue')
        }, {
            path: 'contextMenu',
            meta: {
                title: '右键快捷菜单',
            },
            name: 'contextMenu',
            component: () =>
                import('@/views/base/contextMenu/index.vue')
        }, {
            path: 'customData',
            meta: {
                title: '数据格式与字段',
            },
            name: 'customData',
            component: () =>
                import('@/views/base/customData/index.vue')
        }, {
            path: 'reverse',
            meta: {
                title: '反转表格',
            },
            name: 'reverse',
            component: () =>
                import('@/views/base/reverse/index.vue')
        }, {
            path: 'tabs',
            meta: {
                title: 'Tab 页签切换',
            },
            name: 'tabs',
            component: () =>
                import('@/views/base/tabs/index.vue')
        }, {
            path: 'export',
            meta: {
                title: '导出',
            },
            name: 'export',
            component: () =>
                import('@/views/base/export/index.vue')
        }, {
            path: 'print',
            meta: {
                title: '打印',
            },
            name: 'print',
            component: () =>
                import('@/views/base/print/index.vue')
        }]
    },
    {
        path: '/edit',
        meta: {
            title: '编辑表格'
        },
        name: 'edit',
        component: Main,
        children: [{
            path: 'popupForm',
            meta: {
                title: '弹框编辑',
            },
            name: 'popupForm',
            component: () =>
                import('@/views/edit/popupForm/index.vue')
        }, {
            path: 'manual',
            meta: {
                title: '手动触发',
            },
            name: 'manual',
            component: () =>
                import('@/views/edit/manual/index.vue')
        }, {
            path: 'click',
            meta: {
                title: '点击触发',
            },
            name: 'click',
            component: () =>
                import('@/views/edit/click/index.vue')
        }, {
            path: 'dbclick',
            meta: {
                title: '双击触发',
            },
            name: 'dbclick',
            component: () =>
                import('@/views/edit/dbclick/index.vue')
        }, {
            path: 'operate',
            meta: {
                title: '数据操作',
            },
            name: 'operate',
            component: () =>
                import('@/views/edit/operate/index.vue')
        }, {
            path: 'editDisable',
            meta: {
                title: '禁止编辑',
            },
            name: 'editDisable',
            component: () =>
                import('@/views/edit/editDisable/index.vue')
        }, {
            path: 'validator',
            meta: {
                title: '数据校验',
            },
            name: 'validator',
            component: () =>
                import('@/views/edit/validator/index.vue')
        }, {
            path: 'keyboard',
            meta: {
                title: '键盘导航',
            },
            name: 'keyboard',
            component: () =>
                import('@/views/edit/keyboard/index.vue')
        }, {
            path: 'immediately',
            meta: {
                title: '实时更新数据',
            },
            name: 'immediately',
            component: () =>
                import('@/views/edit/immediately/index.vue')
        }, {
            path: 'realtimeSave',
            meta: {
                title: '实时保存',
            },
            name: 'realtimeSave',
            component: () =>
                import('@/views/edit/realtimeSave/index.vue')
        }, {
            path: 'editMenu',
            meta: {
                title: '快捷菜单',
            },
            name: 'editMenu',
            component: () =>
                import('@/views/edit/editMenu/index.vue')
        }, {
            path: 'upload',
            meta: {
                title: '文件上传',
            },
            name: 'upload',
            component: () =>
                import('@/views/edit/upload/index.vue')
        }]
    },
    {
        path: '/bigData',
        meta: {
            title: '大数据表格'
        },
        name: 'bigData',
        component: Main,
        children: [{
            path: 'scroll',
            meta: {
                title: '虚拟滚动',
            },
            name: 'scroll',
            component: () =>
                import('@/views/bigData/scroll/index.vue')
        }, {
            path: 'editVild',
            meta: {
                title: '可编辑及数据校验',
            },
            name: 'editVild',
            component: () =>
                import('@/views/bigData/editVild/index.vue')
        }, {
            path: 'partialLoad',
            meta: {
                title: '局部加载',
            },
            name: 'partialLoad',
            component: () =>
                import('@/views/bigData/partialLoad/index.vue')
        }]
    },
    {
        path: '/platform',
        meta: {
            title: '通用平台'
        },
        name: 'platform',
        component: Main,
        children: [{
            path: 'basics',
            meta: {
                title: '基础',
            },
            name: 'basics',
            component: () =>
                import('@/views/platform/basics/index.vue')
        }, {
            path: 'fixed-columns-and-header',
            meta: {
                title: '固定头和列',
            },
            name: 'fixed-columns-and-header',
            component: () =>
                import('@/views/platform/fixed-columns-and-header/index.vue')
        }, {
            path: 'pager',
            meta: {
                title: '分页',
            },
            name: 'pager',
            component: () =>
                import('@/views/platform/pager/index.vue')
        }, {
            path: 'lazyLoad',
            meta: {
                title: '懒加载',
            },
            name: 'lazyLoad',
            component: () =>
                import('@/views/platform/lazyLoad/index.vue')
        }, {
            path: 'template',
            meta: {
                title: '自定义模板',
            },
            name: 'customTemplate',
            component: () =>
                import('@/views/platform/template/index.vue')
        }, {
            path: 'optional',
            meta: {
                title: '可选择',
            },
            name: 'optional',
            component: () =>
                import('@/views/platform/optional/index.vue')
        }, {
            path: 'indexs',
            meta: {
                title: '索引',
            },
            name: 'indexs',
            component: () =>
                import('@/views/platform/indexs/index.vue')
        }, {
            path: 'filters',
            meta: {
                title: '筛选',
            },
            name: 'filters',
            component: () =>
                import('@/views/platform/filters/index.vue')
        }, {
            path: 'total',
            meta: {
                title: '合计',
            },
            name: 'total',
            component: () =>
                import('@/views/platform/total/index.vue')
        }, {
            path: 'headerGroup',
            meta: {
                title: '分组表头',
            },
            name: 'headerGroup',
            component: () =>
                import('@/views/platform/headerGroup/index.vue')
        }, {
            path: 'functions',
            meta: {
                title: '功能操作',
            },
            name: 'functions',
            component: () =>
                import('@/views/platform/functions/index.vue')
        }]
    },
    {
        path: '/api',
        meta: {
            title: 'api文档'
        },
        name: 'api',
        component: Main,
        children: [{
            path: 'vcu-table-api',
            meta: {
                title: 'vcu-table',
            },
            name: 'vcu-table-api',
            component: () =>
                import('@/views/api/vcu-table-api/index.vue')
        }, {
            path: 'vcu-table-column-api',
            meta: {
                title: 'vcu-table-column',
            },
            name: 'vcu-table-column-api',
            component: () =>
                import('@/views/api/vcu-table-column-api/index.vue')
        }]
    },
];