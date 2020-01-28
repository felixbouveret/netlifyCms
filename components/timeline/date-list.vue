<template>
  <section class="date-list">
    <div class="inner">
      <div class="line" />
      <div v-if="isSearching" class="date-list-container">
        <date v-for="(date, index) in allFilteredDates" :key="index" :date-infos="date" />
      </div>
      <div v-else class="date-list-container">
        <date v-for="(date, index) in allDates" :key="index" :date-infos="date" />
      </div>
    </div>
  </section>
</template>

<script>
import Date from '~/components/timeline/date'

export default {
  components: {
    Date
  },

  computed: {
    allDates () {
      return this.$store.state.blogPosts
    },
    allFilteredDates () {
      return this.$store.state.filteredBlogPosts
    },
    isSearching () {
      return this.$store.state.isSearching
    }
  }
}
</script>

<style lang="scss">
  .date-list-container {
    display: flex;
    flex-direction: column;
    align-content: flex-start;
  }

  .date-container {
    margin-top: 64px;
    padding-right: 40px;
    justify-content: flex-end;

    &::after {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      background-color: #0A3F5A;
      border-radius: 8px;
      transform: translate(50%, -50%);
      right: 0;
      top: 50%;
    }
    &:first-child {
      margin-top: 0;

      &::before {
        content: "";
        position: absolute;
        height: 50%;
        background-color: #FFF;
        width: 10px;
        right: -5px;
      }
    }
    &:nth-child(2n){
      justify-content: flex-start;
      align-self: flex-end;
      padding-right: 0;
      padding-left: 40px;

      &::after{
        transform: translate(-50%, -50%);
        left: 0;
        top: 50%;
      }
    }
  }
</style>

<style lang="scss" scoped>
.inner {
  position: relative;
  padding: 64px 0;

  .line {
    position: absolute;
    width: 3px;
    height: 100%;
    transform: translateX(-50%);
    left: 50%;
    background-color: black;
  }
}
</style>
