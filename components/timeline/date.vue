<template>
  <div :id="dateInfos.slug" class="date-container">
    <div @click="openPopup = !openPopup" class="date-content">
      <h3 class="title">
        {{ dateInfos.title }}
      </h3>
      <span class="date">{{ spliteDate }}</span>
    </div>
    <date-popup :is-displayed="openPopup" :dateFormated="spliteDate" :dateDatas="dateInfos" @change="openPopup = false" />
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
      openPopup: false,
      date: new Date(this.dateInfos.date)
    }
  },

  computed: {
    spliteDate () {
      if (this.date.getFullYear() > 3000) {
        return this.date.getFullYear() - 2000
      }
      return this.date.getDate() + '-' + (this.date.getMonth() + 1) + '-' + this.date.getFullYear()
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
