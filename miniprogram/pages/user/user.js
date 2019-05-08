// pages/user/user.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    appid:"",
    userInfo:null,
    is_shenhe:"",
    is_user:"",
    flag:"",
    days:-1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getUserInfo({
      success:function(res)
      {
        that.data.userInfo=res.userInfo;
        that.setData({
          userInfo:that.data.userInfo
        })
      }
    });
    const db = wx.cloud.database({ env: 'classroom-messege-78b0bb' });
    const messege = db.collection('user');
    messege.doc(app.globalData.appid).get({
      success(res) {
        if (typeof (res.data.is_user) == 'undefined') {
          that.setData({ is_user: false });
          that.setData({ is_shenhe: false });
          messege.doc(app.globalData.appid).update({
            data: {
              is_user: that.data.is_user,
              is_shenhe: that.data.is_shenhe,
              count: 0,
              old: -1,
            },
            success(res) {
              console.log(ok);
            }
          })
        }
        else {
          that.setData({ is_user: res.data.is_user });
          that.setData({ is_shenhe: res.data.is_shenhe });
        }
      }
    });
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
    console.log(3);
    var that=this;
    const db = wx.cloud.database({ env: 'classroom-messege-78b0bb' });
    const messege = db.collection('user');
    messege.doc(app.globalData.appid).get({
      success(res) {
          that.setData({ is_user: res.data.is_user });
          that.setData({ is_shenhe: res.data.is_shenhe });
          console.log(that.data.is_shenhe);
      }
    });
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
  go:function()
  {
    wx.navigateTo({
      url: '../fillmessege/fillmessege',
    })
  },
  openAlert: function () {
    var that=this;
    var myDate=new Date();
    var now=myDate.getDay();
    var old=0;
    var count=0;
    const db = wx.cloud.database({ env: 'classroom-messege-78b0bb' });
    const messege = db.collection('user');
    messege.doc(app.globalData.appid).get({
      success(res) {
        old=res.data.old;
        count=res.data.count;
        console.log(old);
        if (old == -1) {
          old = now;
          count = 1;
        }
        else {
          if ((old + 1) % 7 == now) {
            count = count + 1;
            old = now;
          }
        }
        var a;

        if (that.data.is_user == false && that.data.is_shenhe == true) {
          a = '您的信息正在审核，审核完成后即可开始签到';
        }
        if (that.data.is_user == false && that.data.is_shenhe == false) {
          a = '您还未完善信息哦，完善信息审核通过后才可使用本功能哦';
        }
        if (that.data.is_user == true) {
          a = '签到成功,当前共连续签到' + String(count) + '天';
        }
        if(old==now)
        {
          a='您今天已经签过到了哦，请明天再来把'
        }
        messege.doc(app.globalData.appid).update({
          data:
          {
            old:old,
            count:count
          },
          success(res)
          {
              console.log(reas.data);
          }
        })
        console.log(a);
        wx.showModal({
          content: a,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        });
      }});
  }
})