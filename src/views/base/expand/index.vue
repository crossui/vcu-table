<template>
  <a-card title="展开行">
    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            通过设置 <span class="blue-text">expand-config</span> 属性和
            <span class="blue-text">type=expand</span> 与
            <span class="blue-text">slot</span> 可以开启展开行功能
          </div>
          <div>
            默认展开指定行，通过
            <span class="blue-text">expandRowKeys</span>
            参数设置默认展开行，指定默认值需要有
            <span class="blue-text">row-id</span>
          </div>
          <div>
            默认展开所有行，通过
            <span class="blue-text">expandAll</span> 参数设置默认展开所有行
          </div>
          <div>
            还可以配置 <span class="blue-text">labelField</span> 列显示属性
          </div>
        </div>
      </a-alert>
      <a-button-group class="mb-5">
        <a-button @click="$refs.xTable.toggleRowExpand(tableData[1])"
          >切换第二行展开</a-button
        >
        <a-button
          @click="$refs.xTable.setRowExpand([tableData[2], tableData[3]], true)"
          >设置第三、四行展开</a-button
        >
        <a-button @click="$refs.xTable.setAllRowExpand(true)"
          >设置所有行展开</a-button
        >
        <a-button @click="$refs.xTable.clearRowExpand()"
          >关闭所有行展开</a-button
        >
      </a-button-group>

      <vxe-table
        ref="xTable"
        border
        :data="tableData"
        @toggle-row-expand="toggleExpandChangeEvent"
      >
        <vxe-table-column type="seq" width="60"></vxe-table-column>
        <vxe-table-column type="expand" width="60">
          <template v-slot:content="{ row, rowIndex }">
            <template v-if="rowIndex === 1">
              <vxe-table border :data="tableData">
                <vxe-table-column field="role" title="Role"></vxe-table-column>
                <vxe-table-column field="age" title="Age"></vxe-table-column>
              </vxe-table>
            </template>
            <template v-else>
              <ul>
                <li>
                  <span>ID：</span>
                  <span>{{ row.id }}</span>
                </li>
                <li>
                  <span>Name：</span>
                  <span>{{ row.name }}</span>
                </li>
                <li>
                  <span>UpdateTime：</span>
                  <span>{{ row.updateTime }}</span>
                </li>
                <li>
                  <span>CreateTime：</span>
                  <span>{{ row.createTime }}</span>
                </li>
              </ul>
            </template>
          </template>
        </vxe-table-column>
        <vxe-table-column field="name" title="Name"></vxe-table-column>
        <vxe-table-column field="sex" title="Sex"></vxe-table-column>
        <vxe-table-column field="age" title="Age"></vxe-table-column>
      </vxe-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            改变图标，通过设置
            <span class="blue-text">expand-config={iconOpen, iconClose}</span>
            局部替换默认的图标
          </div>
          <div>
            也可以通过
            <span class="blue-text">slot</span> 自定义内容模板，还可以使用
            渲染器 创建可复用的展开行内容模板
          </div>
          <div>
            还可以通过
            <span class="blue-text">expand-config={toggleMethod}</span>
            方法实现展开与关闭的细节处理，返回值用来决定是否允许继续执行
          </div>
          <div>
            还可以通过
            <span class="blue-text">expand-config={visibleMethod}</span>
            方法实现权限控制，返回值用来决定是否显示展开按钮
          </div>
        </div>
      </a-alert>

      <vxe-table
        ref="xTable1"
        border
        :expand-config="{
          iconOpen: 'iconfont icon-minus-square',
          iconClose: 'iconfont icon-plus-square',
          toggleMethod: toggleExpandMethod,
          visibleMethod: expandVisibleMethod,
        }"
        :data="tableData"
      >
        <vxe-table-column type="seq" width="60"></vxe-table-column>
        <vxe-table-column type="expand" title="Name">
          <template v-slot="{ row, rowIndex }">
            <span>{{ row.name }}</span>
          </template>
          <template v-slot:content="{ row, rowIndex }">
            <template v-if="rowIndex === 1">
              <vxe-table border :data="tableData">
                <vxe-table-column field="role" title="Role"></vxe-table-column>
                <vxe-table-column field="age" title="Age"></vxe-table-column>
              </vxe-table>
            </template>
            <template v-else>
              <ul>
                <li>
                  <span>ID：</span>
                  <span>{{ row.id }}</span>
                </li>
                <li>
                  <span>Name：</span>
                  <span>{{ row.name }}</span>
                </li>
                <li>
                  <span>UpdateTime：</span>
                  <span>{{ row.updateTime }}</span>
                </li>
                <li>
                  <span>CreateTime：</span>
                  <span>{{ row.createTime }}</span>
                </li>
              </ul>
            </template>
          </template>
        </vxe-table-column>
        <vxe-table-column field="sex" title="Sex"></vxe-table-column>
        <vxe-table-column field="age" title="Age"></vxe-table-column>
      </vxe-table>
    </div>

    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            展开行的懒加载，通过配置
            <span class="blue-text">expand-config={lazy, loadMethod}</span>
            加载方法来开启懒加载
          </div>
          <div>
            手风琴展开效果，通过配置
            <span class="blue-text">expand-config={accordion}</span>
            属性来开启同一级的节点，每次只能展开一个
          </div>
        </div>
      </a-alert>

      <vxe-table
        border
        ref="xTable2"
        :data="tableData1"
        :expand-config="{
          accordion: true,
          lazy: true,
          loadMethod: loadContentMethod,
        }"
      >
        <vxe-table-column type="seq" width="60"></vxe-table-column>
        <vxe-table-column type="expand" width="80">
          <template v-slot:content="{ row }">
            <ul>
              <li v-for="(item, index) in row.detailList" :key="index">
                <span>Role: {{ item.role }}</span>
                <span style="margin-left: 100px"> Age: {{ item.age }}</span>
                <span style="margin-left: 100px"> Sex: {{ item.sex }}</span>
              </li>
            </ul>
          </template>
        </vxe-table-column>
        <vxe-table-column field="name" title="Name"></vxe-table-column>
        <vxe-table-column field="sex" title="Sex"></vxe-table-column>
        <vxe-table-column field="age" title="Age"></vxe-table-column>
      </vxe-table>
    </div>
  </a-card>
</template>
<script>
import * as api from "@/api/test";
import XEUtils from "xe-utils";
export default {
  data() {
    return {
      tableData: [],
      tableData1: [
        { name: "Develop", age: 20, sex: "女", detailList: [] },
        { name: "Develop", age: 22, sex: "女", detailList: [] },
        { name: "Develop", age: 24, sex: "男", detailList: [] },
        { name: "Develop", age: 26, sex: "女", detailList: [] },
      ],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      let res = await api.getexpandData();
      if (res) {
        this.tableData = res.data.payload.data;
      }
    },
    toggleExpandChangeEvent({ row, expanded }) {
      console.log("行展开事件" + expanded);
    },
    toggleExpandMethod({ expanded, row }) {
      if (expanded) {
        if (row.sex === "1") {
          this.$message.error("不允许展开");
          return false;
        }
      } else {
        if (row.sex === "0") {
          this.$message.error("不允许关闭");
          return false;
        }
      }
      return true;
    },
    expandVisibleMethod({ row }) {
      if (row.name === "ss2") {
        return false;
      }
      return true;
    },
    loadContentMethod({ row }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const detailList = XEUtils.sample(
            [
              { role: "Develop", age: 20, sex: "女" },
              { role: "Develop", age: 22, sex: "女" },
              { role: "Develop", age: 24, sex: "男" },
              { role: "Develop", age: 26, sex: "女" },
              { role: "Develop", age: 28, sex: "男" },
              { role: "Develop", age: 30, sex: "男" },
            ],
            XEUtils.random(1, 5)
          );
          row.detailList = detailList;
          resolve();
        }, 500);
      });
    },
  },
};
</script>

