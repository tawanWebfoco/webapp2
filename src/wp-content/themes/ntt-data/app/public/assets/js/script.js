console.log('> Script.JS');

// const pageView = document.querySelector('.overflow .view')
    let arrayNavMenu = document.querySelectorAll('nav.menu li');
    arrayNavMenu = Array.from(arrayNavMenu);

    // Obtenha a URL atual
    const urlParams = new URLSearchParams(window.location.search);

    // Obtenha o valor do parâmetro "page"
    const pageParam = urlParams.get('page');

    arrayNavMenu.forEach(navMenu => {
        navMenu.addEventListener('click', () =>{
            let page = navMenu.id.replace("nav", "");
            let currentUrl = window.location.href;
             currentUrl = currentUrl.split('?')[0];
            console.log(currentUrl);

            window.location.href = currentUrl + '?' + page;
            
        })
    });

// Logout if not exist user on storage to context global
(async function() {
    const userStorage = new UserStorage;
    const user = userStorage.getStorage();
    // console.log('user logoot', user)
    if (!user) {
        fetch(`${WPBaseUrlAPI}/user/logout`, {
            method: 'GET',
        })
        .then(data => window.location.assign('app'))
        .catch(error => console.error('Error on request:', error));
        // .then(data => console.log('logout', user))
    }
})();
