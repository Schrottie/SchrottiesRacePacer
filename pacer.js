document.addEventListener('DOMContentLoaded', function() {
    const raceDropdown = document.getElementById('raceDropdown');
    const raceNameElement = document.getElementById('raceName');
    const paceSlider = document.getElementById('paceSlider');
    const paceDisplay = document.getElementById('paceDisplay');
    const paceTableBody = document.querySelector('#paceTable tbody');

    // Lädt die Liste der Renn-Dateien und füllt das Dropdown-Menü
    function fetchRaceFiles() {
        fetch('list_races.php')
            .then(response => response.json())
            .then(data => {
                if (data && Array.isArray(data)) {
                    const filePromises = data.map(file => 
                        fetch(`races/${file.filename}`)
                            .then(response => response.json())
                            .then(jsonData => {
                                const raceTitle = jsonData.title || jsonData[0]?.vp || file.filename.replace('.json', '');
                                return {
                                    filename: file.filename,
                                    fullName: raceTitle
                                };
                            })
                    );

                    Promise.all(filePromises)
                        .then(files => {
                            files.forEach(file => {
                                const option = document.createElement('option');
                                option.value = file.filename;
                                option.textContent = file.fullName;
                                raceDropdown.appendChild(option);
                            });

                            loadSettings(); // Settings nach dem Laden der Dropdown-Optionen anwenden
                        })
                        .catch(error => console.error('Fehler beim Laden der Renn-Titel:', error));
                }
            })
            .catch(error => console.error('Fehler beim Abrufen der Renn-Dateien:', error));
    }

// Lädt die Daten für das ausgewählte Rennen
function loadRaceData(filename) {
    fetch(filename)
        .then(response => response.json())
        .then(data => {
            const raceTitle = data.title || data[0]?.vp;
            const startTime = data.startTime ? convertTimeToMinutes(data.startTime) : null; // Startzeit nur setzen, wenn vorhanden

            if (startTime === null) {
                console.warn(`Keine Startzeit im Rennen ${filename} gefunden, Standardwert von 10:00 Uhr wird verwendet.`);
            }

            updateRaceTitle(raceTitle);
            updateTable(data.checkpoints || data, startTime || 600); // Falls keine Startzeit, 600 (10:00 Uhr) verwenden
        })
        .catch(error => console.error('Fehler beim Laden der Renn-Daten:', error));
}


    // Aktualisiert die Anzeige des Rennnamens
    function updateRaceTitle(title) {
        raceNameElement.textContent = title;
    }

    // Aktualisiert die Tabelle mit den Daten
    function updateTable(values, startTime) {
        paceTableBody.innerHTML = '';

        let previousKilometer = 0;

        // Geht durch alle Checkpoints, einschließlich des ersten
        values.forEach(item => {
            if (item && item.kilometer !== undefined && item.vp) {
                const distance = item.kilometer - previousKilometer;
                const { calories, water } = calculateNutrition(distance);

                const formattedTime = calculateTime(startTime, item.kilometer, paceSlider.value / 60);
                addTableRow({
                    vp: item.vp,
                    kilometer: item.kilometer,
                    time: formattedTime,
                    cutoff: item.cutoff,
                    open: item.open,
                    close: item.close,
                    water: water,
                    calories: calories
                });

                previousKilometer = item.kilometer;
            } else {
                console.warn('Einträge in values entsprechen nicht dem erwarteten Format:', item);
            }
        });
    }

    // Fügt eine Zeile zur Tabelle hinzu
    function addTableRow({ vp, kilometer, time, cutoff, open, close, water, calories }) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${vp}</td>
            <td>${kilometer}</td>
            <td>${time}</td>
            <td>${cutoff}</td>
            <td>${open}</td>
            <td>${close}</td>
            <td>${water}</td>
            <td>${calories}</td>
        `;
        paceTableBody.appendChild(row);
    }

    function formatTime(minutes) {
        minutes = minutes % (24 * 60);
        let hours = Math.floor(minutes / 60);
        let mins = Math.floor(minutes % 60);
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')} Uhr`;
    }

    function calculateTime(startTime, kilometer, pace) {
        const timeInMinutes = startTime + (kilometer * pace);
        return formatTime(timeInMinutes);
    }

    function convertTimeToMinutes(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours * 60 + minutes;
    }

    function calculateNutrition(distance) {
        const weight = 85;
        const caloriesPerKm = 0.9 * weight;
        const waterPerKm = 0.5 * weight * (24 / 21);

        return {
            calories: Math.round(caloriesPerKm * distance),
            water: Math.round(waterPerKm * distance)
        };
    }

    function handlePaceChange() {
        const pace = paceSlider.value;
        const paceMinutes = Math.floor(pace / 60);
        const paceSeconds = pace % 60;
        const paceValue = `${paceMinutes}:${paceSeconds.toString().padStart(2, '0')}`;
        paceDisplay.textContent = `${paceValue}`;

        if (raceDropdown.value) {
            loadRaceData(`races/${raceDropdown.value}`);
        }
        saveSettings();  // Speichert die geänderte Pace in den Cookies
    }

    function handleRaceChange() {
        loadRaceData(`races/${raceDropdown.value}`);
        saveSettings();  // Speichert das geänderte Rennen in den Cookies
    }

    function loadSettings() {
        const savedRace = getCookie('selectedRace');
        const savedPace = getCookie('selectedPace');

        if (savedRace) {
            raceDropdown.value = savedRace;
        }

        if (savedPace) {
            paceSlider.value = savedPace;
            handlePaceChange(); // Damit die Pace-Anzeige korrekt aktualisiert wird
        }

        if (savedRace) {
            loadRaceData(`races/${savedRace}`);
        } else {
            handleRaceChange(); // Falls kein Cookie vorhanden ist, wird das aktuelle Dropdown-Rennen geladen
        }
    }

    function saveSettings() {
        setCookie('selectedRace', raceDropdown.value, 30);
        setCookie('selectedPace', paceSlider.value, 30);
    }

    // Hilfsfunktionen für Cookies
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value}; ${expires}; path=/`;
    }

    function getCookie(name) {
        const nameEQ = `${name}=`;
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    fetchRaceFiles();
    paceSlider.addEventListener('input', handlePaceChange);
    raceDropdown.addEventListener('change', handleRaceChange);
});
