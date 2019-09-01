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
    start_time:"2019/9/16",//设定一学年的开始日期
    ot:[],//第1——2节数组
    tf:[],//第3-4节数组
    fs:[],//第5-6节数组
    se:[],//第7-8节数组
    ne:[],//第9-11节数组
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
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
    var that = this
    var date = new Date(); 
    var week = that.getweekString(date);//得到当前是第几学周
    that.setData({whichweek:week})
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
    const cl=["1-2","3-4","5-6","7-8","9-11"];
    const db = wx.cloud.database({ env: 'classroom-messege-78b0bb' });
    const position = db.collection(area);
    var that=this;
    var ot1=[];
    var tf1=[];
    var fs1=[];
    var se1=[];
    var ne1=[];
    var b=[];
    var room;
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
        console.log("OK")
        for(var i in res['data'][0]){
          room = res['data'][0][i]
          if (room.length == 5){
            for(let j = 0;j < 5;j++){
               var flag = false
               console.log(room[j]['flag'])
              if (room[j]['flag'] == true) {
                flag = true
              }
              else {
                for (let k = 0; k < room[j]['special'].length; k++) {
                  if (week == room[j]['special'][k]) {
                    flag = true
                  }
                }
              }
              if(flag){
                if(j==0){
                  ot1.push(i)
                }
                if(j==1){
                  tf1.push(i)
                }
                if(j==2){
                  fs1.push(i)
                }
                if(j==3){
                  se1.push(i)
                }
                if(j==4){
                  ne1.push(i)
                }
              }
            }
          }
        }
        that.setData({ot:ot1});
        that.setData({tf:tf1});
        that.setData({fs:fs1});
        that.setData({se:se1});
        that.setData({ne:ne1});
        that.setData({is_select:true})
      }
    });
    setTimeout(function () { that.setData({ is_select: true }) }, 2000);
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
    this.setData({whichweek:whichWeek-1});
  }
})
