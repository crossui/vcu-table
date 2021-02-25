
export default {
  computed: {
    likeKeyMap() {
      return [
        {
          keyVal: "F1",
          callBack: this.handleChangeInputType,
          priority: "autoTypewrit"
        },
        {
          keyVal: "F2",
          callBack: this.handleChangeLikeType,
          priority: "autoTypewrit"
        }
      ];
    }
  },
  data() {
    return {
      modalInputValue: "",
      inputTypeVal: this.inputType,
      likeTypeVal: this.likeType,
      matchDt: [
        {
          value: 1,
          label: "向后模糊匹配"
        },
        {
          value: 2,
          label: "向前模糊匹配"
        },
        {
          value: 3,
          label: "完全模糊匹配"
        }
      ],
      iptArray: [
        {
          value: 1,
          label: "编码"
        },
        {
          value: 2,
          label: "名称"
        },
        {
          value: 3,
          label: "拼音"
        },
        {
          value: 4,
          label: "五笔"
        }
      ]
    };
  },
  watch: {
    modalInputValue(val) {
      this.handleConditionChange()
    }
  },
  methods: {
    //快捷键切换选项
    handleConditionChange() {
      this.$nextTick(() => {
        this.$refs.autoTypewritTableList.getTableListData(true)
      });
    },
    //快捷键切换 输入法
    handleChangeInputType() {
      this.inputTypeVal++;
      if (this.inputTypeVal > 4) {
        this.inputTypeVal = 1;
      }
      this.handleConditionChange()
    },
    //快捷键切换 匹配模式
    handleChangeLikeType() {
      this.likeTypeVal++;
      if (this.likeTypeVal > 3) {
        this.likeTypeVal = 1;
      }
      this.handleConditionChange()
    },
    //输入法切换
    changeInputType() {
      this.$refs.autoTypewritTableList.getTableListData(true)
    },
    //匹配模式切换
    changeLikeType() {
      this.$refs.autoTypewritTableList.getTableListData(true)
    },
    getPopupContainer() {
      return triggerNode => triggerNode.parentNode;
    }
  }
};