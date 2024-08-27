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

                    const currentYear = new Date().getFullYear();
                    const defaultFile = (currentYear % 2 === 0) ? 'mwl_ggduzs.js' : 'mwl_iuzs.js';
                    raceDropdown.value = defaultFile;
                    loadRaceData(defaultFile);
                }
            })
            .catch(error => console.error('Fehler beim Abrufen der Renn-Dateien:', error));
    }

    // function loadRaceData(filename) {
    //     fetch(`races/${filename}`)
    //         .then(response => response.text())
    //         .then(data => {
    //             console.log(`Daten aus ${filename}:`, data);

    //             const lines = data.split('\n');
    //             const fullName = lines[0].replace(/^\/\/\s*/, ''); // Kommentar entfernen
    //             console.log('Rennname aus Datei:', fullName);

    //             const jsonArrayString = lines.slice(1).join('\n'); // Den Rest des Inhalts zusammenfügen

    //             try {
    //                 // Versuche, das Datenarray zu evaluieren
    //                 const dataArray = eval(jsonArrayString);
    //                 console.log('Parsed Data Array:', dataArray);

    //                 raceNameElement.textContent = fullName;
    //                 updateTable(dataArray);
    //             } catch (e) {
    //                 console.error('Fehler beim Parsen der Renn-Daten:', e);
    //             }
    //         })
    //         .catch(error => console.error('Fehler beim Laden der Renn-Daten:', error));
    // }
 
    function loadRaceData(filename) {
        fetch(`races/${filename}`)
            .then(response => response.text())
            .then(data => {
                console.log(`Daten aus ${filename}:`, data);
    
                const lines = data.split('\n');
                const fullName = lines[0].replace(/^\/\/\s*/, ''); // Kommentar entfernen
                console.log('Rennname aus Datei:', fullName);
    
                // Array-Daten extrahieren (den Rest der Datei nach der ersten Zeile)
                const jsonArrayString = lines.slice(1).join('\n'); // Den Rest des Inhalts zusammenfügen
    
                try {
                    // Verwende eval, um den Array-Daten-String zu verarbeiten
                    // Achtung: eval kann Sicherheitsrisiken bergen, stellen Sie sicher, dass die Daten vertrauenswürdig sind
                    const dataArray = eval(jsonArrayString);
                    console.log('Parsed Data Array:', dataArray);
    
                    if (Array.isArray(dataArray)) {
                        raceNameElement.textContent = fullName; // Setze die Überschrift
                        updateTable(dataArray);
                    } else {
                        console.error('Fehler: Das geparste Datenarray ist kein Array.');
                    }
                } catch (e) {
                    console.error('Fehler beim Parsen der Renn-Daten:', e);
                }
            })
            .catch(error => console.error('Fehler beim Laden der Renn-Daten:', error));
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
            loadRaceData(raceDropdown.value);
        }
        saveSettings();
    }

    function handleRaceChange() {
        loadRaceData(raceDropdown.value);
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
            loadRaceData(savedRace);
        }

        if (savedPace) {
            paceSlider.value = savedPace;
            handlePaceChange();
        }
    }

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

    fetchRaceFiles();

    // Überprüfen, ob Einstellungen aus Cookies geladen werden sollen
    loadSettings();
    
    paceSlider.addEventListener('input', handlePaceChange);
    raceDropdown.addEventListener('change', handleRaceChange);
});
