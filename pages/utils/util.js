
import { getRequest } from '../utils/request'

// 服务端接口 - 获取openid
function queryOpenIdFn(code) {
  console.log(code)
  return new Promise(resolve => {
    resolve(code)
    getRequest("/thlf/auth", {
      code
    }).then(res => {
      if (res.code !== 200) {
        uni.showToast({
          title: "登录失败",
        });
        return
      }
      uni.setStorageSync('sessionKey', res.data.session_key)
      uni.setStorageSync('openId', res.data.openid)
      resolve(res.data)
    })
      .catch(err => {
        uni.showToast({
          title: "登录失败",
        });
        console.log('获取openid失败2：', err);
      })
  })
}

// 服务端接口 - 获取手机号
function getPhoneNumberFn(phoneCode, openId) {
  return new Promise(resolve => {
    getPhoneNumber({
      code: phoneCode,
      openId
    }).then(res => {
      if (res.code !== 0) {
        console.log('获取手机号失败1：', res.msg);
        return
      }
      resolve(res)
    })
      .catch(err => {
        console.log('获取手机号失败2：', err);
      })
  })
}

// 微信api : 微信登录
function loginFn() {
  return new Promise((resolve, reject) => {
    uni.login({
      success: async (res) => {
        queryOpenIdFn(res.code).then(res => {
          console.log(res)
          resolve(res)
        })
      },
      fail: (err) => {
        uni.showToast({
          title: "登录失败",
        });
        console.log('login fail:', err);
      }
    })
  })
}

export {
  loginFn,
  getPhoneNumberFn
}
