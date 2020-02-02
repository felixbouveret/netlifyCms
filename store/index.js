export const state = () => ({
  blogPosts: [],
  filteredBlogPosts: null,
  isSearching: false,
  decadeList: []
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
  },
  SET_DECADE_LIST (state, list) {
    state.decadeList = list
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
    let decadeArray = []
    blogPosts.sort((a, b) => new Date(a.bigDate).getFullYear() - new Date(b.bigDate).getFullYear())

    for (let index = 0; index < blogPosts.length; index++) {
      const element = blogPosts[index]
      const dateDecade = new Date(element.bigDate).getFullYear().toString().slice(0, 3) + '0'

      element.decade = parseInt(dateDecade)

      decadeArray.push(dateDecade)
      decadeArray = [...new Set(decadeArray)]
    }

    await commit('SET_DECADE_LIST', decadeArray)
    await commit('SET_BLOG_POSTS', blogPosts)
  }
}
