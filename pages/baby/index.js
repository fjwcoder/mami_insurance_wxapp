let App = getApp();

Page({
  data: {
    list: [],
    default_id: null,
  },

  onLoad: function (options) {
    // 当前页面参数
    this.data.options = options;
  },

  onShow: function () {
    // 获取收货地址列表
    this.getBabyList();
  },

  /**
   * 获取收货地址列表
   */
  getBabyList: function () {
    let _this = this;
 
    App._get('baby/addbabyinfo', access_token, function(result) {
      console.log(result);
      _this.setData(result.data);
    });
  },
  /**
   * 添加新宝宝
   */
  createBaby: function () {
    wx.navigateTo({
      url: './create'
    });
  },

  /**
   * 编辑地址
   */
  editAddress: function (e) {
    wx.navigateTo({
      url: "./detail?address_id=" + e.currentTarget.dataset.id
    });
  },

  /**
   * 移除收货地址
   */
  removeAddress: function (e) {
    let _this = this,
      address_id = e.currentTarget.dataset.id;
    wx.showModal({
      title: "提示",
      content: "您确定要移除当前宝宝址吗?",
      success: function (o) {
        o.confirm && App._post_form('addchildren/delete', {
          address_id
        }, function (result) {
          _this.getAddchildrenList();
        });
      }
    });
  },

  /**
   * 设置为默认地址
   */
  setDefault: function (e) {
    let _this = this,
      address_id = e.detail.value;
    _this.setData({
      default_id: parseInt(address_id)
    });
    App._post_form('address/setDefault', {
      address_id
    }, function (result) {
      _this.data.options.from === 'flow' && wx.navigateBack();
    });
    return false;
  },

});