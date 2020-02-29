
export default {
  getItem(key) {
    return JSON.parse(localStorage.getItem(key))
  },
  setItem(key,value) {
    localStorage.setItem(key,JSON.stringify(value))
  },
  remove(key) {
    localStorage.removeItem(key)
  },
  clear() {
    localStorage.clear()
  }
}