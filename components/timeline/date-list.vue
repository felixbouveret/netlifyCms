<template>
  <div class="root-node">
    <section v-if="isSearching" class="date-list-container no-decades">
      <transition-group name="date-in-out" tag="div" class="inner">
        <date v-for="date in allFilteredDates" :key="date.slug" :date-infos="date" class="date" />
      </transition-group>
    </section>

    <template v-else>
      <section v-for="decade in decadeList" :key="decade" class="date-list-container decades">
        <h2 class="decade-title" :class="{decade : decade }">
          <div class="inner">
            <span>{{ decade }}</span>
          </div>
        </h2>
        <div class="inner">
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
  },
  mounted () {
    const decadeSections = document.querySelectorAll('.decades')
    const decadeHeaders = document.querySelectorAll('.decade-title')

    window.onscroll = () => {
      const doc = document.documentElement
      const scrollOffset = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0)
      for (let index = 0; index < decadeSections.length; index++) {
        const element = decadeSections[index];
        const elementHeader = decadeHeaders[index]
        const nextElement = index + 1 ? decadeHeaders[index + 1] : null

        if(element.offsetTop <=  scrollOffset) {
          element.style.paddingTop = elementHeader.clientHeight + 'px'

          elementHeader.classList.add("heading-fixed")

          if(nextElement && scrollOffset + elementHeader.clientHeight >= nextElement.offsetTop) {
            elementHeader.style.position = "absolute"
            elementHeader.style.top = nextElement.offsetTop - elementHeader.clientHeight + "px"
          } else {
            elementHeader.style.position = ""
            elementHeader.style.top = ""
          }

        } else {
          element.style.paddingTop = ''

          elementHeader.classList.remove("heading-fixed")

        }
      }
    }
  },
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
      display: inline-block;
      position: relative;
      font-size: 48px;
      overflow: hidden;
      width: 100%;

      .inner {
        margin: auto;
        width: 95%;
        max-width: 1200px;
      }

      &.heading-fixed {
        position: fixed;
        top: 0;
        z-index: 10;
      }

      &.decade span {
        animation: headingsAnimation .5s;
      }

      span {
        position: relative;
        bottom: 0;
        opacity: 1;
        &::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 24px;
          background-color: #D9F4FE;
          border-radius: 50px;
          z-index: -1;
          bottom: 0;
          transform-origin: left;
        }
      }
      &.decade::before {
        animation: bgrAnimation .5s;
      }

      @keyframes headingsAnimation {
        0% {
          bottom: -10px;
          opacity: 0;
        }
        100% {
          bottom: 0;
          opacity: 1;
        }
      }
      @keyframes bgrAnimation {
        0% {
          transform: scaleX(0);
        }
        100% {
          transform: scaleX(1);
        }
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
