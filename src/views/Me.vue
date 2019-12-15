<template>
  <div class="me-wrapper">
    <div class="me-info-wrapper">
      <van-image width="80" height="80" round
        src="https://img.yzcdn.cn/vant/cat.jpeg"/>
      <div class="me-info">
        <p class="me-name">{{ username }}</p>
        <div class="divider"></div>
        <p class="me-profile" >{{ profile }}</p>
      </div>
    </div>
    <van-cell-group>
        <van-cell title="登录" to="login" v-if="!isLogin"/>
        <van-cell title="退出登录" v-if="isLogin"/>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      username: 'username',
      profile: 'profile',
      isLogin: false
    }
  },
  created: function () {
    if (localStorage.getItem('access')) {
      this.$axios({
        method: 'GET',
        url: '/auth/user/',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access')
        }
      }).then((result) => {
        if (result.status === 200) {
          this.isLogin = true
          this.username = result.data.username
          this.profile = result.data.profile.address
        }
      }).catch((err) => {
        console.log(err)
        alert('获取用户数据失败')
      })
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
