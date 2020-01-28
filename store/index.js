export const state = () => ({
  blogPosts: []
})

export const mutations = {
  SET_BLOG_POSTS (state, list) {
    state.blogPosts = list
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
