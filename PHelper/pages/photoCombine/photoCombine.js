// pages/photoCombine/photoCombine.js
const ctx = wx.createCanvasContext('photoCombine')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    height:0,
    heightForCanvas:0,
    downNum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var obj = that.data
    var imagesArr = JSON.parse(options.imageUrls)
    let num = imagesArr.length
    let screenWidth = wx.getSystemInfoSync().windowWidth
    
    for(var i = 0; i < imagesArr.length; i++){
      var imageUrl = imagesArr[i]
      wx.getImageInfo({
        src: imageUrl,
        success: function (res) {
          var width = res.width
          var height = res.height
          obj.downNum = obj.downNum + 1
          console.log(res)
          let sw = wx.getSystemInfoSync().windowWidth
          if(width > sw){
            width = sw
            height = height / res.width * width
          }
          ctx.drawImage(res.path, (sw-width)/2.0, obj.heightForCanvas, width, height)
          obj.heightForCanvas = obj.heightForCanvas + height
          that.setData({
            height: obj.heightForCanvas
          })
          if (obj.downNum == imagesArr.length){
            ctx.draw()
          }
        }
      })
    }
    
    
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
   * 点击保存图片
   */
  toSavePic(){
    let sw = wx.getSystemInfoSync().windowWidth
    var that = this
    var obj = that.data
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: sw,
      height: obj.heightForCanvas,
      destWidth: sw * 2,
      destHeight: obj.heightForCanvas * 2,
      canvasId: 'photoCombine',
      success(res) {
        that.setData({
          shareImagePath: res.tempFilePath
        })
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
        })
        wx.showToast({
          title: '保存成功',
          icon: 'success'
        })
      }
    })
  },

  /**
   * 分享图片到图片墙
   */
  toSharePic(){
    let sw = wx.getSystemInfoSync().windowWidth
    var that = this
    var obj = that.data
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: sw,
      height: obj.heightForCanvas,
      destWidth: sw * 2,
      destHeight: obj.heightForCanvas * 2,
      canvasId: 'photoCombine',
      success(res) {
        wx.navigateTo({
          url: '/pages/sharePhoto/sharePhoto?imageUrl=' + res.tempFilePath,
        })
      }
    })
    
  }

})