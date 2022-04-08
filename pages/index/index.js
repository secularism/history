// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // swiper图片展示
    img_index: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    // tabBar默认主页活跃
    active: 0,
    // swiper默认当前序号
    currentSwiper: 0,
    show: false,
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
  toDetail_time(){
    // wx.navigateTo({
    //   url: '../toDetail/toDetail?currentSwiper=' + this.data.currentSwiper,
    // })
  }
})