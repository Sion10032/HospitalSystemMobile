<template>
  <div v-if="!booking.is_cancel" class="booking-item-wrapper" @click="GoBookingDetail">
    <van-cell :value='booking.date' :label="booking.is_paid ? '已缴费' : '未缴费'"  clickable>
      <template slot="title">
        <span class="custom-title">{{ booking.lab }} </span>
        <van-tag type="primary" v-if="booking.doctor">{{ booking.doctor }}</van-tag>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    booking: {
      id: Number,
      lab: String,
      is_paid: Boolean,
      is_cancel: Boolean,
      date: String,
      doctor: String,
      time: String
    }
  },
  methods: {
    GoBookingDetail: function () {
      this.$router.push({ name: 'booking', params: { id: this.booking.id.toString() } })
    }
  }
}
</script>

<style scoped>
.booking-item-wrapper {
}
p {
  font-size: 14px;
  margin: 6px;
}
</style>>
