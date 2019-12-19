<template>
  <div class="me-wrapper">
    <div class="me-info-wrapper">
      <van-image width="80" height="80" round
        src="https://img.yzcdn.cn/vant/cat.jpeg"/>
      <div class="me-info">
        <p class="me-name">{{ $store.state.user.username }}</p>
        <div class="divider"></div>
        <p class="me-profile" >{{ $store.state.user.email }}</p>
      </div>
    </div>
    <van-cell-group>
        <van-cell title="登录" to="login" v-if="!$store.state.isLogin"/>
        <van-cell title="姓名" v-if="$store.state.isLogin">{{ $store.state.user.profile.name }}</van-cell>
        <van-cell title="性别" v-if="$store.state.isLogin">{{ $store.state.user.profile.gender === 1 ? '男' : '女' }}</van-cell>
        <van-cell title="电话号码" v-if="$store.state.isLogin">{{ $store.state.user.profile.phone }}</van-cell>
        <van-cell title="退出登录" v-if="$store.state.isLogin" @click="OnLogoutClick"/>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  methods: {
    OnLogoutClick: function () {
      this.$axios({
        method: 'GET',
        url: '/auth/logout/',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access')
        }
      }).then((result) => {
        this.isLogin = false
        localStorage.clear()
        this.$store.commit('setUser', {
          id: '请登录', email: '', username: '', profile: {}
        })
        this.$store.commit('setLogin', false)
        this.$router.push('/me')
      }).catch((err) => {
        console.log(err)
        alert('失败')
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
