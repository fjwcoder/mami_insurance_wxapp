let App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: false,
    nav_select: false, // 快捷导航
    region: '',
    id_card: '',
    date: '',
    baby_name: "请输入宝宝姓名",
    baby_sex: '',
    gender_arrey: ['男', '女'],
    index: 0,
    mother_name: '请输入母亲姓名',
    father_name: '请输入父亲姓名',
    exigence_name: '请输入紧急联系人姓名',
    exigence_mobile: '请输入紧急联系人电话',
    baby_jiezhong: '请选择接种点',
    error: '',
    babyId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options);
    // return false;
    this.getBabyInfo(options.baby_id);
  },
  /**
   * 获取要修改的宝宝信息
   */
  getBabyInfo: function(baby_id) {
    let _this = this;

    // console.log(baby_id);
    // return false;
    App._get('baby/getbabyinfo', {
      user_token: App.getGlobalData('user_token'),
      baby_id
    }, function(result) {
      _this.setData({
        id_card: result.data.id_card,
        baby_name: result.data.baby_name,
        index: result.data.baby_sex - 1,
        mother_name: result.data.mother_name,
        father_name: result.data.father_name,
        baby_jiezhong: result.data.baby_jiezhong,
        exigence_name: result.data.exigence_name,
        exigence_mobile: result.data.exigence_mobile,
        date: result.data.baby_birthday,
        babyId: result.data.baby_id
      })
    });
  },

  /**
   * 填写宝宝身份证号码
   */

  getBabyIdCard: function(e) {
    let _this = this;
    _this.setData({
      id_card: e.detail.value
    })

    //截取身份证号出生年月
    if (e.detail.value.length > 17) {
      var flg = "-"
      _this.insert_flg(e.detail.value, flg)
    }
    console.log(_this.data.date)
  },


  /**
   * 修改出生日期
   */
  bindDateChange: function(e) {
    this.setData({
      date: e.detail.value

    })
    console.log(e)
  },

  /**
   * 填写宝宝姓名
   */
  getBabyName: function(e) {
    this.setData({
      babyName: e.detail.value
    })
  },
  /**
   * 修改宝宝性别
   */
  chengeBabySex: function(e) {
    this.setData({
      index: e.detail.value
    })
  },
  /**
   * 填写宝妈姓名
   */
  getMotherName: function(e) {
    this.setData({
      mother_name: e.detail.value
    })
  },

  /**
   * 填写宝爸姓名
   */
  getFatherName: function(e) {
    this.setData({
      father_name: e.detail.value
    })
  },

  /**
   * 填写紧急联系人姓名
   */
  getExigenceName: function(e) {
    this.setData({
      exigence_name: e.detail.value
    })
  },

  /**
   * 填写紧急联系人手机号
   */
  getExigenceMobile: function(e) {
    this.setData({
      exigence_mobile: e.detail.value
    })
    console.log(this.data.exigence_mobile)
  },

  /**
   * 填写接种点信息
   */
  getBabyJieZhong: function(e) {
    this.setData({
      baby_jiezhong: e.detail.value
    })
  },

  /**
   * 表单提交
   */
  saveData: function(e) {

    let _this = this,
      values = e.detail.value

    values.date = this.data.date;
    values.baby_id = _this.data.babyId
    console.log(values);


    // 处理性别
    values.baby_sex = (values.baby_sex === 0) ? 1 : 2;

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
    App._post_form('baby/editbabyinfo', values, function(result) {

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
      this.data.error = '宝宝姓名不能为空';
      return false;
    }
    if (values.id_card === "" || values.id_card.length < 18) {
      this.data.error = '宝宝身份证号码不合规范';
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
    if (values.father_name === '') {
      this.data.error = '父亲姓名不能为空';
      return false;
    }
    if (values.mother_name === '') {
      this.data.error = '母亲姓名不能为空';
      return false;
    }
    if (values.baby_jiezhong === '') {
      this.data.error = '接种点名称不能为空';
      return false;
    }
    return true;
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

  /**
   * 自定义处理身份证号截取拼接
   */
  insert_flg: function(input_str, flg) {
    var str = input_str.substr(6, 8)
    var newstr = "";
    var nian = str.substr(0, 4)
    var yue = str.substr(4, 2)
    var ri = str.substr(6, 2)
    newstr += nian + flg + yue + flg + ri;
    this.setData({
      date: newstr
    })
  },


})