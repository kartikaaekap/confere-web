export const state = () => {
  return {
    auth: null,
    isSidebarOpen: false,
    variables: null,
    isInit: false,
    user: null
  }
}

export const mutations = {
  setUser (state, payload) {
    state.user = payload
  },
  deleteUser (state) {
    state.user = null
  },
  toggleSidebar (state, payload) {
    state.isSidebarOpen = typeof payload === 'boolean' ? payload : !state.isSidebarOpen
  },
  updateVariables (state, payload) {
    state.variables = payload
  },
  isInitTrue (state) {
    state.isInit = true
  },
  isInitFalse (state) {
    state.isInit = false
  }
}
export const actions = {
  useAPI (context, { method, url, data, token }) {
    // if (token) {
    //   setHeader
    // }
    return new Promise((resolve, reject) => {
      this.$axios[method](url, data)
        .then(({ data: response }) => resolve(response.data || response))
        .catch(({ response: { status: statusCode, data: { message } } }) => {
          this.$toast.error(message)
          // eslint-disable-next-line prefer-promise-reject-errors
          reject({ statusCode, message })
        })
    })
  },
  getItems ({ dispatch }, payload) {
    return dispatch('useAPI', { method: 'get', url: `${process.env.baseUrl}/api/${payload}` })
  },
  createItem ({ dispatch }, [url, data]) {
    return dispatch('useAPI', { method: 'post', url: `${process.env.baseUrl}/api/${url}`, data })
  },
  updateItem ({ dispatch }, [url, data]) {
    return dispatch('useAPI', { method: 'put', url: `${process.env.baseUrl}/api/${url}`, data })
  },
  deleteItem ({ dispatch }, payload) {
    return dispatch('useAPI', { method: 'delete', url: `${process.env.baseUrl}/api/${payload}` })
  },

  // auth-related actions
  login (context, payload) {
    return this.dispatch('createItem', ['signin', payload])
    // return new Promise((resolve, reject) => {
    //   this.$auth
    //     .loginWith('local', { data: payload })
    //     .then(() => {
    //       this.$toast.success('Welcome back!')
    //       resolve()
    //     })
    //     .catch(({ response: { data: { message } } }) => {
    //       this.$toast.error(message)
    //       reject(message)
    //     })
    // })
  },
  createUser ({ dispatch }, [body, query]) {
    const qs = new URLSearchParams(query).toString()
    return dispatch('createItem', [`signup?${qs}`, body])
  }
}
