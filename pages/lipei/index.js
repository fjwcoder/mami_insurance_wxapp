let App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    error: '',
    disabled: false,

    baby_name: '',
    insurance_name: '',
    user_name: '',
    user_id_card: '',
    insurance_order_id: '',
    idfront: '../../images/id_card1.png', // 身份证正面
    idback: '../../images/id_card0.png', // 身份证反面
    bank: '../../images/bank.png', // 银行卡正面
    check: '../../images/baogaodan.png', // 检测单
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

  uploadIdCardImageZ: function() {
    let _this = this;
    // console.log(App.path_root);
    App._img_upload('Fileupload/imgUpload?img=', 'idfront', function(res) {
      // console.log(res);
      _this.setData({
        idfront: App.path_root + res,
      });
    });
  },

  uploadIdCardImageF: function() {
    let _this = this;
    App._img_upload('Fileupload/imgUpload?img=', 'idback', function(res) {
      _this.setData({
        idback: App.path_root + res,
      });
    })
  },

  uploadCheckImage: function() {
    let _this = this;
    App._img_upload('Fileupload/imgUpload?img=', 'check', function(res) {
      _this.setData({
        check: App.path_root + res,
      });
    })
  },

  uploadBankImage: function() {
    let _this = this;
    App._img_upload('Fileupload/imgUpload?img=', 'bank', function(res) {
      _this.setData({
        bank: App.path_root + res,
      });
    })
  },
  /**
   * 提交
   */
  submitData: function(e) {

    let _this = this,
      values = e.detail.value;
    values.insurance_order_id = _this.data.insurance_order_id;
    values.id_card_front = _this.data.idfront;
    values.id_card_back = _this.data.idback;
    values.bank_card = _this.data.bank;
    values.check_policy = _this.data.check;
    values.user_token = App.getGlobalData('user_token');
    console.log(values);

      //表单验证
      if (!_this.formValidation(values)) {
        App.showError(_this.data.error);
        return false;
      }
      // 按钮禁用
      _this.setData({
        disabled: true
      });
    // 提交到后端
    App._post_form('compensate/compensateordercreate', values, function (result) {

      App.showSuccess(result.msg, function () {
        wx.navigateBack();
      });
    }, false, function () {
      // 解除禁用
      _this.setData({
        disabled: false
      });
    });

  },
  /**
   * 表单验证
   */
  formValidation: function(values) {
    if (values.id_card_front === '../../images/id_card0.png') {
      this.data.error = '请上传身份证人像面照片';
      return false;
    }
    if (values.id_card_back === '../../images/id_card1.png') {
      this.data.error = '请上传身份证国徽面照片';
      return false;
    }
    if (values.bank_card === '../../images/bank.png') {
      this.data.error = '请上传银行卡正面';
      return false;
    }
    if (values.check_policy === '../../images/baogao.png') {
      this.data.error = '请上传抗体检测报告';
      return false;
    }
    if (values.bank_card_number === '') {
      this.data.error = '银行卡号不能为空';
      return false;
    }
    return true;
  }
})