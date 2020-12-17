<template>
  <a-card title="test">
    <div class="mb-30">
      <a-button @click="$refs.xTable1.showColumnModal()" class="mb-5">
        列选择
      </a-button>
      <vcu-table ref="xTable1" :data="tableData" customModalShow>
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column field="name" title="Name"></vcu-table-column>
        <vcu-table-column field="sex" title="Sex"></vcu-table-column>
        <vcu-table-column
          field="age"
          title="Age"
          :visible="false"
        ></vcu-table-column>
      </vcu-table>
    </div>

    <div class="mb-30">
      <a-button @click="$refs.xTable2.showColumnModal()" class="mb-5">
        列选择
      </a-button>
      <vcu-table ref="xTable2" border :data="tableData" customModalShow>
        <vcu-table-column title="基本信息" fixed="left">
          <vcu-table-column type="seq" width="160"></vcu-table-column>
          <vcu-table-column
            field="name"
            title="Name"
            width="200"
          ></vcu-table-column>
        </vcu-table-column>
        <vcu-table-column title="更多信息">
          <vcu-table-column field="role" title="Role"></vcu-table-column>
          <vcu-table-column field="age" title="Age"></vcu-table-column>
          <vcu-table-column title="详细信息">
            <vcu-table-column field="sex" title="Sex"></vcu-table-column>
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
  </a-card>
</template>
<script>
export default {
  data() {
    return {
      tableColumn: [
        { type: "seq", width: 50 },
        { field: "name", title: "Name" },
        { field: "sex", title: "Sex", showHeaderOverflow: true },
        { field: "address", title: "Address", showOverflow: true },
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

      tableColumnGroup: [
        { type: "seq", width: 50, title: "序号", visible: true },
        {
          title: "基本信息",
          children: [
            { field: "name", title: "Name", visible: true },
            {
              title: "其他信息",
              children: [
                { field: "nickname", title: "Nickname", visible: true },
                { field: "age", title: "Age", visible: true },
              ],
            },
            { field: "sex", title: "Sex", visible: true },
          ],
        },
        {
          field: "address",
          title: "Address",
          showOverflow: true,
          visible: true,
        },
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

