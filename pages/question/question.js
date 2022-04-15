// pages/question/question.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentQuestion: "",
    currentId: 0,
    isSubmit: false,
    isCorrect: false,
    text_color: '',
    radio: true,
    icon: {
      correct: 'cloud://debate-3gznd9378f33dda1.6465-debate-3gznd9378f33dda1-1302318734/question/correct.png',
      wrong: 'cloud://debate-3gznd9378f33dda1.6465-debate-3gznd9378f33dda1-1302318734/question/wrong.png',
    },
  },
  onLoad() {
    let that = this
    // 获取问题列表，将其存入缓存
    try {
      let questionList = wx.getStorageSync('questionList')
      if (questionList == "") {
        // Do something with return value
        wx.cloud.callFunction({
          name: 'getDB',
          data: {
            table: 'question',
            aggregate: true
          }
        }).then(res => {
          console.log(res.result.list)
          wx.setStorage({
            key: 'questionList',
            data: res.result.list,
          })
          console.log("设置缓存成功")
          let questionList = wx.getStorageSync('questionList')
          that.setData({
            currentQuestion: questionList[0],
            currentId: parseInt(0),
          })
        })

      } else {

        that.setData({
          currentQuestion: questionList[0],
          currentId: parseInt(0),
        })
      }
    } catch (e) {
      // Do something when catch error
    }
  }

})