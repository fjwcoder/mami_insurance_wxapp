let App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    relation_arrey: ['父子', '父女', '母子', '母女'],
    gender_arrey: ['男', '女'],
    baby_list: [],
    index_a: 0, //与被保人关系
    index_b: 0, //投保人性别
    index_c: 0, //宝宝性别
    index_d: 0, //选择宝宝
    baby_info: [], //储存拉取的数据
    babyid: '',

    baby_index: 0,

    user_name: '',
    user_address: '',
    user_age: '',
    user_mobile: '',
    user_id_card: '',
    user_s_date: '', //投保人身份证开始时间
    user_o_date: '', //投保人身份证结束时间
    user_region: [], //投保人省市区

    baby_name: '',
    baby_age: '',
    baby_region: '',
    baby_address: '',
    baby_id_card: '',
    baby_s_date: '',
    baby_o_date: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getUserDetail();
    this.getBabyList();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //this.getBabyInfo(0);

  },
  /**
   * 获取投保人信息
   */
  getUserDetail: function() {
    let _this = this;
    App._get('user/getuserdetail', {
      user_token: App.getGlobalData('user_token'),
    }, function(result) {
      console.log(result.data);
      _this.setData({
        user_name: result.data.us_name,
        index_b: result.data.sex - 1,
        user_age: result.data.us_age,
        user_o_date: result.data.id_card_endtime,
        user_s_date: result.data.id_card_begintime,
        user_id_card: result.data.id_card,
        user_address: result.data.address_detail,
        user_mobile: result.data.mobile,
        user_region: result.data.us_sheng + ',' + result.data.us_shi + ',' + result.data.us_qu 
      })
      //console.log(_this.data.user_region);
      if (_this.data.user_region === "null,null,null") {
        _this.setData({
          user_region: "请选择地区"
        })
      }
    });
  },
  /**
   * 获取宝宝列表
   */
  getBabyList: function() {
    let _this = this;

    App._get('baby/getbabylist', {
      user_token: App.getGlobalData('user_token')
    }, function(result) {
      console.log(result.data);
      _this.setData({
        baby_info: Object.values(result.data)
      });
      console.log(_this.data.baby_info);
      _this.setData({
        baby_list: _this.getBabyName(_this.data.baby_info),
      })

      //console.log(_this.data.baby_info)
      // _this.setData({
      //   index_d: 0
      // })
      _this.getBabyInfo(0); // 显示默认的宝宝姓名
    });
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  /**
   * 修改投保人与被保人关系
   */
  chengeRelation: function(e) {
    this.setData({
      index_a: e.detail.value
    })
    //console.log(this.data.index_a)
  },
  /**
   * 修改投保人性别
   */
  chengeUserSex: function(e) {
    this.setData({
      index_b: e.detail.value
    })
  },

  /**
   * 选择被保人（baby）
   */
  chengeChooseBaby: function(e) {
    //console.log(e);
    this.setData({
      index_d: e.detail.value
    })
    this.getBabyInfo(e.detail.value);
  },
  /**
   * 修改宝宝性别
   */
  chengeBabySex: function(e) {
    this.setData({
      index_c: e.detail.value
    })
    console.log(e)
    return false;
  },
  /**
   * 修改投保人地区
   */
  bindRegionChange: function(e) {
    this.setData({
      user_region: e.detail.value
    })
  },


  /**
   * 修改投保人身份证开始日期
   */
  bindIdCardSDateChange: function(e) {
    this.setData({
      user_s_date: e.detail.value

    })
  },

  /**
   * 修改投保人身份证结束日期
   */
  bindIdCardODateChange: function(e) {
    this.setData({
      user_o_date: e.detail.value
    })
    
  },
  /**
   * 修改被保人身份证开始日期
   */
  bindIdCardSDateChangeBaby: function(e) {
    this.setData({
      baby_s_date: e.detail.value

    })
  },

  /**
   * 修改被保人身份证结束日期
   */
  bindIdCardODateChangeBaby: function(e) {
    this.setData({
      baby_o_date: e.detail.value
    })
  },
  /**
   * 修改被保人地区
   */
  bindRegionChangeBaby: function(e) {
    this.setData({
      baby_region: e.detail.value
    })
  },


  /**
   * 自定义获取baby_list
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
   *  拉取当前选择宝宝信息
   */
  getBabyInfo: function(index) {
    // console.log(index);

    let _this = this;
    // console.log(_this.data.baby_info[index]);
    // return false;
    _this.setData({
      baby_name: _this.data.baby_info[index].baby_name,
      index_c: _this.data.baby_info[index].baby_sex - 1,
    })
    //console.log(_this.data.baby_info)
  },


  /**
   * 表单提交
   */
  saveData: function(e) {

    let _this = this,
      values = e.detail.value
    //return false;
    // values.date = this.data.date;

    //省市区+详细地址合并
    values.user_address = _this.data.user_region + ',' + values.user_address;
    values.baby_address = _this.data.baby_region + ',' + values.baby_address
    delete values.baby_region;
    delete values.user_region;
    // 处理性别
    values.user_sex = (values.user_sex === 0) ? 1 : 2;
    values.baby_sex = (values.baby_sex === 0) ? 1 : 2;

    //处理投保人与被保人关系
    values.relationship_to_baby = values.relationship_to_baby + 1; //_this.data.relation_arrey[values.relationship_to_baby];
    values.relationship_to_user = values.relationship_to_user + 1; //_this.data.relation_arrey[values.relationship_to_user];

    //处理证件有效期
    values.user_id_card_begintime = _this.data.user_s_date;
    values.user_id_card_endtime = _this.data.user_o_date;
    values.baby_id_card_begintime = _this.data.baby_s_date;
    values.baby_id_card_endtime = _this.data.baby_o_date;

    //baby_id赋值
    values.baby_id = _this.data.baby_info[values.baby_id].baby_id;

    //user_token赋值到values
    values.user_token = App.getGlobalData('user_token');

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
    App._post_form('baby/addDefInsuranceInfo', values, function(result) {

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
    console.log(values);
    if (values.user_name === '') {
      this.data.error = '投保人姓名不能为空';
      return false;
    }
    if (values.user_age === '') {
      this.data.error = '投保人年龄不能为空';
      return false;
    }
    if (values.user_mobile.length < 1) {
      this.data.error = '投保人手机号不能为空';
      return false;
    }
    if (values.user_mobile.length !== 11) {
      this.data.error = '手机号长度有误';
      return false;
    }
    let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!reg.test(values.user_mobile)) {
      this.data.error = '手机号不符合要求';
      return false;
    }
    if (values.user_id_card === '') {
      this.data.error = '投保人身份证号不能为空';
      return false;
    }
    if (values.user_id_card.length < 18 || values.baby_id_card.length < 18) {
      this.data.error = '身份证号应为18位';
      return false;
    }
    if (values.user_s_date === '' || values.user_o_date === '') {
      this.data.error = '身份证有效期限不能为空';
      return false;
    }
    if (values.user_region === '' || values.baby_region === '') {
      this.data.error = '所在地区不能为空';
      return false;
    }
    if (values.baby_name === '') {
      this.data.error = '被保人姓名不能为空';
      return false;
    }
    if (values.baby_age === '') {
      this.data.error = '被保人年龄不能为空';
      return false;
    }
    if (values.baby_id_card === '') {
      this.data.error = '被保人身份证号不能为空';
      return false;
    }
    if (values.baby_address === '' || values.user_address === '') {
      this.data.error = '所在地区不能为空';
      return false;
    }
    if (values.user_name.length < 2 || values.baby_name.length < 2) {
      this.data.error = '请输入真实的姓名';
      return false;
    }
    if (values.user_id_card_begintime >= values.user_id_card_endtime || values.baby_id_card_begintime >= values.baby_id_card_endtime) {
      this.data.error = '证件有效期限有误';
      return false;
    }
    return true;
  },

})


