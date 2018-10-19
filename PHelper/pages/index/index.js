// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },

  /**
  * 添加水印点击事件
  */
  waterMarkTap(){
    wx.navigateTo({
      url: '/pages/waterMarkSet/waterMarkSet',
    })
  },

  /**
   * 文字添加点击事件
   */
  wordCombineTap(){
    wx.navigateTo({
      url: '/pages/wordCombine/wordCombine',
    })
  },

  /**
   * 图片拼接点击事件
   */
  combineTap(){

  },

  /**
   * 个性名片
   */
  visitingCard(){

  }
})