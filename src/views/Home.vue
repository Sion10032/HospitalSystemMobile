<template>
  <div class="home">
    <van-search placeholder="请输入搜索关键词" v-model="searchValue" />
    <van-grid  :column-num="3">
      <van-grid-item icon="photo-o" text="新建预约" to="bookingcreate"/>
      <van-grid-item icon="photo-o" text="预约信息" to="bookings"/>
      <van-grid-item icon="photo-o" text="病历查看" to="madicalrecords"/>
    </van-grid>
    <van-panel title="当前预约" style="overflow: hidden;">
      <booking-item
        v-for="item in bookings"
        :key="item.id"
        :booking="item"/>
    </van-panel>
    <van-panel v-if="this.rawMedicineHandout" title="待领药品" style="overflow: hidden;">
      <van-cell
        v-for="mh in medicineHandouts"
        :key="mh.id"
        :title="'领药单' + mh.id"
        :value='$store.state.handoutStatus[mh.handout_status]'
        @click="goHandoutDetail(mh.id)"
        clickable>
      </van-cell>
    </van-panel>
    <van-panel title="排队情况" style="overflow: hidden;">
    </van-panel>
  </div>
</template>

<script>
import BookingItem from './Patient/BookingItem.vue'

export default {
  name: 'home',
  components: {
    BookingItem
  },
  data: function () {
    return {
      searchValue: '',
      bookings: [],
      active: 0,
      rawMedicineHandout: null
    }
  },
  computed: {
    medicineHandouts: function () {
      let res = []
      for (let it of this.rawMedicineHandout) {
        console.log()
        if (it.prescription.patient === this.$store.state.user.id && it.handout_status < 4) {
          res.push(it)
        }
      }
      return res
    }
  },
  created: function () {
    this.bookings = []
    this.$axios({
      method: 'get',
      url: '/users/' + this.$store.state.user.id + '/reservations/'
    }).then((res) => {
      for (let it of res.data) {
        if (it.is_finish) {
          continue
        }
        let re = {
          id: it.id,
          is_paid: it.is_paid,
          lab: this.$store.getters.getLab(it.department),
          date: it.date,
          time: this.$store.getters.getTime(it.time)
        }
        if (it.is_expert) {
          re.doctor = this.$store.getters.getDoctor(it.doctor)
        }
        this.bookings.push(re)
      }
    })
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
