<template>
  <div class="booking-item-wrapper" @click="GoBookingDetail">
    <van-cell :title="booking.lab" :value='booking.date' :label="booking.doctor" clickable/>
  </div>
</template>

<script>
export default {
  props: {
    booking: {
      id: Number,
      lab: String,
      date: String,
      doctor: String,
      time: String
    }
  },
  methods: {
    GoBookingDetail: function () {
      this.$router.push({ name: 'booking', params: { id: this.booking.id } })
    }
  }
}
</script>

<style scoped>
p {
  font-size: 14px;
  margin-left: 6px;
}
</style>>
