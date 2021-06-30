export const noop = () => {}

export const userStorage = {
  set (user) {
    localStorage.setItem('user', JSON.stringify(user))
  },

  get () {
    return JSON.parse(localStorage.getItem('user'))
  },

  clear () {
    localStorage.removeItem('user')
  }
}
