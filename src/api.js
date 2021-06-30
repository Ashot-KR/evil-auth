class ApiError extends Error {
  constructor (status, statusText, response) {
    super(`${status} ${statusText}`)

    this.response = response
  }
}

const api = {
  baseUrl: '/api',

  async get (url) {
    const res = await fetch(this.baseUrl + url)
    return await res.json()
  },

  async post (url, data) {
    if (!(data instanceof FormData)) {
      data = JSON.stringify(data)
    }

    const res = await fetch(this.baseUrl + url, {
      method: 'post',
      body: data
    })

    if (!res.ok) {
      let response

      if (res.headers.get('content-type').includes('application/json')) {
        response = await res.json()
      } else {
        response = await res.text()
      }

      throw new ApiError(res.status, res.statusText, response)
    }

    return await res.json()
  }
}

export default api
