<template>
  <v-card title="隐藏、分组头部">
    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          设置 <span class="blue-text">show-header=false</span> 隐藏头部
        </div>
      </v-alert>
      <vcu-table :data="tableData" :show-header="false">
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column field="name" title="Name"></vcu-table-column>
        <vcu-table-column field="sex" title="Sex"></vcu-table-column>
        <vcu-table-column field="age" title="Age"></vcu-table-column>
      </vcu-table>
    </div>

    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          分组表头
        </div>
      </v-alert>
      <vcu-table border resizable :data="tableData">
        <vcu-table-column title="基本信息" fixed="left">
          <vcu-table-column
            type="seq"
            width="160"
          ></vcu-table-column>
          <vcu-table-column
            field="name"
            title="Name"
            width="200"
          ></vcu-table-column>
        </vcu-table-column>
        <vcu-table-column title="更多信息">
          <vcu-table-column
            field="role"
            title="Role"
          ></vcu-table-column>
          <vcu-table-column
            field="age"
            title="Age"
          ></vcu-table-column>
          <vcu-table-column title="详细信息">
            <vcu-table-column
              field="sex"
              title="Sex"
            ></vcu-table-column>
            <vcu-table-column
              field="date"
              title="Date"
              show-overflow
            ></vcu-table-column>
          </vcu-table-column>
        </vcu-table-column>
        <vcu-table-column
          field="address"
          title="Address"
          width="200"
          show-overflow
        ></vcu-table-column>
      </vcu-table>
    </div>

    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          分组表头(数据源形式)
        </div>
      </v-alert>
      <vcu-table
        border
        stripe
        resizable
        height="300"
        :columns="tableColumnGroup"
        :data="tableDataGroup"
      ></vcu-table>
    </div>
  </v-card>
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

