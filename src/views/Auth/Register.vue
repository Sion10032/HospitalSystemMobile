<template>
  <div class="register-wrapper">
    <van-cell-group title="基本信息">
      <van-field
        v-model="Username"
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        @click-right-icon="$toast('question')"
      />
      <van-field
        v-model="PhoneNumber"
        label="手机"
        right-icon="question-o"
        placeholder="请输入手机号"
        @click-right-icon="$toast('question')"
      />
      <van-field
        v-model="Password"
        type="password"
        label="密码"
        placeholder="请输入密码"
      />
    </van-cell-group>
    <van-cell-group title="详细信息">
      <van-cell title="性别" :value="Gender ? '男' : '女'"
        is-link arrow-direction="down" @click="ShowControlSwitch('Gender')">
      </van-cell>
      <van-popup v-model="ShowControl.Gender" position="bottom">
        <van-picker :columns="ValueList.Gender" @change="OnGenderChange"/>
      </van-popup>
      <van-cell title="出生日期" :value="Birthday.toLocaleDateString()"
        is-link arrow-direction="down" @click="ShowControlSwitch('Birthday')">
      </van-cell>
      <van-popup v-model="ShowControl.Birthday" position="bottom">
        <van-datetime-picker v-model="ShowControl.curDate"
          type="date" :min-date="ShowControl.minDate"
          @cancel="OnBrithdayCancel" @confirm="OnBrithdayConfirm"/>
      </van-popup>
    </van-cell-group>
    <div class="divider"></div>
    <div class="register-button-wrapper">
      <van-button style="width: 80px; height: 40px;" type="primary">注册</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      Username: '',
      PhoneNumber: '',
      Password: '',
      Gender: true,
      Birthday: new Date(),
      ShowControl: {
        Gender: false,
        Birthday: false,
        curDate: new Date(),
        minDate: new Date('1900/01/01')
      },
      ValueList: {
        Gender: ['男', '女']
      }
    }
  },
  methods: {
    ShowControlSwitch: function (item, value = null) {
      this.ShowControl[item] = value !== null ? value : !this.ShowControl[item]
    },
    OnGenderChange: function (picker, value, index) {
      this.Gender = value === '男'
    },
    OnBrithdayCancel: function () {
      this.ShowControlSwitch('Birthday', false)
    },
    OnBrithdayConfirm: function (value) {
      this.Birthday = value
      this.ShowControlSwitch('Birthday', false)
    }
  }
}
</script>

<style>
.register-button-wrapper {
  width: 100vw;
  box-sizing: border-box;
  padding: 0 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
