import store from '@/store'

export default {
  inserted: (el, binding, vnode) => {
    const routerName = vnode.context.$route.name
    const actionName = binding.arg
    const actions = _.flatten(store.state.app.menuList.map(list => getActions(list, routerName)));
    if (!actions || actions.length == 0) return
    const permissionList = actions.map(item => {
      return item.action
    }).filter(item => {
      return item != undefined
    })
    if (permissionList.includes(actionName)) {
      return
    } else {
      el.parentNode && el.parentNode.removeChild(el) || (el.style.display = 'none')
    }
  }
}

const getActions = (list, routerName) => {
  if (!list) return;
  let action = [];

  if (list.name == routerName) {
    if (list.meta.action) {
      action = list.meta.action
    }
  }
  if (_.isArray(list.children) && !_.isEmpty(list.children)) {
    let children = _.flatten(list.children.map(subList => getActions(subList, routerName)))
    action = action.concat(_.flatten(children));
  }

  return action
}