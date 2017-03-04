const userLocalStorageKey = 'paper-walris-user'

export function getCurrentUser() {
  const localStorageValue = window.localStorage.getItem(userLocalStorageKey);
  const user = localStorageValue ? JSON.parse(localStorageValue) : null;
  return user;
}

export function setCurrentUser(user) {
  window.localStorage.setItem(userLocalStorageKey, JSON.stringify(user));
}

export function clearCurrentUser() {
  window.localStorage.removeItem(userLocalStorageKey);
}

export function forceLogin() {
  clearCurrentUser();
  window.location.reload();
}
