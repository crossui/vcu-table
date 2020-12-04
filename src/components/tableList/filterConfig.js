import request from "@/utils/request.js";
export default {
  props: {
    value: {
      type: Boolean,
      default: true
    },
    tableColumns: {
      type: Array,
      default: () => []
    },
    size: {
      type: String,
      default: "default"
    },
    operationList: {
      type: Array,
      default: () => []
    },
    relationList: {
      type: Array,
      default: () => []
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
      saveLoading: false

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
      size
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
      <a-modal {...modalProps}>
        <div class="clearfix" slot="footer">
          <div class="fl">
            <a-checkbox v-model={this.defaultCondition}>同时设为默认过滤条件</a-checkbox>
            <a-checkbox v-model={this.isSaveTpl}>同时存为模板</a-checkbox>
          </div>
          <div class="fr">
            <a-button key="reduction" size={size} onClick={handleReduction}>还原</a-button>
            <a-button key="back" size={size} onClick={handleCancel}>取消</a-button>
            <a-button key="submit" type="primary" size={size} onClick={handleSubmit} loading={this.submitLoading}>确定</a-button>
          </div>
        </div>
        <div class="filter-content">
          <div class="filter-content-header">
            <span class="mr-10">自定义过滤模板:</span>
            <a-select {...filterTplSlectProps} v-model={this.findSelectId} >
              {selectOptions.map(item => {
                return (
                  <a-select-option value={item.templateId}>
                    {item.templateName}
                  </a-select-option>
                )
              })}
            </a-select>
            <a-button size={size} class="mr-10" onClick={handleSaveTpl} loading={this.saveLoading} icon="save"></a-button>
            <a-button size={size} class="mr-10" onClick={handleDelectTpl} loading={this.delectLoading} icon="delete"></a-button>
          </div>
          <div class="filter-content-col">
            <a-row type="flex" gutter={5}>
              <a-col span={6}>
                列名:
                </a-col>
              <a-col span={4}>
                运算符:
              </a-col>
              <a-col span={8}>
                列值:
              </a-col>
              <a-col span={3}>
                关系符:
                </a-col>
              <a-col span={3}>
              </a-col>
            </a-row >
          </div>
          <scrollbar class="filter-content-container">
            <div class="container-warp">
              {filterLists.map((item, index) => {
                return (
                  <a-row type="flex" gutter={5} class="mb-5">
                    <a-col span={6}>
                      <a-select size={size} v-model={item.detailName} class="mr-10" style="width: 100%" onChange={() => { this.handleChangeColumns(index) }}>
                        {tableColumns.map(cloumnsItem => {
                          return (
                            <a-select-option value={cloumnsItem.title} key={cloumnsItem.title}>
                              {cloumnsItem.title}
                            </a-select-option>
                          )
                        })}
                      </a-select>
                    </a-col>
                    <a-col span={4}>
                      <a-select size={size} v-model={item.operationVal} class="mr-10" style="width: 100%">
                        {operationList.map(operationItem => {
                          return (
                            <a-select-option value={operationItem.key} key={operationItem.key}>
                              {operationItem.title}
                            </a-select-option>
                          )
                        })}
                      </a-select>
                    </a-col>
                    <a-col span={8}>
                      <a-input size={size} v-model={item.fieldValue} />
                    </a-col>
                    <a-col span={3}>
                      <a-select size={size} v-model={item.relationVal} class="mr-10" style="width: 100%">
                        {relationList.map(relationItem => {
                          return (
                            <a-select-option value={relationItem.key} key={relationItem.key}>
                              {relationItem.title}
                            </a-select-option>
                          )
                        })}
                      </a-select>
                    </a-col>
                    <a-col span={3}>
                      {
                        index == 0
                          ?
                          <a-button size={size} icon="plus" onClick={() => this.handleAddItem(index)} />
                          :
                          <div>
                            <a-button size={size} icon="plus" class="mr-5" onClick={() => this.handleAddItem(index)} />
                            <a-button size={size} icon="close" onClick={() => this.handleRemoveItem(index)} />
                          </div>
                      }
                    </a-col>
                  </a-row >
                )
              })}
            </div>

          </scrollbar>
        </div >
      </a-modal>
      <a-modal {...tplNameModalProps}>
        <a-input v-model={this.tplName} />
      </a-modal>
    </div >)
  },
  mounted() {

  },
  methods: {
    async init() {
      if (!this.filterFormDatas.filterFindUrl || this.filterFormDatas.filterFindUrl == "") {
        console.error("prpos: filterFormDatas.filterFindUrl 不能为空")
        return;
      }
      if (!this.filterFormDatas.filterFindFormData.deptNo || this.filterFormDatas.filterFindFormData.deptNo == "") {
        console.error("prpos: filterFormDatas.filterFindFormData.deptNo 不能为空")
        return;
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
    //获取模板数据
    async getFilterDatas() {
      let finddata = { data: this.filterFormDatas.filterFindFormData }
      try {
        let res = await request({
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
          this.tableColumns.forEach(columnsItem=>{
            if(columnsItem.key == item.detailValue) detailValue = columnsItem.filter_name && columnsItem.filter_name != "" ? columnsItem.filter_name : columnsItem.ora_name;
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
          this.filterLists[index].detailName = item.title
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
    async handleSubmit() {
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
        if (item.detailValue == '') {
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
    submitFilterTpl() {
      if (this.defaultCondition && this.isSaveTpl) {
        this.saveType = 3
      } else if (!this.defaultCondition && this.isSaveTpl) {
        this.saveType = 2
      } else if (this.saveLoading) {
        this.saveType = 2
      } else {
        this.saveType = 1
      }
      if (this.saveType != 1 || this.saveLoading) {
        this.tplNameVisible = true;
        if (this.findSelectId != "") {
          this.selectOptions.forEach(item => {
            if (this.findSelectId == item.templateId) {
              this.tplName = item.templateName
            }
          })
        } else {
          this.tplName = "";
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
          if (columnsItem.title == item.detailName) detailValue = columnsItem.key
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
        let res = await request({
          method: "POST",
          url: `${this.filterFormDatas.filterFindUrlPrefix.save}${this.filterFormDatas.filterFindUrl}`,
          data: { ...data }
        });
        if (res) {
          this.$message.success('过滤模板保存成功！');
          this.emitSubmit()
        } else {
          this.$message.error('过滤模板保存失败！');
        }
      } catch (err) {
        this.$message.error('过滤模板保存失败！');
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
        let res = await request({
          method: "POST",
          url: `${this.filterFormDatas.filterFindUrlPrefix.delete}${this.filterFormDatas.filterFindUrl}`,
          data: { templateId: this.findSelectId }
        });
        if (res) {
          this.$message.success('过滤模板删除成功！');
          this.findSelectId = "";
          this.init()
        } else {
          this.$message.error('过滤模板删除失败！');
        }
      } catch (err) {
        this.$message.error('过滤模板删除失败！');
      }
      this.delectLoading = false;
    },
    //保存模板
    handleSaveTpl() {
      this.saveLoading = true;
      this.handleSubmit(true);
    }
  }
};