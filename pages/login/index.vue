<template>
  <view class="login">
    <button @click="wxLogin">微信授权登录</button>
    <button
      type="primary"
      open-type="getPhoneNumber"
      @getphonenumber="getPhoneNumber"
    >
      手机号一键登录
    </button>
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

    getUserInfo() {
      return new Promise((resolve, reject) => {
        uni.getUserProfile({
          lang: "zh_CN",
          desc: "用户登录", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，
          success: (res) => {
            console.log(res, "resss");
            resolve(res.userInfo);
          },
          fail: (err) => {
            reject(err);
          },
        });
      });
    },
    getLogin() {
      return new Promise((resolve, reject) => {
        uni.login({
          success(res) {
            console.log(res, "res");
            resolve(res);
          },
          fail: (err) => {
            console.log(err, "logoer");
            reject(err);
          },
        });
      });
    },
    wxLogin() {
      let that = this;
      uni.getProvider({
        service: "oauth",
        success: function (res) {
          //支持微信、qq和微博等
          if (res.provider.indexOf("weixin")) {
            console.log(res, "ress");
            let userInfo = that.getUserInfo();
            let loginRes = that.getLogin();
            Promise.all([userInfo, loginRes]).then((result) => {
              console.log(result);
            });
          }
        },
        fail: function (err) {
          uni.hideLoading();
          uni.showToast({
            icon: "none",
            title: err,
          });
        },
      });
    },
  },
};
</script>

<style scoped lang="scss">
.login {
}
</style>
