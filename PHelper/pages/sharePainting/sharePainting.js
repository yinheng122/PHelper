// pages/sharePainting/sharePainting.js
var ctx = wx.createCanvasContext("paintingCanvas");
var ctxTimg = wx.createCanvasContext("sealCanvas");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choosed:false, //是否选择用印章
    timgText:"",
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
    let sw = wx.getSystemInfoSync().windowWidth
    let sh = wx.getSystemInfoSync().windowHeight
    ctx.drawImage(imageUrl, 0, 0, sw * 0.45, sh * 0.5)
    ctx.draw()
    ctxTimg.drawImage("/images/timg.png", 0, 0, 100, 100);
    ctxTimg.draw()
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
    let sw = wx.getSystemInfoSync().windowWidth
    let sh = wx.getSystemInfoSync().windowHeight
    var that = this
    that.setData({
      choosed:!that.data.choosed
    })
    ctx.drawImage(that.data.imageUrl, 0, 0, sw * 0.45, sh * 0.5)
    ctx.draw()
    if(that.data.choosed){
      that.certainAct()
    }
  },

  /**
   * 印章文字
   */
  sealInputWord(e){
    var that = this
    var text = e.detail.value
    that.setData({
      timgText:text  
    })
  },

  /**
   * 点击确定按钮
   */
  certainAct(){
    var that = this
    var obj = that.data.timgText
    var imageUrl = that.data.imageUrl
    ctxTimg.setTextAlign('center')
    ctxTimg.setFillStyle('white')
    ctxTimg.drawImage("/images/timg.png", 0, 0, 100, 100);
    if(obj.length == 1){
      ctxTimg.setFontSize(35)
      ctxTimg.fillText(obj, 50, 58)
    } else if (obj.length == 2){
      ctxTimg.setFontSize(32)
      ctxTimg.fillText(obj, 50, 58)
    } else if (obj.length == 3){
      ctxTimg.setFontSize(30)
      ctxTimg.fillText(obj, 50, 58)
    }else{
      ctxTimg.setFontSize(32)
      let fontStr = obj.slice(0, 2)
      let behindStr = obj.slice(2,4)
      ctxTimg.fillText(fontStr, 50, 38)
      ctxTimg.fillText(behindStr, 50, 78)
    }
    ctxTimg.draw()
    let sw = wx.getSystemInfoSync().windowWidth
    let sh = wx.getSystemInfoSync().windowHeight
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      destWidth: 200,
      destHeight: 200,
      canvasId: 'sealCanvas',
      success(res) {
        ctx.drawImage(imageUrl, 0, 0, sw * 0.45, sh * 0.5)
        ctx.drawImage(res.tempFilePath, sw * 0.45 - 40, sh * 0.5 - 40, 30, 30)
        ctx.draw()
        setTimeout(function () {
          wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: sw * 0.9,
            height: sh,
            destWidth: sw * 0.9 * 2,
            destHeight: sh * 2,
            canvasId: 'paintingCanvas',
            success(res) {
              that.setData({
                shareUrl: res.tempFilePath
              })
            }
          })
        }, 1000)
        
      }
    })
  },

  /**
   * 分享涂鸦
   */
  sharePainting(){
    setTimeout(function () {
      const db = wx.cloud.database()
      const shareImageDB = db.collection('sharePainting')
      var that = this
      var obj = that.data
      var imagePath = Date.now() + '.png'
      wx.showLoading({
        title: '上传中...',
      })
      console.log(obj.shareUrl)
      // 将图片上传至云存储空间
      wx.cloud.uploadFile({
        // 指定上传到的云路径
        cloudPath: imagePath,
        // 指定要上传的文件的小程序临时文件路径
        filePath: obj.shareUrl,
        // 成功回调
        success: res => {
          shareImageDB.add({
            // data 字段表示需新增的 JSON 数据
            data: {
              sharePaintingUrl: res.fileID,
              date: Date.now()
            },
            success: function (res) {
              // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
              console.log(res)
              wx.hideLoading()
              wx.showToast({
                title: '上传成功',
                icon: 'success'
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
    }, 1000)
  }
})