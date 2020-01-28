export const state = () => ({
  blogPosts: [],
  filteredBlogPosts: null,
  isSearching: false
})

export const mutations = {
  SET_BLOG_POSTS (state, list) {
    state.blogPosts = list
  },
  SET_FILTERED_BLOG_POSTS (state, list) {
    state.filteredBlogPosts = list
  },
  SET_IS_SEARCHING (state, data) {
    state.isSearching = data
  }
}

export const actions = {
  async nuxtServerInit ({ commit }) {
    const files = await require.context('~/assets/content/dateList/', false, /\.json$/)
    const blogPosts = files.keys().map(
      (key) => {
        const res = files(key)
        res.slug = key.slice(2, -5)
        return res
      }
    )
    await commit('SET_BLOG_POSTS', blogPosts)
  }
}
