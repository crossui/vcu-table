<template>
  <a-card title="自定义模板">
    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          设置 <span class="blue-text">type=html</span> 显示为 HTML
          标签，不支持和其他功能列共存
          <div class="red-text">
            动态渲染任意 HTML 是非常危险的，很容易导致 XSS
            攻击，请确保内容是可信的
          </div>
        </div>
      </a-alert>
      <vxe-table :data="tableData">
        <vxe-table-column type="seq" width="60"></vxe-table-column>
        <vxe-table-column
          field="name"
          title="Name"
          type="html"
          :formatter="formatName"
        ></vxe-table-column>
        <vxe-table-column field="sex" title="Sex"></vxe-table-column>
        <vxe-table-column field="age" title="Age"></vxe-table-column>
      </vxe-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          使用
          <span class="blue-text">slot</span>
          自定义模板；可以实现自定义任意内容及 html 元素
        </div>
      </a-alert>
      <vxe-table show-footer :data="tableData" :footer-method="footerMethod">
        <vxe-table-column type="seq" width="60">
          <template v-slot:header>
            <div class="red-text">序号</div>
          </template>
          <template v-slot:footer>
            <div class="blue-text">合计</div>
          </template>
        </vxe-table-column>
        <vxe-table-column field="name" title="Name">
          <template v-slot="{ row }">
            <a href="">{{ row.name }}</a>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="sex"
          title="Sex"
          :filters="[{ data: '' }]"
          :filter-method="filterSexMethod"
        >
          <template v-slot:filter="{ $panel, column }">
            <template v-for="(option, index) in column.filters">
              <a-input
                class="my-filter"
                v-model="option.data"
                :key="index"
                @change="changeFilterEvent($event, option, $panel)"
              />
            </template>
          </template>
        </vxe-table-column>
        <vxe-table-column field="age" title="Age">
          <template v-slot="{ row, rowIndex }">
            <template v-if="rowIndex === 1">
              <a-switch default-checked />
            </template>
            <template v-else>
              <span v-if="row.age > 23" class="magenta-text">{{
                row.age
              }}</span>
              <span v-else class="lime-text">{{ row.age }}</span>
            </template>
          </template>
        </vxe-table-column>
        <vxe-table-column field="action" title="action">
          <template v-slot="{ row, rowIndex }">
            <a-button-group size="small">
              <a-button @click="handleAdd(row, rowIndex)" icon="user-add">
              </a-button>
              <a-button @click="handleDel(row, rowIndex)" icon="user-delete">
              </a-button>
            </a-button-group>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          通过<span class="blue-text"> slots </span>
          属性使用自定义插槽来编写模板或<span class="blue-text"> JSX </span
          >渲染函数 或<span class="blue-text"> VNode </span
          ><span class="red-text">（注：返回数组格式）</span>
        </div> </a-alert
      ><!-- show-footer  -->
      <vxe-table
        show-footer
        :columns="tableColumn"
        :data="tableData"
        :footer-method="footerMethod"
        :edit-config="{ trigger: 'click', mode: 'cell' }"
      >
        <!--自定义插槽 seq_header-->
        <template v-slot:seq_header>
          <div class="red-text">序号</div>
        </template>
        <!--自定义插槽 seq_footer-->
        <template v-slot:seq_footer>
          <div class="blue-text">统计</div>
        </template>
      </vxe-table>
    </div>

  </a-card>
</template>
<script>
export default {
  data() {
    return {
      tableColumn: [
        {
          type: "seq",
          width: 50,
          // 对应自定义插槽的名称
          slots: { header: "seq_header", footer: "seq_footer" },
        },
        { field: "name", title: "Name" },
        {
          field: "sex",
          title: "Sex",
          showHeaderOverflow: true,
          filters: [{ data: "" }],
          filterMethod: this.filterSexMethod,
          slots: {
            filter: ({ column, $panel }) => {
              return column.filters.map((option) => {
                return (
                  <a-input
                    size="small"
                    v-model={option.data}
                    onChange={(evnt) =>
                      this.changeFilterEvent(evnt, option, $panel)
                    }
                  />
                );
              });
            },
          },
        },
        {
          field: "address",
          title: "Address",
          showOverflow: true,
          editRender: { autofocus: ".my-input" },
          slots: {
            // 使用 JSX 渲染
            default: ({ row }) => {
              return [<span class="orange-text">{row.address}</span>];
            },
            header: ({ column }) => {
              return [
                <span>
                  <i>@</i>
                  <span style="color: red;">{column.title}</span>
                </span>,
              ];
            },
            footer: ({ items, _columnIndex }) => {
              return [
                <a-button type="primary" size="small">
                  按钮
                </a-button>,
              ];
            },
            edit: ({ row }) => {
              return [
                <a-input size="small" class="my-input" v-model={row.address} />,
              ];
            },
          },
        },
      ],
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
    };
  },
  methods: {
    formatName({ cellValue }) {
      return `<a>${cellValue}</a>`;
    },
    footerMethod({ columns, data }) {
      return [
        columns.map((column, columnIndex) => {
          if (["name"].includes(column.property)) {
            return data.length;
          }
          return null;
        }),
      ];
    },
    filterSexMethod({ option, row }) {
      return row.sex === option.data;
    },
    changeFilterEvent(evnt, option, $panel) {
      $panel.changeOption(evnt, !!option.data, option);
    },
    handleAdd(row, index) {
      console.info(row, index);
    },
    handleDel(row, index) {
      console.info(row, index);
    },
  },
};
</script>

