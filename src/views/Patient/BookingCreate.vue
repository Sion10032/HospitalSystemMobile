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
      <van-cell title="预约日期" :value="BookingDate.toLocaleDateString()"
        is-link arrow-direction="down" @click="ShowControlSwitch('BookingDate')">
      </van-cell>
      <van-popup v-model="ShowControl.BookingDate" position="bottom">
        <van-datetime-picker type="date"
          v-model="ShowControl.curDate" :min-date="ShowControl.minDate"
          @cancel="OnBookingDateCancel" @confirm="OnBookingDateConfirm"/>
      </van-popup>
      <van-cell title="预约时间" :value="BookingTime.text"
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
      Department: null,
      BookingType: null,
      Doctor: null,
      BookingDate: new Date(),
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
        Doctors: {},
        Department: [],
        BookingType: [
          { text: '普通号', id: 0 },
          { text: '专家号', id: 1 }
        ],
        Doctor: [],
        BookingTime: []
      }
    }
  },
  created: function () {
    this.GetGroup()
    this.BookingType = this.ValueList.BookingType[0]
    this.GetBookingTime()
  },
  methods: {
    GetGroup: function () {
      this.$axios({
        methods: 'get',
        url: '/departments/'
      }).then((result) => {
        if (result.status === 200) {
          this.ValueList.Department = []
          for (let dp of result.data) {
            this.ValueList.Department.push({
              text: dp.name,
              id: dp.id
            })
          }
          this.SetDepartment(0)
        }
      })
    },
    GetBookingTime: function () {
      this.$axios({
        methods: 'get',
        url: '/reservation-time/'
      }).then((result) => {
        if (result.status === 200) {
          this.ValueList.BookingTime = []
          for (let it of result.data) {
            this.ValueList.BookingTime.push({
              id: it.id,
              start: it.start,
              end: it.end,
              text: it.start + ' - ' + it.end,
              disabled: it.reserved_num >= it.patient_num
            })
          }
        }
      })
    },
    OnLeftClick: function () {
      this.$router.go(-1)
    },
    OnRightClick: function () {
      // 先显示预约成功，然后去付款页面
      let data = {
        date: this.BookingDate.toLocaleDateString().split('/').join('-'),
        department: this.Department.id,
        time: this.BookingTime.id
      }
      if (this.BookingType.id === 1) {
        data['doctor'] = this.Doctor.id
      }
      console.log(data)
      this.$axios({
        method: 'post',
        url: '/reservations/',
        data: data
      }).then((result) => {
        alert('预约成功')
      }).catch((err) => {
        console.log(err)
        alert('预约失败')
      })
    },
    ShowControlSwitch: function (item, value = null) {
      this.ShowControl[item] = value !== null ? value : !this.ShowControl[item]
    },
    SetDepartment: function (index) {
      this.Department = this.ValueList.Department[index]
      if (this.ValueList.Doctors[this.Department.id]) {
        this.ValueList.Doctor = this.ValueList.Doctors[this.Department.id]
        this.Doctor = this.ValueList.Doctor[0]
      } else {
        this.$axios({
          methods: 'get',
          url: '/groups/' + this.Department.id + '/users'
        }).then((result) => {
          this.ValueList.Doctors[this.Department.id] = []
          for (let doc of result.data) {
            this.ValueList.Doctors[this.Department.id].push({
              text: doc.profile.name,
              id: doc.id
            })
          }
          this.ValueList.Doctor = this.ValueList.Doctors[this.Department.id]
          this.Doctor = this.ValueList.Doctor[0]
        })
      }
    },
    OnDepartmentChange: function (picker, value, index) {
      this.SetDepartment(index)
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
    }
  }
}
</script>

<style>

</style>
