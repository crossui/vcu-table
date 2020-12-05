import XEUtils from 'xe-utils/ctor'
import GlobalConfig from '../conf'
import interceptor from './src/interceptor'
import renderer from './src/renderer'
import commands from './src/commands'
import menus from './src/menus'
import formats from './src/formats'
import setup from './src/setup'
import { UtilTools } from '../tools'

const installedPlugins = []

function use (Plugin, options) {
  /* eslint-disable @typescript-eslint/no-use-before-define */
  if (Plugin && Plugin.install) {
    if (installedPlugins.indexOf(Plugin) === -1) {
      Plugin.install(VCUTable, options)
      installedPlugins.push(Plugin)
    }
  }
  return VCUTable
}

/**
 * 检测模块的安装顺序是否正确
 */
function reg (key) {
  /* eslint-disable @typescript-eslint/no-use-before-define */
  if (VCUTable.Table) {
    UtilTools.error('vcu.error.useErr', [key])
  }
  VCUTable[`_${key}`] = 1
}

export const VCUTable = {
  t: key => GlobalConfig.i18n(key),
  v: 'v3',
  reg,
  use,
  types: {},
  setup,
  interceptor,
  renderer,
  commands,
  formats,
  menus
}

/**
 * 获取当前的 zIndex
 */
Object.defineProperty(VCUTable, 'zIndex', { get: UtilTools.getLastZIndex })

/**
 * 获取下一个 zIndex
 */
Object.defineProperty(VCUTable, 'nextZIndex', { get: UtilTools.nextZIndex })

/**
 * 获取所有导出类型
 */
Object.defineProperty(VCUTable, 'exportTypes', {
  get () {
    return Object.keys(VCUTable.types)
  }
})

/**
 * 获取所有导入类型
 */
Object.defineProperty(VCUTable, 'importTypes', {
  get () {
    const rest = []
    XEUtils.each(VCUTable.types, (flag, type) => {
      if (flag) {
        rest.push(type)
      }
    })
    return rest
  }
})

export default VCUTable
