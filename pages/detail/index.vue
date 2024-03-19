<template>
  <view class="content">
    <image class="logo" src="/static/logo.jpg"></image>
    <view class="main">
      <view class="top">
        <view>报名入口</view>
        <view @click="back">返回首页</view>
      </view>
      <view class="title">*{{detailInfo.signTitle}}</view>
      <view class="paragraph" v-if="detailInfo.signContentOne">*{{detailInfo.signContentOne}}</view>
      <view class="paragraph"
         v-if="detailInfo.signContentTwo">*{{detailInfo.signContentTwo}}</view
      >
      <view class="form-item mt100">
        <view class="label">*姓名：</view>
        <input type="text" placeholder="请输入" />
      </view>
      <view class="form-item">
        <view class="label">*应聘岗位：</view>
        <input type="text" placeholder="请输入" />
      </view>
      <view class="form-item">
        <view class="label">*金额（元）：</view>
        <input type="number" placeholder="请输入" />
      </view>
      <button type="primary" class="btn">交费报名</button>
    </view>
  </view>
</template>

<script>
import { getRequest } from '../utils/request'

export default {
  data() {
    return {
      detailInfo: {},
    };
  },
  onLoad(options) {
    let sessionKey = uni.getStorageSync('sessionKey')
    let openId = uni.getStorageSync('openId')
    if (!sessionKey || !openId) {
      uni.navigateTo({ url: `/pages/login/index` });
      return 
    }
    getRequest('/thlf/checksession',{ openid : openId, sessionKey} ).then((res) => {
      if (res.code === 200) {
        if (res.data.errcode === 0 ) {
          getRequest('/thlf/getInfo', { id : options.id }).then((res) => {
            this.detailInfo = res.data
          })
        } else {
          uni.showToast({
            title: "登录失效",
          });
          setTimeout(() => {
            uni.navigateTo({ url: `/pages/login/index` });
          }, 1000)
        }
      } else {
        uni.showToast({
          title: "登录失效",
        });
        setTimeout(() => {
          uni.navigateTo({ url: `/pages/login/index` });
        }, 1000)
      }
    })
  },
  methods: {
    back() {
      uni.navigateBack({
        delta: 1,
      });
    },
  },
};
</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 100%;
  margin-top: 100rpx;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 100rpx;
}
.mt100 {
  margin-top: 100rpx;
}
.main {
  padding: 0 30rpx;
  box-sizing: border-box;
  .top {
    font-size: 36rpx;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    view {
      padding: 40rpx 0;
    }
  }
  .title {
    text-indent: 2em;
    line-height: 44rpx;
    font-size: 28rpx;
  }
  .paragraph {
    text-indent: 2em;
    line-height: 44rpx;
    font-size: 28rpx;
  }
  .form-item {
    display: flex;
    flex-direction: row;
    align-content: center;
    margin-bottom: 20rpx;
    .label {
      width: 240rpx;
      text-align: center;
      line-height: 64rpx;
    }
    input {
      flex: 1;
      border: 1rpx solid #d6d6d6;
      height: 64rpx;
      line-height: 64rpx;
      padding-left: 20rpx;
      border-radius: 8rpx;
    }
  }
  .btn {
    margin-top: 120rpx;
  }
}
</style>
