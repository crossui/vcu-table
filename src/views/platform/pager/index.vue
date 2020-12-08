<template>
  <a-card title="分页">
    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            通过
            <span class="blue-text"> onPageLoad </span>
            事件获取 total
          </div>
          <div>
            分页 <span class="blue-text"> onPageChange </span> 事件
            发生变化，调用表格
            <span class="blue-text"> getTableListData </span> 方法获取新数据
          </div>
        </div>
      </a-alert>
      <div class="mb-5"></div>
      <vcu-table
        ref="xTable"
        :loadOptions="options"
        show-overflow
        @onPageLoad="onPageLoad"
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
      </vcu-table>
    </div>
  </a-card>
</template>
<script>
export default {
  data() {
    return {
      options: {
        headUrl: "dataq/api/header/getApproveArrearageList",
        pageUrl: "dataq/api/page/getApproveArrearageList",
        pageFormData: {
          page: 1,
          limit: 10,
        },
      },
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
  mounted() {},
  methods: {
    onPageLoad(obj) {
      this.pagination.total = obj.count;
      console.info(obj);
    },
    onPageChange(page, pageSize) {
      this.pagination.pageSize = pageSize;
      this.pagination.current = page;
      this.options.pageFormData.page = page;
      this.options.pageFormData.limit = pageSize;
      this.$refs.xTable.getTableListData();
    },
  },
};
</script>

