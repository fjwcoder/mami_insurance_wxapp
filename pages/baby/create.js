let App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: false,
    nav_select: false, // 快捷导航
    region: '',

    error: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 表单提交
   */
  saveData: function(e) {
    let _this = this,
      values = e.detail.value
    values.region = this.data.region;

    // 表单验证
    if (!_this.validation(values)) {
      App.showError(_this.data.error);
      return false;
    }

    // 按钮禁用
    _this.setData({
      disabled: true
    });

    // 提交到后端
    App._post_form('baby/addBabyInfo', values, function(result) {
      App.showSuccess(result.msg, function() {
        wx.navigateBack();
      });
    }, false, function() {
      // 解除禁用
      _this.setData({
        disabled: false
      });
    });
  },

  /**
   * 表单验证
   */
  validation: function(values) {
    if (values.baby_name === '') {
      this.data.error = '宝宝姓名不可为空';
      return false;
    }
    if(values.baby_sex === 0 || values.baby_sex === ''){
      this.data.error = '请选择宝宝性别';
      return false;
    }
    if (values.father_name === '') {
      this.data.error = '宝爸名称不可为空';
      return false;
    }
    if (values.mother_name === '') {
      this.data.error = '宝妈名称不可为空';
      return false;
    }
    if (values.exigence_name === '') {
      this.data.error = '紧急联系人不可为空';
      return false;
    }

    if (values.exigence_phone.length < 1) {
      this.data.error = '紧急联系手机';
      return false;
    }
    if (values.exigence_phone.length !== 11) {
      this.data.error = '手机号长度有误';
      return false;
    }
    let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!reg.test(values.exigence_phone)) {
      this.data.error = '手机号不符合要求';
      return false;
    }

    if (values.baby_birthday === '') {
      this.data.error = '宝宝生日不可为空';
      return false;
    }

    if (values.relationship === 0) {
      this.data.error = '请设置与宝宝的关系';
      return false;
    }
    if (values.baby_jiezhong === '') {
      this.data.error = '请选择接种地点';
      return false;
    }

    // if (!this.data.region) {
    //   this.data.error = '省市区不能空';
    //   return false;
    // }
    // if (values.detail === '') {
    //   this.data.error = '详细地址不能为空';
    //   return false;
    // }
    return true;
  },

  /**
   * 修改地区
   */
  bindRegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },


  /**
   * 快捷导航 显示/隐藏
   */
  commonNav: function() {
    this.setData({
      nav_select: !this.data.nav_select
    });
  },

  /**
   * 快捷导航跳转
   */
  nav: function(e) {
    let url = '';
    switch (e.currentTarget.dataset.index) {
      case 'home':
        url = '../index/index';
        break;
      case 'fenlei':
        url = '../category/index';
        break;
      case 'profile':
        url = '../user/index';
        break;
    }
    wx.switchTab({
      url
    });
  },

})