<template>
  <div class="date-container">
    <div @click="openPopup = !openPopup" class="date-content">
      <h3 class="title">
        {{ dateInfos.title }}
      </h3>
      <span class="date">{{ spliteDate }}</span>
    </div>
    <date-popup :is-displayed="openPopup" :dateDatas="dateInfos" @change="openPopup = false" />
  </div>
</template>

<script>
import DatePopup from '~/components/timeline/date-popup'

export default {
  components: {
    DatePopup
  },

  props: {
    dateInfos: {
      type: Object,
      default: null
    }
  },

  data () {
    return {
      openPopup: false
    }
  },

  computed: {
    spliteDate () {
      if (parseInt(this.dateInfos.date.split('-')[0]) > 3000) {
        return this.dateInfos.date.split('-')[0] - 2000
      }
      return this.dateInfos.date
    }
  }
}
</script>

<style lang="scss" scopped>
  .date-container {
    position: relative;
    display: flex;
    width: 50%;

    .date-content {
      max-width: 400px;
      flex-grow: 1;
      box-shadow: 0 4px 14px 0 #0000001A;
      border-radius: 4px;
      padding: 16px;
      background-color: white;
      cursor: pointer;
    }

  }
</style>
