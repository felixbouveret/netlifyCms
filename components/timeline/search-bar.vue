<template>
  <div class="search-bar-container">
    <div v-if="isInputFocus" @click="isInputFocus = false" class="take-of-background" />
    <div class="search-bar-content">
      <label v-if="label" :for="id" class="search-bar-label">
        {{ label }}
      </label>
      <div class="input-content">
        <input
          :id="id"
          :class="{'input-focus' : isInputFocus}"
          v-model.trim="computedValue"
          :placeholder="placeholder"
          :required="required"
          v-on:keyup.enter="submitFilter()"
          @focus="isInputFocus = true"
          type="text"
          autocomplete="off"
        >
        <transition name="suggestions-in-out">
          <ul v-if="suggestionList && suggestionList.length > 0 && isInputFocus" class="suggestion-list">
            <li
              v-for="(suggestion, index) in suggestionList"
              :key="index"
            >
              <button
                v-on:keyup.enter="submitFilter()"
                @click="computedValue = suggestion.title;
                        submitFilter();
                        isInputFocus = false"
                type="button"
              >
                {{ suggestion.title }}
              </button>
            </li>
          </ul>
        </transition>
      </div>

      <button @click="submitFilter()" class="submit-button" type="button">
        <img src="~assets/images/timeline/loupe.svg" alt="">
      </button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    id: {
      type: String,
      required: true
    },
    value: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      allDates: this.$store.state.blogPosts,
      filteredDates: null,
      isInputFocus: false
    }
  },
  computed: {
    computedValue: {
      get () {
        return this.value
      },
      set (value) {
        this.filterDates(value)
        this.$emit('input', value)
      }
    },
    suggestionList () {
      if (this.filteredDates) {
        return this.filteredDates.slice(0, 3)
      }
      return null
    }
  },
  mounted () {
    if (this.autofocus) {
      window.document.getElementById(this.id).focus()
    }
  },
  methods: {
    ...mapMutations({
      setFilteredBlogPosts: 'SET_FILTERED_BLOG_POSTS',
      setIsSearching: 'SET_IS_SEARCHING'
    }),
    filterDates (value) {
      if (!value || value === '') {
        this.filteredDates = null
      } else {
        const found = this.allDates.filter(
          element => element.title
            .replace(/[^\w\s]/gi, '')
            .toLowerCase()
            .search(value
              .replace(/[^\w\s]/gi, '')
              .toLowerCase()) > '-1')
        this.filteredDates = found
      }
    },
    submitFilter () {
      if (!this.computedValue || this.computedValue === '') {
        this.setFilteredBlogPosts(null)
        this.setIsSearching(false)
      } else {
        this.setFilteredBlogPosts(this.filteredDates)
        this.setIsSearching(true)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search-bar-container {
  border-radius: 10px;
  background: rgba(1, 183, 248, 0.30);
  padding: 24px;

  .search-bar-content {
    display: flex;
    flex-wrap: wrap;
    position: relative;
  }

  .search-bar-label {
    width: 100%;
    margin-bottom: 8px;
  }
  .input-content {
    position: relative;
    flex-grow: 1;
  }
  input {
    background-color: white;
    border-radius: 25px;
    transition: border .3s;
    width: 100%;
    padding: 10px 16px 10px 40px;
    font-size: 16px;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
    border: 2px solid transparent;

    &:hover, &:focus, &.input-focus {
      border-color: #01B7F8;
      outline: none;
    }
  }
  .submit-button {
    position: absolute;
    display: flex;
    width: 32px;
    height: 32px;
    padding: 0;
    border: 0;
    background-color: transparent;
    transform: translateY(-50%);
    left: 5px;
    top: 50%;
    border-radius: 24px;
    transition: .3s;
    cursor: pointer;

    &:hover, &:focus {
      background-color: rgba(1, 182, 248, 0.1);
      outline: none;
    }

    img {
      width: 16px;
      margin: auto;
    }
  }
  .suggestion-list {
    display: block;
    position: absolute;
    width: calc(100% - 32px);
    background-color: #fff;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
    padding: 10px 0;
    border-radius: 10px;
    bottom: -8px;
    right: 8px;
    transform: translateY(100%);

    li {
      list-style-type: none;
      button {
        font-size: 12px;
        text-align: left;
        color: black;
        padding: 6px 16px;
        border: 0;
        width: 100%;
        height: 100%;
        background-color: transparent;

        &:hover, &:focus {
          outline: none;
          background-color: rgba(1, 182, 248, 0.1);
        }
      }
    }
  }
}

.suggestions-in-out-enter-active, .suggestions-in-out-leave-active {
  transition: .3s;
}
.suggestions-in-out-enter,
.suggestions-in-out-leave-to {
  opacity: 0;
  bottom: -12px!important;
}
.suggestions-in-out-leave,
.suggestions-in-out-enter-to {
  opacity: 1;
  bottom: -8px!important;
}

.take-of-background {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
