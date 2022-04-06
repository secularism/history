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
    currentSwiper: 0
  },
  // swiper切换
  swiperChange(event) {
    // console.log(event.detail.current);
    this.setData({
      currentSwiper: event.detail.current
    })
  },
  // 防止出现轮播图卡死现象最好使用bindanimationfinish方法切换当前下标的图片
  animationChange(event) {
    this.setData({
      currentSwiper: event.detail.current
    })
  },
  // swiper点击
  swiperClick() {
    console.log(this.data.currentSwiper);
  },
  // tabBar切换
  onChange(event) {
    // event.detail 的值为当前选中项的索引
    this.setData({
      active: event.detail
    });
  }
})