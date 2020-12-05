<template>
  <a-card title="排序">
    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            通过给需要排序功能的列加上
            <span class="blue-text">sortable</span>
            属性可以支持排序，还可以通过设置
            <span class="blue-text">sort-by</span> 多字段进行排序
          </div>
          <div>
            如果是服务端排序，只需加上
            <span class="blue-text">sort-config.remote</span> 和
            <span class="blue-text">sort-change</span> 事件就可以实现
          </div>
          <div>
            还可以通过调用 <span class="blue-text">sort</span> 方法实现手动排序
          </div>
        </div>
      </a-alert>
      <a-button-group class="mb-10">
        <a-button @click="$refs.xTable1.sort('name', 'asc')"
          >Name 升序</a-button
        >
        <a-button @click="$refs.xTable1.sort('name', 'desc')"
          >Name 降序</a-button
        >
        <a-button @click="$refs.xTable1.clearSort()">清除排序</a-button>
      </a-button-group>
      <vcu-table ref="xTable1" :data="tableData" border>
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column field="name" title="Name" sortable></vcu-table-column>
        <vcu-table-column field="sex" title="Sex" sortable></vcu-table-column>
        <vcu-table-column field="age" title="Age" sortable></vcu-table-column>
        <vcu-table-column
          field="address"
          title="Address"
          sortable
        ></vcu-table-column>
      </vcu-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          配置
          <span class="blue-text">sort-by</span>
          多个字段排序
        </div>
      </a-alert>

      <vcu-table ref="xTable2" :data="tableData" border>
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column field="name" title="单个排序 Name" sortable>
          <template #default="{ row }"
            ><span class="red-text"> 名字：{{ row.name }} </span></template
          >
        </vcu-table-column>
        <vcu-table-column
          field="sex"
          title="多字段排序 Age+Sex"
          :sort-by="['sex', 'age']"
          sortable
        ></vcu-table-column>
        <vcu-table-column field="age" title="Age" sortable></vcu-table-column>
        <vcu-table-column
          field="address"
          title="Address"
          sortable
        ></vcu-table-column>
      </vcu-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          配置
          <span class="blue-text">sort-method</span>
          自定义排序
        </div>
      </a-alert>

      <vcu-table ref="xTable3" :data="tableData" border>
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column
          field="name"
          title="Name"
          :sort-method="sortNameMethod"
          sortable
        ></vcu-table-column>
        <vcu-table-column field="sex" title="Sex" sortable></vcu-table-column>
        <vcu-table-column field="age" title="Age" sortable></vcu-table-column>
        <vcu-table-column
          field="address"
          title="Address"
          sortable
        ></vcu-table-column>
      </vcu-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          通过 <span class="blue-text">defaultSort</span> 默认排序、<span
            class="blue-text"
            >orders</span
          >
          自定义轮转顺序、通过配置
          <span class="blue-text">trigger</span> 设置触发源
        </div>
      </a-alert>

      <vcu-table
        ref="xTable4"
        :sort-config="{
          trigger: 'cell',
          defaultSort: { field: 'age', order: 'desc' },
          orders: ['desc', 'asc', null],
        }"
        @sort-change="sortChangeEvent"
        :data="tableData"
        border
      >
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column field="name" title="Name" sortable></vcu-table-column>
        <vcu-table-column field="sex" title="Sex" sortable></vcu-table-column>
        <vcu-table-column field="age" title="Age" sortable></vcu-table-column>
        <vcu-table-column
          field="address"
          title="Address"
          sortable
        ></vcu-table-column>
      </vcu-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          通过 <span class="blue-text">header-cell-click</span> 设置触发源
        </div>
      </a-alert>

      <vcu-table
        ref="xTable5"
        :data="tableData"
        border
        @header-cell-click="headerCellClickEvent"
      >
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column field="name" title="Name" sortable></vcu-table-column>
        <vcu-table-column field="sex" title="Sex" sortable></vcu-table-column>
        <vcu-table-column field="age" title="Age" sortable></vcu-table-column>
        <vcu-table-column
          field="address"
          title="Address"
          sortable
        ></vcu-table-column>
      </vcu-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          改变图标，通过设置
          <span class="blue-text">sort-config={iconAsc, iconDesc}</span>
          局部替换默认的图标  <span class="red-text">(注：项目中须自己下载iconfont包)</span>
        </div>
      </a-alert>

      <vcu-table
        ref="xTable6"
        :data="tableData"
        :sort-config="{
          iconAsc: 'iconfont icon-up',
          iconDesc: 'iconfont icon-down',
        }"
        border
      >
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column field="name" title="Name" sortable></vcu-table-column>
        <vcu-table-column field="sex" title="Sex" sortable></vcu-table-column>
        <vcu-table-column field="age" title="Age" sortable></vcu-table-column>
        <vcu-table-column
          field="address"
          title="Address"
          sortable
        ></vcu-table-column>
      </vcu-table>
    </div>
  </a-card>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 10001,
          name: "Test11111",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "好好学习天天向上",
        },
        {
          id: 10002,
          name: "Test2",
          role: "Test",
          sex: "Women",
          age: 22,
          address: "Guangzhou",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "Man",
          age: 32,
          address: "Shanghai",
        },
        {
          id: 10004,
          name: "Test4",
          role: "Designer",
          sex: "Women ",
          age: 24,
          address: "Shanghai",
        },
      ],
    };
  },
  methods: {
    sortNameMethod(a, b) {
      return a.name.length > b.name.length;
    },
    sortChangeEvent({ column, property, order }) {
      console.info(column, property, order);
    },
    headerCellClickEvent({
      column,
      triggerResizable,
      triggerSort,
      triggerFilter,
    }) {
      // 如果触发了列的其他功能按钮
      if (
        column.sortable &&
        !(triggerResizable || triggerSort || triggerFilter)
      ) {
        if (column.order === "desc") {
          this.$refs.xTable5.clearSort();
        } else if (column.order === "asc") {
          this.$refs.xTable5.sort(column.property, "desc");
        } else {
          this.$refs.xTable5.sort(column.property, "asc");
        }
      }
    },
  },
};
</script>
<style>
.vcu-cell--sort .iconfont {
  font-size: 12px;
}
.vcu-cell--sort .icon-down {
  top: 5px;
}

.vcu-cell--sort .icon-up {
  top: -5px;
}
</style>
