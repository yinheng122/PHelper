// pages/waterMark/waterMark.js
var ctx1 = wx.createCanvasContext("waterMarkCanves");
var ctx2 = wx.createCanvasContext("waterMarkCanves2");
var ctx3 = wx.createCanvasContext("waterMarkCanves3");
var ctx4 = wx.createCanvasContext("waterMarkCanves4");
var ctxArr = [ctx1,ctx2,ctx3,ctx4];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageWidth:"",
    imageHeight:"",
    imagesArr:[],
    textToPrint:'',
    rotate:'45',
    color:'black'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var imagesArr = JSON.parse(options.imagesArr);
    that.setData({
      imagesArr: imagesArr,
      textToPrint:options.textToPrint,
      color:options.color,
      rotate:options.rotate,
      fontSize:options.fontSize
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this
    var obj = that.data
    var imagesArr = obj.imagesArr
    if(that.isInArray(imagesArr,"")){
      imagesArr.pop()
    }
    for(var x = 0; x < imagesArr.length; x++){
      wx.getImageInfo({
        src: imagesArr[x],
        success: function (res) {
          console.log(res)
          var width = res.width
          var height = res.height
          let screenWidth = wx.getSystemInfoSync().windowWidth
          if (width >= height) {
            if (width > screenWidth) {
              width = screenWidth
            }
            height = height / res.width * width
          } else {
            if (width > screenWidth) {
              width = screenWidth
            }
            if (height > 400) {
              height = 400
              width = res.width / res.height * height
            } else {
              height = height / res.width * width
            }
          }
          var ctx
          if (res.path == imagesArr[0]) {
            that.setData({
              imageWidth: width,
              imageHeight: height,
            })
            ctx = ctx1
          }
          if (res.path == imagesArr[1]) {
            that.setData({
              imageWidth2: width,
              imageHeight2: height,
            })
            ctx = ctx2
          }
          if (res.path == imagesArr[2]) {
            that.setData({
              imageWidth3: width,
              imageHeight3: height,
            })
            ctx = ctx3
          }
          if (res.path == imagesArr[3]) {
            that.setData({
              imageWidth4: width,
              imageHeight4: height,
            })
            ctx = ctx4
          }
          ctx.drawImage(res.path, 0, 0, width, height)
          ctx.rotate(obj.rotate * Math.PI / 180)
          for (let j = 1; j < 12; j++) {
            ctx.beginPath()
            ctx.setFontSize(obj.fontSize)
            ctx.setFillStyle(obj.color)
            ctx.fillText(obj.textToPrint, 0, 50 * j)
            for (let i = 1; i < 12; i++) {
              ctx.beginPath()
              ctx.setFontSize(obj.fontSize)
              ctx.setFillStyle(obj.color)
              ctx.fillText(obj.textToPrint, (15 + (obj.fontSize-1)*obj.textToPrint.length) * i, 50 * j)
            }
          }
          for (let j = 0; j < 12; j++) {
            ctx.beginPath()
            ctx.setFontSize(obj.fontSize)
            ctx.setFillStyle(obj.color)
            ctx.fillText(obj.textToPrint, 0, -50 * j)
            for (let i = 1; i < 12; i++) {
              ctx.beginPath()
              ctx.setFontSize(obj.fontSize)
              ctx.setFillStyle(obj.color)
              ctx.fillText(obj.textToPrint, (15 + (obj.fontSize-1)* obj.textToPrint.length) * i, -50 * j)
            }
          }
          ctx.draw()
          
        }
      })
    }
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
   * 判断元素是否在数组中
   */
  isInArray(arr, value) {
    for (var i = 0; i < arr.length; i++) {
      if (value === arr[i]) {
        return true;
      }
    }
    return false;
  },

  /**
   * 保存图片
   */
  toSavePic(){
    var that = this
    var obj = that.data
    var imagesArr = obj.imagesArr
    if (that.isInArray(imagesArr, "")) {
      imagesArr.pop()
    }
    wx.showLoading({
      title: '保存中...',
    })
    for(var i = 0; i < imagesArr.length; i++){
      if(i==0){
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: obj.imageWidth,
          height: obj.imageHeight,
          destWidth: obj.imageWidth * 2,
          destHeight: obj.imageHeight * 2,
          canvasId: 'waterMarkCanves',
          success(res) {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
            })
            wx.hideLoading()
            wx.showToast({
              title: '保存成功！',
              icon:'success'
            })
            setTimeout(function () {
              wx.navigateBack({
              })
            }, 1000) 
            
          }
        })
      }
      if (i == 1) {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: obj.imageWidth2,
          height: obj.imageHeight2,
          destWidth: obj.imageWidth2 * 2,
          destHeight: obj.imageHeight2 * 2,
          canvasId: 'waterMarkCanves2',
          success(res) {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
            })
          }
        })
      }
      if (i == 2) {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: obj.imageWidth3,
          height: obj.imageHeight3,
          destWidth: obj.imageWidth3 * 2,
          destHeight: obj.imageHeight3 * 2,
          canvasId: 'waterMarkCanves3',
          success(res) {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
            })
          }
        })
      }
      if (i == 3) {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: obj.imageWidth4,
          height: obj.imageHeight4,
          destWidth: obj.imageWidth4 * 2,
          destHeight: obj.imageHeight4 * 2,
          canvasId: 'waterMarkCanves4',
          success(res) {
            wx.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
            })
          }
        })
      }
      
    }
    
  }

})