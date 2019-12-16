<template>
  <div class="home">
    <van-search placeholder="请输入搜索关键词" v-model="value" />
    <van-grid>
      <van-grid-item icon="photo-o" text="新建预约" to="bookingcreate"/>
      <van-grid-item icon="photo-o" text="预约信息" to="bookings"/>
      <van-grid-item icon="photo-o" text="缴费记录" to="payments"/>
      <van-grid-item icon="photo-o" text="病历查看" to="cases"/>
    </van-grid>
    <van-panel title="当前预约" style="overflow: hidden;">
      <booking-item
        v-for="item in bookings"
        :key="item.id"
        :booking="item"/>
    </van-panel>
    <van-panel title="待领药品" style="overflow: hidden;">
    </van-panel>
    <van-panel title="排队情况" style="overflow: hidden;">
    </van-panel>
  </div>
</template>

<script>
import BookingItem from './Patient/BookingItem.vue'

export default {
  name: 'home',
  components: {
    BookingItem
  },
  data: function () {
    return {
      bookings: []
    }
  },
  created: function () {
    this.bookings = []
    this.$axios({
      method: 'get',
      url: '/users/' + this.$store.state.user.id + '/reservations/'
    }).then((res) => {
      for (let it of res.data) {
        if (it.is_finish) {
          continue
        }
        let re = {
          id: it.id,
          lab: this.$store.getters.getLab(it.department),
          date: it.date,
          time: this.$store.getters.getTime(it.time)
        }
        if (it.is_expert) {
          re.doctor = this.$store.getters.getDoctor(it.doctor)
        }
        this.bookings.push(re)
      }
    })
  }
}
</script>

<style>

</style>
