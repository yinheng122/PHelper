// pages/sharePhoto/sharePhoto.js
var utils = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    strToShare:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let imageUrl = options.imageUrl
    var that = this
    that.setData({
      imageUrl:imageUrl
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

  },

  /**
   * 分享的话
   */
  bindTextAreaBlur(e){
    let strToShare = e.detail.value
    var that = this
    that.setData({
      strToShare: strToShare
    })
  },

  /**
   * 分享
   */
  sharePic(){
    const db = wx.cloud.database()
    const shareImageDB = db.collection('shareImage')
    var that = this
    var obj = that.data
    var imagePath = Date.now() + '.png'
    wx.showLoading({
      title: '上传中...',
    })
    console.log(imagePath)
    // 将图片上传至云存储空间
    wx.cloud.uploadFile({
      // 指定上传到的云路径
      cloudPath: imagePath,
      // 指定要上传的文件的小程序临时文件路径
      filePath: obj.imageUrl,
      // 成功回调
      success: res => {
        shareImageDB.add({
          // data 字段表示需新增的 JSON 数据
          data: {
            shareImageUrl: res.fileID,
            shareStr: obj.strToShare
          },
          success: function (res) {
            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
            console.log(res)
            wx.hideLoading()
            wx.showToast({
              title: '上传成功',
              icon:'success'
            })
            setTimeout(function () {
              wx.navigateBack({
              })
            }, 1000)
          }
        })
      },
      fail: console.error
    })
    
  }
})