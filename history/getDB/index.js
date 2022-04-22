// 云函数入口文件
const cloud = require('wx-server-sdk')
// 指定环境，否则是默认环境
cloud.init({
  env: "debate-3gznd9378f33dda1",
  traceUser: true
})

// 云函数入口函数
exports.main = async (event, context) => {

  // 如果传参，则使用where进行查询
  if (event.params) {
    // 如果传过来有query则进行收藏表的meetingId查询
    if (event.query) {
      // 传过来的参数params 其中对于根据收藏表中meetingId查询会议表的信息时
      // 传过来的params此时是一个数组，需要先对数组进行处理
      const data = event.params.meeting_data
      const meeting_id = []
      for (let item of data) {
        // item 是数组data的每一个元素(对象)
        meeting_id.push({
          _id: item.meeting_id
        })
      }

      // 拿到所有传过来的meetingId后进行查询
      let res_ = []
      for (let i of meeting_id) {
        await cloud.database().collection(event.table).where(i).get().then(res => {
          res_.push(res.data)
        })
      }
      return res_
    } else {
      return cloud.database().collection(event.table).where(event.params).get();
    }
  } else if(event.order){
    return cloud.database().collection(event.table).orderBy('time','desc').get()
  }else if(event.aggregate){
    return cloud.database().collection(event.table).aggregate().sample({
      size: 5
    }).end()
  }else { 
    return cloud.database().collection(event.table).get();
  }
}