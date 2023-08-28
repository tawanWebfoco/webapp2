console.log('> StopWatch Storage');

class StopwatchStorage {
  STORAGE_TABLE = `${DATABASE_NAME}:tbl_stopwatch`;

  constructor() {
    this._addUniqueStorageForStopwatch();
  }

  _addUniqueStorageForStopwatch() {
    const userStorage = new UserStorage;
    const user = userStorage.getStorage();
    this.STORAGE_TABLE = `${this.STORAGE_TABLE}:${user.id_user}`;
  }

  saveStatesOnLocalStorage(states) {
    localStorage.setItem(this.STORAGE_TABLE, JSON.stringify(states));
  }

  removeStatesFromLocalStorage() {
    localStorage.removeItem(this.STORAGE_TABLE);
  }

  getStatesFromLocalStorage() {
    const state = JSON.parse(localStorage.getItem(this.STORAGE_TABLE));
    return state;
  }
}