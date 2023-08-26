console.log('> Timer Controller');

class TimerController {
  // Dependences
  timerView = null;
  userStorage = null;

  constructor(props) {
    this.timerView = props.timerView;
    this.userStorage = props.userStorage;
    this.timerView.configureEventStopTimer(this.onSaveTimer.bind(this));
    return this;
  }

  async onSaveTimer() {
    const user = this.userStorage.getStorage();
    console.log('onSaveTimer:', user)

    const formData = new FormData();
    formData.append('id_user', user.id_user);
    formData.append('time_stop', this.timerView.currentTime);
    formData.append('time_score', this.timerView.points);
    formData.append('country', user.country);
    
    // WpBaseUrlAPI "imported" from global.js
    fetch(`${WPBaseUrlAPI}/timer/register`, {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => console.log('Server repsonse:', data))
      .catch(error => console.error('Error on request:', error));
  }
}