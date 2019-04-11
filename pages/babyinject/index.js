let App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: true,
    vaccine_arr: ['疫苗1', '疫苗2', '疫苗3', '疫苗4'],
    index: '',
    already:'',//已经接种过的疫苗
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBabyInfo(options.baby_id),
    this.getVaccineAlready(options.baby_id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 获取要修改的宝宝信息
   */
  getBabyInfo: function (baby_id) {
    let _this = this;

    // console.log(baby_id);
    // return false;
    App._get('baby/getbabyinfo', {
      user_token: App.getGlobalData('user_token'),
      baby_id
    }, function (result) {
      console.log(result)
      _this.setData({
        id_card: result.data.id_card,
        baby_name: result.data.baby_name,
        baby_sex: result.data.baby_sex == 1 ? "男" : "女",
        id_card: result.data.id_card,
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
   * 获取已经接种过的疫苗
   */
  getVaccineAlready : function (baby_id) {
    let _this = this;

    // console.log(baby_id);
    // return false;
    App._post_form('baby/vaccineinjectlist', {
      user_token: App.getGlobalData('user_token'),
      baby_id
    }, function (result) {
      console.log(result)
      _this.setData({
        //already:result.data.ym_name
      })
    });

  },

  /**
   * 按钮弹出modal事件
   */
  popupModal: function () {
    this.setData({
      hidden: false
    })
  },
  /**
   * 选择疫苗
   */

  selectVaccine: function (e) {
    this.setData({
      index: e.detail.value
    })
  },

  /**
   * modal 点击取消事件
   */
  cancelChoose: function () {
    this.setData({
      hidden: true
    })
  },

})