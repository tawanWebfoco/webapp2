console.log('> Timer Controller');

class TimerController {
  // Dependences
  timerView = null;
  
  constructor(props) {
    this.timerView = props.timerView;
    this.timerView.configureEventStopTimer(this.onSaveTimer.bind(this));
    return this;
  }

  async onSaveTimer() {
    const formData = new FormData();
    formData.append('id_user', 2);
    formData.append('time_stop', this.timerView.currentTime);
    formData.append('time_score', this.timerView.points);
    
    // WpBaseUrlAPI "imported" from global.js
    fetch(`${WPBaseUrlAPI}/timer/v1/register`, {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(data => console.log('Server repsonse:', data))
      .catch(error => console.error('Error on request:', error));
  }
}