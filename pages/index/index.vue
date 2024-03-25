<template>
  <view class="content">
    <image class="logo" src="/static/logo.jpg"></image>
    <view class="main">
      <view class="pay-fee">交费入口</view>
      <view class="list">
        <view
          class="item"
          v-for="item in list"
          :key="item.id"
          @click="openDetail(item)"
        >
          <text>[{{ item.progress }}]{{ item.title }}</text></view
        >
      </view>
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
          getRequest('/thlf/list').then((res) => {
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
    openDetail(item) {
      uni.navigateTo({ url: `/pages/detail/index?id=${item.id}` });
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

.main {
  padding: 0 30rpx;
  box-sizing: border-box;
  .pay-fee {
    font-size: 36rpx;
    margin: 40rpx 0;
  }
  .list {
    .item {
      line-height: 56rpx;
      padding: 10rpx;
      text {
        font-size: 32rpx;
      }
    }
  }
}
</style>
