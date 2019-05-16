const app=getApp();
Page({
  data: {
    array: ['寻物', '失物招领', '招募队友', '其他'],
    content:"",
    userInfo:"",
    count:0,
    area:"选择标签",
    tag:-1,
    can_commit:true
  },
  onLoad:function()
  {
    console.log(this.data.content.length);
    var that=this;
    that.setData({userInfo:app.globalData.userInfo});
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
        userInfo:that.data.userInfo,
        tag:that.data.tag,
        mongth:mydate.getMonth(),
        date:mydate.getDate(),
        hour:mydate.getHours(),
        minutes:mydate.getMinutes()
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
    if (this.data.tag != -1 && this.data.content.length > 0) {
      this.setData({
        can_commit: false
      });
    }
    if(this.data.content.length==0)
    {
      this.setData({
        can_commit: true
      });
    }
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    var a=['寻物', '失物招领', '招募队友', '其他'];
    this.setData({
      area:a[e.detail.value]
    });
    this.setData({
      tag:e.detail.value
    });
    if (this.data.tag != -1 && this.data.content.length > 0) {
      this.setData({
        can_commit: false
      });
    }
    if (this.data.content.length == 0) {
      this.setData({
        can_commit: true
      });
    }
  }
});