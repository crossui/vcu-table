<template>
  <a-card title="测试">
    <div class="mb-30">
      <vcu-table
        ref="xTable"
        border
        :loadOptions="options"
        :columns="tableColumn"
        :data="tableData"
        @onHeaderLoad="onHeaderLoad"
      >
      </vcu-table>
    </div>
  </a-card>
</template>
<script>
const renderColumns = (res) => {
  let seq = {
    title: "序号",
    fixed: "left",
    align: "center",
    type: "seq",
    width: 60,
  };

  let columns1 = {
    title: "西药",
    align: "center",
    children: [],
  };
  let columns2 = {
    title: "中成药",
    align: "center",
    children: [],
  };
  let columns3 = {
    title: "中草药",
    align: "center",
    children: [],
  };
  let columns4 = {
    title: "物资",
    align: "center",
    children: [],
  };
  let columns5 = {
    title: "合计",
    align: "center",
    children: [],
  };
  let columns = res
    .map((item) => {
      if (item.hidden == undefined || !item.hidden) {
        let _title = item.title.split("|");
        if (_title.length > 1) {
          item.title = _title[1];
        }
        if (
          item.key == "XYGJJE" ||
          item.key == "XYLSJE" ||
          item.key == "C_XYCJ"
        ) {
          columns1.children.push(item);
        } else if (
          item.key == "CYGJJE" ||
          item.key == "CYLSJE" ||
          item.key == "C_CYCJ"
        ) {
          columns2.children.push(item);
        } else if (
          item.key == "ZYGJJE" ||
          item.key == "ZYLSJE" ||
          item.key == "C_ZYCJ"
        ) {
          columns3.children.push(item);
        } else if (
          item.key == "YXGJJE" ||
          item.key == "YXLSJE" ||
          item.key == "C_YXCJ"
        ) {
          columns4.children.push(item);
        } else if (
          item.key == "C_GJHJ" ||
          item.key == "C_LSHJ" ||
          item.key == "C_CJHJ"
        ) {
          columns5.children.push(item);
        } else {
          return item;
        }
      }
    })
    .filter((item) => {
      return item != undefined;
    });
  let _columns = [
    seq,
    ...columns,
    columns1,
    columns2,
    columns3,
    columns4,
    columns5,
  ];
  return _columns;
};
export default {
  data() {
    return {
      tableColumn: [],
      tableData: [],
      options: {
        headUrl: "dataq/api/header/headerGroups1",
        pageUrl: "dataq/api/page/headerGroups1",
        filters: true,
      },
    };
  },
  mounted() {},
  methods: {
    onHeaderLoad(columns) {
      this.tableColumn = renderColumns(columns);
    },
  },
};
</script>

