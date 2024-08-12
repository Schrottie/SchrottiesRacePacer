document.addEventListener('DOMContentLoaded', function() {
    const paceSlider = document.getElementById('paceSlider');
    const paceDisplay = document.getElementById('paceDisplay');
    const paceTableBody = document.querySelector('#paceTable tbody');
    const toggleImage = document.getElementById('toggleImage');

    const MINUTES_IN_DAY = 1440; // Anzahl Minuten in einem Tag (24 Stunden)

    function formatTime(minutes) {
        // Berücksichtige Tageswechsel
        minutes = minutes % MINUTES_IN_DAY;
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

    function updateTable(values, pace) {
        paceTableBody.innerHTML = '';

        const startTime = 6 * 60; // 6:00 Uhr in Minuten

        let previousKilometer = 0;

        values.forEach(item => {
            const distance = item.kilometer - previousKilometer;
            const { calories, water } = calculateNutrition(distance);

            const formattedTime = calculateTime(startTime, item.kilometer, pace / 60);
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

    function handlePaceChange() {
        const pace = paceSlider.value;
        const paceMinutes = Math.floor(pace / 60);
        const paceSeconds = pace % 60;
        const paceValue = `${paceMinutes}:${paceSeconds.toString().padStart(2, '0')}`; // Korrektes Format
        paceDisplay.textContent = `${paceValue}`;

        const isEvenYear = toggleImage.src.includes('uzs2.png');
        const values = isEvenYear ? gdUZSWerte : imUZSWerte;

        updateTable(values, pace);
    }

    function handleToggleChange() {
        const isEvenYear = toggleImage.src.includes('uzs2.png');
        toggleImage.src = isEvenYear ? 'uzs1.png' : 'uzs2.png';
        handlePaceChange();
    }

    function handleDateChange() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();

        if (hours === 23 && minutes === 59) {
            // Setze auf 0 Uhr für den Tageswechsel
            paceDisplay.textContent = `Pace: 00:00 min/km`;
        }
    }

    // Setze Standardwert und Anzeige
    paceSlider.value = 515; // Standardwert in Sekunden
    handlePaceChange();

    paceSlider.addEventListener('input', handlePaceChange);
    toggleImage.addEventListener('click', handleToggleChange);

    // Initiale Tabelle laden
    handleDateChange();
});

document.addEventListener("DOMContentLoaded", function() {
    const rows = document.querySelectorAll("#paceTable tbody tr");
    
    rows.forEach(row => {
        const cells = row.getElementsByTagName("td");
        if (cells[0] && cells[0].textContent.includes("Privat")) {
            row.classList.add("privat-row");
        }
    });
});