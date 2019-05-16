// pages/talk/talk.js
var sliderWidth=96;
const app=getApp();
Page({
  data: {
    article:[],
    is_user:false,
    is_shenhe:false,
    tabs: ["寻物", "失物招领", "招募队友","杂项"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    time:[]
  },
  onPullDownRefresh:function()
  {
    var that = this;
    const db = wx.cloud.database({ env: 'classroom-messege-78b0bb' });
    const messege = db.collection('article');
    var a = [];
    var time;
    var mydate = new Date();
    console.log(mydate);
    var m=that.data.activeIndex;
    messege.limit(20).where({ tag: String(m) }).orderBy("time", "desc").get({
      success(res) {
        console.log(res);
        for (let i = 0; i < res.data.length; i = i + 1) {
          var userinfo = res.data[i]['userInfo'];
          var content = res.data[i]['content'];
          var mongth = res.data[i]['mongth'];
          var date = res.data[i]['date'];
          var hour = res.data[i]['hour'];
          var minutes = res.data[i]['minutes'];
          if (mongth != mydate.getMonth() || date != mydate.getDate()) {
            if (mongth < 10)
              mongth = "0" + mongth;
            if (date < 10)
              data = "0" + date;
            time = mongth + "/" + date;
          }
          else {
            if (hour < 10)
              hour = "0" + hour;
            if (minutes < 10)
              minutes = "0" + minutes;
            time = "今天" + hour + ":" + minutes;
          }
          a[i] = { 'user': userinfo, 'content': content, 'time': time };
          console.log(a);
        }
        that.setData({
          article: a
        });
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    const db = wx.cloud.database({ env: 'classroom-messege-78b0bb' });
    const messege = db.collection('article');
    var a = [];
    var time;
    var mydate=new Date();
    console.log(mydate);
    messege.limit(20).where({ tag:"0" }).orderBy("time", "desc").get({
      success(res) {
        console.log(res);
        for (let i = 0; i < res.data.length; i = i + 1) {
          var userinfo = res.data[i]['userInfo'];
          var content = res.data[i]['content'];
          var mongth=res.data[i]['mongth'];
          var date=res.data[i]['date'];
          var hour=res.data[i]['hour'];
          var minutes=res.data[i]['minutes'];
          if(mongth!=mydate.getMonth()||date!=mydate.getDate())
          {
            if(mongth<10)
            mongth="0"+mongth;
            if(date<10)
            data="0"+date;
            time=mongth+"/"+date;
          }
          else
          {
            if(hour<10)
            hour="0"+hour;
            if(minutes<10)
            minutes="0"+minutes;
            time="今天"+hour+":"+minutes;
          }
          a[i] = { 'user': userinfo, 'content': content,'time':time};
          console.log(a);
        }
        that.setData({
          article: a
        });
      }
    });
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      var that = this;
    that.setData({ is_shenhe: app.globalData.is_shenhe });
    that.setData({ is_user: app.globalData.is_user });
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
  },
  tabClick: function (e) {
    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
      duration: 1500
    });
   var that=this;
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    const db = wx.cloud.database({ env: 'classroom-messege-78b0bb' });
    const messege = db.collection('article');
    var a = [];
    var time;
    var mydate = new Date();
    console.log(mydate);
    messege.limit(20).where({ tag: e.currentTarget.id }).orderBy("time", "desc").get({
      success(res) {
        console.log(res);
        for (let i = 0; i < res.data.length; i = i + 1) {
          var userinfo = res.data[i]['userInfo'];
          var content = res.data[i]['content'];
          var mongth = res.data[i]['mongth'];
          var date = res.data[i]['date'];
          var hour = res.data[i]['hour'];
          var minutes = res.data[i]['minutes'];
          if (mongth != mydate.getMonth() || date != mydate.getDate()) {
            if (mongth < 10)
              mongth = "0" + mongth;
            if (date < 10)
              data = "0" + date;
            time = mongth + "/" + date;
          }
          else {
            if (hour < 10)
              hour = "0" + hour;
            if (minutes < 10)
              minutes = "0" + minutes;
            time = "今天" + hour + ":" + minutes;
          }
          a[i] = { 'user': userinfo, 'content': content, 'time': time };
          console.log(a);
        }
        that.setData({
          article: a
        });
      }
    });
  }
})