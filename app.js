App({

  /**
   * 全局变量
   */
  globalData: {
    user_id: 0,
    user_mobile: null,
    user_token: null,
    // user_token:  'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJNQU1JIEpXVCIsImlhdCI6MTU1MzU3NzYxOSwiZXhwIjozMTA3MTU1MjM4LCJhdWQiOiJNQU1JIiwic3ViIjoiTUFNSSIsImRhdGEiOnsidXNlcl9pZCI6MSwibW9iaWxlIjoiMTg3MDY2ODEyMTAiLCJhcHBfb3BlbmlkIjoib0pqdlg1WGtvQ09tWG5zOHhUZWtMY296ei1IOCIsInVuaW9uaWQiOiIiLCJjcmVhdGVfdGltZSI6MTU1MzU3NzYxOX19.AZSKgYAlj-u0dEpwWxj68IUusqmMrnSFLNWEGL7ukFg',
  },

  year: null,
  month: null,
  day: null,
  access_token: null,

  api_root: '', // api地址
  siteInfo: require('siteinfo.js'),

  /**
   * 生命周期函数--监听小程序初始化
   */
  onLaunch: function() {
    // 设置api地址
    this.setApiRoot();
    this.setYMD();
    this.createAccessToken();
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function(options) {
    // console.log(this.access_token);
    // 获取小程序基础信息
    // this.getWxappBase(function(wxapp) { // 注释 by fjw
      // 设置navbar标题、颜色
      // wx.setNavigationBarColor({
      //   frontColor: '#ffffff',//wxapp.navbar.top_text_color.text,
      //   backgroundColor: '#ff664b',//wxapp.navbar.top_background_color
      // })
    // });
  },

  /**
   * 设置api地址
   */
  setApiRoot: function() {
    // this.api_root = this.siteInfo.siteroot + 'index.php?s=/api/';
    this.api_root = this.siteInfo.siteroot;
  },
  /**
   * create by fjw in 19.3.21
   * 设置当前年月日
   */
  setYMD: function(){
    var date = new Date(Date.parse(new Date()));
    //获取年份  
    this.year = date.getFullYear();
    //获取月份  
    this.month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //获取当日日期 
    this.day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    
  },
  /**
   * create by fjw in 19.3.21
   * 创建access_token
   */
  createAccessToken: function () {
    var access_token = null;
    let api_key = 'l2V|gfZp{8`;jzR~6Y1_';
    const md5_Obj = require('./utils/hex_md5.js');
    this.access_token = md5_Obj.hexMD5('RuiTongMamiV2' + this.year + this.month + this.day + api_key);
  },
  /**
   * 
   */
  objToArr: function(obj){
    return Object.values(obj);
  },


  /**
   * 获取小程序基础信息 注释 by fjw
   */
  getWxappBase: function(callback) {
    let App = this;
    App._get('wxapp/base', {}, function(result) {
      // console.log(result);
      // 记录小程序基础信息
      wx.setStorageSync('wxapp', result.data.wxapp);
      callback && callback(result.data.wxapp);
    }, false, false);
  },

  /**
   * 执行用户登录
   */
  doLogin: function() {
    // 保存当前页面
    let pages = getCurrentPages();
    if (pages.length) {
      let currentPage = pages[pages.length - 1];
      "pages/login/login" != currentPage.route &&
        wx.setStorageSync("currentPage", currentPage);
    }
    // 跳转授权页面
    wx.navigateTo({
      url: "/pages/login/login"
    });
  },

  /**
   * 判断是否登录
   */
  isLogin: function(){
    if (wx.getStorageSync('user_token') === '' || wx.getStorageSync('user_token') === null){
      return false;
    }else{
      return true;
    }
  },
  /**
   * 获取 App.globalData数据
   */
  getGlobalData: function(param){
    return wx.getStorageSync(param);
  },


  /**
   * 显示成功提示框
   */
  showSuccess: function(msg, callback) {
    wx.showToast({
      title: msg,
      icon: 'success',
      success: function() {
        callback && (setTimeout(function() {
          callback();
        }, 1500));
      }
    });
  },

  /**
   * 显示失败提示框
   */
  showError: function(msg, callback) {
    wx.showModal({
      title: '友情提示',
      content: msg,
      showCancel: false,
      success: function(res) {
        // callback && (setTimeout(function() {
        //   callback();
        // }, 1500));
        callback && callback();
      }
    });
  },
  

  /**
   * get请求
   */
  _get: function(url, data, success, fail, complete, check_login) {
    wx.showNavigationBarLoading();
    let App = this;
    // 构造请求参数
    data = data || {};
    data['wxapp_id'] = 10001;

    // if (typeof check_login === 'undefined')
    //   check_login = true;

    // 构造get请求
    let request = function() {
      // data.token = wx.getStorageSync('token');
      data.user_token = App.getGlobalData('user_token'),
      wx.request({
        url: App.api_root + url,
        header: {
          'content-type': 'application/json',
          'access_token': App.access_token,
        },
        data: data,
        success: function(res) {
          // console.log(res);
          if (res.statusCode !== 200 || typeof res.data !== 'object') {
            App.showError('网络请求出错');
            return false;
          }
          if(res.data.code !== 200){ // add by fjw in 19.3.22: 如果接口返回状态码错误，就提示一下
            App.showError(res.data.msg);
            // return false;
          }
          if (res.data.code === -1) {
            // 登录态失效, 重新登录
            wx.hideNavigationBarLoading();
            App.doLogin();
          } else if (res.data.code === 0) {
            App.showError(res.data.msg);
            return false;
          } else {
            success && success(res.data);
          }
        },
        fail: function(res) {
          // console.log(res);
          App.showError(res.errMsg, function() {
            fail && fail(res);
          });
        },
        complete: function(res) {
          wx.hideNavigationBarLoading();
          complete && complete(res);
        },
      });
    };
    // 判断是否需要验证登录
    check_login ? App.doLogin(request) : request();
  },

  /**
   * post提交
   */
  _post_form: function(url, data, success, fail, complete) {
    wx.showNavigationBarLoading();
    let App = this;
    data.wxapp_id = App.siteInfo.uniacid;
    // data.token = wx.getStorageSync('token');
    data.user_token = App.getGlobalData('user_token'),
    wx.request({
      url: App.api_root + url,
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'access_token': App.access_token,
      },
      method: 'POST',
      data: data,
      success: function(res) {
        if (res.statusCode !== 200 || typeof res.data !== 'object') {
          App.showError('网络请求出错');
          return false;
        }
        if (res.data.code === -1) {
          // 登录态失效, 重新登录
          App.doLogin(function() {
            App._post_form(url, data, success, fail);
          });
          return false;
        } else if (res.data.code === 0) {
          App.showError(res.data.msg, function() {
            fail && fail(res);
          });
          return false;
        }
        success && success(res.data);
      },
      fail: function(res) {
        // console.log(res);
        App.showError(res.errMsg, function() {
          fail && fail(res);
        });
      },
      complete: function(res) {
        wx.hideLoading();
        wx.hideNavigationBarLoading();
        complete && complete(res);
      }
    });
  },

  /**
   * 验证是否存在user_info
   */
  validateUserInfo: function() {
    let user_info = wx.getStorageSync('user_info');
    return !!wx.getStorageSync('user_info');
  },

  /**
   * 对象转URL
   */
  urlEncode: function urlencode(data) {
    var _result = [];
    for (var key in data) {
      var value = data[key];
      if (value.constructor == Array) {
        value.forEach(function(_value) {
          _result.push(key + "=" + _value);
        });
      } else {
        _result.push(key + '=' + value);
      }
    }
    return _result.join('&');
  },

  /**
   * 设置当前页面标题
   */
  setTitle: function() {
    let App = this,
      wxapp;

    // if (wxapp = wx.getStorageSync('wxapp')) {
      wx.setNavigationBarTitle({
        title: '妈咪爱天使疫苗保险',//wxapp.navbar.wxapp_title
      });
    // } else {
    //   App.getWxappBase(function() {
    //     App.setTitle();
    //   });
    // }
  },

  

});