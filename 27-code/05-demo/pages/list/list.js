// pages/list/list.js
// 引入list-data.js这个数据文件
const datas = require('../../datas/list-data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 用来保存引入的文件中的数据
    datas:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 页面加载后设置当前的数据
    this.setData({
      datas: datas.list_data
    })
  },
  // 跳转到详情页
  goDetail(event){
    const id = event.currentTarget.dataset.id
    wx.navigateTo({
      url:'/pages/detail/detail?id='+id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})