// app.ts
App<IAppOption>({
  globalData: {},
  onLaunch() {
    wx.cloud.init({
      env:'cloudbase-5gzo17xz6330490a'//这里输入云开发id
    })
  },
})