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
            title: '基础表格'
        },
        name: 'base',
        component: Main,
        children: [{
            path: 'index',
            meta: {
                title: '基础',
            },
            name: 'baseIndex',
            component: () =>
                import('@/views/base/base_index/index.vue')
        },{
            path: 'size',
            meta: {
                title: '尺寸',
            },
            name: 'size',
            component: () =>
                import('@/views/base/size/index.vue')
        },{
            path: 'seq',
            meta: {
                title: '序号',
            },
            name: 'seq',
            component: () =>
                import('@/views/base/seq/index.vue')
        },{
            path: 'width',
            meta: {
                title: '列宽',
            },
            name: 'width',
            component: () =>
                import('@/views/base/width/index.vue')
        }]
    },
    {
        path: '/complex',
        meta: {
            title: '复杂表格'
        },
        name: 'complex',
        component: Main,
        children: [{
            path: 'event',
            meta: {
                title: '事件绑定',
            },
            name: 'event',
            component: () =>
                import('@/views/complex/event/index.vue')
        }]
    },
];