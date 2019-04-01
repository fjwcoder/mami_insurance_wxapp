let App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baby_name: '',
    insurance_name: '',
    user_name: '',
    user_id_card: '',
    insurance_order_id: '',
    idfront: '../../images/id_card0.png', // 身份证正面
    idback: '../../images/id_card1.png', // 身份证反面
    bank: '../../images/bank.png', // 银行卡正面
    check: '../../images/baogao.png', // 检测单
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      user_name: options.user_name,
      baby_name: options.baby_name,
      insurance_name: options.insurance_name,
      user_id_card: options.user_id_card,
      insurance_order_id: options.order_id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 修改身份证号
   */
  getIDCard: function(e) {
    this.setData({
      user_id_card: e.detail.value
    })
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