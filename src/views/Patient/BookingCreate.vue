<template>
  <div class="booking-create-wrapper">
    <van-nav-bar
      title="新建预约"
      left-text="取消"
      right-text="确定"
      left-arrow
      @click-left="OnLeftClick"
      @click-right="OnRightClick"
    />
    <van-cell-group>
      <van-cell title="预约类型" :value="BookingType ? '专家号' : '普通号'"
        is-link arrow-direction="down" @click="ShowControlSwitch('BookingType')">
      </van-cell>
      <van-popup v-model="ShowControl.BookingType" position="bottom">
      <van-picker :columns="ValueList.BookingType" @change="OnBookingTypeChange"/>
      </van-popup>
      <van-cell title="医生" :value="Doctor"
        is-link arrow-direction="down" @click="ShowControlSwitch('Doctor')">
      </van-cell>
      <van-popup v-model="ShowControl.Doctor" position="bottom">
      <van-picker :columns="ValueList.Doctor" @change="OnDoctorChange"/>
      </van-popup>
      <van-cell title="预约日期" :value="BookingDate.toLocaleDateString()"
        is-link arrow-direction="down" @click="ShowControlSwitch('BookingDate')">
      </van-cell>
      <van-popup v-model="ShowControl.BookingDate" position="bottom">
      <van-datetime-picker type="date"
        v-model="ShowControl.curDate" :min-date="ShowControl.minDate"
        @cancel="OnBookingDateCancel" @confirm="OnBookingDateConfirm"/>
      </van-popup>
      <van-cell title="预约时间" :value="BookingTime"
        is-link arrow-direction="down" @click="ShowControlSwitch('BookingTime')">
      </van-cell>
      <van-popup v-model="ShowControl.BookingTime" position="bottom">
      <van-picker :columns="ValueList.BookingTime" @change="OnBookingTimeChange"/>
      </van-popup>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      BookingType: false,
      Doctor: '医生',
      BookingDate: new Date(),
      BookingTime: '10:00 - 11:00',
      ShowControl: {
        BookingType: false,
        Doctor: false,
        BookingDate: false,
        curDate: new Date(),
        minDate: new Date(),
        BookingTime: false
      },
      ValueList: {
        BookingType: ['专家号', '普通号'],
        Doctor: Array.from({ length: 10 }, (item, index) => index + 1),
        BookingTime: Array.from({ length: 12 }, (item, index) => (7 + index) + ':00 - ' + (7 + index + 1) + ':00')
      }
    }
  },
  methods: {
    OnLeftClick: function () {
      this.$router.go(-1)
    },
    OnRightClick: function () {
      // 先显示预约成功，然后去付款页面
      this.$router.go(-1)
    },
    ShowControlSwitch: function (item, value = null) {
      this.ShowControl[item] = value !== null ? value : !this.ShowControl[item]
    },
    OnBookingTypeChange: function (picker, value, index) {
      this.BookingType = value
    },
    OnDoctorChange: function () {
    },
    OnBookingDateCancel: function () {
      this.ShowControlSwitch('BookingDate', false)
    },
    OnBookingDateConfirm: function (value) {
      this.BookingDate = value
      this.ShowControlSwitch('BookingDate', false)
    },
    OnBookingTimeChange: function (picker, value, index) {
      this.BookingTime = value
    }
  }
}
</script>

<style>

</style>
