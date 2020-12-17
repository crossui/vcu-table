<template>
  <a-card title="多选框">
    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            用户手动选中时会触发事件
            <span class="blue-text">checkbox-change</span>还通过
            <span class="blue-text">highlight</span> 设置高亮选中行
          </div>
          <div> <span class="blue-text"> checkbox-change-get-keys </span> 事件，返回被选中的数据索引值</div>
        </div>
      </a-alert>
      <a-button-group class="mb-10">
        <a-button @click="$refs.xTable1.setCheckboxRow(tableData[1], true)"
          >设置第二行选中</a-button
        >
        <a-button
          @click="
            $refs.xTable1.setCheckboxRow([tableData[2], tableData[3]], true)
          "
          >设置第三、四行选中</a-button
        >
        <a-button @click="$refs.xTable1.setAllCheckboxRow(true)"
          >设置所有行选中</a-button
        >
        <a-button @click="clearCheckboxRowEevnt">取消选中</a-button>
        <a-button @click="getCheckboxEvent1">获取选中</a-button>
      </a-button-group>
      <vcu-table
        ref="xTable1"
        :data="tableData"
        :checkbox-config="{ highlight: true }"
        @checkbox-change="checkboxChangeEvent"
        @checkbox-change-get-keys="checkboxChangeGetKeys"
        border
      >
        <vcu-table-column
          type="checkbox"
          width="60"
          align="center"
        ></vcu-table-column>
        <vcu-table-column field="name" title="Name"></vcu-table-column>
        <vcu-table-column field="sex" title="Sex"></vcu-table-column>
        <vcu-table-column field="age" title="Age"></vcu-table-column>
        <vcu-table-column field="address" title="address"></vcu-table-column>
      </vcu-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          可以通过 <span class="blue-text">checkMethod</span> 方法控制 checkbox
          是否允许禁用
        </div>
      </a-alert>

      <vcu-table
        ref="xTable2"
        :data="tableData"
        :checkbox-config="{ checkMethod: checkCheckboxMethod }"
        border
      >
        <vcu-table-column
          type="checkbox"
          width="60"
          align="center"
        ></vcu-table-column>
        <vcu-table-column field="name" title="Name"></vcu-table-column>
        <vcu-table-column field="sex" title="Sex"></vcu-table-column>
        <vcu-table-column field="age" title="Age"></vcu-table-column>
        <vcu-table-column field="address" title="address"></vcu-table-column>
      </vcu-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          还可以通过
          <span class="blue-text">strict</span>
          设置为严格模式，当表格中不存在有效数据时列头复选框为禁用状态
        </div>
      </a-alert>

      <vcu-table
        :data="tableData"
        :checkbox-config="{ strict: true, checkMethod: checCheckboxkMethod }"
        border
      >
        <vcu-table-column
          type="checkbox"
          width="60"
          align="center"
        ></vcu-table-column>
        <vcu-table-column field="name" title="Name"></vcu-table-column>
        <vcu-table-column field="sex" title="Sex"></vcu-table-column>
        <vcu-table-column field="age" title="Age"></vcu-table-column>
        <vcu-table-column field="address" title="address"></vcu-table-column>
      </vcu-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          可以通过
          <span class="blue-text"> labelField </span> 设置checkbox显示在哪一列
        </div>
      </a-alert>

      <vcu-table
        ref="xTable3"
        :data="tableData"
        :checkbox-config="{ labelField: 'name' }"
        border
      >
        <vcu-table-column
          type="checkbox"
          field="name"
          title="name"
        ></vcu-table-column>
        <vcu-table-column field="sex" title="Sex"></vcu-table-column>
        <vcu-table-column field="age" title="Age"></vcu-table-column>
        <vcu-table-column field="address" title="address"></vcu-table-column>
      </vcu-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          可以点击某行选中，设置
          <span class="blue-text"> trigger </span> ,
          <span class="blue-text"> highlight-current-row </span> 同时使用
        </div>
      </a-alert>

      <vcu-table
        ref="xTable4"
        :data="tableData"
        :checkbox-config="{ labelField: 'name', trigger: 'row' }"
        highlight-hover-row
        highlight-current-row
        border
      >
        <vcu-table-column
          type="checkbox"
          field="name"
          title="name"
        ></vcu-table-column>
        <vcu-table-column field="sex" title="Sex"></vcu-table-column>
        <vcu-table-column field="age" title="Age"></vcu-table-column>
        <vcu-table-column field="address" title="address"></vcu-table-column>
      </vcu-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          默认选中，通过指定
          <span class="blue-text">checkRowKeys</span>
          设置默认选中的行，指定默认值需要有 row-id
          <div class="red-text">注：默认行为只会在 reload 之后触发一次</div>
        </div>
      </a-alert>
      <div class="mb-5">
        <a-button @click="handleUpdateCheckbox">更新默认选中</a-button>
      </div>
      <vcu-table
        ref="xTableUpdate"
        :data="tableData"
        row-id="id"
        :checkbox-config="{ checkRowKeys: defaultSelecteRows }"
        border
      >
        <vcu-table-column type="checkbox" width="60"></vcu-table-column>
        <vcu-table-column field="name" title="name"></vcu-table-column>
        <vcu-table-column field="sex" title="Sex"></vcu-table-column>
        <vcu-table-column field="age" title="Age"></vcu-table-column>
        <vcu-table-column field="address" title="address"></vcu-table-column>
      </vcu-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          <div>多选可和单选同时使用</div>
          <div>
            通过
            <span class="blue-text"> checkStrictly </span>
            设置父子节点不互相关联，启用后 showHeader 默认为 false
          </div>
        </div>
      </a-alert>

      <vcu-table
        :data="tableData"
        border
        :checkbox-config="{ checkStrictly: true }"
        :radio-config="{ labelField: 'name' }"
      >
        <vcu-table-column type="checkbox" width="60"></vcu-table-column>
        <vcu-table-column
          type="radio"
          field="name"
          title="name"
        ></vcu-table-column>
        <vcu-table-column field="sex" title="Sex"></vcu-table-column>
        <vcu-table-column field="age" title="Age"></vcu-table-column>
        <vcu-table-column field="address" title="address"></vcu-table-column>
      </vcu-table>
    </div>
  </a-card>
</template>
<script>
export default {
  data() {
    return {
      defaultSelecteRows: [10002, 10003],
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
    checkboxChangeEvent({ row }) {
      console.log("单选事件");
    },
    checkboxChangeGetKeys({ selectedRowKeys }) {
      console.log(selectedRowKeys);
    },
    clearCheckboxRowEevnt() {
      console.info(222);
      this.$refs.xTable1.clearCheckboxRow();
    },
    getCheckboxEvent1() {
      console.table(this.$refs.xTable1.getCheckboxRecords());
    },
    checkCheckboxMethod({ row }) {
      return row.age > 26;
    },
    checCheckboxkMethod(row) {
      return row.age < 12;
    },
    handleUpdateCheckbox() {
      this.$refs.xTableUpdate.setCheckboxRow(
        [this.tableData[1], this.tableData[2]],
        false
      );
    },
  },
};
</script>

