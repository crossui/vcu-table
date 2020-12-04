import { getKeyMap, createArr } from './main'
import store from '@/store';

function bindEvent(el, { value, modifiers }, alias) {
  const arr = createArr(value)
  const priority = value.map(item => {
    return item.priority
  })
  el._keymap = getKeyMap(arr, alias, priority)
  el._keyHandler = e => {
    if (modifiers.prevent) e.preventDefault()
    if (modifiers.stop) {
      const { nodeName, isContentEditable } = document.activeElement
      if (isContentEditable) return
      switch (nodeName) {
        case 'INPUT':
        case 'TEXTAREA':
        case 'SELECT':
          return
      }
    }
    for (const hotkey of el._keymap) {
        const callback = hotkey.keyCode === e.keyCode &&
          !!hotkey.ctrl === e.ctrlKey &&
          !!hotkey.alt === e.altKey &&
          !!hotkey.shift === e.shiftKey &&
          !!hotkey.meta === e.metaKey &&
          hotkey.callback[e.type]
        callback && callback(e)
    }
  }

  document.addEventListener('keydown', el._keyHandler, false)
  document.addEventListener('keyup', el._keyHandler, false)
}

function unbindEvent(el) {
  document.removeEventListener('keydown', el._keyHandler)
  document.removeEventListener('keyup', el._keyHandler)
}

export {
  bindEvent,
  unbindEvent
};