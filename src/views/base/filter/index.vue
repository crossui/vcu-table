<template>
  <v-card title="筛选">
    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            通过设置 <span class="blue-text">filters</span> 属性和
            <span class="blue-text">filter-method</span>
            方法可以开启列筛选功能，通过
            <span class="blue-text">filter-multiple=false</span> 设置为单选
          </div>
          <div>
            如果是服务端筛选，只需加上
            <span class="blue-text">filter-config={remote: true}</span> 和
            <span class="blue-text">filter-change</span> 事件就可以实现
          </div>
          <div>
            如果是动态数据请通过 setFilter 方法更新，参数
            <span class="blue-text">filters</span> 不支持动态数据
          </div>
          <div>
            默认的筛选，通过
            <span class="blue-text">checked</span> 属性设置默认的选中的选项
          </div>
          <div>$panel 对象（查看高级用法）:</div>
          <div style="padding-left: 40px">
            <span class="orange-text"
              >changeOption(event, checked, option)</span
            >
            更新选项的状态
          </div>
          <div style="padding-left: 40px">
            <span class="orange-text">confirmFilter()</span> 确认筛选
          </div>
          <div style="padding-left: 40px">
            <span class="orange-text">resetFilter()</span> 清除筛选条件
          </div>
        </div>
      </v-alert>
      <vcu-table :data="tableData">
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column
          field="name"
          title="Name"
          sortable
          :filters="[
            { label: 'id大于10002', value: 10002 },
            { label: 'id大于10003', value: 10003, checked: true },
          ]"
          :filter-method="filterNameMethod"
        ></vcu-table-column>
        <vcu-table-column
          field="sex"
          title="Sex"
          :filters="[
            { label: 'Man', value: 'Man' },
            { label: 'Woman', value: 'Woman' },
          ]"
          :filter-multiple="false"
        ></vcu-table-column>
        <vcu-table-column
          field="age"
          title="Age"
          :filters="[{ data: '' }]"
          :filter-method="filterAgeMethod"
        >
          <template v-slot:filter="{ $panel, column }">
            <v-input
              allowClear
              v-for="(option, index) in column.filters"
              :key="index"
              v-model="option.data"
              @change="$panel.changeOption($event, !!option.data, option)"
            />
          </template>
        </vcu-table-column>
      </vcu-table>
    </div>

    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          改变图标，通过设置
          <span class="blue-text">filter-config={iconMatch, iconMatch}</span>
          局部替换默认的图标，例如第三方图标库：<span class="red-text">inconfont</span>
        </div>
      </v-alert>
      <vcu-table
        :data="tableData"
        :filter-config="{
          iconNone: 'iconfont icon-filter',
          iconMatch: 'iconfont icon-filter-fill',
        }"
      >
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column field="name" title="Name"></vcu-table-column>
        <vcu-table-column
          field="sex"
          title="Sex"
          :filters="[
            { label: 'Man', value: 'Man' },
            { label: 'Woman', value: 'Woman' },
          ]"
          :filter-multiple="false"
        ></vcu-table-column>
        <vcu-table-column field="age" title="Age"></vcu-table-column>
      </vcu-table>
    </div>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "好好学习天天向上",
        },
        {
          id: 10002,
          name: "Test2",
          role: "Test",
          sex: "Woman",
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
          sex: "Woman",
          age: 24,
          address: "Shanghai",
        },
      ],
    };
  },
  methods: {
    filterNameMethod({ value, row, column }) {
      return row.id >= value;
    },
    filterAgeMethod({ option, row }) {
      return row.age == option.data;
    },
  },
};
</script>

