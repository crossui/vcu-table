const obj = {}
export default {
  bind: (el, binding) => {
    const options = binding.value.multiplyOptions
    let flag = options.flag == undefined ? "" : options.flag
    obj[`tableCurrentIndex${flag}`] = options.currentIndex == undefined ? "" : options.currentIndex
    obj[`tableCurrentIndexOld${flag}`] = options.currentIndex == undefined ? "" : options.currentIndexOld
    obj[`isDisableSelect${flag}`] = options.disabled == undefined ? false : options.disabled
    obj[`callback${flag}`] = options.callback == undefined ? null : options.callback
    registryEvent(el, binding)
  },
  componentUpdated(el, binding) {
    const options = binding.value.multiplyOptions
    let flag = options.flag == undefined ? "" : options.flag
    obj[`tableCurrentIndex${flag}`] = options.currentIndex == undefined ? "" : options.currentIndex
    obj[`tableCurrentIndexOld${flag}`] = options.currentIndex == undefined ? "" : options.currentIndexOld
    obj[`isDisableSelect${flag}`] = options.disabled == undefined ? false : options.disabled
    obj[`callback${flag}`] = options.callback == undefined ? null : options.callback
  },
  unbind: (el, binding) => {
    el.onmousedown = null
  }
}

/**
 * 注册事件
 */
function registryEvent(el, binding,vnode) {
  const options = binding.value.multiplyOptions
  let flag = options.flag == undefined ? "" : options.flag
  let multiplyStartIndex = null
  let status = null //用于判断禁止状态是否改变 
  let multiplyIndexList = []
  function clearMultiplyList(){
    multiplyIndexList = []
    status = null
    multiplyStartIndex = null
    obj[`callback${flag}`]({
      multiplyIndexList,
      clearMultiplyList
    })
  }
  el.onclick = (e) => {
    const isAltKey = e.altKey //一次选一个
    const isShiftKey = e.shiftKey //一次选多个
    el.style.webkitUserSelect = "inherit"
    el.style.userSelect = "inherit"
    //记录点击alt前初始位置的索引，当进行多选的时候会对第一次点击的索引为中心进行多选
    multiplyStartIndex = multiplyStartIndex == null ? obj[`tableCurrentIndexOld${flag}`] : multiplyStartIndex
    //如果处于禁止状态则记录该状态
    if (obj[`isDisableSelect${flag}`]) {
      status = obj[`isDisableSelect${flag}`]
    }
    //当静止状态从true变为false的时候获取当前点击的索引
    if (status && !obj[`isDisableSelect${flag}`]) {
      multiplyStartIndex = obj[`tableCurrentIndexOld${flag}`]
      status = null
    }
    let current = multiplyIndexList.indexOf(obj[`tableCurrentIndex${flag}`])
    //如果处于修改状态无法进行多选
    if (!obj[`isDisableSelect${flag}`]) {
      if (isAltKey || isShiftKey) {
        el.style.webkitUserSelect = "none"
        el.style.userSelect = "none"
      }
      if (isAltKey) {
        //如果重复点击说明取消该多选
        if (current < 0) {
          multiplyIndexList.push(multiplyStartIndex)
          multiplyIndexList.push(obj[`tableCurrentIndex${flag}`])
        } else {
          multiplyIndexList = _.remove(multiplyIndexList, n => {
            return n != obj[`tableCurrentIndex${flag}`]
          })
        }
      } else if (isShiftKey) {
        multiplyIndexList = []
        switch (true) {
          case obj[`tableCurrentIndex${flag}`] > multiplyStartIndex:
            for (let i = multiplyStartIndex; i <= obj[`tableCurrentIndex${flag}`]; i++) {
              multiplyIndexList.push(i)
            }
            break;
          case obj[`tableCurrentIndex${flag}`] < multiplyStartIndex:
            for (let i = obj[`tableCurrentIndex${flag}`]; i <= multiplyStartIndex; i++) {
              multiplyIndexList.push(i)
            }
            break;
          default:
            multiplyIndexList.push(obj[`tableCurrentIndex${flag}`])
            break;
        }
      } else {
        multiplyIndexList = []
        multiplyStartIndex = null
      }
    }else {
      el.style.webkitUserSelect = null
      el.style.userSelect = null
    }
    obj[`callback${flag}`]({
      multiplyIndexList,
      clearMultiplyList
    })
  }
  obj[`callback${flag}`]({
    multiplyIndexList,
    clearMultiplyList
  })
}
