// pages/index/index.js
// 引入数据库查询工具文件
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: [{
        start_time: '1921',
        affair: [{
            time: '19xx',
            name: 'xxx事件'
          },
          {
            time: '19xx',
            name: 'xxx事件'
          },
          {
            time: '19xx',
            name: 'xxx事件'
          },
          {
            time: '19xx',
            name: 'xxx事件'
          }
        ],
        name: '革命',
      },
      {
        start_time: '1949',
        affair: [{
            time: '19xx',
            name: 'xxx事件'
          },
          {
            time: '19xx',
            name: 'xxx事件'
          },
          {
            time: '19xx',
            name: 'xxx事件'
          },
          {
            time: '19xx',
            name: 'xxx事件'
          }
        ],
        name: '建设'
      },
      {
        start_time: '1978',
        affair: [{
            time: '19xx',
            name: 'xxx事件'
          },
          {
            time: '19xx',
            name: 'xxx事件'
          },
          {
            time: '19xx',
            name: 'xxx事件'
          },
          {
            time: '19xx',
            name: 'xxx事件'
          }
        ],
        name: '改革'
      },
      {
        start_time: '2012',
        affair: [{
            time: '20xx',
            name: 'xxx事件'
          },
          {
            time: '20xx',
            name: 'xxx事件'
          },
          {
            time: '20xx',
            name: 'xxx事件'
          },
          {
            time: '20xx',
            name: 'xxx事件'
          }
        ],
        name: '复兴',
        end_time: "至今"
      }
    ],
    // tabBar默认主页活跃
    active: 0,
    show: false,
    IsLogin: false
  },
  // tabBar切换
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({
      active: event.detail
    });
  },
  onClose() {
    this.setData({
      show: false
    });
  },
  toDetail_hero() {
    wx.navigateTo({
      url: '../toDetail/toDetail?currentSwiper=' + this.data.currentSwiper,
    })
  },
  toDetail_time() {
    // wx.navigateTo({
    //   url: '../toDetail/toDetail?currentSwiper=' + this.data.currentSwiper,
    // })
  },
  /**
   * 获取用户信息 
   */
  getUserProfile: function (e) {
    var that = this
    // 获取openid
    wx.cloud.callFunction({
      name: 'getOpenId'
    }).then(res => {
      console.log(res);
      app.globalData.openid = res.result.openid
    })
    // 进行登录
    wx.getUserProfile({
      desc: '进行登录',
      success(res) {
        app.globalData.globalIsLogin = true
        that.setData({
          userInfo: res.userInfo,
          IsLogin: true
        })
        // // 查询是否用户已经在表中了
        // wx.cloud.callFunction({
        //   name: 'getDB',
        //   data: {
        //     table: 'user',
        //     params: {
        //       open_id: app.globalData.openid
        //     }
        //   }
        // }).then(res => {
        //   console.log(res)
        //   // 如果用户不在数据库中 进行添加
        //   if (res.result.data == false) {
        //     wx.cloud.callFunction({
        //       name: 'addDB',
        //       data: {
        //         table: 'user',
        //         params: {
        //           open_id: app.globalData.openid
        //         }
        //       }
        //     }).then(res => {
        //       console.log(res);
        //     })
        //   }
        // })
        // // 登陆后进行查询收藏是否有数据
        // wx.cloud.callFunction({
        //   name: 'getDB',
        //   data: {
        //     table: 'collection',
        //     params: {
        //       open_id: app.globalData.openid
        //     }
        //   },
        // }).then(res => {

        //   // 查询到有数据后,通过获取meetingId进行会议信息查询
        //   wx.cloud.callFunction({
        //     name: 'getDB',
        //     data: {
        //       table: 'meeting',
        //       params: {
        //         meeting_data: res.result.data
        //       },
        //       query: true
        //     }
        //   }).then(res => {
        //     // console.log(res)
        //     // 拿到的查询数据是一个二维数组，先转为一维数组方便渲染
        //     let result = []
        //     for (let item of res.result) {
        //       result.push(item[0])
        //     }
        //     that.setData({
        //       HaveCollection: true,
        //       collection_course: result
        //     })
        //   })
        // })
      },
      fail(err) {
        console.log(err);
      }
    })
  },
  goQuestion(event) {
    wx.navigateTo({
      url: '../question/question',
    })
  },
})