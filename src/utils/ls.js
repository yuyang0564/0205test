
export default {
  getItem(key)
  {
    return JSON.parse(localStorage.getItem(key))
  },
  sessionItem(key)
  {
    return JSON.parse(sessionStorage.getItem(key))
  },
  setItem(key, value)
  {
    localStorage.setItem(key, JSON.stringify(value))
  },
  sessionSet(key, value)
  {
    sessionStorage.setItem(key, JSON.stringify(value))
  },
  remove(key)
  {
    localStorage.removeItem(key)
  },
  sessionRemove(key)
  {
    sessionStorage.removeItem(key)
  },
  clear()
  {
    localStorage.clear()
  },
  sessionClear()
  {
    sessionStorage.clear()
  }
}