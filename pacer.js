document.addEventListener('DOMContentLoaded', function() {
    const raceDropdown = document.getElementById('raceDropdown');
    const raceNameElement = document.getElementById('raceName');
    const paceSlider = document.getElementById('paceSlider');
    const paceDisplay = document.getElementById('paceDisplay');
    const paceTableBody = document.querySelector('#paceTable tbody');

    // Funktion zum Auslesen der Dateien im Verzeichnis "races"
    function fetchRaceFiles() {
        fetch('listRaces.php')
            .then(response => response.json())
            .then(data => {
                if (data && Array.isArray(data)) {
                    data.forEach(file => {
                        const option = document.createElement('option');
                        option.value = file.filename;
                        option.textContent = file.fullName;
                        raceDropdown.appendChild(option);
                    });

                    // Standardmäßig den aktuellen Renntitel einstellen
                    const currentYear = new Date().getFullYear();
                    const defaultFile = (currentYear % 2 === 0) ? 'mwl_ggduzs.js' : 'mwl_iuzs.js';
                    raceDropdown.value = defaultFile;
                    loadRaceData(defaultFile);
                }
            })
            .catch(error => console.error('Fehler beim Abrufen der Renn-Dateien:', error));
    }

    // Funktion zum Laden der Renn-Daten und Aktualisieren der Tabelle
    function loadRaceData(filename) {
        fetch(`races/${filename}`)
            .then(response => response.text())
            .then(data => {
                const lines = data.split('\n');
                const fullName = lines[0].replace(/^\/\/\s*/, ''); // Kommentar entfernen
                const jsonArray = lines.slice(1).join('\n'); // Den Rest des Inhalts zusammenfügen
                eval(`const dataArray = ${jsonArray};`); // Datenarray definieren

                raceNameElement.textContent = fullName;
                updateTable(dataArray);
            })
            .catch(error => console.error('Fehler beim Laden der Renn-Daten:', error));
    }

    // Tabelle aktualisieren
    function updateTable(values) {
        paceTableBody.innerHTML = '';

        const startTime = 6 * 60; // 6:00 Uhr in Minuten

        let previousKilometer = 0;

        values.forEach(item => {
            const distance = item.kilometer - previousKilometer;
            const { calories, water } = calculateNutrition(distance);

            const formattedTime = calculateTime(startTime, item.kilometer, paceSlider.value / 60);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.vp}</td>
                <td>${item.kilometer}</td>
                <td>${formattedTime}</td>
                <td>${item.cutoff}</td>
                <td>${item.open}</td>
                <td>${item.close}</td>
                <td>${water}</td>
                <td>${calories}</td>
            `;
            paceTableBody.appendChild(row);

            previousKilometer = item.kilometer;
        });
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

    function calculateNutrition(distance) {
        const weight = 85; // Festes Gewicht in kg
        const caloriesPerKm = 0.9 * weight; // 0.9 kcal/kg/km
        const waterPerKm = 0.5 * weight * (24 / 21); // 0.5 l/kg/km, Temperatur auf 24°C festgelegt

        return {
            calories: Math.round(caloriesPerKm * distance),
            water: Math.round(waterPerKm * distance)
        };
    }

    function handlePaceChange() {
        const pace = paceSlider.value;
        const paceMinutes = Math.floor(pace / 60);
        const paceSeconds = pace % 60;
        const paceValue = `${paceMinutes}:${paceSeconds.toString().padStart(2, '0')}`; // Korrektes Format
        paceDisplay.textContent = `${paceValue}`;

        if (raceDropdown.value) {
            loadRaceData(raceDropdown.value);
        }
    }

    function handleRaceChange() {
        loadRaceData(raceDropdown.value);
    }

    // Initiales Laden der Renn-Dateien
    fetchRaceFiles();

    paceSlider.addEventListener('input', handlePaceChange);
    raceDropdown.addEventListener('change', handleRaceChange);
});
