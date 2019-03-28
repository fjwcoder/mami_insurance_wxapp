let App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    relation_arrey: ['父子', '父女', '母子', '母女'],
    region:'',  
    
    gender_arrey: ['男', '女'],
    baby_list: ["diyige", 'dierge'],
    
    index_b: 0, //投保人性别
    index_c: 0, //宝宝性别
    index_d: 0, //选择宝宝
   
    baby_info: [], //储存拉取的数据
    baby_index: 0
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
  // onShow: function() {


  // },
  /**
   * 获取投保人信息
   */
  getUserDetail: function(){

  },

  /**
   * 获取宝宝列表
   */
  getBabyList: function () {
    let _this = this;

    App._get('baby/getbabylist', { user_token: App.getGlobalData('user_token') }, function (result) {
      console.log(result);
      _this.setData({
        baby_info: Object.values(result.data)
      });

      _this.setData({
        baby_list: _this.getBabyName(_this.data.baby_info)
      })
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
    console.log(this.data.index_a)
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
    console.log(e);
    this.setData({
      index_d: e.detail.value
    })
console.log(this.data.index_d)
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
   * 修改地区
   */
  bindRegionChange: function (e) {
    this.setData({
      region: e.detail.value
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
})