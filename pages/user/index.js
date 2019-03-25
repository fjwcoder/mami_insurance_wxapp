let App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    orderCount: {},
    phone:'',//手机号
    code:'',//验证码
    iscode: null,//用于存放验证码接口里获取到的code
    codename: '获取验证码',
    input_disabled: false
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.modalBtn()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取当前用户信息
    this.getUserDetail();
  },

  /**
   * 获取当前用户信息
   */
  getUserDetail: function () {

    if(App.globalData.user_token === null){ // create by fjw in 19.3.22: 如果用户没有登录，就重新登录
      wx.hideNavigationBarLoading();
      App.doLogin();
      return false;
    }

    let _this = this;

    // App._get('User/getUserDetail', {}, function (result) {
    //   _this.setData(result.data);
    // });
  },
  shows: function () {
    this.setData({
      display: "block"
    })
  },
  hides: function () {
    this.setData({
      display: "none"
    })
  } ,

  /***
   * 获取手机号码
   */
  
  getPhoneValue: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  getCodeValue: function (e) {
    this.setData({
      code: e.detail.value
    })
  },
  
  getCode: function () {
    var _this = this;
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    if (this.data.phone == "") {
      App.showError('手机号不能为空');
      return false;
    } 
    if (!myreg.test(this.data.phone)) {
      App.showError('请输入正确的手机号');
      return false;
    }
    
    App._post_form("Common/sendSms", { mobile: this.data.phone }, function (result) {
      console.log(result);
      if (result.code === 200){
        
        _this.setData({
          input_disabled: true,// 1. 手机输入框变为不可修改
          disabled: true  // 2. 获取验证码按钮disable
        })
        
        // 3. 获取验证码按钮显示倒计时
        var num = 61;
        var timer = setInterval(function () {
          num--;
          if (num <= 0) {
            clearInterval(timer);
            _this.setData({
              codename: '重新发送',
              disabled: false
            })

          } else {
            _this.setData({
              disabled: true,
              codename: num + "s"
            })

          }
        }, 1000)
      }
    });
    
    
    
  },

  //提交表单信息
  save: function () {
    var myreg = /^(14[0-9]|13[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$$/;
    if (this.data.name == "") {
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (this.data.phone == "") {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (!myreg.test(this.data.phone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none',
        duration: 1000
      })
      return false;
    }
    if (this.data.code == "") {
      wx.showToast({
        title: '验证码不能为空',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else if (this.data.code != this.data.iscode) {
      wx.showToast({
        title: '验证码错误',
        icon: 'none',
        duration: 1000
      })
      return false;
    } else {
      wx.setStorageSync('name', this.data.name);
      wx.setStorageSync('phone', this.data.phone);
      wx.redirectTo({
        url: '../add/add',
      })
    }
  },
})