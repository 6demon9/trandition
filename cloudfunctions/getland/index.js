// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: 'cloudbase-5gzo17xz6330490a' }) // 使用当前云环境

exports.main = async (event, context) => {
  console.log("go")
  const fileIDs = event.fileIDs  // 从前端传入的 fileID 数组
  try {
    const res = await cloud.getTempFileURL({
      fileList: fileIDs
    })
    return {
      fileList: res.fileList  // 返回临时文件链接
    }
  } catch (err) {
    return {
      error: err
    }
  }
}