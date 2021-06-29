import XEUtils from 'xe-utils'
import GlobalConfig from '../../conf'
import { convertToRows } from '../../header/src/util'

export default {
  props: {
    requestTimeout: {
      type: Number
    },
    exportSheetData: {
      type: [Object, Boolean],
    },
    exportExcelUrlCommon: {
      type: String,
      default: "dataq/export/api/common"
    },
    exportExcelUrl: {
      type: String,
      default: ""
    },
    filterOldColumns: {
      type: Boolean,
      default: false
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
    saveHeaderSetUrl: {
      type: String,
      default: "api/data/headerSetting/saveOrUpdate"
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
      filterColumns: null,
      resetFilters: true,
      cancelAxios: null,
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
        //this.columns && this.setHeaderColumns(this.columns)
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
          timeout: this.requestTimeout ? this.requestTimeout : undefined,
          ..._data
        });
        if (this.filterModalShow && this.filterOldColumns) {
          this.filterColumns = res.data.payload;
        }
        this.$emit("onHeaderLoad", this.setHeaderColumns(res.data.payload));
      } catch (err) {
        console.err("request not define!!!")
      }
    },
    setHeaderColumns(res) {
      const _res = XEUtils.clone(res, true);
      let _columns = this.renderColumns(_res);
      this.fullColumns = _columns;
      this.setFiltersHeaderColumns(_columns);
      this.loadColumn(_columns);
      return _columns;
    },
    //生成表头数据
    renderColumns(res) {
      let customRender = this.platformOptions.customRender ? this.platformOptions.customRender : null
      const recursionColumns = (res) => {
        let _column = res.map(item => {
          if (item.sys_hidden == undefined || !item.sys_hidden) {
            let ellipsis = item.ellipsis ? true : false;
            item.showOverflow = ellipsis;
            item.showHeaderOverflow = ellipsis;
            item.showFooterOverflow = ellipsis;
            item.visible = item.hidden == undefined || !item.hidden ? true : false;
            if (item.children && item.children.length) {
              item.children = recursionColumns(item.children)
            }
            if (XEUtils.isArray(customRender)) {
              customRender.forEach(itemRender => {
                if (item.key == itemRender.key || item.field == itemRender.key) {
                  item = XEUtils.merge({}, item, itemRender.params)
                }
              })
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
        let seqTitle = GlobalConfig.table.seqTitle ? GlobalConfig.table.seqTitle : GlobalConfig.i18n('vcu.table.seqTitle');
        let seqItem = [{
          fixed: isFixed,
          align: "center",
          type: "seq",
          title: this.platformOptions.seq.title ? this.platformOptions.seq.title : seqTitle,
          width: 60
        }]
        columns = seqItem.concat(columns)
      }
      return columns;
    },
    //生成表头的筛选菜单项 表头数组
    setFiltersHeaderColumns(res) {
      if (this.platformOptions.filters) {
        const recursionFilterColumns = (list) => {
          return list.map(item => {
            if (item.children && item.children.length) {
              return recursionFilterColumns(item.children)
            } else {
              return item.key
            }
          });
        }
        this.filtersHeaderColumns = _.flattenDeep(recursionFilterColumns(res));
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
        let customRender = this.platformOptions.customRender ? this.platformOptions.customRender : null
        const recursionFilterTableColumns = (list) => {
          return _.map(list, (item) => {
            let _item = { ...item };
            if (item.children && item.children.length) {
              _item.children = recursionFilterTableColumns(item.children)
            } else {
              if (datas[item.key]) {
                let isExist = XEUtils.isArray(customRender) ? XEUtils.filter(customRender, n => {
                  return n.key == item.key && n.params && n.params.filters != undefined && n.params.filters.length > 0 && n.params.filterMethod
                }) : false;
                if (!(isExist && isExist.length)) {
                  const filtersVal = _.map(datas[item.key], (val) => {
                    return { label: val, value: val };
                  });
                  _item.filters = filtersVal;
                  _item.filterMethod = ({ value, row, column }) => {
                    return row[item.key] === value;
                  }
                }
              }
            }
            return _item;
          });
        }
        this.fullColumns = recursionFilterTableColumns(this.fullColumns);
        this.loadColumn(this.fullColumns);
      }
    },
    //取消获取列表数据
    cancelGetTableListData() {
      this.cancelAxios()
    },
    //获取列表数据
    async getTableListData(isRest, obj) {
      this.loadingEd = true;
      //取消之前的请求
      if (this.cancelAxios != null) {
        this.cancelGetTableListData();
      }
      let options = { clearFilterData: false, autoFilterRemote: false }
      options = _.merge({}, options, obj);
      //查询重置过滤条件
      if (options.clearFilterData) this.filterParameter = null;

      let params = {}
      //懒加载
      if (this.isLazy) {
        params.page = isRest && isRest == true ? this.lazyCurrent = 1 : this.lazyCurrent;
        params.limit = this.lazyLimit;
      }
      //过滤条件
      if (this.filterParameter != null) {
        params.filterParameter = JSON.stringify(this.filterParameter)
      }
      if (options.autoFilterRemote) {
        params.page = 1
        params.filterParameter = options.autoFilterRemote.length ? JSON.stringify(options.autoFilterRemote) : undefined
      }
      params = _.merge({}, params, this.platformOptions.pageFormData);
      try {
        let _data =
          _.toUpper(this.ajaxType) == "POST" ? { data: params } : { params };
        const CancelToken = GlobalConfig.request.CancelToken;
        let res = await GlobalConfig.request({
          method: this.ajaxType,
          url: this.platformOptions.pageUrl,
          timeout: this.requestTimeout ? this.requestTimeout : undefined,
          cancelToken: new CancelToken((c) => {
            this.cancelAxios = c;
          }),
          ..._data
        });
        this.cancelAxios = null;
        if (res) {
          if (res !== "cancelAxios") {
            this.loadDataRes = res;
            let resData = res.data.payload.data
            if (this.isLazy) {
              if ((isRest && isRest == true) || options.autoFilterRemote !== false) {
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
              if (this.platformOptions.filters && this.resetFilters && !options.autoFilterRemote) this.handleFiltersHeaderDatas();
              this.$emit("onPageLoad", {
                datas: this.tableFullData,
                count: res.data.payload.count,
                response: res
              })
            }, 50)
            this.loadingEd = false;
          }
        } else {
          this.loadingEd = false;
        }
      } catch (err) {
        this.loadingEd = false;
      }
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
        this.$refs.columnSelectionModal.syncUpdate({ collectColumn: this.collectColumn, $table: this })
        this.columnSelectionVisible = true;
      }
    },
    //显示选项列选择窗口
    showOptionColumnModal(params) {
      if (this.customModalShow) {
        this.$refs.columnSelectionModal.syncUpdate({ collectColumn: this.collectColumn, $table: this, optionsCustom: true, saveHeaderSetUrl: this.saveHeaderSetUrl, formData: params })
        this.columnSelectionVisible = true;
      }
    },
    //列选择回调
    handleChangeColumns(columns) {
      this.$emit("onChangeColumns", columns)
    },
    //显示过滤窗口
    showFilterModal() {
      if (this.filterModalShow) {
        this.filterModalVisible = true;
        let _collectColumn = this.filterOldColumns ? this.filterColumns : this.fullColumns
        _collectColumn = XEUtils.filter(_collectColumn, item => !item.hidden)
        this.$nextTick(() => {
          this.$refs.filterModalDom.syncUpdate({ collectColumn: _collectColumn, $table: this })
        })
      }
    },
    handleFilterRemote(res, type) {
      this.resetFilters = type;
      this.handleSubmitFilter(res)
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
      this.$emit("onPageLoad", {
        datas: [],
        count: 0,
        response: null
      });
    },
    //导出Excel
    async exportExcel() {
      if (this.exportExcelUrl == "") {
        console.error('参数：exportExcelUrl; 导出接口地址不能为空！！！')
      } else {
        let params = _.merge({}, this.platformOptions.pageFormData);
        try {
          let _title = [], _exportSheetData = new Object();
          if (this.tableGroupColumn.length) {
            if (!this.exportSheetData) {
              console.error('参数：exportSheetData; 不能为空！！！')
              return false;
            }
            const columnDatas = XEUtils.toTreeArray(this.tableGroupColumn)
            columnDatas.forEach(item => {
              if (item.property != "action" && item.visible && !item.children) {
                _title.push({
                  "titleName": item.type == "seq" ? "序号" : item.type == "checkbox" ? "选择" : item.title,
                  "titleKey": item.type == "checkbox" ? "checkbox" : item.property
                })
              }
            })
            const _tableGroupColumn = convertToRows(this.tableGroupColumn)
            let _complexTitles = []
            XEUtils.arrayEach(_tableGroupColumn, item => {
              let _subArr = []
              XEUtils.arrayEach(item, subItem => {
                _subArr.push({
                  title: subItem.title,
                  rowSpan: subItem.rowSpan,
                  colSpan: subItem.colSpan,
                })
              })
              _complexTitles.push(_subArr)
            })
            _exportSheetData.complexTitles = _complexTitles;
          } else {
            this.collectColumn.forEach(item => {
              if (item.property != "action" && item.visible) {
                _title.push({
                  "titleName": item.type == "seq" ? "序号" : item.type == "checkbox" ? "选择" : item.title,
                  "titleKey": item.type == "checkbox" ? "checkbox" : item.property
                })
              }
            })
          }
          if (this.exportSheetData) {
            _exportSheetData.name = this.exportExcelUrl;
            _exportSheetData.headers = this.exportSheetData.headers ? this.exportSheetData.headers : undefined;
            _exportSheetData.footers = this.exportSheetData.footers ? this.exportSheetData.footers : undefined;
            _exportSheetData.titles = this.exportSheetData.titles ? this.exportSheetData.titles : JSON.stringify(_title);

            if (this.exportSheetData.rows) {
              if (XEUtils.isBoolean(this.exportSheetData.rows)) {
                const { fullData, footerData } = this.getTableData();
                let _fullData = XEUtils.clone(fullData, true)
                let _footerDatas = [];
                let _rowMethodsOptions = this.exportSheetData.rowMethods && XEUtils.isArray(this.exportSheetData.rowMethods) ? this.exportSheetData.rowMethods : []
                if (XEUtils.find(_title, item => item.titleKey === "checkbox")) {
                  //生成选择列的数据
                  _rowMethodsOptions.push({
                    key: "checkbox",
                    method: ({ row }) => {
                      const checkboxRecords = this.getCheckboxRecords()
                      if (XEUtils.find(checkboxRecords, checkboxItem => checkboxItem._VCUID === row._VCUID)) {
                        return "是";
                      } else {
                        return "否";
                      }
                    }
                  })
                }

                //生成自定义数据
                if (_rowMethodsOptions.length) {
                  _fullData = XEUtils.map(_fullData, item => {
                    XEUtils.arrayEach(_rowMethodsOptions, o => {
                      item[o.key] = o.method({ row: item })
                    })
                    return item;
                  })
                }
                //生成表尾数据
                XEUtils.arrayEach(footerData, (item, index) => {
                  let _list = new Object()
                  XEUtils.objectEach(item, (objItem, objIndex) => {
                    if (objItem != null) {
                      XEUtils.set(_list, _title[objIndex]["titleKey"], objItem)
                    }
                  })
                  _footerDatas.push(_list);
                })
                _exportSheetData.rows = _fullData.concat(_footerDatas);
              } else {
                _exportSheetData.rows = this.exportSheetData.rows;
              }
            }
            params.exportSheetData = JSON.stringify(_exportSheetData)
          } else {
            params.title = JSON.stringify(_title)
          }

          if (this.filterParameter != null) {
            params.filterParameter = JSON.stringify(this.filterParameter)
          }
          let res = await GlobalConfig.request({
            responseType: 'blob',
            method: "POST",
            url: !this.exportSheetData ? this.exportExcelUrl : this.exportExcelUrlCommon,
            timeout: this.requestTimeout ? this.requestTimeout : undefined,
            data: params
          });
          if (res) {
            let filename = XEUtils.toDateString(new Date(), 'yyyyMMdd') + '.xls';
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
