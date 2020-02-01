<template>
  <section class="hero">
    <div class="inner">
      <div class="hero-desc">
        <div class="hero-desc-container">
          <h2>Explore the web history</h2>
          <p>Découvre les dates clés de l’histoire de notre word wide web et celles  des technologies et découvertes qui l’entourent.</p>
          <search-bar id="search-bar" v-model.trim="test" placeholder="Lance une recherche !" />
        </div>
      </div>
      <img src="~assets/images/timeline/hero.png" alt="">
    </div>
  </section>
</template>

<script>
import SearchBar from '~/components/timeline/search-bar'

export default {
  components: {
    SearchBar
  },
  data () {
    return {
      test: null
    }
  }
}
</script>

<style lang="scss" scoped>
.hero {
  height: 100vh;
  min-height: 400px;
  max-height: 700px;

  .inner {
    height: 100%;
    width: 95%;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;

    .hero-desc {
      @media (min-width: 920px) {
        margin-right: 32px;
      }

      .hero-desc-container {
        max-width: 450px;
      }
      h2 {
        font-size: 54px;
        margin-bottom: 16px;
      }
      p {
        margin-bottom: 24px;
        font-size: 18px;
        line-height: 130%;
      }
    }
  }

  img {
    display: none;

    @media (min-width: 920px) {
      display: block;
      max-width: 450px;
      border-radius: 5px;
    }
  }
}

</style>
