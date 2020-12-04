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
  let dom, dragData = {};
  el._modalDragHandler = (e) => {
    dom = isAllowDragDom(e.target)
    if (dom) {
      dragData.x = e.pageX - dom.offsetLeft;
      dragData.y = e.pageY - dom.offsetTop;
      window.addEventListener("mousemove", el._modalDragMore, false)
      window.addEventListener("mouseup", el._modalDragUp, false)
    }
  }

  el._modalDragMore = (e) => {
    dom.style.left = e.pageX - dragData.x + "px";
    dom.style.top = e.pageY - dragData.y + "px";
  }

  el._modalDragUp = (e) => {
    dom = null;
    dragData = {};
    window.removeEventListener("mousemove", el._modalDragMore, false)
    window.removeEventListener("mouseup", el._modalDragUp, false)
  }

  window.addEventListener("mousedown", el._modalDragHandler, false)
}
const unbindEvent = (el) => {
  window.removeEventListener('mousedown', el._modalDragHandler, false)
}

function isAllowDragDom(element) {
  try {
    let isallow = false;
    if (element.className.indexOf("ant-modal") > -1 || element.className.indexOf("narrow-modal") > -1) {
      let antModal1 = getParents(element, "ant-modal-content");
      let antModal2 = getParents(element, "narrow-modal-content");
      let antModal = antModal1 == null ? antModal2 : antModal1;
      isallow = antModal;
    }
    return isallow;
  } catch (err) {
    return false;
  }
}

//获取指定class的父节点
function getParents(element, className) {
  let returnParentElement = null;

  function getParentNode(element, className) {
    if (_.isElement(element)) {
      if (element && element.classList.contains(className) && element.tagName.toLowerCase() != "body") {
        returnParentElement = element;
      } else {
        getParentNode(element.parentElement, className);
      }
    }
  }
  getParentNode(element, className);

  return returnParentElement;
}