// 云函数入口文件
const cloud = require('wx-server-sdk')
// 指定环境，否则是默认环境
cloud.init({
  env: "debate-3gznd9378f33dda1",
  traceUser: true
})

// 云函数入口函数
exports.main = async (event, context) => {
  return cloud.database().collection(event.table).add({data:event.params});
}