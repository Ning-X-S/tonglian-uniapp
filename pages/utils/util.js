// 服务端接口 - 获取openid
function queryOpenIdFn(code) {
  console.log(code)
  return new Promise(resolve => {
    // queryOpenId({
    //   code
    // }).then(res => {
    //   if (res.code !== 0) {
    //     console.log('获取openid失败1：', res.msg);
    //     return
    //   }
    //   uni.setStorageSync('openId', res.content.openid)
    //   resolve(res.content)
    // })
    //   .catch(err => {
    //     console.log('获取openid失败2：', err);
    //   })
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
          resolve(res)
        })
      },
      fail: (err) => {
        console.log('login fail:', err);
      }
    })
  })
}

export {
  loginFn,
  getPhoneNumberFn
}
