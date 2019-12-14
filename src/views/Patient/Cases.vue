
<template>
  <div class="cases-record-wrapper">
    <van-nav-bar
      title="病例查看"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in list"
        :key="item"
        :title="item"
      />
    </van-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [1, 2, 3],
      loading: false,
      finished: false
    }
  },

  methods: {
    onClickLeft: function () {
      this.$router.go(-1)
    },
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
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
