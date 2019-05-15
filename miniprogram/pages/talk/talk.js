// pages/talk/talk.js
const app=getApp();
Page({
  data: {
    article:[],
    is_user:false,
    is_shenhe:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    const db = wx.cloud.database({ env: 'classroom-messege-78b0bb' });
    const messege = db.collection('user');
    messege.doc(app.globalData.appid).get({
      success(res) {
        that.setData({is_shenhe:res.data.is_shenhe});
        that.setData({ is_user: res.data.is_user});
        app.globalData.is_shenhe=res.data.is_shenhe;
        app.globalData.is_user=res.data.is_user;
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
    var that=this;
    that.setData({is_shenhe:app.globalData.is_shenhe});
    that.setData({ is_user: app.globalData.is_user });
    const db = wx.cloud.database({ env: 'classroom-messege-78b0bb' });
    const messege = db.collection('article');
    var a=[];
    messege.limit(20).orderBy("time","desc").get({
      success(res)
      {
        console.log(res.data);
        for(let i=0;i<res.data.length;i=i+1)
        {
          var userinfo=res.data[i]['userInfo'];
          var content=res.data[i]['content'];
          a[i]={'user':userinfo,'content':content};
        }
        that.setData({
          article:a
        })
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
  openAlert: function () {
    var that=this;
    if(that.data.is_user==false)
    {
      var a;
      if(that.data.is_shenhe==true)
        a="您的信息正在审核，请稍微忍耐一段时间QAQ";
      else
        a="请前往个人信息页面完善用户信息后再来发帖哦^_^";
      wx.showModal({
        content: a,
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
    }
    else
    {
      console.log(3);
      wx.navigateTo({
        url: '../write/write',
      })
    }
  }
})