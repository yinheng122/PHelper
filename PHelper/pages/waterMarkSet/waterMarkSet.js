// pages/waterMarkSet/waterMarkSet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorArrF: ['black','whitesmoke','red','orange','yellow'],
    colorArrS:['green','blue','cyan','purple','gray'],
    currentColor:'black'
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
  * 生成水印图片
  */
  toBuildTheWaterMarkPic(){
    wx.chooseImage({
      count: 1,
      success: function (res) {
        let tempFilePaths = res.tempFilePaths
        wx.navigateTo({
          url: '/pages/waterMark/waterMark?imageUrl=' + tempFilePaths,
        })
      },
    })
  },

  /**
   * 文字编辑完成的回调
   */
  textFinish(e){
    
  },

  /**
   * 选择第一行的颜色
   */
  chooseColorF(e){
    console.log(e)
    let indexNum = e.currentTarget.id
    var that = this
    that.setData({
      currentColor:indexNum
    })
  },

  /**
   * 选择第二行的颜色
   */
  chooseColorS(e){
    console.log()
    let indexNum = e.currentTarget.id
    var that = this
    that.setData({
      currentColor:indexNum
    })
  }

})