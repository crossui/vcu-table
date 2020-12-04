
export default {
  bind: (el, binding, vnode) => {
    bindEvent(el, binding, vnode)
  },
  componentUpdated(el, binding, vnode) {
    unbindEvent(el)
    bindEvent(el, binding, vnode)
  }
}
const bindEvent = (el, binding, vnode) => {
  const scrollback = binding.value
  const dom = el.getElementsByClassName('ant-table-body')[0];
  el._scrollHandler = () => {
    const scrollDistance = dom.scrollHeight - dom.scrollTop - dom.clientHeight;
    if (scrollDistance <= 0) {  //等于0证明已经到底，可以请求接口
      scrollback()
    }
  }
  dom.addEventListener("scroll", el._scrollHandler, false)
}
const unbindEvent = (el) => {
  let dom = el.getElementsByClassName('ant-table-body')[0];
  dom.removeEventListener('scroll', el._scrollHandler, false)
}