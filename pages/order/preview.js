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
    disabled:'',

    insurance_id: 0, // 保险ID
    insurance_name: '',
    insurance_price: 0,
    insurance_pay: 0,
    insurance_description: '',

    define_list: [], // 预定义保单信息列表
    baby__name: [],
    index: '', //picker列表索引

    user_name: '',
    user_sex:'',
    user_address: '',
    user_age: '',
    user_mobile: '',
    user_id_card: '',
    user_s_date: '', //投保人身份证开始时间
    user_o_date: '', //投保人身份证结束时间
    user_region: [], //投保人省市区
    relationship_to_baby:["父子","父女","母子","母女"],//与被保人关系

    baby_name: '',
    baby_sex:'',
    baby_age: '',
    baby_region: '',
    baby_address: '',
    baby_id_card: '',
    baby_s_date: '',
    baby_o_date: '',
    relationship_to_user:'',//与投保人关系
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 设置图片宽高：高度=宽度=屏幕宽度的1/5
    this.setData({
      img_width: wx.getSystemInfoSync().windowWidth * 0.2
    });

    // 当前页面参数

    this.data.options = options;

    this.data.insurance_id = options.insurance_id; // 保险ID

    // 获取商品（保险）详细信息
    this.getInsuranceDetail(options.insurance_id);
    // console.log(options);
    // return false;

    //获取自定义保单列表
    this.getInspolicyList()
  },


  /*
   * 获取保单列表
   */
  getInspolicyList: function() {
    let _this = this;

    App._get('baby/getDefInsuranceInfoList', {
      user_token: App.getGlobalData('user_token')
    }, function(result) {
      console.log(result.data);

      _this.setData({
        define_list: Object.values(result.data)
      });

      _this.setData({
        baby__name: _this.getBabyName(result.data)
      });
    });


  },



  /**
   * 自定义获取被保人名称
   */
  getBabyName: function(arr) {


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
  chengeBaby: function(e) {
    this.setData({
      index: e.detail.value
    })
    this.getInsuranceDetailInfo(e.detail.value);
   
    console.log(this.data.baby_name);
  },
  /**
   * 获取详细信息显示
   */
  getInsuranceDetailInfo: function(index) {
    let _this = this;
    _this.setData({
      user_name: _this.data.define_list[index].user_name,
      user_address: _this.data.define_list[index].user_address,
      user_age: _this.data.define_list[index].user_age,
      user_mobile: _this.data.define_list[index].user_mobile,
      user_id_card: _this.data.define_list[index].user_id_card,
      user_s_date: _this.data.define_list[index].user_id_card_begintime,
      user_o_date: _this.data.define_list[index].user_id_card_endtime,
      user_sex: (_this.data.define_list[index].user_sex === 1)?"男":"女",
      index_a: _this.data.define_list[index].relationship_to_baby - 1,

      baby_name: _this.data.define_list[index].baby_name,
      baby_age: _this.data.define_list[index].baby_age,
      baby_address: _this.data.define_list[index].baby_address,
      baby_s_date: _this.data.define_list[index].baby_id_card_begintime,
      baby_o_date: _this.data.define_list[index].baby_id_card_endtime,
      baby_id_card: _this.data.define_list[index].baby_id_card,
      baby_sex: (_this.data.define_list[index].baby_sex === 1) ? "男" : "女",

    })
  
  },
 
  /*
   * 获取保险详情
   */
  getInsuranceDetail: function(insurance_id) {
    let _this = this;
    App._get('Insurance/wxappGetInsuranceInfo', {
      insurance_id: insurance_id
    }, function(result) {
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
     * 表单提交
     */
  saveData: function (e) {

    let _this = this,
      values = _this.data.define_list[_this.data.index]

   //保险id赋值到values
    values.insurance_id = parseInt(_this.data.insurance_id)
    //user_token赋值到values
    values.user_token = App.getGlobalData('user_token');

    console.log(values);
 

    // 按钮禁用
    _this.setData({
      disabled: true
    });
    // console.log(values);
    // return false;
    // 提交到后端
    App._post_form('Insurance/insuranceOrderCreate', values, function (result) {
     console.log(values);
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
  goodsDetail: function(e) {
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
  payOrder: function(e) {
    let _this = this;
    let order_id = _this.data.order_id;

    // 显示loading
    wx.showLoading({
      title: '正在处理...',
    });
    App._post_form('user.order/pay', {
      order_id
    }, function(result) {
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
        success: function(res) {
          _this.getOrderDetail(order_id);
        },
        fail: function() {
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