<template>
  <div class="booking-detail-wrapper">
    <van-nav-bar
      title="病历详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-cell-group>
      <van-cell title="就诊日期" :value="Date"/>
      <van-cell title="就诊科室" :value="Lab"/>
      <van-cell title="医生" v-if="Doctor" :value="Doctor.Name"/>
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
      Date: '',
      Lab: '科室',
      Doctor: {
        Id: 0,
        Name: 'Doctor'
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
      url: '/medical-records/' + this.id
    }).then((result) => {
      this.resp = result.data
      this.Date = result.data.time
      this.Lab = this.$store.getters.getLab(result.data.department)
      if (result.data.is_expert) {
        this.Doctor = {
          Id: result.data.doctor,
          Name: this.$store.getters.getDoctor(result.data.doctor)
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
.qrcode-img-wrapper {
  padding: 50px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
