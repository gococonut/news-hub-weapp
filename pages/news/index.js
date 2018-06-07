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
      path: '/posts',
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
    wx.navigateTo({ url: `/pages/detail/index?sourceUrl=${e.currentTarget.dataset.url}&id=${e.currentTarget.dataset.id}&title=${e.currentTarget.dataset.title}&imgUrl=${e.currentTarget.dataset.imgurl}` })
  }
})
