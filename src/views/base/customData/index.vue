<template>
  <v-card title="数据格式与字段">
    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          支持多种数据格式：默认标准结构、深层结构、二维数组
        </div>
      </v-alert>
      <vcu-table :data="tableData">
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column field="name" title="Name"></vcu-table-column>
        <vcu-table-column field="sex" title="Sex"></vcu-table-column>
        <vcu-table-column field="age" title="Age"></vcu-table-column>
        <vcu-table-column
          field="content"
          title="Html"
          type="html"
          show-overflow
        ></vcu-table-column>
        <vcu-table-column
          field="role"
          title="Role"
          show-overflow
        ></vcu-table-column>
      </vcu-table>
    </div>

    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          深层结构，可用于带有复杂结构的场景<span class="red-text"
            >（缺点深层级数据类型必须先定义，深层结构将影响性能，具体取决于数据量大小）</span
          >
        </div>
      </v-alert>
      <vcu-table :data="tableData1">
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column field="userInfo.name" title="Name"></vcu-table-column>
        <vcu-table-column field="other[0].sex" title="Sex"></vcu-table-column>
        <vcu-table-column field="userInfo.age" title="Age"></vcu-table-column>
        <vcu-table-column
          field="other[1].more.content"
          title="Html"
          type="html"
          show-overflow
        ></vcu-table-column>
        <vcu-table-column
          field="role"
          title="Role"
          show-overflow
        ></vcu-table-column>
      </vcu-table>
    </div>

    <div class="mb-30">
      <v-alert type="info" class="mb-10">
        <div slot="message">
          二维数组结构，适用场景较少<span class="red-text"
            >（缺点局限性比较大，需要手动指定 row-id 唯一主键）</span
          >
        </div>
      </v-alert>
      <vcu-table row-id="0" :data="tableData2">
        <vcu-table-column type="seq" width="60"></vcu-table-column>
        <vcu-table-column field="1" title="Name"></vcu-table-column>
        <vcu-table-column field="2" title="Sex"></vcu-table-column>
        <vcu-table-column field="3" title="Age"></vcu-table-column>
        <vcu-table-column
          field="4"
          title="Html"
          type="html"
          show-overflow
        ></vcu-table-column>
        <vcu-table-column
          field="5"
          title="Role"
          show-overflow
        ></vcu-table-column>
      </vcu-table>
    </div>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          name: "Test2",
          age: 28,
          sex: "男",
          role: "后端",
          content: "我是后端BODY",
        },
        {
          name: "Test4",
          age: 26,
          sex: "男",
          role: "前端",
          content: '<a href="">我是链接</a>',
        },
        {
          name: "Test3",
          age: 20,
          sex: "女",
          role: "程序员鼓励师",
          content:
            '<img height="20" src="https://www.baidu.com/img/flexible/logo/pc/result.png">',
        },
        {
          name: "Test1",
          age: 22,
          sex: "女",
          role: "设计师",
          content: '<div><span style="color: red">在线观看.avi</span></div>',
        },
      ],
      tableData1: [
        {
          userInfo: { name: "Test1", age: 22 },
          other: [
            { sex: "女" },
            {
              more: {
                content:
                  '<div><span style="color: red">在线观看.avi</span></div>',
              },
            },
          ],
          role: "设计师",
        },
        {
          userInfo: { name: "Test2", age: 28 },
          other: [
            { sex: "男" },
            {
              more: {
                content:
                  '<img height="20" src="https://www.baidu.com/img/flexible/logo/pc/result.png">',
              },
            },
          ],
          role: "后端",
        },
        {
          userInfo: { name: "Test3", age: 20 },
          other: [
            { sex: "女" },
            {
              more: {
                content:
                  '<img height="20" src="https://www.baidu.com/img/flexible/logo/pc/result.png">',
              },
            },
          ],
          role: "程序员鼓励师",
        },
        {
          userInfo: { name: "Test4", age: 26 },
          other: [
            { sex: "男" },
            {
              more: {
                content: '<a href="">我是链接</a>',
              },
            },
          ],
          role: "前端",
        },
      ],
      tableData2: [
        [
          101,
          "Test4",
          "男",
          26,
          '<a href="">我是链接</a>',
          "前端",
        ],
        [
          102,
          "Test2",
          "男",
          28,
          '<img height="20" src="https://www.baidu.com/img/flexible/logo/pc/result.png">',
          "后端",
        ],
        [
          103,
          "Test1",
          "女",
          22,
          '<div><span style="color: red">在线观看.avi</span></div>',
          "设计师",
        ],
        [
          104,
          "Test3",
          "女",
          20,
          '<img height="20" src="https://www.baidu.com/img/flexible/logo/pc/result.png">',
          "程序员鼓励师",
        ],
      ],
    };
  },
};
</script>

