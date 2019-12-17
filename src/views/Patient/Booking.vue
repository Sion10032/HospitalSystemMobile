<template>
  <div class="booking-detail-wrapper">
    <van-nav-bar
      title="预约详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-cell-group>
      <van-cell title="预约ID" :value="id" label="点击显示二维码" clickable @click="ShowControlSwitch('QRCode')"/>
      <van-popup class="qrcode-img-wrapper" v-model="ShowControl.QRCode" position="bottom">
        <van-image width="320" height="320" fit="cover"
          src="https://img.yzcdn.cn/vant/cat.jpeg"/>
      </van-popup>
      <van-cell title="预约时间段" :value="BookingTimes"/>
      <van-cell title="预约科室" :value="Lab" clickable/>
      <van-cell title="医生" v-if="Doctor" :value="Doctor.Name" clickable/>
      <van-cell title="缴费金额" :value="Fee" :label="IsPaid ? '已缴费' : '未缴费'" clickable @click="OnFeeClick"/>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  props: {
    id: String
  },
  data: function () {
    return {
      BookingId: 0,
      BookingTimes: '',
      Lab: '科室',
      Doctor: {
        Id: 0,
        Name: 'Doctor'
      },
      Fee: 100,
      FeeInfo: null,
      IsPaid: false,
      ShowControl: {
        QRCode: false
      },
      resp: null
    }
  },
  beforeCreate: function () {
    if (!this.$store.state.isLogin) {
      alert('请登录')
      this.$router.push('/login')
    }
  },
  created: function () {
    this.$axios({
      method: 'get',
      url: '/reservations/' + this.id + '/'
    }).then((result) => {
      this.resp = result.data
      this.BookingTimes = result.data.date + ' ' + this.$store.getters.getTime(result.data.time)
      this.Lab = this.$store.getters.getLab(result.data.department)
      if (result.data.is_expert) {
        this.Doctor = {
          Id: result.data.doctor,
          Name: this.$store.getters.getDoctor(result.data.doctor)
        }
      }
      this.FeeInfo = result.data.pay
      this.Fee = 0
      for (let it of this.FeeInfo.items) {
        this.Fee += it.price
      }
      this.IsPaid = result.data.is_paid
    })
  },
  methods: {
    onClickLeft: function () {
      this.$router.go(-1)
    },
    ShowControlSwitch: function (item, value = null) {
      this.ShowControl[item] = value !== null ? value : !this.ShowControl[item]
    },
    OnFeeClick: function () {
      this.$router.push({ name: 'fee', params: { id: this.FeeInfo.id.toString() } })
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
