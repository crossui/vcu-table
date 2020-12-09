<template>
  <a-card title="自定义模板">
    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            使用
            <span class="blue-text"> slot </span> 方式
          </div>
        </div>
      </a-alert>

      <vcu-table
        ref="xTable"
        isLazy
        height="300"
        show-footer
        :footer-method="footerMethod"
        :loadOptions="options"
        :edit-config="{ trigger: 'click', mode: 'cell' }"
      >
        <template v-slot:pName_header>
          <span class="red-text">姓名</span>
        </template>
        <template v-slot:pName_footer>
          <div class="red-text">统计</div>
        </template>
        <template v-slot:pName_default="{ row }">
          <div class="blue-text">{{ row.pName }}</div>
        </template>
        <template v-slot:pName_edit="scope">
          <a-input
            size="small"
            v-model="scope.row.pName"
            @input="$refs.xTable.updateStatus(scope)"
          ></a-input>
        </template>
        <template v-slot:action_default>
          <a-button-group size="small">
            <a-button>编辑</a-button>
            <a-button>删除</a-button>
          </a-button-group>
        </template>
      </vcu-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            使用
            <span class="blue-text"> jsx </span> 方式
          </div>
        </div>
      </a-alert>

      <vcu-table
        ref="xTable1"
        isLazy
        height="300"
        show-footer
        :footer-method="footerMethod"
        :loadOptions="options1"
        :edit-config="{ trigger: 'click', mode: 'cell' }"
      ></vcu-table>
    </div>
  </a-card>
</template>
<script>
export default {
  data() {
    return {
      options: {
        headUrl: "dataq/api/header/getApproveArrearageListAction",
        pageUrl: "dataq/api/page/getApproveArrearageList",
        customRender: [
          {
            key: "pName",
            params: {
              editRender: true,
              slots: {
                header: "pName_header",
                footer: "pName_footer",
                default: "pName_default",
                edit: "pName_edit",
              },
            },
          },
          {
            key: "action",
            params: {
              slots: {
                default: "action_default",
              },
            },
          },
        ],
      },
      options1: {
        headUrl: "dataq/api/header/getApproveArrearageListAction",
        pageUrl: "dataq/api/page/getApproveArrearageList",
        customRender: [
          {
            key: "pName",
            params: {
              editRender: true,
              slots: {
                header: ({ row }) => {
                  return [<span class="red-text">姓名</span>];
                },
                footer: ({ row }) => {
                  return [<div class="red-text">统计</div>];
                },
                default: ({ row }) => {
                  return [<div class="blue-text">{row.pName}</div>];
                },
                edit: ({ row }) => {
                  return [
                    <a-input
                      size="small"
                      class="my-input"
                      v-model={row.pName}
                    />,
                  ];
                },
              },
            },
          },
          {
            key: "action",
            params: {
              slots: {
                default: ({ row }) => {
                  return [
                    <a-button-group size="small">
                      <a-button>编辑</a-button>
                      <a-button>删除</a-button>
                    </a-button-group>,
                  ];
                },
              },
            },
          },
        ],
      },
    };
  },
  mounted() {},
  methods: {
    footerMethod({ columns, data }) {
      const footerData = [
        columns.map((column, columnIndex) => {
          if (columnIndex == 1) {
            return data.length;
          }
          return null;
        }),
      ];
      return footerData;
    },
  },
};
</script>

