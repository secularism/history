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
  },
  radioChange: function(e) {
    console.log(e.detail.value)
    app.globalData.answered++
    let that = this
    let questionList = wx.getStorageSync('questionList')
    console.log(questionList[that.data.currentId])
    questionList[that.data.currentId].selected = true

    // 判断选中的答案是否正确
    for (var i = 0; i < questionList[that.data.currentId].answer.length; i++) {
      if (e.detail.value == questionList[that.data.currentId].answer[i].name) {
        questionList[that.data.currentId].answer[i].checked = true
        if (e.detail.value != this.data.currentQuestion.right_answer) {
          wx.vibrateLong()
          questionList[that.data.currentId].isCorrect = false
        } else {
          questionList[that.data.currentId].answer[i].isCorrect = true
          app.globalData.grade += 10
        }
        // console.log(question.answer[i])
      } else {
        questionList[that.data.currentId].answer[i].checked = false
      }
    }
    wx.setStorage({
      key: 'questionList',
      data: questionList,
    })
    // console.log(question)
    this.setData({
      selected: e.detail.value,
      currentQuestion: questionList[that.data.currentId],
      selected: true
    })

  },
  lastQuestion: function() {
    let that = this
    let questionList = wx.getStorageSync("questionList")
    if (this.data.currentId > 0) {
      that.setData({
        currentId: parseInt(that.data.currentId) - 1,
        currentQuestion: questionList[that.data.currentId - 1],
      })
      // wx.navigateTo({
      //   url: '/pages/question/question?id=' + (parseInt(this.data.currentId) - 1),
      // })
    } else {
      wx.showToast({
        title: '前面没有了哦',
      })
    }
  },

  nextQuestion: function() {
    let that = this
    let questionList = wx.getStorageSync("questionList")
    if (that.data.currentId < 4) {
      that.setData({
        currentId: parseInt(that.data.currentId) + 1,
        currentQuestion: questionList[parseInt(that.data.currentId) + 1],
      })

    } else {
      wx.showModal({
        title: '是否提交',
        content: '',
        success(res) {
          if (res.confirm) {
            // 提交 跳转到提交页面
            app.globalData.integral = app.globalData.grade + app.globalData.integral

            // util.getUser().where({
            //   nickName: app.globalData.userName
            // }).update({
            //   data: {
            //     integral: app.globalData.integral
            //   }
            // })

            // wx.cloud.callFunction({
            //   name:"updateIntegral",
            //   data:{
            //     nickName: app.globalData.userInfo.nickName,
            //     integral: app.globalData.integral

            //   }
            // })

            wx.redirectTo({
              url: '/pages/question/finish/finish?grade=' + app.globalData.grade,
            })
            app.globalData.grade = 0
            // 提交之后清除缓存
            wx.removeStorage({
              key: 'questionList',
              success: function(res) {},
            })


          } else if (res.cancel) {
            // 取消 隐藏弹框
          }
        }
      })
    }

  },

})