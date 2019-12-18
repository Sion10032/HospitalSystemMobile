<template>
  <div class="booking-detail-wrapper">
    <van-nav-bar
      title="病历详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-cell-group>
      <van-cell title="就诊日期" :value="date"/>
      <van-cell title="就诊科室" :value="lab"/>
      <van-cell title="发病日期" :value="onset_date"/>
      <van-cell title="就诊医生" :value="doctor"/>
      <van-cell title="病情描述" :value="detail"/>
      <van-cell title="诊断结果" :value="diagnosis"/>
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
      date: '',
      lab: '科室',
      onset_date: '',
      doctor: '',
      detail: '',
      diagnosis: '',
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
      this.date = result.data.time.substring(0, 10)
      this.lab = this.$store.getters.getLab(result.data.department)
      this.onset_date = result.data.onset_date
      this.doctor = this.$store.getters.getDoctor(result.data.creator)
      this.detail = result.data.detail
      this.diagnosis = result.data.diagnosis
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
