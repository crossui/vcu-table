<template>
  <a-card title="自定义模板">
    <div class="mb-30">
      <vcu-table
        ref="xTree"
        tree-config
        :columns="tableColumn"
        :data="tableData"
        max-height="400"
        :edit-config="{ trigger: 'click', mode: 'cell' }"
      >
      </vcu-table>
    </div>
  </a-card>
</template>
<script>
import XEUtils from "xe-utils";
import datas from "../data.js";
export default {
  data() {
    return {
      tableColumn: [
        { type: "seq", width: 160, treeNode: true, title: "Number" },
        {
          field: "name",
          title: "Name",
          editRender: { autofocus: ".my-input" },
          slots: {
            default: (scope) => {
              return [
                <span class="blue-text">{scope.row.name}</span>,
                <span class="red-text ml-10">{scope.row.name}</span>,
              ];
            },
            edit: (scope) => {
              return [
                <a-input
                  size="small"
                  class="my-input"
                  v-model={scope.row.name}
                />,
              ];
            },
          },
        },
        { field: "size", title: "Size" },
        { field: "date", title: "Date" },
      ],
      tableData: datas,
    };
  },
  methods: {},
};
</script>

