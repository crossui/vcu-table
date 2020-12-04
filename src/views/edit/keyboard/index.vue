<template>
  <a-card title="键盘导航">
    <div class="mb-30">
      <a-alert type="info" class="mb-10">
        <div slot="message">
          <div>
            设置
            <span class="blue-text"> mouse-config={selected: true} </span>
            启用单元格选中功能
            <span class="red-text"
              >（只能用于 edit-config.mode=cell 有效）</span
            >
          </div>
          <div>
            设置
            <span class="blue-text">
              keyboard-config={isArrow: true, isDel: true, isEnter: true, isTab:
              true, isEdit: true}
            </span>
            启用按键功能及任意键编辑功能，方向键、回车键、Tab 键、Esc 键、F2
            键、Del、Back 键
          </div>
          <div>
            通过
            <span class="blue-text"> keyboard-config={editMethod} </span>
            重写默认的编辑行为，改为追加的方式
          </div>
          <div class="red-text">（注：isEdit 启用任意键覆盖式编辑的）</div>
        </div>
      </a-alert>

      <vxe-table
        ref="xTable"
        :data="tableData"
        :edit-config="{
          trigger: 'dblclick',
          mode: 'cell',
        }"
        :mouse-config="{ selected: true }"
        :checkbox-config="{ range: true }"
        :context-menu="tableMenu"
        :keyboard-config="{
          isArrow: true,
          isDel: true,
          isEnter: true,
          isTab: true,
          isEdit: true,
          editMethod,
        }"
      >
        <vxe-table-column type="checkbox" width="60"></vxe-table-column>
        <vxe-table-column type="seq" width="60"></vxe-table-column>
        <vxe-table-column
          field="name"
          title="Name"
          :edit-render="{ autofocus: '.my-input' }"
        >
          <template v-slot:edit="scope">
            <a-input
              size="small"
              v-model="scope.row.name"
              @input="$refs.xTable.updateStatus(scope)"
              class="my-input"
            ></a-input>
          </template>
        </vxe-table-column>
        <vxe-table-column field="sex" title="Sex" :edit-render="{}">
          <template v-slot:edit="scope">
            <a-select
              size="small"
              v-model="scope.row.sex"
              @change="$refs.xTable.updateStatus(scope)"
              style="width: 100%"
            >
              <a-select-option
                v-for="item in sexList"
                :key="item.value"
                :value="item.value"
                >{{ item.label }}</a-select-option
              >
            </a-select>
          </template>
          <template v-slot="{ row }">{{
            getSelectLabel(row.sex, sexList)
          }}</template>
        </vxe-table-column>
        <vxe-table-column field="age" title="Age" :edit-render="{}">
          <template v-slot:edit="{ row }">
            <a-input-number
              size="small"
              v-model="row.age"
              :max="105"
              :min="1"
              style="width: 100%"
            ></a-input-number>
          </template>
        </vxe-table-column>
        <vxe-table-column field="address" title="Address" :edit-render="{}">
          <template v-slot:edit="scope">
            <autoTypewrit
              size="small"
              v-model="scope.row.address"
              :loadOptions="loadOptions"
              transfer
              backfillKey="inHospDeptName"
            ></autoTypewrit>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>

    <!-- <div class="mt-10">
      mouse-config 鼠标配置：
        | Mouse + Left | (area) 鼠标选取指定范围的单元格 |
        | Mouse + Right | (area) 鼠标选取选中位置的单元格 |
        | Mouse + Left + Ctrl | (area) 鼠标选取多区域的单元格 |
        | Mouse + Left | (extension) 鼠标左键按住区域内右下角延伸按钮，将区域横向或纵向扩大 |
      keyboard-config 按键配置：
        | Ctrl + X | (isClip) 将单元格标记为剪贴状态并将内容复制到剪贴板，支持 Excel 和 WPS |
        | Ctrl + C | (isClip) 将单元格标记为复制状态并将内容复制到剪贴板，支持 Excel 和 WPS |
        | Ctrl + V | (isClip) 将剪贴板的内容粘贴到指定区域中，支持 Excel 和 WPS |
        | Ctrl + M | (isMerge) 将选取的单元格合并或取消合并 |
        | Ctrl + F | (isFNR) 查找单元格数据，全表或查找指定区域单元格数据 |
        | Ctrl + H | (isFNR) 替换单元格数据，全表或替换指定区域单元格数据 |
        | ArrowUp | （isArrow）如果存在，则移动到上面的单元格 |
        | Shift + ArrowUp | （isArrow）如果存在，则往上面延伸单元格区域 |
        | ArrowDown | （isArrow）如果存在，则移动到下面的单元格 |
        | Shift + ArrowDown | （isArrow）如果存在，则往下面延伸单元格区域 |
        | ArrowLeft | （isArrow）如果存在，则移动到左边的单元格 |
        | Shift + ArrowLeft | （isArrow）如果存在，则往左边延伸单元格区域 |
        | ArrowRight | （isArrow）如果存在，则移动到右边的单元格 |
        | Shift + ArrowRight | （isArrow）如果存在，则往右边延伸单元格区域 |
        | Tab | （isTab）如果存在，则移动到右边单元格；如果存在区域，则在指定区域内移动；如果移动到最后一列，则从下一行开始移到，以此循环 |
        | Tab + Shift | （isTab）如果存在，则移动到左边单元格，则在指定区域内移动；如果移动到第一列，则从上一行开始移到，以此循环 |
        | Spacebar | (isChecked) 如果选取的区域存在复选框，则切换勾选状态 |
        | Enter | （isEnter）如果存在，取消单元格编辑并移动到下面的单元格，则在指定区域内移动；如果移动到最后一行，则从下一列开始移到，以此循环 |
        | Enter + Shift | （isEnter）如果存在，取消单元格编辑并移动到上面的单元格，则在指定区域内移动；如果移动到第一行，则从上一列开始移到，以此循环 |
        | Delete | （isDel）清空单元格内容 |
        | Backspace | （isDel）清空单元格内容并激活为编辑状态 |
        | F2 | 如果存在，激活单元格为编辑状态 |
        | Esc | 如果存在，取消单元格编辑状态 |
        | * | （isEdit）按下除功能键之外的任意键激活覆盖式单元格编辑 |
    </div> -->
  </a-card>
</template>
<script>
import XEUtils from "xe-utils";
export default {
  data() {
    return {
      loadOptions: {
        headUrl:
          "http://10.16.0.78:8033/mock/9cf15880587211ea804331cf8/dataq/api/header",
        listUrl:
          "http://10.16.0.78:8033/mock/9cf15880587211ea804331cf8/dataq/api/page",
      },
      tableData: [
        {
          id: 10001,
          name: "Test1",
          role: "Develop",
          sex: "1",
          age: 28,
          address: "好好学习天天向上",
        },
        {
          id: 10002,
          name: "Test2",
          role: "Test",
          sex: "0",
          age: 22,
          address: "Guangzhou",
        },
        {
          id: 10003,
          name: "Test3",
          role: "PM",
          sex: "1",
          age: 32,
          address: "Shanghai",
        },
        {
          id: 10004,
          name: "Test4",
          role: "Designer",
          sex: "0",
          age: 24,
          address: "Shanghai",
        },
      ],
      sexList: [
        { label: "女", value: "0" },
        { label: "男", value: "1" },
      ],
      tableMenu: {
        body: {
          options: [
            [
              {
                code: "copy",
                name: "复制",
                disabled: false,
              },
              { code: "remove", name: "删除", disabled: false },
              {
                code: "save",
                name: "保存",
                disabled: false,
              },
            ],
          ],
        },
      },
    };
  },
  mounted() {},
  methods: {
    getSelectLabel(value, list, valueProp = "value", labelField = "label") {
      const item = XEUtils.find(list, (item) => item[valueProp] === value);
      return item ? item[labelField] : null;
    },
    editMethod({ row, column }) {
      // 重写默认的覆盖式，改为追加式
      this.$refs.xTable.setActiveCell(row, column.property);
      // 返回 false 阻止默认行为
      return false;
    },
  },
};
</script>

