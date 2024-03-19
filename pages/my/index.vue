<template>
  <view class="mine">
    <view class="info">
      <view
        class="info-line-avatar border-item"
      >
        <view class="avatar">
          <image :src="userInfo.avatarUrl"></image>
        </view>
        <text>{{userInfo.nickName}}</text>
      </view>
      <view
        class="info-line border-item"
        @click="navigateTo('/pages/list/index')"
      >
        <view class="left">
          <text>交易记录</text>
        </view>
        <u-icon name="arrow-right"></u-icon>
      </view>
      <view class="info-line" @click="logout">
        <view class="left">
          <text>退出登录</text>
        </view>
        <u-icon name="arrow-right"></u-icon>
      </view>
    </view>
  </view>
</template>

<script>
import { getRequest } from '../utils/request'
export default {
  data() {
    return {
      title: "Hello",
      userInfo: {
        avatarUrl: "../../static/touxiang.png",
        nickName: "admin",
      },
    };
  },
  onLoad() {},
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
          this.userInfo = uni.getStorageSync('userInfo')
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
    logout() {
      uni.setStorageSync('sessionKey', '')
      uni.setStorageSync('openId', '')
      uni.setStorageSync('userInfo', '')
      uni.navigateTo({ url: `/pages/login/index` });
    },
    navigateTo(url) {
      uni.navigateTo({ url });
    },
  },
};
</script>

<style scoped lang="scss">
.mine {
  .info {
    width: calc(100% - 40rpx);
    border-radius: 10rpx;
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.06);
    margin: 30rpx 20rpx;
    background-color: #fff;
    box-sizing: border-box;
    .info-line-avatar {
      height: 200rpx;
      line-height: 200rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 24rpx;
      .avatar {
        width: 150rpx;
        height: 150rpx;
        border-radius: 50%;
        image {
          width: 150rpx;
          height: 150rpx;
          border-radius: 50%;
        }
      }
    }
    .info-line {
      height: 50px;
      line-height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 24rpx;
      .left {
        .edit {
          width: 30rpx;
          height: 30rpx;
          margin-right: 20rpx;
          vertical-align: middle;
        }
      }
      .right {
        width: 12rpx;
        height: 18rpx;
        margin-right: 12rpx;
      }
    }
    .border-item {
      border-bottom: 1px solid #ddd;
    }
  }
}
</style>
