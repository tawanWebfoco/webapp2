console.log('> Stopwatch View');

class StopwatchView {
  // States
  intervalId;
  running = false;
  paused = false;
  currentTime = 0;
  startStopwatch = 0;
  pauseStopwatch = 0;
  pauseStartStopwatch = 0;
  points = 0;
  hasExceededLimit = false;
  incrementTime = 0;

  // constants values
  limitTimePerDay = 7200000; // equivalent a 2 hours, 0 minutes, 0 seconds, 0 milliseconds
  time1hour = 3600000; // equivalent a 1 hours, 0 minutes, 0 seconds, 0 milliseconds
  time30minutes = 1800000; // equivalent a 0 hours, 30 minutes, 0 seconds, 0 milliseconds
  time10minutes = 600000; // equivalent a 0 hours, 10 minutes, 0 seconds, 0 milliseconds

  // Elements
  stopwatchHoursElement = document.querySelector('#cron-hours');
  stopwatchMinutesElement = document.querySelector('#cron-minutes');
  stopwatchSecondsElement = document.querySelector('#cron-seconds');
  stopwatchMilisecondsElement = document.querySelector('#cron-milliseconds');

  startButton = document.querySelector('#cron-play');
  pauseButton = document.querySelector('#cron-pause');
  stopButton = document.querySelector('#cron-stop');
  btnAdd10Minutes = document.querySelector('#btn-add-10-minutes');
  btnAdd30Minutes = document.querySelector('#btn-add-30-minutes');
  btnAdd1Hour = document.querySelector('#btn-add-1-hour');

  // Inject Dependences
  stopwatchStorage = null;
  stopwatchController = null;

  constructor(props) {
    this.stopwatchStorage = props.stopwatchStorage;
    this.stopwatchController = props.stopwatchController;
    return this;
  }

  run() {
    this._loadStorage();
    
    this._configureEventStartStopwatch();
    this._configureEventStartStopwatchAfterPaused();
    this._configureEventPauseStopwatch();

    this._configureEventBtnAddTimeOnStopwatch(this.btnAdd10Minutes, this.time10minutes);
    this._configureEventBtnAddTimeOnStopwatch(this.btnAdd30Minutes, this.time30minutes);
    this._configureEventBtnAddTimeOnStopwatch(this.btnAdd1Hour, this.time1hour);
  }

  _loadStorage() {
    const state = this.stopwatchStorage.getStatesFromLocalStorage();

    if (state) {
      this.running = state.running;
      this.paused = state.paused;
      this.pauseStartStopwatch = state.pauseStartStopwatch;
      this.pauseStopwatch = state.pauseStopwatch;
      this.startStopwatch = state.startStopwatch;
      this.currentTime = state.currentTime;
      this.incrementTime = state.incrementTime;

      this._showTimerValues();

      if (this.paused) return;

      if (this.running) {
        this.intervalId = setInterval(this._updateStopwatch.bind(this), 10);
        return;
      }
    }
  }

  _convertTimestampInObjectTime(timestamp) {
    const hours = Math.floor(timestamp / 3600000);
    const minutes = Math.floor((timestamp % 3600000) / 60000);
    const seconds = Math.floor((timestamp % 60000) / 1000);
    const milliseconds = timestamp % 1000; 

    return {
      hours,
      minutes,
      seconds,
      milliseconds
    }
  }

  debugTimestamp(timestamp) {
    const time = this._convertTimestampInObjectTime(timestamp);
    return `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}:${time.milliseconds.toString().padStart(2, '0')}`;
  }

  _updateStopwatch() {
    console.log('_updateStopwatch - new Date:', new Date().getTime());
    console.log('_updateStopwatch - this.startStopwatch:', this.startStopwatch);
    console.log('_updateStopwatch - this.pauseStopwatch:', this.pauseStopwatch);
    console.log('_updateStopwatch - this.currentTime:', this.currentTime);

    this.currentTime = (new Date().getTime() - this.startStopwatch - this.pauseStopwatch) + this.incrementTime;

    this._showTimerValues();
    this._disableButtons();
    
    if (this.currentTime >= this.limitTimePerDay && !this.hasExceededLimit) {
      this._pauseStopwatch();
      this.hasExceededLimit = true;
      alert('Você excedeu o limite diário de 2 horas, clique em parar para salvar o tempo');
      return;
    } 
  }

  _disableButtons() {
    if (this.currentTime >= this.time1hour) {
      this.btnAdd1Hour.classList.add('btn-disabled');
    }

    if (this.currentTime >= (this.limitTimePerDay - this.time30minutes)) {
      this.btnAdd30Minutes.classList.add('btn-disabled');
    }

    if (this.currentTime >= (this.limitTimePerDay - this.time10minutes)) {
      this.btnAdd10Minutes.classList.add('btn-disabled');
    }
  }

  _enableButtons() {
    this.btnAdd1Hour.classList.remove('btn-disabled');
    this.btnAdd30Minutes.classList.remove('btn-disabled');
    this.btnAdd10Minutes.classList.remove('btn-disabled');
  }

  _addPoints() {
    const currentTime = this._convertTimestampInObjectTime(this.currentTime);
    const limitTimePerDay = this._convertTimestampInObjectTime(this.limitTimePerDay);

    const points = this.currentTime > this.limitTimePerDay 
    ? (limitTimePerDay.hours * 60) + limitTimePerDay.minutes 
    : (currentTime.hours * 60) + currentTime.minutes;

    this.points = points;
  }

  _showTimerValues() {
    const hours = Math.floor(this.currentTime / 3600000);
    const minutes = Math.floor((this.currentTime % 3600000) / 60000);
    const seconds = Math.floor((this.currentTime % 60000) / 1000);
    const milliseconds = this.currentTime % 1000;

    this.stopwatchHoursElement.textContent = hours.toString().padStart(2, '0');
    this.stopwatchMinutesElement.textContent = minutes.toString().padStart(2, '0');
    this.stopwatchSecondsElement.textContent = seconds.toString().padStart(2, '0');
    this.stopwatchMilisecondsElement.textContent = milliseconds.toString().padStart(2, '0');
  }

  _stopTimer() {
    clearInterval(this.intervalId);
    this._addPoints();
  }

  _resetTimer() {
    clearInterval(this.intervalId);

    this.stopwatchHoursElement.textContent = '00';
    this.stopwatchMinutesElement.textContent = '00';
    this.stopwatchSecondsElement.textContent = '00';
    this.stopwatchMilisecondsElement.textContent = '99';
    this.running = false;
    this.paused = false;
    this.pauseStartStopwatch = 0;
    this.pauseStopwatch = 0;
    this.incrementTime = 0;

    this._enableButtons();

    this.stopwatchStorage.removeStatesFromLocalStorage();
  }

  _pauseStopwatch() {
    clearInterval(this.intervalId);
    this.pauseStartStopwatch = new Date().getTime();
    this.paused = true;
    this.stopwatchStorage.saveStatesOnLocalStorage(this._getStates());
  }

  _getStates() {
    return {
      running: this.running,
      paused: this.paused,
      pauseStartStopwatch: this.pauseStartStopwatch,
      pauseStopwatch: this.pauseStopwatch,
      startStopwatch: this.startStopwatch,
      currentTime: this.currentTime,
      incrementTime: this.incrementTime
    }
  }

  _configureEventStartStopwatch() {
    this.startButton.addEventListener('click', () => {
      if (!this.running) {
        this.startStopwatch = new Date().getTime() - this.pauseStopwatch;
        this.intervalId = setInterval(this._updateStopwatch.bind(this), 10); // Atualiza a cada 10 milissegundos
        this.running = true;
        this.paused = false;
        this.stopwatchStorage.saveStatesOnLocalStorage(this._getStates());
      }
    });
  }

  _configureEventStartStopwatchAfterPaused() {
    this.startButton.addEventListener('click', () => {
      if (this.running && this.paused) {
        this.pauseStopwatch += new Date().getTime() - this.pauseStartStopwatch;
        this.intervalId = setInterval(this._updateStopwatch.bind(this), 10);
        this.running = true;
        this.paused = false;
        this.stopwatchStorage.saveStatesOnLocalStorage(this._getStates());
      }
    });
  }

  _configureEventPauseStopwatch() {
    this.pauseButton.addEventListener('click', () => {
      if (this.running && !this.paused) {
        this._pauseStopwatch();
      }
    });
  }

  configureEventStopStopwatch(onSaveStopwatch) {
    this.stopButton.addEventListener('click', async () => {
      if (confirm('Deseja parar e salvar o tempo?')) {
        this._stopTimer();
        this._resetTimer()
        await onSaveStopwatch();
      }
    });
  }

  _configureEventBtnAddTimeOnStopwatch(btn, addTime) {
    btn.addEventListener('click', () => {
      this.incrementTime = this.currentTime + addTime;
      this.currentTime = this.incrementTime;
      this.stopwatchStorage.saveStatesOnLocalStorage(this._getStates());
      this._showTimerValues();
      this._disableButtons();
    });
  }
}