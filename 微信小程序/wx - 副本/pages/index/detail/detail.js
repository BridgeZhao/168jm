// pages/index/detail/detail.js
Page({
  data:{
    tabArr: {  
      curHdIndex: 0,  
      curBdIndex: 0  
    }, 
     recommend:{
         pay:'0',
         img:'../../../image/lock.png',
         title:'价格：',
         money:'30',
        text:' 彩金，解锁后可查看智能推荐结果。仅供参考，据此投注，风险自负。'
      }, 

    id:'',
   
   
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
        var that = this;
        var id = options.id;
        var data = {id:id};
            wx.request({
              url: 'https://api.km28.com/api/wx/promotion_detail.php?mid='+id,
              data: {
              },
              header: {
                  'content-type': 'application/json'
              },
              success: function(res) {
                var all = res.data;
                 all.name1 = "胜平负";
                 all.name2 = "让球" ;
                 all.rd1 ="0";
                //  all.score= "0:0(0:0)" 
                console.log(all)
                //  console.log(arr[0])
                // for (var i in arr){
                //      console.log(arr[i]) 
                //   }
                // console.log(arr)
                  that.setData({
                    topdata : all,  
                  })
              } 
            });
  },

  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  recommend :function(event){
//     const wechatData = payRes.data.payment;//wechatData就是上面的验证信息
//    console.log(wechatData);
//   wx.requestPayment({
//     'appId' : wechatData.appId,
//     'timeStamp': wechatData.timeStamp,
//     'nonceStr': wechatData.nonceStr,
//     'package': wechatData.package,
//     'signType': 'MD5',
//     'paySign': wechatData.paySign,
//   'success':function(res){
//     console.log(res);
//     console.log('success');
//   },
//   'fail':function(res){
//     console.log(res);
//     console.log('fail');
//   },
//   'complete': function(res){
//     console.log(res);console.log('complete');
//   }
// });
// console.log(2);
 var total = event.currentTarget.dataset.item;
    var that = this;
    that.setData({ selected: total });

    //向服务端发起支付请求，获取wx.requestPayment需要的信息
    wx.request({
      loading: true,
      url: 'http://m.km28.com/api/wx/promotion_detail.php',
      data: {
        total: total * 100 //元转为分
      },
      success: function (res) {
        console.log("获取支付密匙", res);

        //发起支付，根据服务端的返回填空
        wx.requestPayment({
          timeStamp: '' + res.data.signature.timestamp,
          nonceStr: res.data.signature.nonce,
          package: res.data.signature.pack,
          signType: 'MD5',
          paySign: res.data.signature.signature,
          success: function (res) {
            app.data.rankLoaded = false;//通知排行榜重新加载
            wx.showToast({
              title: '支付成功,感谢',
              icon: 'success'
            });
          },
          fail: function (res) {
            wx.showToast({
              title: '已取消支付',
              icon: 'success'
            });
          },
          complete: function () {
            that.setData({ selected: 0 });//取消选中
          }
        });

      },
      fail: function (res) {
        //do anything
      }
    });


    console.log(event)
    var that = this;
    var _obj = {};
    var _obj = that.data.recommend;
    _obj.pay = "1" 
    that.setData({
      recommend:_obj,
    });
    //  console.log(_obj)
  },
   tabFun: function(e){  
    //获取触发事件组件的dataset属性
    var _datasetId=e.target.dataset.id;  
    console.log("----"+_datasetId+"----"); 
    if(_datasetId != undefined ){
    var _obj={};  
    _obj.curHdIndex=_datasetId;  
    _obj.curBdIndex=_datasetId;  
    // console.log(_obj)
    this.setData({  
      tabArr: _obj  
    });
    }   
  }, 
     
})
//参考
//  Page({
//   data: {
//     text: 'init data',
//     array: [{text: 'init data'}],
//     object: {
//       text: 'init data'
//     }
//   },
//   changeText: function() {
//     // this.data.text = 'changed data'  // bad, it can not work
//     this.setData({
//       text: 'changed data'
//     })
//   },
//   changeItemInArray: function() {
//     // you can use this way to modify a danamic data path
//     this.setData({
//       'array[0].text':'changed data'
//     })
//   },
//   changeItemInObject: function(){
//     this.setData({
//       'object.text': 'changed data'
//     });
//   },
//   addNewField: function() {
//     this.setData({
//       'newField.text': 'new data'
//     })
//   }
// })

 // topdata:[
    //   {
    //    name:'英超',
    //    week:'周二',
    //    number:'006',
    //    day:'2016-12-20',
    //    time:'04:00',
    //    teamA:'埃弗顿',
    //    stateA:'vs',
    //    teamB:'利物浦',
    //    JANumber1:'4.00',
    //    JANumber2:'3.40',
    //    JANumber3:'2.10',
    //    JBNumber1:'1.85',
    //    JBNumber2:'3.55',
    //    JBNumber3:'1.90',
    //   }
    // ] ,
    // recommend:[
    //   {
    //     img:'../../../image/lock.png',
    //     title:'价格：',
    //     money:'30',
    //     text:' 彩金，解锁后可查看智能推荐结果。仅供参考，据此投注，风险自负。',
    //     Pay:'1',
    //     teamA:'埃弗顿',
    //     score:'0:1(0:0)',
    //     teamB:'利物浦',
    //     name1:'胜平负',
    //     sNumber1:'0',
    //     sNumber2:'1.91',
    //     sNumber3:'2.750',
    //     sNumber4:'1.95',
    //     name2:'让球',
    //     rNumber1:'-1',
    //     rNumber2:'1.91',
    //     rNumber3:'2.75',
    //     rNumber4:'1.95',
    //   }
    //   ],
    //   analysis:[
    //     {
    //      teamA:'埃弗顿',
    //      teamB:'利物浦',
    //      width: '65%',
    //      width1:'35%',
    //      teamAoutcome:'胜',
    //      teamBoutcome:'不败',
    //      teamAtext1:'埃弗顿近6此对阵利物浦1胜4平1负，不败率高达83%；',
    //      teamAtext2:'埃弗顿近6此对阵利物浦1胜4平1负，不败率高达83%；',
    //      teamAtext3:'埃弗顿近6此对阵利物浦1胜4平1负，不败率高达83%；',
    //      teamAtext4:'埃弗顿近6此对阵利物浦1胜4平1负，不败率高达83%；',
    //      teamAtext5:'埃弗顿近6此对阵利物浦1胜4平1负，不败率高达83%；',
    //      teamBtext1:'埃弗顿近6此对阵利物浦1胜4平1负，不败率高达83%；',
    //      teamBtext2:'埃弗顿近6此对阵利物浦1胜4平1负，不败率高达83%；',
    //      teamBtext3:'埃弗顿近6此对阵利物浦1胜4平1负，不败率高达83%；',
    //      teamBtext4:'埃弗顿近6此对阵利物浦1胜4平1负，不败率高达83%；',
    //      teamBtext5:'埃弗顿近6此对阵利物浦1胜4平1负，不败率高达83%；',
    //      teamAtext:[{

    //      }]
    //   }
    //   ],
    //   trend:[
    //     {
    //      teamA:'埃弗顿',
    //      teamAoutcome1:'胜',
    //      teamAoutcome2:'负',
    //      teamAoutcome3:'胜',
    //      teamAoutcome4:'负',
    //      teamAoutcome5:'胜',
    //      teamAoutcome6:'胜',
    //      teamAoutcome7:'胜',
    //      teamAoutcome8:'胜',
    //      teamAoutcome9:'胜',
    //      teamAoutcome10:'胜',
    //      teamB:'利物浦',
    //      teamBoutcome1:'胜',
    //      teamBoutcome2:'负',
    //      teamBoutcome3:'胜',
    //      teamBoutcome4:'负',
    //      teamBoutcome5:'胜',
    //      teamBoutcome6:'胜',
    //      teamBoutcome7:'胜',
    //      teamBoutcome8:'胜',
    //      teamBoutcome9:'胜',
    //      teamBoutcome10:'胜',
    //     }
    //   ],
    //   odds:[
    //     {
    //       name1:'亚盘',
    //       name2:'欧赔',
    //       name3:'大小球',
    //       Percentagehome:'46%',
    //       Percentagevisiting:'54%',
    //       pankou:'平/半',
    //       oddsHome:'0.98',
    //       oddsvisiting:'0.85'
    //     }
    //   ],
    //   ranking:[
    //     {
    //       name1:'英超',
    //       ranking1:'9',
    //       teamA:'埃弗顿',
    //       name2:'英超',
    //       rangking2:'3',
    //       teamB:'利物浦'
    //   }
    //   ]