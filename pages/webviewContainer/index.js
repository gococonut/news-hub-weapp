// pages/webviewContainer/index.js
const URLS = [

]

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    url: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  onLoad: function (options) {
    this.setData({ url: options.url })
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
