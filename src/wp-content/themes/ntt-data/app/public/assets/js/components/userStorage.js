class UserStorage {
  // COLLECTION_USERS imported from global.js
  
  constructor() {}

  getStorage() {
    const user = JSON.parse(localStorage.getItem(COLLECTION_USERS));
    return user;
  }

  setStorage(user) {
    localForage.setItem(COLLECTION_USERS, user);
  }
}