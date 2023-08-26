console.log('> UserStorage.JS');

class UserStorage {
  // COLLECTION_USERS imported from global.js
  
  constructor() {}

  getStorage() {
    const user = JSON.parse(localStorage.getItem(COLLECTION_USERS));
    return user;
  }

  setStorage(user) {
    localStorage.setItem(COLLECTION_USERS, JSON.stringify(user));
  }

  removeStorage() {
    localStorage.removeItem(COLLECTION_USERS);
  }
}