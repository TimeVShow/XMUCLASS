const app=getApp();
Page({
  data: {
    files: [],
    content:"",
    userInfo:"",
    count:0,
  },
  onLoad:function()
  {
    var that=this;
    wx.getUserInfo({
      success: function (res) {
        that.data.userInfo = res.userInfo;
        that.setData({
          userInfo: that.data.userInfo
        })
      }
    });
  },
  openToast: function () {
    var that=this;
    var mydate=new Date();
    console.log(that.data.content);
    const db = wx.cloud.database({ env: 'classroom-messege-78b0bb' });
    const messege = db.collection('article');
    console.log(that.data.content);
    messege.add({
      data: {
        authorid: app.globalData.appid,
        content: that.data.content,
        time: mydate.getTime(),
        userInfo:that.data.userInfo
      }
    });
    wx.showToast({
      title: '成功',
      icon: 'success',
      duration: 1000
    });
    setTimeout(function()
    {
      wx.switchTab({
      url:'../talk/talk'
      })
    },
    1000
    );
  },
  bindinput:function(e){
    var that=this;
    var old="";
    that.setData({
      count:e.detail.value.length,
      content:e.detail.value
    })
    console.log(typeof(e.detail.value));
    old=e.detail.value;
    console.log(that.data.content);
  }
});