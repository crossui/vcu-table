<template>
  <a-card title="分页">
    <a-alert type="info" class="mb-10">
      <div slot="message">
        <div>使用插槽 <span class="blue-text">v-slot:pagination</span></div>
        <div>
          设置属性 <span class="blue-text">paginationAlign</span>对齐方式
          默认"right" 可选值 （left，center，right）
        </div>
        <div>
          配合<span class="orange-text">antd-vue</span>
          <span class="blue-text"> Pagination </span> 分页组件使用
        </div>
      </div>
    </a-alert>
    <vxe-table
      border
      :loading="loading"
      :columns="tableColumn"
      :data="tableData"
      paginationAlign="center"
    >
      <template v-slot:pagination>
        <a-pagination
          v-model="pagination.current"
          :total="pagination.total"
          :defaultPageSize="pagination.pageSize"
          :showSizeChanger="pagination.showSizeChanger"
          :pageSizeOptions="pagination.pageSizeOptions"
          :showQuickJumper="pagination.showQuickJumper"
          @change="onPageChange"
        />
      </template>
    </vxe-table>
  </a-card>
</template>
<script>
import * as api from "@/api/page";
export default {
  data() {
    return {
      loading: false,
      tableColumn: [
        { type: "seq", title: "seq" },
        { field: "name", title: "Name" },
        { field: "role", title: "Role" },
        { field: "sex", title: "Sex" },
        { field: "age", title: "Age" },
        { field: "address", title: "Address" },
        { field: "rate", title: "Rate" },
        { field: "date3", title: "Date" },
        { field: "updateTime", title: "UpdateTime" },
        { field: "createTime", title: "CreateTime" },
      ],
      tableData: [],
      pagination: {
        current: 1,
        total: 0,
        pageSize: 10,
        pageSizeOptions: ["10", "20", "30", "40", "50"],
        showSizeChanger: true,
        showQuickJumper: true,
      },
    };
  },
  mounted() {
    this.getPageDatas();
  },
  methods: {
    async getPageDatas() {
      this.loading = true;
      let res = await api.getPageData({
        page: this.pagination.pageSize,
        limit: this.pagination.current,
      });
      this.loading = false;

      if (res) {
        this.tableData = res.data.payload.data;
        this.pagination.total = res.data.payload.count;
      }
    },
    onPageChange(page, pageSize) {
      this.pagination.pageSize = pageSize;
      this.pagination.current = page;
      this.getPageDatas();
    },
  },
};
</script>
