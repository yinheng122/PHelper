// pages/waterMark/waterMark.js
var ctx = wx.createCanvasContext("waterMarkCanves");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageUrl:"",
    imageWidth:"",
    imageHeight:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    
    that.setData({
      imageUrl: options.imageUrl
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    wx.getImageInfo({
      src: that.data.imageUrl,
      success: function (res) {
        var width = res.width
        var height = res.height
        let screenWidth = wx.getSystemInfoSync().windowWidth
        if(width >= height){
          if(width > screenWidth){
            width = screenWidth
          }
          height = height / res.width * width 
        }else{
          if (width > screenWidth) {
            width = screenWidth
          }
          if(height > 400){
            height = 400
            width = res.width / res.height * height
          }else{
            height = height / res.width * width
          }
        }
        ctx.drawImage(that.data.imageUrl, 0, 0, width, height)
        ctx.rotate(45 * Math.PI / 180)
        for (let j = 1; j < 10; j++){
          ctx.beginPath()
          ctx.setFontSize(18)
          ctx.setFillStyle("rgba(255,255,255,.5)")
          ctx.fillText("水印", 0, 50 * j)
          for (let i = 1; i < 10; i++){
            ctx.beginPath()
            ctx.setFontSize(18)
            ctx.setFillStyle("rgba(255,255,255,.5)")
            ctx.fillText("水印", 50 * i, 50 * j)
          }
        }
        for (let j = 0; j < 10; j++) {
          ctx.beginPath()
          ctx.setFontSize(18)
          ctx.setFillStyle("rgba(255,255,255,.5)")
          ctx.fillText("水印", 0, -50 * j)
          for (let i = 1; i < 10; i++) {
            ctx.beginPath()
            ctx.setFontSize(18)
            ctx.setFillStyle("rgba(255,255,255,.5)")
            ctx.fillText("水印", 50 * i, -50 * j)
          }
        }
        ctx.draw()
        that.setData({
          imageWidth:width,
          imageHeight:height,
        })
      }
    })
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