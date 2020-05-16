// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 状态数据
    msg: '我喜欢男人,健哥说'
  },
  // 小程序中没有DOM对象
  // 小程序中可以使用插值语法
  // 该事件的方法和data对象是同级别关系(和生命周期的这些回调函数是同一个级别)
  // showMsg(){
  //   // console.log(document)
  //   // document.getElementById('btn')
  //   console.log('微信小程序好简单啊')
  // },
  // 点击按钮的时候修改页面中显示的文字内容
  showMsg() {
    // 程序不认可这种写法
    // this.msg= '华哥好帅哦,真的太帅了'
    // 小程序中是不是没有数据代理?是的,真的没有数据代理
    // console.log(this)
    // console.log(this.data.msg)
    // 修改data对象中的数据
    // 程序不认可这种写法
    // this.data.msg='健哥哥好帅哦'
    // 小程序认可这种写法
    // React中修改状态数据和小程序中非常类似
    this.setData({
      msg: '杨哥才是最帅的'
    })

    // 自己总结React和Vue的区别,顺带着可以总结一下微信小程序和前两者的不同点
  },
  // 小程序中的生命周期最常用的一个
  // vue中有个生命周期非常常用---mounted---页面渲染完毕后触发
  // onLoad生命周期回调中不仅能够看到页面加载了,也可以直接获取状态数据,直接对状态数据进行相关的操作
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) { // 第一个执行的
    // console.log('onLoad')
    console.log(this.data.msg)
    // debugger
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {  // 第三个执行的
    // console.log('onReady')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() { // 第二个执行的
    // console.log('onShow')
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