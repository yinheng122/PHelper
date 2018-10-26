// pages/wordFill/wordCombine.js
import CanvasDrag from '../../components/canvas-drag/canvas-drag';
var url
Page({

  /**
   * 页面的初始数据
   */
  data: {
    graph: {},
    screenWidth:0,
    textToPrint:'',
    canAdd:true,
    colorArrF: ['black', 'whitesmoke', 'red', 'orange', 'yellow'],
    colorArrS: ['green', 'blue', 'cyan', 'purple', 'gray'],
    currentColor: 'black',
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
    var that = this
    let screenWidth = wx.getSystemInfoSync().windowWidth
    that.setData({
      screenWidth: screenWidth
    })
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
   * 文字输入完成
   */
  textFinish(e){
    var text = e.detail.value
    var that = this
    if(text.length > 0){
      that.setData({
        canAdd: false
      })
    }else{
      that.setData({
        canAdd: true
      })
    }
    that.setData({
      textToPrint:text
    })
  },

  /**
  * 添加图片
  */
  onAddImage() {
    var that = this
    wx.chooseImage({
      count:1,
      success: (res) => {
        console.log(res)
        url = res.tempFilePaths[0]
        console.log(url)
        wx.getImageInfo({
          src: url,
          success: function (res) {
            var rate = res.height/res.width
            that.setData({
              graph: {
                w: 200,
                h: 200*rate,
                type: 'image',
                url: url,
              }
            })
          }
        })
      }
    })
  },

  /**
  * 添加文本
  */
  onAddText() {
    var that = this
    var obj = that.data;
    that.setData({
      graph: {
        type: 'text',
        text: obj.textToPrint,
      }
    });
  },

  /**
   * 选择第一行的颜色
   */
  chooseColorF(e) {
    console.log(e)
    let indexNum = e.currentTarget.id
    var that = this
    that.setData({
      currentColor: indexNum
    })
    CanvasDrag.changFontColor(indexNum);
  },

  /**
   * 选择第二行的颜色
   */
  chooseColorS(e) {
    let indexNum = e.currentTarget.id
    var that = this
    that.setData({
      currentColor: indexNum
    })
    CanvasDrag.changFontColor(indexNum);
  },

  /**
     * 导出图片
     */
  onExport() {
    CanvasDrag.export()
      .then((filePath) => {
        console.log(filePath);
        wx.previewImage({
          urls: [filePath]
        })
      })
      .catch((e) => {
        console.error(e);
      })
  }
})