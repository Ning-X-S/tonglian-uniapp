<template>
  <view class="content">
    <image class="logo" src="/static/logo.jpg"></image>
    <view class="main">
      <view class="top">
        <view>报名入口</view>
        <view @click="back">返回首页</view>
      </view>
      <view class="title">*报名须知</view>
      <view class="paragraph">*报名资料审核通过才进行交费报名，否则无效；</view>
      <view class="paragraph"
        >*报名缴费成功后报备负责老师，做好面试相关准备；</view
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
      width: 200rpx;
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
