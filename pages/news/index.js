import { SequencePage, wx, regeneratorRuntime, InfiniteScrollList, Rest, Engine, TimeUtil, Storage, _ } from '../../engine/index.js'
import Config from '../../config'

SequencePage({
  data: {
    items: [],
    infiniteScrollList: {},
    showSearchBar: true,
    postSources: Config.postSources,
    searchKey: '',
    showSources: false
  },
  onLoad: async function () {
    this._fetchNews()
  },
  _getSelectedSource: function () {
    let selectedSource = []
    this.data.postSources.forEach(element => {
      if (!element.disabled) {
        selectedSource.push(element.value)
      }
    })

    return JSON.stringify(selectedSource)
  },
  _fetchNews: async function () {

    const newsRequestData = {
      path: '/posts',
      params: {
        searchKey: this.data.searchKey,
        selectedSource: this._getSelectedSource()
      },
      idField: 'id'
    }

    this.setData({ infiniteScrollList: new InfiniteScrollList(newsRequestData) })
    await this.data.infiniteScrollList.loadMore()
    this.setData({ items: await this._formatNews(this.data.infiniteScrollList.getArray()) })
  },
  _formatNews: async function (news) {
    news = TimeUtil.parseTimeFields(news)
    news = await this._formatHaveRead(news)

    return news
  },
  _formatHaveRead: async function (news) {
    let haveReadList = await Storage.getItem('haveReadList') || []
    news = news.map((post) => {
      post.haveRead = false
      if (_.includes(haveReadList, post.id)) {
        post.haveRead = true
      }

      return post
    })

    return news
  },
  onReachBottom: async function () {
    await this.data.infiniteScrollList.loadMore()
    this.setData({ items: this.data.infiniteScrollList.getArray() })
  },
  onPullDownRefresh: async function () {
    await this._fetchNews()
    wx.stopPullDownRefresh()
  },
  showNewsDetail: async function (e) {
    let haveReadList = await Storage.getItem('haveReadList') || []
    if (haveReadList.length === 1000) {
      haveReadList.pop()
    }

    if (!_.includes(haveReadList, e.currentTarget.dataset.id)) {
      haveReadList.unshift(e.currentTarget.dataset.id)
    }

    await Storage.setItem('haveReadList', haveReadList)

    let newItems = _.cloneDeep(this.data.items)
    newItems = await this._formatHaveRead(newItems)

    this.setData({ items: newItems })

    wx.navigateTo({ url: `/pages/detail/index?sourceUrl=${e.currentTarget.dataset.url}&id=${e.currentTarget.dataset.id}&title=${e.currentTarget.dataset.title}&imgUrl=${e.currentTarget.dataset.imgurl}` })
  },
  updateSearchContainerStatus: function () {
    this.setData({ showSearchBar: !this.data.showSearchBar })
  },
  search: async function (e) {
    this.setData({ searchKey: e.detail.value})
    Engine.showLoading()
    await this._fetchNews()
    Engine.hideLoading()
  },
  selectTag: function (e) {
    let postSources = this.data.postSources
    postSources = postSources.map((source) => {
      if (source.value === e.target.dataset.type) {
        source.disabled = !source.disabled
      }

      return source
    })

    this.setData({ postSources })
    this._fetchNews()
  },
  showSources: function () {
    this.setData({ showSources: !this.data.showSources })
  }
})
