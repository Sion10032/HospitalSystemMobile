<template>
  <div class="bookling-list-wrapper">
    <van-nav-bar
      title="预约信息"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-tabs class="bookinglist-tab" color="#1989fa">
      <van-tab title="当前预约">
        <div class="bookinglist-wrapper">
          <booking-item />
          <booking-item />
        </div>
      </van-tab>
      <van-tab title="历史预约">
        <div class="bookinglist-wrapper">
          <booking-item />
          <booking-item />
          <booking-item />
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import BookingItem from './BookingItem.vue'

export default {
  components: {
    BookingItem
  },
  beforeCreate: function () {
    if (!this.$store.state.isLogin) {
      alert('请登录')
      this.$router.push('/login')
    }
  },
  created: function () {
    console.log(this.$store.state)
    this.$axios({
      method: 'get',
      url: '/users/' + this.$store.state.user.id + '/reservations/'
    }).then((res) => {
      console.log(res.data)
    })
  },
  methods: {
    onClickLeft: function () {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
</style>
