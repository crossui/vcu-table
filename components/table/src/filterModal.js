import XEUtils from 'xe-utils'
import GlobalConfig from '../../conf'
import { UtilTools } from '../../tools'
export default {
  props: {
    value: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: "default"
    },
    filterFormData: {
      type: Object,
      default: () => { }
    }
  },
  watch: {
    value(val) {
      this.visible = val;
      if (val) {
        this.init()
      } else {
        this.tplName = "";
        this.findSelectId = "";
        this.defaultCondition = false;
        this.isSaveTpl = false;
      }
    },
  },
  computed: {
    filterFormDatas() {
      return _.merge({}, this.filterFormData);
    }
  },
  data() {
    return {
      visible: false,
      selectOptions: [],
      findSelectId: "",
      filterLists: [{
        detailValue: "",
        detailName: "",
        operationVal: "1",
        fieldValue: "",
        relationVal: "1"
      }],
      submitLoading: false,
      defaultCondition: false,
      isSaveTpl: false,
      tplNameVisible: false,
      tplName: "",
      delectLoading: false,
      saveLoading: false,
      tableColumns: [],
      operationList: [],
      relationList: [],
      $xetable: null,
      saveTplType: false
    };
  },
  render() {
    const {
      visible,
      handleSaveTpl,
      handleDelectTpl,
      handleReduction,
      handleCancel,
      handleSubmit,
      operationList,
      relationList,
      tableColumns,
      selectOptions,
      filterLists,
      size,
      changeIsSaveTpl
    } = this;
    const modalProps = {
      ref: 'filterTplModalDom',
      props: {
        visible: visible,
        title: "数据过滤设置",
        width: 700,
        bodyStyle: { padding: 0 },
        wrapClassName: "filter-tpl-modal",
      },
      attrs: {},
      on: {
        cancel: handleCancel
      }
    }
    //自定义过滤模板select
    const filterTplSlectProps = {
      props: {
        size
      },
      style: {
        width: '200px'
      },
      class: {
        "mr-10": true
      },
      on: {
        change: this.onChangeFilterTpl
      }
    }

    //模板名称弹窗
    const tplNameModalProps = {
      ref: 'filterTplNameModalDom',
      props: {
        visible: this.tplNameVisible,
        title: "请输入模板名称",
        destroyOnClose: true
      },
      attrs: {},
      on: {
        ok: this.handleOkTplName,
        cancel: this.handleCancelTplName
      }
    }
    return (<div>
      <v-modal {...modalProps}>
        <div class="clearfix" slot="footer">
          <div class="fl">
            <v-checkbox v-model={this.defaultCondition}>同时设为默认过滤条件</v-checkbox>
            <v-checkbox v-model={this.isSaveTpl} onChange={changeIsSaveTpl}>同时存为模板</v-checkbox>
          </div>
          <div class="fr">
            <v-button key="reduction" size={size} onClick={handleReduction}>还原</v-button>
            <v-button key="back" size={size} onClick={handleCancel}>取消</v-button>
            <v-button key="submit" type="primary" size={size} onClick={handleSubmit} loading={this.submitLoading}>确定</v-button>
          </div>
        </div>
        <div class="vcu-filter-content">
          <div class="vcu-filter-content-header">
            <span class="mr-10">自定义过滤模板:</span>
            <v-select {...filterTplSlectProps} v-model={this.findSelectId} >
              {selectOptions.map(item => {
                return (
                  <v-select-option value={item.templateId}>
                    {item.templateName}
                  </v-select-option>
                )
              })}
            </v-select>
            <v-tooltip title="保存"><v-button size={size} class="mr-10" onClick={handleSaveTpl} loading={this.saveLoading} icon="save"></v-button></v-tooltip>
            <v-tooltip title="删除"><v-button size={size} class="mr-10" onClick={handleDelectTpl} loading={this.delectLoading} icon="delete"></v-button></v-tooltip>
          </div>
          <div class="vcu-filter-content-col">
            <v-row type="flex" gutter={5}>
              <v-col span={6}>
                列名:
              </v-col>
              <v-col span={4}>
                运算符:
              </v-col>
              <v-col span={8}>
                列值:
              </v-col>
              <v-col span={3}>
                关系符:
              </v-col>
              <v-col span={3}>
              </v-col>
            </v-row >
          </div>
          <div class="vcu-container-warp">
            {filterLists.map((item, index) => {
              return (
                <v-row type="flex" gutter={5} class="mb-5">
                  <v-col span={6}>
                    <v-select size={size} dropdownMatchSelectWidth={false} v-model={item.detailName} class="mr-10" style="width: 100%" onChange={() => { this.handleChangeColumns(index) }}>
                      {tableColumns.map(cloumnsItem => {
                        return (
                          cloumnsItem.key == "action" || cloumnsItem.field == "action" ? ""
                            : <v-select-option value={cloumnsItem.title} key={cloumnsItem.title}>
                              {cloumnsItem.title}
                            </v-select-option>
                        )
                      })}
                    </v-select>
                  </v-col>
                  <v-col span={4}>
                    <v-select size={size} v-model={item.operationVal} class="mr-10" style="width: 100%">
                      {operationList.map(operationItem => {
                        return (
                          <v-select-option value={operationItem.key} key={operationItem.key}>
                            {operationItem.title}
                          </v-select-option>
                        )
                      })}
                    </v-select>
                  </v-col>
                  <v-col span={8}>
                    {this.componentTypes(item) ? <autoTypewrit size={size}
                      v-model={item.fieldValue} transfer loadOptions={this.componentTypes(item).loadOptions} backfillKey={this.componentTypes(item).backfillKey}
                    ></autoTypewrit> : <v-input size={size} v-model={item.fieldValue} />}
                  </v-col>
                  <v-col span={3}>
                    <v-select size={size} v-model={item.relationVal} class="mr-10" style="width: 100%">
                      {relationList.map(relationItem => {
                        return (
                          <v-select-option value={relationItem.key} key={relationItem.key}>
                            {relationItem.title}
                          </v-select-option>
                        )
                      })}
                    </v-select>
                  </v-col>
                  <v-col span={3}>
                    {
                      index == 0
                        ?
                        <v-button size={size} icon="plus" onClick={() => this.handleAddItem(index)} />
                        :
                        <div>
                          <v-button size={size} icon="plus" class="mr-5" onClick={() => this.handleAddItem(index)} />
                          <v-button size={size} icon="close" onClick={() => this.handleRemoveItem(index)} />
                        </div>
                    }
                  </v-col>
                </v-row >
              )
            })}
          </div>

        </div >
      </v-modal>
      <v-modal {...tplNameModalProps}>
        <v-input v-model={this.tplName} />
      </v-modal>
    </div >)
  },
  mounted() {

  },
  methods: {
    syncUpdate(params) {
      const { collectColumn, $table } = params
      this.$xetable = $table
      let _columns = XEUtils.filter(collectColumn, item => !XEUtils.includes(["seq", "radio", "checkbox"], item.type))
      _columns = XEUtils.filterTree(_columns, item => !item.children)
      _columns = XEUtils.map(_columns, item => {
        let _item = { ...item }
        if (item.fatherKey) {
          const fatherItem = XEUtils.findTree(collectColumn, col => col.key == item.fatherKey)
          _item.oldTitle = item.title
          _item.title = `${item.title}->${fatherItem.item.title}`
        }
        return _item
      })
      this.tableColumns = _columns
    },
    //加载过滤字典
    async getFilterDict() {
      /* //获取运算符字典
      let operationdata = { zdmc: this.filterFormDatas.operationFormData.zdmc }
      let operationListsRes = await this.requestFilterDict("POST", this.filterFormDatas.operationUrl, operationdata)
      this.operationList = operationListsRes ? operationListsRes : []
      //获取关系符字典
      let relationdata = { zdmc: this.filterFormDatas.relationFormData.zdmc }
      let relationListsRes = await this.requestFilterDict("POST", this.filterFormDatas.relationUrl, relationdata)
      this.relationList = relationListsRes ? relationListsRes : [] */

      //获取运算符字典
      this.operationList = [{
        "title": "等于",
        "key": "1"
      }, {
        "title": "不等于",
        "key": "2"
      }, {
        "title": "大于",
        "key": "3"
      }, {
        "title": "大等于",
        "key": "4"
      }, {
        "title": "小于",
        "key": "5"
      }, {
        "title": "小等于",
        "key": "6"
      }, {
        "title": "包含",
        "key": "7"
      }, {
        "title": "不包含",
        "key": "8"
      }, {
        "title": "为空",
        "key": "9"
      }, {
        "title": "不为空",
        "key": "10"
      }, {
        "title": "以..开头",
        "key": "11"
      }, {
        "title": "不以..开头",
        "key": "12"
      }, {
        "title": "以..结尾",
        "key": "13"
      }, {
        "title": "不以..结尾",
        "key": "14"
      }];

      //获取关系符字典
      this.relationList = [{ "title": "并且", "key": "1" }, { "title": "或者", "key": "2" }];
    },
    async requestFilterDict(method, url, data) {
      try {
        let res = await GlobalConfig.request({ method, url, data });
        return res.data.payload;
      } catch (err) {
        return [];
      }
    },
    async init() {
      if (!this.filterFormDatas.filterFindUrl || this.filterFormDatas.filterFindUrl == "") {
        console.error("prpos: filterFormDatas.filterFindUrl 不能为空")
        return;
      }
      if (!this.filterFormDatas.filterFindFormData.deptNo || this.filterFormDatas.filterFindFormData.deptNo == "") {
        console.error("prpos: filterFormDatas.filterFindFormData.deptNo 不能为空")
        return;
      }
      if (this.operationList.length == 0 || this.relationList.length == 0) {
        this.getFilterDict()
      }
      let res = await this.getFilterDatas()
      let resList = res.data.payload
      this.selectOptions = resList;
      //是否有默认过滤条件
      if (resList.length) {
        let b = false;
        resList.forEach((item, index) => {
          if (item.templateType == 0) {
            b = index
          }
        })
        if (b !== false) {
          let data = resList[b]
          this.findSelectId = data.templateId;
          this.handleTpLDatas(data)
        }
      }
    },
    //生成列值输入框类型（input/autoTypewrit）
    componentTypes(item) {
      let type = false;
      let autoTypewritLists = this.filterFormDatas.autoTypewritLists
      if (autoTypewritLists && XEUtils.isArray(autoTypewritLists)) {
        let list = XEUtils.filter(autoTypewritLists, o => item.detailValue == o.key)
        if (list.length) {
          type = list[0]
        }
      }
      return type;
    },
    //获取模板数据
    async getFilterDatas() {
      let finddata = { data: this.filterFormDatas.filterFindFormData }
      try {
        let res = await GlobalConfig.request({
          method: "POST",
          url: `${this.filterFormDatas.filterFindUrlPrefix.find}${this.filterFormDatas.filterFindUrl}`,
          ...finddata
        });
        return res;
      } catch (err) {
        return [];
      }
    },
    //处理默认或选择模板后数据
    handleTpLDatas(data) {
      let list = [];
      if (data.templateDetailList && data.templateDetailList.length) {
        data.templateDetailList.forEach(item => {
          let detailValue = ""
          this.tableColumns.forEach(columnsItem => {
            if (columnsItem.key == item.detailValue) detailValue = columnsItem.filter_name && columnsItem.filter_name != "" ? columnsItem.filter_name : columnsItem.ora_name;
          })
          list.push({
            detailValue: detailValue,
            detailName: item.detailName,
            operationVal: item.operators,
            fieldValue: item.fieldValue,
            relationVal: item.arithmetic
          })
        })
        this.filterLists = list
      }
    },
    //自定义过滤模板改变后
    onChangeFilterTpl(value) {
      this.findSelectId = value;
      this.selectOptions.forEach(item => {
        if (item.templateId == value) {
          this.handleTpLDatas(item)
        }
      })
    },
    //处理列名发生改变后
    handleChangeColumns(index) {
      this.tableColumns.forEach(item => {
        if (item.title == this.filterLists[index].detailName) {
          this.filterLists[index].detailValue = item.filter_name && item.filter_name != "" ? item.filter_name : item.ora_name
          this.filterLists[index].detailName = item.oldTitle ? item.oldTitle : item.title
        }
      })
    },
    //添加过滤项
    handleAddItem(index) {
      let item = {
        detailValue: "",
        detailName: "",
        operationVal: "1",
        fieldValue: "",
        relationVal: "1"
      }
      //插入 splice中数组的指定索引位置插入元素，0表示有0个元数组元素删除
      this.filterLists.splice(index + 1, 0, item);
    },
    //删除过滤项
    handleRemoveItem(index) {
      this.filterLists.splice(index, 1);
    },
    //还原
    handleReduction() {
      this.$emit("onReduction")
      this.handleCancel()
    },
    //取消
    handleCancel() {
      this.visible = false;
      this.$emit("input", this.visible);
    },
    //提交
    async handleSubmit(type) {
      this.saveTplType = type === true ? type : false;
      let isEmptyColumn = this.validateFilterColumnVal();
      if (isEmptyColumn === true) {
        for (let i = 0; i < this.filterLists.length; i++) {
          if (this.filterLists[i].fieldValue == "") {
            let b = await this.handleFilterEmptyValue(i);
            if (!b) {
              this.saveLoading = false;
              return false;
            }
          }
        }
        if (this.defaultCondition || this.isSaveTpl || this.saveLoading) {
          this.submitFilterTpl()
        } else {
          this.emitSubmit()
        }
      } else {
        this.$error({
          title: '提示',
          content: `第 ${++isEmptyColumn} 过滤项的<列名>不能为空`,
        });
        this.saveLoading = false;
      }
    },
    //回调
    emitSubmit() {
      let res = this.renderFilterParameter(this.filterLists)
      this.$emit("onSubmit", res)
      this.handleCancel()
    },
    //检查过滤项列名是否有空的
    validateFilterColumnVal() {
      let b = true
      _.forEach(this.filterLists, (item, index) => {
        if (item.detailName == '') {
          b = index;
          return false
        }
      })
      return b
    },
    //列值为空是否继续
    async handleFilterEmptyValue(index) {
      return new Promise((resolve, reject) => {
        try {
          this.$confirm({
            title: '提示',
            content: `第 ${++index} 过滤项的<列值>为空，确定继续吗？`,
            onOk() {
              resolve(true);
            },
            onCancel() {
              resolve(false);
            },
          });
        } catch (err) {
          reject(false);
        }
      })
    },
    //生成过滤结果集数据
    renderFilterParameter(lists, b) {
      let res = []
      lists.forEach((item, index) => {
        res.push({
          "detailValue": item.detailValue,
          "detailNo": index,
          "detailName": item.detailName,
          "arithmetic": item.operationVal,
          "fieldValue": item.fieldValue,
          "operators": item.relationVal
        })
      })
      return res;
    },
    //保存模板/修改模板
    async submitFilterTpl() {
      if (this.defaultCondition && this.isSaveTpl) {
        this.saveType = 3 //同时设为默认过滤条件 and 同时存为模板
      } else if (!this.defaultCondition && this.isSaveTpl) {
        this.saveType = 2 //同时存为模板
      } else if (this.saveLoading) {
        this.saveType = 2 //保存模板
      } else {
        this.saveType = 1
      }
      if (this.saveType != 1 || this.saveLoading) {
        if (this.findSelectId != "") {
          const templateItem = this.selectOptions.filter(item => this.findSelectId == item.templateId)
          this.tplName = templateItem[0].templateName
          let modalRes = await UtilTools.showConfirmModal({ content: "确定要修改当前模板吗？" })
          if (modalRes) {
            this.tplNameVisible = true
          } else {
            this.saveLoading = false
          }
        } else {
          this.tplName = "";
          this.tplNameVisible = true;
        }
      } else {
        this.handleSubmitFilterTpl()
      }
    },
    //生成保存模板条件数据
    renderTemplateDetailList() {
      let res = []
      this.filterLists.forEach((item, index) => {
        let detailValue = ""
        this.tableColumns.forEach(columnsItem => {
          if (columnsItem.title == item.detailName) {
            detailValue = columnsItem.filter_name && columnsItem.filter_name != "" ? columnsItem.filter_name : columnsItem.ora_name;
          }
        })
        res.push({
          "detailValue": detailValue,
          "detailNo": index,
          "detailName": item.detailName,
          "arithmetic": item.relationVal,
          "fieldValue": item.fieldValue,
          "operators": item.operationVal
        })
      })
      return res;
    },
    //提交模板数据
    async handleSubmitFilterTpl() {
      let templateDetailList = this.renderTemplateDetailList()
      let data = {
        templateId: this.findSelectId,
        templateName: this.tplName ? this.tplName : "默认",
        ...this.filterFormDatas.filterSaveFormData,
        saveType: this.saveType,
        templateDetailList: JSON.stringify(templateDetailList)
      }

      this.submitLoading = true;
      try {
        let res = await GlobalConfig.request({
          method: "POST",
          url: `${this.filterFormDatas.filterFindUrlPrefix.save}${this.filterFormDatas.filterFindUrl}`,
          data: { ...data }
        });
        if (res) {
          await UtilTools.showTipsModal({ content: "过滤模板保存成功！" })
          if (!this.saveTplType) this.emitSubmit()
        } else {
          await UtilTools.showTipsModal({ content: "过滤模板保存失败！" })
        }
      } catch (err) {
        await UtilTools.showTipsModal({ content: "过滤模板保存失败！" })
      }
      this.saveLoading = false;
      this.submitLoading = false;
    },
    //确认 模板名称
    handleOkTplName() {
      if (this.tplName == "") {
        this.$message.error('模板名称不能为空');
      } else {
        this.handleSubmitFilterTpl()
        this.handleCancelTplName()
      }
    },
    //取消 模板名称
    handleCancelTplName() {
      this.tplNameVisible = false
      this.saveLoading = false
    },
    //删除模板
    handleDelectTpl() {
      if (this.findSelectId == "") {
        this.$error({
          title: '提示',
          content: '请选择要删除的模板',
        });
      } else {
        let _this = this;
        this.$confirm({
          title: '提示',
          content: "确定要删除该过滤模板吗？",
          onOk() {
            _this.delectTplSubmit()
          }
        });
      }
    },
    //删除模板 请求
    async delectTplSubmit() {
      this.delectLoading = true
      try {
        let res = await GlobalConfig.request({
          method: "POST",
          url: `${this.filterFormDatas.filterFindUrlPrefix.delete}${this.filterFormDatas.filterFindUrl}`,
          data: { templateId: this.findSelectId }
        });
        if (res) {
          await UtilTools.showTipsModal({ content: "过滤模板删除成功！" })
          this.findSelectId = "";
          this.init()
        } else {
          await UtilTools.showTipsModal({ content: "过滤模板删除失败！" })
        }
      } catch (err) {
        await UtilTools.showTipsModal({ content: "过滤模板删除失败！" })
      }
      this.delectLoading = false;
    },
    //提示保存模板
    async changeIsSaveTpl(e) {
      if (e.target.checked && this.findSelectId != "") {
        let modalRes = await UtilTools.showConfirmModal({ content: "确定要对当前模板进行重置吗？" })
        if (!modalRes) {
          this.isSaveTpl = false
        }
      }
    },
    //保存模板
    handleSaveTpl() {
      this.saveTplType = true;
      this.saveLoading = true;
      this.handleSubmit(true);
    }
  }
};