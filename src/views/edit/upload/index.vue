<template>
  <v-card title="文件上传">
    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            文件上传，可以通过调用
            <span class="blue-text"> readFile </span> 读取本地文件
          </div>
        </div>
      </v-alert>

      <v-button-group class="mb-5">
        <v-button status="primary" @click="insertEvent()">选择文件</v-button>
        <v-button status="primary" @click="insertEvent({ multiple: true })">
          选择多个
        </v-button>
        <v-button @click="$refs.xTable.removeCheckboxRow()">删除选中</v-button>
        <v-button @click="getInsertEvent">保存</v-button>
      </v-button-group>

      <vcu-table
        ref="xTable"
        :data="tableData"
        :edit-config="{
          trigger: 'click',
          mode: 'row',
        }"
      >
        <vcu-table-column type="checkbox" width="60"></vcu-table-column>
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column
          field="name"
          title="Name"
          :edit-render="{ autofocus: '.my-input' }"
        >
          <template v-slot:edit="scope">
            <v-input
              size="small"
              v-model="scope.row.name"
              @input="$refs.xTable.updateStatus(scope)"
              class="my-input"
            ></v-input>
          </template>
        </vcu-table-column>
        <vcu-table-column field="type" title="Type"></vcu-table-column>
        <vcu-table-column field="size" title="Size"></vcu-table-column>
        <vcu-table-column field="date" title="Date"></vcu-table-column>
      </vcu-table>
    </div>
  </v-card>
</template>
<script>
import XEUtils from "xe-utils";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {},
  methods: {
    insertEvent(opts) {
      this.$refs.xTable.readFile(opts).then((evnt) => {
        let records = Array.from(evnt.target.files).map((file) => {
          let ns = file.name.split(".");
          let name = ns.slice(0, ns.length - 1).join("");
          let type = ns[ns.length - 1];
          return {
            name: name,
            size: file.size,
            type: type,
            date: XEUtils.toDateString(new Date()),
          };
        });
        this.$refs.xTable.insert(records);
      });
    },
    getInsertEvent() {
      let insertRecords = this.$refs.xTable.getInsertRecords();
      this.$info({
        content: insertRecords.length,
      });
    },
  },
};
</script>

