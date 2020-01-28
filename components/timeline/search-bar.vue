<template>
  <div class="search-bar-container">
    <label v-if="label" :for="id" class="search-bar-label">
      {{ label }}
    </label>
    <div class="input-content">
      <input
        :id="id"
        v-model.trim="computedValue"
        :placeholder="placeholder"
        :required="required"
        v-on:keyup.enter="submitFilter()"
        type="text"
        autocomplete="off"
      >

      <ul v-if="suggestionList && suggestionList.length > 0" class="suggestion-list">
        <li
          v-for="(suggestion, index) in suggestionList"
          :key="index"
          @click="computedValue = suggestion.title; submitFilter()"
        >
          {{ suggestion.title }}
        </li>
      </ul>
    </div>

    <button @click="submitFilter()" type="button">
      Rechercher
    </button>
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
      filteredDates: null
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
      setFilteredBlogPosts: 'SET_FILTERED_BLOG_POSTS'
    }),
    filterDates (value) {
      if (!value || value === '') {
        this.filteredDates = null
      } else {
        const found = this.allDates.filter(element => element.title.toLowerCase().search(value.toLowerCase()) > '-1')
        this.filteredDates = found
      }
    },
    submitFilter () {
      if (!this.computedValue) {
        this.setFilteredBlogPosts(null)
      } else {
        this.setFilteredBlogPosts(this.filteredDates)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search-bar-container {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  .search-bar-label {
    width: 100%;
    margin-bottom: 8px;
  }
  .input-content {
    position: relative;
    flex-grow: 1;
  }
  input {
    width: 100%;
    border: solid #C3C3C3 2px;
    border-radius: 4px;
    padding: 8px 16px;
    transition: border .3s;
    font-size: 16px;

    &:hover, &:focus {
      border-color: #01B7F8;
      outline: none;
    }
  }
  button {
    border-radius: 4px;
    margin-left: 16px;
  }
  .suggestion-list {
    display: block;
    position: absolute;
    width: 100%;
    background-color: #fff;
    box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
    padding: 8px 0;
    border-radius: 4px;
    bottom: 0;
    transform: translateY(100%);
    font-size: 12px;

    li {
      list-style-type: none;
      padding: 4px 8px;

      &:hover {
        background-color: #00000007;
      }
    }
  }
}
</style>
