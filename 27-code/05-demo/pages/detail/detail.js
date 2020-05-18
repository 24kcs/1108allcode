// pages/detail/detail.js
// 引入datas中的数据
const datas = require('../../datas/list-data.js')
// 获取背景音乐播放的对象
let backgroundAudioManager = wx.getBackgroundAudioManager()
const appData = getApp() // 获取全局唯一的指定对象
// 获取
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: null, // 用来存储索引值
    detail: {}, // 用来存储跳转后的需要显示的对象数据
    isCollectioned: false, // 默认没有收藏
    isPlay: false // 默认没有播放音乐
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 路由在跳转的时候传入进来的参数数据(索引值)
    const index = options.id
    // 把索引保存起来,方便其他的地方使用
    this.setData({
      index,
      detail: datas.list_data[index]
    })

    // 页面加载的时候先从缓存中读取数据,然后设置当前索引对应的值更新到data对象中的数里面
    let storageObj = wx.getStorageSync('isCollectioned')
    // 判断是否有缓存数据的对象
    if (!storageObj) {
      // 没有缓存数据
      storageObj = {}
      wx.setStorage({
        key: 'isCollectioned',
        data: storageObj,
      })
    } else {
      // 有缓存数据,根据索引来获取索引对应的布尔值,重新的设置当前的状态数据
      let isCollectioned = storageObj[index]
      // 判断为true,重新去设置状态数据
      if (isCollectioned) {
        this.setData({
          isCollectioned
        })
      }
    }
    // 音乐播放和暂停的监视操作

    // console.log(appData.data)
    if (appData.data.musicPlay && appData.data.pageIndex === index) {
      // 此时音乐是播放状态,并且就是当前的详情页
      // 开始播放音乐
      this.setData({
        isPlay: true
      })
    }

    // 监听背景音频播放事件
    backgroundAudioManager.onPlay(() => {
      // 更新全局的播放状态
      this.setData({
        isPlay: true
      })
      // 这是注意的
      appData.data.musicPlay = true // 存储音乐播放或者暂停的
      appData.data.pageIndex = index // 存储当前详情页的索引值
    })
    // 监听背景音频暂停事件

    backgroundAudioManager.onPause(() => {
      // 更新全局的暂停状态
      this.setData({
        isPlay: false
      })
      // console.log('暂停了')
      appData.data.musicPlay = false // 存储音乐播放或者暂停的
    })



    // console.log(this.data.detail)
  },
  // 播放音乐
  playMusic() {
    // 获取取反后的播放音乐的状态数据,重新的设置data对象中的状态数据
    let isPlay = !this.data.isPlay
    this.setData({
      isPlay
    })
    // 判断当前的播放状态,同时设置音乐播放还是暂停

    if (isPlay) {
      const {
        dataUrl,
        title,
        coverImgUrl
      } = this.data.detail.music
      // 播放音乐
      backgroundAudioManager.src = dataUrl
      // 音乐的标题
      backgroundAudioManager.title = title
      // 封面
      backgroundAudioManager.coverImgUrl = coverImgUrl
      // 播放
      backgroundAudioManager.play()

    } else {
      // 暂停音乐
      backgroundAudioManager.pause()
    }




    // if (isPlay) {
    //   const {
    //     dataUrl,
    //     title,
    //     coverImgUrl
    //   } = this.data.detail.music
    //   // 播放音乐
    //   wx.playBackgroundAudio({
    //     dataUrl,
    //     title,
    //     coverImgUrl
    //   })
    // } else {
    //   // 暂停音乐
    //   wx.pauseBackgroundAudio({

    //   })
    // }
  },
  // 图片收藏按钮的点击事件----实现的就是收藏或者取消收藏
  handleCollection() {
    // 先读取data中的数据,然后取反
    let isCollectioned = !this.data.isCollectioned
    // 偶去文本的提示消息内容
    let title = isCollectioned ? '收藏成功' : '取消收藏'
    // 设置提示框的消息及图标
    wx.showToast({
      title,
      icon: 'success'
    })
    // 已经收藏了,返回之前的数据列表页面list,再次进入到detail页面(组件)---->说明此时这个组件会重新的展示(重新创建了)----缓存的机制来解决这个问题
    let obj = wx.getStorageSync('isCollectioned') || {}
    // 对象中存储键值对
    obj[this.data.index] = isCollectioned
    wx.setStorage({
      key: 'isCollectioned', // 这个是key---键
      data: obj // 这个是要存储的数据----值(原生类型,要么就是对象)
    })

    // 立刻的去设置data对象中的数据
    this.setData({
      isCollectioned
    })
  },
  // 图片分享按钮的点击事件----实现弹出一个菜单
  handleShare() {
    wx.showActionSheet({
      itemList: [
        '分享朋友圈',
        '分享给好友',
        '分享到群里'
      ],
      success(res) {
        // 判断
        if (res.tapIndex) {
          console.log('已经分享出去了')
        }
      }
    })
  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})