let App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baby_id: '',
    hidden: true,
    vaccine_list: [],
    vaccine_name: [],
    index: '',
    ym_id: '',
    already_name: '', //已经接种过的疫苗
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      baby_id: options.baby_id
    })
    this.getBabyInfo(options.baby_id),
      this.getVaccineAlready(options.baby_id),
      this.getCanInjectVaccine(options.baby_id)
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
      //console.log(result)
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
   * 获取可注射疫苗
   */
  getCanInjectVaccine: function (baby_id) {
    let _this = this;

    // console.log(baby_id);
    // return false;
    App._get('baby/getCanInjectVaccine', {
      user_token: App.getGlobalData('user_token'),
      baby_id
    }, function (result) {


      _this.setData({
        vaccine_list: result.data
      })

      _this.setData({
        vaccine_name: _this.getVaccineName(result.data)
      })
      // console.log(_this.data.vaccine_list)
    });

  },

  /**
   * 自定义疫苗名称
   */
  getVaccineName: function (arr) {


    let result = [];

    arr.forEach(item => {

      Object.keys(item).forEach(k => {
        if (k === 'ym_name') {
          result.push(item[k]);
        }

      });
    })

    return result;

  },

  /**
   * 获取已经接种过的疫苗
   */
  getVaccineAlready: function (baby_id) {
    let _this = this;

    // console.log(baby_id);
    // return false;
    App._post_form('baby/vaccineinjectlist', {
      user_token: App.getGlobalData('user_token'),
      baby_id
    }, function (result) {
      // console.log(result)
      _this.setData({
        already_list: result.data
      })
      _this.setData({
        already_name: _this.getVaccineName(result.data)
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
    let _this = this;
    //console.log(e)
    _this.setData({
      index: e.detail.value,
      ym_id: _this.data.vaccine_list[e.detail.value].ym_id
    })
    console.log(_this.data.ym_id)
  },

  /**
   * modal点击确定事件
   */
  addinjectVaccine: function () {
    let _this = this
    wx.showModal({
      title: '提示',
      content: '一旦提交不可删除和修改',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if (result.confirm) {
          App._post_form('baby/addinjectvaccine', {
            user_token: App.getGlobalData('user_token'),
            baby_id: _this.data.baby_id,
            vaccine_id: _this.data.ym_id
          }, function (result) {
            if (result.code === 200) {
              wx.showToast({
                title: '添加成功',
                icon: 'success',
                duration: 1500,
                mask: false,
              });
              wx.redirectTo({
                url: 'index?baby_id=' + _this.data.baby_id,
              });

              _this.setData({
                hidden: true
              })

            }
          });
        } else if (res.cancel) {
          _this.setData({
            hidden: true
          })
        }
      },
    });


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