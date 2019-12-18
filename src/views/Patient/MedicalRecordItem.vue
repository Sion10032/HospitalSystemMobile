<template>
  <div v-if="record" class="medical-record-item-wrapper" @click="GoMedicalRecordDetail">
    <van-cell :value="record.time" clickable>
      <template slot="title">
        <span class="custom-title">{{ record.lab }} </span>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    record: {
      id: Number,
      lab: String,
      time: String
    }
  },
  methods: {
    GoMedicalRecordDetail: function () {
      this.$router.push({ name: 'medicalrecord', params: { id: this.record.id.toString() } })
    }
  }
}
</script>

<style scoped>
.medical-record-item-wrapper {
}
p {
  font-size: 14px;
  margin: 6px;
}
</style>
