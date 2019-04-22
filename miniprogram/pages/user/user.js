// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    caniuse:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var flag = false;
    wx.getStorage({

      key: 'caniuse',

      success: function (res) {

        // 异步接口在success回调才能拿到返回值
        console.log(flag);
        flag = res.data;
        console.log(flag);
      },
      fail: function () {
        console.log('读取key1发生错误')
      }
    })
    this.setData({caniuse:flag});
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
  openConfirm:function()
  {
    let that=this;
    wx.showModal({
      title: '获取授权',
      content: '是否同意小程序获取你的信息',
      confirmText: "同意",
      cancelText: "拒绝",
      success: function (res) {
        if (res.confirm) {
          that.setData({caniuse:true});
          try {

            // 同步接口立即写入

            wx.setStorageSync('caniuse', that.data.caniuse);

            console.log('写入caniuse成功');

          } catch (e) {

            console.log('写入value2发生错误');

          };
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });
  }

})