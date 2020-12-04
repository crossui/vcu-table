import directive from './directives'

const importDirective = Vue => {
   /**
    * 快捷键指令 v-hotkey="options"
    * options = {
    *  keyVal: /快捷键字符/,
    *  callBack: /快捷键回调方法 带返回值 {}/
    * }
    */
   Vue.directive("hotkey", directive.hotkey);
   /**
    * Action 权限指令
    * 指令用法：
    *  - 在需要控制 action 级别权限的组件上使用 v-action:[method] , 如下：
    *    <a-button v-action:add >添加用户</a-button>
    *    <a-button v-action:delete>删除用户</a-button>
    *    <a v-action:edit @click="edit(record)">修改</a>
    *
    *  - 当前用户没有权限时，组件上使用了该指令则会被隐藏
    */
   Vue.directive("action", directive.action);

   /**
    * table-lazy 权限指令
    * 指令用法：
    *  - 在需要懒加载的表格上 v-table-lazy="callback" 
    */
   Vue.directive("table-lazy", directive.tablelazy);
   /**
      * form-width (v-form-width)
      * 指令用法：
      * <a-form v-form-width="{ labelWidth: 90, wrapperWidth: 250 }"></a-form> 
      * <a-form-item v-form-width="{ labelWidth: 90, wrapperWidth: 250 }"></a-form-item>
      * @params
      * labelWidth:表单名称宽度
      * wrapperWidth：表单控件宽度
      */
   Vue.directive("form-width", directive.formWidth);
   /**
      * tableFooterScroll (v-tableFooterScroll)
      * 指令用法：
      *  - <a-table v-tableFooterScroll :footer="footerFunc" :columns="columns" :dataSource="data" :scroll="{ x: 2300 }"></a-table>
      * 
      * 注意footer的宽度应与table宽度保持一致
     */
   Vue.directive("table-footer-scroll", directive.tableFooterScroll);

   /**
      * modalConfirmEnter
      * 指令用法：
      *  - <app v-modal-enter></app>
     */
    Vue.directive("modal-confirm-enter", directive.modalConfirmEnter);

    /**
      * foucsNextEnter
      * 指令用法：
      *  - <div v-foucs-next-enter></div>
     */
    Vue.directive("foucs-next-enter", directive.foucsNextEnter);
    
    /**
      * transferDom
      * 指令用法：
      *  - <div v-transfer-dom></div>
     */
    Vue.directive("transfer-dom", directive.transferDom);
    /**
      * clickOutside
      * 指令用法：
      *  - <div v-click-outside="Config"></div>
     */
    Vue.directive("click-outside", directive.clickOutside);
    /**
      * modalDrag
      * 指令用法：
      *  - <div v-modal-drag></div>
     */
    Vue.directive("modal-drag", directive.modalDrag);
   /**
      * multiplySelect
      * 指令用法：
      *  - <table v-multiply-select="{ multiplyOptions }"></table>
      * multiplyOptions {
      *   currentIndex  --  当前表格中点击选中的索引
      *   currentIndexOld --  当前表格索引改变之前的值
      *   disabled  --  是否停止多选操作   不传默认false
      *   flag -- 用于同页面多个表格需要多选的时候区分的标志，不传默认""
      *   callback  --  回调函数，接收一个对象option
      * }
      * callback --- option : {
      *   clearMultiplyList, --请空索引数组的方法
      *   multiplyIndexList,   -- 被选中行索引的集合
      * }
     */
    Vue.directive("multiply-select", directive.multiplySelect);
}

export default importDirective
