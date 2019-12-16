<template>
  <div class="login-wrapper">
    <van-image width="80" height="80" round
      src="https://img.yzcdn.cn/vant/cat.jpeg"/>
    <div class="divider"></div>
    <van-cell-group style="width: 100vw;">
      <van-field
        v-model="username"
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        @click-right-icon="$toast('question')"
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
      />
    </van-cell-group>
    <div class="divider"></div>
    <div class="login-button-wrapper">
      <van-button style="width: 80px; height: 40px;" type="danger" @click="RegisterClick">注册</van-button>
      <van-button style="width: 80px; height: 40px;" type="primary" @click="LoginClick">登陆</van-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    RegisterClick: function () {
      this.$router.push('register')
    },
    LoginClick: function () {
      this.$axios({
        method: 'POST',
        url: '/auth/',
        data: {
          username: this.username,
          password: this.password
        }
      }).then((result) => {
        if (result.status === 200) {
          localStorage.setItem('access', result.data.access)
          localStorage.setItem('refresh', result.data.refresh)
          this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access')
        }
      }).then(() => {
        this.$axios({
          method: 'get',
          url: '/auth/user/'
        }).then((res) => {
          if (res.status === 200) {
            this.$store.commit('setUser', res.data)
            this.$store.commit('setLogin', true)
            alert('登陆成功')
            this.$router.push('/me')
          }
        })
      }).catch((err) => {
        console.log(err)
        alert('登陆失败')
      })
    }
  }
}
</script>

<style>
.login-wrapper {
  box-sizing: border-box;
  height: 100vh;
  padding-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.avatar-wrapper {
  border: 4px;
}
.login-button-wrapper {
  width: 100vw;
  box-sizing: border-box;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
}
</style>
