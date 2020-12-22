import XEUtils from 'xe-utils'
import GlobalConfig from '../../conf'

export default {
  props: {
    exportExcelUrl: {
      type: String,
      default: ""
    },
    filterFormData: {
      type: Object,
      default: () => { }
    },
    filterModalShow: {
      type: Boolean,
      default: false
    },
    customModalShow: {
      type: Boolean,
      default: false
    },
    lazyNoCount: {
      type: Boolean,
      default: false
    },
    lazyLimit: {
      type: Number,
      default: 10
    },
    isLazy: {
      type: Boolean,
      default: false
    },
    locking: {
      type: Boolean,
      default: false
    },
    loadOptions: {
      type: Object,
      default: () => { }
    },
    ajaxType: {
      type: String,
      default: "POST"
    },
  },
  data() {
    return {
      lockingEd: this.locking,
      lazyCurrent: 1,
      lazyCount: 0,
      lazyNoCountPage: true,
      tableBodyDom: null,
      fullColumns: null,
      filtersHeaderColumns: null,
      loadDataRes: null,
      columnSelectionVisible: false,
      filterModalVisible: false,
      filterParameter: null,
    }
  },
  computed: {
    platformOptions() {
      let option = {
        headUrl: "",
        pageUrl: "",
        headerFormData: {},
        pageFormData: {}
      };
      return _.merge({}, option, this.loadOptions);
    },
    filterFormDatas() {
      let option = {
        filterFindUrl: "",
        filterFindUrlPrefix: {
          find: "dataq/filter/find/",
          save: "dataq/filter/save/",
          delete: "dataq/filter/delete/"
        },
        filterSaveFormData: {
          module: (new Date()).getTime(),
          window: (new Date()).getTime(),
          deptNo: this.$store.state.user && this.$store.state.user.organizationEntity ? this.$store.state.user.organizationEntity.user.dlbmbh : "",
          staffNo: this.$store.state.user && this.$store.state.user.organizationEntity ? this.$store.state.user.organizationEntity.user.ygbh00 : ""
        },
        filterFindFormData: {
          deptNo: this.$store.state.user && this.$store.state.user.organizationEntity ? this.$store.state.user.organizationEntity.user.dlbmbh : ""
        },
        operationUrl: "dataq/api/dict",
        operationFormData: {
          zdmc: "运算符"
        },
        relationUrl: "dataq/api/dict",
        relationFormData: {
          zdmc: "关系符"
        }
      }
      return _.merge({}, option, this.filterFormData);
    }
  },
  watch: {
    locking(val) {
      this.lockingEd = val;
    },
    loadOptions: {
      handler(newV, oldV) {
        //console.info(newV)
      },
      immediate: true,
      deep: true
    }
  },
  created() {

  },
  mounted() {
    this.platformInit()
  },
  methods: {
    //初始化
    async platformInit() {
      if (this.platformOptions.headUrl != "") {
        this.loadingEd = true;
        await this.getTableHeaderData();
      }
      if (!this.lockingEd && this.platformOptions.pageUrl != "") {
        this.loadingEd = true;
        await this.getTableListData();
      }

      /* 懒加载 */
      if (this.isLazy) {
        this.tableBodyDom = this.$refs.tableBody.$el;
        this.tableBodyDom.addEventListener("scroll", this._scrollHandler, false)
      }

      this.loadingEd = false;
    },
    //获取列表表头数据
    async getTableHeaderData() {
      let params = this.platformOptions.headerFormData;
      try {
        let _data =
          _.toUpper(this.ajaxType) == "POST" ? { data: params } : { params };
        let res = await GlobalConfig.request({
          method: this.ajaxType,
          url: this.platformOptions.headUrl,
          ..._data
        });
        let _columns = this.renderColumns(res.data.payload);
        this.fullColumns = _columns;
        this.setFiltersHeaderColumns(_columns);
        this.loadColumn(_columns);
        this.$emit("onHeaderLoad", _columns);
        /* let _columns = this.renderColumns(res.data.payload);
        this.tableColumns = [..._columns]
        this.setFiltersHeaderColumns(_columns);
        this.columnSelectionFull = [...res.data.payload]
         */
      } catch (err) {
        console.err("request not define!!!")
      }
    },
    //生成表头数据
    renderColumns(res) {
      let customRender = this.platformOptions.customRender ? this.platformOptions.customRender : null

      const recursionColumns = (res) => {
        let _column = res.map(item => {
          if (item.hidden == undefined || !item.hidden) {
            item.showOverflow = item.ellipsis ? true : false;
            if (XEUtils.isArray(customRender)) {
              customRender.forEach(itemRender => {
                if (item.key == itemRender.key || item.field == itemRender.key) {
                  item = XEUtils.merge({}, item, itemRender.params)
                }
              })
              if (item.children && item.children.length) {
                item.children = recursionColumns(item.children, customRender)
              }
            }
            return item;
          }
        })
          .filter(item => {
            return item != undefined;
          });
        return _column;
      }
      let columns = recursionColumns(res);
      //checkbox
      if (this.platformOptions.checkbox) {
        let isFixed = "";
        columns.forEach(item => {
          if (item.fixed == "left") {
            isFixed = "left"
          }
        })
        let checkboxItem = [{
          fixed: isFixed,
          align: "center",
          type: "checkbox",
          width: 60
        }]
        columns = checkboxItem.concat(columns)
      }

      //radio
      if (this.platformOptions.radio) {
        let isFixed = "";
        columns.forEach(item => {
          if (item.fixed == "left") {
            isFixed = "left"
          }
        })
        let radioItem = [{
          fixed: isFixed,
          align: "center",
          type: "radio",
          width: 60
        }]
        columns = radioItem.concat(columns)
      }

      //索引
      if (this.platformOptions.seq) {
        let isFixed = "";
        columns.forEach(item => {
          if (item.fixed == "left") {
            isFixed = "left"
          }
        })
        let seqItem = [{
          fixed: isFixed,
          align: "center",
          type: "seq",
          title: this.platformOptions.seq.title ? this.platformOptions.seq.title : "#",
          width: 60
        }]
        columns = seqItem.concat(columns)
      }

      return columns;
    },
    //生成表头的筛选菜单项 表头数组
    setFiltersHeaderColumns(res) {
      if (this.platformOptions.filters) {
        this.filtersHeaderColumns = res.map(item => {
          return item.key
        });
      }
    },
    //生成表头的筛选菜单项数据
    handleFiltersHeaderDatas() {
      if (this.filtersHeaderColumns) {
        const zipVal = _.map(this.filtersHeaderColumns, (item) => {
          if (item)
            return item.filters ? item.filters : [];
        });
        let datas = _.zipObject(this.filtersHeaderColumns, zipVal);
        _(this.afterFullData).forEach((item) => {
          _.forIn(item, (value, key) => {
            if (datas[key]) {
              if (!_.includes(datas[key], value)) datas[key].push(value)
            }
          });
        });
        this.fullColumns = _.map(this.fullColumns, (item) => {
          if (datas[item.key]) {
            const filtersVal = _.map(datas[item.key], (val) => {
              return { label: val, value: val };
            });
            item.filters = filtersVal;
            item.filterMethod = ({ value, row, column }) => row[item.key].indexOf(value) === 0
          }
          return item;
        });
        this.loadColumn(this.fullColumns);
      }
    },
    //获取列表数据
    async getTableListData(isRest, obj) {
      this.loadingEd = true;
      let options = { clearFilterData: false }
      options = _.merge({}, options, obj);
      //查询重置过滤条件
      if (options.clearFilterData) this.filterParameter = null;

      let params = {}
      //过滤条件
      if (this.filterParameter != null) {
        params.filterParameter = JSON.stringify(this.filterParameter)
      }
      //懒加载
      if (this.isLazy) {
        params = {
          page: isRest && isRest == true ? this.lazyCurrent = 1 : this.lazyCurrent,
          limit: this.lazyLimit
        }
      }
      params = _.merge({}, params, this.platformOptions.pageFormData);
      try {
        let _data =
          _.toUpper(this.ajaxType) == "POST" ? { data: params } : { params };
        let res = await GlobalConfig.request({
          method: this.ajaxType,
          url: this.platformOptions.pageUrl,
          ..._data
        });

        this.loadDataRes = res;

        let resData = res.data.payload.data
        if (this.isLazy) {
          if (isRest && isRest == true) {
            this.tableBodyDom.scrollTop = 0;
            this.lazyCurrent = 1;
          } else {
            resData = _.concat(this.tableFullData, resData);
          }

          if (this.lazyNoCount) {
            this.lazyNoCountPage = resData.length ? true : false;
          } else {
            this.lazyCount = res.data.payload.count;
          }
        }

        setTimeout(() => {
          this.setDatas(resData);
          if (this.platformOptions.filters) this.handleFiltersHeaderDatas();
          this.$emit("onPageLoad", {
            datas: this.tableFullData,
            count: res.data.payload.count,
            response: res
          })
        }, 50)

      } catch (err) { }
      this.loadingEd = false;
    },
    //懒加载
    _scrollHandler() {
      const scrollDistance = this.tableBodyDom.scrollHeight - this.tableBodyDom.scrollTop - this.tableBodyDom.clientHeight;
      if (scrollDistance <= 0) {  //等于0证明已经到底，可以请求接口
        if (this.platformOptions.pageUrl != "") {
          if (this.lazyNoCount) {
            if (!this.lazyNoCountPage) return;
          } else {
            if (this.lazyCount < this.lazyCurrent * this.lazyLimit) return;
          }
          this.lazyCurrent++
          this.getTableListData();
        } else {
          this.loadingEd = true;
        }
        this.$emit("onLazyCheng", this.lazyCurrent);
      }
    },
    //显示列选择窗口
    showColumnModal() {
      if (this.customModalShow) {
        this.columnSelectionVisible = true;
        this.$nextTick(() => {
          this.$refs.columnSelectionModal.syncUpdate({ collectColumn: this.collectColumn, $table: this })
        })
      }
    },
    //显示过滤窗口
    showFilterModal() {
      if (this.filterModalShow) {
        this.filterModalVisible = true;
        this.$nextTick(() => {
          this.$refs.filterModalDom.syncUpdate({ collectColumn: this.collectColumn, $table: this })
        })
      }
    },
    //过滤确认
    handleSubmitFilter(res) {
      this.filterParameter = res
      this.getTableListData(true)
    },
    //过滤还原
    handleReductionFilter() {
      this.filterParameter = null
      this.getTableListData(true)
    },
    //还原
    operateRestore() {
      this.resetColumn()
      this.handleReductionFilter()
    },
    //清空表格数据
    emptyTableLists() {
      this.setDatas([]);
      if (this.isLazy) {
        this.lazyCurrent = 1;
      }
      this.$emit("onPageLoad", 1, [], null);
    },
    //导出Excel
    async exportExcel() {
      if (this.exportExcelUrl == "") {
        console.error('参数：exportExcelUrl; 导出接口地址不能为空！！！')
      } else {
        let params = _.merge({}, this.platformOptions.pageFormData);
        try {
          let _title = []
          this.collectColumn.forEach(item => {
            if (item.property != "action" && item.visible) {
              _title.push({
                "titleName": item.title,
                "titleKey": item.property
              })
            }
          })
          params.title = JSON.stringify(_title)
          let res = await GlobalConfig.request({
            responseType: 'blob',
            method: "POST",
            url: this.exportExcelUrl,
            data: params
          });
          if (res) {
            let filename = this.util.formatDate(new Date(), "yyyyMMdd") + '.xls';
            if (res.headers["content-disposition"]) {
              let _name = res.headers["content-disposition"].split("filename=");
              filename = decodeURIComponent(_name[1]);
            }
            const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
            const link = document.createElement('a')
            const href = window.URL.createObjectURL(blob)
            link.href = href
            link.download = filename
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link) // 下载完成移除元素
            window.URL.revokeObjectURL(href) // 释放掉blob对象
            this.$emit("onExportBack", true)
          } else {
            this.$message.error("导出失败！！！")
            this.$emit("onExportBack", false)
          }
        } catch (err) {
          this.$emit("onExportBack", false)
          this.$message.error("导出失败！！！")
        }
      }
    },
  },
  activated() {

  },
  deactivated() {
  },
  beforeDestroy() {

  },
  destroyed() {

  },

}
