// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },



  // 关于小程序中的事件的使用
  // 小程序中的事件两种情况；冒泡事件和非冒泡事件
  // catchtap 非冒泡事件
  // bindtap 冒泡事件
  // 用冒泡事件还是应该用非冒泡事件更合适? 看需求
  // 点击按钮实现一个内容的输出(按钮是自己制作的,嵌套标签,此时在父级标签上使用冒泡事件或者非冒泡事件都可以实现对应 需求,但是,如果两个标签都有了相同事件,此时应该考虑事件冒泡的问题)
  // 小程序中,还是很推荐使用冒泡事件的方式来实现相应的功能
  showMsg1() {
    console.log('1')
  },
  showMsg2() {
    console.log('2')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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