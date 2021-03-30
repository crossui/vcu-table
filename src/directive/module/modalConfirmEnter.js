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
  el._modalEnterHandler = _.debounce(async (e) => {
    const modals = document.getElementsByClassName('modal-confirm-enter-event');
    if (modals.length && modals[0]) {
      const currModal = modals[modals.length - 1];
      let childWrap = currModal.getElementsByClassName("vcu-modal-wrap");
      if (childWrap.length == 0) childWrap = currModal.getElementsByClassName("narrow-modal-content");
      if (childWrap[0].style.display == "none") return;
      let btns = currModal.getElementsByClassName('vcu-btn');
      let index = await returnCurrDom(btns);
      let wrapper = currModal.getElementsByClassName('vcu-modal-confirm-body-wrapper')
      if (e.keyCode == 13) {
        //回车键
        if (index !== false && !btns[index].disabled) {
          btns[index].click();
        }
      } else if (e.keyCode == 37) {
        //左键
        if (btns.length > 1 && index !== false) {
          btns[index].classList.remove("vcu-btn-primary");
          if (index - 1 < 0) {
            btns[index + 1].classList.add("vcu-btn-primary");
            if (wrapper.length) btns[index + 1].focus()
          } else {
            btns[index - 1].classList.add("vcu-btn-primary");
            if (wrapper.length) btns[index - 1].focus()
          }
        }
      } else if (e.keyCode == 39) {
        //右键
        if (btns.length > 1 && index !== false) {
          btns[index].classList.remove("vcu-btn-primary");
          if (index + 1 > btns.length - 1) {
            btns[index - 1].classList.add("vcu-btn-primary");
            if (wrapper.length) btns[index - 1].focus()
          } else {
            btns[index + 1].classList.add("vcu-btn-primary");
            if (wrapper.length) btns[index + 1].focus()
          }
        }
      }
    }

  }, 300)
  window.addEventListener("keyup", el._modalEnterHandler, false)
}
const unbindEvent = (el) => {
  window.removeEventListener('keyup', el._modalEnterHandler, false)
}

function hasClass(element, cls) {
  return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

async function returnCurrDom(btns) {
  return new Promise((resolve, reject) => {
    try {
      Array.prototype.forEach.call(btns, (element, index) => {
        if (hasClass(element, 'vcu-btn-primary')) {
          resolve(index)
        }
      });
    } catch (err) {
      reject(false);
    }
  })
}