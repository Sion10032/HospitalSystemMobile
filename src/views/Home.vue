<template>
  <div class="home">
    <van-search placeholder="请输入搜索关键词" v-model="searchValue" />
    <van-grid  :column-num="3">
      <van-grid-item icon="edit" text="新建预约" to="bookingcreate"/>
      <van-grid-item icon="todo-list-o" text="预约信息" to="bookings"/>
      <van-grid-item icon="notes-o" text="病历查看" to="madicalrecords"/>
    </van-grid>
    <van-panel v-if="this.rawMedicineHandout" title="领药单" style="overflow: hidden;">
      <van-cell
        v-for="mh in medicineHandouts"
        :key="mh.id"
        :title="'领药单' + mh.id"
        :value='$store.state.handoutStatus[mh.handout_status]'
        @click="goHandoutDetail(mh.id)"
        clickable>
      </van-cell>
    </van-panel>
  </div>
</template>

<script>

export default {
  name: 'home',
  data: function () {
    return {
      searchValue: '',
      active: 0,
      rawMedicineHandout: null
    }
  },
  computed: {
    medicineHandouts: function () {
      let res = []
      for (let it of this.rawMedicineHandout) {
        if (it.prescription.patient === this.$store.state.user.id) {
          res.push(it)
        }
      }
      return res
    }
  },
  created: function () {
    this.$axios({
      method: 'get',
      url: '/medicine-handout-records/'
    }).then((res) => {
      this.rawMedicineHandout = res.data
      console.log(this.medicineHandouts)
    })
  },
  methods: {
    goHandoutDetail: function (mhId) {
      this.$router.push({ name: 'handoutdetail', params: { id: mhId } })
    }
  }
}
</script>

<style>

</style>
