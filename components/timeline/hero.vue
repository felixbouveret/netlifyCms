<template>
  <section class="hero">
    <div class="inner">
      <div class="hero-desc">
        <div class="hero-desc-container">
          <h2>Explore the web history</h2>
          <search-bar id="search-bar" label="Find your date" />
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
        margin-right: -32px;
        background-color: rgba(1, 182, 248, 0.25);
        padding: 24px 64px 24px;
        border-radius: 4px;
        height: 320px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .hero-desc-container {
          max-width: 450px;
        }
        h2 {
          font-size: 54px;
          margin-bottom: 16px;
        }
      }
    }

    img {
      max-width: 450px;
      border-radius: 5px;
    }
  }
</style>
