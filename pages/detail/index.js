import { SequencePage, wx, regeneratorRuntime, Rest } from '../../engine/index.js'

SequencePage({
  data: {
    headImgUrl: '',
    title: '',
    post: [],
    imgList: [],
    sourceUrl: ''
  },
  onLoad: async function (options) {
    const res = await Rest.get(`/posts/${options.id}`, { sourceUrl: options.sourceUrl})
    this.setData({ headImgUrl: options.imgUrl, title: options.title, post: res.data, sourceUrl: options.sourceUrl })
    let imgList = []
    this.data.post.forEach(element => {
        if (element.imageUrls) {
          imgList = [...imgList, ...element.imageUrls]
        }
    })

    this.setData({ imgList })
  },
  previewImage: function (e) {
    const current = e.target.dataset.src
    wx.previewImage({
        current: current,
        urls: this.data.imgList
    })
  },
  copyUrl: function (e) {
    wx.setClipboardData({ data: e.currentTarget.dataset.url })
  }
})