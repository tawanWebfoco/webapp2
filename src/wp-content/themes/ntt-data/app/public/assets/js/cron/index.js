console.log('Cron.JS');

const timerStorage = new TimerStorage;

const timerView = new TimerView({
  timerStorage,
  timerController: null
});
timerView.run();

const userStorage = new UserStorage;
console.log(userStorage.getStorage());

const timerController = new TimerController({
  timerView,
  userStorage
});

timerView.timerController = timerController;