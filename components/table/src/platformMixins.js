import XEUtils from 'xe-utils'
import GlobalConfig from '../../conf'
import VCUTable from '../../v-c-u-table'

export default {
  props: {
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
  components: {

  },
  data() {
    return {
      lockingEd: this.locking,
      lazyCurrent: 1,
      lazyCount: 0,
      lazyNoCountPage: true,
      tableBodyDom: null
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
  },
  watch: {
    locking(val) {
      this.lockingEd = val;
    },
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
        if (this.height) {
          this.tableBodyDom = this.$refs.tableBody.$el;
          this.tableBodyDom.addEventListener("scroll", this._scrollHandler, false)
        } else {
          console.error("props is height cannot be empty!!!")
        }
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
        this.loadColumn(_columns);
        /* let _columns = this.renderColumns(res.data.payload);
        this.tableColumns = [..._columns]
        this.setFiltersHeaderColumns(_columns);
        this.columnSelectionFull = [...res.data.payload]
        this.$emit("onHeaderLoad", this.tableColumns); */
      } catch (err) {
        console.err("request not define!!!")
      }
    },
    //生成表头数据
    renderColumns(res) {
      let customRender = this.platformOptions.customRender ? this.platformOptions.customRender : null
      let customCell = this.platformOptions.customCell ? this.platformOptions.customCell : null
      let columns = res
        .map(item => {
          if (item.hidden == undefined || !item.hidden) {
            item.showOverflow = item.ellipsis ? true : false
          }
          return item;
        })
        .filter(item => {
          return item != undefined;
        });

      return columns;
    },
    //获取列表数据
    async getTableListData(isRest, obj) {
      this.loadingEd = true;
      /* let options = { clearFilterData: false }
      options = _.merge({}, options, obj);
      let params = {
        page: this.isLazy ? isRest && isRest == true ? this.lazyCurrent = 1 : this.lazyCurrent : this.pager.current,
        limit: this.isLazy ? this.lazyLimit : this.pager.pageSize
      };
      //查询重置过滤条件
      if (options.clearFilterData) this.filterParameter = null;
      //过滤条件
      if (this.filterParameter != null) {
        params.filterParameter = JSON.stringify(this.filterParameter)
      }
      if (!this.isLazy && this.pagination && isRest && isRest == true) {
        params.page = this.pager.current = 1
      } */
      let params = {}
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
        }, 20)


        /* if (this.isLazy) {
          if (isRest && isRest == true) {
            this.$refs.tableListDom[0].$el.getElementsByClassName('ant-table-body')[0].scrollTop = 0
            this.lazyCurrent = 1;
            this.tableDatas = resData;
            if (this.filtersHeader) this.handleFiltersHeaderDatas(resData, true);
          } else {
            this.tableDatas = _.concat(this.tableDatas, resData);
            if (this.filtersHeader) this.handleFiltersHeaderDatas(this.tableDatas, false);
          }
          if (this.lazyNoCount) {
            this.lazyNoCountPage = resData.length ? true : false;
          } else {
            this.lazyCount = res.data.payload.count;
          }
        } else {
          this.tableDatas = resData;
          if (this.pagination !== false) {
            this.pager.total = res.data.payload.count;
          }
          if (this.filtersHeader) this.handleFiltersHeaderDatas(resData, true);
        } */
        //this.$emit("onPageLoad", this.isLazy ? this.lazyCurrent : this.pager, this.isLazy ? this.tableDatas : res.data.payload.data, res);
        //console.info(this.tableFullData)
        //console.info(this.tableSynchData)
        this.$emit("onPageLoad", {
          datas: this.tableFullData,
          count: res.data.payload.count,
          response: res
        })
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
