<template>
  <div class="register-wrapper">
    <van-cell-group title="基本信息">
      <van-field
        v-model="username"
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        @click-right-icon="$toast('question')"
      />
      <van-field
        v-model="email"
        label="邮箱"
        right-icon="question-o"
        placeholder="请输入邮箱"
        @click-right-icon="$toast('question')"
      />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
      />
    </van-cell-group>
    <van-cell-group title="详细信息">
      <van-cell title="性别" :value="profile.gender == 1 ? '男' : '女'"
        is-link arrow-direction="down" @click="ShowControlSwitch('Gender')">
      </van-cell>
      <van-popup v-model="ShowControl.Gender" position="bottom">
        <van-picker :columns="ValueList.Gender" @change="OnGenderChange"/>
      </van-popup>
      <van-field
        v-model="profile.name"
        type="text"
        label="姓名"
        placeholder="请输入姓名"
      />
      <van-field
        v-model="profile.identify_id"
        type="text"
        label="身份证"
        placeholder="请输入身份证"
      />
      <van-field
        v-model="profile.phone"
        type="text"
        label="手机号"
        placeholder="请输入手机号"
      />
      <van-field
        v-model="profile.address"
        type="text"
        label="地址"
        placeholder="请输入地址"
      />
    </van-cell-group>
    <div class="divider"></div>
    <div class="register-button-wrapper">
      <van-button type="primary"
        style="width: 80px; height: 40px;"
        @click="OnRegisterClick">注册</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      username: '',
      email: '',
      password: '',
      profile: {
        gender: 1,
        occupation: 34,
        name: '',
        identify_id: '',
        phone: '',
        address: ''
      },
      ShowControl: {
        Gender: false
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
      this.profile.gender = value === '男' ? 1 : 0
    },
    OnRegisterClick: function () {
      this.$axios({
        method: 'POST',
        url: '/users/',
        data: {
          username: this.username,
          email: this.email,
          password: this.password,
          profile: {
            gender: this.profile.gender,
            occupation: 34,
            name: this.profile.name,
            identify_id: this.profile.identify_id,
            phone: this.profile.phone,
            address: this.profile.address
          }
        }
      }).then((result) => {
        alert('注册成功')
        this.$router.push('/login')
      }).catch((err) => {
        console.log(err)
        alert('注册失败')
      })
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
