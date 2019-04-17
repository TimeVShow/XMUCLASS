// pages/classroom/classroom.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    area:[{"id":0,"text":"海韵教学楼","position":"haiyunjiaoxuelou"},{"id":1,"text":"学生公寓","position":"xueshenggongyu"}],
    time: ["第1-2节", "第3-4节", "第5-6节", "第7-8节", "第9-11节"],
    whichweek:0,
    start_time:"2019/2/16"
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
  //得到下拉列表的返回值，并开始进行处理
  getDate: function (e) {
    var a=e.detail["id"];
    var area=this.data.area[a]["position"];
    var day=this.today();
    var date=new Date();
    this.getweekString(date);
    this.work(area,day);
  },
  //得到当前是星期几
  today:function()
  {
    var a = (new Date()).toString();
    a = a[0] + a[1] + a[2];
    return a;
  },
  work:function(area,day)
  {
    const cl=["1-2","3-4","5-6","7-8","9-11"];
    const db = wx.cloud.database({ env: 'classroom-messege-78b0bb' });
    const position = db.collection('haiyunjiaoxuelou');
    db.collection(area).where({_id:day}).get({
      success(res)
      {
        console.log(res.data[0]["1-2"][0]["flag"]);
      }
    });
  },
  show_messege:function()
  {
    
  },
  //得到当前的周次
  getweekString:function(date1)
  {
    var Date1=new Date(date1);
    var y=Date1.getFullYear();
    var Date2=new Date(this.data.start_time);
    var dayofWeek=Date2.getDay();
    dayofWeek=dayofWeek==0?7:dayofWeek;
    var num=(Date1-Date2)/1000/3600/24;
    var whichWeek=Math.ceil((num+dayofWeek)/7);
    this.setData({whichweek:whichWeek});
  }
})