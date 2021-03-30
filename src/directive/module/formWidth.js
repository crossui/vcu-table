export default {
  inserted: (el, binding) => {
    if (hasClass(el, "vcu-form-item")) {
      setTimeout(() => {
        setWidth(el, binding);
      }, 0);
    } else {
      setWidth(el, binding);
    }

  },
  // componentUpdated: (el, binding) => {
  //     if (hasClass(el, "vcu-form-item")) {
  //         setTimeout(() => {
  //             setWidth(el, binding);
  //         }, 0);
  //     } else {
  //         setWidth(el, binding);
  //     }
  // }

}
const setWidth = function (el, binding) {

  let targetLabelArray = el.getElementsByClassName("vcu-form-item-label");
  let targetWrapperArray = el.getElementsByClassName("vcu-form-item-control-wrapper");
  for (let i = 0; i < targetWrapperArray.length; i++) {
    if (binding.value.labelWidth) targetLabelArray[i].style.width = `${binding.value.labelWidth}px`;
    if (binding.value.wrapperWidth) targetWrapperArray[i].style.width = `${binding.value.wrapperWidth}px`;
  }
}

const hasClass = function (element, cls) {
  return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}