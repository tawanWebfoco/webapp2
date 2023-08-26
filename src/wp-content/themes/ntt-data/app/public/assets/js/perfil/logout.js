const btnLogout = document.querySelector('#btn-logout-perfil');

btnLogout.addEventListener('click', function() {
  fetch(`${WPBaseUrlAPI}/user/logout`, {
      method: 'GET'
    })
      .then(data => window.location.assign('app'))
      .catch(error => console.error('Error on request:', error));
});