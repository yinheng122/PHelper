// pages/visitingCardSet/visitingCardSet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    haveChoosedUserIcon:false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let typeId = options.modelType
    var that = this
    that.setData({
      typeId:typeId
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
   * 添加用户头像
   */
  addUserIcon(){
    var that = this
    wx.chooseImage({
      icon:1,
      success: function(res) {
        let tempFilePaths = res.tempFilePaths
        that.setData({
          haveChoosedUserIcon:true,
          userIcon:tempFilePaths[0]
        })
      },
    })
  },

  /**
   * 生成名片
   */
  toBuildVisitingCard(){
    var that = this
    var obj = that.data
    if (!obj.haveChoosedUserIcon) {
      wx.showToast({
        title: '请选择头像图片',
        icon:'none'
      })
      return
    }
    if(!obj.name){
      wx.showToast({
        title: '请输入您的姓名',
        icon: 'none'
      })
      return
    }
    if (!obj.position) {
      wx.showToast({
        title: '请输入您的职位',
        icon: 'none'
      })
      return
    }
    if (!obj.address) {
      wx.showToast({
        title: '请输入公司地址',
        icon: 'none'
      })
      return
    }
    if (!obj.phone) {
      wx.showToast({
        title: '请输入联系电话',
        icon: 'none'
      })
      return
    }
    if (!obj.email) {
      wx.showToast({
        title: '请输入联系邮箱',
        icon: 'none'
      })
      return
    }
    wx.navigateTo({
      url: '/pages/visitingCardProduct/visitingCardProduct?name=' + obj.name + '&position=' + obj.position + '&address=' + obj.address + '&phone=' + obj.phone + '&email=' + obj.email + '&typeName=' + obj.typeId + '&userIcon=' + obj.userIcon, 
    })
  },

  /**
   * 填写信息
   */
  textFill(e){
    let typeName = e.currentTarget.id 
    let userInfo = e.detail.value
    var that = this
    console.log(userInfo)
    if(typeName == 'name'){
      that.setData({
        name:userInfo
      })
    }else if(typeName == 'position'){
      that.setData({
        position:userInfo
      })
    }else if(typeName == 'address'){
      that.setData({
        address:userInfo
      })
    }else if(typeName == 'phone'){
      that.setData({
        phone:userInfo
      })
    }else {
      that.setData({
        email:userInfo
      })
    }
  }
})