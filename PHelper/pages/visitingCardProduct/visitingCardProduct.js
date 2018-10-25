// pages/visitingCardProduct/visitingCardProduct.js
const ctx = wx.createCanvasContext('visitingCardCanvas')
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
    var that = this
    console.log(options)
    that.setData({
      typeName:options.typeName,
      name: options.name,
      position:options.position,
      address:options.address,
      phone:options.phone,
      email:options.email,
      userIcon:options.userIcon
    })
    that.drawPic()
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
   * 绘制视图
   */
  drawPic(){
    var that = this
    var obj = that.data
    let screenWidth = wx.getSystemInfoSync().windowWidth
    if(obj.typeName == '1'){
      ctx.drawImage('/images/modelN1.png', 0, 0, screenWidth, screenWidth * 0.6)
      ctx.save()
      ctx.beginPath()
      ctx.arc(40, 40, 30, 0, 2 * Math.PI)
      ctx.closePath()
      ctx.clip()
      ctx.drawImage(obj.userIcon, 10, 10, 60, 60)
      ctx.restore()
      ctx.setFontSize(18)
      ctx.fillText(obj.name, 80, 35)
      ctx.setFontSize(15)
      ctx.fillText(obj.position, 80, 55)
    }else{
      ctx.drawImage('/images/modelN2.jpg', 0, 0, screenWidth, screenWidth * 0.6)
      ctx.save()
      ctx.beginPath()
      ctx.arc(screenWidth - 50, 50, 30, 0, 2 * Math.PI)
      ctx.closePath()
      ctx.clip()
      ctx.drawImage(obj.userIcon, screenWidth - 80, 20, 60, 60)
      ctx.restore()
      ctx.setFontSize(18)
      ctx.setTextAlign('right')
      ctx.fillText(obj.name, screenWidth - 90, 45)
      ctx.setFontSize(15)
      ctx.setTextAlign('right')
      ctx.fillText(obj.position, screenWidth - 90, 65)
    }
    ctx.setTextAlign('left')
    ctx.setFontSize(15)
    ctx.fillText('地址：' + obj.address, 15, 140)
    ctx.setFontSize(15)
    ctx.fillText('电话：' + obj.phone, 15, 170)
    ctx.setFontSize(15)
    ctx.fillText('邮箱：' + obj.email, 15, 200)
    ctx.draw()
  },

  /**
   * 保存名片
   */
  saveVisitingCard(){
    let screenWidth = wx.getSystemInfoSync().windowWidth
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: screenWidth,
      height: screenWidth * 0.6,
      destWidth: screenWidth * 2,
      destHeight: screenWidth * 0.6 * 2,
      canvasId: 'visitingCardCanvas',
      success(res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
        })
        wx.hideLoading()
        wx.showToast({
          title: '保存成功！',
          icon: 'success'
        })
        setTimeout(function () {
          wx.navigateBack({
          })
        }, 1000)
      }
    })
  }

})