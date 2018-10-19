// pages/waterMarkSet/waterMarkSet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorArrF: ['black','whitesmoke','red','orange','yellow'],
    colorArrS:['green','blue','cyan','purple','gray'],
    currentColor:'black',
    chooseImagesArr:[""],
    textToPrint:"",
    canProduce:true,
    rotate:'45',
    fontSize:14
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
    console.log(e)
    var text = e.detail.value
    var that = this
    var obj = that.data
    if(obj.chooseImagesArr.length > 1 && text.length > 0){
      that.setData({
        canProduce:false,
        textToPrint:text
      })
    }else{
      that.setData({
        canProduce: true,
        textToPrint: text
      })
    }

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
    
    let indexNum = e.currentTarget.id
    var that = this
    that.setData({
      currentColor:indexNum
    })
  },

  /**
   * 角度选择条变动回调
   */
  sliderChange(e){
    console.log(e)
    var value = e.detail.value
    var that = this
    that.setData({
      rotate:value
    })
  },

  /**
   * 选择图片
   */
  chooseImageTap(){
    var that = this
    var imageArr = that.data.chooseImagesArr
    var count = 1
    if(imageArr == 1){
      count = 4
    }else{
      count = 5-imageArr.length
    }
    wx.chooseImage({
      // 最多选择4张
      count: count,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        var tempFilePaths = res.tempFilePaths
        for (var i = 0; i < tempFilePaths.length; i++){
          var item = tempFilePaths[i]
          imageArr.unshift(item)
        }
        if(imageArr.length > 4){
          imageArr.pop()
        }
        that.setData({
          chooseImagesArr: imageArr
        })
        if(that.data.textToPrint != ""){
          that.setData({
            canProduce:false
          })
        }
      }
    })
  },

  /**
   * 点击预览图片
   */
  previewImagesTap(e){
    var index = e.currentTarget.id
    var that = this
    wx.previewImage({
      urls: that.data.chooseImagesArr,
      current:that.data.chooseImagesArr[index]
    })
  },

  /**
   * 长按删除图片
   */
  deleteImages(e){
    var index = e.currentTarget.id
    var that = this
    var imagesArr = that.data.chooseImagesArr
    if(imagesArr[index] == ''){
      return
    }
    if (that.isInArray(imagesArr,"")){
      if(index != 3){
        imagesArr.splice(index, 1)
      }
    }else{
      if(imagesArr.length == 4){
        imagesArr.push("")
      }
      imagesArr.splice(index, 1)
    }
    that.setData({
      chooseImagesArr:imagesArr,
      
    })
    if(imagesArr.length <= 1){
      that.setData({
        canProduce: true
      })
    }
  },

  /**
   * 判断元素是否在数组中
   */
  isInArray(arr, value){
    for(var i = 0; i<arr.length; i++){
      if (value === arr[i]) {
        return true;
      }
    }
    return false;
  },

  /**
   * 点击生成水印图片
   */
  toProducePic(){
    var obj = this.data
    console.log(obj.chooseImagesArr)
    var imagesArrJson = JSON.stringify(obj.chooseImagesArr);
    wx.navigateTo({
      url: '/pages/waterMark/waterMark?imagesArr=' + imagesArrJson + '&textToPrint=' + obj.textToPrint + '&rotate=' + obj.rotate + '&color=' + obj.currentColor + '&fontSize=' + obj.fontSize,
    })
  },

  /**
   * 调节字体大小
   */
  textSliderChange(e){
    var value = e.detail.value
    var that = this
    that.setData({
      fontSize:value
    })
  }

})