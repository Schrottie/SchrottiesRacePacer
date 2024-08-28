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
                <a href="cooookies.html">Cookies &amp; Datenschutz</a>
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
            const isLoggedIn = document.cookie.split(';').some((item) => item.trim().startsWith('loggedIn='));
            const loginLink = document.getElementById('loginLink');
            const addRaceLink = document.getElementById('addRaceLink');
            const listRacesLink = document.getElementById('listRacesLink');

            if (isLoggedIn) {
                loginLink.textContent = 'Abmelden';
                loginLink.href = 'logout.php'; // Placeholder, wird später hinzugefügt
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

    // Überprüfen, ob das Cookie-Banner-Cookie existiert
    if (!getCookie('cookiesAccepted')) {
        // Wenn das Cookie nicht existiert, zeigen wir das Banner an
        const cookieBannerHtml = `
        <div id="cookieBanner" class="cookie-banner" style="display: none;">
            <p>Der Racepacer benötigt Kekse, denn er hat ständig Hunger. 
            <br /><a href="cooookies.html">Welche das sind, verraten die Cookie-Richtlinien.</a>
            </p>
            <button id="acceptCookiesBtn">Ja, das geht so in Ordnung!</button>
            <button id="declineCookiesBtn">Ablehnen</button>
        </div>
        `;
        document.body.insertAdjacentHTML('beforeend', cookieBannerHtml);

        // Event-Listener für den "Zustimmen"-Button
        document.getElementById('acceptCookiesBtn').addEventListener('click', function() {
            // Cookie setzen, das die Zustimmung anzeigt
            setCookie('cookiesAccepted', 'true', 365); // Gültig für 1 Jahr
            // Banner ausblenden
            document.getElementById('cookieBanner').style.display = 'none';
        });

        // Event-Listener für den "Ablehnen"-Button
        document.getElementById('declineCookiesBtn').addEventListener('click', function() {
            // Umleitung zur angegebenen URL
            window.location.href = 'https://running.maik-bischoff.de';
        });
    }
});
