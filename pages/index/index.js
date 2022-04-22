// pages/index/index.js
// 引入数据库查询工具文件
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // swiper图片展示
    swiperList: [{
        img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg',
        time: '1921'
      },
      {
        img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
        time: '1949'
      },
      {
        img: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg',
        time: '2021'
      },
    ],
    textInfoIndex:0,
    img_index: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    // tabBar默认主页活跃
    active: 0,
    // swiper默认当前序号
    currentSwiper: 0,
    show: false,
    IsLogin: false
  },
  switchSwiper(e) {
    let swiperIndex = e.detail.current//获取图片swiper的轮播内容的index
    this.setData({
      textInfoIndex: swiperIndex //将图片swiper的index跟文字swiper的current属性关联起来
    })
  },
  // swiper切换
  /*
  在bindchange的事件回调函数中改变currentIndex的值（当前所在滑块的索引），
  会导致setData被不停的调用，
  所以在改变currentIndex的值之前检测source是否是由于用户触摸引起的
  */

  swiperChange(event) {
    // console.log(event.detail.current);
    // console.log(event.detail.source);
    if (event.detail.source == 'autoplay' || event.detail.source == 'touch') {
      this.setData({
        currentSwiper: event.detail.current
      })
    }
  },
  // 防止出现轮播图卡死现象最好使用bindanimationfinish方法切换当前下标的图片
  animationChange(event) {
    // console.log(event.detail.current);
    this.setData({
      currentSwiper: event.detail.current
    })
  },
  // swiper点击
  swiperClick() {
    console.log(this.data.currentSwiper);
    this.setData({
      show: true
    });
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
  }
})