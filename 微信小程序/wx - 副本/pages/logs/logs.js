//logs.js
// var util = require('../../utils/util.js')
// Page({
//   data: {
//     logs: []
//   },
//   onLoad: function () {
//     this.setData({
//       logs: (wx.getStorageSync('logs') || []).map(function (log) {
//         return util.formatTime(new Date(log))
//       })
//     })
//   }
// })
Page({
  data:{
    list:[
    {
      id:'',
      week:'周三',
      Number:'004',
      name:'西甲',
      day:'昨天',
      time:'18:45',
      state:'已完场',
      teamA:'马德里竞技',
      stateA:'3:0',
      teamB:'毕尔巴鄂竞技',
      text:'这里是一行推广展示！！！',
      image:'hit.png',
      JANumber1:'4.00',
      JANumber2:'3.40',
      JANumber3:'2.10',
      JBNumber1:'1.85',
      JBNumber2:'3.55',
      JBNumber3:'1.90',
  }
  ],
  }
})