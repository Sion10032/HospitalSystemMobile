<template>
  <div class="me-wrapper">
    <div class="me-info-wrapper">
      <van-image width="80" height="80" round
        src="https://img.yzcdn.cn/vant/cat.jpeg"/>
      <div class="me-info">
        <p class="me-name">{{ username }}</p>
        <p class="me-profile" >{{ profile }}</p>
      </div>
    </div>
    <van-cell-group>
        <van-cell title="登录" to="login"/>
        <van-cell title="退出登录"/>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      username: 'username',
      profile: 'profile'
    }
  }
}
</script>

<style>
.me-info-wrapper {
  padding: 20px 10px;
  display: flex;
  flex-direction: row;
}
.me-info {
  padding: 0 20px;
}
.me-info p {
  margin: 0;
  padding: 0;
  text-align: left;
}
.me-name {
  font-size: 24px;
  font-weight: 500;
}
.me-profile {
  font-size: 16px;
  font-weight: 300;
}
</style>
