let App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    orderCount: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

    App._get('User/getUserDetail', {}, function (result) {
      _this.setData(result.data);
    });
  },


})