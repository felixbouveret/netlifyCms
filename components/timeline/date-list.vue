<template>
  <section class="date-list">
    <div class="inner">
      <div v-if="isSearching" class="date-list-container">
        <transition-group name="date-in-out" tag="div">
          <date v-for="date in allFilteredDates" :key="date.slug" :date-infos="date" class="date" />
        </transition-group>
      </div>
      <div v-else class="date-list-container">
        <transition-group name="date-in-out" tag="div">
          <date v-for="date in allDates" :key="date.slug" :date-infos="date" class="date" />
        </transition-group>
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

<style lang="scss" scoped>
.date-list {
  padding: 32px 0;
  background-image: url("~assets/images/timeline/background.png");
  background-size: cover;
}
.inner {
  max-width: 1200px;
  width: 95%;
  margin: auto;

  .date-list-container > div {
    @media (min-width: 720px) {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-gap: 32px;
    }
    @media (min-width: 960px) {
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 32px;
    }
    .date {
      margin: 0 auto 24px;
      max-width: 350px;
      @media (min-width: 720px) {
        margin: 0;
        max-width: none;
      }
    }
  }
}

.date-in-out-enter-active, .date-in-out-leave-active {
  transition: all .3s;
}
.date-in-out-enter, .date-in-out-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
