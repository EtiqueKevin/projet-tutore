import axios from 'axios'

export default {
  install: (app, options) => {
    const api = axios.create({
      baseURL: options.baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    app.config.globalProperties.$api = api
  }
}