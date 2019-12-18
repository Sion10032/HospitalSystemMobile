<template>
  <div v-if="medicalrecord" class="medical-record-item-wrapper" @click="GoMedicalRecordDetail">
    <van-cell :value="record.time" clickable>
      <template slot="title">
        <span class="custom-title">{{ medicalrecord.time }} </span>
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
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
