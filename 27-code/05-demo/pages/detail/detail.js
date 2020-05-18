// pages/detail/detail.js
// 引入datas中的数据
const datas = require('../../datas/list-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: null, // 用来存储索引值
    detail: {}, // 用来存储跳转后的需要显示的对象数据
    isCollectioned: false // 默认没有收藏
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
    if(!storageObj){
      // 没有缓存数据
      storageObj={}
      wx.setStorage({
        key: 'isCollectioned',
        data: storageObj,
      })
    }else{
      // 有缓存数据,根据索引来获取索引对应的布尔值,重新的设置当前的状态数据
      let isCollectioned = storageObj[index]
      // 判断为true,重新去设置状态数据
      if(isCollectioned){
        this.setData({
          isCollectioned
        })
      }
    }




    // console.log(this.data.detail)
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
    let obj = wx.getStorageSync('isCollectioned')||{}
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