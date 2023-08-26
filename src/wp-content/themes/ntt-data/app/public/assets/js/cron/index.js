console.log('Cron.JS');

const timerStorage = new TimerStorage;

const timerView = new TimerView({
  timerStorage,
  timerController: null
});
timerView.run();

const timerController = new TimerController({
  timerView
});

timerView.timerController = timerController