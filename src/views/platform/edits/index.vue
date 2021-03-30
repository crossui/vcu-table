<template>
  <v-card title="可编辑">
    <div class="mb-30">
      <v-button-group class="mb-5">
        <v-button @click="insertEvent(-1)">新增</v-button>
        <v-button @click="editEvent">编辑</v-button>
        <v-button @click="saveEvent">保存</v-button>
        <v-button @click="revertEvent">还原</v-button>
      </v-button-group>
      <vcu-table
        ref="xTable"
        keep-source
        :row-class-name="rowClassName"
        :loadOptions="options"
        @cell-click="cellClickEvent"
        :edit-config="{ trigger: 'manual', mode: 'row' }"
        max-height="200"
      >
      </vcu-table>
    </div>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      currRowIndex: 0,
      options: {
        headUrl: "dataq/api/bigDataHeader",
        pageUrl: "dataq/api/bigDataPage",
        seq: true,
        customRender: [
          {
            key: "hospDepartCode",
            params: {
              editRender: { autofocus: ".my-input" },
              slots: {
                edit: ({ row }) => {
                  return [
                    <v-input
                      size="small"
                      class="my-input"
                      v-model={row.hospDepartCode}
                    />,
                  ];
                },
              },
            },
          },
          {
            key: "inputCode",
            params: {
              editRender: true,
              slots: {
                edit: ({ row }) => {
                  return [<v-input size="small" v-model={row.inputCode} />];
                },
              },
            },
          },
          {
            key: "inHospWardName",
            params: {
              editRender: true,
              slots: {
                edit: ({ row }) => {
                  return [
                    <v-input size="small" v-model={row.inHospWardName} />,
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
    rowClassName({ rowIndex, $rowIndex }) {
      if (this.currRowIndex == $rowIndex) {
        return "bg-green";
      }
    },
    cellClickEvent({ rowIndex, $rowIndex, seq, _rowIndex }) {
      console.info(
        `rowIndex: ${rowIndex}`,
        `$rowIndex: ${$rowIndex}`,
        `seq: ${seq}`,
        `_rowIndex: ${_rowIndex}`
      );
      this.currRowIndex = $rowIndex;
    },
    async insertEvent(row) {
      let record = {
        inHospDeptName: "1111",
      };
      let { row: newRow } = await this.$refs.xTable.insertAt(record, row);
      await this.$refs.xTable.setActiveCell(newRow, "hospDepartCode");
    },
    editEvent() {
      let row = this.$refs.xTable.getData(this.currRowIndex);
      this.$refs.xTable.setActiveRow(row);
    },
    saveEvent() {
      const {
        insertRecords,
        removeRecords,
        updateRecords,
      } = this.$refs.xTable.getRecordset();
      this.$info({
        content: `insertRecords=${insertRecords.length} removeRecords=${removeRecords.length} updateRecords=${updateRecords.length}`,
      });
    },
    revertEvent() {
      let _this = this;
      this.$confirm({
        title: "提示",
        content: "您确定要还原数据吗?",
        onOk() {
          _this.$refs.xTable.revertData();
        },
      });
    },
  },
};
</script>

