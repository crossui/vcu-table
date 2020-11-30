<template>
  <a-card title="单选框">
    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          单选表格，用户手动选中时会触发事件
          <span class="blue-text">radio-change</span>，还通过
          <span class="blue-text">highlight</span> 设置高亮选中行
        </div>
      </a-alert>
      <a-button-group class="mb-10">
        <a-button @click="$refs.xTable1.setRadioRow(tableData[1])"
          >设置第二行选中</a-button
        >
        <a-button @click="clearRadioRowEevnt">取消选中</a-button>
        <a-button @click="getRadioEvent1">获取选中</a-button>
      </a-button-group>
      <vxe-table
        ref="xTable1"
        :data="tableData"
        :radio-config="{ highlight: true }"
        @radio-change="radioChangeEvent"
        border
      >
        <vxe-table-column type="radio" width="60" align="center">
          <template v-slot:header>
            <a-button
              type="link"
              size="small"
              @click="clearRadioRowEevnt"
              :disabled="!selectRow"
              >取消</a-button
            >
          </template>
        </vxe-table-column>
        <vxe-table-column field="name" title="Name"></vxe-table-column>
        <vxe-table-column field="sex" title="Sex"></vxe-table-column>
        <vxe-table-column field="age" title="Age"></vxe-table-column>
        <vxe-table-column field="address" title="address"></vxe-table-column>
      </vxe-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          可以通过 <span class="blue-text">checkMethod</span> 方法控制 radio
          是否允许禁用
        </div>
      </a-alert>

      <vxe-table
        ref="xTable2"
        :data="tableData"
        :radio-config="{ checkMethod: checkRadioMethod }"
        border
      >
        <vxe-table-column
          type="radio"
          width="60"
          align="center"
        ></vxe-table-column>
        <vxe-table-column field="name" title="Name"></vxe-table-column>
        <vxe-table-column field="sex" title="Sex"></vxe-table-column>
        <vxe-table-column field="age" title="Age"></vxe-table-column>
        <vxe-table-column field="address" title="address"></vxe-table-column>
      </vxe-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          可以通过
          <span class="blue-text"> labelField </span> 设置radio显示在哪一列
        </div>
      </a-alert>

      <vxe-table
        ref="xTable3"
        :data="tableData"
        :radio-config="{ labelField: 'name' }"
        border
      >
        <vxe-table-column
          type="radio"
          field="name"
          title="name"
        ></vxe-table-column>
        <vxe-table-column field="sex" title="Sex"></vxe-table-column>
        <vxe-table-column field="age" title="Age"></vxe-table-column>
        <vxe-table-column field="address" title="address"></vxe-table-column>
      </vxe-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          可以点击某行选中，设置
          <span class="blue-text"> trigger </span> , <span class="blue-text"> highlight-current-row </span> 同时使用
        </div>
      </a-alert>

      <vxe-table
        ref="xTable4"
        :data="tableData"
        :radio-config="{ labelField: 'name', trigger: 'row' }"
        highlight-hover-row
        highlight-current-row
        border
      >
        <vxe-table-column
          type="radio"
          field="name"
          title="name"
        ></vxe-table-column>
        <vxe-table-column field="sex" title="Sex"></vxe-table-column>
        <vxe-table-column field="age" title="Age"></vxe-table-column>
        <vxe-table-column field="address" title="address"></vxe-table-column>
      </vxe-table>
    </div>
  </a-card>
</template>
<script>
export default {
  data() {
    return {
      selectRow: null,
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
  methods: {
    radioChangeEvent({ row }) {
      this.selectRow = row;
      console.log("单选事件");
    },
    clearRadioRowEevnt() {
      this.selectRow = null;
      this.$refs.xTable1.clearRadioRow();
    },
    getRadioEvent1() {
      console.table(this.$refs.xTable1.getRadioRecord());
    },
    checkRadioMethod({ row }) {
      return row.age > 26;
    },
  },
};
</script>

