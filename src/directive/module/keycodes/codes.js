import functionKeys from './functionkeys'
import numpad from './numpad'
import lowercase from './lowercase'

export default {
  backspace: 8,
  tab: 9,
  enter: 13,
  shift: 16,
  ctrl: 17,
  alt: 18,
  'pause/break': 19,
  'caps lock': 20,
  esc: 27,
  space: 32,
  'page up': 33,
  'page down': 34,
  end: 35,
  home: 36,
  left: 37,
  up: 38,
  right: 39,
  down: 40,
  insert: 45,
  delete: 46,
  command: 91,
  'left command': 91,
  'right command': 93,
  'scroll lock': 145,
  'my computer': 182,
  'my calculator': 183,
  ';': 186,
  '=': 187,
  ',': 188,
  '-': 189,
  '.': 190,
  '/': 191,
  '`': 192,
  '[': 219,
  '\\': 220,
  ']': 221,
  "'": 222,
  ...lowercase,
  ...numpad,
  ...functionKeys
  
  // 'add': 43,
}
