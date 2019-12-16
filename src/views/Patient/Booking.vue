<template>
  <div class="booking-detail-wrapper">
    <van-nav-bar
      title="预约详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-cell-group>
      <van-cell title="预约ID" :value="BookingId" label="点击显示二维码" clickable @click="ShowControlSwitch('QRCode')"/>
      <van-popup class="qrcode-img-wrapper" v-model="ShowControl.QRCode" position="bottom">
        <van-image width="320" height="320" fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"/>
      </van-popup>
      <van-cell title="预约时间段" :value="BookingTimes.StartTime + ' - ' +  BookingTimes.EndTime"/>
      <van-cell title="预约科室" :value="Lab" clickable/>
      <van-cell title="医生" :value="Doctor.Name" clickable/>
      <van-cell title="缴费金额" :value="Fee" clickable/>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  props: {
    id: Number
  },
  data: function () {
    return {
      BookingId: 0,
      BookingTimes: {
        StartTime: '2019/01/01 10:00',
        EndTime: '11:00'
      },
      Lab: '科室',
      Doctor: {
        Id: 0,
        Name: 'Doctor'
      },
      Fee: 100,
      ShowControl: {
        QRCode: false
      }
    }
  },
  beforeCreate: function () {
    if (!this.$store.state.isLogin) {
      alert('请登录')
      this.$router.push('/login')
    }
  },
  methods: {
    onClickLeft: function () {
      this.$router.go(-1)
    },
    ShowControlSwitch: function (item, value = null) {
      this.ShowControl[item] = value !== null ? value : !this.ShowControl[item]
    }
  }
}
</script>

<style>
.qrcode-img-wrapper {
  padding: 50px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
