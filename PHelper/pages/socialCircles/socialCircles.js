// pages/socialCircles/socialCircles.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataArr:[],
    sum:1,
    buttons:[{
      label:"关于照片墙",
      icon:"/images/about.png"
    },
    {
      label: "分享照片",
      icon: "/images/sharePhoto.png"
    }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    if(that.data.dataArr.length < 10){
      sum = 1
    }else{
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
   * 获取数据库中的数据
   */
  getDBData(num){
    var that = this
    var obj = that.data
    if(num == 1){
      obj.dataArr.splice(0, obj.dataArr.length);
    }
    const db = wx.cloud.database()
    const shareImageDB = db.collection('shareImage')
    var that = this
    shareImageDB.skip((num-1)*10).limit(10).get({
      success: function (res) {
        console.log(res.data)
        for (var i = 0; i < res.data.length; i++) {
          var data = res.data[i]
          obj.dataArr.push(data)
        }
        that.setData({
          dataArr: obj.dataArr
        })
        if(res.data.length < 10){
          // wx.showToast({
          //   title: '数据加载完毕',
          // })
          if(sum != 1 && res.data.length < 10){
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
   * 浮动按钮点击事件
   */
  buttonClicked(e){
    let indexNum = e.detail.index
    console.log(e)
    if(indexNum == 0){
      wx.navigateTo({
        url: '/pages/about/about',
      })
    }else{
      wx.chooseImage({
        count: 1,
        success: function (res) {
          let tempFilePath = res.tempFilePaths[0]
          wx.navigateTo({
            url: '/pages/sharePhoto/sharePhoto?imageUrl=' + tempFilePath,
          })
        },
      })
    }
  }
})