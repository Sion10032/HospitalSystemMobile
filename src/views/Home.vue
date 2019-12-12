<template>
  <div class="home">
    <van-search placeholder="请输入搜索关键词" v-model="value" />
    <van-grid>
      <van-grid-item icon="photo-o" text="就诊信息" />
      <van-grid-item icon="photo-o" text="预约信息" to="/bookings"/>
      <van-grid-item icon="photo-o" text="缴费记录" />
      <van-grid-item icon="photo-o" text="病历查看" />
    </van-grid>
    <van-panel title="当前预约" style="overflow: hidden;">
      <booking-item />
      <booking-item />
      <booking-item />
    </van-panel>
    <van-panel title="待领药品" style="overflow: hidden;">
    </van-panel>
  </div>
</template>

<script>
import BookingItem from './Patient/BookingItem.vue'

export default {
  name: 'home',
  components: {
    BookingItem
  }
}
</script>

<style>

</style>
