<template>
  <div class="cms-container">
    <hero :all-dates="allDates" />
    <date-list :all-dates="allDates" />
  </div>
</template>

<script>
// import { mapActions, mapState, mapGetters } from "vuex";
import DateList from '~/components/timeline/date-list'
import Hero from '~/components/timeline/hero'

export default {
  components: {
    DateList,
    Hero
  },
  head () {
    return {
      script: [
        { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }
      ]
    }
  },
  computed: {
    allDates () {
      return this.$store.state.filteredBlogPosts ? this.$store.state.filteredBlogPosts : this.$store.state.blogPosts
    }
  }
}
</script>

<style scoped lang="scss">
.cms-container-form {
  background-color: whitesmoke;
  padding: 32px 0;
}

.button {
  padding: 4px 24px;
  background-color: #00b388;
  color: white;
  border-radius: 4px;
  line-height: 40px;
  border: none;
  transition: 0.3s;

  &.loading {
    background-color: gray;
    color: black;
    pointer-events: none;
  }
}

.loader {
  width: 64px;
  height: 64px;
  border-radius: 50px;
  border: 4px transparent solid;
  border-left-color: green;
  margin: 24px auto;
  animation: loader 1s infinite linear;

  @keyframes loader {
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
