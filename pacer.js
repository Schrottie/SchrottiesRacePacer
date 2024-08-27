document.addEventListener('DOMContentLoaded', function() {
    const raceDropdown = document.getElementById('raceDropdown');
    const raceNameElement = document.getElementById('raceName');
    const paceSlider = document.getElementById('paceSlider');
    const paceDisplay = document.getElementById('paceDisplay');
    const paceTableBody = document.querySelector('#paceTable tbody');

    function fetchRaceFiles() {
        fetch('list_races.php')
            .then(response => response.json())
            .then(data => {
                console.log('Daten von list_races.php:', data);
    
                if (data && Array.isArray(data)) {
                    data.forEach(file => {
                        const option = document.createElement('option');
                        option.value = file.filename;
                        option.textContent = file.fullName;
                        raceDropdown.appendChild(option);
                    });
    
                    // Setze das Standard-Dateiformat auf JSON
                    const currentYear = new Date().getFullYear();
                    const defaultFile = (currentYear % 2 === 0) ? 'mwl_ggduzs.json' : 'mwl_iuzs.json';
                    raceDropdown.value = defaultFile;
                    loadRaceData(`races/${defaultFile}`);
                }
            })
            .catch(error => console.error('Fehler beim Abrufen der Renn-Dateien:', error));
    }
    
    function loadRaceData(filename) {
        fetch(filename)
            .then(response => response.json())
            .then(data => {
                console.log(`Daten aus ${filename}:`, data);
    
                const raceTitle = data.title || data[0]?.vp; // Verwenden Sie den Titel oder den Namen des ersten Points
                console.log('Rennname aus Datei:', raceTitle);
    
                // Aktualisieren Sie die Überschrift
                updateRaceTitle(raceTitle);
    
                // Hier können Sie die Tabelle aktualisieren
                updateTable(data.checkpoints || data);
            })
            .catch(error => console.error('Fehler beim Laden der Renn-Daten:', error));
    }

    function updateRaceTitle(title) {
        raceNameElement.textContent = title;
    }

    function updateTable(values) {
        console.log('Aktualisiere Tabelle mit Werten:', values);

        paceTableBody.innerHTML = '';

        const startTime = 6 * 60; // 6:00 Uhr in Minuten

        let previousKilometer = 0;

        values.forEach(item => {
            if (item && item.kilometer && item.vp) { 
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
            } else {
                console.warn('Einträge in values entsprechen nicht dem erwarteten Format:', item);
            }
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
        saveSettings();
    }

    function handleRaceChange() {
        loadRaceData(`races/${raceDropdown.value}`);
        saveSettings();
    }

    function saveSettings() {
        const selectedRace = raceDropdown.value;
        const selectedPace = paceSlider.value;

        setCookie('selectedRace', selectedRace, 30);
        setCookie('selectedPace', selectedPace, 30);
    }

    function loadSettings() {
        const savedRace = getCookie('selectedRace');
        const savedPace = getCookie('selectedPace');

        if (savedRace) {
            raceDropdown.value = savedRace;
            loadRaceData(`races/${savedRace}`);
        }

        if (savedPace) {
            paceSlider.value = savedPace;
            handlePaceChange();
        }
    }

    fetchRaceFiles();

    // Überprüfen, ob Einstellungen aus Cookies geladen werden sollen
    loadSettings();
    
    paceSlider.addEventListener('input', handlePaceChange);
    raceDropdown.addEventListener('change', handleRaceChange);
});
