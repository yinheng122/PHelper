// pages/sharePainting/sharePainting.js
var ctx = wx.createCanvasContext("paintingCanvas");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choosed:false //是否选择用印章
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let imageUrl = options.imageUrl
    let sw = wx.getSystemInfoSync().windowWidth
    let sh = wx.getSystemInfoSync().windowHeight
    ctx.drawImage(imageUrl, 0, 0, sw * 0.45, sh * 0.5)
    ctx.draw()
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
   * 开启印章
   */
  choosedAct(){
    var that = this
    that.setData({
      choosed:!that.data.choosed
    })
  }
})