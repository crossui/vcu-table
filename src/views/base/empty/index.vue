<template>
  <a-card title="空数据">
    <div class="mb-30">
      <vxe-table :data="tableData">
        <vxe-table-column type="seq" width="60"></vxe-table-column>
        <vxe-table-column field="name" title="Name"></vxe-table-column>
        <vxe-table-column field="sex" title="Sex"></vxe-table-column>
        <vxe-table-column field="age" title="Age"></vxe-table-column>
      </vxe-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          可以通过 <span class="blue-text">slot=empty</span> 自定义提示语
        </div>
      </a-alert>
      <vxe-table :data="tableData" empty-text="没有更多数据了！">
        <vxe-table-column type="seq" width="60"></vxe-table-column>
        <vxe-table-column field="name" title="Name"></vxe-table-column>
        <vxe-table-column field="sex" title="Sex"></vxe-table-column>
        <vxe-table-column field="age" title="Age"></vxe-table-column>
      </vxe-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          可以通过 <span class="blue-text">slot</span> 自定义模板
        </div>
      </a-alert>
      <vxe-table :data="tableData">
        <vxe-table-column type="seq" width="60"></vxe-table-column>
        <vxe-table-column
          field="name"
          title="Name"
          width="600"
        ></vxe-table-column>
        <vxe-table-column
          field="sex"
          title="Sex"
          width="600"
        ></vxe-table-column>
        <vxe-table-column
          field="age"
          title="Age"
          width="600"
        ></vxe-table-column>
        <vxe-table-column
          field="address"
          title="Address"
          width="600"
        ></vxe-table-column>
        <template v-slot:empty>
          <div style="color: red">
            <img :src="img" />
            <p>没有更多数据了！</p>
          </div>
        </template>
      </vxe-table>
    </div>
  </a-card>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  computed: {
    img() {
      return require(`@/assets/img1.gif`);
    },
  },
};
</script>

