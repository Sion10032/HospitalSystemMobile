<template>
  <div class="booking-detail-wrapper">
    <van-nav-bar
      title="领药单详情"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-cell-group>
      <van-cell title="处方单" :value="pid"/>
      <van-cell title="创建时间" :value="create_time"/>
      <van-cell title="是否缴费" :value="is_paid"/>
      <van-cell title="医生" :value="doctor"/>
      <van-cell
        v-for="item in items"
        :key="item.id">
        <div>{{ $store.getters.getMedicine(item.medicine) }}</div>
        <div>￥{{ $store.getters.getMedicinePrice(item.medicine) }}</div>
      </van-cell>
      <van-steps v-if="is_paid" :active="active">
        <van-step>待配药</van-step>
        <van-step>配药中</van-step>
        <van-step>待发药</van-step>
        <van-step>发药中</van-step>
        <van-step>已完成</van-step>
    </van-steps>
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
      pid: '',
      create_time: '',
      pay: '',
      is_paid: false,
      doctor: '',
      active: 0,
      items: []
    }
  },
  beforeCreate: function () {
    if (!this.$store.state.isLogin) {
      alert('请登录')
      this.$router.push('/login')
    }
  },
  created: function () {
    this.items = []
    this.$axios({
      method: 'get',
      url: '/medicine-handout-records/' + this.id + '/'
    }).then((result) => {
      this.pid = result.data.prescription.id
      this.create_time = result.data.create_time.substring(0, 10) + ' ' + result.data.create_time.substring(11, 19)
      this.pay = result.data.prescription.pay
      this.is_paid = result.data.prescription.is_paid ? '是' : '否'
      this.doctor = this.$store.getters.getDoctor(result.data.creator)
      this.active = result.data.handout_status
      this.items = result.data.prescription.items
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
