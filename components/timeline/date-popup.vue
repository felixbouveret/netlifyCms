<template>
  <div v-if="isDisplayed" class="popup">
    <div class="popup-content">
      <img :src="image" :alt="title">
      <div class="popup-desc">
        <h3>{{ title }}</h3>
        <span>{{ date }}</span>
        <div v-html="$md.render(description)" class="popup-text" />
      </div>
    </div>
    <div @click="mayCloseMe" class="popup-background" />
  </div>
</template>

<script>
export default {
  model: {
    prop: 'isDisplayed',
    event: 'change'
  },

  props: {
    isDisplayed: {
      type: Boolean,
      required: true
    },
    dateDatas: {
      type: Object,
      default: null
    },
    dateFormated: {
      type: String,
      default: ''
    }
  },

  computed: {
    title () {
      return this.dateDatas.title
    },
    description () {
      return this.dateDatas.body
    },
    date () {
      return new Date(this.dateDatas.date)
    },
    image () {
      return this.dateDatas.thumbnail
    }
  },

  methods: {

    mayCloseMe () {
      this.$emit('change', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.popup {
  display: flex;
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  .popup-background {
    background-color: #00000050;
    width: 100%;
    height: 100%;
    position: absolute;
  }
}

.popup-content {
  background-color: white;
  z-index: 2;
  position: relative;
  display: flex;
  margin: auto;
  padding: 24px;
  border-radius: 5px;
  max-width: 900px;

  img {
    width: 40%;
    margin-right: 16px;
  }

  h3 {
    font-size: 32px;
  }
  .popup-text {
    margin-top: 16px;
    line-height: 20px;
  }
}
</style>
