<template>
  <section class="hero">
    <div class="inner">
      <img src="~assets/images/timeline/hero.png" alt="">
      <div class="hero-desc">
        <h2>Explore the web history</h2>
      </div>
    </div>
  </section>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .hero {
    height: 100vh;
    min-height: 400px;
    max-height: 700px;

    .inner {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .hero-desc {

        margin-left: 64px;
        h2 {
          font-size: 54px;
        }
      }
    }

    img {
      max-width: 450px;
      border-radius: 5px;
    }
  }
</style>
