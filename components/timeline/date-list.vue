<template>
  <div class="root-node">
    <section v-if="isSearching" class="date-list-container no-decades">
      <transition-group name="date-in-out" tag="div" class="inner">
        <date v-for="date in allFilteredDates" :key="date.slug" :date-infos="date" class="date" />
      </transition-group>
    </section>

    <template v-else>
      <section v-for="decade in decadeList" :key="decade" class="date-list-container decades">
        <div class="inner">
          <h2>{{ decade }}</h2>
          <transition-group name="date-in-out" tag="div" class="date-list">
            <date v-for="(date) in allDates"
                  :key="date.slug"
                  v-if="date.decade === parseInt(decade)"
                  :date-infos="date"
                  class="date" />
          </transition-group>
        </div>
      </section>
    </template>
  </div>
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
    decadeList () {
      return this.$store.state.decadeList
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
.root-node {
  padding: 32px 0;
  background-image: url("~assets/images/timeline/background.png");
  background-size: contain;
}

.date-list-container {
  &.decades {
    h2 {
      display: inline;
      position: relative;
      font-size: 48px;

      &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 24px;
        background-color: #D9F4FE;
        border-radius: 50px;
        z-index: -1;
        bottom: 0;
      }
    }
  }
  &.no-decades .inner ,.date-list {
    margin: 32px auto 154px;
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


.inner {
  max-width: 1200px;
  width: 95%;
  margin: auto;

  .date-list-container.no-decades > div {

  }
  .date-list-container.decades section {
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
