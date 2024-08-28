document.querySelector('.hamburger-menu').addEventListener('click', function() {
    this.classList.toggle('active');
});

document.getElementById('deleteCookiesButton').addEventListener('click', function() {
    if (confirm('Sind Sie sicher, dass Sie alle Cookies löschen möchten?')) {
        // Holen Sie sich alle Cookies
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [name] = cookie.split('=');
            // Löschen Sie das Cookie, indem Sie das Ablaufdatum auf einen Zeitpunkt in der Vergangenheit setzen
            document.cookie = name.trim() + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        }
        // Weiterleitung nach dem Löschen der Cookies
        window.location.href = 'https://running.maik-bischoff.de';
    }
});
