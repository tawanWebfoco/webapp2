console.log('Cron.JS');

const stopwatchStorage = new StopwatchStorage;

const stopwatchView = new StopwatchView({
  stopwatchStorage,
  stopwatchController: null
});
stopwatchView.run();

const userStorage = new UserStorage;
console.log(userStorage.getStorage());

const stopwatchController = new StopwatchController({
  stopwatchView,
  userStorage
});

stopwatchView.stopwatchController = stopwatchController;