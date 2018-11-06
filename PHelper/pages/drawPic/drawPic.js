// pages/drawPic/drawPic.js
const ctx = wx.createCanvasContext('myCanvas')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorArr: ['black', 'whitesmoke', 'red', 'orange', 'yellow', 'green', 'yellowgreen', 'blue', 'cyan', 'purple', 'gray'],
    drawStyle:'pencil',// 选择的画笔类型，默认是铅笔
    currentColor:'black',//当前选择的颜色，默认黑色
    size:3
  },
  startX: 0, // 保存X坐标轴变量
  startY: 0, // 保存Y坐标轴变量
  isClear: false, // 是否启用橡皮擦标记
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let sw = wx.getSystemInfoSync().windowWidth
    let sh = wx.getSystemInfoSync().windowHeight
    ctx.setFillStyle('white')
    ctx.fillRect(0, 0, sw * 0.9, sh)
    ctx.draw()
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
   * 选择颜色
   */
  chooseColor(e){
    let color = e.currentTarget.id
    var that = this
    that.setData({
      currentColor:color
    })
  },

  /**
   *  选择铅笔
   */
  choosePencil(){
    var that = this
    this.isClear = false;
    that.setData({
      size:3,
      drawStyle:'pencil'
    })
  },

  /**
   * 选择钢笔
   */
  choosePen(){
    var that = this
    this.isClear = false;
    that.setData({
      size:10,
      drawStyle:'pen'
    })
  },

  /**
   * 选择笔刷
   */
  chooseBrush(){
    var that = this
    this.isClear = false;
    that.setData({
      size:20,
      drawStyle:'brush'
    })
  },

  /**
   * 选择橡皮
   */
  chooseEraser(){
    var that = this
    this.isClear = true;
    that.setData({
      drawStyle:'eraser'
    })
  },

  touchStart: function (e) {
    // 得到触摸点的坐标
    this.startX = e.changedTouches[0].x
    this.startY = e.changedTouches[0].y
    this.context = wx.createContext()
    if (this.isClear) { // 判断是否启用的橡皮擦功能  ture表示清除  false表示画画
      this.context.setStrokeStyle('#FFFFFF') // 设置线条样式 此处设置为画布的背景颜色  橡皮擦原理就是：利用擦过的地方被填充为画布的背景颜色一致 从而达到橡皮擦的效果 
      this.context.setLineCap('round') // 设置线条端点的样式
      this.context.setLineJoin('round') // 设置两线相交处的样式
      this.context.setLineWidth(20) // 设置线条宽度
      this.context.save();  // 保存当前坐标轴的缩放、旋转、平移信息
      this.context.beginPath() // 开始一个路径 
      this.context.arc(this.startX, this.startY, 5, 0, 2 * Math.PI, true);  // 添加一个弧形路径到当前路径，顺时针绘制  这里总共画了360度  也就是一个圆形 
      this.context.fill();  // 对当前路径进行填充
      this.context.restore();  // 恢复之前保存过的坐标轴的缩放、旋转、平移信息
    } else {
      this.context.setStrokeStyle(this.data.currentColor)
      this.context.setLineWidth(this.data.size)
      this.context.setLineCap('round') // 让线条圆润 
      this.context.beginPath()
    }
  },

  /**
   * 手指触摸后移动
   */
  touchMoves: function (e) {
    var startX1 = e.changedTouches[0].x
    var startY1 = e.changedTouches[0].y

    if (this.isClear) { //判断是否启用的橡皮擦功能  ture表示清除  false表示画画

      this.context.save();  //保存当前坐标轴的缩放、旋转、平移信息
      this.context.moveTo(this.startX, this.startY);  //把路径移动到画布中的指定点，但不创建线条
      this.context.lineTo(startX1, startY1);  //添加一个新点，然后在画布中创建从该点到最后指定点的线条
      this.context.stroke();  //对当前路径进行描边
      this.context.restore()  //恢复之前保存过的坐标轴的缩放、旋转、平移信息

      this.startX = startX1;
      this.startY = startY1;

    } else {
      this.context.moveTo(this.startX, this.startY)
      this.context.lineTo(startX1, startY1)
      this.context.stroke()

      this.startX = startX1;
      this.startY = startY1;

    }
    //只是一个记录方法调用的容器，用于生成记录绘制行为的actions数组。context跟<canvas/>不存在对应关系，一个context生成画布的绘制动作数组可以应用于多个<canvas/>
    wx.drawCanvas({
      canvasId: 'myCanvas',
      reserve: true,
      actions: this.context.getActions() // 获取绘图动作数组
    })
  },

  /**
   * 手指触摸动作结束
   */
  touchEnd: function () {

  },

  /**
   *  保存或者分享图片
   */
  savePaint(){
    var that = this
    wx.showActionSheet({
      itemList: ['保存涂鸦', '发布涂鸦'],
      success(res) {
        if(res.tapIndex == 0){
          that.save()
        }else{
          that.publishPainting()
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },

  save(){
    let sw = wx.getSystemInfoSync().windowWidth
    let sh = wx.getSystemInfoSync().windowHeight
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: sw * 0.9,
      height: sh,
      destWidth: sw * 0.9 * 2,
      destHeight: sh * 2,
      canvasId: 'myCanvas',
      success(res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
        })
      }
    })
  },

  publishPainting(){
    let sw = wx.getSystemInfoSync().windowWidth
    let sh = wx.getSystemInfoSync().windowHeight
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: sw * 0.9,
      height: sh,
      destWidth: sw * 0.9 * 2,
      destHeight: sh * 2,
      canvasId: 'myCanvas',
      success(res) {
        wx.navigateTo({
          url: '/pages/sharePainting/sharePainting?imageUrl=' + res.tempFilePath,
        })
      }
    })
    
  },
  
})