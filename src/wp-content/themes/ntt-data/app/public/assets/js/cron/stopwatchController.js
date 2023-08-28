console.log('> Stopwatch Controller');

class StopwatchController {
  // Dependences
  stopwatchView = null;
  userStorage = null;

  constructor(props) {
    this.stopwatchView = props.stopwatchView;
    this.userStorage = props.userStorage;
    this.stopwatchView.configureEventStopStopwatch(this.onSaveStopwatch.bind(this));
    return this;
  }

  async onSaveStopwatch() {
    const user = this.userStorage.getStorage();
    console.log('onSaveStopwatch:', user)

    const formData = new FormData();
    formData.append('id_user', user.id_user);
    formData.append('time_stop', this.stopwatchView.currentTime);
    formData.append('time_score', this.stopwatchView.points);
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