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
          <text>[招聘进行中]{{ item.title }}</text></view
        >
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: "Hello",
      list: [
        {
          id: "1",
          title: "正式报名交费入口",
        },
        {
          id: "2",
          title: "面试通过人员报到安置交费入口",
        },
      ],
    };
  },
  onLoad() {},
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
