// pages/classroom/classroom.js
const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    area:[{"id":0,"text":"海韵教学楼","position":"haiyunjiaoxuelou"},{"id":1,"text":"学生公寓","position":"xueshenggongyu"}],
    //这里添加下拉菜单的地区选择，格式如上
    time: ["第1-2节", "第3-4节", "第5-6节", "第7-8节", "第9-11节"],
    whichweek:0,
    is_select:false,
    start_time:"2019/2/16",//设定一学年的开始日期
    ot:[],//第1——2节数组
    tf:[],//第3-4节数组
    fs:[],//第5-6节数组
    se:[],//第7-8节数组
    ne:[],//第9-11节数组
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = new Date();
    var week = this.getweekString(date);
    this.getOpenid();
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
    var a=e.detail["id"];//得到选择位置的id
    var area=this.data.area[a]["position"];//得到选择位置的地区
    var day=this.today();//得到今天是星期几
    var date=new Date();  
    var week=this.getweekString(date);//得到当前是第几学周
    this.work(this.data.whichweek,area,day);
  },
  //得到当前是星期几
  today:function()
  {
    var a = (new Date()).toString();
    a = a[0] + a[1] + a[2];
    return a;
  },
  work:function(week,area,day)//主函数
  {
    const name=["ot","tf","fs","se","ne"];
    const cl=["1_2","3_4","5_6","7_8","9_11"];
    const db = wx.cloud.database({ env: 'classroom-messege-78b0bb' });
    const position = db.collection(area);
    var that=this;
    var b=[];
    that.setData({is_select:false});
    for(let i=0;i<5;i++)//进行初始化
    {
      that.setData(
        {
            [name[i]]:b          
        });      
    }
    //得到数据库数据
    db.collection(area).where({_id:day}).get({
      success(res)
      {
        var len=res.data[0]["1_2"].length;
        var i=0;
        var k=0;
        for(let k=0;k<len;k=k+1)
        {
          var b=[];
          var count=0;
          for(i=0;i<len;i=i+1)
          {
            var fl = res.data[0][cl[k]][i]["flag"];
            for (let j = 0; j < res.data[0][cl[k]][i]["special"].length;j=j+1)
            {
              if (week == res.data[0][cl[k]][i]["special"][j])
              {
                fl = !fl;
                break;
              }
            }
            if(fl)
            {
              b[count]=res.data[0][cl[k]][i]["room"];
              count = count + 1;
            }
          }
          if(count!=0)
          {
            console.log(b);
            that.setData({[name[k]]:b});
          }
        }
      }
    });
    setTimeout(function () { that.setData({ is_select: true }) }, 2000);
  },
  show_messege:function()
  {
    
  },
  getOpenid: function () {
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        app.globalData.appid = res.result.appId;
      }
    });
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
