<template>
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
</template>

<script>
import BookingItem from './BookingItem.vue'

export default {
  components: {
    BookingItem
  }
}
</script>

<style>
</style>
