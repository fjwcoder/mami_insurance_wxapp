let App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // order_id: null,
    // order: {},
    img_width: 0,
    // img_height: 0,

    insurance_id: 0, // 保险ID
    insurance_name: '',
    insurance_price: 0,
    insurance_pay: 0,
    insurance_description: '',

    define_list: [], // 预定义保单信息列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 设置图片宽高
    let windowWidth = wx.getSystemInfoSync().windowWidth;
    console.log(windowWidth);
    let calWinWidth = windowWidth * 0.2;
    this.setData({
      img_width: calWinWidth
      // img_height: calWinWidth
    });
    // 当前页面参数
    this.data.options = options;
    this.data.insurance_id = options.insurance_id; // 保险ID
console.log(this.data.insurance_id);
    // 获取商品（保险）详细信息
    this.getInsuranceDetail(options.insurance_id);
    // console.log(options);
    // return false;
  },

  /**
     * 获取保险详情
     */
  getInsuranceDetail: function (insurance_id) {
    let _this = this;
    App._get('Insurance/wxappGetInsuranceInfo', { insurance_id: insurance_id }, function (result) {
      console.log(result.data);
      _this.setData({
        insurance_img: result.data.headimgurl,
        insurance_name: result.data.name,
        insurance_price: result.data.price,
        insurance_pay: result.data.pay_limit,
        insurance_description: result.data.description,
      });
    });
  },

  /**
   * 获取订单详情
   */
  // getOrderDetail: function (order_id) {
  //   let _this = this;
  //   App._get('user.order/detail', { order_id }, function (result) {
  //     _this.setData(result.data);
  //   });
  // },

  /**
   * 跳转到商品详情
   */
  goodsDetail: function (e) {
    let goods_id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../goods/index?goods_id=' + goods_id
    });
  },

  /**
   * 取消订单
   */
  // cancelOrder: function (e) {
  //   let _this = this;
  //   let order_id = _this.data.order_id;
  //   wx.showModal({
  //     title: "提示",
  //     content: "确认取消订单？",
  //     success: function (o) {
  //       if (o.confirm) {
  //         App._post_form('user.order/cancel', { order_id }, function (result) {
  //           wx.navigateBack();
  //         });
  //       }
  //     }
  //   });
  // },

  /**
   * 发起付款
   */
  payOrder: function (e) {
    let _this = this;
    let order_id = _this.data.order_id;

    // 显示loading
    wx.showLoading({ title: '正在处理...', });
    App._post_form('user.order/pay', { order_id }, function (result) {
      if (result.code === -10) {
        App.showError(result.msg);
        return false;
      }
      // 发起微信支付
      wx.requestPayment({
        timeStamp: result.data.timeStamp,
        nonceStr: result.data.nonceStr,
        package: 'prepay_id=' + result.data.prepay_id,
        signType: 'MD5',
        paySign: result.data.paySign,
        success: function (res) {
          _this.getOrderDetail(order_id);
        },
        fail: function () {
          App.showError('订单未支付');
        },
      });
    });
  },

  /**
   * 确认收货
   */
  // receipt: function (e) {
  //   let _this = this;
  //   let order_id = _this.data.order_id;
  //   wx.showModal({
  //     title: "提示",
  //     content: "确认收到商品？",
  //     success: function (o) {
  //       if (o.confirm) {
  //         App._post_form('user.order/receipt', { order_id }, function (result) {
  //           _this.getOrderDetail(order_id);
  //         });
  //       }
  //     }
  //   });
  // },


});