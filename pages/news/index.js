import { SequencePage, wx, regeneratorRuntime, InfiniteScrollList, Rest } from '../../engine/index.js'

SequencePage({
  data: {
    items: [],
    infiniteScrollList: {}
  },
  onLoad: async function () {
    this._fetchNews()
  },
  _fetchNews: async function () {
    const newsRequestData = {
      path: 'http://192.168.222.96:9999/posts',
      params: {},
      idField: 'title'
    }

    this.setData({ infiniteScrollList: new InfiniteScrollList(newsRequestData) })
    await this.data.infiniteScrollList.loadMore()
    this.setData({ items: this.data.infiniteScrollList.getArray() })

  },
  onReachBottom: async function () {
    await this.data.infiniteScrollList.loadMore()
    this.setData({ items: this.data.infiniteScrollList.getArray() })
  },
  onPullDownRefresh: async function () {
    await this._fetchNews()
    wx.stopPullDownRefresh()
  },
  showNewsDetail: function (e) {
    console.log(e.currentTarget.dataset)
    wx.navigateTo({ url: `/pages/webviewContainer/index?url=${e.currentTarget.dataset.url}` })
  }
})
