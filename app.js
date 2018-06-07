import { DateExtension, Engine, I18N, Rest, regeneratorRuntime, resources, wx } from './engine/index'
import config from './config'

function init() {
  // init i18n
  I18N.registerLocale(resources)
  I18N.setLocale('zh-CN')
  wx.i18n = I18N.i18n
  DateExtension.init()
  Rest.baseUrl = config.envs[config.env].baseUrl
}

init()

App({
  onShow: async function (options) {
    await Engine.init(Rest)
  },
  onError: function (error) {
    console.error('global error: ', error)
  }
})
