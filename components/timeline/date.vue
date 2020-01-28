<template>
  <div :id="dateInfos.slug" class="date-container">
    <div @click="openPopup = !openPopup" class="date-content">
      <h3 class="title">
        {{ dateInfos.title }}
      </h3>
      <span v-if="dateInfos.smallDate" class="date">{{ smallDate }}-{{ year }}</span>
      <span v-else class="date">{{ year }}</span>
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
      openPopup: false,
      smallDate: new Date(this.dateInfos.smallDate).getDate() + '-' + new Date(this.dateInfos.smallDate).getMonth(),
      year: new Date(this.dateInfos.bigDate).getFullYear()
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
