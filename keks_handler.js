function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cname = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookies = decodedCookie.split(';');
    for(let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim();
        if (c.indexOf(cname) === 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}

function deleteCookie(name) {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
}

function saveSettings() {
    const selectedRace = raceDropdown.value;
    const selectedPace = paceSlider.value;

    // Speichern der Einstellungen in einem Cookie für 30 Tage
    setCookie('selectedRace', selectedRace, 30);
    setCookie('selectedPace', selectedPace, 30);
}

function loadSettings() {
    const savedRace = getCookie('selectedRace');
    const savedPace = getCookie('selectedPace');

    if (savedRace) {
        raceDropdown.value = savedRace;
        loadRaceData(savedRace);
    }

    if (savedPace) {
        paceSlider.value = savedPace;
        handlePaceChange(); // Aktualisiere die Anzeige und die Tabelle entsprechend
    }
}
