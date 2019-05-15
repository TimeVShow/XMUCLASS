const app=getApp();
Page({
  data: {
    files: []
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  openConfirm: function () {
    wx.showModal({
      title: '警告',
      content: '返回上一页将会丢失本页的全部信息，是否继续',
      confirmText: "继续返回",
      cancelText: "放弃",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击主操作')
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });
  },
  rechoose:function()
  {
    var b=[];
    this.setData({files:b});
  },
  openSuccess:function()
  {
    const db = wx.cloud.database({ env: 'classroom-messege-78b0bb' });
    const messege = db.collection('user');
    console.log(app.globalData.appid);
    messege.doc(app.globalData.appid).update({
      data: {
        is_shenhe: true,
      },
      success(res)
      {
        console.log(res.data);
      }});
    wx.cloud.init({
      env:'classroom-messege-78b0bb'
    });
    var a=app.globalData.appid;
    for(let i=0;i<=1;i++)
    {
      var b="材料/"+a+"/"+String(i)+".png";
      wx.cloud.uploadFile({
        cloudPath: b,
        filePath:this.data.files[i],
        success:function(res)
        {
          console.log(res.fileID)
        },
        fail:function(e)
        {
          console.log(e);        
        }
      })
    }
    wx.navigateTo({
      url: 'msg_success'
    })
  }
});