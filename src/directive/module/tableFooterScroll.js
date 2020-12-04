export default {
  bind: (el) => {
    footerTbaleScroll(el)
  },
  componentUpdated(el) {
    unbindFooterScroll(el);
    footerTbaleScroll(el);
  }
}
const footerTbaleScroll = (el) => {
  let tableCount = el.getElementsByClassName('ant-table-body').length;
  let tableDom1 = el.getElementsByClassName('ant-table-body')[0];
  let tableDom2 = el.getElementsByClassName('ant-table-body')[tableCount - 1];
  el._bindHandlerScroll = () => {
    tableDom2.scrollLeft = tableDom1.scrollLeft
  }
  tableDom1.addEventListener('scroll', el._bindHandlerScroll, false)
}
const unbindFooterScroll = (el) => {
  let tableDom1 = el.getElementsByClassName('ant-table-body')[0];
  tableDom1.removeEventListener('scroll', el._bindHandlerScroll, false)
}