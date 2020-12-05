<template>
  <a-card title="显示/隐藏列">
    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            通过
            <span class="blue-text">visible</span>
            属性设置默认是否显示，也可以通过函数式调用
            <span class="blue-text">showColumn、hideColumn</span>
            操作列的显示/隐藏
          </div>
          <div>
            还可以通过动态修改列的
            <span class="blue-text">visible</span>
            属性，可以实现远程读取配置后控制是否显示，最后调用
            <span class="blue-text">refreshColumn</span> 刷新列
          </div>
          <div>
            通过
            <span class="blue-text">resetColumn</span> 函数重置全部列为可视状态
          </div>
        </div>
      </a-alert>
      <a-button-group class="mb-10">
        <a-button
          @click="
            $refs.xTable1.hideColumn($refs.xTable1.getColumnByField('name'))
          "
          >隐藏name</a-button
        >
        <a-button
          @click="
            $refs.xTable1.showColumn($refs.xTable1.getColumnByField('name'))
          "
          >显示name</a-button
        >
        <a-button
          @click="
            $refs.xTable1.showColumn($refs.xTable1.getColumnByField('sex'))
          "
          >显示sex</a-button
        >
        <a-button @click="$refs.xTable1.resetColumn()">重置</a-button>
      </a-button-group>

      <vcu-table ref="xTable1" :data="tableData">
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column field="name" title="Name"></vcu-table-column>
        <vcu-table-column
          field="sex"
          title="Sex"
          :visible="false"
        ></vcu-table-column>
        <vcu-table-column field="age" title="Age"></vcu-table-column>
      </vcu-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          如果是根据服务端数据控制显示/隐藏列，在获取到配置信息后动态更改列的
          <span class="blue-text">visible</span> 属性，然后调用
          <span class="blue-text">refreshColumn</span> 属性列即可
        </div>
      </a-alert>
      <div class="mb-5">
        <template v-for="(column, index) in tableColumn">
          <a-checkbox
            v-model="column.visible"
            :key="index"
            @change="$refs.xTable2.refreshColumn()"
            >{{ column.title }}</a-checkbox
          >
        </template>
      </div>
      <vcu-table ref="xTable2" :data="tableData">
        <vcu-table-column type="seq" width="60" title="Seq"></vcu-table-column>
        <vcu-table-column field="name" title="Name"></vcu-table-column>
        <vcu-table-column field="sex" title="Sex"></vcu-table-column>
        <vcu-table-column field="age" title="Age"></vcu-table-column>
      </vcu-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          采用 <span class="blue-text">columns</span> 数据源形式更简单方便
        </div>
      </a-alert>
      <div class="mb-5">
        <template v-for="(column, index) in tableColumn1">
          <a-checkbox v-model="column.visible" :key="index">{{
            column.title
          }}</a-checkbox>
        </template>
      </div>
      <vcu-table
        ref="xTable3"
        :data="tableData"
        :columns="tableColumn1"
      ></vcu-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">分组表头</div>
      </a-alert>
      <div class="mb-5">
        <template v-for="(column, index) in tableColumnGroup">
          <template v-if="column.children">
            <template v-for="(subColumn, subIndex) in column.children">
              <template v-if="subColumn.children">
                <template
                  v-for="(subsubColumn, subsubIndex) in subColumn.children"
                >
                  <a-checkbox
                    v-model="subsubColumn.visible"
                    :key="'subchildren-' + subsubIndex"
                    >{{ subsubColumn.title }}</a-checkbox
                  >
                </template>
              </template>
              <template v-else>
                <a-checkbox
                  v-model="subColumn.visible"
                  :key="'children-' + subIndex"
                  >{{ subColumn.title }}</a-checkbox
                >
              </template>
            </template>
          </template>
          <template v-else>
            <a-checkbox v-model="column.visible" :key="index">{{
              column.title
            }}</a-checkbox>
          </template>
        </template>
      </div>
      <vcu-table
        ref="xTable4"
        border
        :data="tableDataGroup"
        :columns="tableColumnGroup"
      ></vcu-table>
    </div>
  </a-card>
</template>
<script>
export default {
  data() {
    return {
      tableColumn1: [
        { type: "seq", width: 50, title: "Seq", visible: true },
        { field: "name", title: "Name", visible: false },
        { field: "sex", title: "Sex", visible: true },
        { field: "address", title: "Address", visible: true },
      ],
      tableColumn: [],
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

      tableColumnGroup: [
        { type: "seq", width: 50, title: "序号", visible: true },
        {
          title: "基本信息",
          children: [
            { field: "name", title: "Name", visible: true },
            {
              title: "其他信息",
              children: [
                { field: "nickname", title: "Nickname", visible: true },
                { field: "age", title: "Age", visible: true },
              ],
            },
            { field: "sex", title: "Sex", visible: true },
          ],
        },
        {
          field: "address",
          title: "Address",
          showOverflow: true,
          visible: true,
        },
      ],
      tableDataGroup: [
        {
          id: 10001,
          name: "Test1",
          nickname: "T1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "Shenzhen",
        },
        {
          id: 10002,
          name: "Test2",
          nickname: "T2",
          role: "Test",
          sex: "Women",
          age: 22,
          address: "Guangzhou",
        },
        {
          id: 10003,
          name: "Test3",
          nickname: "T3",
          role: "PM",
          sex: "Man",
          age: 32,
          address: "Shanghai",
        },
        {
          id: 10004,
          name: "Test4",
          nickname: "T4",
          role: "Designer",
          sex: "Women ",
          age: 23,
          address: "Shenzhen",
        },
        {
          id: 10005,
          name: "Test5",
          nickname: "T5",
          role: "Develop",
          sex: "Women ",
          age: 30,
          address: "Shanghai",
        },
        {
          id: 10006,
          name: "Test6",
          nickname: "T6",
          role: "Designer",
          sex: "Women ",
          age: 21,
          address: "Shenzhen",
        },
        {
          id: 10007,
          name: "Test7",
          nickname: "T7",
          role: "Test",
          sex: "Man ",
          age: 29,
          address: "Shenzhen",
        },
        {
          id: 10008,
          name: "Test8",
          nickname: "T8",
          role: "Develop",
          sex: "Man ",
          age: 35,
          address: "Shenzhen",
        },
      ],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.tableColumn = this.$refs.xTable2.getColumns();
    });

    setTimeout(() => {
      // 将指定列设置为隐藏状态
      this.tableColumn.forEach((column) => {
        if (["name"].includes(column.property)) {
          column.visible = false;
        }
      });
      if (this.$refs.xTable2) {
        this.$refs.xTable2.refreshColumn();
      }
    }, 200);
  },
  methods: {},
};
</script>

