// pages/about/about.js
var app = getApp()  
Page( {  
data: {  
   list: [
      {
        id: 'zn',
        name: '智能驱动',
        text:'基于智能独家大数据渠道分析，提供竞彩足球预测',
        image:'zn.png',
        open: false,
        pages: ['view', 'scroll-view', 'swiper']
      }, {
        id: 'hl',
        name: '海量数据',
        text:'涵盖欧洲五大联赛和竞彩赛事数据，40000+比赛数据验证',
        image:'hl.png',
        open: false,
        pages: ['text', 'icon', 'progress']
      }, {
        id: 'zk',
        name: '主客分析',
        image:'zk.png',
        text:'主客队历史战绩、排名、胜率、走势全面覆盖',
        open: false,
        pages: ['button', 'checkbox', 'form', 'input', 'label', 'picker', 'radio', 'slider', 'switch', 'textarea']
      }, {
        id: 'pl',
        name: '赔率倾向',
        image:'pl.png',
        text:'欧赔、亚盘赔率比较，大小球玩法及用户投注倾向数据',
        open: false,
        pages: ['navigator']
      }, {
        id: 'dj',
        name: '独家算法',
        text:'复杂时间序列分析和机器学习模型，自动学习并预测结果',
        image:'dj.png',
        open: false,
        pages: ['image', 'audio', 'video']
      }, {
        id: 'zd',
        name: '自动分析',
        text:'超大规模计算能力，整合数据特征，根据预测目标自动分析挖掘',
        image:'zd.png',
        pages: ['map']
      }
    ],
  
  /** 
      * 页面配置 
      */  
  winWidth: 0,  
  winHeight: 0,  
  // tab切换  
  currentTab: 0,  
},
//list 遍历 strat 
 kindToggle: function (e) {
    var id = e.currentTarget.id, list = this.data.list;
    for (var i = 0, len = list.length; i < len; ++i) {
      if (list[i].id == id) {
        list[i].open = !list[i].open
      } else {
        list[i].open = false
      }
    }
    this.setData({
      list: list
    });
  },
//list 遍历 end 
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
    }) ;
},  
/** 
   * 滑动切换tab 
   */  
bindChange: function( e ) {  

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
}  
})  
