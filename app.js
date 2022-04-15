// app.js
import { colorUI } from './config/ColorUI'
import { colorUISdk } from './config/mp-sdk'
App({
  colorUI,
  colorUISdk,
  onLaunch() {
    wx.cloud.init({
      env:"debate-3gznd9378f33dda1"
    })
  },
  globalData: {
    globalIsLogin:false,
    openid:""
  },
})
