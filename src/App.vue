<template>
  <div id="app">
    <router-view/>
    <van-tabbar route>
      <van-tabbar-item replace to="/" icon="home-o">
        主页
      </van-tabbar-item>
      <van-tabbar-item replace to="/me" icon="user-o">
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  created: function () {
    if (localStorage.getItem('refresh')) {
      this.$axios({
        method: 'post',
        url: '/auth/refresh/',
        data: {
          refresh: localStorage.getItem('refresh')
        }
      }).then((result) => {
        localStorage.setItem('access', result.data['access'])
        this.$axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access')
      }).catch((err) => {
        localStorage.clear()
        console.log(err)
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: #f7f8fa;
  height: 100vh;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
.divider {
  height: 10px;
  width: 10px;
}
</style>
