Page({
  data: {
    openid: "",
    loginstate: "0",
    userEntity: null,
    terminal: "",
    osVersion: "",
    phoneNumber: "",
    showModal: false,
  },

  onLoad: function () {
    var that = this;
    // 获取 openid
    wx.getStorage({
      key: 'openid',
      success: function (res) {
        that.setData({ openid: res.data });
      },
      fail: function () {
        that.getcode(); // 获取openid的代码逻辑
      }
    });

    // 获取 userEntity
    wx.getStorage({
      key: 'userEntity',
      success: function (res) {
        that.setData({ userEntity: res.data });
      },
      fail: function () {
        console.log("fail1");
      }
    });

    // 获取 loginstate
    wx.getStorage({
      key: 'loginstate',
      success: function (res) {
        that.setData({ loginstate: res.data });
      },
      fail: function () {
        console.log("fail2");
      }
    });
  },

  getcode: function () {
    // 调用获取openid的接口
    wx.login({
      success(res) {
        if (res.code) {
          wx.request({
            url: '自己的登录接口', // 替换为实际的登录接口
            method: 'POST',
            data: {
              jscode: res.code,
            },
            success(response) {
              if (response.data.r == "T") {
                wx.setStorage({
                  key: "openid",
                  data: response.data.openid,
                });
                that.setData({ openid: response.data.openid });
              }
            },
          });
        }
      }
    });
  },

  onGotUserInfo: function (e) {
    var that = this;
    if (e.detail.errMsg == "getUserInfo:ok") {
      wx.setStorage({
        key: "userinfo",
        data: e.detail.userInfo
      });
      this.setData({ userInfo: e.detail.userInfo });
      that.showDialogBtn();
    }
  },

  showDialogBtn: function () {
    this.setData({
      showModal: true
    });
  },

  hideModal: function () {
    this.setData({
      showModal: false
    });
  },

  onshow: function (openid, userInfo, phoneNumber) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          terminal: res.model,
          osVersion: res.system
        });
      }
    });

    wx.request({
      url: '登录接口', // 替换为实际的接口地址
      method: 'POST',
      data: {
        username: phoneNumber,
        parentuser: 'xudeihai',
        wximg: userInfo.avatarUrl,
        nickname: userInfo.nickName,
        terminal: that.data.terminal,
        osVersion: that.data.osVersion,
        logintype: "10",
        openid: that.data.openid,
      },
      success(res) {
        if (res.data.r == "T") {
          that.setData({ userEntity: res.data.d });
          wx.setStorage({
            key: "userEntity",
            data: res.data.d
          });
          that.setData({ loginstate: "1" });
          wx.setStorage({
            key: "loginstate",
            data: "1"
          });
        }
      },
      fail(res) {
        console.log(res);
      }
    });
  },

  getPhoneNumber: function (e) {
    var that = this;
    that.hideModal();

    wx.checkSession({
      success: function () {
        wx.login({
          success: res => {
            wx.request({
              url: '自己的登录接口', // 替换为实际的接口地址
              data: {
                account: '1514382701',
                jscode: res.code
              },
              success(res) {
                if (res.data.r == "T") {
                  wx.setStorage({
                    key: "openid",
                    data: res.data.openid
                  });

                  wx.request({
                    url: '自己的解密接口', // 替换为实际的解密接口
                    data: {
                      encryptedData: e.detail.encryptedData,
                      iv: e.detail.iv,
                      code: res.data.sessionkey
                    },
                    success: function (res) {
                      if (res.data.r == "T") {
                        that.onshow(that.data.openid, that.data.userInfo, res.data.d.phoneNumber);
                      }
                    }
                  });
                }
              }
            });
          }
        });
      }
    });
  },
});
