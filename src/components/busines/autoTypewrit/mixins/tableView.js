export default {
  components: {},
  mixins: [],
  watch: {
  },
  props: {
    tableListStripe: {
      type: [Boolean, Function],
      default: true
    }
  },
  data() {
    return {
      currIndex: 0,
      tableListDatas: null,
      tableListDirectives: [],
      defaultTableListStripe: (record, index) => {
        if (index == this.currIndex) {
          return "select-table-row";
        }
      },
      tableListCustomRow: (record, index) => {
        return {
          on: {
            click: event => {
              this.handleTableListClick(record, index);
            },
            dblclick: event => {
              this.isDBClickRow = true
              this.handleTableListDBClick(record, index);
            }
          }
        };
      }
    };
  },
  computed: {
    currDesc() {
      let desc = ""
      if (this.isShowDesc) {
        if (!this.fieldDesc || this.fieldDesc == "") {
          console.error("fieldDesc Props Cannot be empty!!! ")
        } else {
          desc = this.tableListDatas && this.tableListDatas.length ? this.tableListDatas[this.currIndex][this.fieldDesc] : ""
        }
      }
      return desc;
    },
    tableListKeyMap() {
      return [
        {
          keyVal: "pgup",
          callBack: this.handlePgup,
          priority: "autoTypewrit"
        },
        {
          keyVal: "pgdn",
          callBack: this.handlePgdn,
          priority: "autoTypewrit"
        },
        {
          keyVal: "up",
          callBack: this.handleUp,
          priority: "autoTypewrit"
        },
        {
          keyVal: "down",
          callBack: this.handleDown,
          priority: "autoTypewrit"
        },
        {
          keyVal: "enter",
          callBack: this.handleEnter,
          priority: "autoTypewrit"
        }
      ];
    },
    tableListOptions() {  //modalInputValue     inputValue
      let _val = _.trim(this.modalInputValue);
      _val = _val.replace(/\'/g, '\'\'');
      let option = {
        headUrl: "",
        listUrl: "",
        formData: {
          content: _val,
          inputType: this.inputTypeVal,
          likeType: this.likeTypeVal
        }
      };
      let _option = _.merge({}, option, this.loadOptions);
      _option.pageUrl = _option.listUrl
      _option.pageFormData = _option.formData
      return _option;
    }
  },
  mounted() {
    this.defaultTableListStripe = typeof this.tableListStripe == "boolean" ? this.defaultTableListStripe : this.tableListStripe
    this.tableListDirectives.push({
      name: "hotkey",
      value: this.tableListKeyMap
    });
  },
  methods: {
    handleTableListClick(record, index) {
      this.currIndex = index;
    },
    handleTableListDBClick(record, index) {
      this.isDBClickRow = true
      if (this.backfillKey) {
        this.inputValue = record[this.backfillKey] ? record[this.backfillKey] : "";
      }
      this.$emit("selectSubmit", record, this.tableListDatas);
      this.colsed()
    },
    //上一页
    handlePgup() {

    },
    //下一页
    handlePgdn() {

    },
    //上一个
    handleUp() {
      if (this.currIndex - 1 >= 0) {
        this.currIndex--;
      }
    },
    //下一个
    handleDown() {
      if (this.currIndex + 1 < this.tableListDatas.length) {
        this.currIndex++;
      }
    },
    //回车
    handleEnter() {
      this.isDBClickRow = true
      this.$emit("selectSubmit", this.tableListDatas[this.currIndex],this.tableListDatas);
      this.colsed()
    },
    onTableListPageLoad(current, currPageData, response) {
      if (current <= 1) this.currIndex = 0;
      this.tableListDatas = currPageData;
      this.allowWatchSearch = true;
    }
  }
};