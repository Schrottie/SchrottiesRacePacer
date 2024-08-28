document.querySelector('.hamburger-menu').addEventListener('click', function() {
    this.classList.toggle('active');
});

document.addEventListener('DOMContentLoaded', function() {
    // HTML-Code für das Menü
    const menuHtml = `
        <div class="hamburger-menu">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="menu-content">
                <a href="index.html">Racepacer</a>
                <a id="addRaceLink" href="add_race.html">Neues Race</a>
                <a id="listRacesLink" href="list_races.html">Races verwalten</a>
                <a href="cookies.html">Cookies &amp; Datenschutz</a>
                <a id="loginLink" href="login.html">Login</a>
            </div>
        </div>
    `;

    // Füge das Menü in die Header-Sektion ein
    const headerElement = document.querySelector('.header');
    if (headerElement) {
        headerElement.insertAdjacentHTML('beforeend', menuHtml);

        // Menü-Toggle
        const menuContainer = document.querySelector('.hamburger-menu');
        if (menuContainer) {
            menuContainer.addEventListener('click', function() {
                this.classList.toggle('active');
            });
        } else {
            console.error('Kein Hamburger-Menü-Container gefunden.');
        }

        // Funktionen für das Login/Abmelden
        function updateLoginStatus() {
            const isLoggedIn = getCookie('loggedIn') === 'true';
            const loginLink = document.getElementById('loginLink');
            const addRaceLink = document.getElementById('addRaceLink');
            const listRacesLink = document.getElementById('listRacesLink');

            if (isLoggedIn) {
                loginLink.textContent = 'Abmelden';
                loginLink.href = 'logout.html'; // Placeholder, wird später hinzugefügt
                addRaceLink.style.display = 'block';
                listRacesLink.style.display = 'block';
            } else {
                loginLink.textContent = 'Login';
                loginLink.href = 'login.html'; // Placeholder, wird später hinzugefügt
                addRaceLink.style.display = 'none';
                listRacesLink.style.display = 'none';
            }
        }

        // Initiales Update des Login-Status
        updateLoginStatus();
    } else {
        console.error('Kein Header-Element gefunden, um das Menü einzufügen.');
    }
});

