<template>
  <a-card title="空数据">
    <div class="mb-30">
      <vcu-table :data="tableData">
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column field="name" title="Name"></vcu-table-column>
        <vcu-table-column field="sex" title="Sex"></vcu-table-column>
        <vcu-table-column field="age" title="Age"></vcu-table-column>
      </vcu-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          可以通过 <span class="blue-text">slot=empty</span> 自定义提示语
        </div>
      </a-alert>
      <vcu-table :data="tableData" empty-text="没有更多数据了！">
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column field="name" title="Name"></vcu-table-column>
        <vcu-table-column field="sex" title="Sex"></vcu-table-column>
        <vcu-table-column field="age" title="Age"></vcu-table-column>
      </vcu-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          可以通过 <span class="blue-text">slot</span> 自定义模板
        </div>
      </a-alert>
      <vcu-table :data="tableData">
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column
          field="name"
          title="Name"
          width="600"
        ></vcu-table-column>
        <vcu-table-column
          field="sex"
          title="Sex"
          width="600"
        ></vcu-table-column>
        <vcu-table-column
          field="age"
          title="Age"
          width="600"
        ></vcu-table-column>
        <vcu-table-column
          field="address"
          title="Address"
          width="600"
        ></vcu-table-column>
        <template v-slot:empty>
          <div style="color: red">
            <img :src="img" />
            <p>没有更多数据了！</p>
          </div>
        </template>
      </vcu-table>
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

