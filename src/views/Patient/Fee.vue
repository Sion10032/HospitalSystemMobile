<template>
  <div>
    <van-nav-bar
      title="缴费详情"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <van-cell-group v-if="feeInfo">
      <van-cell
        v-for="it in feeInfo.items"
        :key="it.id"
        :title="it.name"
        :value="it.price"
        :label="feeInfo.receive ? '已缴费' : '未缴费'">
      </van-cell>
    </van-cell-group>
    <van-cell v-if="feeInfo"
      title="总金额"
      :value="totalFee">
    </van-cell>
    <div class="button-wrapper" v-if="feeInfo && !feeInfo.receive">
      <van-button class="fee-button" @click="pay(2)">银联付款</van-button>
      <van-button class="fee-button" @click="pay(3)" type="primary">支付宝付款</van-button>
      <van-button class="fee-button" @click="pay(4)" type="info">微信付款</van-button>
    </div>
 </div>
</template>

<script>
export default {
  props: {
    id: String
  },
  data: function () {
    return {
      feeInfo: null
    }
  },
  created: function () {
    this.$axios({
      method: 'get',
      url: '/pay-records/' + this.id + '/'
    }).then((res) => {
      this.feeInfo = res.data
    })
  },
  computed: {
    totalFee: function () {
      let res = 0
      for (let it of this.feeInfo.items) {
        res += it.price
      }
      return res
    }
  },
  methods: {
    pay: function (way) {
      this.$axios({
        method: 'put',
        url: '/pay-records/' + this.id + '/',
        data: {
          method: way,
          receive: this.totalFee
        }
      }).then((res) => {
        if (res.status === 200) {
          this.feeInfo.receive = this.totalFee
          alert('缴费成功')
          this.$router.go(-1)
        }
      })
    }
  }
}
</script>

<style>
.button-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
}
.fee-button {
  width: 200px;
  height: 40px;
  margin: 10px 0;
}
</style>
