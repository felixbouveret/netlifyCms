<template>
  <div :id="dateInfos.slug" class="date-container">
    <div @click="openPopup = !openPopup" class="date-content">
      <div class="date-image">
        <img :src="dateInfos.thumbnail" alt="">
      </div>
      <div class="date-infos">
        <h3 class="title">
          {{ dateInfos.title }}
        </h3>
        <span v-if="dateInfos.smallDate" class="date">{{ smallDate }}-{{ year }}</span>
        <span v-else class="date">{{ year }}</span>
      </div>
    </div>
    <date-popup :is-displayed="openPopup" :dateDatas="popupDatas" @change="openPopup = false" />
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
    smallDate () {
      return new Date(this.dateInfos.smallDate).getDate() + '-' + new Date(this.dateInfos.smallDate).getMonth()
    },
    year () {
      return new Date(this.dateInfos.bigDate).getFullYear()
    },
    popupDatas () {
      return this.dateInfos
    }
  }
}
</script>

<style lang="scss" scopped>
  .date-container {
    position: relative;
    box-shadow: 0 4px 14px 0 #0000001A;
    border-radius: 25px;
    overflow: hidden;
    height: 350px;
    cursor: pointer;
    background-color: white;
    transition: top .3s;
    top: 0;

    &:hover {
      top: -5px
    }

    .date-content {
      position: relative;
      height: 100%;
      .date-infos {
        position: absolute;
        bottom: 0;
        padding: 16px;
        background-color: white;
        width: 100%;

        &::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 16px;
          background-image: url("~assets/images/timeline/bubble.svg");
          left: 0;
          top: 1px;
          background-size: cover;
          background-position-x: center;
          transform: translateY(-100%);
        }
      }
    }
    .date-image {
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
</style>
