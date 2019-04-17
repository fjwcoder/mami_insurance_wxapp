let App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: '',
    baby_name: '',
    index: '',
    baby_sex: '',
    baby_id: '',
    insurance_list: null,
    selected_list: [],


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBabyList();
  },


  onShow: function () {
    this.setData({
      index:'',
      insurance_list:''
    });
  },
  /**
   * 获取宝宝列表
   */
  getBabyList: function () {
    let _this = this;

    App._get('baby/getbabylist', {
      user_token: App.getGlobalData('user_token')
    }, function (result) {
      // console.log(result.data);

      _this.setData({
        list: Object.values(result.data)

      });

      _this.setData({
        baby__name: _this.getBabyName(result.data)
      })
      console.log(_this.data.baby_name)
      console.log(_this.data.list)
    });

  },


  /**
   * 自定义获取被保人名称
   */
  getBabyName: function (arr) {


    let result = [];

    arr.forEach(item => {

      Object.keys(item).forEach(k => {
        if (k === 'baby_name') {
          result.push(item[k]);
        }

      });
    })

    return result;

  },
  /**
   * 修改picker中的被保人
   */
  chengeBaby: function (e) {
    let _this = this
    _this.setData({
      index: e.detail.value,
    })
    _this.setData({
      baby_sex: _this.data.list[_this.data.index].baby_sex === 1 ? "男" : "女",
    })
    _this.setData({
      baby_id: _this.data.list[_this.data.index].baby_id
    })

    this.getInsuranceList()

  },

  /**
   * 获取可购买的保险
   */
  getInsuranceList: function () {
    let _this = this;
    wx.showLoading({
      title: '加载中..',
    })
    App._post_form('insurance/getcanbuyinsurance', {
        user_token: App.getGlobalData('user_token'),
        baby_id: _this.data.baby_id
      },
      function (result) {
        console.log(result)
        _this.setData({
          insurance_list: result.data
        })
        console.log(_this.data.insurance_list[0].name)
      })
  },

  /**
   * 
   * 选择保险
   */
  checkboxChange: function (e) {
    this.setData({
      selected_list: e.detail.value
    })
    console.log(this.data.selected_list.map(Number))
  },

  /**
   * 点击购买按钮
   */
  buyJump: function () {
    if (this.data.selected_list.length < 1) {
      wx.showToast({
        title: '您还没有选择购买的保险',
        icon: 'none',
        duration: 1500,
        mask: false,
      });
      return false;
    }

    wx.navigateTo({
      url: '../order/preview?list=' + this.data.selected_list + '&baby_id=' + this.data.baby_id,
    });

  }
});