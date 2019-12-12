<template>
  <div class="booking-item-wrapper" @click="GoBookingDetail">
    <van-cell :title="Lab" :value='Times' :label="Doctor" clickable/>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      Lab: '科室',
      Times: '2019/01/01 10:00 - 11:00',
      Doctor: ''
    }
  },
  methods: {
    GoBookingDetail: function () {
      this.$router.push({ name: 'booking', params: { id: '123' } })
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
