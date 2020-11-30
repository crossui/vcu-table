<template>
  <a-card title="隐藏、分组头部">
    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          设置 <span class="blue-text">show-header=false</span> 隐藏头部
        </div>
      </a-alert>
      <vxe-table :data="tableData" :show-header="false">
        <vxe-table-column type="seq" width="60"></vxe-table-column>
        <vxe-table-column field="name" title="Name"></vxe-table-column>
        <vxe-table-column field="sex" title="Sex"></vxe-table-column>
        <vxe-table-column field="age" title="Age"></vxe-table-column>
      </vxe-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          分组表头
        </div>
      </a-alert>
      <vxe-table border resizable :data="tableData">
        <vxe-table-column title="基本信息" fixed="left">
          <vxe-table-column
            type="seq"
            width="160"
          ></vxe-table-column>
          <vxe-table-column
            field="name"
            title="Name"
            width="200"
          ></vxe-table-column>
        </vxe-table-column>
        <vxe-table-column title="更多信息">
          <vxe-table-column
            field="role"
            title="Role"
          ></vxe-table-column>
          <vxe-table-column
            field="age"
            title="Age"
          ></vxe-table-column>
          <vxe-table-column title="详细信息">
            <vxe-table-column
              field="sex"
              title="Sex"
            ></vxe-table-column>
            <vxe-table-column
              field="date"
              title="Date"
              show-overflow
            ></vxe-table-column>
          </vxe-table-column>
        </vxe-table-column>
        <vxe-table-column
          field="address"
          title="Address"
          width="200"
          show-overflow
        ></vxe-table-column>
      </vxe-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          分组表头(数据源形式)
        </div>
      </a-alert>
      <vxe-table
        border
        stripe
        resizable
        height="300"
        :columns="tableColumnGroup"
        :data="tableDataGroup"
      ></vxe-table>
    </div>
  </a-card>
</template>
<script>
export default {
  data() {
    return {
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
      tableColumnGroup: [
        { type: "seq", width: 50 },
        {
          title: "基本信息",
          children: [
            { field: "name", title: "Name" },
            {
              title: "其他信息",
              children: [
                { field: "nickname", title: "Nickname" },
                { field: "age", title: "Age" },
              ],
            },
            { field: "sex", title: "Sex" },
          ],
        },
        { field: "address", title: "Address", showOverflow: true },
      ],
      tableDataGroup: [
        {
          id: 10001,
          name: "Test1",
          nickname: "T1",
          role: "Develop",
          sex: "Man",
          age: 28,
          address: "Shenzhen",
        },
        {
          id: 10002,
          name: "Test2",
          nickname: "T2",
          role: "Test",
          sex: "Women",
          age: 22,
          address: "Guangzhou",
        },
        {
          id: 10003,
          name: "Test3",
          nickname: "T3",
          role: "PM",
          sex: "Man",
          age: 32,
          address: "Shanghai",
        },
        {
          id: 10004,
          name: "Test4",
          nickname: "T4",
          role: "Designer",
          sex: "Women ",
          age: 23,
          address: "Shenzhen",
        },
        {
          id: 10005,
          name: "Test5",
          nickname: "T5",
          role: "Develop",
          sex: "Women ",
          age: 30,
          address: "Shanghai",
        },
        {
          id: 10006,
          name: "Test6",
          nickname: "T6",
          role: "Designer",
          sex: "Women ",
          age: 21,
          address: "Shenzhen",
        },
        {
          id: 10007,
          name: "Test7",
          nickname: "T7",
          role: "Test",
          sex: "Man ",
          age: 29,
          address: "Shenzhen",
        },
        {
          id: 10008,
          name: "Test8",
          nickname: "T8",
          role: "Develop",
          sex: "Man ",
          age: 35,
          address: "Shenzhen",
        },
      ],
    };
  },
};
</script>

