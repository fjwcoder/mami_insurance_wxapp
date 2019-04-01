let App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idfront: '../../images/shangchuan.png', // 身份证正面
    idback: '../../images/shangchuan.png', // 身份证反面
    bank: '../../images/shangchuan.png', // 银行卡正面
    check: '../../images/shangchuan.png', // 检测单
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
   * 上传身份证正面照片
   */

  uploadIdCardImageZ: function(){
    let _this = this;
    // console.log(App.path_root);
    App._img_upload('Fileupload/imgUpload?img=', 'idfront', function(res){
      // console.log(res);
      _this.setData({
        idfront: App.path_root + res,
      });
    });
  },

   uploadIdCardImageF: function () {
    App._img_upload('Fileupload/imgUpload?img=', 'idback', function(res){

    })
  }
})