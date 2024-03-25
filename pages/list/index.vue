<template>
  <view class="list">
    <view
      class="item"
      v-for="item in list"
      :key="item.id"
    >
      <view>姓名：{{ item.name }}</view>
      <view>应聘岗位：{{ item.jobPost }}</view>
      <view>金额（元）：{{ item.amount }}</view>
      <view>支付状态：{{ item.payStatusName }}</view>
    </view>
  </view>
</template>

<script>
import { getRequest } from '../utils/request'
export default {
  data() {
    return {
      list: [],
    };
  },
  onLoad() {
  },
  onShow() {
    let sessionKey = uni.getStorageSync('sessionKey')
    let openId = uni.getStorageSync('openId')
    if (!sessionKey || !openId) {
      uni.navigateTo({ url: `/pages/login/index` });
      return 
    }
    getRequest('/thlf/checksession',{ openid : openId, sessionKey} ).then((res) => {
      if (res.code === 200) {
        if (res.data.errcode === 0 ) {
          getRequest('/thlf/transaction', { openid : openId} ).then((res) => {
            this.list = res.data || []
          })
        } else {
          uni.showToast({
            title: "登录失效",
            icon: 'none'
          });
          setTimeout(() => {
            uni.navigateTo({ url: `/pages/login/index` });
          }, 1000)
        }
      } else {
        uni.showToast({
          title: "登录失效",
          icon: 'none'
        });
        setTimeout(() => {
          uni.navigateTo({ url: `/pages/login/index` });
        }, 1000)
      }
    })
  },
  methods: {
    
  },
};
</script>

<style lang="scss">
.list {
  padding: 40rpx 30rpx;
  .item {
    line-height: 56rpx;
    padding: 30rpx 20rpx;
    border: 1rpx solid #dad3d3;
    border-radius: 20rpx;
    margin-bottom: 40rpx;
    view {
      font-size: 32rpx;
      line-height: 42rpx;
    }
  }
}
</style>
