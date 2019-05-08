// pages/talk/talk.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  create_new_article:function()
  {
    var that=this;
    const db = wx.cloud.database({ env: 'classroom-messege-78b0bb' });
    const messege = db.collection('user');
    messege.doc(app.globalData.appid).get({
      success(res) {
        that.set({
          flag:res.is_user
        })
    }
    });
  },
  openAlert: function () {
      wx.showModal({
        content: '请完善用户信息后再来发帖',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
    }
})