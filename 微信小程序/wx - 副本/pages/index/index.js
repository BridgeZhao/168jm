//index.js
//获取应用实例  
var app = getApp()  
Page( {  
data: {
  hidden:true,
  //首页推荐
  list:[
    {
      // id:'',
      // week:'周三',
      // Number:'004',
      // name:'西甲',
      // day:'昨天',
      // time:'18:45',
      // state:'已完场',
      // teamA:'马德里竞技',
      // stateA:'3:0',
      // teamB:'毕尔巴鄂竞技',
      // text:'这里是一行推广展示！！！',
      // image:'hit.png',
      // JANumber1:'4.00',
      // JANumber2:'3.40',
      // JANumber3:'2.10',
      // JBNumber1:'1.85',
      // JBNumber2:'3.55',
      // JBNumber3:'1.90',
  }
  ],
  //热门推荐
  hotlist:[{

  }],
 //其他赛事
  otherlist:[{}],
  /** 
      * 页面配置 
      */  
  winWidth: 0,  
  winHeight: 0,  
  // tab切换  
  currentTab: 0,  
},  
onLoad: function() {  
  var that = this;  

  /** 
   * 获取系统信息 
   */  
  wx.getSystemInfo( {  

    success: function( res ) {  
      that.setData( {  
        winWidth: res.windowWidth,  
        winHeight: res.windowHeight  
      });  
    } 
  }); 
   app.getUserInfo(function(userInfo){
      that.setData({
        userInfo:userInfo
      })
    }) 
//加载数据START
 wx.request({
  url: 'https://api.km28.com/api/wx/suggest_promotions.php?t=1&n=10&p=1',//t=1 加载热门推荐
  data: {

  },
  header: {
      'content-type': 'application/json'
  },
  method:"POST",
  success: function(res) {
     var arr = res.data
    //  console.log(arr)
     that.setData({
         list:arr
       })
  }  
});
wx.request({
  url: 'https://api.km28.com/api/wx/suggest_promotions.php?t=2&n=10&p=1',//t=2 加载人气推荐
  data: {

  },
  header: {
      'content-type': 'application/json'
  },
  method:"POST",
  success: function(res) {
     var arr = res.data
    //  console.log(arr)
     that.setData({
         list1:arr
       })
  }  
});
 
//加载数据END
}, 
/** 
   * 滑动切换tab 
   */  
bindChange: function( e ) { 
  // console.log(e)
  var that = this;  
  that.setData( { currentTab: e.detail.current });  

},  
/** 
 * 点击tab切换 
 */  
swichNav: function( e ) {  


  var that = this;  
  if( this.data.currentTab === e.target.dataset.current ) {  
    return false;  
  } else {  
    that.setData( {  
      currentTab: e.target.dataset.current  
    })  
  }  
},
//列表页跳转详情页
 onPostTap: function (event) {
    var postId = event.currentTarget.dataset.postid;
    // console.log("on post id is" + postId);
    wx.navigateTo({
      url: "detail/detail?id=" + postId
    })
  },
//监听用户下拉动作
// onPullDownRefresh: function() {
//     // Do something when pull down.
//      console.log('刷新');
//        this.setData({
//         hidden:false
//       });
//      var that = this;
//      //热门推荐
//      var n = that.data.list.n;
//      var p = Number(that.data.list.p) + 1;
//      var t = that.data.list.t;
//     //  console.log(n , p ,t)
//      wx.request({
//       url: 'https://api.km28.com/api/wx/suggest_promotions.php?n='+n+'&p='+p+'&t='+t,
//       data: {
//       },
//       header: {
//           'content-type': 'application/json'
//       },
//        method:"POST",
//       success: function(res) {
//         var arr = res.data
//         var _obj = {};
//         _obj.p = arr.p;
//         _obj.n = arr.n;
//         _obj.t = arr.t;
//         _obj.data = larr.data
//         // console.log(_obj)
//         that.setData({
//             list:_obj
//           })
          
//         that.setData({
//             hidden:true
//          });
//       } 
//     });
//     //人气推荐
//     var n = that.data.list1.n;
//      var p = Number(that.data.list1.p) + 1;
//      var t = that.data.list1.t;
//     //  console.log(n , p ,t)
//      wx.request({
//       url: 'https://api.km28.com/api/wx/suggest_promotions.php?n='+n1+'&p='+p1+'&t='+t1,
//       data: {
//       },
//       header: {
//           'content-type': 'application/json'
//       },
//        method:"POST",
//       success: function(res) {
//         var arr = res.data
//         var _obj = {};
//         _obj.p = arr.p;
//         _obj.n = arr.n;
//         _obj.t = arr.t;
//         _obj.data = larr.data
//         // console.log(_obj)
//         that.setData({
//             list1:_obj
//           })
          
//         that.setData({
//             hidden:true
//          });
//       } 
//     });

//  },
 //页面上拉触底事件的处理函数
 onReachBottom: function(e) {
    //  console.log(e)
    // Do something when page reach bottom.
     console.log('circle 下一页');
     this.setData({
        hidden:false
      });
     var that = this;
     //热门推荐
     var n = that.data.list.n;//n 条数
     var p = Number(that.data.list.p) + 1;//p 页数
     var t = that.data.list.t;//热门与非热门
     wx.request({
      url: 'https://api.km28.com/api/wx/suggest_promotions.php?n='+n+'&p='+p+'&t='+t,
      data: {
      },
      header: {
          'content-type': 'application/json'
      },
       method:"POST",
      success: function(res) {
        var arr = res.data
        var _obj = {};
        _obj.p = arr.p;
        _obj.n = arr.n;
        _obj.t = arr.t;
        // console.log(_obj)
         var list = that.data.list.data;//原有数据
            for(var i = 0; i < arr.data.length; i++){//遍历新传数据
                list.push(arr.data[i]);
            }
        _obj.data = list
        that.setData({
            list:_obj
          });
          
        that.setData({
            hidden:true
         });
      }
      
    });
    //人气推荐
     var n1 = that.data.list1.n;//n 条数
     var p1 = Number(that.data.list1.p) + 1;//p 页数
     var t1 = that.data.list1.t;//热门与非热门
     wx.request({
      url: 'https://api.km28.com/api/wx/suggest_promotions.php?n='+n1+'&p='+p1+'&t='+t1,
      data: {
      },
      header: {
          'content-type': 'application/json'
      },
       method:"POST",
      success: function(res) {
        var arr = res.data
        var _obj = {};
        _obj.p = arr.p;
        _obj.n = arr.n;
        _obj.t = arr.t;
        // console.log(_obj)
         var list = that.data.list1.data;//原有数据
            for(var i = 0; i < arr.data.length; i++){//遍历新传数据
                list.push(arr.data[i]);
            }
        _obj.data = list
        that.setData({
            list1:_obj
          });
          
        that.setData({
            hidden:true
         });
      }
      
    });

 }
}) 
