<template>
  <div v-if="isDisplayed" class="popup">
    <div class="popup-content">
      <div class="popup-header">
        <div class="popup-header-desc">
          <h3>{{ title }}</h3>
          <span>{{ date }}</span>
        </div>
        <img :src="image" :alt="title">
      </div>
      <div v-html="$md.render(description)" class="popup-text" />
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
      return this.dateFormated
    },
    image () {
      return this.dateDatas.thumbnail
    }
  },

  methods: {
    mayCloseMe () {
      document.querySelector("body").style.overflow = ""
      this.$emit('change', false)
    }
  },
}
</script>

<style lang="scss" scoped>
.popup {
  cursor: initial;
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
  display: flex;
  flex-direction: column;
  background-color: white;
  z-index: 2;
  max-width: 700px;
  max-height: 700px;
  width: 95%;
  margin: auto;
  padding: 32px;
  border-radius: 4px;

  .popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .popup-header-desc {
      h3 {
        font-size: 28px;
      }
      span {
        display: block;
        margin-top: 8px;
        font-size: 18px;
      }
    }

    img {
      max-width: 300px;
      max-height: 300px;
      object-fit: contain;
    }
  }
  .popup-text {
    margin-top: 24px;
    flex-grow: 1;
    overflow-y: auto;
    p {
      line-height: 140%;
      color: red;
    }
  }

}
</style>
<style lang="scss">
.popup-text p {
  line-height: 140%;
}
</style>
