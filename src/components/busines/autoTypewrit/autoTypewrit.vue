<template>
  <div
    ref="autoTypewritWrap"
    class="autoTypewrit-wrap"
    v-click-outside="onClickOutside"
  >
    <v-input
      ref="autoTypewritIput"
      :disabled="disabled"
      :size="size"
      v-model="inputValue"
      class="auto-typewrit-iput"
      :placeholder="placeholder"
      :style="{ width: inputWidth }"
      @keyup="handleInputKeyup"
    />
    <popper
      ref="popperDom"
      :data-transfer="transfer"
      :transfer="transfer"
      :className="popperClassName"
      :placement="placement"
      parentRefs="autoTypewritWrap"
      v-transfer-dom
    >
      <div
        ref="autoTypewritModal"
        class="autoTypewrit-modal"
        v-if="visible"
        :style="{ width: modalWidth }"
        v-hotkey="escKeyMap"
        data-hotkey-enable="true"
      >
        <div
          class="condition clearfix"
          v-hotkey="likeKeyMap"
          data-hotkey-enable="true"
        >
          <v-input
            ref="modalIputDom"
            size="small"
            v-model="modalInputValue"
            class="condition-input fl w-150"
          />
          <v-select
            v-model="inputTypeVal"
            size="small"
            class="condition-select condition-select-one ml-10 fr"
            @change="changeInputType"
            :getPopupContainer="getPopupContainer()"
          >
            <v-select-option
              v-for="item in iptArray"
              :value="item.value"
              :key="item.value"
              >{{ item.label }}</v-select-option
            >
          </v-select>

          <v-select
            v-model="likeTypeVal"
            size="small"
            class="condition-select ml-10 fr"
            @change="changeLikeType"
            :getPopupContainer="getPopupContainer()"
          >
            <v-select-option
              v-for="item in matchDt"
              :value="item.value"
              :key="item.value"
              >{{ item.label }}</v-select-option
            >
          </v-select>
        </div>
        <div class="tableView">
          <tableList
            ref="autoTypewritTableList"
            size="small"
            isLazy
            :stripe="tableListStripe"
            :customRow="tableListCustomRow"
            :customDirectives="tableListDirectives"
            :columnsSource="loadColumns"
            :datasSource="loadDatas"
            :ajaxType="ajaxType"
            :tableHeight="tableListHeight"
            :loadOptions="tableListOptions"
            @onPageLoad="onTableListPageLoad"
          ></tableList>
        </div>
      </div>
    </popper>
  </div>
</template>

<script>
import tableView from "./mixins/tableView.js";
import condition from "./mixins/condition.js";

import request from "@/utils/request.js";
export default {
  components: {
  },
  mixins: [condition, tableView],
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    backfillKey:{
      type: String,
    },
    autoInputValue: {
      type: Boolean,
      default: true,
    },
    popperClassName: {
      type: String,
    },
    placement: {
      type: String,
      default: "bottom-start",
    },
    transfer: {
      type: Boolean,
      default: false,
    },
    isAllowInput: {
      type: Boolean,
      default: true,
    },
    tableListHeight: {
      type: Number,
      default: 200,
    },
    ajaxType: {
      type: String,
      default: "POST",
    },
    modalWidth: {
      type: String,
      default: "400px",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
    },
    size: {
      type: String,
      default: "default",
    },
    inputWidth: {
      type: String,
      default: "100%",
    },
    placeholder: {
      type: String,
      default: "",
    },
    loadColumns: {
      type: Array,
      default: () => [],
    },
    loadDatas: {
      type: Array,
      default: () => [],
    },
    loadOptions: {
      type: Object,
      default() {
        return {};
      },
    },
    inputType: {
      type: Number,
      default: 3,
    }, //输入法类型
    likeType: {
      type: Number,
      default: 3,
    }, //匹配规则：模糊查询
    parentPriority: {
      type: String,
      default: "",
    },
  },
  watch: {
    value(val) {
      this.inputValue = val;
    },
    inputValue(val) {
      this.$emit("input", val);
      this.$emit("change", val);
    },
    visible(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.popperDom.update();
          
        });
      } else {
        this.$refs.popperDom.destroy();
      }
    },
  },
  computed: {
    escKeyMap() {
      return [
        {
          keyVal: "esc",
          callBack: this.colsed,
          priority: "autoTypewrit",
        },
      ];
    },
  },
  data() {
    return {
      inputValue: this.value,
      visible: false,
    };
  },
  created() {},
  methods: {
    handleInputKeyup(e) {
      let keyCode = e.keyCode;
      if (keyCode == 32) {
        this.visible = true;
        this.$nextTick(() => {
          this.modalInputValue = this.autoInputValue
            ? _.trim(this.inputValue)
            : "";
          this.$refs.modalIputDom.$el.focus();
        });
      } else {
        if (!this.isAllowInput) this.inputValue = "";
        this.$emit("selectSubmit", null);
      }
    },
    colsed() {
      this.visible = false;
    },
    onClickOutside(event) {
      if (
        this.$refs.popperDom &&
        !this.$refs.popperDom.$el.contains(event.target)
      ) {
        this.visible = false;
      }
    },
  },
};
</script>
<style lang="less">
@import "./index.less";
</style>