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
      <van-cell title="预约科室" :value="Department && Department.text"
        is-link arrow-direction="down" @click="ShowControlSwitch('Department')">
      </van-cell>
      <van-popup v-model="ShowControl.Department" position="bottom">
        <van-picker :columns="ValueList.Department" @change="OnDepartmentChange"/>
      </van-popup>
      <van-cell title="预约类型" :value="BookingType && BookingType.text"
        is-link arrow-direction="down" @click="ShowControlSwitch('BookingType')">
      </van-cell>
      <van-popup v-model="ShowControl.BookingType" position="bottom">
        <van-picker :columns="ValueList.BookingType" @change="OnBookingTypeChange"/>
      </van-popup>
      <van-cell title="医生" :value="Doctor && Doctor.text" v-if="BookingType.id"
        is-link arrow-direction="down" @click="ShowControlSwitch('Doctor')">
      </van-cell>
      <van-popup v-model="ShowControl.Doctor" position="bottom">
        <van-picker :columns="ValueList.Doctor" @change="OnDoctorChange"/>
      </van-popup>
    </van-cell-group>
    <van-cell v-if="!BookingType.id"
      title="预约日期" :value="BookingDate && BookingDate.toLocaleDateString().split('/').join('-')"
      is-link arrow-direction="down" @click="ShowControlSwitch('BookingDate')">
    </van-cell>
    <van-cell v-if="BookingType.id"
      title="预约日期" :value="ExpertBookingDate && ExpertBookingDate.date"
      is-link arrow-direction="down" @click="ShowControlSwitch('BookingDate')">
    </van-cell>
    <van-popup v-model="ShowControl.BookingDate" position="bottom">
      <van-datetime-picker type="date" v-if="!BookingType.id"
        v-model="ShowControl.curDate" :min-date="ShowControl.minDate"
        @cancel="OnBookingDateCancel" @confirm="OnBookingDateConfirm"/>
      <van-picker v-if="BookingType.id"
        :columns="ValueList.ExpertBookingDate" @change="OnExpertBookingDateChange"/>
    </van-popup>
    <van-cell title="预约时间" :value="BookingTime && BookingTime.text"
      is-link arrow-direction="down" @click="ShowControlSwitch('BookingTime')">
    </van-cell>
    <van-popup v-model="ShowControl.BookingTime" position="bottom">
      <van-picker :columns="ValueList.BookingTime" @change="OnBookingTimeChange"/>
    </van-popup>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      Department: null,
      BookingType: null,
      Doctor: null,
      BookingDate: new Date(),
      ExpertBookingDate: '',
      BookingTime: '',
      ShowControl: {
        Department: false,
        BookingType: false,
        Doctor: false,
        BookingDate: false,
        curDate: new Date(),
        minDate: new Date(),
        BookingTime: false
      },
      ValueList: {
        ExpertBookingTimes: {},
        Department: [],
        BookingType: [
          { text: '普通号', id: 0 },
          { text: '专家号', id: 1 }
        ],
        Doctor: [],
        Date: [],
        ExpertBookingDate: [],
        BookingTime: []
      }
    }
  },
  beforeCreate: function () {
    if (!this.$store.state.isLogin) {
      alert('请登录')
      this.$router.push('/login')
    }
  },
  created: function () {
    this.GetGroup()
    this.GetBookingTime()
    this.GetExpertBookingTimes()
    this.BookingType = this.ValueList.BookingType[0]
  },
  watch: {
    Department: function (newValue, oldValue) {
      this.ValueList.Doctor = []
      for (let doc of this.$store.state.doctors[newValue.id]) {
        this.ValueList.Doctor.push({
          text: doc.profile.name,
          id: doc.id
        })
      }
      this.Doctor = this.ValueList.Doctor[0]
    },
    BookingType: function (newValue, oldValue) {
      if (!newValue.id) {
        for (let it of this.ValueList.BookingTime) {
          it.disabled = it.reserved_num >= it.patient_num
        }
      }
    },
    Doctor: function (newValue, oldValue) {
      if (newValue) {
        this.ValueList.ExpertBookingDate = []
        if (this.ValueList.ExpertBookingTimes[newValue.id]) {
          for (let it of this.ValueList.ExpertBookingTimes[newValue.id]) {
            this.ValueList.ExpertBookingDate.push(it)
          }
        }
        this.ExpertBookingDate = (this.ValueList.ExpertBookingDate || [])[0]
      }
    },
    ExpertBookingDate: function (newValue, oldValue) {
      if (this.BookingType.id) {
        for (let it of this.ValueList.BookingTime) {
          it.disabled =
            !newValue ||
            (it.reserved_num >= it.patient_num) ||
            (it.start < newValue.start) ||
            (it.end > newValue.end)
        }
      }
    }
  },
  methods: {
    GetGroup: function () {
      if (this.$store.state.isCheck) {
        this.ValueList.Department = []
        for (let dp of this.$store.state.department) {
          this.ValueList.Department.push({
            text: dp.name,
            id: dp.id
          })
        }
        this.Department = this.ValueList.Department[0]
      }
    },
    GetBookingTime: function () {
      if (this.$store.state.isCheck) {
        this.ValueList.BookingTime = []
        for (let it of this.$store.state.bookingTimes) {
          this.ValueList.BookingTime.push({
            id: it.id,
            start: it.start,
            end: it.end,
            text: it.start + ' - ' + it.end,
            reserved_num: it.reserved_num,
            patient_num: it.patient_num,
            disabled: it.reserved_num >= it.patient_num
          })
        }
      }
    },
    GetExpertBookingTimes: function () {
      this.$axios({
        method: 'get',
        url: '/visits/'
      }).then((result) => {
        this.ValueList.ExpertBookingTimes = {}
        for (let it of result.data) {
          if (!this.ValueList.ExpertBookingTimes[it.doctor]) {
            this.ValueList.ExpertBookingTimes[it.doctor] = []
          }
          it.text = it.date
          this.ValueList.ExpertBookingTimes[it.doctor].push(it)
        }
      })
    },
    OnLeftClick: function () {
      this.$router.go(-1)
    },
    OnRightClick: function () {
      // 先显示预约成功，然后去付款页面
      let data = {
        date: this.BookingType.id ? this.ExpertBookingDate.date : this.BookingDate.toLocaleDateString().split('/').join('-'),
        department: this.Department.id,
        time: this.BookingTime.id
      }
      if (this.BookingType.id === 1) {
        data['doctor'] = this.Doctor.id
      }
      this.$axios({
        method: 'post',
        url: '/reservations/',
        data: data
      }).then((result) => {
        alert('预约成功')
        console.log(result)
        this.$router.replace({ name: 'fee', params: { id: result.data.pay.id } })
      }).catch((err) => {
        console.log(err)
        alert('预约失败')
      })
    },
    ShowControlSwitch: function (item, value = null) {
      this.ShowControl[item] = value !== null ? value : !this.ShowControl[item]
    },
    OnDepartmentChange: function (picker, value, index) {
      this.Department = this.ValueList.Department[index]
    },
    OnBookingTypeChange: function (picker, value, index) {
      this.BookingType = value
    },
    OnDoctorChange: function (picker, value, index) {
      this.Doctor = value
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
    },
    OnExpertBookingDateChange: function (picker, value, index) {
      this.ExpertBookingDate = value
    }
  }
}
</script>

<style>

</style>
