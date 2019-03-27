let App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: false,
    nav_select: false, // 快捷导航
    region: '',
    date:'',
    baby_name:"请输入宝宝姓名",
    baby_sex:'',
    gender_arrey: ['男','女'],
    index:0,
    mother_name:'请输入母亲姓名',
    father_name: '请输入父亲姓名',
    exigence_name:'请输入紧急联系人姓名',
    exigence_mobile: '请输入紧急联系人电话',
    baby_jiezhong:'请选择接种点',
    error: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  /**
     * 修改出生日期
     */
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value

    })
    console.log(e)
  },

  /**
   * 填写宝宝姓名
   */
  getBabyName: function (e) {
    this.setData({
      babyName: e.detail.value
    })
  },
  /**
   * 修改宝宝性别
   */
  chengeBabySex: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 填写宝妈姓名
   */
  getMotherName: function (e) {
    this.setData({
      mother_name: e.detail.value
    })
  },

  /**
 * 填写宝爸姓名
 */
  getFatherName: function (e) {
    this.setData({
      father_name: e.detail.value
    })
  },

  /**
  * 填写紧急联系人姓名
  */
  getExigenceName: function (e) {
    this.setData({
      exigence_name: e.detail.value
    })
  },

  /**
  * 填写紧急联系人手机号
  */
  getExigenceMobile: function (e) {
    this.setData({
      exigence_mobile: e.detail.value
    })
  },

  /**
   * 填写接种点信息
   */
  getBabyJieZhong: function (e) {
    this.setData({
      baby_jiezhong: e.detail.value
    })
  },

  /**
   * 表单提交
   */
  saveData: function (e) {
    
    let _this = this,
    values = e.detail.value
    values.date = this.data.date;

    // 处理性别
    values.baby_sex = (values.baby_sex === 0)?1:2;

    // 表单验证
    if (!_this.validation(values)) {
      App.showError(_this.data.error);
      return false;
    }

    // 按钮禁用
    _this.setData({
      disabled: true
    });
    // console.log(values);
    // return false;
    // 提交到后端
    App._post_form('baby/addbabyinfo', values, function (result) {

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
  validation: function (values) {
    if (values.baby_name === '') {
      this.data.error = '宝宝姓名不能为空';
      return false;
    }
    if (values.exigence_mobile.length < 1) {
      this.data.error = '手机号不能为空';
      return false;
    }
    if (values.exigence_mobile.length !== 11) {
      this.data.error = '手机号长度有误';
      return false;
    }
    let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!reg.test(values.exigence_mobile)) {
      this.data.error = '手机号不符合要求';
      return false;
    }
    if (valus.father_name === ''){
      this.data.error = '父亲姓名不能为空';
      return false;
    }
    if (valus.mother_name === '') {
      this.data.error = '母亲姓名不能为空';
      return false;
    }
    if (valus.baby_jiezhong === '') {
      this.data.error = '接种点名称不能为空';
      return false;
    }
    return true;
  },

  
  /**
   * 快捷导航 显示/隐藏
   */
  commonNav: function () {
    this.setData({
      nav_select: !this.data.nav_select
    });
  },

  /**
   * 快捷导航跳转
   */
  nav: function (e) {
    let url = '';
    switch (e.currentTarget.dataset.index) {
      case 'home':
        url = '../index/index';
        break;
      case 'fenlei':
        url = '../category/index';
        break;
      case 'cart':
        url = '../flow/index';
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