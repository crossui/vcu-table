import aliases from './aliases'
import codes from './codes'

const noop = () => {}

const createArr = (arr) => {
  let _arr = {}
  arr.forEach(item => {
    _arr[item.keyVal] = item.callBack
  })
  return _arr
}

const getKeyMap = (keymap, alias, priority) => Object.keys(keymap).map((input,index) => {
  const result = {}
  const { keyup, keydown } = keymap[input]
  input.replace('numpad +', 'numpad add').split('+').forEach(keyName => {
    switch (keyName.toLowerCase()) {
      case 'ctrl':
      case 'alt':
      case 'shift':
      case 'meta':
        result[keyName] = true
        break
      default:
        result.keyCode = alias[keyName] || searchKeyCode(keyName)
    }
  })
  result.callback = {
    keydown: keydown || (keyup ? noop : keymap[input]),
    keyup: keyup || noop
  }
  result.priority = priority[index]
  return result
})

const searchKeyCode = key => {
  if (!key) return
  // Keyboard Events
  key = hasKeyCode(key) || String(key)
  return codes[key.toLowerCase()] ||
    aliases[key.toLowerCase()] ||
    returnCharCode(key)
}

const returnCharCode = key => key.length === 1 ? key.charCodeAt(0) : undefined
const isPlainObject = obj => Object.prototype.toString.call(obj) === '[object Object]'
const hasKeyCode = key => !isPlainObject(key)
  ? key
  : key.which || key.keyCode || key.charCode || false

export {
  aliases,
  codes,
  getKeyMap,
  createArr
};
