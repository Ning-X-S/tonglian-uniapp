<template>
  <view class="login">
    <!-- <button @click="wxLogin">微信授权登录</button> -->
    <!-- <button
      type="primary"
      open-type="getPhoneNumber"
      @getphonenumber="getPhoneNumber"
    >
      手机号一键登录
    </button> -->
     <button type="primary" @click="getUserProfile"> 微信一键登录 </button>
  </view>
</template>

<script>
import { loginFn, getPhoneNumberFn } from "../utils/util.js";
export default {
  data() {
    return {};
  },
  onLoad() {},
  methods: {
    getUserProfile(e) {
      wx.getUserProfile({
        desc: '用户登录', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(res)
          uni.setStorageSync(
            "userInfo",
            res.userInfo
          );
          loginFn().then((res) => {
            // 微信登录&服务端获取openid
            // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
            // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
            uni.showToast({
              title: "登录成功",
            });
            setTimeout(() => {
              uni.switchTab({
                url: '/pages/index/index'
              });
            }, 1000)
          }).catch(() => {
            uni.showToast({
              title: "登录失败",
              icon: 'none'
            });
          });
        }
      })
    },
    getPhoneNumber(e) {
      console.log("asdads", e);
      // 在bindgetphonenumber回调中获取code动态令牌;
      loginFn().then((res) => {
        // 微信登录&服务端获取openid
        console.log(res, "接口换取的openid");
        console.log("获取手机号的动态令牌:", e.detail.code); // 动态令牌
        getPhoneNumberFn(e.detail.code, res.openid).then((res2) => {
          // 服务端获取手机号
          if (res2.code == 0) {
            uni.setStorageSync(
              "phoneNumber",
              res.content.phone_info.phoneNumber
            );
            uni.showToast({
              title: "登录成功",
            });
          }
        });
      });
    },
  },
};
</script>

<style scoped lang="scss">
.login {
  margin-top: 400rpx;
  button {
    width: 690rpx;
    margin: 0 auto;
  }
}
</style>
