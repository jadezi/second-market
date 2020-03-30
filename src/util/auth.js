function getToken() {
  return window.sessionStorage.getItem('market-token')
}

function removeToken() {
  window.sessionStorage.removeItem('market-token')
}

export { getToken, removeToken }
