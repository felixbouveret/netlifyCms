<template>
  <div>
    <Header />
    <hero />
    <date-list />
  </div>
</template>

<script>
import Header from '~/components/header'
import DateList from '~/components/timeline/date-list'
import Hero from '~/components/timeline/hero'

export default {
  components: {
    DateList,
    Header,
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
