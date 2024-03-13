<template>
  <view class="mine">
    <view class="info">
      <view
        class="info-line-avatar border-item"
        @click="navigateTo('/pages/login/index')"
      >
        <view class="avatar">
          <image :src="info.avatar"></image>
        </view>
        <u-icon name="arrow-right"></u-icon>
      </view>
      <view
        class="info-line border-item"
        @click="navigateTo('/pages/login/index')"
      >
        <view class="left">
          <text>编辑资料</text>
        </view>
        <u-icon name="arrow-right"></u-icon>
      </view>
      <view class="info-line" @click="navigateTo('setting')">
        <view class="left">
          <text>设置</text>
        </view>
        <u-icon name="arrow-right"></u-icon>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello",
      info: {
        avatar: "../../static/touxiang.png",
        name: "admin",
        status: "工作中，勿扰~",
      },
    };
  },
  onLoad() {},
  methods: {},
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
