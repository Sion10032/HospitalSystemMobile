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
          <booking-item
            v-for="item in bookings.now"
            :key="item.id"
            :booking="item"/>
        </div>
      </van-tab>
      <van-tab title="历史预约">
        <div class="bookinglist-wrapper">
          <booking-item
            v-for="item in bookings.history"
            :key="item.id"
            :booking="item"/>
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
  data: function () {
    return {
      bookings: {
        now: [],
        history: []
      }
    }
  },
  beforeCreate: function () {
    if (!this.$store.state.isLogin) {
      alert('请登录')
      this.$router.push('/login')
    }
  },
  created: function () {
    this.bookings.now = []
    this.bookings.history = []
    this.$axios({
      method: 'get',
      url: '/users/' + this.$store.state.user.id + '/reservations/'
    }).then((res) => {
      for (let it of res.data) {
        let re = {
          id: it.id,
          is_paid: it.is_paid,
          is_cancel: it.is_cancel,
          lab: this.$store.getters.getLab(it.department),
          date: it.date,
          time: this.$store.getters.getTime(it.time)
        }
        if (it.is_expert) {
          re.doctor = this.$store.getters.getDoctor(it.doctor)
        }
        if (it.is_finish) {
          this.bookings.history.push(re)
        } else {
          this.bookings.now.push(re)
        }
      }
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
