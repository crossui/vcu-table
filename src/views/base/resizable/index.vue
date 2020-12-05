<template>
  <a-card title="列宽拖动">
    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          使用 <span class="blue-text"> resizable </span>属性启用列宽拖动功能
        </div>
      </a-alert>
      <vcu-table :data="tableData" resizable border>
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column field="name" title="Name"></vcu-table-column>
        <vcu-table-column field="sex" title="Sex"></vcu-table-column>
        <vcu-table-column field="age" title="Age"></vcu-table-column>
        <vcu-table-column field="address" title="address"></vcu-table-column>
      </vcu-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          使用 <span class="blue-text"> columns </span>表头数据源的<span class="blue-text"> resizable </span>属性值启用列宽拖动功能
        </div>
      </a-alert>
      <vcu-table :columns="tableColumn" :data="tableData" border></vcu-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          左右固定列宽拖动（固定左不允许超过固定右，固定右不允许超过固定左）
        </div>
      </a-alert>
      <vcu-table :data="tableData" resizable border>
        <vcu-table-column
          type="seq"
          width="160"
          fixed="left"
        ></vcu-table-column>
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
          title="address"
          width="260"
          fixed="right"
        ></vcu-table-column>
      </vcu-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          左右固定列的分组表头拖动（只允许列拖动，不允许分组标题拖动）
        </div>
      </a-alert>
      <vcu-table border resizable :data="tableData">
        <vcu-table-column title="基本信息" fixed="left">
          <vcu-table-column
            type="seq"
            width="160"
            fixed="left"
          ></vcu-table-column>
          <vcu-table-column
            field="name"
            title="Name"
            width="200"
            fixed="left"
          ></vcu-table-column>
        </vcu-table-column>
        <vcu-table-column title="更多信息">
          <vcu-table-column
            field="role"
            title="Role"
            width="600"
          ></vcu-table-column>
          <vcu-table-column
            field="age"
            title="Age"
            width="600"
          ></vcu-table-column>
          <vcu-table-column title="详细信息">
            <vcu-table-column
              field="sex"
              title="Sex"
              width="600"
            ></vcu-table-column>
            <vcu-table-column
              field="date"
              title="Date"
              width="600"
              show-overflow
            ></vcu-table-column>
          </vcu-table-column>
        </vcu-table-column>
        <vcu-table-column
          field="address"
          title="Address"
          width="200"
          show-overflow
          fixed="right"
        ></vcu-table-column>
      </vcu-table>
    </div>
  </a-card>
</template>
<script>
export default {
  data() {
    return {
      tableColumn: [
        { type: "seq", width: 50, resizable: false },
        { field: "name", title: "Name", resizable: true },
        {
          field: "sex",
          title: "Sex",
          showHeaderOverflow: true,
          resizable: true,
        },
        {
          field: "address",
          title: "Address",
          showOverflow: true,
          resizable: true,
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
};
</script>

