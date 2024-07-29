document.addEventListener('DOMContentLoaded', function() {
    const paceSlider = document.getElementById('paceSlider');
    const paceDisplay = document.getElementById('paceDisplay');
    const paceTableBody = document.querySelector('#paceTable tbody');
    const toggleImage = document.getElementById('toggleImage');

    let dataValues;
    let isOddYear = false; // Standardmäßig starten wir mit einem geraden Jahr

    // Funktion zum Formatieren der Zeit
    function formatTime(minutes) {
        let hours = Math.floor(minutes / 60) % 24;
        let mins = Math.floor(minutes % 60);
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    }

    // Funktion zur Berechnung der Zeit
    function calculateTime(startTime, kilometer, pace) {
        const timeInMinutes = startTime + (kilometer * pace);
        return formatTime(timeInMinutes);
    }

    // Funktion zur Aktualisierung der Tabelle
    function updateTable(values, pace) {
        paceTableBody.innerHTML = '';
        const startTime = 6 * 60; // 6:00 Uhr in Minuten

        values.forEach(item => {
            const formattedTime = calculateTime(startTime, item.kilometer, pace / 60);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.vp}</td>
                <td>${item.kilometer.toFixed(1)} km</td>
                <td>${formattedTime} Uhr</td>
                <td>${item.cutoff} Uhr</td>
                <td>${item.open}</td>
                <td>${item.close}</td>
            `;

            if (item.vp.includes('WP')) {
                row.classList.add('wp-row');
            } else if (item.vp.includes('VP 10') && !isOddYear) {
                row.classList.add('vp10-row');
            }

            paceTableBody.appendChild(row);
        });
    }

    // Funktion zum Umschalten der Jahrgänge und Aktualisieren der Tabelle
    function handleToggleChange() {
        isOddYear = !isOddYear;
        dataValues = isOddYear ? oddWerte : evenWerte;
        toggleImage.src = isOddYear ? "uzs1.png" : "uzs2.png";
        updateTable(dataValues, paceSlider.value);
    }

    // Funktion zur Aktualisierung der Pace-Anzeige
    function updatePaceDisplay() {
        const pace = paceSlider.value;
        const minutes = Math.floor(pace / 60);
        const seconds = pace % 60;
        paceDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        updateTable(dataValues, pace);
    }

    // Event Listener für Slider und Umschalter
    paceSlider.addEventListener('input', updatePaceDisplay);
    toggleImage.addEventListener('click', handleToggleChange);

    // Initial Setup
    handleToggleChange(); // Initialize with current year data
    updatePaceDisplay(); // Initialize the pace display
});
