<template>
  <div class="medical-records-wrapper">
    <van-nav-bar
      title="病历查看"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="medical-records-wrapper">
      <medical-record-item
        v-for="item in records"
        :key="item.id"
        :record="item" />
    </div>
  </div>
</template>

<script>
import MedicalRecordItem from './MedicalRecordItem.vue'

export default {
  components: {
    MedicalRecordItem
  },
  data: function () {
    return {
      records: []
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
    }
  },
  created: function () {
    this.records = []
    this.$axios({
      method: 'get',
      url: '/users/' + this.$store.state.user.id + '/medical-records/'
    }).then((res) => {
      for (let it of res.data) {
        let re = {
          id: it.id,
          time: it.time.substring(0, 10),
          lab: this.$store.getters.getLab(it.department)
        }
        this.records.push(re)
      }
    })
  }
}
</script>

<style>
</style>
