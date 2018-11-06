// pages/draw/draw.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataArr:[],
    sum:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let sw = wx.getSystemInfoSync().windowWidth
    let sh = wx.getSystemInfoSync().windowHeight
    var that = this
    that.setData({
      width:sw,
      height:sh
    })
    var that = this
    that.getDBData(1)
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
    var that = this
    that.getDBData(1)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    var sum = that.data.sum
    if (that.data.dataArr.length < 10) {
      sum = 1
    } else {
      sum = sum + 1
    }
    that.getDBData(sum)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 开始画画
   */
  toDraw(){
    wx.navigateTo({
      url: '/pages/drawPic/drawPic',
    })
  },

  /**
  * 获取数据库中的数据
  */
  getDBData(num) {
    var that = this
    var obj = that.data
    if (num == 1) {
      obj.dataArr.splice(0, obj.dataArr.length);
    }
    const db = wx.cloud.database()
    const shareImageDB = db.collection('sharePainting')
    var that = this
    shareImageDB.skip((num - 1) * 10).limit(10).get({
      success: function (res) {
        console.log(res.data)
        for (var i = 0; i < res.data.length; i++) {
          var data = res.data[i]
          obj.dataArr.push(data)
        }
        that.setData({
          dataArr: obj.dataArr
        })
        if (res.data.length < 10) {
          // wx.showToast({
          //   title: '数据加载完毕',
          // })
          if (sum != 1 && res.data.length < 10) {
            sum = sum - 1
          }
        }
        if (sum == 1) {
          wx.stopPullDownRefresh()
        }
      }
    })
  },

  /**
   * 点击看大图 
   */
  toDetail(e) {
    var imageUrl = e.currentTarget.id
    var imageArr = [imageUrl]
    wx.previewImage({
      urls: imageArr,
    })
  }
})