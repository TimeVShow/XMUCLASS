const app=getApp();
Page({
  data: {
    study_year: ['2014级', '2015级', '2016级', '2017级'],
    xue_yuan:['信息科学与技术学院','电子科学技术学院'],
    index: 0,
    xueyuan:"",
    studyyear:"",
    time: '12:01',
    name_flag:false,
    xueyuan_flag:false,
    zhuanye_flag:false,
    study_flag:false,
    number_flag:false,
    disable:true,
    name:"",
    zhuanye:"",
    number:"",
    appid:''
  },
  bindPickerChange_year: function (e) {
    this.setData({study_flag:true});
    this.setData({
      studyyear: this.data.study_year[e.detail.value]
    });
    var flag = this.data.name_flag && this.data.number_flag && this.data.study_flag && this.data.zhuanye_flag && this.data.xueyuan_flag;
    flag = !flag;
    this.setData({ disable: flag });
  },
  bindPickerChange_xueyuan: function (e) {
    this.setData({xueyuan_flag:true});
    this.setData({
      xueyuan: this.data.xue_yuan[e.detail.value]
    });
    var flag = this.data.name_flag && this.data.number_flag && this.data.study_flag && this.data.zhuanye_flag && this.data.xueyuan_flag;
    flag = !flag;
    this.setData({ disable: flag });
  },
  nameinput:function(e)
  {
    if(e.detail.value.length>0)
    {
      this.setData({name_flag:true});      
    }
    else
    {
      this.setData({name_flag:false});      
    }
    var flag = this.data.name_flag && this.data.number_flag && this.data.study_flag && this.data.zhuanye_flag && this.data.xueyuan_flag;
    flag = !flag;
    this.setData({ disable: flag });
    this.setData({ name: e.detail.value });
  },
  zhuanyeinput:function(e)
  {
    if (e.detail.value.length > 0) {
      this.setData({ zhuanye_flag: true });
    }
    else {
      this.setData({zhuanye_flag: false });
    }
    var flag = this.data.name_flag && this.data.number_flag && this.data.study_flag && this.data.zhuanye_flag && this.data.xueyuan_flag;
    flag = !flag;
    this.setData({ disable: flag });
    this.setData({ zhuanye: e.detail.value });
  },
  numberinput:function(e)
  {
    if (e.detail.value.length > 0) {
      this.setData({number_flag: true });
    }
    else {
      this.setData({number_flag: false });
    }
    this.setData({number:e.detail.value});
    var flag = this.data.name_flag && this.data.number_flag && this.data.study_flag && this.data.zhuanye_flag && this.data.xueyuan_flag;
    flag=!flag;
    this.setData({disable:flag});
  },
  nextstep:function()
  {
    const db = wx.cloud.database({ env: 'classroom-messege-78b0bb' });
    const messege=db.collection('user');
    messege.doc(app.globalData.appid).update({
      data:
      {
        name: this.data.name,
        xueyuan: this.data.xueyuan,
        studyyear: this.data.studyyear,
        zhuanye: this.data.zhuanye,
        userInfo:app.globalData.userInfo
      },
      success(res)
      {
        console.log(res)
      }
    })
    wx.redirectTo({
      url: '../uploadpicture/uploadpicture',
    })
  },
});